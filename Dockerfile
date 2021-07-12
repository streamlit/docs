FROM python:alpine

RUN apk update && \ 
    apk upgrade && \
    apk add --upgrade build-base openssl-dev libffi-dev libxml2-dev libxslt-dev python3-dev git && \
    rm -rf /var/cache/apk/*

RUN mkdir -p /docs
COPY funcs.py /docs

RUN git clone https://github.com/streamlit/streamlit.git /docs/streamlit