'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

const SEARCH_URI = 'https://api.github.com/search/users';

const TypeAhead = ({ controlProps }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const handleSearch = (query) => {
    setIsLoading(true);

    fetch(`${SEARCH_URI}?q=${query}+in:login&page=1&per_page=50`)
      .then((resp) => resp.json())
      .then(({ items }) => {
        setOptions(items);
        setIsLoading(false);
      });
  };

  const filterBy = () => true;

  return (
    <AsyncTypeahead
      filterBy={filterBy}
      id="async-example"
      isLoading={isLoading}
      labelKey="login"
      minLength={3}
      onSearch={handleSearch}
      options={options}
      inputProps={controlProps}
      placeholder="Search for a Github user..."
      data-name={controlProps.name}
      renderMenuItemChildren={(option) => (
        <>
          <img
            alt={option.login}
            src={option.avatar_url}
            style={{
              height: '24px',
              marginRight: '10px',
              width: '24px',
            }}
          />

          <span>{option.login}</span>
        </>
      )}
    >
    </AsyncTypeahead>
  )
}

export default TypeAhead;