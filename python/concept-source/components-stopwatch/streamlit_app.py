import streamlit as st
from stopwatch_component import stopwatch

st.title("Stopwatch with Laps")
st.caption("Combining state values (time, running) with trigger values (lap, reset)")

# Track laps in Python
if "laps" not in st.session_state:
    st.session_state.laps = []

# Render the component
result = stopwatch(
    key="stopwatch",
    on_lap_change=lambda: None,
    on_reset_change=lambda: None,
    on_running_change=lambda: None,
    on_elapsed_change=lambda: None,
    on_laps_change=lambda: None,
    default={"elapsed": 0, "running": False, "laps": []},
)

# Display state info
col1, col2 = st.columns(2)
with col1:
    st.metric("Status", "Running" if result.running else "Paused")
    elapsed_sec = (result.elapsed or 0) / 1000
    st.metric("Elapsed", f"{elapsed_sec:.1f}s")
with col2:
    st.subheader("Lap Records (Python)")
    for i, lap_ms in enumerate(result.laps[-5:]):
        mins, secs = divmod(lap_ms / 1000, 60)
        st.write(f"**Lap {i+1}**: {int(mins):02d}:{secs:05.2f}")