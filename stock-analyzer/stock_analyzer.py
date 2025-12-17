"""
Stock Analysis Tool - Analyse financière d'actions boursières
Application Streamlit portable pour analyser n'importe quelle action.
"""

import streamlit as st
import pandas as pd
import numpy as np
import plotly.graph_objects as go
from yahooquery import search
import yfinance as yf
from datetime import datetime

# Configuration de la page
st.set_page_config(
    page_title="Stock Analyzer",
    page_icon="📈",
    layout="wide"
)

# Titre principal
st.title("📊 Analyseur d'Actions Boursières")
st.markdown("---")


# ============ FONCTIONS UTILITAIRES ============

@st.cache_data(ttl=300)  # Cache de 5 minutes
def get_ticker_from_name(name: str) -> str | None:
    """Recherche le symbole boursier à partir du nom de l'entreprise."""
    try:
        results = search(name).get('quotes')
        if results:
            return results[0]['symbol']
        return None
    except Exception:
        return None


@st.cache_data(ttl=300)
def get_stock_data(ticker_symbol: str, period: str):
    """Récupère les données boursières via yfinance."""
    try:
        tkr = yf.Ticker(ticker_symbol)
        info = tkr.info
        hist = tkr.history(period=period)
        financials = tkr.financials
        recommendations = tkr.recommendations_summary
        return tkr, info, hist, financials, recommendations
    except Exception as e:
        st.error(f"Erreur lors de la récupération des données: {e}")
        return None, None, None, None, None


def format_value(val, unit: str = '') -> str:
    """Formate les valeurs numériques en notation lisible (K, M, B)."""
    try:
        if val is None:
            return 'N/A'
        val = float(val)
        if abs(val) >= 1e12:
            formatted = f'{val/1e12:,.2f} T'
        elif abs(val) >= 1e9:
            formatted = f'{val/1e9:,.2f} B'
        elif abs(val) >= 1e6:
            formatted = f'{val/1e6:,.2f} M'
        elif abs(val) >= 1e3:
            formatted = f'{val/1e3:,.2f} K'
        else:
            formatted = f'{val:,.2f}'
        return f'{formatted} {unit}'.strip() if unit else formatted
    except (ValueError, TypeError):
        return 'N/A'


def monte_carlo_simulation(hist: pd.DataFrame, days_forward: int = 252, num_simulations: int = 1000):
    """
    Simulation Monte Carlo pour projeter les prix futurs.

    Args:
        hist: Historique des prix
        days_forward: Nombre de jours de trading à projeter (252 = 1 an)
        num_simulations: Nombre de simulations à effectuer

    Returns:
        Tuple contenant les simulations et les percentiles
    """
    # Calcul des rendements journaliers
    returns = hist['Close'].pct_change().dropna()

    # Paramètres statistiques
    mean_return = returns.mean()
    std_return = returns.std()
    last_price = hist['Close'].iloc[-1]

    # Génération vectorisée des simulations (plus rapide)
    random_returns = np.random.normal(mean_return, std_return, (days_forward, num_simulations))
    price_paths = last_price * np.cumprod(1 + random_returns, axis=0)

    # Calcul des percentiles
    percentile_5 = np.percentile(price_paths, 5, axis=1)
    percentile_50 = np.percentile(price_paths, 50, axis=1)
    percentile_95 = np.percentile(price_paths, 95, axis=1)

    return price_paths, percentile_5, percentile_50, percentile_95, last_price


# ============ INTERFACE UTILISATEUR ============

