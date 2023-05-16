import streamlit as st

def svg():
    st.write(
        """
        # Introducing Inline SVG support for st.image

        You can now pass in inline svg as a string!
        """
    )

    with st.echo("below"):
        svg = """
        <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">
          <circle id="svg_1" r="15" cy="20" cx="20" fill="yellow"/>
        </svg>
        """
        st.image(svg)
