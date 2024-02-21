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

const CategoriesDropdown = ({ items = [], isSmallImage = false, categories = [], isDisabled, controlProps, errorText }) => {
  const [filterValue, setFilterValue] = useState('');

  let filteredItems = [];
  if (filterValue) {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const { items: subItems = [], definition } = item;
  
      if (definition.toLowerCase().startsWith(filterValue)) {
        filteredItems.push(item)
      }
  
      filteredItems.push(...subItems.filter(({ definition }) => definition.toLowerCase().startsWith(filterValue)));
    }
  } else {
    filteredItems = items.map(item => ({
      ...item,
      items: [{ ...item }, ...item.items]
    }))
  }

  const { items: subcategories = [], ...item }  = categories
    .filter(({ id, items = [] }) => {
      return (
        id === controlProps.value || items.filter(({ id }) => id === controlProps.value).length > 0
      )
    })[0] ?? {};

  const { definition: toggleText = '-- select one --' } = [item, ...subcategories].filter(({ id }) => id === controlProps.value)[0] ?? {};

  return (
    <div className="d-flex flex-column h-100">
      <Dropdown className="flex-basis-100 custom-form-control">
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

      <Form.Control.Feedback type="invalid" style={{ overflowWrap: 'break-word' }} className="d-block text-start">
        {errorText}
      </Form.Control.Feedback>
    </div>
  )
}

export default CategoriesDropdown;