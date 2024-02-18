'use client'

import React, { useState } from 'react';

// Bootstrap Components.
import Collapse from 'react-bootstrap/Collapse';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import {
    ArrowsCollapse as ArrowsCollapseIcon,
    ArrowsExpand as ArrowsExpandIcon
} from 'react-bootstrap-icons';

// Custom Imports.
import { UserTransactions } from '../lib/context/TransactionsContext';

const CategoryImage = (props) => {
    return <Image {...props} roundedCircle alt="Category Image" className="category-image" />
};

const ParentListItem = ({ children, name, imageUrl }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleIsOpen = () => setIsOpen(!isOpen);

    const ArrowsIcon = isOpen ? ArrowsCollapseIcon : ArrowsExpandIcon;

    return (
        <ListGroup.Item
            aria-controls={`category-list-${name}`}
            aria-expanded={isOpen}
            onClick={toggleIsOpen}
            className="my-2 text-capitalize"
        >
            <div className="d-flex align-items-center justify-content-between">
                <CategoryImage src={imageUrl} />
                <p className="my-0 mx-3">{name}</p>
                <ArrowsIcon size={18} />
            </div>

            <Collapse in={isOpen}>
                {children}
            </Collapse>
        </ListGroup.Item>
    );
};

const CategoryList = () => {
  const { transactionCategories } = UserTransactions();

  return (
    <ListGroup variant="flush">
        {transactionCategories.map(({ definition: parentName, items = [], imageUrl: parentImageUrl }) => (
            <ParentListItem key={`parent-item-${parentName}`} name={parentName} imageUrl={parentImageUrl}>
                <ListGroup variant="flush" id={`category-list-${parentName}`}>
                    {items.map(({ definition: name, imageUrl }) => (
                        <ListGroup.Item key={`child-item-${name}`} className="border-0 text-capitalize">
                            <div className="d-flex align-items-center">
                                <CategoryImage src={imageUrl} />
                                <p className="my-0 mx-3">{name}</p>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </ParentListItem>
        ))}
    </ListGroup>
  )
}

export default CategoryList;