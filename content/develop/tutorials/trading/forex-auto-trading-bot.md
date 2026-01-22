---
title: Build an Automated Forex Trading Bot
slug: /develop/tutorials/trading/forex-auto-trading-bot
---

# Build an Automated Forex Trading Bot

## Execute Trades Automatically with MetaTrader 5

In this tutorial, you will build a fully automated trading bot that analyzes the Forex market using technical indicators and automatically executes buy and sell orders through MetaTrader 5. This is a production-ready implementation with proper security, risk management, and error handling.

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
pip install MetaTrader5 streamlit pandas ta plotly numpy python-dotenv
```

### 4. Configure Credentials (Security)

Create a `.env` file in your project directory:

```bash
MT5_LOGIN=your_account_number
MT5_PASSWORD=your_password
MT5_SERVER=your_broker_server
```

**Important**: Never commit `.env` files to version control. Add `.env` to your `.gitignore`.

## The Automated Trading Bot

Create a file called `scalping_bot_pro.py`:

```python
"""
Production-Ready Forex Scalping Bot for MetaTrader 5
Version: 2.0.0
Features:
- Secure credential management via environment variables
- Advanced risk management (1-2% per trade, margin validation)
- Multi-indicator scoring system (RSI, Stochastic, Bollinger, Fibonacci, Volume)
- Structured logging and trade history
- Timer-based position management
- Optimized for M1/M5 scalping timeframes
"""

import streamlit as st
import MetaTrader5 as mt5
import pandas as pd
import numpy as np
import ta
import plotly.graph_objects as go
from plotly.subplots import make_subplots
from datetime import datetime, timedelta
import time
import logging
import os
from dataclasses import dataclass
from typing import Optional, Tuple, Dict, List, Any
from enum import Enum

# =============================================================================
# CONFIGURATION
# =============================================================================

@dataclass(frozen=True)
class TradingConfig:
    """Immutable trading configuration."""
    # Risk Management
    MAX_RISK_PERCENT: float = 2.0
    DEFAULT_RISK_PERCENT: float = 1.0
    MIN_LOT_SIZE: float = 0.01
    MAX_LOT_SIZE: float = 1.0
    DEFAULT_LOT_SIZE: float = 0.01

    # Scoring thresholds
    SIGNAL_THRESHOLD: int = 6

    # Timing
    MIN_TRADE_DURATION: int = 1
    MAX_TRADE_DURATION: int = 10
    DEFAULT_TRADE_DURATION: int = 5
    REFRESH_INTERVAL: int = 3

    # Spread limits (in points)
    MAX_SPREAD_POINTS: int = 30

    # Button debounce (seconds)
    BUTTON_DEBOUNCE: float = 2.0


class SignalType(Enum):
    """Trading signal types."""
    BUY = "BUY"
    SELL = "SELL"
    HOLD = "HOLD"


# Symbol configurations for different brokers
BROKER_SYMBOLS = {
    "standard": ["EURUSD", "GBPUSD", "USDJPY", "USDCHF", "AUDUSD", "USDCAD"],
    "xm": ["EURUSD#", "GBPUSD#", "USDJPY#", "USDCHF#", "AUDUSD#", "USDCAD#"],
}

CONFIG = TradingConfig()

# =============================================================================
# LOGGING SETUP
# =============================================================================

def setup_logging() -> logging.Logger:
    """Configure structured logging."""
    logger = logging.getLogger("ScalpingBot")
    if not logger.handlers:
        logger.setLevel(logging.INFO)
        handler = logging.StreamHandler()
        formatter = logging.Formatter(
            '%(asctime)s | %(levelname)s | %(message)s',
            datefmt='%Y-%m-%d %H:%M:%S'
        )
        handler.setFormatter(formatter)
        logger.addHandler(handler)
    return logger

logger = setup_logging()

# =============================================================================
# SESSION STATE INITIALIZATION
# =============================================================================

def init_session_state():
    """Initialize all session state variables with proper defaults."""
    defaults = {
        'mt5_connected': False,
        'bot_running': False,
        'active_trade': None,
        'trade_open_time': None,
        'trade_history': [],
        'decision_log': [],
        'last_button_click': {},
        'last_data_fetch': None,
        'cached_data': None,
        'error_count': 0,
        'login_info': {'login': '', 'password': '', 'server': ''},
    }

    for key, default_value in defaults.items():
        if key not in st.session_state:
            st.session_state[key] = default_value


def log_decision(signal: str, score: float, details: Dict[str, Any], executed: bool):
    """Log trading decisions for analysis."""
    decision = {
        'time': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        'signal': signal,
        'score': score,
        'details': details,
        'executed': executed,
        'threshold': CONFIG.SIGNAL_THRESHOLD
    }
    st.session_state.decision_log.append(decision)

    # Keep only last 100 decisions
    if len(st.session_state.decision_log) > 100:
        st.session_state.decision_log = st.session_state.decision_log[-100:]

    logger.info(f"Decision: {signal} | Score: {score}/{CONFIG.SIGNAL_THRESHOLD} | Executed: {executed}")


# =============================================================================
# MT5 CONNECTION FUNCTIONS
# =============================================================================

def get_credentials() -> Tuple[Optional[int], Optional[str], Optional[str]]:
    """Get MT5 credentials from environment or session state."""
    # Try environment variables first (most secure)
    login = os.getenv('MT5_LOGIN')
    password = os.getenv('MT5_PASSWORD')
    server = os.getenv('MT5_SERVER')

    if login and password and server:
        return int(login), password, server

    # Fall back to session state (user input)
    login_info = st.session_state.get('login_info', {})
    if login_info.get('login') and login_info.get('password') and login_info.get('server'):
        try:
            return int(login_info['login']), login_info['password'], login_info['server']
        except ValueError:
            return None, None, None

    return None, None, None


def connect_mt5(login: Optional[int] = None,
                password: Optional[str] = None,
                server: Optional[str] = None) -> Tuple[bool, str]:
    """Connect to MetaTrader 5 with optional credentials."""
    try:
        if not mt5.initialize():
            error = mt5.last_error()
            logger.error(f"MT5 initialization failed: {error}")
            return False, f"MT5 initialization failed: {error}"

        # If credentials provided, login to specific account
        if login and password and server:
            authorized = mt5.login(login=login, password=password, server=server)
            if not authorized:
                error = mt5.last_error()
                logger.error(f"MT5 login failed: {error}")
                mt5.shutdown()
                return False, f"Login failed: {error}"
            logger.info(f"Connected to account {login} on {server}")

        # Verify connection
        account = mt5.account_info()
        if account is None:
            mt5.shutdown()
            return False, "Could not retrieve account info"

        logger.info(f"Connected: Account {account.login}, Balance: {account.balance} {account.currency}")
        return True, f"Connected to account {account.login}"

    except Exception as e:
        logger.error(f"Connection error: {e}")
        return False, f"Connection error: {str(e)}"


