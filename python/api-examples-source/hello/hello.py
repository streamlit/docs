import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt
from datetime import datetime

# ====== PAGE SETTINGS ======
st.set_page_config(
    page_title="MindGuard AI",
    page_icon="🧠",
    layout="centered"
)

# ====== CUSTOM UI ======
st.markdown("""
<style>

.stApp {
    background: linear-gradient(to bottom, #0f172a, #1e293b);
    color: white;
}

h1 {
    color: #38bdf8;
    text-align: center;
    font-size: 50px;
}

h2, h3 {
    color: white;
}

.stButton>button {
    background-color: #38bdf8;
    color: black;
    border-radius: 12px;
    height: 50px;
    width: 100%;
    font-size: 18px;
    font-weight: bold;
}

div.stSlider {
    padding-top: 20px;
    padding-bottom: 20px;
}

</style>
""", unsafe_allow_html=True)

# ====== TITLE ======
st.title("🧠 MindGuard AI")
st.subheader("Early Mental Health Monitoring System")

# ====== SESSION STORAGE ======
if "data" not in st.session_state:
    st.session_state.data = pd.DataFrame(columns=["date", "mood"])

# ====== MOOD INPUT ======
st.markdown("## 🎯 Daily Mood Check")

mood = st.slider(
    "How do you feel today? (1 = worst, 5 = best)",
    1,
    5
)

# ====== SAVE BUTTON ======
if st.button("Save Mood"):

    new_data = pd.DataFrame({
        "date": [datetime.now()],
        "mood": [mood]
    })

    st.session_state.data = pd.concat(
        [st.session_state.data, new_data],
        ignore_index=True
    )

    st.success("✅ Mood saved successfully!")

    # ====== MOOD RESPONSES ======

    if mood == 1:

        st.error("""
⚠️ Very low mood detected.

Please avoid isolating yourself.
Try speaking with someone you trust or seeking professional support.

Remember:
bad days do not last forever.
""")

    elif mood == 2:

        st.warning("""
😔 Low emotional state detected.

Try:
• Taking a break
• Listening to calming sounds
• Avoiding pressure
• Going outside for fresh air
""")

    elif mood == 3:

        st.info("""
🙂 Neutral emotional state.

Maintain healthy routines and rest properly.
""")

    elif mood == 4:

        st.success("""
😊 Positive emotional state detected.

Keep maintaining:
• Healthy habits
• Social connection
• Balanced routines
""")

    elif mood == 5:

        st.balloons()

        st.success("""
🔥 Excellent emotional condition detected!

Keep the momentum going!
""")

# ====== CHART ======
if not st.session_state.data.empty:

    df = st.session_state.data

    st.markdown("## 📊 Mood History")

    fig, ax = plt.subplots(figsize=(8, 4))

    ax.plot(
        df["date"],
        df["mood"],
        marker="o",
        linewidth=3
    )

    ax.set_xlabel("Time")
    ax.set_ylabel("Mood Level")

    st.pyplot(fig)

    # ====== AVERAGE ======
    average_mood = round(df["mood"].mean(), 2)

    st.markdown(f"## 📌 Average Mood: {average_mood}")

    # ====== EXTRA INSIGHT ======
    if average_mood <= 2:
        st.error("⚠️ Emotional trend is concerning over time.")

    elif average_mood >= 4:
        st.success("🌟 Emotional trend is very positive.")

    else:
        st.info("📈 Emotional trend is generally stable.")
