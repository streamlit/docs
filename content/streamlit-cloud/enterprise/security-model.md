---
title: Security Model
slug: /streamlit-cloud/enterprise/security-model
---

# Security

Streamlit was developed by a team of ex-Google and Heroku engineers who have woven security through every layer of the service. We analyze each feature from a security perspective and perform post-facto security analysis and penetration testing on every piece of infrastructure we deploy. This section describes the major components of Streamlit's security model.

## Code security

Your code is hosted entirely on GitHub within your private repos. Your code exists within our infrastructure inside of an isolated container. All data on disk, including your code, is encrypted at rest.

If you remove an app, the container and anything within it are removed from our platform.

## Data security

Streamlit does not host any of your data. Instead, data is hosted on your existing services and databases, and the developer of each Streamlit app must explicitly access that data using the usual Python libraries. [Secrets Management](/streamlit-cloud/community#secrets-management) allows you to securely store authentication credentials and access them in your Streamlit app as environment variables.

### Encryption at rest

All source code and data on the platform is encrypted at rest while stored on disk.

This also applies to anything your app may choose to write to disk.

### Encryption in transit

- All traffic within our network is encrypted on the wire and authenticated.
- All visitor web traffic to your app takes place via TLS.
- If you connect from your app to a data source, you *can* use TLS or generally any technology you want to communicate or transfer data securely with that data source. See more [below](#accessing-data-on-different-networks).

## Data privacy

- We do not capture data from your application in any way.
- We do capture metadata, but apps can turn this off by setting this in their config file:

    ```toml
    [browser]
    gatherUsageStats = false
    ```

- Any content entered by a user into your app, including uploaded files, is only ever stored on RAM.

    Note that in the future we may store some uploaded files temporarily on disk (encrypted, as described above).

## Accessing data on different networks

Many customers wish to build Streamlit apps using data that lives in their corporate network or on another service. Below are our recommended solutions for this, all of which are available today:

### Method 1: HTTP over Simple TLS Auth

Use HTTPS when connecting to endpoints that live in your cloud, in conjunction with login and password secrets. The following guides provides examples of using this method to connect to various cloud services:

- [AWS S3](/kb/tutorials/databases/aws-s3)
- [BigQuery](/kb/tutorials/databases/bigquery)
- [Snowflake](/kb/tutorials/databases/snowflake)
- [Firestore (blog)](https://blog.streamlit.io/streamlit-firestore/)
- [MongoDB](/kb/tutorials/databases/mongodb)
- [MySQL](/kb/tutorials/databases/mysql)
- [PostgreSQL](/kb/tutorials/databases/postgresql)
- [Tableau](/kb/tutorials/databases/tableau)
- [Private Google Sheet](/kb/tutorials/databases/private-gsheet)
- [Public Google Sheet](/kb/tutorials/databases/public-gsheet)

### Method 2 (most secure): Mutual TLS Auth

Use [Mutual TLS Auth](https://stackoverflow.com/a/9248748) when connecting to endpoints that live in your cloud. Mutual TLS authentication allows your app to validate your data store's identity, and your data store is able to validate your app's identity. Guides that provide examples of using this method are coming soon.

### References

- [https://research.google/pubs/pub43231/](https://research.google/pubs/pub43231/)