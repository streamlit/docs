import streamlit as st

from . import counter
from . import tic_tac_toe
from . import todo_list
from . import labelling
from . import pagination


def show():
    st.image(
        "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/279/joystick_1f579-fe0f.png",
        width=100,
    )
    st.write(
        """
        # Try out Session State!

        One of the most highly requested Streamlit features is finally here! Session 
        state allows you to preserve information throughout a browser session. 
        Below are some ideas for how to use it. 
        
        More info in the [blog post](https://blog.streamlit.io/session-state-for-streamlit/).
        """
    )

    st.write("---")
    counter.show()
    st.caption(
        "[View code](https://github.com/streamlit/release-demos/blob/0.84/0.84/demos/counter.py)"
    )

    st.write("---")
    tic_tac_toe.show()
    st.caption(
        "[View code](https://github.com/streamlit/release-demos/blob/0.84/0.84/demos/tic_tac_toe.py)"
    )

    st.write("---")
    todo_list.show()
    st.caption(
        "[View code](https://github.com/streamlit/release-demos/blob/0.84/0.84/demos/todo_list.py)"
    )

    st.write("---")
    labelling.show()
    st.caption(
        "[View code](https://github.com/streamlit/release-demos/blob/0.84/0.84/demos/labelling.py) – Images from [Kaggle Dogs vs. Cats](https://www.kaggle.com/c/dogs-vs-cats/overview)"
    )

    st.write("---")
    pagination.show()
    st.caption(
        "[View code](https://github.com/streamlit/release-demos/blob/0.84/0.84/demos/pagination.py)"
    )


if __name__ == "__main__":
    show()
