mkdir -p ~/.streamlit/
echo "\
[general]\n\
email = \"karrie@streamlit.io\"\n\
" > ~/.streamlit/credentials.toml
echo "\
[server]\n\
headless = true\n\
enableCORS=false\n\
port = $PORT\n\

[logger]\n\
level='debug'\n\

[deprecation]\n\
showfileUploaderEncoding=false\n\
" > ~/.streamlit/config.toml
