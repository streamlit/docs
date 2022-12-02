---
title: Connect Streamlit to Deta Base
slug: /knowledge-base/tutorials/databases/deta-base
---

# Connect Streamlit to Deta Base

## Introduction

This guide explains how to securely access and write to a [Deta Base](https://www.deta.sh/) database from Streamlit Cloud. [Deta Base](https://docs.deta.sh/docs/base/about) is a fully-managed, fast, scalable and secure NoSQL database with a focus on end-user simplicity. This guide uses the [deta](https://github.com/deta/deta-python) Python SDK for Deta Base and Streamlit's [secrets management](/streamlit-cloud/get-started/deploy-an-app/connect-to-data-sources/secrets-management).

## Sign up for Deta Base and sign in

First, you need to [sign up for Deta Base](https://web.deta.sh/). Once you have an account, sign in to [Deta](https://web.deta.sh/). When you sign in, Deta will create a default project and show you the project's Project Key and Project ID. Note down your **Project Key** and **Project ID**.

<Flex>
<Image alt="Deta sign up" src="/images/databases/deta-1.png" caption="Sign up for Deta" />
<Image alt="Deta sign in" src="/images/databases/deta-2.png" caption="Sign in to Deta" />
</Flex>

Be sure to store your **Project Key** securely. It is shown only once, and you will need it to connect to your Deta Base.

<Flex>
<Image alt="Click to see your Project Key" src="/images/databases/deta-3.png" caption="Click to see your Project Key" />
<Image alt="Securely store your Project Key" src="/images/databases/deta-4.png" caption="Securely store your Project Key" />
</Flex>

## Add Project Key to your local app secrets

Your local Streamlit app will read secrets from a file `.streamlit/secrets.toml` in your app's root directory. Create this file if it doesn't exist yet and add the **Project Key** (from the previous step) of your Deta Base as shown below:

```toml
# .streamlit/secrets.toml
deta_key = "xxx"
```

Replace `xxx` above ☝️ with your **Project Key** from the previous step.

<Important>

Add this file to `.gitignore` and don't commit it to your GitHub repo!

</Important>

## Copy your app secrets to the cloud

As the `secrets.toml` file above is not committed to GitHub, you need to pass its content to your deployed app (on Streamlit Cloud) separately. Go to the [app dashboard](https://share.streamlit.io/) and in the app's dropdown menu, click on **Edit Secrets**. Copy the content of `secrets.toml` into the text area. More information is available at [Secrets Management](/streamlit-cloud/get-started/deploy-an-app/connect-to-data-sources/secrets-management).

![Secrets manager screenshot](/images/databases/edit-secrets.png)

## Add deta to your requirements file

Add the [deta](https://github.com/deta/deta-python) Python SDK for Deta Base to your `requirements.txt` file, preferably pinning its version (replace `x.x.x` with the version you want installed):

```bash
# requirements.txt
deta==x.x.x
```

## Write your Streamlit app

Copy the code below to your Streamlit app and run it. The example app below writes data from a Streamlit form to a Deta Base database `example-db`.

```python
import streamlit as st
from deta import Deta

# Data to be written to Deta Base
with st.form("form"):
    name = st.text_input("Your name")
    age = st.number_input("Your age")
    submitted = st.form_submit_button("Store in database")


# Connect to Deta Base with your Project Key
deta = Deta(st.secrets["deta_key"])

# Create a new database "example-db"
# If you need a new database, just use another name.
db = deta.Base("example-db")

# If the user clicked the submit button,
# write the data from the form to the database.
# You can store any data you want here. Just modify that dictionary below (the entries between the {}).
if submitted:
    db.put({"name": name, "age": age})

"---"
"Here's everything stored in the database:"
# This reads all items from the database and displays them to your app.
# db_content is a list of dictionaries. You can do everything you want with it.
db_content = db.fetch().items
st.write(db_content)
```

If everything worked out (and you used the example we created above), your app should look like this:

![Finished app GIF](/images/databases/deta_app.gif)
