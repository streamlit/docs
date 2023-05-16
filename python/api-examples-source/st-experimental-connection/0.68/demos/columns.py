import streamlit as st
from PIL import Image
from io import BytesIO
import random
import html

def columns():
    st.write("""
    # Go horizontal with columns

    `st.beta_columns` acts similarly to `st.sidebar`, except now you can put the
    columns anywhere in your app. Just declare each column as a new variable, and
    then you can add in ANY element or component available from the Streamlit library.

    ---
    ##  Compare things side-by-side!
    """)

    with st.echo("below"):
        svg="""
            <svg xmlns="http://www.w3.org/2000/svg">
                <rect
                    width="100%"
                    height="100%"
                    fill="black"
                />
            </svg>
        """

        col1, col2 = st.beta_columns(2)

        col1.write("### Original")
        col1.code(svg)

        col2.write("### Encoded")
        col2.code(html.escape(svg))

        st.write("### Code")


    st.write("""
    ---
    ## Or create a grid layout!
    """)

    with st.echo("below"):
        colors = ['red', 'pink', 'orange','green','blue', 'purple']
        svg="""
        <svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
            width="100%"
            height="100%"
        >
            <rect width="100%" height="100%" fill="{0}"/>
        </svg>
        """

        for i in range(1, 3):
            cols = st.beta_columns((2, 1, 3, 4))
            for col in cols:
                col.image(svg.format(random.choice(colors)), use_column_width=True)

        st.write("### Code")
