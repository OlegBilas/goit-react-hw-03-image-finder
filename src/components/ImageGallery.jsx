import React from 'react';

import ImageGalleryItem from './ImageGalleryItem';
import PropTypes from 'prop-types';

function ImageGallery({ Images }) {
  return (
    <ul className="ImageGallery">
      {Images.map(card => (
        <ImageGalleryItem key={card.id} Card={card} />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  })
);

export default ImageGallery;
