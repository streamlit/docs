---
title: Auth0 Single Sign-On
slug: /streamlit-cloud/get-started/share-your-app/configuring-single-on-sso/streamlit-auth0-sso
---

## Auth0 Single Sign-On via SAML

![Streamlit Single Sign-on homepage](/images/sso_homescreen.png)

Auth0 via SAML is just one of the authenticators supported by Streamlit for Teams. We have already released documentation for Okta, Microsoft ADFS, Azure AD, and generic SAML.

Enabling Single Sign-On via Auth0 allows members of your organization to securely sign in to Streamlit using the same email address and password they already use for Auth0.

### Single Sign-On via Auth0 for developers of your organization's apps

- Your developers can use Auth0 to log into Streamlit and access their app dashboard.
- Your developers can also give access to app viewers through their Auth0 logins.

### Single Sign-On via Auth0 for viewers of your organization's private apps

- Viewers added to a private app can use Auth0 to authenticate their identity.
- These viewers must be added to the app's viewer list by their Auth0-associated email address.

## Configuring Auth0 SSO

There are three steps your team will need to complete to create an Auth0 SSO connection:

1. Please complete [this form](https://docs.google.com/forms/d/e/1FAIpQLSenELJzAZaBV8852b-HJMeecO_LAwYJ6zuYbXLK0lMVexCF4Q/viewform).

   To complete steps 2 and 3, you will need an **ACS URL**, which Streamlit will provide by emailing you a private Google Drive link. Please complete [this form](https://forms.gle/5E3pUrB8vwp66ZPc9) to provide us with your email address and some basic information about your organization.

2. Provide Streamlit with an Identity Provider Certificate.

   - Follow [WorkOS' instructions](https://workos.com/docs/integrations/auth0-saml/obtain-identity-provider-details) to obtain the Identity Provider Certificate.
   - Please share the Token Signature with Streamlit by uploading it [here](https://forms.gle/f6Bi1gnoHYD9ULBe7).

<Note>

The Token Signature is a certificate used to securely sign tokens issued by Auth0.

</Note>

3. Provide Streamlit with an Identity Provider Login URL and Auth0 Issuer.

   - Follow [WorkOS' instructions](https://workos.com/docs/integrations/auth0-saml/obtain-identity-provider-details) to obtain the "Issuer" and Identity Provider Login URL.
   - Please share the the "Issuer" and Identity Provider Login URL with Streamlit by pasting it [here](https://forms.gle/f6Bi1gnoHYD9ULBe7).

<Note>

The IdP SSO URL provides Streamlit with a login endpoint to redirect your organization's users from our login page to your Auth0 login page.

</Note>
