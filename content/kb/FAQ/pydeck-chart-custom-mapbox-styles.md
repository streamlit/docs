---
title: How can I make st.pydeck_chart use custom Mapbox styles?
slug: /knowledge-base/using-streamlit/pydeck-chart-custom-mapbox-styles
---

# How can I make st.pydeck_chart use custom Mapbox styles?

If you are supplying a Mapbox token, but the resulting `pydeck_chart` doesn't show your custom Mapbox styles, set the token with the `MAPBOX_API_KEY` environment variable or PyDeck's `api_keys` argument. Streamlit does not read Mapbox tokens from inside of a PyDeck specification (i.e. from inside of the Streamlit app). Please see this [forum thread](https://discuss.streamlit.io/t/deprecation-warning-deckgl-pydeck-maps-to-require-mapbox-token-for-production-usage/2982/10) for more information.
