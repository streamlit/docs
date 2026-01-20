---
title: Build a Forex Trading Bot
slug: /develop/tutorials/trading/forex-trading-bot
---

# Build a Forex Trading Bot

## Detect Buy and Sell Zones on the Forex Market

In this tutorial, you will build a Streamlit application that analyzes Forex market data and detects potential buy and sell zones using technical analysis indicators. This Python app uses popular libraries like `yfinance`, `pandas`, `ta` (Technical Analysis), and `plotly` for visualization.

<Note>

**Disclaimer**: This tutorial is for educational purposes only. Trading in the Forex market involves significant risk and may not be suitable for all investors. Always do your own research and consider consulting a financial advisor before making any trading decisions.

</Note>

## Objectives

1. Fetch real-time Forex data from Yahoo Finance
2. Calculate technical indicators (RSI, MACD, Bollinger Bands, Support/Resistance)
3. Detect buy and sell zones based on multiple indicators
4. Display interactive charts with signals
5. Create a user-friendly dashboard

## Prerequisites

- Python 3.9+
- Basic understanding of technical analysis concepts
- Familiarity with Streamlit basics

## Setup coding environment

In your terminal, install the required Python libraries:

```bash
pip install streamlit yfinance pandas ta plotly numpy
```

Create a `requirements.txt` file in the root of your working directory:

```
streamlit
yfinance
pandas
ta
plotly
numpy
```

## Understanding Technical Indicators

Before building the app, let's understand the key indicators we'll use:

### RSI (Relative Strength Index)
- **Buy Zone**: RSI below 30 (oversold)
- **Sell Zone**: RSI above 70 (overbought)

### MACD (Moving Average Convergence Divergence)
- **Buy Signal**: MACD line crosses above the signal line
- **Sell Signal**: MACD line crosses below the signal line

### Bollinger Bands
- **Buy Zone**: Price touches or goes below the lower band
- **Sell Zone**: Price touches or goes above the upper band

### Support and Resistance Levels
- **Buy Zone**: Price near support level
- **Sell Zone**: Price near resistance level

## Building the App

Create a new file called `forex_bot.py`:

