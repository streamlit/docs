---
title: st.query_params
slug: /develop/api-reference/caching-and-state/st.query_params
description: st.query_params reads and manipulates query parameters in the browser's URL bar.
---

## st.query_params

`st.query_params` provides a dictionary-like interface to access query parameters in your app's URL and is available as of Streamlit 1.30.0. It behaves similarly to `st.session_state` with the notable exception that keys may be repeated in an app's URL. Handling of repeated keys requires special consideration as explained below. `st.query_params` can be used with both key and attribute notation. For example, `st.query_params.my_key` and `st.query_params["my_key"]`.

Query parameters can be entered into your app's URL or programatically added through `st.query_params`. For example, the following URL and dictionary show the same key-value pairs:

```javascript
https://your_app.streamlit.app/?first_key=1&second_key=two&third_key=true
```

```python
{
    "first_key" : "1",
    "second_key" : "two",
    "third_key" : "true"
}

```

A key-value pair prefixed with `?` is added to the end of your app's URL. Additional key-value pairs can be added. Each additional pair is prefixed with `&` instead of `?`. All keys and values will be set and returned as strings. Query parameters are cleared when navigating between pages in a multipage app.

### Repeated keys

When a key is repeated in your app's URL (`?a=1&a=2&a=3`), dict-like methods will return only the last value. In this example, `st.query_params["a"]` returns `"3"`. To get all keys as a list, use the [`.get_all()`](/develop/api-reference/caching-and-state/st.query_params#stquery_paramsget_all) method shown below. To set the value of a repeated key, assign the values as a list. For example, `st.query_params.a = ["1", "2", "3"]` produces the repeated key given at the beginning of this paragraph.

### Limitation

`st.query_params` can't get or set embedding settings as described in [Embed your app](/deploy/streamlit-community-cloud/share-your-app/embed-your-app#embed-options). `st.query_params.embed` and `st.query_params.embed_options` will raise an `AttributeError` or `StreamlitAPIException` when trying to get or set their values, respectively.

<Autofunction function="streamlit.query_params.get_all" />

<Autofunction function="streamlit.query_params.clear" />

<Autofunction function="streamlit.query_params.to_dict" />
