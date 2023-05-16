import streamlit as st


def theming_demo():
    st.image(
        "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/279/woman-artist_1f469-200d-1f3a8.png",
        width=100,
    )

    st.write(
        """
        # Theming improvements

        We made several improvements to [Theming](https://blog.streamlit.io/introducing-theming/). 
        The most important one: The theme in `.streamlit/config.toml` can now inherit 
        from a base theme. This allows you to easily change a single color, without 
        defining the entire theme:
        """
    )

    st.code(
        """
[theme]
base = "light"
primaryColor = "purple"
        """,
    )

    st.write("Also, this finally enables you to set dark mode for all viewers: 🌚")
    st.code(
        """
[theme]
base = "dark"
    """,
    )