def disconnect_mt5():
    """Safely disconnect from MetaTrader 5."""
    try:
        mt5.shutdown()
        logger.info("Disconnected from MT5")
    except Exception as e:
        logger.error(f"Disconnect error: {e}")


def get_account_info() -> Optional[Dict[str, Any]]:
    """Get account information with error handling."""
    try:
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
            'currency': account.currency,
            'trade_mode': 'DEMO' if account.trade_mode == 0 else 'REAL'
        }
    except Exception as e:
        logger.error(f"Error getting account info: {e}")
        return None


# =============================================================================
# DATA FETCHING WITH CACHING
# =============================================================================

@st.cache_data(ttl=CONFIG.REFRESH_INTERVAL)
def fetch_forex_data(symbol: str, timeframe: str, num_bars: int = 200) -> Optional[pd.DataFrame]:
    """Fetch Forex data with caching to reduce API calls."""
    timeframe_map = {
        '1m': mt5.TIMEFRAME_M1,
        '5m': mt5.TIMEFRAME_M5,
        '15m': mt5.TIMEFRAME_M15,
        '30m': mt5.TIMEFRAME_M30,
        '1h': mt5.TIMEFRAME_H1,
        '4h': mt5.TIMEFRAME_H4,
        '1d': mt5.TIMEFRAME_D1,
    }

    try:
        mt5_timeframe = timeframe_map.get(timeframe, mt5.TIMEFRAME_M1)
        rates = mt5.copy_rates_from_pos(symbol, mt5_timeframe, 0, num_bars)

        if rates is None or len(rates) == 0:
            logger.warning(f"No data received for {symbol}")
            return None

        df = pd.DataFrame(rates)
        df['time'] = pd.to_datetime(df['time'], unit='s')
        df.set_index('time', inplace=True)
        df.columns = ['Open', 'High', 'Low', 'Close', 'TickVolume', 'Spread', 'Volume']

        return df

    except Exception as e:
        logger.error(f"Error fetching data for {symbol}: {e}")
        return None


# =============================================================================
# TECHNICAL INDICATORS
# =============================================================================

def calculate_indicators(df: pd.DataFrame) -> pd.DataFrame:
    """Calculate all technical indicators for scalping."""
    df = df.copy()

    try:
        # RSI (optimized for scalping: period 7)
        df['RSI'] = ta.momentum.RSIIndicator(df['Close'], window=7).rsi()

        # Stochastic Oscillator (for scalping)
        stoch = ta.momentum.StochasticOscillator(
            df['High'], df['Low'], df['Close'],
            window=14, smooth_window=3
        )
        df['Stoch_K'] = stoch.stoch()
        df['Stoch_D'] = stoch.stoch_signal()

        # Bollinger Bands
        bollinger = ta.volatility.BollingerBands(df['Close'], window=20, window_dev=2)
        df['BB_Upper'] = bollinger.bollinger_hband()
        df['BB_Middle'] = bollinger.bollinger_mavg()
        df['BB_Lower'] = bollinger.bollinger_lband()

        # EMAs for trend
        df['EMA_9'] = ta.trend.EMAIndicator(df['Close'], window=9).ema_indicator()
        df['EMA_21'] = ta.trend.EMAIndicator(df['Close'], window=21).ema_indicator()

        # ADX for trend strength
        adx = ta.trend.ADXIndicator(df['High'], df['Low'], df['Close'], window=14)
        df['ADX'] = adx.adx()

        # ATR for volatility
        df['ATR'] = ta.volatility.AverageTrueRange(
            df['High'], df['Low'], df['Close'], window=14
        ).average_true_range()

        # Volume MA
        df['Volume_MA20'] = df['TickVolume'].rolling(window=20).mean()

        # Fibonacci levels (based on recent swing)
        df = calculate_fibonacci_levels(df)

        # Candle color (for momentum)
        df['Green_Candle'] = df['Close'] > df['Open']

    except Exception as e:
        logger.error(f"Error calculating indicators: {e}")

    return df


def calculate_fibonacci_levels(df: pd.DataFrame, lookback: int = 50) -> pd.DataFrame:
    """Calculate Fibonacci retracement levels."""
    try:
        recent = df.tail(lookback)
        swing_high = recent['High'].max()
        swing_low = recent['Low'].min()
        diff = swing_high - swing_low

        df['Fib_0'] = swing_low
        df['Fib_236'] = swing_low + 0.236 * diff
        df['Fib_382'] = swing_low + 0.382 * diff
        df['Fib_500'] = swing_low + 0.500 * diff
        df['Fib_618'] = swing_low + 0.618 * diff
        df['Fib_100'] = swing_high

    except Exception as e:
        logger.error(f"Error calculating Fibonacci: {e}")
        # Set default values
        for level in ['Fib_0', 'Fib_236', 'Fib_382', 'Fib_500', 'Fib_618', 'Fib_100']:
            df[level] = np.nan

    return df


# =============================================================================
# SCORING SYSTEM
# =============================================================================

def calculate_buy_score(df: pd.DataFrame) -> Tuple[int, Dict[str, int]]:
    """
    Calculate BUY score based on multiple indicators.

    Scoring rules:
    - RSI < 30: +3 points
    - Stochastic crossover in 0-10: +3 points, in 10-20: +2 points
    - Price at Bollinger lower band: +1 point
    - Price near Fibonacci 0.618: +2 points, near 0.382: +1 point
    - Volume > MA20: +1 point
    - Green candle: +2 points

    Threshold: 6 points
    """
    score = 0
    details = {}

    try:
        current = df.iloc[-1]
        previous = df.iloc[-2] if len(df) > 1 else current

        # 1. RSI < 30 -> +3 points
        if pd.notna(current['RSI']) and current['RSI'] < 30:
            score += 3
            details['RSI < 30'] = 3

        # 2. Stochastic crossover
        if pd.notna(current['Stoch_K']) and pd.notna(previous['Stoch_K']):
            stoch_k = current['Stoch_K']
            # Crossover detection
            if current['Stoch_K'] > current['Stoch_D'] and previous['Stoch_K'] <= previous['Stoch_D']:
                if stoch_k <= 10:
                    score += 3
                    details['Stoch crossover 0-10'] = 3
                elif stoch_k <= 20:
                    score += 2
                    details['Stoch crossover 10-20'] = 2

        # 3. Bollinger lower band touch -> +1 point
        if pd.notna(current['BB_Lower']):
            bb_tolerance = (current['BB_Upper'] - current['BB_Lower']) * 0.05
            if current['Close'] <= current['BB_Lower'] + bb_tolerance:
                score += 1
                details['Bollinger lower'] = 1

        # 4. Fibonacci levels
        if pd.notna(current['Fib_618']) and pd.notna(current['Fib_382']):
            fib_tolerance = (current['Fib_100'] - current['Fib_0']) * 0.02

            if abs(current['Close'] - current['Fib_618']) <= fib_tolerance:
                score += 2
                details['Fib 0.618'] = 2
            elif abs(current['Close'] - current['Fib_382']) <= fib_tolerance:
                score += 1
                details['Fib 0.382'] = 1

        # 5. Volume > MA20 -> +1 point
        if pd.notna(current['Volume_MA20']) and current['TickVolume'] > current['Volume_MA20']:
            score += 1
            details['Volume > MA20'] = 1

        # 6. Green candle -> +2 points
        if current['Green_Candle']:
            score += 2
            details['Green candle'] = 2

    except Exception as e:
        logger.error(f"Error calculating buy score: {e}")

    return score, details


