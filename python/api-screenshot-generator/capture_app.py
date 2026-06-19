import datetime
import time

import altair as alt
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import streamlit as st

st.title("Capture app")
st.write(
    """
    This app is being used to take screenshots for elements in the API reference. It 
    is started by the `take_screenshots.py` script. See `README.md` for how this works. 
    """
)

# Text Elements
st.header("Text Elements")

with st.container(key="markdown"):
    st.markdown("""
        ## st.markdown
        
        This component supports *italics*, **bold text**, and ***both together***.
        
        ## Features include:
        * Bullet lists
        * [Links to websites](https://streamlit.io)
        * Code snippets with `inline code`
        
        ```python
        # Or code blocks with syntax highlighting
        def hello():
            return "Hello, Streamlit!"
        ```
    """)

with st.container(key="title"):
    st.title("This is a title")
    st.title("This is a title")
    st.title("This is a title")
    st.title("This is a title")

with st.container(key="header"):
    st.header("This is a header")
    st.header("This is a header")
    st.header("This is a header")
    st.header("This is a header")
    st.header("This is a header")

with st.container(key="subheader"):
    st.subheader("This is a subheader")
    st.subheader("This is a subheader")
    st.subheader("This is a subheader")
    st.subheader("This is a subheader")
    st.subheader("This is a subheader")
    st.subheader("This is a subheader")

with st.container(key="caption"):
    st.caption("This is a caption")
    st.caption("This is a caption")
    st.caption("This is a caption")
    st.caption("This is a caption")
    st.caption("This is a caption")
    st.caption("This is a caption")
    st.caption("This is a caption")

with st.container(key="code"):
    st.code("""def hello_world():
    # A simple greeting function
    return "Hello, Streamlit!"
    
def square(x):
    # Returns the square of a number
    return x * x""",
        language="python",
    )

with st.container(key="latex"):
    st.latex(r"e^{i\pi} + 1 = 0")
    st.latex(r"\int_{a}^{b} f(x) \, dx = F(b) - F(a)")
    st.latex(r"\quad \frac{d}{dx}[\sin(x)] = \cos(x)")

with st.container(key="text"):
    st.text("This is a text")
    st.text("This is a text")
    st.text("This is a text")
    st.text("This is a text")
    st.text("This is a text")
    st.text("This is a text")

with st.container(key="divider"):
    st.divider()

# Data Display Elements
st.header("Data Display Elements")

with st.container(key="dataframe"):
    df = pd.DataFrame(
        {
            "Name": ["Alice", "Bob", "Charlie"],
            "Age": [24, 32, 28],
            "City": ["New York", "Los Angeles", "Chicago"],
        }
    )
    st.dataframe(df, use_container_width=False)


# Hide the toolbar for the data editor; this is important because we click on it
# for the screenshot
st.markdown(
    "<style>.stDataFrame .stElementToolbar {display: none;}</style>", 
    unsafe_allow_html=True
)
with st.container(key="data_editor"):
    df_edit = pd.DataFrame({"Name": ["Alice", "Bob", "Charlie"], "Age": [24, 32, 28]})
    st.data_editor(df_edit, use_container_width=False)

with st.container(key="column_config"):
    df = pd.DataFrame(
        {
            "Name": ["Alice", "Bob", "Charlie"],
            "Age": [24, 32, 28],
            "Rating": [4.5, 3.8, 4.9],
        }
    )
    st.dataframe(
        df,
        column_config={
            "Name": "Full Name",
            "Rating": st.column_config.ProgressColumn(
                "Rating", min_value=0, max_value=5
            ),
        },
        use_container_width=False,
    )

with st.container(key="table"):
    st.table(df.head(3))

with st.container(key="metric"):
    st.metric(label="Temperature", value="70 °F", delta="1.2 °F")

with st.container(key="json"):
    st.json(
        {
            "name": "John",
            "age": 30,
            "city": "New York",
            "skills": ["Python", "SQL", "Streamlit"],
        }
    )

# Chart Elements
st.header("Chart Elements")

with st.container(key="area_chart"):
    np.random.seed(42)
    chart_data = pd.DataFrame(
        np.random.randn(20, 3).cumsum(axis=0), columns=["A", "B", "C"]
    )
    st.area_chart(chart_data)

