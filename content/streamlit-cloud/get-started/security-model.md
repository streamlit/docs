---
title: Streamlit Trust and Security
slug: /streamlit-community-cloud/get-started/trust-and-security
---

# Streamlit Trust and Security

Streamlit is a framework that turns Python scripts into interactive apps, giving data scientists the ability to quickly create data and model-based apps for the entire company.

A simple Streamlit app is:

```python
import streamlit as st
number = st.slider("Pick a number: ", min_value=1, max_value=10)
st.text("Your number is " + str(number))
```

When you `streamlit run my_app.py`, you start a web server that runs the interactive application on your local computer at `http://localhost:8501`. This is great for local development. When you want to share with your colleagues, Streamlit Community Cloud enables you to deploy and run these applications in the cloud. Streamlit Community Cloud handles the details of containerization and provides you an interface for easily managing your deployed apps.

This document provides an overview of the security safeguards we've implemented to protect you and your data.

## Product Security

### Authentication

You must authenticate through GitHub to deploy or administer an app. Authentication through Google or single-use emailed links are required to view a private app when you don't have push or admin permissions on the associated GitHub repository. The single-use emailed links are valid for 15 minutes once requested.

### Permissions

Streamlit Community Cloud inherits the permissions you have assigned in GitHub. Users with write access to a GitHub repository for a given app will be able to make changes in the Streamlit administrative console. However, only users with _admin access_ to a repository are able to **deploy and delete apps**.

## Network and Application Security

### Data Hosting

Our physical infrastructure is hosted and managed within secure data centers maintained by infrastructure-as-a-service cloud providers. Streamlit leverages many of these platforms' built-in security, privacy, and redundancy features. Our cloud providers continually monitor their data centers for risk and undergo assessments to ensure compliance with industry standards.

### Virtual Private Cloud

All of our servers are within a virtual private cloud (VPC) with firewalls and network access control lists (ACLs) to allow external access to a select few API endpoints; all other internal services are only accessible within the VPC.

### Encryption

Streamlit apps are served entirely over HTTPS. We use only strong cipher suites and HTTP Strict Transport Security (HSTS) to ensure browsers interact with Streamlit apps over HTTPS.

All data sent to or from Streamlit over the public internet is encrypted in transit using 256-bit encryption. Our API and application endpoints use Transport Layer Security (TLS) 1.2 (or better). We also encrypt data at rest on disk using AES-256.

### Permissions and Authentication

Access to customer data is limited to authorized employees. We run a zero-trust corporate network, utilize single sign-on and multi-factor authentication (MFA), and enforce strong password policies to ensure access to cloud-related services is protected.

### Incident Response

Our internal protocol for handling security events includes detection, analysis, response, escalation, and mitigation procedures. Security advisories are made available at [https://streamlit.io/advisories](https://streamlit.io/advisories).

### Penetration Testing

Streamlit uses third-party security tools to scan for vulnerabilities on a regular basis. Our security partners conduct periodic, intensive penetration tests on the Streamlit platform. Our product development team responds to any identified issues or potential vulnerabilities to ensure the quality, security, and availability of Streamlit applications.

### Vulnerability Management

We keep our systems up-to-date with the latest security patches and continuously monitor for new vulnerabilities. This includes automated scanning of our code repositories for vulnerable dependencies.

If you discover a vulnerability in one of our products or websites, please report the issue to [HackerOne](https://hackerone.com/snowflake?type=team).
