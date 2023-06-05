import streamlit as st


def create_avatar(contributor):
    return f"""
    <a href="https://www.github.com/{contributor}" title="{contributor}" target="_blank">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="50" height="50">
              <clipPath id="clipCircle-{contributor}">
                <circle r="25" cx="25" cy="25"/>
              </clipPath>
              <image
                xlink:href="https://avatars.githubusercontent.com/{contributor}"
                width="50" height="50"
                clip-path="url(#clipCircle-{contributor})"
            />
          </svg>
      </a>
    """

def generate_contributors(contributors):
    avatar_badge = ""
    for contributor in contributors:
        avatar_badge += create_avatar(contributor)

    st.markdown(avatar_badge, unsafe_allow_html=True)

def create_static_notes(contributors, previous_version, current_version):
    st.write(f"""
        ### Release Details

        - If you'd like to know what _exactly_ went into this release, check out the [commit
        diff](https://github.com/streamlit/streamlit/compare/{previous_version}...{st.__version__}).
        - If you're curious, please see the source code in [Github](https://github.com/streamlit/release-demos/tree/{current_version}/{current_version}).

    """)

    if len(contributors):
        st.write("### Thanks for Contributing")
        generate_contributors(contributors)
        st.write(" ")

    st.write(f"""
        As always, thank you to [all our contributors](https://github.com/streamlit/streamlit/graphs/contributors) who help make Streamlit awesome!

        ---

        ### Connect With Us

        - We can be found at https://streamlit.io and https://twitter.com/streamlit
        - Come by
        [the forums](https://discuss.streamlit.io/c/official-announcements/6) if you'd like to ask questions,
        post awesome apps, or just say hi!
    """)