with st.container(key="bar_chart"):
    data = pd.DataFrame({"Category": ["A", "B", "C", "D"], "Values": [10, 25, 15, 30]})
    st.bar_chart(data, x="Category", y="Values")

with st.container(key="line_chart"):
    np.random.seed(42)
    chart_data = pd.DataFrame(
        np.random.randn(20, 3).cumsum(axis=0), columns=["X", "Y", "Z"]
    )
    st.line_chart(chart_data)

with st.container(key="scatter_chart"):
    np.random.seed(42)
    scatter_data = pd.DataFrame(np.random.randn(50, 3), columns=["X", "Y", "Size"])
    st.scatter_chart(scatter_data, x="X", y="Y", size="Size")

with st.container(key="map"):
    np.random.seed(42)
    map_data = pd.DataFrame(
        np.random.randn(1000, 2) / [50, 50] + [37.76, -122.4], columns=["lat", "lon"]
    )
    st.map(map_data, height=250)

with st.container(key="pyplot"):
    np.random.seed(42)
    fig, ax = plt.subplots()
    x = np.linspace(0, 10, 100)
    ax.plot(x, np.sin(x))
    ax.set_title("Sine Wave")
    st.pyplot(fig)

with st.container(key="altair_chart"):
    # Create a more interesting dataset with multiple series
    x = list(range(10))
    source = pd.DataFrame(
        {
            "x": x * 3,
            "y": [i**2 for i in x] + [i**1.5 for i in x] + [i**0.8 * 15 for i in x],
            "category": ["Quadratic"] * 10 + ["Root"] * 10 + ["Linear-ish"] * 10,
        }
    )

    # Create a colorful and interactive chart with multiple elements
    chart = (
        alt.Chart(source)
        .mark_circle(size=100, opacity=0.7)
        .encode(
            x=alt.X("x", title="X Axis", scale=alt.Scale(domain=[0, 9])),
            y=alt.Y("y", title="Y Axis"),
            color=alt.Color(
                "category:N",
                scale=alt.Scale(range=["#FF5733", "#33FF57", "#3357FF"]),
                legend=alt.Legend(title="Function Type"),
            ),
            tooltip=["x", "y", "category"],
            size=alt.Size("y", legend=None, scale=alt.Scale(range=[100, 500])),
        )
        .properties(title="Beautiful Mathematical Relationships")
    )

    # Add connecting lines between points of the same category
    lines = (
        alt.Chart(source)
        .mark_line(opacity=0.6, strokeWidth=3)
        .encode(x="x", y="y", color="category:N", strokeDash="category:N")
    )

    # Combine the visualizations
    final_chart = (chart + lines).interactive()

    st.altair_chart(final_chart, use_container_width=True)

with st.container(key="vega_lite_chart"):
    spec = {
        "mark": {"type": "bar"},
        "encoding": {
            "x": {"field": "a", "type": "ordinal"},
            "y": {"field": "b", "type": "quantitative"},
        },
        "data": {
            "values": [
                {"a": "A", "b": 28},
                {"a": "B", "b": 55},
                {"a": "C", "b": 43},
                {"a": "D", "b": 91},
            ]
        },
    }
    st.vega_lite_chart(spec, use_container_width=True)

with st.container(key="plotly_chart"):
    import plotly.express as px

    df = px.data.gapminder().query("continent=='Oceania'")
    fig = px.line(df, x="year", y="lifeExp", color="country")
    st.plotly_chart(fig, use_container_width=True)

with st.container(key="bokeh_chart"):
    from bokeh.plotting import figure

    p = figure(
        title="Bokeh Chart Example",
        x_axis_label="X-Axis",
        y_axis_label="Y-Axis",
        height=250,
    )

    # Add a line renderer
    x = np.linspace(0, 10, 100)
    y = np.sin(x) * np.cos(x)
    p.line(x, y, legend_label="sin(x) * cos(x)", line_width=2, line_color="navy")
    p.circle(x, y, fill_color="white", size=8)

    st.bokeh_chart(p, use_container_width=True)

