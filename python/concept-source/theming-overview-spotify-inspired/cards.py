import streamlit as st

def widgets_card():
    st.page_link("widgets.py", label="Widgets", icon=":material/widgets:")
    st.text_input("Text input")
    inner_cols = st.columns(2)
    inner_cols[0].pills("Pills", options=["A", "B", "C"], default="A")
    inner_cols[1].segmented_control("Segmented control", options=["A", "B", "C"], default="A")
    inner_cols = st.columns([79,97,55])
    inner_cols[0].button("Primary", type="primary")
    inner_cols[1].button("Secondary")
    inner_cols[2].button("Tertiary", type="tertiary")

def text_card():
    st.page_link("text.py", label="Text", icon=":material/article:")
    st.subheader("Subheader")
    st.markdown(r"Markdown: **bold** *italic* ~strikethrough~ [link](https://streamlit.io) `code` $\int_a^b f(x)$ 🐶 :cat: :material/home: :streamlit: <- -> <-> -- >= <= ~= ")
    inner_cols = st.columns(2, border=True)
    inner_cols[0].markdown("* :red[Red text]\n* :violet[Violet text]")
    # inner_cols[1].badge("Color badge", icon=":material/star:", color="primary")
    inner_cols[1].markdown(":rainbow-background[:rainbow[rainbow]]")

def dataframe_card():
    st.page_link("data.py", label="Data", icon=":material/table:")
    st.dataframe(st.session_state.chart_data, height=220)

def charts_card():
    st.page_link("charts.py", label="Charts", icon=":material/insert_chart:")
    st.bar_chart(st.session_state.chart_data, height=230)

def media_card():
    st.page_link("media.py", label="Media", icon=":material/image:")
    st.video("https://s3-us-west-2.amazonaws.com/assets.streamlit.io/videos/hero-video.mp4", autoplay=True)

def layouts_card():
    st.page_link("layouts.py", label="Layouts", icon=":material/dashboard:")
    a,b,c = st.tabs(["Tab A", "Tab B", "Tab C"])
    a.write("Tab A content")
    b.write("Tab B content")
    c.write("Tab C content")
    st.expander("Expander").write("Expander content")
    st.popover("Popover", icon=":material/info:").write("Popover content")

def chat_card():
    st.page_link("chat.py", label="Chat", icon=":material/chat:")
    st.chat_message("user").write("Hello, world!")
    st.chat_message("assistant").write("Hello, user!")
    st.chat_input("Type something")

def status_card():
    st.page_link("status.py", label="Status", icon=":material/error:")
    cols = st.columns(2)
    cols[0].error("Error")
    cols[0].warning("Warning")
    cols[1].info("Info")
    cols[1].success("Success")
    cols = st.columns(2)
    if cols[0].button("Toast!"):
        st.toast("Toast message", icon=":material/notifications:")
    if cols[1].button("Balloons!"):
        st.balloons()