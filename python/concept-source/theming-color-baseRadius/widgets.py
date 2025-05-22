import streamlit as st

st.header("Widgets")
tabs = st.tabs(["Buttons", "Selections", "Numeric", "Text", "Media"])
with tabs[0]:
    cols = st.columns(3)
    cols[0].button("Primary button", type="primary")
    cols[1].button("Secondary button", type="secondary")
    cols[2].button("Tertiary button", type="tertiary")
    with st.form(key="button_form"):
        st.subheader("Form")
        st.text_input("Text input")
        st.form_submit_button("Submit button")
    st.link_button("Link button", url="https://streamlit.io", icon=":material/open_in_new:")
    st.page_link("widgets.py", label="Page link (this page)", icon=":material/my_location:")
    st.page_link("text.py", label="Page link (next page)", icon=":material/skip_next:")

with tabs[1]:
    cols = st.columns(2)
    with cols[0]:
        st.checkbox("Checkbox")
        st.selectbox("Selectbox", options=["A", "B", "C"])
        st.pills("Pills", options=["A", "B", "C"])
        st.select_slider("Select slider", options=["A", "B", "C"])

    with cols[1]:
        st.toggle("Toggle")
        st.radio("Radio", options=["A", "B", "C"], horizontal=True)
        st.segmented_control("Segmented control", options=["A", "B", "C"])
        st.caption("Feedback")
        st.feedback("faces")

    st.multiselect("Multiselect", options=["A", "B", "C"])
    
with tabs[2]:
    st.number_input("Number input")
    st.slider("Slider")
    st.date_input("Date input")
    st.time_input("Time input")

with tabs[3]:
    cols = st.columns(2)
    cols[0].text_input("Text input")
    cols[1].html("<div style='height:.75em'>&nbsp;</div>")
    cols[1].chat_input("Type something")

    st.text_area("Text area")

with tabs[4]:
    st.file_uploader("File input")
    st.audio_input("Audio input")
    st.camera_input("Camera input")