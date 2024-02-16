import React from 'react';

// React Bootstrap Components.
import Dropdown from 'react-bootstrap/Dropdown';

const TableMenu = ({ isOpen, selectedItemId, isSelectedItemExpense = false, setIsMenuOpen, handleMenuItemOnClick }) => {
  const items = ['duplicate', ...isSelectedItemExpense ? ['refund'] : [], 'edit', 'delete'];

  const handleItemOnClick = (itemLabel) => {
    handleMenuItemOnClick(selectedItemId, itemLabel)
    setIsMenuOpen(false);
  }

  return (
    <Dropdown show={isOpen} id="table-menu" className="position-absolute">
      <Dropdown.Menu>
        {items.map(itemLabel => (
          <Dropdown.Item
            key={`table-menu-item-${itemLabel}`}
            as="button"
            onClick={() => handleItemOnClick(itemLabel)}
            className="text-capitalize"
          >
            {itemLabel}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default TableMenu;