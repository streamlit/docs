---
title: Release notes
slug: /develop/quick-reference/release-notes
description: A changelog of highlights and fixes for the latest version of Streamlit.
keywords: changelog, release notes, version history
---

# Release notes

This page lists highlights, bug fixes, and known issues for the latest release of Streamlit. If you're looking for information about nightly releases or experimental features, see [Pre-release features](/develop/quick-reference/prerelease).

## Upgrade Streamlit

<Tip>

To upgrade to the latest version of Streamlit, run:

```bash
pip install --upgrade streamlit
```

</Tip>

## **Version 1.58.0 (latest)**

_Release date: May 28, 2026_

**Highlights**

- 🌟 Introducing `parallel=True` for [`@st.fragment`](/develop/api-reference/execution-flow/st.fragment), which lets fragments run concurrently for more responsive apps and background-style workflows ([#15214](https://github.com/streamlit/streamlit/pull/15214)).
- 🍿 Introducing `st.pagination` to help you build paged interfaces, e.g. for dataframes ([#14975](https://github.com/streamlit/streamlit/pull/14975), [#10785](https://github.com/streamlit/streamlit/issues/10785)).
- 🚀 Announcing `streamlit skills`, a new CLI command for installing AI agent skills ([#15116](https://github.com/streamlit/streamlit/pull/15116)).

**Notable Changes**

- 🔔 `st.App` now supports custom script error handling, letting you attach a custom exception handler to your app ([#14972](https://github.com/streamlit/streamlit/pull/14972), [#3426](https://github.com/streamlit/streamlit/issues/3426), [#8713](https://github.com/streamlit/streamlit/issues/8713)).
- 📐 [`st.expander`](/develop/api-reference/layout/st.expander) and [`st.status`](/develop/api-reference/status/st.status) have a new `type` parameter for a more compact visual style ([#14054](https://github.com/streamlit/streamlit/pull/14054), [#13246](https://github.com/streamlit/streamlit/issues/13246)).
- 👻 The deprecated `element.add_rows` feature has been removed ([#15034](https://github.com/streamlit/streamlit/pull/15034), [#299](https://github.com/streamlit/streamlit/issues/299), [#13063](https://github.com/streamlit/streamlit/issues/13063), [#7994](https://github.com/streamlit/streamlit/issues/7994), [#5860](https://github.com/streamlit/streamlit/issues/5860)).
- 👻 LangChain callback handler integration has been removed ([#15051](https://github.com/streamlit/streamlit/pull/15051)).

**Other Changes**

- 🐛 Query-parameter-bound widgets now keep the URL in sync when their values change through Session State ([#14744](https://github.com/streamlit/streamlit/pull/14744)).
- 🖌 Widget and icon sizing is more consistent across the app ([#15056](https://github.com/streamlit/streamlit/pull/15056), [#15098](https://github.com/streamlit/streamlit/pull/15098), [#13945](https://github.com/streamlit/streamlit/issues/13945)).
- ⏱ Streamlit reduces the timeout for external IP lookups to avoid startup freezes when the lookup is slow or unavailable ([#14984](https://github.com/streamlit/streamlit/pull/14984)).
- 🛡 [`st.markdown`](/develop/api-reference/text/st.markdown) now blocks `javascript:` and `vbscript:` URLs in Markdown links ([#15161](https://github.com/streamlit/streamlit/pull/15161)).
- 🐛 Bug fix: Streamlit now supports symlinks in Starlette static file serving ([#15112](https://github.com/streamlit/streamlit/pull/15112), [#13600](https://github.com/streamlit/streamlit/issues/13600)).
- 🦋 Bug fix: Fragment apps no longer crash because of stale auto-reruns ([#15130](https://github.com/streamlit/streamlit/pull/15130), [#15084](https://github.com/streamlit/streamlit/issues/15084)).
- 🪲 Bug fix: `blake2b` hashing now uses `usedforsecurity=False` for FIPS-compatible environments ([#15149](https://github.com/streamlit/streamlit/pull/15149), [#15148](https://github.com/streamlit/streamlit/issues/15148)). Thanks, [andriykislitsyn](https://github.com/andriykislitsyn)!
- 🐜 Bug fix: [`st.login`](/develop/api-reference/user/st.login) cookies now restore 30-day persistence with a `Max-Age` value ([#15194](https://github.com/streamlit/streamlit/pull/15194), [#15193](https://github.com/streamlit/streamlit/issues/15193)). Thanks, [GiovanniPaoloGibilisco](https://github.com/GiovanniPaoloGibilisco)!
- 🐝 Bug fix: OAuth PKCE behavior has been restored in the Starlette-based auth flow ([#15282](https://github.com/streamlit/streamlit/pull/15282), [#15115](https://github.com/streamlit/streamlit/issues/15115)).
- 🐞 Bug fix: OAuth no longer regresses with `MismatchingStateError` after upgrading to 1.57.0 ([#15048](https://github.com/streamlit/streamlit/pull/15048), [#14991](https://github.com/streamlit/streamlit/issues/14991)).
- 🕷️ Bug fix: Provider tokens now use `joserfc`, improving auth compatibility and token handling ([#15178](https://github.com/streamlit/streamlit/pull/15178), [#15170](https://github.com/streamlit/streamlit/issues/15170)).
- 🪳 Bug fix: [`st.vega_lite_chart`](/develop/api-reference/charts/st.vega_lite_chart) tooltips work again inside dialogs ([#15191](https://github.com/streamlit/streamlit/pull/15191), [#12390](https://github.com/streamlit/streamlit/issues/12390)). Thanks, [marawanokasha](https://github.com/marawanokasha)!
- 🪰 Bug fix: [`st.button`](/develop/api-reference/widgets/st.button) warns when a keyboard shortcut is reserved by the browser ([#15217](https://github.com/streamlit/streamlit/pull/15217), [#15216](https://github.com/streamlit/streamlit/issues/15216)).
- 🦠 Bug fix: [`st.markdown`](/develop/api-reference/text/st.markdown) shows its help icon again when `unsafe_allow_html=True` ([#15232](https://github.com/streamlit/streamlit/pull/15232), [#15211](https://github.com/streamlit/streamlit/issues/15211)).
- 🦟 Bug fix: Browser Back/Forward navigation now works for pages with Unicode URL paths ([#15281](https://github.com/streamlit/streamlit/pull/15281), [#15267](https://github.com/streamlit/streamlit/issues/15267)).
- 🦂 Bug fix: Programmatically closed popovers and expanders no longer reopen when you interact with another container ([#14945](https://github.com/streamlit/streamlit/pull/14945), [#14943](https://github.com/streamlit/streamlit/issues/14943)).
- 🦗 Bug fix: [`st.selectbox`](/develop/api-reference/widgets/st.selectbox) no longer hides its first option when exactly seven options are selected ([#14997](https://github.com/streamlit/streamlit/pull/14997), [#14989](https://github.com/streamlit/streamlit/issues/14989)).
- 🕸️ Bug fix: [`st.multiselect`](/develop/api-reference/widgets/st.multiselect) disables "Select all" for very large option lists to avoid performance problems ([#15301](https://github.com/streamlit/streamlit/pull/15301), [#14918](https://github.com/streamlit/streamlit/issues/14918), [#15299](https://github.com/streamlit/streamlit/issues/15299)).
- 🐌 Bug fix: Tables, dataframes, and data editors no longer accidentally overscroll during interaction ([#15309](https://github.com/streamlit/streamlit/pull/15309)). Thanks, [kantuni](https://github.com/kantuni)!

## Older versions of Streamlit

- [2026 release notes](/develop/quick-reference/release-notes/2026)
- [2025 release notes](/develop/quick-reference/release-notes/2025)
- [2024 release notes](/develop/quick-reference/release-notes/2024)
- [2023 release notes](/develop/quick-reference/release-notes/2023)
- [2022 release notes](/develop/quick-reference/release-notes/2022)
- [2021 release notes](/develop/quick-reference/release-notes/2021)
- [2020 release notes](/develop/quick-reference/release-notes/2020)
- [2019 release notes](/develop/quick-reference/release-notes/2019)
