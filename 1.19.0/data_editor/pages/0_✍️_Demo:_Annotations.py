import pandas as pd
import streamlit as st

st.set_page_config(layout="centered", page_title="Data Editor", page_icon="🧮")

st.title("✍️ Annotations")
st.caption("This is a demo of the `st.experimental_data_editor`.")

st.write("")

"""The new data editor makes it so easy to annotate data! Can you help us annotate sentiments for tweets about our latest release?"""

data = [
    {
        "tweet": "What a great new feature! I love it!",
        "author": "John Rose",
        "sentiment": "🤩 Positive",
    },
    {
        "tweet": "I don't like this feature. It's not useful. I prefer chart improvements.",
        "author": "Will Hangu",
        "sentiment": "",
    },
    {
        "tweet": "Wow, the Streamlit team can be proud! What an achievement!",
        "author": "Luca Masucco",
        "sentiment": "",
    },
    {
        "tweet": "The recent ChatGPT breakthrough is really exciting.",
        "author": "Adrien Tree",
        "sentiment": "",
    },
]

df = pd.DataFrame(data)
df.sentiment = df.sentiment.astype("category")
df.sentiment = df.sentiment.cat.add_categories(("☯ Neutral", "😤 Negative"))


annotated = st.experimental_data_editor(df)

st.download_button(
    "⬇️ Download annotations as .csv", annotated.to_csv(), "annotated.csv", use_container_width=True
)
