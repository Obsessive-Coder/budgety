'use client'

import React, { useState } from 'react';

// React Bootstrap Components.
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { AsyncTypeahead, Hint } from 'react-bootstrap-typeahead';

// Custom Imports.
import { getDocuments } from '../lib/firebase/firestore';

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
      onChange={([{ id, definition } = {}]) => onChange({ currentTarget: { value: definition, name: inputProps.name }})}
      options={options}
      inputProps={inputProps}
      placeholder="Search for another party"
      className="text-capitalize"
      renderInput={({ inputRef, referenceElementRef, ...inputProps }) => (
        <Hint>
          <FloatingLabel controlId="floatingOtherParty" label="Other Party" className="flex-fill text-capitalize">
            <Form.Control
              {...inputProps}
              size="sm"
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
    />
  )
}

export default TypeAhead;