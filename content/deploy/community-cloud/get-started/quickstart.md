---
title: Quickstart
slug: /deploy/streamlit-community-cloud/get-started/quickstart
---

# Quickstart

This is a concise set of steps to create your Streamlit Community Cloud account, deploy a sample app, and start editing it with GitHub Codespaces. For other options and complete explanations, start with [Create your account](/deploy/streamlit-community-cloud/get-started/create-your-account).

You will be signing in to your Google and GitHub accounts during this process. If you do not already have these accounts, you can create them before you begin. If you do not want to use a Google account, you can [create your account with any email](/deploy/streamlit-community-cloud/get-started/create-your-account#primary-identity-option-2-email).

## Sign up for Streamlit Community Cloud

1. Go to <a href="https://share.streamlit.io" target="_blank">share.streamlit.io</a>.
1. Click "**Continue to sign-in**."
1. Click "**Continue with Google**."
1. Enter your Google credentials and follow Google's authentication prompts.
1. Fill in your account information, and click "**I accept**" at the bottom.

## Connect your GitHub account

1. In the upper-left corner, click on "**Workspaces <i style={{ verticalAlign: "-.25em", color: "#ff8700" }} className={{ class: "material-icons-sharp" }}>warning</i>**."

<div style={{ maxWidth: '90%', margin: 'auto' }}>
<Image alt="Connect your GitHub account to a new Community Cloud account" src="/images/streamlit-community-cloud/workspace-unconnected-setup.png" />
</div>

1. From the drop down, click "**Connect GitHub account**."
1. Enter your GitHub credentials and follow GitHub's authentication prompts.
1. Click "**Authorize streamlit**".

<div style={{ maxWidth: '40%', margin: 'auto' }}>
<Image alt="Authorize Community Cloud to connect to your GitHub account" src="/images/streamlit-community-cloud/GitHub-auth1-none.png" />
</div>

## Optional: Add access to private repositories

1. In the upper-left corner, click on your GitHub username.

<div style={{ maxWidth: '90%', margin: 'auto' }}>
<Image alt="Access your workspace settings" src="/images/streamlit-community-cloud/workspace-empty-menu.png" />
</div>

1. From the drop down, click "**Settings**."
1. On the left side of the modal dialog, select "**Linked accounts**."
1. Under "Source control," click "**Connect here <i style={{ verticalAlign: "-.25em" }} className={{ class: "material-icons-sharp" }}>arrow_forward</i>**."
1. Click "**Authorize streamlit**."

<div style={{ maxWidth: '40%', margin: 'auto' }}>
<Image alt="Authorize Community Cloud to connect to your private GitHub repositories" src="/images/streamlit-community-cloud/GitHub-auth2-none.png" />
</div>

## Create a new app from a template

1. In the upper-right corner, click "**Create app**."

<div style={{ maxWidth: '90%', margin: 'auto' }}>
<Image alt="Create a new app from your workspace in Streamlit Community Cloud" src="/images/streamlit-community-cloud/deploy-empty-new-app.png" />
</div>

1. On the "Do you already have an app?" page, click "**Nope, create one from a template**".
1. From the list of templates on the left, select "**GDP dashboard**."
1. At the bottom, click "**Deploy**."
1. Optional: After you are redirected to your app, interact with it by changing the selected years and countries.

<div style={{ maxWidth: '90%', margin: 'auto' }}>
<Image alt="Fork the sample Streamlit app" src="/images/streamlit-community-cloud/deploy-template-GDP.png" />
</div>

## Edit your app in GitHub Codespaces

1. Return to your workspace at <a href="https://share.streamlit.io" target="_blank">share.streamlit.io</a>.
1. To the right of your deployed app, click the overflow menu icon (<i style={{ verticalAlign: "-.25em" }} className={{ class: "material-icons-sharp" }}>more_vert</i>).

<div style={{ maxWidth: '90%', margin: 'auto' }}>
<Image alt="Deployed app overflow menu" src="/images/streamlit-community-cloud/deploy-template-GDP-menu.png" />
</div>

1. In the overflow menu, click "**<i style={{ verticalAlign: "-.25em" }} className={{ class: "material-icons-sharp" }}>edit</i> Edit with Codespaces**."
1. Wait a few minutes while Community Cloud configures your codespace and redirects you.

   Once your codespace opens, GitHub will automatically execute the commands to launch your Streamlit app within your codespace. This may take a few more minutes to complete from when your codespace first appears on screen. Your app will be visible in a "Simple Browser" tab on the right.

   <div style={{ maxWidth: '90%', margin: 'auto' }}>
   <Image alt="Your new GitHub Codespace" src="/images/streamlit-community-cloud/deploy-template-GDP.png" />
   </div>

1. Go to the app's main file (`Hello.py`) and add some text to the title in `st.write()`. Try typing ":balloon:" at the beginning.

<div style={{ maxWidth: '90%', margin: 'auto' }}>
<Image alt="Edit the title of your sample Streamlit app" src="/images/streamlit-community-cloud/deploy-hello-edit-title.png" />
</div>

17. Files are automatically saved in your codespace with each edit. Click "**Always rerun**" in the upper-right corner of your app to automatically rerun with each edit.

<div style={{ maxWidth: '90%', margin: 'auto' }}>
<Image alt='Select "Always rerun" to automatically see edits in your running app' src="/images/streamlit-community-cloud/deploy-hello-edit-rerun.png" />
</div>

18. See your edits and keep going!

<div style={{ maxWidth: '90%', margin: 'auto' }}>
<Image alt="See the results of your edit to your Streamlit app" src="/images/streamlit-community-cloud/deploy-hello-edit-result.png" />
</div>

## Stop or delete your codespace

When you are done, remember to stop your codespace on GitHub to avoid any undesired use of your capacity.

19. Go to <a href="https://github.com/codespaces" target="_blank">github.com/codespaces</a>. At the bottom of the page, all your codespaces are listed. Click the overflow menu icon (<i style={{ verticalAlign: "-.25em" }} className={{ class: "material-icons-sharp" }}>more_horiz</i>) for your codespace.

<div style={{ maxWidth: '90%', margin: 'auto' }}>
<Image alt="Stop or delete your GitHub Codespace" src="/images/streamlit-community-cloud/deploy-hello-codespace-manage.png" />
</div>

20. Click "**Stop codespace**" if you'd like to return to your work later. Otherwise, click "**Delete**."

    <Flex>
    <div style={{ maxWidth: '40%', margin: 'auto' }}>
    <Image alt="Stop your GitHub codespace" src="/images/streamlit-community-cloud/codespace-menu-stop.png" />
    </div>
    <div style={{ maxWidth: '40%', margin: 'auto' }}>
    <Image alt="Delete your GitHub codespace" src="/images/streamlit-community-cloud/codespace-menu-delete.png" />
    </div>
    </Flex>

21. Congratulations! You just deployed an app to Streamlit Community Cloud. 🎉 Head back to your workspace at <a href="https://share.streamlit.io/" target="_blank">share.streamlit.io/</a> and [deploy another Streamlit app](/deploy/streamlit-community-cloud/deploy-your-app).

<div style={{ maxWidth: '90%', margin: 'auto' }}>
<Image alt="See your deployed Streamlit app" src="/images/streamlit-community-cloud/deploy-hello-workspace.png" />
</div>
