'use client'

import React, { useState } from 'react';

// Bootstrap Components.
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import {
  SortUp as SortUpIcon,
  SortDown as SortDownIcon,
} from 'react-bootstrap-icons';

// Custom Components.
import BaseModal from './BaseModal';
import TableMenu from './TableMenu';

// Custom Imports.
import { camelToFlat } from '@/app/lib/helpers/global';

const USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const BaseTable = (props) => {
  const {
    items = [],
    headLabels = [],
    modifiedDocumentId,
    getIsTransactionExpense,
    sortData : { orderField, isDesc } = { orderField: 'date', isDesc: true },
    getIdColumnText,
    handleSort = () => null,
    handleMenuItemOnClick = () => null,
    tableClassName = '',
    bodyClassName = '',
  } = props

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  if (!items?.length) return null;

  const isSelectedItemExpense = getIsTransactionExpense(selectedItemId);

  const SortIcon = isDesc ? SortDownIcon : SortUpIcon;

  const getLabelFromKey = key => camelToFlat(key).replace(' Id', '').trim();

  const handleRowOnClick = (event) => {
    const tableMenu = document.getElementById('table-menu')
    tableMenu.style.top = event.clientY + 'px';
    tableMenu.style.left = event.clientX + 'px';
    setIsMenuOpen(!isMenuOpen);

    const itemId = event.currentTarget.getAttribute('data-item-id')
    setSelectedItemId(itemId);
  };

  return (
    <div className={`${tableClassName}`}>
      <TableMenu
        isOpen={isMenuOpen}
        selectedItemId={selectedItemId}
        isSelectedItemExpense={isSelectedItemExpense}
        setIsMenuOpen={setIsMenuOpen}
        handleMenuItemOnClick={handleMenuItemOnClick}
      />

      <Table striped hover responsive size='sm' className="m-0">
        <thead className="text-center text-capitalize">
          <tr>
            {headLabels.map(dataKey => (
              <th key={`item-${dataKey}`}>
                <Button
                  variant='link'
                  data-order-field={dataKey}
                  onClick={handleSort}
                  className="w-100 rounded-0 text-decoration-none text-body fw-bold"
                >
                  <span>{getLabelFromKey(dataKey)}</span>
                  
                  <SortIcon size={18} className={`mx-2 ${dataKey === orderField ? 'visible' : 'invisible'}`} />
                </Button>
              </th>
            ))}
          </tr>
        </thead>
        
        <tbody className={`table-group-divider ${bodyClassName}`}>
          {items.map(item => (
            <tr key={`item-${item.id}`} onClick={handleRowOnClick} data-item-id={item.id}>
              {headLabels.map((dataKey, index) => (
                <td
                  key={`item-data-${dataKey}-${item.id}`}
                  className={`px-2 ${index === items.length - 1 ? '' : 'border'} ${dataKey === 'amount' ? 'text-end' : ''} ${item.id === modifiedDocumentId ? 'bg-success' : ''}`}
                >
                    {dataKey.includes('Id') ? (
                        getIdColumnText(dataKey, item[dataKey])
                    ) : (
                      <>
                        {dataKey === 'amount' ? (
                          USDollar.format(item[dataKey])
                        ) : (
                          item[dataKey] 
                        )}
                      </>
                    )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default BaseTable;