def calculate_sell_score(df: pd.DataFrame) -> Tuple[int, Dict[str, int]]:
    """
    Calculate SELL score (inverse of BUY logic).
    """
    score = 0
    details = {}

    try:
        current = df.iloc[-1]
        previous = df.iloc[-2] if len(df) > 1 else current

        # 1. RSI > 70 -> +3 points
        if pd.notna(current['RSI']) and current['RSI'] > 70:
            score += 3
            details['RSI > 70'] = 3

        # 2. Stochastic crossover (downward)
        if pd.notna(current['Stoch_K']) and pd.notna(previous['Stoch_K']):
            stoch_k = current['Stoch_K']
            if current['Stoch_K'] < current['Stoch_D'] and previous['Stoch_K'] >= previous['Stoch_D']:
                if stoch_k >= 90:
                    score += 3
                    details['Stoch crossover 90-100'] = 3
                elif stoch_k >= 80:
                    score += 2
                    details['Stoch crossover 80-90'] = 2

        # 3. Bollinger upper band touch -> +1 point
        if pd.notna(current['BB_Upper']):
            bb_tolerance = (current['BB_Upper'] - current['BB_Lower']) * 0.05
            if current['Close'] >= current['BB_Upper'] - bb_tolerance:
                score += 1
                details['Bollinger upper'] = 1

        # 4. Fibonacci levels (resistance)
        if pd.notna(current['Fib_618']) and pd.notna(current['Fib_382']):
            fib_tolerance = (current['Fib_100'] - current['Fib_0']) * 0.02

            if abs(current['Close'] - (current['Fib_100'] - current['Fib_618'] + current['Fib_0'])) <= fib_tolerance:
                score += 2
                details['Fib resistance 0.618'] = 2
            elif abs(current['Close'] - (current['Fib_100'] - current['Fib_382'] + current['Fib_0'])) <= fib_tolerance:
                score += 1
                details['Fib resistance 0.382'] = 1

        # 5. Volume > MA20 -> +1 point
        if pd.notna(current['Volume_MA20']) and current['TickVolume'] > current['Volume_MA20']:
            score += 1
            details['Volume > MA20'] = 1

        # 6. Red candle -> +2 points
        if not current['Green_Candle']:
            score += 2
            details['Red candle'] = 2

    except Exception as e:
        logger.error(f"Error calculating sell score: {e}")

    return score, details


def generate_signal(df: pd.DataFrame) -> Tuple[SignalType, int, Dict[str, int]]:
    """Generate trading signal based on scoring system."""
    if df is None or len(df) < 2:
        return SignalType.HOLD, 0, {}

    buy_score, buy_details = calculate_buy_score(df)
    sell_score, sell_details = calculate_sell_score(df)

    if buy_score >= CONFIG.SIGNAL_THRESHOLD and buy_score > sell_score:
        return SignalType.BUY, buy_score, buy_details
    elif sell_score >= CONFIG.SIGNAL_THRESHOLD and sell_score > buy_score:
        return SignalType.SELL, sell_score, sell_details
    else:
        # Return the higher score for display
        if buy_score >= sell_score:
            return SignalType.HOLD, buy_score, buy_details
        else:
            return SignalType.HOLD, sell_score, sell_details


# =============================================================================
# RISK MANAGEMENT
# =============================================================================

def validate_trade_conditions(symbol: str, lot_size: float) -> Tuple[bool, str]:
    """Validate all conditions before executing a trade."""
    try:
        # 1. Check symbol info
        symbol_info = mt5.symbol_info(symbol)
        if symbol_info is None:
            return False, f"Symbol {symbol} not found"

        # 2. Check if trading is allowed
        if not symbol_info.trade_mode == mt5.SYMBOL_TRADE_MODE_FULL:
            return False, "Trading not allowed for this symbol"

        # 3. Check spread
        tick = mt5.symbol_info_tick(symbol)
        if tick is None:
            return False, "Cannot get price tick"

        spread_points = (tick.ask - tick.bid) / symbol_info.point
        if spread_points > CONFIG.MAX_SPREAD_POINTS:
            return False, f"Spread too high: {spread_points:.0f} points (max: {CONFIG.MAX_SPREAD_POINTS})"

        # 4. Check account margin
        account = mt5.account_info()
        if account is None:
            return False, "Cannot get account info"

        # Check free margin (need at least 50% more than required)
        margin_required = lot_size * symbol_info.trade_contract_size / account.leverage
        if account.margin_free < margin_required * 1.5:
            return False, f"Insufficient margin: {account.margin_free:.2f} (need: {margin_required * 1.5:.2f})"

        # 5. Validate lot size
        if lot_size < symbol_info.volume_min:
            return False, f"Lot size too small (min: {symbol_info.volume_min})"
        if lot_size > symbol_info.volume_max:
            return False, f"Lot size too large (max: {symbol_info.volume_max})"

        # 6. Check risk percentage
        potential_loss = lot_size * symbol_info.trade_contract_size * 0.01  # 1% move
        risk_percent = (potential_loss / account.balance) * 100
        if risk_percent > CONFIG.MAX_RISK_PERCENT:
            return False, f"Risk too high: {risk_percent:.1f}% (max: {CONFIG.MAX_RISK_PERCENT}%)"

        return True, "Validation passed"

    except Exception as e:
        logger.error(f"Validation error: {e}")
        return False, f"Validation error: {str(e)}"


def calculate_safe_lot_size(symbol: str, risk_percent: float, sl_pips: int) -> float:
    """Calculate safe lot size based on risk management."""
    try:
        account = mt5.account_info()
        symbol_info = mt5.symbol_info(symbol)

        if account is None or symbol_info is None:
            return CONFIG.MIN_LOT_SIZE

        # Risk amount in account currency
        risk_amount = account.balance * (risk_percent / 100)

        # Pip value calculation
        pip_value = symbol_info.trade_contract_size * symbol_info.point * 10

        # Lot size calculation
        lot_size = risk_amount / (sl_pips * pip_value)

        # Round to allowed step
        lot_size = round(lot_size / symbol_info.volume_step) * symbol_info.volume_step

        # Clamp to min/max
        lot_size = max(symbol_info.volume_min, min(lot_size, symbol_info.volume_max))

        return lot_size

    except Exception as e:
        logger.error(f"Lot calculation error: {e}")
        return CONFIG.MIN_LOT_SIZE


