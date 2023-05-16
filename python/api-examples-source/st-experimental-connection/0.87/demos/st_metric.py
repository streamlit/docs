import streamlit as st
import pandas as pd
import altair as alt


@st.cache
def load_dataset(file_name):
    return pd.read_csv(file_name)


def show():
    st.image(
        "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/285/slot-machine_1f3b0.png",
        width=100,
    )
    st.write(
        """
        # Try out `st.metric`!

        Display KPIs or important metrics in big bold font in your app
        ---
        """
    )

    st.subheader('API')
    st.write("Here's an example which shows the API and `st.metric` in action")
    with st.echo():
        st.metric(label="Streamlit version", value=0.87, delta=0.01)

    st.write("---")
    st.subheader("Use in columns")
    st.write("`st.metric` looks especially nice in combination with `st.columns`. Let's look at some financial data")

    with st.echo():
        col1, col2, col3 = st.columns(3)
        col1.metric("SPDR S&P 500", "$437.8", "-$1.25")
        col2.metric("FTEC", "$121.10", "0.46%")
        col3.metric("BTC", "$46,583.91", "+4.87%")

    st.write("---")

    st.write("Let's look at some data from the Iris Dataset")
    iris = load_dataset('0.87/iris.csv')

    avg_sepal_length = iris['sepallength'].mean()
    avg_sepal_width = iris['sepalwidth'].mean()

    with st.echo():
        col1, col2 = st.columns(2)
        col1.metric(label="Average Sepal Length", value="%.2f" % avg_sepal_length)
        col2.metric(label="Average Sepal Width", value="%.2f" % avg_sepal_width)

    hist = alt.Chart(iris).mark_bar().encode(
        x=alt.X('sepallength'),
        y=alt.Y('count()', title=None), color='Species'
    ).properties(
        title='Iris Sepal Length',
    ).configure_legend(
        orient='bottom'
    )

    col1.altair_chart(hist, use_container_width=True)

    hist = alt.Chart(iris).mark_bar().encode(
        x=alt.X('sepalwidth'),
        y=alt.Y('count()', title=None), color='Species'
    ).properties(
        title='Iris Sepal Width',
    ).configure_legend(
        orient='bottom'
    )

    col2.altair_chart(hist, use_container_width=True)

    st.write("---")

    st.write('''Sometimes, an increase in a metric can mean a bad thing. 
    And a decrease in a metric can be good. Simply use `delta_color="inverse"` to invert colors for ⬆️ and ⬇️''')
    with st.echo():
        col1, col2, col3 = st.columns(3)
        col1.metric("Average Query Latency", "1.99ms", "0.25ms", delta_color="inverse")
        col2.metric("Median Script Execution Time", "0.55ms", "-0.15", delta_color="inverse")

    st.write("---")
    st.write("Want to use `st.metric`? Have a look in our [docs](https://docs.streamlit.io/en/stable/api.html?highlight=metric#streamlit.metric) for the full API details!")


if __name__ == "__main__":
    show()