# Sidebar pour les paramètres
with st.sidebar:
    st.header("⚙️ Paramètres")

    company_name = st.text_input(
        "Nom de l'entreprise",
        value="Amazon",
        placeholder="Ex: Amazon, Apple, Microsoft..."
    )

    period = st.selectbox(
        "Période d'analyse",
        options=['6mo', '1y', '2y', '5y', '10y', 'max'],
        index=1,
        format_func=lambda x: {
            '6mo': '6 mois',
            '1y': '1 an',
            '2y': '2 ans',
            '5y': '5 ans',
            '10y': '10 ans',
            'max': 'Maximum'
        }.get(x, x)
    )

    st.markdown("---")

    # Options Monte Carlo
    st.subheader("🎲 Monte Carlo")
    mc_simulations = st.slider("Nombre de simulations", 100, 5000, 1000, 100)
    mc_days = st.slider("Jours à projeter", 30, 504, 252, 21)

    st.markdown("---")
    analyze_button = st.button("🔍 Analyser", type="primary", use_container_width=True)


# ============ ANALYSE PRINCIPALE ============

if analyze_button or company_name:
    # Recherche du ticker
    with st.spinner("Recherche de l'entreprise..."):
        ticker_symbol = get_ticker_from_name(company_name)

    if not ticker_symbol:
        st.error(f"⚠️ Entreprise '{company_name}' non trouvée. Essayez avec le symbole boursier (ex: AAPL, MSFT).")
        st.stop()

    # Récupération des données
    with st.spinner(f"Chargement des données pour {ticker_symbol}..."):
        tkr, info, hist, financials, recommendations = get_stock_data(ticker_symbol, period)

    if info is None:
        st.error("Impossible de récupérer les données. Veuillez réessayer.")
        st.stop()

    # ===== OVERVIEW =====
    company_name_full = info.get('shortName', ticker_symbol)
    st.header(f"🏢 {company_name_full} ({ticker_symbol})")

    if info.get('longBusinessSummary'):
        with st.expander("📋 Description de l'entreprise", expanded=False):
            st.write(info['longBusinessSummary'])

    # ===== MÉTRIQUES PRINCIPALES =====
    st.subheader("📊 Indicateurs Clés")

    price = info.get('regularMarketPrice')
    eps = info.get('trailingEps')

    col1, col2, col3, col4 = st.columns(4)
    with col1:
        st.metric("💰 Prix actuel", f"${price:.2f}" if price else "N/A")
    with col2:
        pe = price / eps if price and eps else None
        st.metric("📈 P/E Ratio", f"{pe:.2f}" if pe else "N/A")
    with col3:
        st.metric("🏦 Market Cap", format_value(info.get('marketCap'), 'USD'))
    with col4:
        change = info.get('regularMarketChangePercent')
        st.metric("📊 Variation", f"{change:.2f}%" if change else "N/A",
                  delta=f"{change:.2f}%" if change else None)

    st.markdown("---")

    # ===== TABLEAUX FINANCIERS =====
    col_left, col_mid, col_right = st.columns(3)

    with col_left:
        st.subheader("📘 Bilan")
        balance_data = {
            'Indicateur': ['Market Cap', 'Enterprise Value', 'Dette Totale', 'Trésorerie'],
            'Valeur': [
                format_value(info.get('marketCap'), 'USD'),
                format_value(info.get('enterpriseValue'), 'USD'),
                format_value(info.get('totalDebt'), 'USD'),
                format_value(info.get('totalCash'), 'USD')
            ]
        }
        st.dataframe(pd.DataFrame(balance_data), hide_index=True, use_container_width=True)

    with col_mid:
        st.subheader("📙 Compte de Résultat")
        income_data = {
            'Indicateur': ['P/E Ratio', 'EBITDA', 'Marge Nette', 'Chiffre d\'Affaires', 'Croissance CA'],
            'Valeur': [
                f"{price/eps:.2f}" if price and eps else 'N/A',
                format_value(info.get('ebitda'), 'USD'),
                f"{info.get('profitMargins', 0)*100:.2f}%" if info.get('profitMargins') else 'N/A',
                format_value(info.get('totalRevenue'), 'USD'),
                f"{info.get('revenueGrowth', 0)*100:.2f}%" if info.get('revenueGrowth') else 'N/A'
            ]
        }
        st.dataframe(pd.DataFrame(income_data), hide_index=True, use_container_width=True)

    with col_right:
        st.subheader("📗 Autres Indicateurs")
        other_data = {
            'Indicateur': ['Beta', 'Dividende', 'Rendement Div.', 'Objectif 1 an', '52W High', '52W Low'],
            'Valeur': [
                f"{info.get('beta', 0):.2f}" if info.get('beta') else 'N/A',
                f"${info.get('dividendRate', 0):.2f}" if info.get('dividendRate') else 'N/A',
                f"{info.get('dividendYield', 0)*100:.2f}%" if info.get('dividendYield') else 'N/A',
                f"${info.get('targetMeanPrice', 0):.2f}" if info.get('targetMeanPrice') else 'N/A',
                f"${info.get('fiftyTwoWeekHigh', 0):.2f}" if info.get('fiftyTwoWeekHigh') else 'N/A',
                f"${info.get('fiftyTwoWeekLow', 0):.2f}" if info.get('fiftyTwoWeekLow') else 'N/A'
            ]
        }
        st.dataframe(pd.DataFrame(other_data), hide_index=True, use_container_width=True)

    st.markdown("---")

    # ===== GRAPHIQUE DU COURS =====
    if not hist.empty:
        st.subheader(f"📈 Évolution du Cours - {period}")

        fig_price = go.Figure()
        fig_price.add_trace(go.Scatter(
            x=hist.index,
            y=hist['Close'],
            mode='lines',
            name='Prix de clôture',
            line=dict(color='#1f77b4', width=2)
        ))

        # Ajout de la moyenne mobile 50 jours
        if len(hist) > 50:
            hist['MA50'] = hist['Close'].rolling(window=50).mean()
            fig_price.add_trace(go.Scatter(
                x=hist.index,
                y=hist['MA50'],
                mode='lines',
                name='MM 50 jours',
                line=dict(color='orange', width=1, dash='dash')
            ))

        fig_price.update_layout(
            template='plotly_dark',
            xaxis_title='Date',
            yaxis_title='Prix (USD)',
            hovermode='x unified',
            height=400
        )
        st.plotly_chart(fig_price, use_container_width=True)

    # ===== SIMULATION MONTE CARLO =====
    if not hist.empty and len(hist) > 30:
        st.markdown("---")
        st.subheader("🎲 Simulation Monte Carlo - Projection des Prix")

        with st.spinner("Exécution de la simulation Monte Carlo..."):
            simulations, p5, p50, p95, last_price = monte_carlo_simulation(
                hist, days_forward=mc_days, num_simulations=mc_simulations
            )

        # Dates futures
        last_date = hist.index[-1]
        future_dates = pd.bdate_range(start=last_date, periods=mc_days + 1)[1:]

        # Graphique Monte Carlo
        fig_mc = go.Figure()

        # Trajectoires individuelles (échantillon)
        sample_size = min(100, mc_simulations)
        indices = np.linspace(0, mc_simulations - 1, sample_size, dtype=int)
        for i in indices:
            fig_mc.add_trace(go.Scatter(
                x=future_dates,
                y=simulations[:, i],
                mode='lines',
                line=dict(width=0.3, color='rgba(150,150,150,0.3)'),
                showlegend=False,
                hoverinfo='skip'
            ))

        # Percentiles
        fig_mc.add_trace(go.Scatter(
            x=future_dates, y=p95,
            mode='lines', name='95e Percentile (Optimiste)',
            line=dict(color='rgba(0,255,0,0.7)', width=2, dash='dash')
        ))
        fig_mc.add_trace(go.Scatter(
            x=future_dates, y=p50,
            mode='lines', name='Médiane (50e)',
            line=dict(color='#FFD700', width=3)
        ))
        fig_mc.add_trace(go.Scatter(
            x=future_dates, y=p5,
            mode='lines', name='5e Percentile (Pessimiste)',
            line=dict(color='rgba(255,0,0,0.7)', width=2, dash='dash')
        ))

        # Prix actuel
        fig_mc.add_trace(go.Scatter(
            x=[last_date], y=[last_price],
            mode='markers', name='Prix actuel',
            marker=dict(size=12, color='cyan', symbol='star')
        ))

        fig_mc.update_layout(
            title=f"Projection sur {mc_days} jours ({mc_simulations} scénarios)",
            template='plotly_dark',
            xaxis_title='Date',
            yaxis_title='Prix (USD)',
            hovermode='x unified',
            height=500
        )
        st.plotly_chart(fig_mc, use_container_width=True)

        # Statistiques
        final_prices = simulations[-1, :]
        col1, col2, col3 = st.columns(3)

        with col1:
            st.metric(
                "📊 Prix Médian Projeté",
                f"${p50[-1]:.2f}",
                delta=f"{((p50[-1]/last_price - 1)*100):.2f}%"
            )
        with col2:
            st.metric(
                "🟢 Scénario Optimiste (95%)",
                f"${p95[-1]:.2f}",
                delta=f"{((p95[-1]/last_price - 1)*100):.2f}%"
            )
        with col3:
            st.metric(
                "🔴 Scénario Pessimiste (5%)",
                f"${p5[-1]:.2f}",
                delta=f"{((p5[-1]/last_price - 1)*100):.2f}%"
            )

        with st.expander("📈 Statistiques détaillées"):
            st.write(f"**Prix actuel:** ${last_price:.2f}")
            st.write(f"**Meilleur scénario:** ${final_prices.max():.2f} ({((final_prices.max()/last_price - 1)*100):.2f}%)")
            st.write(f"**Pire scénario:** ${final_prices.min():.2f} ({((final_prices.min()/last_price - 1)*100):.2f}%)")
            st.write(f"**Écart-type des projections:** ${final_prices.std():.2f}")

    # ===== EBITDA VS REVENUE =====
    if financials is not None and not financials.empty:
        try:
            if 'Total Revenue' in financials.index and 'EBITDA' in financials.index:
                st.markdown("---")
                st.subheader("💹 EBITDA vs Chiffre d'Affaires")

                rev = financials.loc['Total Revenue']
                ebi = financials.loc['EBITDA']

                fig_fin = go.Figure()
                fig_fin.add_trace(go.Bar(
                    x=rev.index.astype(str),
                    y=rev.values,
                    name="Chiffre d'Affaires",
                    marker_color='orange'
                ))
                fig_fin.add_trace(go.Bar(
                    x=ebi.index.astype(str),
                    y=ebi.values,
                    name='EBITDA',
                    marker_color='green'
                ))
                fig_fin.update_layout(
                    barmode='group',
                    template='plotly_dark',
                    xaxis_title='Année',
                    yaxis_title='USD',
                    height=400
                )
                st.plotly_chart(fig_fin, use_container_width=True)
        except Exception:
            pass

    # ===== RECOMMANDATIONS ANALYSTES =====
    if recommendations is not None and not recommendations.empty:
        try:
            st.markdown("---")
            st.subheader("🎯 Recommandations des Analystes")

            counts = recommendations.iloc[0].dropna()
            if len(counts) > 0:
                fig_rec = go.Figure(go.Pie(
                    labels=counts.index,
                    values=counts.values,
                    hole=0.5,
                    marker_colors=['#2ecc71', '#27ae60', '#f39c12', '#e74c3c', '#c0392b']
                ))
                fig_rec.update_layout(
                    title="Distribution des recommandations",
                    height=400
                )
                st.plotly_chart(fig_rec, use_container_width=True)
        except Exception:
            pass

# Footer
st.markdown("---")
st.caption("📊 Stock Analyzer - Données fournies par Yahoo Finance. Les simulations Monte Carlo sont à titre indicatif uniquement.")
