---
title: Connect to data sources
slug: /streamlit-cloud/get-started/deploy-an-app/connect-to-data-sources
---

# Connect data sources

Your app probably connects to some data source, and it's important to make sure that connection is secure. That data might just be a csv that you have in your GitHub repo, but in many cases it'll be a private data source you connect with via API, on a cloud service, or maybe in your company's VPN.

Streamlit has two primary ways of securely connecting to private data:

- [Secrets management](/streamlit-cloud/get-started/deploy-an-app/connect-to-data-sources/secrets-management): securely store secrets like API keys and TOML files that you can then access as environment variables in your app.
- [Stable outbound IP addresses](/streamlit-cloud/get-started/deploy-an-app/connect-to-data-sources/stable-outbound-ip-addresses): allowlist our outbound IP addresses in your firewall to ensure that only traffic from the Streamlit network can connect to your data stores.

We also have a series of guides on how to connect to:

- [AWS S3](/knowledge-base/tutorials/databases/aws-s3)
- [BigQuery](/knowledge-base/tutorials/databases/bigquery)
- [Snowflake](/knowledge-base/tutorials/databases/snowflake)
- [Microsoft SQL Server](/knowledge-base/tutorials/databases/mssql)
- [Firestore (blog)](https://blog.streamlit.io/streamlit-firestore/)
- [MongoDB](/knowledge-base/tutorials/databases/mongodb)
- [MySQL](/knowledge-base/tutorials/databases/mysql)
- [PostgreSQL](/knowledge-base/tutorials/databases/postgresql)
- [Tableau](/knowledge-base/tutorials/databases/tableau)
- [Private Google Sheet](/knowledge-base/tutorials/databases/private-gsheet)
- [Public Google Sheet](/knowledge-base/tutorials/databases/public-gsheet)
- [TigerGraph](/knowledge-base/tutorials/databases/tigergraph)
- [Supabase](/knowledge-base/tutorials/databases/supabase)

<Note>

Trouble connecting to data? Need a different way to securely connect? Email [support@streamlit.io](mailto:support@streamlit.io) to chat through options!

</Note>
