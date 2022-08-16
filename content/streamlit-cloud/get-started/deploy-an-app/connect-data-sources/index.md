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

<TileContainer>
<RefCard href="/knowledge-base/tutorials/databases/aws-s3">

<Image pure alt="screenshot" src="/images/databases/s3.png" />

<h4 align="center">AWS S3</h4>

</RefCard>

<RefCard href="/knowledge-base/tutorials/databases/bigquery">

<Image pure alt="screenshot" src="/images/databases/bigquery.png" />

<h4 align="center">BigQuery</h4>

</RefCard>

<RefCard href="/knowledge-base/tutorials/databases/deta-base">

<Image pure alt="screenshot" src="/images/databases/deta-base.png" />

<h4 align="center">Deta Base</h4>

</RefCard>

<RefCard href="https://blog.streamlit.io/streamlit-firestore/">

<Image pure alt="screenshot" src="/images/databases/firestore.png" />

<h4 align="center">Firestore (blog)</h4>

</RefCard>

<RefCard href="/knowledge-base/tutorials/databases/gcs">

<Image pure alt="screenshot" src="/images/databases/gcs.png" />

<h4 align="center">Google Cloud Storage</h4>

</RefCard>

<RefCard href="/knowledge-base/tutorials/databases/mssql">

<Image pure alt="screenshot" src="/images/databases/mssql.png" />

<h4 align="center">Microsoft SQL Server</h4>

</RefCard>

<RefCard href="/knowledge-base/tutorials/databases/mongodb">

<Image pure alt="screenshot" src="/images/databases/mongodb.png" />

<h4 align="center">MongoDB</h4>

</RefCard>

<RefCard href="/knowledge-base/tutorials/databases/mysql">

<Image pure alt="screenshot" src="/images/databases/mysql.png" />

<h4 align="center">MySQL</h4>

</RefCard>

<RefCard href="/knowledge-base/tutorials/databases/postgresql">

<Image pure alt="screenshot" src="/images/databases/postgresql.png" />

<h4 align="center">PostgreSQL</h4>

</RefCard>

<RefCard href="/knowledge-base/tutorials/databases/private-gsheet">

<Image pure alt="screenshot" src="/images/databases/gsheet.png" />

<h4 align="center">Private Google Sheet</h4>

</RefCard>

<RefCard href="/knowledge-base/tutorials/databases/public-gsheet">

<Image pure alt="screenshot" src="/images/databases/gsheet.png" />

<h4 align="center">Public Google Sheet</h4>

</RefCard>

<RefCard href="/knowledge-base/tutorials/databases/snowflake">

<Image pure alt="screenshot" src="/images/databases/snowflake.png" />

<h4 align="center">Snowflake</h4>

</RefCard>

<RefCard href="/knowledge-base/tutorials/databases/supabase">

<Image pure alt="screenshot" src="/images/databases/supabase.png" />

<h4 align="center">Supabase</h4>

</RefCard>

<RefCard href="/knowledge-base/tutorials/databases/tableau">

<Image pure alt="screenshot" src="/images/databases/tableau.png" />

<h4 align="center">Tableau</h4>

</RefCard>

<RefCard href="/knowledge-base/tutorials/databases/tigergraph">

<Image pure alt="screenshot" src="/images/databases/tigergraph.png" />

<h4 align="center">TigerGraph</h4>

</RefCard>
</TileContainer>

<Note>

Trouble connecting to data? Need a different way to securely connect? Reach out on our [Community forum](https://discuss.streamlit.io) to chat through options!

</Note>
