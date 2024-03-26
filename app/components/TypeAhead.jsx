'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { AsyncTypeahead, Hint } from 'react-bootstrap-typeahead';

import { getDocuments } from '../lib/firebase/firestore';

const SEARCH_URI = 'https://api.github.com/search/users';

const TypeAhead = ({ controlProps }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const { onChange, value, ...inputProps } = controlProps;

  const handleSearch = async (query) => {
    setOptions([])
    setIsLoading(true);

    const otherParties = await getDocuments('otherParties', 'definition', false, query);
    setOptions(otherParties);
    setIsLoading(false);
  };

  const filterBy = () => true;

  return (
    <AsyncTypeahead
      filterBy={filterBy}
      id="async-example"
      isLoading={isLoading}
      isInvalid={inputProps.isInvalid}
      labelKey="definition"
      minLength={0}
      onSearch={handleSearch}
      onChange={([{ definition = '' } = {}]) => onChange({ currentTarget: { value: definition, name: inputProps.name }})}
      options={options}
      inputProps={inputProps}
      placeholder="Search for another party"
      renderInput={({ inputRef, referenceElementRef, ...inputProps }) => (
        <Hint>
          <FloatingLabel controlId="floatingOtherParty" label="Other Party" className="flex-fill text-capitalize">
            <Form.Control
              {...inputProps}
              size="sm"
              // onChange={onChange}
              ref={(input) => {
                inputRef(input);
                referenceElementRef(input);
              }}
            />

            <Form.Control.Feedback type="invalid" style={{ overflowWrap: 'break-word' }} className="text-start">
                * Required Field
            </Form.Control.Feedback>
          </FloatingLabel>
        </Hint>
      )}
    >
      {/* {inputProps.isInvalid && (
        <Form.Control.Feedback style={{ overflowWrap: 'break-word' }} className="d-block text-danger-emphasis text-start">
          * Required Field
        </Form.Control.Feedback>
      )} */}
    </AsyncTypeahead>
  )
}

export default TypeAhead;