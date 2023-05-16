import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_48367(use_container_width: bool):
    import altair as alt
    from vega_datasets import data
    
    source = data.iris()
    
    base = alt.Chart(source)
    
    xscale = alt.Scale(domain=(4.0, 8.0))
    yscale = alt.Scale(domain=(1.9, 4.55))
    
    bar_args = {'opacity': .3, 'binSpacing': 0}
    
    points = base.mark_circle().encode(
        alt.X('sepalLength', scale=xscale),
        alt.Y('sepalWidth', scale=yscale),
        color='species',
    )
    
    top_hist = base.mark_bar(**bar_args).encode(
        alt.X('sepalLength:Q',
              # when using bins, the axis scale is set through
              # the bin extent, so we do not specify the scale here
              # (which would be ignored anyway)
              bin=alt.Bin(maxbins=20, extent=xscale.domain),
              stack=None,
              title=''
             ),
        alt.Y('count()', stack=None, title=''),
        alt.Color('species:N'),
    ).properties(height=60)
    
    right_hist = base.mark_bar(**bar_args).encode(
        alt.Y('sepalWidth:Q',
              bin=alt.Bin(maxbins=20, extent=yscale.domain),
              stack=None,
              title='',
             ),
        alt.X('count()', stack=None, title=''),
        alt.Color('species:N'),
    ).properties(width=60)
    
    chart = top_hist & (points | right_hist)
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_48367))
    get_chart_48367(use_container_width=True)
except Exception as e:
    st.exception(e)

