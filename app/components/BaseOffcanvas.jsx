'use client'

import React from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

const BaseOffcanvas = ({ children, isOpen, buttonProps = {}, headerProps = {}, handleClose, handleOpen, ...props}) => {
  const {
    label: buttonLabel = 'Open Offcanvas',
    variant = 'primary',
    className: buttonClassName = '',
  } = buttonProps;

  const { label: titleLabel = 'Base Offcanvas' } = headerProps;

  return (
    <>
      <Button variant={variant} onClick={handleOpen} className={buttonClassName}>
        {buttonLabel}
      </Button>

      <Offcanvas show={isOpen} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title as="h4" className="mx-auto text-capitalize">{titleLabel}</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body className="text-center">
          {children}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default BaseOffcanvas;