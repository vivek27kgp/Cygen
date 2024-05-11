import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Thumbnail = ({ file, onDelete }) => (
  <div className="thumbnail">
    <button onClick={() => onDelete(file)} className="delete-button">
      <FontAwesomeIcon icon={faTrash} className="trash-icon" />
    </button>
    <img src={file.url} alt={file.name} className="thumbnail-image w-25 h-25" />
    <p className="file-size">{(file.size / 1024).toFixed(2)} KB</p>
  </div>
);
const MyDropzone: React.FC<{ onFirstImageUrlChange: (imageUrl: string) => void }> = ({ onFirstImageUrlChange }) => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const handleImageUrlChange = (imageUrl: string) => {
    onFirstImageUrlChange(imageUrl);
  };

  // After setting the uploadedImages state
  if (uploadedImages.length > 0) {
    handleImageUrlChange(uploadedImages[0].url);
  }
  const onDrop = useCallback(async (acceptedFiles: {
    name: never; size: any; 
}[]) => {
    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);

    try {
      const response = await fetch('http://localhost:3000/api/uploadImage', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        const imageUrl = data.imageUrl;
        setUploadedImages((prevImages) => [
          ...prevImages,
          { url: imageUrl, name: acceptedFiles[0].name, size: acceptedFiles[0].size },
        ]);
      } else {
        throw new Error('Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }, []);

  const deleteImage = (fileToDelete) => {
    setUploadedImages((prevImages) =>
      prevImages.filter((file) => file.url !== fileToDelete.url)
    );
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className={`dropzone ${isDragActive ? 'drag-over' : ''}`}>
      <input {...getInputProps()} />
      {uploadedImages.map((file, index) => (
        <Thumbnail key={index} file={file} onDelete={deleteImage} />
      ))}
      {uploadedImages.length === 0 && !isDragActive && (
        <p>Drag 'n' drop some images here, or click to select images</p>
      )}

     {/* //   Hidden inputs for storing image URLs
        {uploadedImages.map((file, index) => (
        <input key={index} type="text" name={`imageUrls[${index}]`} value={file.url} />
      ))} */}

{uploadedImages.length > 0 && (
        <input type="hidden" name="firstImageUrl" value={uploadedImages[0].url} />
      )}

    </div>
  );
};

export default MyDropzone;
