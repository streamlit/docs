---
title: Status and limitations
slug: /deploy/streamlit-community-cloud/status
---

# Status and limitations of Community Cloud

## Community Cloud Status

You can view the current status of Community Cloud at [streamlitstatus.com](https://www.streamlitstatus.com/).

## Known issues and limitations

### GitHub OAuth scope

In order to deploy your app, Streamlit requires access to your app's source code in GitHub and also the ability to manage the public keys associated with your repositories. The default GitHub OAuth scopes are sufficient to work with apps in public GitHub repositories. However, to access your private repositories, we create a read-only [GitHub Deploy Key](https://docs.github.com/en/free-pro-team@latest/developers/overview/managing-deploy-keys#deploy-keys) then access your repo using a public SSH key. When we create this key, GitHub notifies repo admins of the creation as a security measure.

Streamlit requires the additional `repo` OAuth scope from GitHub to work with your private repos and manage deploy keys. We recognize that the `repo` scope provides Streamlit with extra permissions that we do not really need, and which, as people who prize security, we'd rather not even be granted. Alas, we need to work with the APIs we are provided by GitHub.

### Developer permissions

Because of the OAuth limitations noted above, a developer must have administrative permissions to a repository to deploy apps from it.

### Python environments

### Other

Here are some limitations and known issues that we're actively working to resolve.

- When you print something to the Cloud logs, you may need to do a `sys.stdout.flush()` before it shows up.
- Matplotlib [doesn't work well with threads](https://matplotlib.org/3.3.2/faq/howto_faq.html#working-with-threads). So if you're using Matplotlib you should wrap your code with locks as shown in the snippet below. This Matplotlib bug is more prominent when you share your app apps since you're more likely to get more concurrent users then.

  ```python
  from matplotlib.backends.backend_agg import RendererAgg
  _lock = RendererAgg.lock

  with _lock:
    fig.title('This is a figure)')
    fig.plot([1,20,3,40])
    st.pyplot(fig)
  ```

- All apps are hosted in the United States. This is currently not configurable.
