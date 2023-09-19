import React from 'react';

const ImageGalleryItem = ({ image, toggleModal }) => (
  <li className="ImageGalleryItem">
    <img
      onClick={() => toggleModal(image.largeImageURL)}
      className="ImageGalleryItem-image"
      src={image.webformatURL}
      alt="img"
    />
  </li>
);

export default ImageGalleryItem;