---
title: Stable outbound IP address
slug: /streamlit-cloud/get-started/deploy-an-app/connect-to-data-sources/stable-outbound-ip-addresses
---

# Stable outbound IP address

Has your IT team requested IP addresses to allowlist within your organization's internal network? Good news — we have four stable outbound IP addresses that you can share with your team! 🎉

## Connecting to private data sources

![Deploy an app](/images/streamlit-cloud/deploy-an-app.gif)

Streamlit provides a Secrets feature that enables you to connect to your private data sources over a secure protocol within your app, such as TLS. It's super simple. Create a user account or access token on your data store, and then copy it into our Secrets UI. We'll store it securely and make it available to your Streamlit application code in an environment variable. From there, you can use any standard Python library for connecting to your database.

## Allowlisting Streamlit's outbound IP addresses

In addition to protecting your service with TLS and using strong authentication, IP allowlisting is a security best practice. You can allowlist our outbound IP addresses in your firewall to ensure that only traffic from the Streamlit network can connect to your data stores. This is often required or expected by various security standards, and further reduces any risk to your data.

Streamlit currently uses **four stable outbound IP addresses**.

- **34.127.33.101**
- **35.230.127.150**
- **34.127.0.121**
- **35.230.58.211**
- **34.127.88.74**
- **35.230.56.30**

For more information about the specifics of allowlisting IP addresses with your organization's hosting service, we recommend reaching out to your IT team. The exact steps will vary based on your hosting service.

<Note>

Does your IT team have questions about Streamlit's outbound IP addresses? Contact [**success@streamlit.io**](mailto:success@streamlit.io)

</Note>
