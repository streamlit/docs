FROM python:alpine

RUN apk update && \ 
    apk upgrade && \
    apk add --upgrade build-base openssl-dev libffi-dev libxml2-dev libxslt-dev python3-dev git zeromq-dev jpeg-dev && \
    rm -rf /var/cache/apk/*

RUN pip install streamlit
RUN pip install docstring_parser

RUN mkdir -p /docs
COPY funcs.py /docs

WORKDIR /docs

RUN funcs.py