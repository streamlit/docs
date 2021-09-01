---
title: Pre-release features
slug: /library/advanced-features/prerelease
---

# Pre-release features

At Streamlit, we like to move quick while keeping things stable. In our latest effort to move even faster without sacrificing stability, we're offering our bold and fearless users two ways to try out Streamlit's bleeding-edge features:

1. [Nightly releases](#nightly-releases)
2. [Beta and experimental features](#beta-and-experimental-features)

## Nightly releases

At the end of each day (at night 🌛), our bots run automated tests against the latest Streamlit code and, if everything looks good, it publishes them as the `streamlit-nightly` package. This means the nightly build includes all our latest features, bug fixes, and other enhancements on the same day they land on our codebase.

**How does this differ from official releases?**

Official Streamlit releases go not only through both automated tests but also rigorous manual testing, while nightly releases only have automated tests. It's important to keep in mind that new features introduced in nightly releases often lack polish. In our official releases, we always make double-sure all new features are ready for prime time.

**How do I use the nightly release?**

All you need to do is install the `streamlit-nightly` package:

```bash
pip uninstall streamlit
pip install streamlit-nightly --upgrade
```

<Warning>

   You should never have both `streamlit` and `streamlit-nightly` installed in the same environment!

</Warning>

**Why should I use the nightly release?**

Because you can't wait for official releases, and you want to help us find bugs early!

**Why shouldn't I use the nightly release?**

While our automated tests have high coverage, there's still a significant likelihood that there will be some bugs in the nightly code.

**Can I choose which nightly release I want to install?**

If you'd like to use a specific version, you can find the version number in our [Release history](https://pypi.org/project/streamlit-nightly/#history). Specify the desired version using `pip` as usual: `pip install streamlit-nightly==x.yy.zz-123456`.

**Can I compare changes between releases?**

If you'd like to review the changes for a nightly release, you can use the [comparison tool on GitHub](https://github.com/streamlit/streamlit/compare/0.57.3...0.57.4.dev20200412).

## Beta and Experimental Features

In addition to nightly releases, we also have two naming conventions for less stable Streamlit features: `st.beta_` and `st.experimental_`. These distinctions are prefixes we attach to our function names to make sure their status is clear to everyone.

Here's a quick rundown of what you get from each naming convention:

- **st**: this is where our core features like `st.write` and `st.dataframe` live. If we ever make backward-incompatible changes to these, they will take place gradually and with months of announcements and warnings.
- **beta**: this is where all new features land before they becoming part of Streamlit core. This gives you a chance to try the next big thing we're cooking up weeks or months before we're ready to stabilize its API.
- **experimental**: this is where we'll put features that may or may not ever make it into Streamlit core. We don't know whether these features have a future, but we want you to have access to everything we're trying, and work with us to figure them out.

The main difference between `beta_` and `experimental_` is that beta features are expected to make it into Streamlit core at some point soon, while experimental features may never make it.

### Beta

Features with the `beta_` naming convention are all scheduled to become part of Streamlit core.
While in beta, a feature's API and behaviors may not be stable, and it's possible they could change
in ways that aren't backward-compatible.

**The lifecycle of a beta feature**

1. A feature is added with the `beta_` prefix.

2. The feature's API stabilizes and the feature is _cloned_ without the `beta_` prefix, so it exists
   as both `st` and `beta_`. At this point, users will see a warning when using the version of the
   feature with the `beta_` prefix -- but the feature will still work.

3. At some point, the code of the `beta_`-prefixed feature is _removed_, but there will still be a
   stub of the function prefixed with `beta_` that shows an error with appropriate instructions.

4. Finally, at a later date the `beta_` version is removed.

### Experimental

Features with the `experimental_` naming convention are things that we're still working on or trying
to understand. If these features are successful, at some point they'll become part of Streamlit
core, by moving to the `beta_` naming convention and then to Streamlit core. If unsuccessful, these
features are removed without much notice.

<Warning>

Experimental features and their APIs may change or be removed at any time.

</Warning>

**The lifecycle of an experimental feature**

1. A feature is added with the `experimental_` prefix.
2. The feature is potentially tweaked over time, with possible API/behavior breakages.
3. At some point, we either promote the feature to `beta_` or remove it from `experimental_`. Either way, we leave a stub in `experimental_` that shows an error with instructions.
