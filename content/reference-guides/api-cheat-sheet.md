---
title: API Cheat Sheet
category: Reference Guides
next: caching
previous: index.md
---

# API Cheat Sheet

Summary of the docs, as of [Streamlit v0.71.0](/).

<Row>
    <CodeTile size="fourth" featured>
        <h4>Install & import</h4>
        <code>streamlit run 
        first_app.py</code>
        <p>Import convention</p>
        <code>>>> import streamlit as st</code>
    </CodeTile>
    <CodeTile size="fourth" featured>
        <h4>Command line</h4>
        <code>$ streamlit --help<br />
$ streamlit run your_script.py<br />
$ streamlit hello <br />
$ streamlit config show<br />
$ streamlit cache clear<br />
$ streamlit docs<br />
$ streamlit --version</code>
    </CodeTile>
    <CodeTile size="fourth" featured>
        <h4>Add widgets to sidebar</h4>
        <code>st.sidebar. <>{'<widget>'}</> <br />
>>> a = st.sidebar.radio('R:',[1,2])</code>
    </CodeTile>
    <CodeTile size="fourth" featured>
        <h4>Pre-release features</h4>
        <p><a href="/">Beta and Experimental Features</a></p>
        <code>pip uninstall streamlit<br />
pip install streamlit-nightly --upgrade</code>
    </CodeTile>
</Row>

<Masonry>
    <CodeTile>
        <h4>Magic commands</h4>
        <code># Magic commands implicitly `st.write()`<br/>
''' _This_ is some __Markdown__ '''<br/>
a=3<br/>
'dataframe:', data</code>
    </CodeTile>
    <CodeTile>
        <h4>Display text</h4>
        <code><>{`st.text('Fixed width text')
st.markdown('_Markdown_') # see *
st.latex(r''' e^{i\pi} + 1 = 0 ''')
st.write('Most objects') # df, err, func, keras!
st.write(['st', 'is <', 3]) # see *
st.title('My title')
st.header('My header')
st.subheader('My sub')
st.code('for i in range(8): foo()')
* optional kwarg unsafe_allow_html = True`}</></code>
    </CodeTile>
    <CodeTile>
        <h4>Display data</h4>
        <code><>{`st.dataframe(my_dataframe)
st.table(data.iloc[0:10])
st.json({'foo':'bar','fu':'ba'})`}</></code>
    </CodeTile>
    <CodeTile>
        <h4>Display media</h4>
        <code><>{`st.image('./header.png')
st.audio(data)
st.video(data)`}</></code>
    </CodeTile>
    <CodeTile>
        <h4>Control flow</h4>
        <code><>{`st.stop()`}</></code>
    </CodeTile>
    <CodeTile>
        <h4>Display interactive widgets</h4>
        <code><>{`st.text('Fixed width text')
st.markdown('_Markdown_') # see *
st.latex(r''' e^{i\pi} + 1 = 0 ''')
st.write('Most objects') # df, err, func, keras!
st.write(['st', 'is <', 3]) # see *
st.title('My title')
st.header('My header')
st.subheader('My sub')
st.code('for i in range(8): foo()')
* optional kwarg unsafe_allow_html = True`}</></code>
<p class="bold">Use widgets' returned values in variables:</p>
<code><>{`>>> for i in range(int(st.number_input('Num:'))): foo()
>>> if st.sidebar.selectbox('I:',['f']) == 'f': b()
>>> my_slider_val = st.slider('Quinn Mallory', 1, 88)
>>> st.write(slider_val)`}</></code>
    </CodeTile>
    <CodeTile>
        <h4>Display charts</h4>
        <code><>{`st.line_chart(data)
st.area_chart(data)
st.bar_chart(data)
st.pyplot(fig)
st.altair_chart(data)
st.vega_lite_chart(data)
st.plotly_chart(data)
st.bokeh_chart(data)
st.pydeck_chart(data)
st.deck_gl_chart(data)
st.graphviz_chart(data)
st.map(data)`}</></code>
    </CodeTile>
    <CodeTile>
        <h4>Lay out your app</h4>
        <code><>{`st.line_chart(data)
st.area_chart(data)
st.bar_chart(data)
st.pyplot(fig)
st.altair_chart(data)
st.vega_lite_chart(data)
st.plotly_chart(data)
st.bokeh_chart(data)
st.pydeck_chart(data)
st.deck_gl_chart(data)
st.graphviz_chart(data)
st.map(data)`}</></code>
    </CodeTile>
    <CodeTile>
        <h4>Placeholders, help, and options</h4>
        <code><>{`st.empty()
>>> my_placeholder = st.empty()
>>> my_placeholder.text('Replaced!')
st.help(pandas.DataFrame)
st.get_option(key)
st.set_option(key, value)
st.set_page_config(layout='wide')`}</></code>
    </CodeTile>
    <CodeTile>
        <h4>Mutate data</h4>
        <code><>{`DeltaGenerator.add_rows(data)
>>> my_table = st.table(df1)
>>> my_table.add_rows(df2)
>>> my_chart = st.line_chart(df1)
>>> my_chart.add_rows(df2)`}</></code>
    </CodeTile>
    <CodeTile>
        <h4>Display code</h4>
        <code><>{`st.echo()
>>> with st.echo():
>>>     st.write('Code will be executed and printed')`}</></code>
    </CodeTile>
</Masonry>