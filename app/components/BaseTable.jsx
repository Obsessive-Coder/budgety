import React from 'react';

// Bootstrap Components.
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

// Custom Imports.
import { camelToFlat } from '@/app/lib/helpers/global';

const BaseTable = ({ items = [], headLabels = [], tableClassName = '' }) => {
  if (!items?.length) return null;

  const getLabelFromKey = key => camelToFlat(key).replace(' Id', '').trim();

  const handleRowOnClick = () => {
    alert('TODO: Show context menu');
  };

  return (
    <div className={`border border-2 rounded ${tableClassName}`}>
      <Table striped hover responsive size='sm' className="m-0 border border-2 rounded">
        <thead className="text-center text-capitalize">
          <tr>
            {headLabels.map(dataKey => (
              <th key={`item-${dataKey}`}>
                <Button variant='link' className="w-100 rounded-0 text-decoration-none text-body">
                  {getLabelFromKey(dataKey)}
                </Button>
              </th>
            ))}
          </tr>
        </thead>
        
        <tbody>
          {items.map(item => (
            <tr key={`item-${item.id}`} onClick={handleRowOnClick}>
              {headLabels.map(dataKey => (
                <td key={`item-data-${dataKey}-${item.id}`}>
                    {item[dataKey]}
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