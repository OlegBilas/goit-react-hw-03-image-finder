import React, { Component } from 'react';
import Modal from './Modal';

export default class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => this.setState(state => ({ showModal: !state.showModal }));

  render() {
    const { id, webformatURL, largeImageURL } = this.props.Card;
    const { showModal } = this.state;
    return (
      <li className="ImageGalleryItem">
        <img
          className="ImageGalleryItem-image"
          src={webformatURL}
          alt={`Picker with id=${id}`}
          onClick={this.toggleModal}
        />
        {showModal && (
          <Modal LargeImage={largeImageURL} onClick={this.toggleModal} />
        )}
      </li>
    );
  }
}
