import React, { Component } from 'react';

import Searchbar from './Searchbar';

export class App extends Component {
  state = {
    query: '',
    page: 1,
  };

  handleSubmit = query => {
    this.setState({ query });
  };
  render() {
    return (
      <>
        <Searchbar className="Searchbar" onSummit={this.handleSubmit} />
      </>
    );
  }
}
