import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const rootModal = document.getElementById('root-modal');
createPortal(Modal, rootModal);

function Modal({ LargeImage, onClick }) {
  return (
    <div className="Overlay" onClick={() => hadleOverlayClick(onClick)}>
      <div className="Modal">
        <img src={LargeImage} alt="" />
      </div>
    </div>
  );
}

function hadleOverlayClick(event, onClickFromParent) {
  if (event.currentTarget === event.target) {
    onClickFromParent();
  }
}

Modal.propTypes = {
  LargeImage: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Modal;
