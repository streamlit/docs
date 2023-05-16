import streamlit as st
import pandas as pd


def show():

    st.subheader('Download a string as a Text File')
    st.write('With a single command, you can now create a button which downloads data of the form: strings, bytes or file pointers')
    with st.echo():
        st.download_button(
            label="DOWNLOAD!",
            data="trees",
            file_name="string.txt",
            mime="text/plain"
        )
    st.markdown('---')

    st.subheader('Download binary data as a file')

    with st.echo():
        binary_contents = b'whatever'

        # Defaults to the mimetype 'application/octet-stream'
        st.download_button('Download binary file', binary_contents)

    st.write('👉 Note: If a output file_name is missing, Streamlit creates an output file name for you')
    st.markdown('---')

    st.subheader('Download as a CSV file')
    with st.echo():
        text_contents = '''
        Foo, Bar
        123, 456
        789, 000
        '''
        st.download_button('Download CSV', text_contents, 'aaa.csv', 'text/csv')

    st.markdown('---')

    st.subheader('Download from a File Pointer')

    with st.echo():
        with open("0.88/blue-jay.jpg", "rb") as fp:
            btn = st.download_button(
                label="Download IMAGE",
                data=fp,
                file_name="blue-jay1.jpg",
                mime="image/jpeg"
            )
    st.markdown('''Photo by [Kyle Van Alstyne](https://unsplash.com/@kva_images?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) 
    on [Unsplash](https://unsplash.com/s/photos/bird?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
    ''')
    st.markdown('---')

    st.subheader('Callbacks w/ Download Button')

    with st.echo():
        def callback():
            st.balloons()

        text_contents = '''
        Foo, Bar
        123, 456
        789, 000
        '''

        st.download_button(
            "Press to Download",
            text_contents,
            "my_csv_file.csv",
            "text/csv",
            on_click=callback,
            key='callback'
        )

    st.markdown('---')

    st.subheader('Download a dataframe converted to a CSV')

    with st.echo():
        df = pd.read_csv("0.88/browser_data.csv")

        @st.cache
        def convert_df(df):
            return df.to_csv().encode('utf-8')


        csv = convert_df(df)

        st.download_button(
            "Press to Download",
            csv,
            "browser_visits.csv",
            "text/csv",
            key='browser-data'
        )

    st.markdown('---')