with st.container(key="pydeck_chart"):
    import pydeck as pdk

    # Sample data for a scatter plot of points
    # Create a more interesting dataset with San Francisco landmarks
    data = pd.DataFrame({
        "name": ["Golden Gate Bridge", "Fisherman's Wharf", "Alcatraz Island", "Lombard Street", "Painted Ladies"],
        "lat": [37.8199, 37.8080, 37.8270, 37.8021, 37.7762],
        "lon": [-122.4783, -122.4177, -122.4230, -122.4187, -122.4328],
        "visitors": [10000000, 8000000, 1500000, 2000000, 3500000],
        "category": ["Landmark", "Tourist", "Historic", "Street", "Architecture"]
    })
    
    # Color mapping based on category
    color_map = {
        "Landmark": [255, 0, 0],      # Red
        "Tourist": [255, 165, 0],     # Orange
        "Historic": [0, 0, 255],      # Blue
        "Street": [0, 128, 0],        # Green
        "Architecture": [128, 0, 128] # Purple
    }
    
    # Create a column with color values
    data["color"] = data["category"].apply(lambda x: color_map[x])
    
    # Create source and target pairs for arcs
    # Connect each point to the center of San Francisco
    sf_center = {"lat": 37.7749, "lon": -122.4194}
    
    # Create arc data - connecting each landmark to the center
    arc_data = []
    for _, row in data.iterrows():
        arc_data.append({
            "from_lat": sf_center["lat"],
            "from_lon": sf_center["lon"],
            "to_lat": row["lat"],
            "to_lon": row["lon"],
            "color": row["color"],
            "name": row["name"],
            "category": row["category"],
            "visitors": row["visitors"]
        })
    
    arc_data = pd.DataFrame(arc_data)
    
    # Create an arc layer
    arc_layer = pdk.Layer(
        "ArcLayer",
        data=arc_data,
        get_source_position=["from_lon", "from_lat"],
        get_target_position=["to_lon", "to_lat"],
        get_width=3,
        get_source_color=[64, 64, 64],
        get_target_color="color",
        pickable=True,
        auto_highlight=True,
    )
    
    # Point layer for landmarks
    point_layer = pdk.Layer(
        "ScatterplotLayer",
        data=data,
        get_position=["lon", "lat"],
        get_radius=250,
        get_fill_color="color",
        pickable=True,
    )
    
    # Text layer for landmark names
    text_layer = pdk.Layer(
        "TextLayer",
        data=data,
        get_position=["lon", "lat"],
        get_text="name",
        get_size=16,
        get_color=[0, 0, 0],
        get_text_anchor="middle",
        get_alignment_baseline="center",
    )
    
    # Set view state with increased zoom and adjusted bearing
    view_state = pdk.ViewState(
        latitude=37.8049,
        longitude=-122.4294,
        zoom=11,
        pitch=45,
        bearing=60,
    )
    
    # Render the deck
    deck = pdk.Deck(
        layers=[arc_layer, point_layer, text_layer],
        initial_view_state=view_state,
        tooltip={
            "html": "<b>{name}</b><br/>{category}<br/>{visitors:,} annual visitors",
            "style": {
                "backgroundColor": "#fff",
                "color": "#333"
            }
        },
        map_style="mapbox://styles/mapbox/light-v10",
    )
    
    st.pydeck_chart(deck, height=250)

with st.container(key="graphviz_chart"):
    import graphviz

    # Create a graphviz graph
    graph = graphviz.Digraph()
    graph.edge("A", "B")
    graph.edge("B", "C")
    graph.edge("C", "D")
    graph.edge("D", "A")

    st.graphviz_chart(graph)


# Input Elements
st.header("Input Elements")

with st.container(key="button"):
    st.button("Click me")

with st.container(key="download_button"):
    st.download_button(
        label="Download file",
        data="A,B,C\n1,2,3",
        file_name="data.csv",
        mime="text/csv",
    )

with st.container(key="form_submit_button"):
    with st.form("my_form"):
        st.text_input("Enter text")
        st.form_submit_button("Submit")

with st.container(key="link_button"):
    st.link_button("Go to gallery", "https://streamlit.io")

with st.container(key="page_link"):
    st.page_link("https://streamlit.io", label="Home", icon="🏠")
    st.page_link("https://docs.streamlit.io", label="Page 1", icon="📄")

