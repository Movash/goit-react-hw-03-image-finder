import React from 'react';
import ImageGalleryItem from './../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images, toggleModal }) => (
  <ul className="ImageGallery">
    {images.map(image => (
      <ImageGalleryItem
        toggleModal={toggleModal}
        key={image.id}
        image={image}
      />
    ))}
  </ul>
);

export default ImageGallery;