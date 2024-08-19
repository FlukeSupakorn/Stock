import React, { useState } from 'react';

const ImageModal = ({ images, productId, onAddImage, onRemoveImage, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [newImage, setNewImage] = useState('');

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleAddImage = () => {
    onAddImage(productId, newImage);
    setNewImage('');
  };

  const handleRemoveImage = () => {
    const imageId = images[currentImageIndex].ProductImageID;
    onRemoveImage(imageId);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50" onClick={onClose}>
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-screen-md w-full h-screen/2" onClick={(e) => e.stopPropagation()}>
        {images.length > 0 && (
          <>
            <img src={images[currentImageIndex].Productimagecode} alt="Selected Image" className="w-full h-full object-contain" />
            <div className="flex justify-between mt-4">
              <button onClick={handlePrev} className="btn btn-secondary">&lt; Prev</button>
              <button onClick={handleNext} className="btn btn-secondary">Next &gt;</button>
            </div>
          </>
        )}
        <div className="mt-4">
          <input type="url" value={newImage} onChange={(e) => setNewImage(e.target.value)} className="input mb-2" placeholder="New Image URL" />
          <button onClick={handleAddImage} className="btn btn-primary mr-2">Add Image</button>
          {images.length > 0 && (
            <button onClick={handleRemoveImage} className="btn btn-danger">Remove Current Image</button>
          )}
        </div>
        <button onClick={onClose} className="absolute top-0 right-0 m-4 bg-gray-300 p-2 rounded-full hover:bg-gray-400">&times;</button>
      </div>
    </div>
  );
};

export default ImageModal;
