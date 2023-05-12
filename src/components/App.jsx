import React, { Component } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import fetchImages from '../api/api';
import Searchbar from './Searchbar';
import Loader from './Loader';
import ImageGallery from './ImageGallery';
import Button from './Button';

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

  handleClickLoadMore = () => {
    this.setState(state => {
      return { page: state.page + 1 };
    });
  };

  componentDidUpdate(prevProps, prevState) {
    let { query, page } = this.state;

    if (prevState.query !== query) {
      //новий запит
      page = 1;
    }
    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ status: 'pending' });
      fetchImages(query, page)
        .then(images => {
          if (images.length === 0) {
            return Promise.reject();
          }
          return this.setState({ images, page, status: 'resolved' });
        })
        .catch(() => this.setState({ status: 'rejected' }));
    }
  }
  render() {
    const { status, images } = this.state;
    toast.warn("We didn't find any images about your request!");
    return (
      <>
        <Searchbar className="Searchbar" onSummit={this.handleSubmit} />
        {status === 'pending' && <Loader />}
        {status === 'resolved' && <ImageGallery Images={images} />}
        {images.length !== 0 && status === 'resolved' && (
          <Button onClick={this.handleClickLoadMore} />
        )}
        {status === 'rejected' && <ToastContainer />}
      </>
    );
  }
}
