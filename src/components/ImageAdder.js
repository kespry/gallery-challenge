import React, { useState } from 'react';

export const ImageAdder = ({ onImageUrlSubmitted }) => {
  const [imageUrl, setImageUrl] = useState('');

  return (
    <>
      <input
        type="text"
        placeholder="Enter image url"
        value={imageUrl}
        onChange={(event) => setImageUrl(event.target.value)}
      />
      <button
        onClick={() => {
          if (!imageUrl) return;
          onImageUrlSubmitted(imageUrl);
          setImageUrl('');
        }}
      >
        Add to Gallery
      </button>
    </>
  );
};
