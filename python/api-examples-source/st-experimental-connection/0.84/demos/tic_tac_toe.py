import streamlit as st
import numpy as np


# From: https://stackoverflow.com/questions/39922967/python-determine-tic-tac-toe-winner
def checkRows(board):
    for row in board:
        if len(set(row)) == 1:
            return row[0]
    return None


def checkDiagonals(board):
    if len(set([board[i][i] for i in range(len(board))])) == 1:
        return board[0][0]
    if len(set([board[i][len(board) - i - 1] for i in range(len(board))])) == 1:
        return board[0][len(board) - 1]
    return None


def checkWin(board):
    # transposition to check rows, then columns
    for newBoard in [board, np.transpose(board)]:
        result = checkRows(newBoard)
        if result:
            return result
    return checkDiagonals(board)


def show():
    st.write(
        """
        ## 👾 Tic Tac Toe
        
        Let's play! This demo stores the entire game state (as a dict) in 
        `st.session_state` and uses the new callbacks to handle button clicks.
        """
    )
    st.write("")

    # Initialize state.
    if "board" not in st.session_state:
        st.session_state.board = np.full((3, 3), ".", dtype=str)
        st.session_state.next_player = "X"
        st.session_state.winner = None

    # Define callbacks to handle button clicks.
    def handle_click(i, j):
        if not st.session_state.winner:
            # TODO: Handle the case when nobody wins but the game is over!
            st.session_state.board[i, j] = st.session_state.next_player
            st.session_state.next_player = (
                "O" if st.session_state.next_player == "X" else "X"
            )
            winner = checkWin(st.session_state.board)
            if winner != ".":
                st.session_state.winner = winner

    # Show one button for each field.
    for i, row in enumerate(st.session_state.board):
        cols = st.beta_columns([0.1, 0.1, 0.1, 0.7])
        for j, field in enumerate(row):
            cols[j].button(
                field,
                key=f"{i}-{j}",
                on_click=handle_click,
                args=(i, j),
            )

    if st.session_state.winner:
        st.success(f"Congrats! {st.session_state.winner} won the game! 🎈")


if __name__ == "__main__":
    show()
