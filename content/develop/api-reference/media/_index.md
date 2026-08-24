---
title: Media elements
slug: /develop/api-reference/media
description: Embed images, videos, audio files, PDFs, and logos directly into your Streamlit apps with easy-to-use media commands.
keywords: media elements, images, videos, audio, pdf, logo, multimedia, media display, file embedding, streamlit media, media components
---

# Media elements

It's easy to embed images, videos, and audio files directly into your Streamlit apps.

<TileContainer>
<RefCard href="/develop/api-reference/media/st.image">

<Image pure alt="screenshot" src="/images/api/image.jpg" />

<h4>Image</h4>

Display an image or list of images.

```python
st.image(numpy_array)
st.image(image_bytes)
st.image(file)
st.image("https://example.com/myimage.jpg")
```

</RefCard>
<RefCard href="/develop/api-reference/media/st.logo">

<Image pure alt="screenshot" src="/images/api/logo.jpg" />

<h4>Logo</h4>

Display a logo in the upper-left corner of your app and its sidebar.

```python
st.logo("logo.jpg")
```

</RefCard>
<RefCard href="/develop/api-reference/media/st.pdf">

<Image pure alt="screenshot" src="/images/api/pdf.jpg" />

<h4>PDF</h4>

Display a PDF file.

```python
st.pdf("my_document.pdf")
```

</RefCard>
<RefCard href="/develop/api-reference/media/st.audio">

<Image pure alt="screenshot" src="/images/api/audio.jpg" />

<h4>Audio</h4>

Display an audio player.

```python
st.audio(numpy_array)
st.audio(audio_bytes)
st.audio(file)
st.audio("https://example.com/myaudio.mp3", format="audio/mp3")
```

</RefCard>
<RefCard href="/develop/api-reference/media/st.video">

<Image pure alt="screenshot" src="/images/api/video.jpg" />

<h4>Video</h4>

Display a video player.

```python
st.video(numpy_array)
st.video(video_bytes)
st.video(file)
st.video("https://example.com/myvideo.mp4", format="video/mp4")
```

</RefCard>
</TileContainer>