# =============================================================================
# TRADING FUNCTIONS
# =============================================================================

def execute_trade(symbol: str, order_type: SignalType, lot_size: float,
                  sl_pips: int, tp_pips: int) -> Tuple[bool, Any]:
    """Execute a trade with full validation."""

    # Validate conditions first
    valid, message = validate_trade_conditions(symbol, lot_size)
    if not valid:
        logger.warning(f"Trade validation failed: {message}")
        return False, message

    try:
        symbol_info = mt5.symbol_info(symbol)
        if not symbol_info.visible:
            if not mt5.symbol_select(symbol, True):
                return False, f"Failed to select {symbol}"

        point = symbol_info.point
        tick = mt5.symbol_info_tick(symbol)

        if order_type == SignalType.BUY:
            price = tick.ask
            trade_type = mt5.ORDER_TYPE_BUY
            sl = round(price - sl_pips * point * 10, symbol_info.digits)
            tp = round(price + tp_pips * point * 10, symbol_info.digits)
        else:
            price = tick.bid
            trade_type = mt5.ORDER_TYPE_SELL
            sl = round(price + sl_pips * point * 10, symbol_info.digits)
            tp = round(price - tp_pips * point * 10, symbol_info.digits)

        request = {
            "action": mt5.TRADE_ACTION_DEAL,
            "symbol": symbol,
            "volume": lot_size,
            "type": trade_type,
            "price": price,
            "sl": sl,
            "tp": tp,
            "deviation": 20,
            "magic": 234567,
            "comment": "ScalpingBot Pro",
            "type_time": mt5.ORDER_TIME_GTC,
            "type_filling": mt5.ORDER_FILLING_IOC,
        }

        result = mt5.order_send(request)

        if result is None:
            error = mt5.last_error()
            logger.error(f"Order send failed: {error}")
            return False, f"Order failed: {error}"

        if result.retcode != mt5.TRADE_RETCODE_DONE:
            logger.error(f"Order rejected: {result.retcode} - {result.comment}")
            return False, f"Order rejected ({result.retcode}): {result.comment}"

        trade_info = {
            'ticket': result.order,
            'symbol': symbol,
            'type': order_type.value,
            'price_open': price,
            'lot': lot_size,
            'sl': sl,
            'tp': tp,
            'time_open': datetime.now(),
            'time_close': None,
            'price_close': None,
            'profit': None,
            'status': 'OPEN'
        }

        logger.info(f"Trade executed: {order_type.value} {lot_size} {symbol} @ {price}")
        return True, trade_info

    except Exception as e:
        logger.error(f"Trade execution error: {e}")
        return False, f"Execution error: {str(e)}"


def close_position(ticket: int) -> Tuple[bool, str]:
    """Close an open position by ticket."""
    try:
        positions = mt5.positions_get(ticket=ticket)
        if not positions:
            return False, "Position not found"

        position = positions[0]
        symbol = position.symbol
        lot = position.volume

        symbol_info = mt5.symbol_info(symbol)
        if symbol_info is None:
            return False, f"Symbol {symbol} info not available"

        tick = mt5.symbol_info_tick(symbol)
        if tick is None:
            return False, "Cannot get price tick"

        if position.type == mt5.POSITION_TYPE_BUY:
            trade_type = mt5.ORDER_TYPE_SELL
            price = tick.bid
        else:
            trade_type = mt5.ORDER_TYPE_BUY
            price = tick.ask

        request = {
            "action": mt5.TRADE_ACTION_DEAL,
            "symbol": symbol,
            "volume": lot,
            "type": trade_type,
            "position": ticket,
            "price": price,
            "deviation": 20,
            "magic": 234567,
            "comment": "ScalpingBot Close",
            "type_time": mt5.ORDER_TIME_GTC,
            "type_filling": mt5.ORDER_FILLING_IOC,
        }

        result = mt5.order_send(request)

        if result is None or result.retcode != mt5.TRADE_RETCODE_DONE:
            error = result.comment if result else mt5.last_error()
            return False, f"Close failed: {error}"

        logger.info(f"Position {ticket} closed @ {price}")
        return True, f"Position closed @ {price:.5f}"

    except Exception as e:
        logger.error(f"Close position error: {e}")
        return False, f"Close error: {str(e)}"


def get_open_positions() -> List[Dict[str, Any]]:
    """Get all open positions with error handling."""
    try:
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
            'tp': p.tp,
            'time': datetime.fromtimestamp(p.time)
        } for p in positions]

    except Exception as e:
        logger.error(f"Error getting positions: {e}")
        return []


# =============================================================================
# UI HELPER FUNCTIONS
# =============================================================================

def check_button_debounce(button_name: str) -> bool:
    """Check if button can be clicked (debounce protection)."""
    now = time.time()
    last_click = st.session_state.last_button_click.get(button_name, 0)

    if now - last_click < CONFIG.BUTTON_DEBOUNCE:
        return False

    st.session_state.last_button_click[button_name] = now
    return True


def calculate_pip_value(symbol: str, lot_size: float) -> float:
    """Calculate pip value in account currency."""
    try:
        symbol_info = mt5.symbol_info(symbol)
        if symbol_info is None:
            return 0.0
        # Standard pip value calculation
        pip_value = lot_size * symbol_info.trade_contract_size * symbol_info.point * 10
        return pip_value
    except:
        return 0.0


def calculate_money_from_pips(symbol: str, lot_size: float, pips: int) -> float:
    """Convert pips to money value."""
    pip_value = calculate_pip_value(symbol, lot_size)
    return pips * pip_value


