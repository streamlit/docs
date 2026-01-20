---
title: Build an Automated Forex Trading Bot
slug: /develop/tutorials/trading/forex-auto-trading-bot
---

# Build an Automated Forex Trading Bot

## Execute Trades Automatically with MetaTrader 5

In this tutorial, you will build a fully automated trading bot that analyzes the Forex market using technical indicators and automatically executes buy and sell orders through MetaTrader 5.

<Warning>

**Risk Warning**: Automated trading involves significant financial risk. You can lose all your invested capital. This tutorial is for educational purposes only. Always test with a demo account first and never trade with money you cannot afford to lose.

</Warning>

## Prerequisites

- Windows OS (MetaTrader 5 Python library only works on Windows)
- MetaTrader 5 platform installed
- A demo or live trading account with a Forex broker
- Python 3.9+

## Setup

### 1. Install MetaTrader 5

Download and install MetaTrader 5 from your broker or from [MetaQuotes](https://www.metatrader5.com/en/download).

### 2. Enable Algo Trading

In MetaTrader 5:
1. Go to **Tools > Options > Expert Advisors**
2. Check **Allow algorithmic trading**
3. Check **Allow DLL imports**

### 3. Install Python Libraries

```bash
pip install MetaTrader5 streamlit pandas ta plotly numpy
```

## The Automated Trading Bot

Create a file called `auto_forex_bot.py`:

```python
import streamlit as st
import MetaTrader5 as mt5
import pandas as pd
import numpy as np
import ta
import plotly.graph_objects as go
from plotly.subplots import make_subplots
from datetime import datetime, timedelta
import time
import threading

# Page configuration
st.set_page_config(
    page_title="Automated Forex Trading Bot",
    page_icon="🤖",
    layout="wide"
)

st.title("🤖 Automated Forex Trading Bot")
st.markdown("Automatic buy/sell execution based on technical analysis")

# Initialize session state
if 'bot_running' not in st.session_state:
    st.session_state.bot_running = False
if 'trade_history' not in st.session_state:
    st.session_state.trade_history = []
if 'mt5_connected' not in st.session_state:
    st.session_state.mt5_connected = False


def connect_mt5():
    """Connect to MetaTrader 5."""
    if not mt5.initialize():
        return False, f"MT5 initialization failed: {mt5.last_error()}"
    return True, "Connected to MetaTrader 5"


def disconnect_mt5():
    """Disconnect from MetaTrader 5."""
    mt5.shutdown()


def get_account_info():
    """Get account information."""
    account = mt5.account_info()
    if account is None:
        return None
    return {
        'login': account.login,
        'balance': account.balance,
        'equity': account.equity,
        'margin': account.margin,
        'free_margin': account.margin_free,
        'leverage': account.leverage,
        'profit': account.profit,
        'currency': account.currency
    }


def get_forex_data(symbol, timeframe, num_bars=500):
    """Fetch Forex data from MetaTrader 5."""
    timeframe_map = {
        '1m': mt5.TIMEFRAME_M1,
        '5m': mt5.TIMEFRAME_M5,
        '15m': mt5.TIMEFRAME_M15,
        '30m': mt5.TIMEFRAME_M30,
        '1h': mt5.TIMEFRAME_H1,
        '4h': mt5.TIMEFRAME_H4,
        '1d': mt5.TIMEFRAME_D1,
    }

    mt5_timeframe = timeframe_map.get(timeframe, mt5.TIMEFRAME_H1)
    rates = mt5.copy_rates_from_pos(symbol, mt5_timeframe, 0, num_bars)

    if rates is None:
        return None

    df = pd.DataFrame(rates)
    df['time'] = pd.to_datetime(df['time'], unit='s')
    df.set_index('time', inplace=True)
    df.columns = ['Open', 'High', 'Low', 'Close', 'TickVolume', 'Spread', 'Volume']

    return df


def calculate_indicators(df, rsi_period=14, bb_period=20, bb_std=2.0):
    """Calculate technical indicators."""
    df = df.copy()

    # RSI
    df['RSI'] = ta.momentum.RSIIndicator(df['Close'], window=rsi_period).rsi()

    # MACD
    macd = ta.trend.MACD(df['Close'])
    df['MACD'] = macd.macd()
    df['MACD_Signal'] = macd.macd_signal()
    df['MACD_Histogram'] = macd.macd_diff()

    # Bollinger Bands
    bollinger = ta.volatility.BollingerBands(df['Close'], window=bb_period, window_dev=bb_std)
    df['BB_Upper'] = bollinger.bollinger_hband()
    df['BB_Middle'] = bollinger.bollinger_mavg()
    df['BB_Lower'] = bollinger.bollinger_lband()

    # Moving Averages
    df['SMA_20'] = ta.trend.SMAIndicator(df['Close'], window=20).sma_indicator()
    df['SMA_50'] = ta.trend.SMAIndicator(df['Close'], window=50).sma_indicator()
    df['EMA_12'] = ta.trend.EMAIndicator(df['Close'], window=12).ema_indicator()
    df['EMA_26'] = ta.trend.EMAIndicator(df['Close'], window=26).ema_indicator()

    # ATR for stop loss calculation
    df['ATR'] = ta.volatility.AverageTrueRange(df['High'], df['Low'], df['Close']).average_true_range()

    return df


def generate_signal(df, rsi_oversold=30, rsi_overbought=70):
    """Generate trading signal based on indicators."""
    if len(df) < 2:
        return 'HOLD', 0

    current = df.iloc[-1]
    previous = df.iloc[-2]

    buy_score = 0
    sell_score = 0

    # RSI signals
    if current['RSI'] < rsi_oversold:
        buy_score += 2
    elif current['RSI'] > rsi_overbought:
        sell_score += 2

    # MACD crossover
    if (current['MACD'] > current['MACD_Signal'] and
        previous['MACD'] <= previous['MACD_Signal']):
        buy_score += 3
    elif (current['MACD'] < current['MACD_Signal'] and
          previous['MACD'] >= previous['MACD_Signal']):
        sell_score += 3

    # Bollinger Bands
    if current['Close'] <= current['BB_Lower']:
        buy_score += 1
    elif current['Close'] >= current['BB_Upper']:
        sell_score += 1

    # Trend (SMA)
    if current['SMA_20'] > current['SMA_50']:
        buy_score += 1
    else:
        sell_score += 1

    # Price momentum
    if current['Close'] > previous['Close']:
        buy_score += 0.5
    else:
        sell_score += 0.5

    # Determine signal
    if buy_score >= 4:
        return 'BUY', buy_score
    elif sell_score >= 4:
        return 'SELL', sell_score
    else:
        return 'HOLD', max(buy_score, sell_score)


def calculate_position_size(account_balance, risk_percent, stop_loss_pips, pip_value):
    """Calculate position size based on risk management."""
    risk_amount = account_balance * (risk_percent / 100)
    position_size = risk_amount / (stop_loss_pips * pip_value)
    return round(position_size, 2)


def execute_trade(symbol, order_type, lot_size, sl_pips, tp_pips):
    """Execute a trade on MetaTrader 5."""
    symbol_info = mt5.symbol_info(symbol)
    if symbol_info is None:
        return False, f"Symbol {symbol} not found"

    if not symbol_info.visible:
        if not mt5.symbol_select(symbol, True):
            return False, f"Failed to select {symbol}"

    point = symbol_info.point
    price = mt5.symbol_info_tick(symbol).ask if order_type == 'BUY' else mt5.symbol_info_tick(symbol).bid

    if order_type == 'BUY':
        trade_type = mt5.ORDER_TYPE_BUY
        sl = price - sl_pips * point * 10
        tp = price + tp_pips * point * 10
    else:
        trade_type = mt5.ORDER_TYPE_SELL
        sl = price + sl_pips * point * 10
        tp = price - tp_pips * point * 10

    request = {
        "action": mt5.TRADE_ACTION_DEAL,
        "symbol": symbol,
        "volume": lot_size,
        "type": trade_type,
        "price": price,
        "sl": sl,
        "tp": tp,
        "deviation": 20,
        "magic": 123456,
        "comment": "Python Auto Bot",
        "type_time": mt5.ORDER_TIME_GTC,
        "type_filling": mt5.ORDER_FILLING_IOC,
    }

    result = mt5.order_send(request)

    if result.retcode != mt5.TRADE_RETCODE_DONE:
        return False, f"Order failed: {result.comment}"

    return True, {
        'ticket': result.order,
        'symbol': symbol,
        'type': order_type,
        'price': price,
        'lot': lot_size,
        'sl': sl,
        'tp': tp,
        'time': datetime.now()
    }


def close_position(ticket):
    """Close an open position."""
    position = mt5.positions_get(ticket=ticket)
    if not position:
        return False, "Position not found"

    position = position[0]
    symbol = position.symbol
    lot = position.volume

    if position.type == mt5.POSITION_TYPE_BUY:
        trade_type = mt5.ORDER_TYPE_SELL
        price = mt5.symbol_info_tick(symbol).bid
    else:
        trade_type = mt5.ORDER_TYPE_BUY
        price = mt5.symbol_info_tick(symbol).ask

    request = {
        "action": mt5.TRADE_ACTION_DEAL,
        "symbol": symbol,
        "volume": lot,
        "type": trade_type,
        "position": ticket,
        "price": price,
        "deviation": 20,
        "magic": 123456,
        "comment": "Close by Python Bot",
        "type_time": mt5.ORDER_TIME_GTC,
        "type_filling": mt5.ORDER_FILLING_IOC,
    }

    result = mt5.order_send(request)

    if result.retcode != mt5.TRADE_RETCODE_DONE:
        return False, f"Close failed: {result.comment}"

    return True, "Position closed"


def get_open_positions():
    """Get all open positions."""
    positions = mt5.positions_get()
    if positions is None:
        return []

    return [{
        'ticket': p.ticket,
        'symbol': p.symbol,
        'type': 'BUY' if p.type == 0 else 'SELL',
        'volume': p.volume,
        'price_open': p.price_open,
        'price_current': p.price_current,
        'profit': p.profit,
        'sl': p.sl,
        'tp': p.tp
    } for p in positions]


# Sidebar - Connection
st.sidebar.header("🔌 Connection")

if st.sidebar.button("Connect to MT5" if not st.session_state.mt5_connected else "Disconnect"):
    if not st.session_state.mt5_connected:
        success, message = connect_mt5()
        if success:
            st.session_state.mt5_connected = True
            st.sidebar.success(message)
        else:
            st.sidebar.error(message)
    else:
        disconnect_mt5()
        st.session_state.mt5_connected = False
        st.sidebar.info("Disconnected")

# Show account info if connected
if st.session_state.mt5_connected:
    account = get_account_info()
    if account:
        st.sidebar.markdown("---")
        st.sidebar.markdown(f"**Account:** {account['login']}")
        st.sidebar.markdown(f"**Balance:** {account['balance']:.2f} {account['currency']}")
        st.sidebar.markdown(f"**Equity:** {account['equity']:.2f} {account['currency']}")
        st.sidebar.markdown(f"**Profit:** {account['profit']:.2f} {account['currency']}")

# Sidebar - Trading Settings
st.sidebar.header("⚙️ Trading Settings")

SYMBOLS = ["EURUSD", "GBPUSD", "USDJPY", "USDCHF", "AUDUSD", "USDCAD", "NZDUSD", "EURGBP", "EURJPY", "GBPJPY"]
selected_symbol = st.sidebar.selectbox("Symbol", SYMBOLS)

timeframe = st.sidebar.selectbox("Timeframe", ["1m", "5m", "15m", "30m", "1h", "4h", "1d"], index=4)

st.sidebar.subheader("Risk Management")
risk_percent = st.sidebar.slider("Risk per trade (%)", 0.5, 5.0, 1.0, 0.5)
lot_size = st.sidebar.number_input("Lot Size", 0.01, 10.0, 0.1, 0.01)
sl_pips = st.sidebar.number_input("Stop Loss (pips)", 10, 200, 50, 10)
tp_pips = st.sidebar.number_input("Take Profit (pips)", 10, 400, 100, 10)

st.sidebar.subheader("Indicator Settings")
rsi_period = st.sidebar.slider("RSI Period", 7, 21, 14)
rsi_oversold = st.sidebar.slider("RSI Oversold", 20, 40, 30)
rsi_overbought = st.sidebar.slider("RSI Overbought", 60, 80, 70)

# Main content
if st.session_state.mt5_connected:
    # Fetch and analyze data
    df = get_forex_data(selected_symbol, timeframe)

    if df is not None and not df.empty:
        df = calculate_indicators(df, rsi_period)
        signal, strength = generate_signal(df, rsi_oversold, rsi_overbought)

        # Display metrics
        col1, col2, col3, col4, col5 = st.columns(5)

        current_price = df['Close'].iloc[-1]
        price_change = df['Close'].iloc[-1] - df['Close'].iloc[-2]
        price_change_pct = (price_change / df['Close'].iloc[-2]) * 100

        col1.metric("Price", f"{current_price:.5f}", f"{price_change_pct:.2f}%")
        col2.metric("RSI", f"{df['RSI'].iloc[-1]:.1f}")
        col3.metric("MACD", f"{df['MACD'].iloc[-1]:.5f}")

        signal_color = "green" if signal == "BUY" else "red" if signal == "SELL" else "gray"
        col4.metric("Signal", signal)
        col5.metric("Strength", f"{strength:.1f}")

        # Trading controls
        st.markdown("---")
        col_buy, col_sell, col_close = st.columns(3)

        with col_buy:
            if st.button("🟢 MANUAL BUY", use_container_width=True, type="primary"):
                success, result = execute_trade(selected_symbol, "BUY", lot_size, sl_pips, tp_pips)
                if success:
                    st.success(f"BUY order executed at {result['price']:.5f}")
                    st.session_state.trade_history.append(result)
                else:
                    st.error(result)

        with col_sell:
            if st.button("🔴 MANUAL SELL", use_container_width=True):
                success, result = execute_trade(selected_symbol, "SELL", lot_size, sl_pips, tp_pips)
                if success:
                    st.success(f"SELL order executed at {result['price']:.5f}")
                    st.session_state.trade_history.append(result)
                else:
                    st.error(result)

        with col_close:
            if st.button("⬜ CLOSE ALL", use_container_width=True):
                positions = get_open_positions()
                for pos in positions:
                    close_position(pos['ticket'])
                st.info(f"Closed {len(positions)} positions")

        # Auto trading toggle
        st.markdown("---")
        st.subheader("🤖 Automatic Trading")

        auto_col1, auto_col2 = st.columns([1, 3])

        with auto_col1:
            auto_trade = st.toggle("Enable Auto Trading", value=st.session_state.bot_running)
            st.session_state.bot_running = auto_trade

        with auto_col2:
            if st.session_state.bot_running:
                st.warning("⚠️ Auto trading is ACTIVE - Bot will execute trades automatically!")

                # Auto execute based on signal
                if signal == "BUY":
                    st.info("🟢 BUY signal detected - Checking for existing positions...")
                    positions = get_open_positions()
                    buy_positions = [p for p in positions if p['symbol'] == selected_symbol and p['type'] == 'BUY']
                    if not buy_positions:
                        success, result = execute_trade(selected_symbol, "BUY", lot_size, sl_pips, tp_pips)
                        if success:
                            st.success(f"AUTO BUY executed at {result['price']:.5f}")

                elif signal == "SELL":
                    st.info("🔴 SELL signal detected - Checking for existing positions...")
                    positions = get_open_positions()
                    sell_positions = [p for p in positions if p['symbol'] == selected_symbol and p['type'] == 'SELL']
                    if not sell_positions:
                        success, result = execute_trade(selected_symbol, "SELL", lot_size, sl_pips, tp_pips)
                        if success:
                            st.success(f"AUTO SELL executed at {result['price']:.5f}")
            else:
                st.info("Auto trading is disabled. Toggle to enable automatic order execution.")

        # Chart
        st.markdown("---")
        st.subheader("📊 Technical Analysis")

        fig = make_subplots(rows=3, cols=1, shared_xaxes=True, vertical_spacing=0.05,
                          subplot_titles=(f'{selected_symbol}', 'RSI', 'MACD'),
                          row_heights=[0.6, 0.2, 0.2])

        # Candlestick
        fig.add_trace(go.Candlestick(x=df.index, open=df['Open'], high=df['High'],
                                      low=df['Low'], close=df['Close'], name='Price'), row=1, col=1)

        # Bollinger Bands
        fig.add_trace(go.Scatter(x=df.index, y=df['BB_Upper'], name='BB Upper',
                                 line=dict(color='gray', width=1, dash='dash')), row=1, col=1)
        fig.add_trace(go.Scatter(x=df.index, y=df['BB_Lower'], name='BB Lower',
                                 line=dict(color='gray', width=1, dash='dash'),
                                 fill='tonexty', fillcolor='rgba(128,128,128,0.1)'), row=1, col=1)

        # SMAs
        fig.add_trace(go.Scatter(x=df.index, y=df['SMA_20'], name='SMA 20',
                                 line=dict(color='orange', width=1)), row=1, col=1)
        fig.add_trace(go.Scatter(x=df.index, y=df['SMA_50'], name='SMA 50',
                                 line=dict(color='purple', width=1)), row=1, col=1)

        # RSI
        fig.add_trace(go.Scatter(x=df.index, y=df['RSI'], name='RSI',
                                 line=dict(color='blue', width=1)), row=2, col=1)
        fig.add_hline(y=rsi_overbought, line_dash="dash", line_color="red", row=2, col=1)
        fig.add_hline(y=rsi_oversold, line_dash="dash", line_color="green", row=2, col=1)

        # MACD
        colors = ['green' if val >= 0 else 'red' for val in df['MACD_Histogram']]
        fig.add_trace(go.Bar(x=df.index, y=df['MACD_Histogram'], name='Histogram',
                            marker_color=colors), row=3, col=1)
        fig.add_trace(go.Scatter(x=df.index, y=df['MACD'], name='MACD',
                                 line=dict(color='blue', width=1)), row=3, col=1)
        fig.add_trace(go.Scatter(x=df.index, y=df['MACD_Signal'], name='Signal',
                                 line=dict(color='orange', width=1)), row=3, col=1)

        fig.update_layout(height=700, template='plotly_dark', xaxis_rangeslider_visible=False)
        st.plotly_chart(fig, use_container_width=True)

        # Open positions
        st.markdown("---")
        st.subheader("📈 Open Positions")

        positions = get_open_positions()
        if positions:
            pos_df = pd.DataFrame(positions)
            st.dataframe(pos_df, use_container_width=True)

            total_profit = sum(p['profit'] for p in positions)
            st.metric("Total Unrealized P/L", f"{total_profit:.2f}")
        else:
            st.info("No open positions")

        # Auto refresh
        if st.session_state.bot_running:
            time.sleep(5)
            st.rerun()
    else:
        st.error(f"Could not fetch data for {selected_symbol}")
else:
    st.info("👆 Please connect to MetaTrader 5 using the sidebar button")

    st.markdown("""
    ## Setup Instructions

    1. **Install MetaTrader 5** from your Forex broker
    2. **Enable Algo Trading** in MT5: Tools > Options > Expert Advisors
    3. **Login** to your demo or live account in MT5
    4. **Click "Connect to MT5"** in the sidebar

    ## Features

    - **Automatic Signal Detection**: RSI, MACD, Bollinger Bands, Moving Averages
    - **Manual Trading**: Execute buy/sell orders with one click
    - **Auto Trading**: Let the bot trade automatically based on signals
    - **Risk Management**: Set stop loss, take profit, and position size
    - **Real-time Charts**: Interactive technical analysis charts
    - **Position Management**: View and close open positions
    """)

# Footer
st.markdown("---")
st.caption("⚠️ Trading involves risk. Past performance does not guarantee future results. Use demo account for testing.")
```

## Running the Bot

```bash
streamlit run auto_forex_bot.py
```

## How Automatic Trading Works

### Signal Generation

The bot generates BUY signals when:
- RSI is below 30 (oversold) → +2 points
- MACD crosses above signal line → +3 points
- Price touches lower Bollinger Band → +1 point
- SMA 20 > SMA 50 (uptrend) → +1 point

The bot generates SELL signals when:
- RSI is above 70 (overbought) → +2 points
- MACD crosses below signal line → +3 points
- Price touches upper Bollinger Band → +1 point
- SMA 20 < SMA 50 (downtrend) → +1 point

**A trade is executed when the score reaches 4 or higher.**

### Risk Management

| Parameter | Description | Default |
|-----------|-------------|---------|
| Risk % | Percentage of balance to risk per trade | 1% |
| Lot Size | Position size in lots | 0.1 |
| Stop Loss | Distance in pips for stop loss | 50 |
| Take Profit | Distance in pips for take profit | 100 |

### Safety Features

1. **No duplicate positions**: Won't open a new BUY if a BUY is already open
2. **Stop Loss**: Every trade has an automatic stop loss
3. **Take Profit**: Every trade has an automatic take profit
4. **Manual override**: Can manually close all positions at any time

## Important Notes

1. **Always test with a DEMO account first**
2. **Start with small lot sizes** (0.01)
3. **Monitor the bot** - don't leave it unattended for long periods
4. **Understand the risks** - automated trading can result in significant losses

## Next Steps

- Add more indicators (Stochastic, ADX, Fibonacci)
- Implement trailing stop loss
- Add email/SMS notifications
- Create backtesting functionality
- Add multiple timeframe analysis
