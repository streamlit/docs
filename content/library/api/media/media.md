---
title: Media elements
slug: /library/api-reference/media
---

# Media elements

It's easy to embed images, videos, and audio files directly into your Streamlit apps.

<TileContainer>
<RefCard href="/library/api-reference/media/st.image">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Image

Display an image or list of images.

```python
st.image(numpy_array)
st.image(image_bytes)
st.image(file)
st.image("https://example.com/myimage.png")
```

</RefCard>
<RefCard href="/library/api-reference/media/st.audio">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Audio

Display an audio player.

```python
st.audio(numpy_array)
st.audio(audio_bytes)
st.audio(file)
st.audio("https://example.com/myaudio.mp3", format="audio/mp3")
```

</RefCard>
<RefCard href="/library/api-reference/media/st.video">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Video

Display a video player.

```python
st.video(numpy_array)
st.video(video_bytes)
st.video(file)
st.video("https://example.com/myvideo.mp4", format="video/mp4")
```

</RefCard>
</TileContainer>