```python
import streamlit as st
import yfinance as yf
import pandas as pd
import numpy as np
import ta
import plotly.graph_objects as go
from plotly.subplots import make_subplots
from datetime import datetime, timedelta

# Page configuration
st.set_page_config(
    page_title="Forex Trading Bot",
    page_icon="📈",
    layout="wide"
)

st.title("📈 Forex Trading Bot")
st.markdown("Detect buy and sell zones using technical analysis")

# Sidebar configuration
st.sidebar.header("Configuration")

# Currency pairs available on Yahoo Finance
FOREX_PAIRS = {
    "EUR/USD": "EURUSD=X",
    "GBP/USD": "GBPUSD=X",
    "USD/JPY": "USDJPY=X",
    "USD/CHF": "USDCHF=X",
    "AUD/USD": "AUDUSD=X",
    "USD/CAD": "USDCAD=X",
    "NZD/USD": "NZDUSD=X",
    "EUR/GBP": "EURGBP=X",
    "EUR/JPY": "EURJPY=X",
    "GBP/JPY": "GBPJPY=X",
}

selected_pair = st.sidebar.selectbox(
    "Select Currency Pair",
    options=list(FOREX_PAIRS.keys()),
    index=0
)

timeframe = st.sidebar.selectbox(
    "Timeframe",
    options=["1d", "1h", "15m", "5m"],
    index=0
)

period = st.sidebar.selectbox(
    "Period",
    options=["1mo", "3mo", "6mo", "1y", "2y"],
    index=2
)

# Technical indicator parameters
st.sidebar.subheader("Indicator Settings")
rsi_period = st.sidebar.slider("RSI Period", 7, 21, 14)
rsi_oversold = st.sidebar.slider("RSI Oversold Level", 20, 40, 30)
rsi_overbought = st.sidebar.slider("RSI Overbought Level", 60, 80, 70)
bb_period = st.sidebar.slider("Bollinger Bands Period", 10, 30, 20)
bb_std = st.sidebar.slider("Bollinger Bands Std Dev", 1.0, 3.0, 2.0)


@st.cache_data(ttl=300)
def fetch_forex_data(symbol: str, period: str, interval: str) -> pd.DataFrame:
    """Fetch Forex data from Yahoo Finance."""
    ticker = yf.Ticker(symbol)
    df = ticker.history(period=period, interval=interval)
    return df


def calculate_indicators(df: pd.DataFrame, rsi_period: int, bb_period: int, bb_std: float) -> pd.DataFrame:
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

    # ATR (Average True Range) for volatility
    df['ATR'] = ta.volatility.AverageTrueRange(df['High'], df['Low'], df['Close']).average_true_range()

    return df


def find_support_resistance(df: pd.DataFrame, window: int = 20) -> tuple:
    """Find support and resistance levels."""
    highs = df['High'].rolling(window=window, center=True).max()
    lows = df['Low'].rolling(window=window, center=True).min()

    resistance_levels = df[df['High'] == highs]['High'].dropna().unique()[-3:]
    support_levels = df[df['Low'] == lows]['Low'].dropna().unique()[-3:]

    return support_levels, resistance_levels


def detect_signals(df: pd.DataFrame, rsi_oversold: int, rsi_overbought: int) -> pd.DataFrame:
    """Detect buy and sell signals based on multiple indicators."""
    df = df.copy()

    # Initialize signal columns
    df['Buy_Signal'] = 0
    df['Sell_Signal'] = 0
    df['Signal_Strength'] = 0

    for i in range(1, len(df)):
        buy_score = 0
        sell_score = 0

        # RSI signals
        if df['RSI'].iloc[i] < rsi_oversold:
            buy_score += 2
        elif df['RSI'].iloc[i] > rsi_overbought:
            sell_score += 2

        # MACD crossover signals
        if (df['MACD'].iloc[i] > df['MACD_Signal'].iloc[i] and
            df['MACD'].iloc[i-1] <= df['MACD_Signal'].iloc[i-1]):
            buy_score += 2
        elif (df['MACD'].iloc[i] < df['MACD_Signal'].iloc[i] and
              df['MACD'].iloc[i-1] >= df['MACD_Signal'].iloc[i-1]):
            sell_score += 2

        # Bollinger Bands signals
        if df['Close'].iloc[i] <= df['BB_Lower'].iloc[i]:
            buy_score += 1
        elif df['Close'].iloc[i] >= df['BB_Upper'].iloc[i]:
            sell_score += 1

        # Moving average trend
        if df['SMA_20'].iloc[i] > df['SMA_50'].iloc[i]:
            buy_score += 1
        else:
            sell_score += 1

        # Price momentum
        if df['Close'].iloc[i] > df['Close'].iloc[i-1]:
            buy_score += 0.5
        else:
            sell_score += 0.5

        # Determine final signal (threshold of 3 for signal generation)
        if buy_score >= 3:
            df.loc[df.index[i], 'Buy_Signal'] = 1
            df.loc[df.index[i], 'Signal_Strength'] = buy_score
        elif sell_score >= 3:
            df.loc[df.index[i], 'Sell_Signal'] = 1
            df.loc[df.index[i], 'Signal_Strength'] = sell_score

    return df


def create_chart(df: pd.DataFrame, pair_name: str, support_levels, resistance_levels) -> go.Figure:
    """Create interactive chart with indicators and signals."""
    fig = make_subplots(
        rows=4, cols=1,
        shared_xaxes=True,
        vertical_spacing=0.05,
        subplot_titles=(f'{pair_name} Price', 'RSI', 'MACD', 'Volume'),
        row_heights=[0.5, 0.15, 0.2, 0.15]
    )

    # Candlestick chart
    fig.add_trace(
        go.Candlestick(
            x=df.index,
            open=df['Open'],
            high=df['High'],
            low=df['Low'],
            close=df['Close'],
            name='Price'
        ),
        row=1, col=1
    )

    # Bollinger Bands
    fig.add_trace(
        go.Scatter(x=df.index, y=df['BB_Upper'], name='BB Upper',
                   line=dict(color='gray', width=1, dash='dash')),
        row=1, col=1
    )
    fig.add_trace(
        go.Scatter(x=df.index, y=df['BB_Lower'], name='BB Lower',
                   line=dict(color='gray', width=1, dash='dash'),
                   fill='tonexty', fillcolor='rgba(128,128,128,0.1)'),
        row=1, col=1
    )

    # Moving Averages
    fig.add_trace(
        go.Scatter(x=df.index, y=df['SMA_20'], name='SMA 20',
                   line=dict(color='orange', width=1)),
        row=1, col=1
    )
    fig.add_trace(
        go.Scatter(x=df.index, y=df['SMA_50'], name='SMA 50',
                   line=dict(color='purple', width=1)),
        row=1, col=1
    )

    # Support and Resistance lines
    for level in support_levels:
        fig.add_hline(y=level, line_dash="dot", line_color="green",
                      annotation_text=f"Support: {level:.5f}", row=1, col=1)
    for level in resistance_levels:
        fig.add_hline(y=level, line_dash="dot", line_color="red",
                      annotation_text=f"Resistance: {level:.5f}", row=1, col=1)

    # Buy signals
    buy_signals = df[df['Buy_Signal'] == 1]
    fig.add_trace(
        go.Scatter(
            x=buy_signals.index,
            y=buy_signals['Low'] * 0.999,
            mode='markers',
            marker=dict(symbol='triangle-up', size=12, color='green'),
            name='Buy Signal'
        ),
        row=1, col=1
    )

    # Sell signals
    sell_signals = df[df['Sell_Signal'] == 1]
    fig.add_trace(
        go.Scatter(
            x=sell_signals.index,
            y=sell_signals['High'] * 1.001,
            mode='markers',
            marker=dict(symbol='triangle-down', size=12, color='red'),
            name='Sell Signal'
        ),
        row=1, col=1
    )

    # RSI
    fig.add_trace(
        go.Scatter(x=df.index, y=df['RSI'], name='RSI',
                   line=dict(color='blue', width=1)),
        row=2, col=1
    )
    fig.add_hline(y=rsi_overbought, line_dash="dash", line_color="red", row=2, col=1)
    fig.add_hline(y=rsi_oversold, line_dash="dash", line_color="green", row=2, col=1)
    fig.add_hrect(y0=rsi_oversold, y1=rsi_overbought, fillcolor="gray",
                  opacity=0.1, row=2, col=1)

    # MACD
    colors = ['green' if val >= 0 else 'red' for val in df['MACD_Histogram']]
    fig.add_trace(
        go.Bar(x=df.index, y=df['MACD_Histogram'], name='MACD Histogram',
               marker_color=colors),
        row=3, col=1
    )
    fig.add_trace(
        go.Scatter(x=df.index, y=df['MACD'], name='MACD',
                   line=dict(color='blue', width=1)),
        row=3, col=1
    )
    fig.add_trace(
        go.Scatter(x=df.index, y=df['MACD_Signal'], name='Signal',
                   line=dict(color='orange', width=1)),
        row=3, col=1
    )

    # Volume
    colors = ['green' if df['Close'].iloc[i] >= df['Open'].iloc[i] else 'red'
              for i in range(len(df))]
    fig.add_trace(
        go.Bar(x=df.index, y=df['Volume'], name='Volume', marker_color=colors),
        row=4, col=1
    )

    # Update layout
    fig.update_layout(
        height=900,
        showlegend=True,
        xaxis_rangeslider_visible=False,
        template='plotly_dark'
    )

    return fig


# Main application logic
try:
    # Fetch data
    symbol = FOREX_PAIRS[selected_pair]
    with st.spinner(f"Fetching data for {selected_pair}..."):
        df = fetch_forex_data(symbol, period, timeframe)

    if df.empty:
        st.error("No data available for the selected pair and timeframe.")
    else:
        # Calculate indicators
        df = calculate_indicators(df, rsi_period, bb_period, bb_std)

        # Find support and resistance
        support_levels, resistance_levels = find_support_resistance(df)

        # Detect signals
        df = detect_signals(df, rsi_oversold, rsi_overbought)

        # Display current price info
        col1, col2, col3, col4 = st.columns(4)

        current_price = df['Close'].iloc[-1]
        price_change = df['Close'].iloc[-1] - df['Close'].iloc[-2]
        price_change_pct = (price_change / df['Close'].iloc[-2]) * 100

        col1.metric(
            "Current Price",
            f"{current_price:.5f}",
            f"{price_change_pct:.2f}%"
        )
        col2.metric("RSI", f"{df['RSI'].iloc[-1]:.2f}")
        col3.metric("ATR", f"{df['ATR'].iloc[-1]:.5f}")
        col4.metric("SMA 20", f"{df['SMA_20'].iloc[-1]:.5f}")

        # Signal summary
        st.subheader("Signal Analysis")

        # Current market condition
        rsi_value = df['RSI'].iloc[-1]
        macd_value = df['MACD'].iloc[-1]
        signal_value = df['MACD_Signal'].iloc[-1]

        conditions = []

        if rsi_value < rsi_oversold:
            conditions.append(("RSI Oversold", "green", "Potential Buy Zone"))
        elif rsi_value > rsi_overbought:
            conditions.append(("RSI Overbought", "red", "Potential Sell Zone"))
        else:
            conditions.append(("RSI Neutral", "gray", "No clear signal"))

        if macd_value > signal_value:
            conditions.append(("MACD Bullish", "green", "Upward momentum"))
        else:
            conditions.append(("MACD Bearish", "red", "Downward momentum"))

        if current_price <= df['BB_Lower'].iloc[-1]:
            conditions.append(("Price at Lower BB", "green", "Potential bounce"))
        elif current_price >= df['BB_Upper'].iloc[-1]:
            conditions.append(("Price at Upper BB", "red", "Potential reversal"))

        # Display conditions
        signal_cols = st.columns(len(conditions))
        for i, (name, color, desc) in enumerate(conditions):
            signal_cols[i].markdown(f"**{name}**")
            signal_cols[i].markdown(f":{color}[{desc}]")

        # Display chart
        st.subheader("Technical Analysis Chart")
        fig = create_chart(df, selected_pair, support_levels, resistance_levels)
        st.plotly_chart(fig, use_container_width=True)

        # Recent signals table
        st.subheader("Recent Signals")

        recent_signals = df[(df['Buy_Signal'] == 1) | (df['Sell_Signal'] == 1)].tail(10)

        if not recent_signals.empty:
            signals_display = recent_signals[['Close', 'RSI', 'MACD', 'Buy_Signal', 'Sell_Signal', 'Signal_Strength']].copy()
            signals_display['Type'] = signals_display.apply(
                lambda x: 'BUY' if x['Buy_Signal'] == 1 else 'SELL', axis=1
            )
            signals_display = signals_display[['Close', 'RSI', 'MACD', 'Type', 'Signal_Strength']]
            signals_display.columns = ['Price', 'RSI', 'MACD', 'Signal Type', 'Strength']
            st.dataframe(signals_display, use_container_width=True)
        else:
            st.info("No recent signals detected with the current settings.")

        # Support and Resistance levels
        st.subheader("Key Levels")
        level_col1, level_col2 = st.columns(2)

        with level_col1:
            st.markdown("**Support Levels**")
            for level in sorted(support_levels, reverse=True):
                st.markdown(f"- {level:.5f}")

        with level_col2:
            st.markdown("**Resistance Levels**")
            for level in sorted(resistance_levels, reverse=True):
                st.markdown(f"- {level:.5f}")

        # Raw data
        with st.expander("View Raw Data"):
            st.dataframe(df.tail(50), use_container_width=True)

except Exception as e:
    st.error(f"An error occurred: {str(e)}")
    st.info("Please try a different currency pair or timeframe.")

# Footer
st.markdown("---")
st.markdown("""
<small>

**Disclaimer**: This application is for educational purposes only.
Past performance does not guarantee future results.
Always conduct your own research before making trading decisions.

</small>
""", unsafe_allow_html=True)
```

