import streamlit as st

def query_params():
    st.write("""
    # Introducing Query Params

    We have added to our experimental namespace the ability to get and set
    query parameters. With these query params, you can bookmark or share your app
    in various states. Thanks [@zhaoooyue](https://github.com/zhaoooyue) for the
    contribution!
    """)
    with st.echo("below"):
        radio_list = ['Eat', 'Sleep', 'Both']
        query_params = st.experimental_get_query_params()

        # Query parameters are returned as a list to support multiselect.
        # Get the first item in the list if the query parameter exists.
        default = int(query_params["activity"][0]) if "activity" in query_params else 0
        activity = st.radio(
            "What are you doing at home during quarantine?",
            radio_list,
            index = default
        )
        if activity:
            st.experimental_set_query_params(activity=radio_list.index(activity))
