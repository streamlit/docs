import random
import time
import streamlit as st

apps = [
    (
        "Analyzing Your Goodreads Reading Habits",
        "Tyler Richards",
        "https://share.streamlit.io/tylerjrichards/streamlit_goodreads_app/books.py",
    ),
    (
        "Bayesian Deep Learning for Galaxy Zoo DECaLS",
        "Mike Walmsley",
        "https://share.streamlit.io/mwalmsley/galaxy-poster/gz_decals_mike_walmsley.py",
    ),
    (
        "Gravitational Wave Quickview",
        "Jonah Kanner",
        "https://share.streamlit.io/jkanner/streamlit-dataview/master/app.py/+/",
    ),
    (
        "Streamlit Cheat Sheet",
        "Daniel Lewis",
        "https://share.streamlit.io/daniellewisdl/streamlit-cheat-sheet/app.py",
    ),
    (
        "Traingenerator",
        "Johannes Rieke",
        "https://share.streamlit.io/jrieke/traingenerator/s4a/app/main.py",
    ),
]

components = [
    ("3dmol", "José Manuel Nápoles", "https://github.com/napoles-uach/streamlit_3dmol"),
    ("Ace", "Okld", "https://share.streamlit.io/okld/streamlit-ace/demo/"),
    (
        "AgGrid",
        "Pablo Fonseca",
        "https://share.streamlit.io/pablocfonseca/streamlit-aggrid/main/examples/example.py",
    ),
    (
        "Agraph",
        "Christian Klose",
        "https://share.streamlit.io/chrischross/inspirationals/main/main.py",
    ),
    ("Annotated Text", "Thiago Teixeira", "https://github.com/tvst/st-annotated-text"),
    (
        "Bokeh Events",
        "Ashish Shukla",
        "https://github.com/ash2shukla/streamlit-bokeh-events",
    ),
    (
        "Cropper",
        "Turner Anderson",
        "https://github.com/turner-anderson/streamlit-cropper",
    ),
    (
        "D3 Demo",
        "Fanilo Andrianasolo",
        "https://github.com/andfanilo/streamlit-d3-demo",
    ),
    (
        "Discourse",
        "Okld",
        "https://share.streamlit.io/okld/streamlit-discourse-demo/main/app.py",
    ),
    (
        "Disqus",
        "Okld",
        "https://share.streamlit.io/okld/streamlit-disqus-demo/main/app.py",
    ),
    (
        "Drawable Canvas",
        "Fanilo Andrianasolo",
        "https://share.streamlit.io/andfanilo/streamlit-drawable-canvas-demo/master/app.py",
    ),
    (
        "Echarts",
        "Fanilo Andrianasolo",
        "https://share.streamlit.io/andfanilo/streamlit-echarts-demo/master/app.py",
    ),
    (
        "Embedcode",
        "Randy Zwitch",
        "https://share.streamlit.io/randyzwitch/streamlit-embedcode/examples/streamlit_app.py",
    ),
    (
        "Folium",
        "Randy Zwitch",
        "https://share.streamlit.io/randyzwitch/streamlit-folium/examples/streamlit_app.py",
    ),
    ("HiPlot", "Facebook Research", "https://github.com/facebookresearch/hiplot"),
    ("Jina", "Jina", "https://github.com/jina-ai/streamlit-jina"),
    (
        "Lottie",
        "Fanilo Andrianasolo",
        "https://share.streamlit.io/andfanilo/streamlit-lottie-demo/master/app.py",
    ),
    (
        "Observable",
        "Alex Garcia",
        "https://streamlit-observable.herokuapp.com/?section=Introduction",
    ),
    ("Pandas Profiling", "Okld", "https://github.com/okld/streamlit-pandas-profiling"),
    (
        "Player",
        "Okld",
        "https://share.streamlit.io/okld/streamlit-player-demo/main/app.py",
    ),
    (
        "spaCy",
        "Explosion",
        "https://share.streamlit.io/ines/spacy-streamlit-demo/master/app.py",
    ),
    (
        "Terran Timelines",
        "Pento Group",
        "https://github.com/pento-group/streamlit-terran-timeline/",
    ),
    ("Vega-Lite", "Dominik Moritz", "https://github.com/domoritz/streamlit-vega-lite"),
    (
        "WebRTC",
        "Yuichiro Tachibana",
        "https://share.streamlit.io/whitphx/streamlit-webrtc-example/main/app.py",
    ),
]


def forms_demo():
    st.image(
        "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/271/crystal-ball_1f52e.png",
        width=100,
    )

    st.write(
        """
        # Try out `st.form`!

        We built a super-secret algorithm to recommend a Streamlit app or component based on your personality. The problem: It takes a long time to run. That's why we use a form to bundle all the input widgets 👇
        """
    )

    st.write("")

    with st.form(key="recommender"):
        st.write("Click **Submit** to get your recommendation!")
        st.selectbox(
            "Your favorite streamlit call",
            ["st.form", "st.balloons 🎈 ", "st.form_submit_button", "st.write"],
        )
        st.text_input("Your favorite thing to build streamlit apps for")
        st.slider("How excited you are about forms", 0, 11, 10)
        submitted = st.form_submit_button()

    st.write("")

    if submitted:
        with st.spinner("🤓 Crunching numbers..."):
            time.sleep(2)
        use_component = random.choice([True, False])
        if use_component:
            desc = "a component"
            name, author, url = random.choice(components)
        else:
            desc = "an app"
            name, author, url = random.choice(apps)
        st.success(
            f"☘️ The algorithm recommended {desc} to you: **[{name}]({url}) by {author}** (find more cool apps & components in [our gallery](https://streamlit.io/gallery)!)"
        )

        st.info(
            "💡 With `st.form`, this app (and our complex algorithm!) only reruns when you hit the submit button, not at each widget interaction. [Check out the blog post to learn how it works!](https://blog.streamlit.io/introducing-submit-button-and-forms/)"
        )
