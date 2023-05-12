import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const rootModal = document.getElementById('root-modal');

export default class Modal extends Component {
  static propTypes = {
    LargeImage: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  hadleOverlayClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClick();
    }
  };

  hadlePressEsc = event => {
    if (event.code === 'Escape') {
      this.props.onClick();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.hadlePressEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.hadlePressEsc);
  }

  render() {
    const { LargeImage } = this.props;
    return createPortal(
      <div className="Overlay" onClick={this.hadleOverlayClick}>
        <div className="Modal">
          <img src={LargeImage} alt="" />
        </div>
      </div>,
      rootModal
    );
  }
}
