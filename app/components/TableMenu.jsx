'use client'

import React, { useState } from 'react';

// React Bootstrap Components.
import Dropdown from 'react-bootstrap/Dropdown';

// Custom Components.
import BaseModal from './BaseModal';

const TableMenu = ({ isOpen, selectedItemId, isSelectedItemExpense = false, setIsMenuOpen, handleMenuItemOnClick }) => {
  const items = ['duplicate', ...isSelectedItemExpense ? ['refund'] : [], 'edit', 'delete'];

  const handleItemOnClick = (itemLabel) => {
    handleMenuItemOnClick(selectedItemId, itemLabel)
    setIsMenuOpen(false);
  }

  const ConfirmModal = () => {
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
     
    return (
      <BaseModal
        isOpen={isConfirmOpen}
        buttonLabel="Delete"
        headerLabel="Delete Transaction"
        bodyLabel="Are you sure you want to delete this transaction?"
        setIsOpen={setIsConfirmOpen}
        handleConfirm={() => handleItemOnClick('delete')}
        buttonClassName='text-capitalize dropdown-item'
      />
    )
  };

  return (
    <>
      <Dropdown show={isOpen} id="table-menu" className="position-absolute">
        <Dropdown.Menu>
          {items.map(itemLabel => (
            <Dropdown.Item
              key={`table-menu-item-${itemLabel}`}
              as={itemLabel === 'delete' ? ConfirmModal : 'button'}
              onClick={() => itemLabel === 'delete' ? null : handleItemOnClick(itemLabel)}
              className="text-capitalize"
            >
              {itemLabel}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}

export default TableMenu;