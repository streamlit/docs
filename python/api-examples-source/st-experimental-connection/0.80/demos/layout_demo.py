import streamlit as st
import os
from PIL import Image


def layout_demo():
    script_path = os.path.dirname(__file__)
    rel_path = 'images/mountain.jpg'
    abs_file_path = script_path + '/' + rel_path

    st.markdown('''
    ---
    [Fix for image galleries not being the same size](https://github.com/streamlit/streamlit/issues/3013)
    ''')
    # Produce 3 images and put them into 3 columns next to each other, scaling them automatically to columns width
    cols = st.beta_columns(3)
    for col in cols:
        image = Image.open(abs_file_path)
        col.image(image, use_column_width=True)

    st.markdown('''Photo by <a href="https://unsplash.com/@tdederichs?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Torsten Dederichs</a> on <a href="https://unsplash.com/t/nature?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>''', unsafe_allow_html=True)

    st.markdown('---')

    st.markdown('''
    [Fix for spacing in Safari at smaller viewports not working correctly](https://github.com/streamlit/streamlit/pull/3042)
    ''')

    with st.echo():
        search_term = st.text_input('Search term', value='streamlit')

        col1, col2 = st.beta_columns([2, 1])

        with col1:
            from_date = st.selectbox('1 month ago', options=['A', 'B'])

        with col2:
            limit = st.number_input('Limit', value=10000)

        col3, col4, col5 = st.beta_columns(3)

        with col3:
            min_replies = st.number_input('Minimum replies', value=0)
        with col4:
            min_retweets = st.number_input('Minimum retweets', value=0)
        with col5:
            min_hearts = st.number_input('Minimum hearts', value=0)