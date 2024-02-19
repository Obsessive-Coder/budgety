import React, { useState } from 'react';

// React Bootstrap Components.
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';

// Custom Components.
import CategoryList from './CategoryList';

// eslint-disable-next-line react/display-name
const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
      const [filterValue, setFilterValue] = useState('');
  
      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <Form.Control
            autoFocus
            name="category"
            className="mx-3 my-2 w-auto"
            placeholder="Type to filter..."
            onChange={(e) => setFilterValue(e.target.value)}
            value={filterValue}
          />

          {children}
        </div>
      );
    },
  );

const CategoriesDropdown = ({ items = [], isSmallImage = false, categories = [], isDisabled, controlProps }) => {
  const { items: subcategories = [] }  = categories
    .filter(({ items = [] }) => items.filter(({ id }) => id === controlProps.value).length > 0)[0] ?? {};

  const { definition: toggleText = '-- select one --' } = subcategories.filter(({ id }) => id === controlProps.value)[0] ?? {};

  return (
    <Dropdown className="h-100">
        <Dropdown.Toggle
            variant="outline-secondary"
            id="categories-dropdown"
            disabled={isDisabled}
            className="w-100 h-100 text-body text-capitalize justify-content-between d-flex align-items-center"
        >
            {toggleText}
        </Dropdown.Toggle>

        <Dropdown.Menu as={CustomMenu} className="overflow-auto" style={{ maxHeight: 420 }}>
            <CategoryList isSmallImage={isSmallImage} mainItems={items} handleItemOnClick={controlProps.onChange} />
        </Dropdown.Menu>
    </Dropdown>
  )
}

export default CategoriesDropdown;