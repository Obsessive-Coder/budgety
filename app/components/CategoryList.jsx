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

const CategoryImage = ({ isSmallImage = false, ...props }) => {
    return <Image {...props} roundedCircle alt="Category Image" className={`category-image ${isSmallImage ? 'max-36' : 'max-48'}`} />
};

const ParentListItem = ({ children, name, imageUrl, isSmallImage }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleIsOpen = () => setIsOpen(!isOpen);

    const ArrowsIcon = isOpen ? ArrowsCollapseIcon : ArrowsExpandIcon;

    return (
        <ListGroup.Item
            aria-controls={`category-list-${name}`}
            aria-expanded={isOpen}
            onClick={toggleIsOpen}
            className="text-capitalize"
        >
            <div className="d-flex align-items-center justify-content-between">
                <CategoryImage src={imageUrl} isSmallImage={isSmallImage} />
                <p className="my-0 mx-3">{name}</p>
                <ArrowsIcon size={18} />
            </div>

            <Collapse in={isOpen}>
                {children}
            </Collapse>
        </ListGroup.Item>
    );
};

const CategoryList = ({ isSmallImage = false, mainItems = [], handleItemOnClick = () => null }) => {
  return (
    <ListGroup variant="flush">
        {mainItems.map(({ definition: parentName, items = [], imageUrl: parentImageUrl }) => (
            <ParentListItem key={`parent-item-${parentName}`} name={parentName} imageUrl={parentImageUrl} isSmallImage={isSmallImage}>
                <ListGroup variant="flush" id={`category-list-${parentName}`}>
                    {items.map(({ id: categoryId, definition: name, imageUrl }) => (
                        <ListGroup.Item 
                            action
                            key={`child-item-${name}`}
                            type="button"
                            name="categoryId"
                            value={categoryId}
                            onClick={handleItemOnClick}
                            className="border-0 text-capitalize"
                        >
                            <div className="d-flex align-items-center">
                                <CategoryImage src={imageUrl} isSmallImage={isSmallImage} />
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