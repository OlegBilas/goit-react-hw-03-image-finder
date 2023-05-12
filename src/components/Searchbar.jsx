import React from 'react';
import { Formik, Field, Form } from 'formik';
import PropTypes from 'prop-types';
import { ReactComponent as Search } from '../images/search.svg';

const initialValues = {
  query: '',
};

function Searchbar({ onSummit }) {
  return (
    <header className="Searchbar">
      <Formik
        initialValues={initialValues}
        onSubmit={({ query }) => onSummit(query)}
      >
        <Form className="SearchForm">
          <button type="submit" className="SearchForm-button">
            <Search />
          </button>

          <Field
            className="SearchForm-input"
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </Form>
      </Formik>
    </header>
  );
}
Searchbar.propTypes = {
  onSummit: PropTypes.func.isRequired,
};

export default Searchbar;
