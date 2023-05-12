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
    this.setState(prevState => {
      if (prevState.query !== query) {
        return { query, page: 1 };
      }
    });
  };

  handleClickLoadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  componentDidUpdate(prevProps, prevState) {
    let { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ status: 'pending' });
      fetchImages(query, page)
        .then(images => {
          if (images.length === 0) {
            return Promise.reject();
          }

          if (prevState.query === query) {
            // запит по тому ж самому ключовому слову
            images = [...prevState.images, ...images];
          }

          this.setState({
            images,
            status: 'resolved',
          });
        })
        .catch(() => {
          this.setState({ status: 'rejected' });
          toast.warn("We didn't find any images on your request!");
        });
    }
  }
  render() {
    const { status, images } = this.state;
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
