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

const ParentListItem = ({ children, name, imageUrl, isFiltered = false, isSmallImage = false }) => {
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
                <p className="flex-fill my-0 mx-3">{name}</p>

                {!isFiltered && <ArrowsIcon size={18} />}
            </div>

            <Collapse in={isOpen}>
                {children}
            </Collapse>
        </ListGroup.Item>
    );
};

const CategoryList = ({ isSmallImage = false, mainItems = [], isFiltered = false, handleItemOnClick = () => null }) => {
  return (
    <ListGroup variant="flush">
        {mainItems.map(({ definition: parentName, items = [], imageUrl: parentImageUrl }) => (
            <ParentListItem key={`parent-item-${parentName}`} name={parentName} imageUrl={parentImageUrl} isFiltered={isFiltered} isSmallImage={isSmallImage}>
                <ListGroup variant="flush" id={`category-list-${parentName}`}>
                    {items.map(({ id: categoryId, definition: name, imageUrl }) => (
                        <ListGroup.Item 
                            action
                            key={`child-item-${name}`}
                            name="categoryId"
                            id="categoryId"
                            type="button"
                            value={categoryId}
                            onClick={handleItemOnClick}
                            className="d-flex align-items-center border-0 text-capitalize"
                        >
                            <CategoryImage src={imageUrl} isSmallImage={isSmallImage} style={{ pointerEvents: 'none' }} />
                            <p className="flex-fill my-0 mx-3" style={{ pointerEvents: 'none' }}>{name}</p>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </ParentListItem>
        ))}
    </ListGroup>
  )
}

export default CategoryList;