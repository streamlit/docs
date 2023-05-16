import imageio
import numpy as np
import pandas as pd
import streamlit as st
from PIL import Image
from scipy import ndimage

st.set_page_config(layout="centered", page_title="Data Editor", page_icon="🧮")
st.title("🖼️ Convolutions")
st.caption(
    "This is a demo of the `st.experimental_data_editor`. Inspired from [this beautiful piece from"
    " Victor Powell](https://setosa.io/ev/image-kernels/)."
)

st.write(
    "Convolution is a mathematical operation that can be used to modify images. It is one of the"
    " tricks people use to make images look better (think Instagram filters) or to extract"
    " interesting features from images (think machine learning). "
)

st.write(
    "One key ingredient in applying convolutions is choosing the right _kernel_. Convoluting the"
    " original image with that kernel results in a new image: the convolved image. Go ahead and"
    " play with the kernel values, see the impact!"
)


@st.cache_data
def _load_image(image_path: str):
    return Image.fromarray(imageio.imread(image_path)[:, :, 0])


@st.cache_data
def _resize_image(image, basewidth: int):
    wpercent = basewidth / float(image.size[0])
    hsize = int((float(image.size[1]) * float(wpercent)))
    image = image.resize((basewidth, hsize), Image.Resampling.LANCZOS)
    return image


@st.cache_data
def load_and_resize_image(image_path: str):
    image = _load_image(image_path)
    image = _resize_image(image, basewidth=300)
    return image


@st.cache_data
def convolve(image: Image, kernel: np.array) -> Image:
    return ndimage.convolve(image, kernel, mode="constant", cval=0.0)


KERNELS = {
    "Sharpen": np.array([[0, -1, 0], [-1, 5, -1], [0, -1, 0]]),
    "Blur": np.array([[0.0625, 0.125, 0.0625], [0.125, 0.25, 0.125], [0.0625, 0.125, 0.0625]]),
    "Outline": np.array([[-1, -1, -1], [-1, 8, -1], [-1, -1, -1]]),
    "Identity (nothing!)": np.array([[0, 0, 0], [0, 1, 0], [0, 0, 0]]),
    "Erasor": np.array([[0, 0, 0], [0, 0, 0], [0, 0, 0]]),
}

CURRENT_DIRECTORY = "1.19.0/data_editor/images/"

image_options_to_path = {
    "Camping": CURRENT_DIRECTORY + "camping.png",
    "Happy Birthday": CURRENT_DIRECTORY + "happy_birthday.png",
    "Pilot": CURRENT_DIRECTORY + "pilot.png",
    "Ramen": CURRENT_DIRECTORY + "ramen.png",
    "Salmon": CURRENT_DIRECTORY + "salmon.png",
}

kernel_options = list(KERNELS.keys())


left, right = st.columns((2.1, 4.5))
with left:
    chosen_image = st.selectbox("Choose image", options=image_options_to_path.keys())
    image = _load_image(image_options_to_path[chosen_image])
    st.caption("Original image")
    st.image(image)
with right:
    chosen_kernel = st.selectbox(
        "Choose kernel initialization",
        options=kernel_options,
        index=2,
        help=(
            "Some kernels are known to be useful in certain situations. For example, the 'Blur'"
            " kernel will make images look blurrier. They are usually good starting points for your"
            " own kernels."
        ),
    )
    st.caption("👇 Edit the kernel below and see the effect on the convolved image")
    kernel = KERNELS[chosen_kernel]
    kernel = pd.DataFrame(kernel)
    kernel = st.experimental_data_editor(kernel, use_container_width=True)

convolved = convolve(image, kernel)
st.caption("Convolved image")
st.image(convolved)

st.write("Learn more about convolutions [here](https://setosa.io/ev/image-kernels/).")