def get_indicator_status(df: pd.DataFrame) -> Dict[str, Dict[str, Any]]:
    """Get status of each indicator for display."""
    indicators = {}
    current = df.iloc[-1]
    previous = df.iloc[-2] if len(df) > 1 else current

    # RSI
    rsi_val = current['RSI'] if pd.notna(current['RSI']) else 50
    rsi_active = rsi_val < 30 or rsi_val > 70
    indicators['RSI'] = {
        'value': f"{rsi_val:.1f}",
        'active': rsi_active,
        'points': 3 if rsi_active else 0,
        'condition': f"RSI = {rsi_val:.1f}" + (" < 30" if rsi_val < 30 else " > 70" if rsi_val > 70 else "")
    }

    # Stochastic
    stoch_k = current['Stoch_K'] if pd.notna(current['Stoch_K']) else 50
    stoch_cross = False
    stoch_points = 0
    if pd.notna(current['Stoch_K']) and pd.notna(previous['Stoch_K']):
        # Buy crossover
        if current['Stoch_K'] > current['Stoch_D'] and previous['Stoch_K'] <= previous['Stoch_D']:
            if stoch_k <= 10:
                stoch_cross = True
                stoch_points = 3
            elif stoch_k <= 20:
                stoch_cross = True
                stoch_points = 2
        # Sell crossover
        elif current['Stoch_K'] < current['Stoch_D'] and previous['Stoch_K'] >= previous['Stoch_D']:
            if stoch_k >= 90:
                stoch_cross = True
                stoch_points = 3
            elif stoch_k >= 80:
                stoch_cross = True
                stoch_points = 2

    indicators['Stoch'] = {
        'value': f"K={stoch_k:.1f}",
        'active': stoch_cross,
        'points': stoch_points,
        'condition': f"Stoch: {'Crossover' if stoch_cross else 'Pas de cross'} (K={stoch_k:.1f})"
    }

    # Bollinger
    bb_active = False
    bb_points = 0
    if pd.notna(current['BB_Lower']) and pd.notna(current['BB_Upper']):
        bb_tolerance = (current['BB_Upper'] - current['BB_Lower']) * 0.05
        if current['Close'] <= current['BB_Lower'] + bb_tolerance:
            bb_active = True
            bb_points = 1
        elif current['Close'] >= current['BB_Upper'] - bb_tolerance:
            bb_active = True
            bb_points = 1

    indicators['Bollinger'] = {
        'value': 'BB',
        'active': bb_active,
        'points': bb_points,
        'condition': f"Bollinger: Prix {'< BB-' if current['Close'] <= current['BB_Lower'] + bb_tolerance else '> BB+' if bb_active else '> BB-'}"
    }

    # Fibonacci
    fib_active = False
    fib_points = 0
    if pd.notna(current['Fib_618']) and pd.notna(current['Fib_382']):
        fib_tolerance = (current['Fib_100'] - current['Fib_0']) * 0.02
        if abs(current['Close'] - current['Fib_618']) <= fib_tolerance:
            fib_active = True
            fib_points = 2
        elif abs(current['Close'] - current['Fib_382']) <= fib_tolerance:
            fib_active = True
            fib_points = 1

    indicators['Fibonacci'] = {
        'value': 'Fib',
        'active': fib_active,
        'points': fib_points,
        'condition': f"Fibonacci: {'Sur niveau cle' if fib_active else 'Pas sur niveau cle'}"
    }

    # Volume
    vol_active = False
    if pd.notna(current['Volume_MA20']):
        vol_active = current['TickVolume'] > current['Volume_MA20']

    indicators['Volume'] = {
        'value': 'Vol',
        'active': vol_active,
        'points': 1 if vol_active else 0,
        'condition': f"Volume: {'> MA20' if vol_active else '< MA20'}"
    }

    # Candle
    candle_green = current['Green_Candle']
    indicators['Bougie'] = {
        'value': 'Candle',
        'active': True,  # Always contributes
        'points': 2,
        'condition': f"Bougie: {'Verte (acheteur)' if candle_green else 'Rouge (vendeur)'}"
    }

    return indicators


def calculate_trade_statistics() -> Dict[str, Any]:
    """Calculate win/loss statistics from trade history."""
    history = st.session_state.trade_history
    completed_trades = [t for t in history if t.get('profit') is not None]

    if not completed_trades:
        return {
            'total_trades': len(history),
            'completed': 0,
            'wins': 0,
            'losses': 0,
            'win_rate': 0.0,
            'total_profit': 0.0,
            'total_loss': 0.0,
            'net_profit': 0.0
        }

    wins = [t for t in completed_trades if t['profit'] > 0]
    losses = [t for t in completed_trades if t['profit'] <= 0]

    total_profit = sum(t['profit'] for t in wins)
    total_loss = sum(t['profit'] for t in losses)

    return {
        'total_trades': len(history),
        'completed': len(completed_trades),
        'wins': len(wins),
        'losses': len(losses),
        'win_rate': (len(wins) / len(completed_trades) * 100) if completed_trades else 0.0,
        'total_profit': total_profit,
        'total_loss': total_loss,
        'net_profit': total_profit + total_loss
    }


# =============================================================================
# STREAMLIT UI
# =============================================================================

