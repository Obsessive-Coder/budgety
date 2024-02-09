import React from 'react';

// Bootstrap Components.
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
    <div className={`${tableClassName}`}>
      <Table striped bordered hover responsive size='sm'>
        <thead className="text-center text-capitalize">
          <tr>
            {headLabels.map(dataKey => (
              <th key={`item-${dataKey}`}>{getLabelFromKey(dataKey)}</th>
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