import React from 'react';

const ImageGalleryItem = ({ image }) => (
  <li className="ImageGalleryItem">
    <img
      className="ImageGalleryItem-image"
      src={image.webformatURL}
      alt="img"
    />
  </li>
);

export default ImageGalleryItem;