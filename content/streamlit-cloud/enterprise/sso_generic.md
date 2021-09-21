---
title: Generic SAML authentication
slug: /streamlit-cloud/enterprise/single-sign-on-sso/streamlit-general-saml-authentication
---

## Generic SAML Single Sign-On

![Streamlit Single Sign-on homepage](/images/sso_homescreen.png)

Generic SAML is just one of the authenticators supported by Streamlit for Teams. We have already released documentation for Microsoft ADFS, Azure AD, and Okta.

Enabling Single Sign-On via generic SAML allows members of your organization to securely sign in to Streamlit using the same email address and password they already use with your organization's generic SAML provider.

### Single Sign-On via generic SAML for developers of your organization's apps

- Your developers can use SSO via generic SAML to log into Streamlit and access their app dashboard.
- Your developers can also give access to app viewers through their generic SAML logins.

### Single Sign-On via Okta for viewers of your organization's private apps

- Viewers added to a private app can use SSO via generic SAML to authenticate their identity.
- These viewers must be added to the app's viewer list by their generic SAML-associated email address.

## Configuration Okta SSO

There are three steps your team will need to complete to create an Okta SSO connection:

1. Please complete [this form](https://docs.google.com/forms/d/e/1FAIpQLSenELJzAZaBV8852b-HJMeecO_LAwYJ6zuYbXLK0lMVexCF4Q/viewform)

    To complete steps 2 and 3, you will need an **ACS URL** and **Identity Provider URI (Entity ID)**, which Streamlit will provide by emailing you a private Google Drive link. Please complete [this form](https://forms.gle/5E3pUrB8vwp66ZPc9) to provide us with your email address and some basic information about your organization.

2. Provide Streamlit with a Token Signature (X.509 Certificate).

    - Follow [WorkOS' instructions to generate the token signature](https://workos.com/docs/integrations/azure-ad-saml/overview) (see ["Obtain Identity Provider Details"](https://workos.com/docs/integrations/azure-ad-saml/obtain-identity-provider-details)).
    - Please share the Token Signature with Streamlit by uploading it [here](https://docs.google.com/forms/d/e/1FAIpQLSdtV7hdpMEgfbK4E7BqeYNTcDrT6IqjOfSvIA48SoNAeIhcgw/viewform?usp=sf_link).

3. Provide Streamlit with an Identity Provider SSO URL.

    - Follow [WorkOS' instructions to generate the IdP SSO URL](https://workos.com/docs/integrations/azure-ad-saml/overview) (see ["Obtain Identity Provider Details"](https://workos.com/docs/integrations/azure-ad-saml/obtain-identity-provider-details)).
    - Please share the IdP SSO URL with Streamlit by pasting it [here](https://docs.google.com/forms/d/e/1FAIpQLSdtV7hdpMEgfbK4E7BqeYNTcDrT6IqjOfSvIA48SoNAeIhcgw/viewform?usp=sf_link).

4. Provide Streamlit with an IdP URI (Entity ID)

    - Your Identity Provider URI (Entity ID) comes from your Identity Provider and is often located in an admin dashboard. The exact steps to generate the IdP URI (Entity ID) will vary based on your Identity Provider.
    - Please share the IdP URI with Streamlit by pasting it [here](https://forms.gle/f6Bi1gnoHYD9ULBe7).
