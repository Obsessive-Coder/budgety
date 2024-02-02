import React from 'react';

// React Bootstrap Components.
import Form from 'react-bootstrap/Form';

const ToggleSwitch = ({ children, labelText, handleOnChange }) => {
  return (
    <Form>
      <Form.Check
        type="switch"
        id="custom-switch"
        label={children ? children : labelText}
        checked={labelText === 'dark'}
        onChange={() => handleOnChange(labelText === 'dark' ? 'light' : 'dark')}
        className="d-flex align-items-center justify-content-between"
      />
    </Form>
  )
}

export default ToggleSwitch;