## Running the App

Save the file and run it with:

```bash
streamlit run forex_bot.py
```

## How the Bot Works

### 1. Data Fetching
The app uses `yfinance` to fetch real-time Forex data from Yahoo Finance. Data is cached for 5 minutes to avoid excessive API calls.

### 2. Signal Detection Algorithm
The bot uses a scoring system to detect buy and sell zones:

| Indicator | Buy Condition | Sell Condition | Score |
|-----------|--------------|----------------|-------|
| RSI | < 30 (oversold) | > 70 (overbought) | +2 |
| MACD | Bullish crossover | Bearish crossover | +2 |
| Bollinger Bands | Price at lower band | Price at upper band | +1 |
| SMA Trend | SMA 20 > SMA 50 | SMA 20 < SMA 50 | +1 |

A signal is generated when the total score reaches 3 or higher.

### 3. Support and Resistance
The app automatically identifies support and resistance levels by finding local minima and maxima in the price data.

## Customization Ideas

1. **Add more indicators**: Stochastic, ADX, Fibonacci retracements
2. **Backtesting**: Add a module to test the strategy on historical data
3. **Alerts**: Implement email or push notifications when signals are generated
4. **Position sizing**: Add risk management with stop-loss and take-profit levels
5. **Multiple timeframe analysis**: Analyze signals across different timeframes

## Deploying the App

1. Create a GitHub repository with:
   ```
   your-repository/
   ├── forex_bot.py
   └── requirements.txt
   ```

2. Go to [Streamlit Community Cloud](https://share.streamlit.io) and deploy your app.

## Conclusion

You've built a Forex trading bot that:
- Fetches real-time currency data
- Calculates multiple technical indicators
- Detects buy and sell zones using a scoring algorithm
- Displays interactive charts with signals
- Identifies support and resistance levels

Remember that no trading strategy is perfect. Always use proper risk management and never trade with money you can't afford to lose.

## Next Steps

- Learn more about [technical analysis indicators](https://www.investopedia.com/technical-analysis-4689657)
- Explore [backtesting strategies](https://www.investopedia.com/terms/b/backtesting.asp)
- Study [risk management principles](https://www.investopedia.com/articles/trading/09/risk-management.asp)

Happy trading! (responsibly)
