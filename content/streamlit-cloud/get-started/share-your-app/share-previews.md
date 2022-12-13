---
title: Share previews
slug: /streamlit-cloud/get-started/share-your-app/share-previews
---

# Share previews

Social media sites generate a card with a title, preview image, and description when you share a link. This feature is called a "share preview." In the same way, when you share a link to a Streamlit app on social media, a share preview is also generated. Here's an example of a share preview for a public Streamlit app posted on Twitter:

![Share preview for a public Streamlit app](/images/streamlit-cloud/share-preview-twitter-annotated.png)

## Titles

The title is the text that appears at the top of the share preview. The text also appears in the browser tab when you visit the app. You should set the title to something that will make sense to your app's audience and describe what the app does. It is best practice to keep the title concise, ideally under 60 characters.

There are two ways to set the title of a share preview:

1. Set the `page_title` parameter in [`st.set_page_config()`](/library/api-reference/utilities/st.set_page_config) to your desired title. E.g.:

   ```python
   import streamlit as st

   st.set_page_config(page_title="My App")

   # ... rest of your app
   ```

2. If you don't set the `page_title` parameter, the title of the share preview will be the name of your app's GitHub repository. E.g., if you don't set the `page_title` parameter in `st.set_page_config()`, the title of the share preview for an app hosted on GitHub at https://github.com/jrieke/traingenerator will be "traingenerator".

## Descriptions

The description is the text that appears below the title in the share preview. The description should summarize what the app does and ideally should be under 160 characters.

Streamlit pulls the description from the README in the app's GitHub repository. If there is no README, the description will default to:

_This app was built in Streamlit! Check it out and visit https://streamlit.io for more awesome community apps. 🎈_

If you want your share previews to look great and want users to share your app and click on your links, you should write a good description in the README of your app’s GitHub repository

## Preview images

Community Cloud takes a screenshot of your app once a day and uses it as the preview image, unlike titles and descriptions, which are pulled directly from your app's code or GitHub repository. This screenshot may take up to 24 hours to update.

## Public vs. private apps

All of the above information applies to public apps. If you share a private app, the share preview will contain no information about your app. Instead, it will include a default title ("Streamlit app"), a default description ("This app was built in Streamlit! Check it out and visit https://streamlit.io for more awesome community apps. 🎈"), and a default preview image that contains the Streamlit logo:

<div style={{ marginLeft: '10em' }}>
    <Flex>
    <Image caption="Default share preview for a private app" src="/images/streamlit-cloud/share-preview-private-app.png" />
    </Flex>
</div>

If your app was initially public and you later made it private, the share preview will no longer contain any information about your app. It will look like the image above, containing a generic title, description, and image. However, the last publicly available data will be discoverable for up to 24 hours after the app is made private.
