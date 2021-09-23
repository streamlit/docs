---
title: ImportError libGL.so.1 cannot open shared object file No such file or directory
slug: /knowledge-base/dependencies/libgl
---

# ImportError libGL.so.1 cannot open shared object file No such file or directory

## Problem

You receive the error `ImportError libGL.so.1 cannot open shared object file No such file or directory` when using OpenCV in your app deployed on [Streamlit Cloud](https://streamlit.io/cloud).

## Solution

Include `opencv-python-headless` in your requirements file on Streamlit Cloud in place of `opencv_contrib_python` and `opencv-python`.