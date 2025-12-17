# Stock Analyzer - Analyseur d'Actions Boursières

Application portable pour analyser les actions boursières avec simulation Monte Carlo.

## Installation

### Prérequis
- Python 3.9 ou supérieur
- pip (gestionnaire de paquets Python)

### Étapes d'installation

1. **Cloner ou télécharger le projet**
   ```bash
   git clone <url-du-repo>
   cd stock-analyzer
   ```

2. **Créer un environnement virtuel** (recommandé)
   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # macOS / Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Installer les dépendances**
   ```bash
   pip install -r requirements.txt
   ```

## Utilisation

### Lancer l'application
```bash
streamlit run stock_analyzer.py
```

L'application s'ouvrira automatiquement dans votre navigateur à l'adresse `http://localhost:8501`

### Fonctionnalités

| Fonctionnalité | Description |
|----------------|-------------|
| Recherche par nom | Tapez le nom de l'entreprise (ex: "Amazon", "Apple") |
| Indicateurs financiers | P/E, Market Cap, EBITDA, marges, etc. |
| Graphique historique | Évolution du cours avec moyenne mobile |
| Simulation Monte Carlo | Projection des prix futurs (1000 scénarios) |
| EBITDA vs Revenue | Comparaison historique |
| Recommandations | Avis des analystes (Buy/Hold/Sell) |

### Paramètres ajustables

- **Période d'analyse** : 6 mois à historique complet
- **Nombre de simulations** : 100 à 5000
- **Horizon de projection** : 30 à 504 jours

## Structure du projet

```
stock-analyzer/
├── stock_analyzer.py    # Application principale
├── requirements.txt     # Dépendances Python
└── README.md           # Documentation
```

## Déploiement en ligne (optionnel)

### Streamlit Cloud (gratuit)
1. Créez un compte sur [share.streamlit.io](https://share.streamlit.io)
2. Connectez votre dépôt GitHub
3. Déployez en un clic

### Docker
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY stock_analyzer.py .
EXPOSE 8501
CMD ["streamlit", "run", "stock_analyzer.py", "--server.port=8501"]
```

```bash
docker build -t stock-analyzer .
docker run -p 8501:8501 stock-analyzer
```

## Avertissement

Les projections Monte Carlo sont basées sur des données historiques et ne constituent pas des conseils financiers. Les performances passées ne garantissent pas les résultats futurs.

## Licence

MIT License
