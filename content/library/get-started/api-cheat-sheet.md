---
title: Cheat Sheet
slug: /library/get-started/cheatsheet
---

# Cheat Sheet

Summary of the docs, as of [Streamlit v0.71.0](/).

<Row>


<CodeTile featured size="half">

#### Install & Import

```python
streamlit run 
first_app.py
```

Import convention

```python
>>> import streamlit as st
```
</CodeTile>


<CodeTile featured size="half">

#### Command line

```python
$ streamlit --help
$ streamlit run your_script.py
$ streamlit hello
$ streamlit config show
$ streamlit cache clear
$ streamlit docs
$ streamlit --version
```

</CodeTile>


<CodeTile featured size="half">

#### Add widgets to sidebar

```python
st.sidebar.<widget>
>>> a = st.sidebar.radio('R:',[1,2])
```

</CodeTile>


<CodeTile featured size="half">

#### Pre-release features

[Beta and experimental features](/)

```python
pip uninstall streamlit
pip install streamlit-nightly --upgrade
```

</CodeTile>

</Row>

<Masonry>

<CodeTile>

#### Magic commands

```python
# Magic commands implicitly `st.write()`
''' _This_ is some __Markdown__ '''
a=3
'dataframe:', data

```
</CodeTile>


<CodeTile>

#### Display text

```python
st.text('Fixed width text')
st.markdown('_Markdown_') # see *
st.latex(r''' e^{i\pi} + 1 = 0 ''')
st.write('Most objects') # df, err, func, keras!
st.write(['st', 'is <', 3]) # see *
st.title('My title')
st.header('My header')
st.subheader('My sub')
st.code('for i in range(8): foo()')
* optional kwarg unsafe_allow_html = True
```
</CodeTile>


<CodeTile>

#### Display data

```python
st.dataframe(my_dataframe)
st.table(data.iloc[0:10])
st.json({'foo':'bar','fu':'ba'})

```
</CodeTile>


<CodeTile>

#### Display media

```python
st.image('./header.png')
st.audio(data)
st.video(data)
```
</CodeTile>


<CodeTile>

#### Control flow

```python
st.stop()
```
</CodeTile>


<CodeTile>

#### Display interactive widgets

```python
st.text('Fixed width text')
st.markdown('_Markdown_') # see *
st.latex(r''' e^{i\pi} + 1 = 0 ''')
st.write('Most objects') # df, err, func, keras!
st.write(['st', 'is <', 3]) # see *
st.title('My title')
st.header('My header')
st.subheader('My sub')
st.code('for i in range(8): foo()')
* optional kwarg unsafe_allow_html = True
```

Use widgets' returned values in variables:

```python
>>> for i in range(int(st.number_input('Num:'))): foo()
>>> if st.sidebar.selectbox('I:',['f']) == 'f': b()
>>> my_slider_val = st.slider('Quinn Mallory', 1, 88)
>>> st.write(slider_val)
```
</CodeTile>


<CodeTile>

#### Mutate data

```python
DeltaGenerator.add_rows(data)
>>> my_table = st.table(df1)
>>> my_table.add_rows(df2)
>>> my_chart = st.line_chart(df1)
>>> my_chart.add_rows(df2)
```
</CodeTile>


<CodeTile>

#### Display code

```python
st.echo()
>>> with st.echo():
>>>     st.write('Code will be executed and printed')
```
</CodeTile>


<CodeTile>

#### Placeholders, help, and options

```python
st.empty()
>>> my_placeholder = st.empty()
>>> my_placeholder.text('Replaced!')
st.help(pandas.DataFrame)
st.get_option(key)
st.set_option(key, value)
st.set_page_config(layout='wide')
```
</CodeTile>


<CodeTile>

#### Optimize performance

```python
@st.cache
>>> @st.cache
... def foo(bar):
...     # Mutate bar
...     return data
>>> # Executes d1 as first time
>>> d1 = foo(ref1)
>>> # Does not execute d1; returns cached value, d1==d2
>>> d2 = foo(ref1)
>>> # Different arg, so function d1 executes
>>> d3 = foo(ref2)
```
</CodeTile>


<CodeTile>

#### Display progress and status

```python
st.progress(progress_variable_1_to_100)
st.spinner()
>>> with st.spinner(text='In progress'):
>>>     time.sleep(5)
>>>     st.success('Done')
st.balloons()
st.error('Error message')
st.warning('Warning message')
st.info('Info message')
st.success('Success message')
st.exception(e)
```
</CodeTile>

</Masonry>
