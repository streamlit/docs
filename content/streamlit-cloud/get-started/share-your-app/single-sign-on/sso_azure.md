---
title: Microsoft Azure Active Directory
slug: /streamlit-cloud/get-started/share-your-app/configuring-single-on-sso/streamlit-azure-active-directory
---

## Microsoft Azure AD Single Sign-On via SAML

![Streamlit Single Sign-on homepage](/images/sso_homescreen.png)

Azure AD is just one of the authenticators supported by Streamlit for Teams. We have already released documentation for Microsoft ADFS, Okta, and generic SAML.

Enabling Single Sign-On via Azure AD allows members of your organization to securely sign in to Streamlit using the same email address and password they already use for their Azure account.

### Single Sign-On via Azure AD for developers of your organization's apps

- Your developers can use Azure AD to log into Streamlit and access their app dashboard.
- Your developers can also give access to app viewers through their Azure AD email addresses.

### Single Sign-On via Azure AD for viewers of your organization's private apps

- Viewers added to a private app can use Azure AD SSO to authenticate their identity.
- These viewers must be added to the app's viewer list by their Azure AD/org email address.

## Configuring Microsoft Azure AD SSO

There are three steps your team will need to complete to create an Azure AD connection:

1. Please complete [this form](https://docs.google.com/forms/d/e/1FAIpQLSenELJzAZaBV8852b-HJMeecO_LAwYJ6zuYbXLK0lMVexCF4Q/viewform)

   To complete steps 2 and 3, you will need an **ACS URL** and **Identity Provider URI (Entity ID)**, which Streamlit will provide by emailing you a private Google Drive link. Please complete [this form](https://forms.gle/5E3pUrB8vwp66ZPc9) to provide us with your email address and some basic information about your organization.

2. Provide Streamlit with a Token Signature (X.509 Certificate).

   - Follow [WorkOS' instructions to generate the token signature](https://workos.com/docs/integrations/azure-ad-saml/overview) (see ["Obtain Identity Provider Details"](https://workos.com/docs/integrations/azure-ad-saml/obtain-identity-provider-details)).
   - Please share the Token Signature with Streamlit by uploading it [here](https://docs.google.com/forms/d/e/1FAIpQLSdtV7hdpMEgfbK4E7BqeYNTcDrT6IqjOfSvIA48SoNAeIhcgw/viewform?usp=sf_link).

<Note>

The Token Signature is a certificate used to securely sign tokens issued by Azure AD. You can learn more about Azure AD token signing certificates [here](https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/manage-certificates-for-federated-single-sign-on)
</Note>

3. Provide Streamlit with an Identity Provider SSO URL.

   - Follow [WorkOS' instructions to generate the IdP SSO URL](https://workos.com/docs/integrations/azure-ad-saml/overview) (see ["Obtain Identity Provider Details"](https://workos.com/docs/integrations/azure-ad-saml/obtain-identity-provider-details)).
   - Please share the IdP SSO URL with Streamlit by pasting it [here](https://docs.google.com/forms/d/e/1FAIpQLSdtV7hdpMEgfbK4E7BqeYNTcDrT6IqjOfSvIA48SoNAeIhcgw/viewform?usp=sf_link).

<Note>

The IdP SSO URL provides Streamlit with a login endpoint to redirect your organization's users from our login page to your Azure AD login page.

</Note>
