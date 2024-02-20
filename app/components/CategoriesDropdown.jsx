import React, { useState } from 'react';

// React Bootstrap Components.
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';

// Custom Components.
import CategoryList from './CategoryList';

// eslint-disable-next-line react/display-name
const CustomMenu = React.forwardRef(
    ({ children, style, filterValue, setFilterValue, className, 'aria-labelledby': labeledBy }, ref) => {  
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
  const [filterValue, setFilterValue] = useState('');

  const filteredItems = items
    .filter(({ items: subItems }) => !filterValue || subItems.filter(({ definition }) => definition.toLowerCase().startsWith(filterValue)).length > 0)
    .map(({ items: subItems = [], ...item }) => {
      const filteredSubItems = subItems.filter(({ definition }) => definition.toLowerCase().startsWith(filterValue));
      return filterValue ? filteredSubItems : { ...item, items: filteredSubItems }
    })
    .flat();

  const { items: subcategories = [] }  = categories
    .filter(({ items = [] }) => items.filter(({ id }) => id === controlProps.value).length > 0)[0] ?? {};

  const { definition: toggleText = '-- select one --' } = subcategories.filter(({ id }) => id === controlProps.value)[0] ?? {};

  console.log(filteredItems)

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

        <Dropdown.Menu as={CustomMenu} filterValue={filterValue} setFilterValue={setFilterValue} className="overflow-auto" style={{ maxHeight: 420 }}>
            <CategoryList isSmallImage={isSmallImage} mainItems={filteredItems} isFiltered={!!filterValue} handleItemOnClick={controlProps.onChange} />
        </Dropdown.Menu>
    </Dropdown>
  )
}

export default CategoriesDropdown;