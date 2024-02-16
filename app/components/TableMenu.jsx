import React from 'react';

// React Bootstrap Components.
import Dropdown from 'react-bootstrap/Dropdown';

const TableMenu = ({ isOpen, isSelectedItemExpense = false }) => {
  const items = ['duplicate', ...isSelectedItemExpense ? ['refund'] : [], 'edit', 'delete'];

  return (
    <Dropdown show={isOpen} id="table-menu" className="position-absolute">
      <Dropdown.Menu>
        {items.map((itemLabel, index) => (
          <Dropdown.Item key={`table-menu-item-${itemLabel}`} as="button" className="text-capitalize">
            {itemLabel}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default TableMenu;