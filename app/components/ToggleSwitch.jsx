import React from 'react';

// React Bootstrap Components.
import Form from 'react-bootstrap/Form';

const ToggleSwitch = ({ children, isActive = false, labelText = 'toggle', handleOnChange }) => {
  return (
    <Form>
      <Form.Check
        type="switch"
        id="custom-switch"
        label={children ? children : labelText}
        checked={isActive}
        onChange={handleOnChange}
        className="d-flex align-items-center justify-content-between"
      />
    </Form>
  )
}

export default ToggleSwitch;