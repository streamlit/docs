import React, {useCallback, useEffect, useState} from 'react'
import {
  ComponentProps,
  Streamlit,
  withStreamlitConnection,
} from "streamlit-component-lib"
import {useDropzone} from 'react-dropzone'

function StreamlitImageUploader() {
  const [hasError, updateError] = useState(false)
  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length) {
      updateError(false)
      const file = acceptedFiles[0];
      file.arrayBuffer().then((arraybuffer:any) => (
        Streamlit.setComponentValue(arraybuffer)
      ))
    }
    else {
      updateError(true)
      Streamlit.setFrameHeight()
    }
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    accept: 'image/*',
    maxSize: 512000
  })

  useEffect(() => {
    Streamlit.setFrameHeight()
  }, [])

  return (
    <>
    { hasError
      ? <div className="alert alert-danger">Error uploading file. Try another file.</div>
      : null
    }
    <div {...getRootProps()} className="alert alert-info">
      <input {...getInputProps()} />
      {
        isDragActive ?
          <div>Drop the image here ...</div> :
          <div>Drag 'n' drop or click to select an image less than 500kbs</div>
      }
    </div>
    </>
  )
}

export default withStreamlitConnection(StreamlitImageUploader);
