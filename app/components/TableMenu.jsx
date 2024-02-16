import React from 'react';

// React Bootstrap Components.
import Dropdown from 'react-bootstrap/Dropdown';

const TableMenu = ({ isOpen, setIsOpen }) => {
  return (
    <Dropdown show={isOpen} id="table-menu" className="position-absolute">
      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default TableMenu;