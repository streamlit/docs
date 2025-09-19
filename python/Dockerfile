FROM python:3.9-slim

COPY sources.list /etc/apt/sources.list

RUN apt-get update
RUN pip install docstring_parser
RUN pip install docutils
RUN pip install lxml
RUN pip install requests
RUN pip install numpydoc
RUN pip install protobuf==3.20.1
RUN pip install uv

RUN mkdir -p /docs
COPY build.py /docs
COPY generate.py /docs

WORKDIR /docs