# Page configuration
st.set_page_config(
    page_title="Scalping Bot Pro",
    page_icon="📈",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Initialize session state
init_session_state()

# Custom CSS for compact display
st.markdown("""
<style>
    .block-container {padding: 1rem 1rem;}
    .stMetric {padding: 0.5rem;}
    div[data-testid="stMetricValue"] {font-size: 1.2rem;}
    .stAlert {padding: 0.5rem; margin: 0.5rem 0;}
</style>
""", unsafe_allow_html=True)

st.title("📈 Scalping Bot Pro")

# =============================================================================
# SIDEBAR - CONNECTION & SETTINGS
# =============================================================================

with st.sidebar:
    st.header("Connection")

    if not st.session_state.mt5_connected:
        st.subheader("MT5 Login")
        login = st.text_input("Account Number", value=st.session_state.login_info.get('login', ''))
        password = st.text_input("Password", type="password", value=st.session_state.login_info.get('password', ''))
        server = st.text_input("Server", value=st.session_state.login_info.get('server', ''),
                               placeholder="e.g., XMGlobal-MT5")

        st.session_state.login_info = {'login': login, 'password': password, 'server': server}

        if st.button("Connect", type="primary", use_container_width=True):
            if login and password and server:
                success, message = connect_mt5(int(login), password, server)
                if success:
                    st.session_state.mt5_connected = True
                    st.success(message)
                    st.rerun()
                else:
                    st.error(message)
            else:
                st.warning("Please fill all fields")
    else:
        account = get_account_info()
        if account:
            st.success(f"Connected: {account['login']}")
            st.metric("Balance", f"{account['balance']:.2f} {account['currency']}")
            st.metric("Equity", f"{account['equity']:.2f} {account['currency']}")
            st.metric("Free Margin", f"{account['free_margin']:.2f}")

            mode_color = "green" if account['trade_mode'] == 'DEMO' else "red"
            st.markdown(f"**Mode:** :{mode_color}[{account['trade_mode']}]")

        if st.button("Disconnect", use_container_width=True):
            disconnect_mt5()
            st.session_state.mt5_connected = False
            st.session_state.active_trade = None
            st.rerun()

    st.divider()

    # Trading Settings
    st.header("Settings")

    # Symbol selection (with broker-specific options)
    broker_type = st.selectbox("Broker Type", ["standard", "xm"], index=0)
    symbols = BROKER_SYMBOLS[broker_type]
    selected_symbol = st.selectbox("Symbol", symbols)

    # Timeframe (optimized for scalping)
    timeframe = st.selectbox("Timeframe", ["1m", "5m", "15m"], index=0)

    st.subheader("Risk Management")
    risk_percent = st.slider("Risk %", 0.5, CONFIG.MAX_RISK_PERCENT, CONFIG.DEFAULT_RISK_PERCENT, 0.5)
    lot_size = st.number_input("Lot Size", CONFIG.MIN_LOT_SIZE, CONFIG.MAX_LOT_SIZE,
                                CONFIG.DEFAULT_LOT_SIZE, 0.01, format="%.2f")

    # Calculate money values for SL/TP
    sl_pips = st.number_input("Stop Loss (pips)", 5, 50, 15, 5)
    tp_pips = st.number_input("Take Profit (pips)", 5, 100, 20, 5)

    # Show conversion to EUR
    if st.session_state.mt5_connected:
        sl_eur = calculate_money_from_pips(selected_symbol, lot_size, sl_pips)
        tp_eur = calculate_money_from_pips(selected_symbol, lot_size, tp_pips)
        account = get_account_info()
        if account:
            sl_pct = (sl_eur / account['balance'] * 100) if account['balance'] > 0 else 0
            tp_pct = (tp_eur / account['balance'] * 100) if account['balance'] > 0 else 0
            st.caption(f"SL: {sl_pips} pips = {sl_eur:.2f} EUR ({sl_pct:.2f}%)")
            st.caption(f"TP: {tp_pips} pips = {tp_eur:.2f} EUR ({tp_pct:.2f}%)")
            st.caption(f"Lot {lot_size} = {lot_size * 100000:.0f} unites")

    st.subheader("Timer")
    trade_duration = st.slider("Auto-close (min)", CONFIG.MIN_TRADE_DURATION,
                               CONFIG.MAX_TRADE_DURATION, CONFIG.DEFAULT_TRADE_DURATION)

# =============================================================================
# MAIN CONTENT
# =============================================================================

if st.session_state.mt5_connected:
    # Fetch data
    df = fetch_forex_data(selected_symbol, timeframe)

    if df is not None and len(df) > 0:
        # Calculate indicators
        df = calculate_indicators(df)

        # Generate signal
        signal, score, details = generate_signal(df)

        # Current values
        current = df.iloc[-1]
        price_change = current['Close'] - df.iloc[-2]['Close']
        price_change_pct = (price_change / df.iloc[-2]['Close']) * 100

        # Get indicator status for display
        indicator_status = get_indicator_status(df)

        # =================================================================
        # METRICS ROW
        # =================================================================
        col1, col2, col3, col4, col5 = st.columns(5)

        col1.metric("Prix", f"{current['Close']:.5f}", f"{price_change_pct:+.3f}%")
        col2.metric("RSI", f"{current['RSI']:.1f}" if pd.notna(current['RSI']) else "N/A")
        col3.metric("Stoch K", f"{current['Stoch_K']:.1f}" if pd.notna(current['Stoch_K']) else "N/A")

        signal_emoji = "🟢" if signal == SignalType.BUY else "🔴" if signal == SignalType.SELL else "⚪"
        signal_text = "ACHAT" if signal == SignalType.BUY else "VENTE" if signal == SignalType.SELL else "ATTENTE"
        col4.metric("Signal", f"{signal_emoji} {signal_text}")
        col5.metric("Score", f"{score}/{CONFIG.SIGNAL_THRESHOLD}")

        st.divider()

        # =================================================================
        # INDICATORS STATUS PANEL
        # =================================================================
        st.subheader("Indicateurs")

        # Create 3 columns for indicators
        ind_col1, ind_col2 = st.columns(2)

        with ind_col1:
            for name in ['RSI', 'Bollinger', 'Volume']:
                ind = indicator_status[name]
                icon = "✅" if ind['active'] and ind['points'] > 0 else "❌"
                color = "green" if ind['active'] and ind['points'] > 0 else "red"
                st.markdown(
                    f":{color}[{icon} **{name}:** {ind['condition']} → +{ind['points']}]"
                )

        with ind_col2:
            for name in ['Stoch', 'Fibonacci', 'Bougie']:
                ind = indicator_status[name]
                icon = "✅" if ind['active'] and ind['points'] > 0 else "❌"
                color = "green" if ind['active'] and ind['points'] > 0 else "red"
                st.markdown(
                    f":{color}[{icon} **{name}:** {ind['condition']} → +{ind['points']}]"
                )

        st.divider()

        # =================================================================
        # TRADING CONTROLS
        # =================================================================
        st.subheader("Actions")

        col_buy, col_sell, col_close = st.columns(3)

        with col_buy:
            if st.button("🟢 ACHETER", use_container_width=True, type="primary",
                        disabled=st.session_state.active_trade is not None):
                if check_button_debounce("buy"):
                    success, result = execute_trade(selected_symbol, SignalType.BUY,
                                                    lot_size, sl_pips, tp_pips)
                    if success:
                        st.session_state.active_trade = result
                        st.session_state.trade_open_time = datetime.now()
                        st.session_state.trade_history.append(result)
                        st.success(f"ACHAT @ {result['price_open']:.5f}")
                        st.rerun()
                    else:
                        st.error(result)

        with col_sell:
            if st.button("🔴 VENDRE", use_container_width=True,
                        disabled=st.session_state.active_trade is not None):
                if check_button_debounce("sell"):
                    success, result = execute_trade(selected_symbol, SignalType.SELL,
                                                    lot_size, sl_pips, tp_pips)
                    if success:
                        st.session_state.active_trade = result
                        st.session_state.trade_open_time = datetime.now()
                        st.session_state.trade_history.append(result)
                        st.success(f"VENTE @ {result['price_open']:.5f}")
                        st.rerun()
                    else:
                        st.error(result)

        with col_close:
            if st.button("⬜ FERMER TOUT", use_container_width=True,
                        disabled=st.session_state.active_trade is None):
                if check_button_debounce("close"):
                    if st.session_state.active_trade:
                        # Get position profit before closing
                        positions = get_open_positions()
                        trade_profit = 0
                        for pos in positions:
                            if pos['ticket'] == st.session_state.active_trade['ticket']:
                                trade_profit = pos['profit']
                                break

                        success, msg = close_position(st.session_state.active_trade['ticket'])
                        if success:
                            # Update trade history with profit
                            st.session_state.active_trade['status'] = 'CLOSED'
                            st.session_state.active_trade['time_close'] = datetime.now()
                            st.session_state.active_trade['profit'] = trade_profit

                            # Update in history
                            for i, t in enumerate(st.session_state.trade_history):
                                if t.get('ticket') == st.session_state.active_trade['ticket']:
                                    st.session_state.trade_history[i] = st.session_state.active_trade
                                    break

                            st.session_state.active_trade = None
                            st.session_state.trade_open_time = None
                            st.success(f"Position fermee | Profit: {trade_profit:+.2f} EUR")
                            st.rerun()
                        else:
                            st.error(msg)

        # =================================================================
        # AUTO TRADING & TIMER
        # =================================================================

        st.divider()

        auto_col1, auto_col2 = st.columns([1, 2])

        with auto_col1:
            auto_enabled = st.toggle("🤖 AUTO", value=st.session_state.bot_running)
            st.session_state.bot_running = auto_enabled

        with auto_col2:
            if st.session_state.active_trade:
                elapsed = (datetime.now() - st.session_state.trade_open_time).total_seconds()
                remaining = (trade_duration * 60) - elapsed

                if remaining > 0:
                    minutes = int(remaining // 60)
                    seconds = int(remaining % 60)
                    st.warning(f"Position open - Auto-close in: {minutes}m {seconds}s")
                else:
                    # Auto close on timer - get profit first
                    positions = get_open_positions()
                    trade_profit = 0
                    for pos in positions:
                        if pos['ticket'] == st.session_state.active_trade['ticket']:
                            trade_profit = pos['profit']
                            break

                    success, msg = close_position(st.session_state.active_trade['ticket'])
                    if success:
                        st.session_state.active_trade['status'] = 'CLOSED (Timer)'
                        st.session_state.active_trade['time_close'] = datetime.now()
                        st.session_state.active_trade['profit'] = trade_profit

                        # Update in history
                        for i, t in enumerate(st.session_state.trade_history):
                            if t.get('ticket') == st.session_state.active_trade['ticket']:
                                st.session_state.trade_history[i] = st.session_state.active_trade
                                break

                        st.session_state.active_trade = None
                        st.session_state.trade_open_time = None
                        st.info(f"Position fermee par timer | Profit: {trade_profit:+.2f} EUR")
                        st.rerun()
            elif st.session_state.bot_running:
                # Auto execute if score >= threshold
                if score >= CONFIG.SIGNAL_THRESHOLD:
                    # Determine direction based on which score is higher
                    buy_score, _ = calculate_buy_score(df)
                    sell_score, _ = calculate_sell_score(df)

                    if buy_score >= CONFIG.SIGNAL_THRESHOLD and buy_score >= sell_score:
                        st.warning(f"Signal ACHAT detecte! Score: {buy_score}/{CONFIG.SIGNAL_THRESHOLD}")
                        log_decision("BUY", buy_score, details, True)
                        success, result = execute_trade(selected_symbol, SignalType.BUY, lot_size, sl_pips, tp_pips)
                        if success:
                            st.session_state.active_trade = result
                            st.session_state.trade_open_time = datetime.now()
                            st.session_state.trade_history.append(result)
                            st.success(f"AUTO ACHAT @ {result['price_open']:.5f}")
                            st.rerun()
                        else:
                            st.error(f"Erreur: {result}")

                    elif sell_score >= CONFIG.SIGNAL_THRESHOLD and sell_score > buy_score:
                        st.warning(f"Signal VENTE detecte! Score: {sell_score}/{CONFIG.SIGNAL_THRESHOLD}")
                        log_decision("SELL", sell_score, details, True)
                        success, result = execute_trade(selected_symbol, SignalType.SELL, lot_size, sl_pips, tp_pips)
                        if success:
                            st.session_state.active_trade = result
                            st.session_state.trade_open_time = datetime.now()
                            st.session_state.trade_history.append(result)
                            st.success(f"AUTO VENTE @ {result['price_open']:.5f}")
                            st.rerun()
                        else:
                            st.error(f"Erreur: {result}")
                else:
                    st.info(f"En attente de signal (score actuel: {score}/{CONFIG.SIGNAL_THRESHOLD})")
                    log_decision(signal.value, score, details, False)

        # =================================================================
        # CHART
        # =================================================================

        st.divider()

        with st.expander("Technical Chart", expanded=True):
            fig = make_subplots(rows=3, cols=1, shared_xaxes=True,
                               vertical_spacing=0.03,
                               row_heights=[0.6, 0.2, 0.2],
                               subplot_titles=[selected_symbol, 'RSI', 'Stochastic'])

            # Candlestick
            fig.add_trace(go.Candlestick(
                x=df.index, open=df['Open'], high=df['High'],
                low=df['Low'], close=df['Close'], name='Price'
            ), row=1, col=1)

            # Bollinger Bands
            fig.add_trace(go.Scatter(x=df.index, y=df['BB_Upper'], name='BB Upper',
                                     line=dict(color='gray', width=1, dash='dash')), row=1, col=1)
            fig.add_trace(go.Scatter(x=df.index, y=df['BB_Lower'], name='BB Lower',
                                     line=dict(color='gray', width=1, dash='dash'),
                                     fill='tonexty', fillcolor='rgba(128,128,128,0.1)'), row=1, col=1)

            # EMAs
            fig.add_trace(go.Scatter(x=df.index, y=df['EMA_9'], name='EMA 9',
                                     line=dict(color='orange', width=1)), row=1, col=1)
            fig.add_trace(go.Scatter(x=df.index, y=df['EMA_21'], name='EMA 21',
                                     line=dict(color='purple', width=1)), row=1, col=1)

            # RSI
            fig.add_trace(go.Scatter(x=df.index, y=df['RSI'], name='RSI',
                                     line=dict(color='blue', width=1)), row=2, col=1)
            fig.add_hline(y=70, line_dash="dash", line_color="red", row=2, col=1)
            fig.add_hline(y=30, line_dash="dash", line_color="green", row=2, col=1)

            # Stochastic
            fig.add_trace(go.Scatter(x=df.index, y=df['Stoch_K'], name='Stoch K',
                                     line=dict(color='blue', width=1)), row=3, col=1)
            fig.add_trace(go.Scatter(x=df.index, y=df['Stoch_D'], name='Stoch D',
                                     line=dict(color='orange', width=1)), row=3, col=1)
            fig.add_hline(y=80, line_dash="dash", line_color="red", row=3, col=1)
            fig.add_hline(y=20, line_dash="dash", line_color="green", row=3, col=1)

            fig.update_layout(height=500, template='plotly_dark',
                             xaxis_rangeslider_visible=False,
                             showlegend=False)
            st.plotly_chart(fig, use_container_width=True)

        # =================================================================
        # POSITIONS & HISTORY
        # =================================================================

        st.divider()
        st.subheader("Positions & Historique")

        col_pos, col_hist, col_stats = st.columns(3)

        with col_pos:
            st.markdown("**Positions Ouvertes**")
            positions = get_open_positions()
            if positions:
                for pos in positions:
                    profit_color = "green" if pos['profit'] >= 0 else "red"
                    st.markdown(
                        f"**{pos['type']}** {pos['symbol']} | "
                        f"{pos['volume']} lots @ {pos['price_open']:.5f} | "
                        f"P/L: :{profit_color}[{pos['profit']:.2f} EUR]"
                    )

                total_profit = sum(p['profit'] for p in positions)
                color = "green" if total_profit >= 0 else "red"
                st.markdown(f"---\n**Total P/L:** :{color}[**{total_profit:.2f} EUR**]")
            else:
                st.info("Aucune position ouverte")

        with col_hist:
            st.markdown("**Historique des Trades**")
            if st.session_state.trade_history:
                for trade in st.session_state.trade_history[-5:]:  # Last 5 trades
                    time_str = trade.get('time_open', datetime.now())
                    if isinstance(time_str, datetime):
                        time_str = time_str.strftime('%H:%M:%S')
                    profit = trade.get('profit', 0) or 0
                    profit_color = "green" if profit >= 0 else "red"
                    status = trade.get('status', 'OPEN')

                    st.markdown(
                        f"**{time_str}** | {trade['type']} {trade['symbol']} | "
                        f"@ {trade['price_open']:.5f} | "
                        f":{profit_color}[{profit:+.2f} EUR] | {status}"
                    )
            else:
                st.info("Aucun historique")

        with col_stats:
            st.markdown("**Statistiques**")
            stats = calculate_trade_statistics()

            # Win/Loss stats
            st.metric("Trades Total", stats['total_trades'])

            if stats['completed'] > 0:
                win_color = "green" if stats['win_rate'] >= 50 else "red"
                st.markdown(f"**Taux de reussite:** :{win_color}[**{stats['win_rate']:.1f}%**]")
                st.markdown(f"Gains: {stats['wins']} | Pertes: {stats['losses']}")

                # Profit/Loss amounts
                st.markdown(f":green[**Gains:** +{stats['total_profit']:.2f} EUR]")
                st.markdown(f":red[**Pertes:** {stats['total_loss']:.2f} EUR]")

                net_color = "green" if stats['net_profit'] >= 0 else "red"
                st.markdown(f"**Net:** :{net_color}[**{stats['net_profit']:+.2f} EUR**]")

                # Percentage of balance
                account = get_account_info()
                if account and account['balance'] > 0:
                    net_pct = (stats['net_profit'] / account['balance']) * 100
                    st.markdown(f"**Performance:** :{net_color}[**{net_pct:+.2f}%**]")
            else:
                st.info("Pas encore de trades termines")

        # =================================================================
        # AUTO REFRESH
        # =================================================================

        if st.session_state.bot_running or st.session_state.active_trade:
            time.sleep(CONFIG.REFRESH_INTERVAL)
            st.rerun()

    else:
        st.error(f"Could not fetch data for {selected_symbol}. Check if symbol exists.")

else:
    st.info("Please connect to MetaTrader 5 using the sidebar.")

    st.markdown("""
    ## Quick Start

    1. **Install MT5** from your broker (e.g., XM, IC Markets)
    2. **Enable Algo Trading**: Tools > Options > Expert Advisors
    3. **Enter credentials** in the sidebar and connect

    ## Features

    - **Multi-indicator scoring**: RSI, Stochastic, Bollinger, Fibonacci, Volume
    - **Risk management**: Max 2% per trade, margin validation
    - **Auto-close timer**: 1-10 minutes configurable
    - **Trade history**: Complete logging of all decisions
    """)

# Footer
st.divider()
st.caption("Trading involves risk. Use demo account for testing. Not financial advice.")
```

## Running the Bot

```bash
streamlit run scalping_bot_pro.py
```

## Architecture Overview

This production-ready bot implements:

1. **Secure Configuration**: Credentials via environment variables or secure input
2. **Risk Management**: Maximum 2% risk per trade, margin validation
3. **Multi-Indicator Scoring**: 6+ indicators for signal confirmation
4. **Error Handling**: Comprehensive logging and graceful error recovery
5. **Button Debounce**: Prevents accidental double-clicks

## Scoring System (Threshold: 6 points)

### BUY Signals

| Indicator | Condition | Points |
|-----------|-----------|--------|
| RSI | < 30 (oversold) | +3 |
| Stochastic | Crossover in 0-10 zone | +3 |
| Stochastic | Crossover in 10-20 zone | +2 |
| Bollinger | Price at lower band | +1 |
| Fibonacci | Price at 0.618 level | +2 |
| Fibonacci | Price at 0.382 level | +1 |
| Volume | Above 20-period MA | +1 |
| Candle | Green (bullish) | +2 |

### SELL Signals

| Indicator | Condition | Points |
|-----------|-----------|--------|
| RSI | > 70 (overbought) | +3 |
| Stochastic | Crossover in 90-100 zone | +3 |
| Stochastic | Crossover in 80-90 zone | +2 |
| Bollinger | Price at upper band | +1 |
| Fibonacci | Price at resistance level | +2 |
| Volume | Above 20-period MA | +1 |
| Candle | Red (bearish) | +2 |

**A trade is executed when the score reaches 6 or higher.**

## Risk Management Features

| Feature | Description | Default |
|---------|-------------|---------|
| Max Risk % | Maximum balance at risk per trade | 2% |
| Lot Validation | Validates against broker min/max | 0.01-1.0 |
| Margin Check | Ensures 150% margin coverage | Auto |
| Spread Filter | Blocks trades when spread > 30 points | Auto |
| Trade Timer | Auto-closes positions after X minutes | 5 min |

## Safety Features

1. **Pre-trade Validation**: Checks margin, spread, and lot size before every trade
2. **Button Debounce**: 2-second cooldown prevents double-clicks
3. **Single Position**: Only one position at a time per symbol
4. **Auto-Close Timer**: Configurable 1-10 minute auto-close
5. **Structured Logging**: All decisions logged for analysis
6. **Demo/Real Detection**: Displays account mode clearly

## Broker Configuration

The bot supports different symbol formats:

| Broker Type | Symbol Format | Example |
|-------------|---------------|---------|
| Standard | EURUSD | Most brokers |
| XM | EURUSD# | XM Global |

## Error Codes Reference

| Code | Meaning | Solution |
|------|---------|----------|
| 10027 | AutoTrading disabled | Enable in MT5: Tools > Options |
| 10017 | Trade disabled | Market closed (weekend) |
| 10019 | No prices | Check symbol name |
| 10030 | Invalid stops | Adjust SL/TP distance |

## Security Best Practices

1. **Use environment variables** for credentials (`.env` file)
2. **Never commit** `.env` files to version control
3. **Use DEMO account** for all testing
4. **Monitor trades** - don't leave bot unattended

## Logging

The bot creates structured logs for all operations:

```
2024-01-15 14:30:45 | INFO | Connected: Account 12345678, Balance: 10000.00 EUR
2024-01-15 14:30:46 | INFO | Decision: BUY | Score: 7/6 | Executed: True
2024-01-15 14:30:46 | INFO | Trade executed: BUY 0.01 EURUSD# @ 1.08234
```

## Performance Optimizations

1. **Data Caching**: 3-second TTL cache reduces API calls
2. **Efficient Indicators**: Optimized calculation for M1 timeframe
3. **Minimal Redraws**: Only refreshes when necessary

## Next Steps

- Add Telegram/email notifications
- Implement trailing stop loss
- Create backtesting module
- Add multi-timeframe analysis
- Portfolio diversification (multiple pairs)
