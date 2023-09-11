---
title: Quickstart
slug: /streamlit-community-cloud/get-started/quickstart
---

# Quickstart

This is a concise set of steps to create your Streamlit Community Cloud account, deploy a sample app, and start editing it with GitHub Codespaces. For other options and complete explanations, start with [Create your account](/streamlit-community-cloud/get-started/create-your-account).

You will be signing in to your Google and GitHub accounts during this process. If you do not already have these accounts, you can create them before you begin. If you do not want to use a Google account, you can [create your account with any email](/streamlit-community-cloud/get-started/create-your-account#primary-identity-option-2-email).

## Sign up for Streamlit Community Cloud

1. Go to <a href="https://share.streamlit.io/signup" target="_blank">share.streamlit.io/signup</a>.
2. Click "**Continue with Google**".

<div style={{ maxWidth: '50%', margin: 'auto' }}>
<Image alt="Sign up for Streamlit Community Cloud with Google" src="/images/streamlit-community-cloud/sign-up-Google-XL.png" />
</div>

3. Enter your Google credentials and follow Google's authentication prompts.
4. After authenticating with Google, click "**Connect GitHub account**".

<div style={{ maxWidth: '50%', margin: 'auto' }}>
<Image alt="Connect your GitHub account to Streamlit Community Cloud" src="/images/streamlit-community-cloud/sign-up-2.png" />
</div>

5. Enter your GitHub credentials and follow GitHub's authentication prompts.
6. Click "**Authorize streamlit**".

<div style={{ maxWidth: '50%', margin: 'auto' }}>
<Image alt="Authorize streamlit to connect to your GitHub account" src="/images/streamlit-community-cloud/GitHub-auth1-none.png" />
</div>

7. To finish, fill in your information and click "**Continue**" at the bottom of the screen.

<div style={{ maxWidth: '70%', margin: 'auto' }}>
<Image alt="Set up your Streamlit Community Cloud account" src="/images/streamlit-community-cloud/sign-up-3.png" />
</div>

8. You will be taken to your Streamlit workspace. If you see a warning icon (<i style={{ verticalAlign: "-.25em", color: "#ff8700" }} className={{ class: "material-icons-sharp" }}>warning</i>) next to "**Settings**" in the upper-right corner, this will be addressed in the next steps.

<div style={{ maxWidth: '90%', margin: 'auto' }}>
<Image alt="Your new workspace in Streamlit Community Cloud" src="/images/streamlit-community-cloud/workspace-empty-warning.png" />
</div>

## Fork and deploy a sample Streamlit app

9. Click the down arrow (<i style={{ verticalAlign: "-.25em" }} className={{ class: "material-icons-sharp" }}>expand_more</i>) to expand the options under "**New App**".

<div style={{ maxWidth: '90%', margin: 'auto' }}>
<Image alt="Options to deploy a new app from your workspace in Streamlit Community Cloud" src="/images/streamlit-community-cloud/deploy-menu.png" />
</div>

10. Click "**Create from sample app template**".

<div style={{ maxWidth: '90%', margin: 'auto' }}>
<Image alt="Deploy a new app from a sample app template" src="/images/streamlit-community-cloud/deploy-sample.png" />
</div>

11. You will be prompted that "Streamlit is requesting additional permissions". Click "**Authorize streamlit**".

<div style={{ maxWidth: '50%', margin: 'auto' }}>
<Image alt="Authorize streamlit to access private repositories" src="/images/streamlit-community-cloud/GitHub-auth2-none.png" />
</div>

12. Click "**Fork sample app**".

<div style={{ maxWidth: '90%', margin: 'auto' }}>
<Image alt="Fork the sample Streamlit app" src="/images/streamlit-community-cloud/deploy-example-fork.png" />
</div>

13. After the repository is copied to your GitHub account, the forked repository's information is prefilled into a deployment screen. Click "**Deploy!**"

<div style={{ maxWidth: '90%', margin: 'auto' }}>
<Image alt="Deploy your sample Streamlit app" src="/images/streamlit-community-cloud/deploy-example-deploy.png" />
</div>

14. Wait for the app to build. This may take a few minutes.

<div style={{ maxWidth: '90%', margin: 'auto' }}>
<Image alt="Watch your app build and deploy" src="/images/streamlit-community-cloud/deploy-demo-provisioning.png" />
</div>

15. Congratulations! You just deployed an app to Streamlit Community Cloud. 🎉 Your app may take a few minutes to fully build, but once it's done it will load automatically. You can [deploy another Streamlit app](/streamlit-community-cloud/deploy-your-app) or continue with this Quickstart guide to edit your sample app using GitHub Codespaces.

<div style={{ maxWidth: '90%', margin: 'auto' }}>
<Image alt="See your deployed Streamlit app" src="/images/streamlit-community-cloud/deploy-example-done.png" />
</div>

## Edit your Streamlit app in GitHub Codespaces

16. Return to your workspace at <a href="https://share.streamlit.io" target="_blank">share.streamlit.io</a> and click the overflow menu icon ((<i style={{ verticalAlign: "-.25em" }} className={{ class: "material-icons-sharp" }}>more_vert</i>)) for your new app.

<div style={{ maxWidth: '90%', margin: 'auto' }}>
<Image alt="App overflow menu in your workspace" src="/images/streamlit-community-cloud/deploy-sample-overflow.png" />
</div>

17. Click "**Edit**."

<div style={{ maxWidth: '90%', margin: 'auto' }}>
<Image alt="Edit your app with GitHub Codespaces" src="/images/streamlit-community-cloud/deploy-sample-edit.png" />
</div>

18. Click "**Create codespace**" to confirm the creation of a Codespace on your GitHub account. Read more about [GitHub Codespaces](https://github.com/features/codespaces) the learn about monthly limits for free use and paid plans.

<div style={{ maxWidth: '90%', margin: 'auto' }}>
<Image alt="Create your GitHub Codespace" src="/images/streamlit-community-cloud/deploy-codespaces-2.png" />
</div>

19. Wait for GitHub to set up your Codespace.

<div style={{ maxWidth: '90%', margin: 'auto' }}>
<Image alt="GitHub preparing your codespace" src="/images/streamlit-community-cloud/deploy-codespaces-3.png" />
</div>

20. When your Codespace is built, GitHub will open your Codespace and automatically execute the commands to launch your Streamlit app. Your live app will be visible in a "Simple Browser" on the right.

<div style={{ maxWidth: '90%', margin: 'auto' }}>
<Image alt="Your new GitHub Codespace" src="/images/streamlit-community-cloud/deploy-sample-codespace.png" />
</div>

21. Go to the app main file (`streamlit_app.py`) and add some text to the app title. Try typing ":balloon:" at the end of the title.

<div style={{ maxWidth: '90%', margin: 'auto' }}>
<Image alt="Edit the title of your sample Streamlit app" src="/images/streamlit-community-cloud/deploy-sample-edit-title.png" />
</div>

22. Files are automatically saved with each edit. Click "**Always rerun**" in the upper-right corner of your app to automatically rerun with each edit.

<div style={{ maxWidth: '90%', margin: 'auto' }}>
<Image alt='Select "Always rerun" to automatically see edits in your running app' src="/images/streamlit-community-cloud/deploy-sample-edit-rerun.png" />
</div>

23. See your edits and keep going with more.

<div style={{ maxWidth: '90%', margin: 'auto' }}>
<Image alt="See the results of your edit to your Streamlit app" src="/images/streamlit-community-cloud/deploy-sample-edit-result.png" />
</div>

24. When you are done, remember to stop your Codespace on GitHub to avoid any undesired use of your capacity.

Go to <a href="https://github.com/codespaces" target="_blank">github.com/codespaces</a>. At the bottom of the page, all your Codespaces are listed. Click the overflow menu icon for your Codespace. Click "**Stop codespace**" if you'd like to return to your work later. Otherwise, click "**Delete**."

<div style={{ maxWidth: '90%', margin: 'auto' }}>
<Image alt="Stop or delete your GitHub Codespace" src="/images/streamlit-community-cloud/deploy-sample-codespaces.png" />
</div>

Happy Streamlit-ing!🎈
