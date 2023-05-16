import streamlit as st


def caption_demo():
    st.image(
        "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/279/ant_1f41c.png",
        width=100,
    )

    st.write(
        """
        # Try out `st.caption`!

        Ever wanted to add some small text to your streamlit app? Now you can, with `st.caption`:
        """
    )
    with st.echo():
        st.write("This is normal text")
        st.caption("This is small text 🐜")
    st.write("---")

    st.write("And `st.caption` also supports markdown:")
    with st.echo():
        st.caption(
            "Make it *italic* or **bold** or add [a link](https://streamlit.io/)"
        )
    st.write("---")

    st.write("It's also great to add a caption to a plot:")
    with st.echo():
        st.line_chart([2, 4, 3])
        st.caption("Just an example plot")