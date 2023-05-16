import streamlit as st
import numpy as np
import pandas as pd


def anchors():

    st.title('Introducing Anchor Tags with Headings')

    st.write('This is a demo app to showcase the functionality of Anchor Tags')

    st.markdown('''
    ---
    Using Anchor Tags, we can now create a Table of contents which links to other sections of the app.

    **Table of Contents**

     - [Demo](#demo-for-anchor-tags)
        - [Section 1](#section-1)
            - [Section 1a](#section-1a)
            - [Section 1b](#section-1b)
        - [Section 2](#section-2-multiple-columns)
            - [Section 2a](#section-2a)
    ''')

    st.title('Demo for Anchor Tags')

    st.markdown('---')

    st.header('Section 1')
    st.markdown('''
            This is a single column section. To get the link to this, click the anchor icon to the left of the "Section 1" heading above. 
    ''')

    st.subheader('Section 1a')
    st.markdown('''
            This is a sub heading. To get the link to this, click the anchor icon to the left of the 'Section 1a' subheading above. 
            Clicking on the anchor icon will refocus the page to this subheading. 
    ''')

    st.subheader('Section 1b')
    st.markdown('''Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel dolor convallis, rhoncus elit a, tempus nulla''')

    st.markdown('---')

    st.header('Section 2 Multiple Columns')
    st.markdown('''
    In this section of the app we focus on how anchors get rendered in multiple columns
    ''')


    col1, col2 = st.beta_columns(2)

    with col2:
        st.subheader('Section 2a')
        st.markdown('''
        On the left column is a chart. 

        ''')

    with col1:
        chart_data = pd.DataFrame(
            np.random.randn(20, 3),
            columns = ['a', 'b', 'c'])

        st.line_chart(chart_data)