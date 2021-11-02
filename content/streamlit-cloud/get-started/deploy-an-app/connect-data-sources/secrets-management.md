---
title: Secrets management
slug: /streamlit-cloud/get-started/deploy-an-app/connect-to-data-sources/secrets-management
---

# Secrets management

## Introduction

It's generally considered bad practice to store unencrypted secrets in a git repository. If your application needs access to sensitive credentials the recommended solution is to store those credentials in a file that is not committed to the repository and to pass them as environment variables.

Secrets Management allows you to store secrets securely and access them in your Streamlit app as environment variables.

## How to use Secrets Management

### Deploy an app and set up secrets

1. Go to [http://share.streamlit.io/](http://share.streamlit.io/) and click "New app" to deploy a new app with secrets.
2. Click "Advanced settings..."
3. You will see a modal appear with an input box for your secrets.

   ![Secrets management](/images/streamlit-cloud/secrets-management.png)

4. Provide your secrets in the "Secrets" field using [TOML](https://toml.io/en/latest) format. For example:

   ```toml
   # Everything in this section will be available as an environment variable
   db_username = "Jane"
   db_password = "12345qwerty"

   # You can also add other sections if you like.
   # The contents of sections as shown below will not become environment variables,
   # but they'll be easily accessible from within Streamlit anyway as we show
   # later in this doc.
   [my_cool_secrets]
   things_i_like = ["Streamlit", "Python"]
   ```

### Use secrets in your app

Access your secrets as environment variables or by querying the `st.secrets` dict. For example, if you enter the secrets from the section above, the code below shows you how you can access them within your Streamlit app.

```python
import streamlit as st

# Everything is accessible via the st.secrets dict:

st.write("DB username:", st.secrets["db_username"])
st.write("DB password:", st.secrets["db_password"])
st.write("My cool secrets:", st.secrets["my_cool_secrets"]["things_i_like"])

# And the root-level secrets are also accessible as environment variables:

import os

st.write(
    "Has environment variables been set:",
    os.environ["db_username"] == st.secrets["db_username"],
)
```

Pro-tip! You can use TOML sections to compactly pass multiple secrets as a single attribute.

Consider the following secrets:

```toml
[db_credentials]
username = "my_username"
password = "my_password"
```

Rather than passing each secret as attributes in a function, you can more compactly pass the section to achieve the same result. See the notional code below which uses the secrets above:

```python
# Verbose version
my_db.connect(username=st.secrets.db_credentials.username, password=st.secrets.db_credentials.password)

# Far more compact version!
my_db.connect(**st.secrets.db_credentials)
```

### Edit your app's secrets

1. Go to [https://share.streamlit.io/](https://share.streamlit.io/)
2. Open the menu for your app, and click "Edit Secrets"
   ![Edit secrets](/images/streamlit-cloud/edit-secrets.png)
3. You will see a modal appear in which you can enter your secrets
   ![Edit secrets modal](/images/streamlit-cloud/edit-secrets-1.png)
4. After you edit your secrets, click "Save". It might take a minute for the update to be propagated to your app, but the new values will be reflected when the app re-runs.

### Develop locally with secrets

When developing your app locally, add a file called `secrets.toml` in a folder called `.streamlit` at the root of your app repo, and copy/paste your secrets into that file.

<Important>

Be sure to add this file to your `.gitignore` so you don't commit your secrets!

</Important>
