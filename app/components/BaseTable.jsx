import React from 'react';

// Bootstrap Components.
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import {
  SortUp as SortUpIcon,
  SortDown as SortDownIcon
} from 'react-bootstrap-icons';

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
    sortData : { orderField, isDesc } = { orderField: 'date', isDesc: true },
    getIdColumnText,
    handleSort = () => null,
    tableClassName = '',
    bodyClassName = '',
  } = props

  if (!items?.length) return null;

  const SortIcon = isDesc ? SortDownIcon : SortUpIcon;

  const getLabelFromKey = key => camelToFlat(key).replace(' Id', '').trim();

  const handleRowOnClick = () => {
    alert('TODO: Show context menu');
  };

  return (
    <div className={`border border-2 rounded ${tableClassName}`}>
      <Table striped bordered hover responsive size='sm' className="m-0 border border-2 rounded">
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
        
        <tbody className={bodyClassName}>
          {items.map(item => (
            <tr key={`item-${item.id}`} onClick={handleRowOnClick}>
              {headLabels.map(dataKey => (
                <td
                  key={`item-data-${dataKey}-${item.id}`}
                  className={`px-2 ${dataKey === 'amount' ? 'text-end' : ''} ${item.id === modifiedDocumentId ? 'bg-success' : ''}`}
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