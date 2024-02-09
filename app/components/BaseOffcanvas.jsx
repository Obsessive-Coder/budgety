'use client'

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

import React from 'react'

const BaseOffcanvas = ({ children, buttonProps = {}, headerProps = {}, ...props}) => {
  const {
    label: buttonLabel = 'Open Offcanvas',
    variant = 'primary',
    className: buttonClassName = '',
  } = buttonProps;

  const { label: titleLabel = 'Base Offcanvas' } = headerProps;

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <Button variant={variant} onClick={handleOpen} className={buttonClassName}>
        {buttonLabel}
      </Button>

      <Offcanvas show={isOpen} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title as="h4" className="mx-auto">{titleLabel}</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body className="text-center">
          {children}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default BaseOffcanvas;