import React, { Component } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import fetchImages from '../api/api';
import Searchbar from './Searchbar';
import Loader from './Loader';
import ImageGallery from './ImageGallery';
import Button from './Button';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    status: STATUS.IDLE,
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
      this.setState({ status: STATUS.PENDING });
      fetchImages(query, page)
        .then(images => {
          if (images.length === 0 && page === 1) {
            // нічого не знайдено по запиту
            return Promise.reject();
          }

          if (images.length === 0 && page > 1) {
            // кінець колекції
            toast.warn(
              `It's the end of the collection on your request by key "${query}"!`
            );
            return this.setState({ status: STATUS.REJECTED });
          }

          if (prevState.query === query) {
            // запит по тому ж самому ключовому слову
            images = [...prevState.images, ...images];
          }

          this.setState({
            images,
            status: STATUS.RESOLVED,
          });
        })
        .catch(() => {
          this.setState({ status: STATUS.REJECTED });
          toast.error(
            `We didn't find any images on your request by key "${query}"!`
          );
        });
    }
  }
  render() {
    const { status, images } = this.state;
    return (
      <>
        <Searchbar className="Searchbar" onSummit={this.handleSubmit} />
        {status === STATUS.PENDING && <Loader />}
        {images.length !== 0 && <ImageGallery Images={images} />}
        {status === STATUS.RESOLVED && (
          <Button onClick={this.handleClickLoadMore} />
        )}
        {status === STATUS.REJECTED && <ToastContainer />}
      </>
    );
  }
}
