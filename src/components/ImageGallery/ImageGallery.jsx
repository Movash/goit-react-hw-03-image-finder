import React from 'react';
import ImageGalleryItem from './../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images }) => (
  <ul className="ImageGallery">
    {images.map(image => (
      <ImageGalleryItem key={image.id} image={image} />
    ))}
  </ul>
);

export default ImageGallery;