with st.container(key="checkbox"):
    st.checkbox("Rebuild model each time", True)

with st.container(key="color_picker"):
    st.color_picker("Pick a color", "#5083e8")
    for _ in range(20):
        st.write("")

with st.container(key="feedback"):
    st.feedback("faces")
    st.feedback("stars")
    st.feedback("thumbs")

with st.container(key="multiselect"):
    st.multiselect(
        "Visible in image",
        ["Milk", "Bananas", "Apples", "Potatoes"],
        default=["Milk", "Bananas"],
    )
    # Leave some space for the dropdown to appear
    for _ in range(10):
        st.write("")

with st.container(key="pills"):
    selected = st.pills("Tags", ["Sports", "AI", "Politics"], default=["AI"])

with st.container(key="radio"):
    st.radio("Classify image", ["Dog", "Cat", "Goldfish"])

with st.container(key="segmented_control"):
    st.segmented_control("Filter", ["Open", "Closed", "All"], default="All")

with st.container(key="selectbox"):
    st.selectbox("Pick one", ["Cats", "Dogs"], index=0)
    # Leave some space for the dropdown to appear
    for _ in range(10):
        st.write("")

with st.container(key="select_slider"):
    st.select_slider(
        "Rate", options=["Poor", "Average", "Good", "Excellent"], value="Good"
    )

with st.container(key="toggle"):
    st.toggle("Activate", True)

with st.container(key="number_input"):
    st.number_input("Number of days", min_value=0, max_value=100, value=28)

with st.container(key="slider"):
    st.slider("Pick a number", 0, 100, 42)

with st.container(key="date_input"):
    st.date_input("Initial date", "2019-07-06")
    # Leave some space for the dropdown to appear
    for _ in range(25):
        st.write("")

with st.container(key="time_input"):
    st.time_input("Set an alarm for", datetime.time(8, 45))

with st.container(key="chat_input"):
    st.chat_input("How can I help?", accept_file=True)

with st.container(key="text_area"):
    st.text_area(
        "Text to analzye",
        "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief.",
    )

with st.container(key="text_input"):
    st.text_input("Movie title", "Life of Brian")

with st.container(key="audio_input"):
    st.audio_input("Record a voice message")

with st.container(key="file_uploader"):
    st.file_uploader("Choose a CSV file")

# Media Elements
st.header("Media Elements")

with st.container(key="image"):
    st.image(
        "https://images.unsplash.com/photo-1548407260-da850faa41e3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1487&q=80",
        caption="Sunrise by the mountains",
    )

with st.container(key="audio"):
    st.audio(
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", start_time=200
    )

with st.container(key="video"):
    st.video("https://static.streamlit.io/examples/star.mp4", start_time=2)

# Chat Elements
st.header("Chat Elements")

with st.container(key="chat_message"):
    st.chat_message("user").write("Hello, how can I help you?")
    st.chat_message("assistant").write("I'm here to assist with your questions!")

with st.container(key="status"):
    with st.status("Downloading data...", expanded=True) as status:
        st.write("Searching for data...")
        st.write("Found URL.")
        st.write("Downloading data...")
    status.update(label="Download complete!", state="complete")

# Status Elements
st.header("Status Elements")

with st.container(key="progress"):
    st.progress(0.4, "Initializing...")
    st.progress(0.7, "Downloading...")
    st.progress(1.0, "Complete!")

show_spinner = st.button("Show spinner", key="show_spinner")
with st.container(key="spinner"):
    if show_spinner:
        with st.spinner("Please wait..."):
            time.sleep(20)

with st.container(key="success"):
    st.success("Data processing completed successfully! You can now proceed.", icon=":material/check_circle:")

with st.container(key="info"):
    st.info("This visualization uses data from the last 30 days and all categories.", icon=":material/info:")

with st.container(key="warning"):
    st.warning("This action will permanently delete your data. Proceed with caution.", icon=":material/warning:")

with st.container(key="error"):
    st.error("Unable to connect to database. Please check your credentials.", icon=":material/cancel:")

with st.container(key="exception"):
    try:
        1 / 0
    except Exception as e:
        st.exception(e)
