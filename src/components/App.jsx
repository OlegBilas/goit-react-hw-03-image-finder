import React, { Component } from 'react';
import fetchImages from '../api/api';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    status: 'idle',
  };

  handleSubmit = query => {
    this.setState({ query });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.setState({ status: 'pending' });

      const { query, page } = this.state;
      if (prevState.query !== query) {
        fetchImages(query, page)
          .then(images => this.setState({ images, status: 'resolved' }))
          .catch(() => this.setState({ status: 'rejected' }));
      }
    }
  }
  render() {
    const { status, images } = this.state;
    return (
      <>
        <Searchbar className="Searchbar" onSummit={this.handleSubmit} />
        {status === 'resolved' && <ImageGallery Images={images} />}
      </>
    );
  }
}
