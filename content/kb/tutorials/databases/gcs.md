---
title: Connect Streamlit to Google Cloud Storage
slug: /knowledge-base/tutorials/databases/gcs
---

# Connect Streamlit to Google Cloud Storage

## Introduction

This guide explains how to securely access files on Google Cloud Storage from Streamlit Cloud. It uses the [google-cloud-storage](https://googleapis.dev/python/storage/latest/index.html) library and Streamlit's [secrets management](/streamlit-cloud/get-started/deploy-an-app/connect-to-data-sources/secrets-management).

## Create a Google Cloud Storage bucket and add a file

<Note>

If you already have a bucket that you want to use, feel free
to [skip to the next step](#enable-the-google-cloud-storage-api).

</Note>

First, [sign up for Google Cloud Platform](https://console.cloud.google.com/) or log in. Go to the [Google Cloud Storage console](https://console.cloud.google.com/storage/) and create a new bucket.

<Flex>
<Image alt="GCS screenshot 1" src="/images/databases/gcs-1.png" />
<Image alt="GCS screenshot 2" src="/images/databases/gcs-2.png" />
</Flex>

Navigate to the upload section of your new bucket:

<Flex>
<Image alt="GCS screenshot 3" src="/images/databases/gcs-3.png" />
<Image alt="GCS screenshot 4" src="/images/databases/gcs-4.png" />
</Flex>

And upload the following CSV file, which contains some example data:

<Download href="/images/databases/myfile.csv">myfile.csv</Download>

## Enable the Google Cloud Storage API 

The Google Cloud Storage API is [enabled by default](https://cloud.google.com/service-usage/docs/enabled-service#default) when you create a project through the Google Cloud Console or CLI. Feel free to [skip to the next step](#create-a-service-account-and-key-file).

If you do need to enable the API for programmatic access in your project, head over to the [APIs & Services dashboard](https://console.cloud.google.com/apis/dashboard) (select or create a project if asked). Search for the Cloud Storage API and enable it. The screenshot below has a blue "Manage" button and indicates the "API is enabled" which means no further action needs to be taken. This is very likely what you have since the API is enabled by default. However, if that is not what you see and you have an "Enable" button, you'll need to enable the API:
  
<Flex>
<Image alt="GCS screenshot 5" src="/images/databases/gcs-5.png" />
<Image alt="GCS screenshot 6" src="/images/databases/gcs-6.png" />
<Image alt="GCS screenshot 7" src="/images/databases/gcs-7.png" />
</Flex>

## Create a service account and key file

To use the Google Cloud Storage API from Streamlit Cloud, you need a Google Cloud Platform service account (a special type for programmatic data access). Go to the Service Accounts page and create an account with <b>Viewer</b> permission. 

<Flex>
<Image alt="GCS screenshot 8" src="/images/databases/gcs-8.png" />
<Image alt="GCS screenshot 9" src="/images/databases/gcs-9.png" />
<Image alt="GCS screenshot 10" src="/images/databases/gcs-10.png" />
</Flex>

<Note>

If the button **CREATE SERVICE ACCOUNT** is gray, you don't have the correct permissions. Ask the
admin of your Google Cloud project for help.

</Note>

After clicking **DONE**, you should be back on the service accounts overview. Create a JSON key file for the new account and download it:


<Flex>
<Image alt="GCS screenshot 11" src="/images/databases/gcs-11.png" />
<Image alt="GCS screenshot 12" src="/images/databases/gcs-12.png" />
<Image alt="GCS screenshot 13" src="/images/databases/gcs-13.png" />
</Flex>


## Add the key to your local app secrets

Your local Streamlit app will read secrets from a file `.streamlit/secrets.toml` in your app's root directory. Create this file if it doesn't exist yet and add the access key to it as shown below:

```toml
# .streamlit/secrets.toml

[gcp_service_account]
type = "service_account"
project_id = "xxx"
private_key_id = "xxx"
private_key = "xxx"
client_email = "xxx"
client_id = "xxx"
auth_uri = "https://accounts.google.com/o/oauth2/auth"
token_uri = "https://oauth2.googleapis.com/token"
auth_provider_x509_cert_url = "https://www.googleapis.com/oauth2/v1/certs"
client_x509_cert_url = "xxx"
```

<Important>

Add this file to `.gitignore` and don't commit it to your Github repo!

</Important>

## Copy your app secrets to the cloud

As the `secrets.toml` file above is not committed to Github, you need to pass its content to your deployed app (on Streamlit Cloud) separately. Go to the [app dashboard](https://share.streamlit.io/) and in the app's dropdown menu, click on **Edit Secrets**. Copy the content of `secrets.toml` into the text area. More information is available at [Secrets Management](/streamlit-cloud/get-started/deploy-an-app/connect-to-data-sources/secrets-management).

![Secrets manager screenshot](/images/databases/edit-secrets.png)

## Add google-cloud-storage to your requirements file

Add the [google-cloud-storage](https://googleapis.dev/python/storage/latest/index.html) package to your `requirements.txt` file, preferably pinning its version (replace `x.x.x` with the version you want installed):

```bash
# requirements.txt
google-cloud-storage==x.x.x
```

## Write your Streamlit app

Copy the code below to your Streamlit app and run it. Make sure to adapt the name of your bucket and file. Note that Streamlit automatically turns the access keys from your secrets file into environment variables.

```python
# streamlit_app.py

import streamlit as st
from google.oauth2 import service_account
from google.cloud import storage

# Create API client.
credentials = service_account.Credentials.from_service_account_info(
    st.secrets["gcp_service_account"]
)
client = storage.Client(credentials=credentials)

# Retrieve file contents.
# Uses st.experimental_memo to only rerun when the query changes or after 10 min.
@st.experimental_memo(ttl=600)
def read_file(bucket_name, file_path): 
    bucket = client.bucket(bucket_name)
    content = bucket.blob(file_path).download_as_string().decode("utf-8")
    return content
     
bucket_name = "streamlit-bucket"
file_path = "myfile.csv"
                            
content = read_file(bucket_name, file_path)

# Print results.
for line in content.strip().split("\n"):
    name, pet = line.split(",")
    st.write(f"{name} has a :{pet}:")
```
See `st.experimental_memo` above? Without it, Streamlit would run the query every time the app reruns (e.g. on a widget interaction). With `st.experimental_memo`, it only runs when the query changes or after 10 minutes (that's what `ttl` is for). Watch out: If your database updates more frequently, you should adapt `ttl` or remove caching so viewers always see the latest data. Read more about caching [here](/library/advanced-features/experimental-cache-primitives).

If everything worked out (and you used the example file given above), your app should look like this:

![Finished app screenshot](/images/databases/streamlit-app.png)
