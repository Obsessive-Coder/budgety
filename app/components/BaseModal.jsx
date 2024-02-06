'use client'

import React from 'react';

// Bootstrap Components.
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const BaseModal = ({
    children,
    modalSize,
    buttonLabel = 'Open Modal', 
    buttonVariant = 'outline-primary',
    buttonClassName = 'mx-auto d-block my-5',
    confirmButtonType = 'text',
    confirmButtonForm = undefined,
    headerLabel = 'Confirm',
    bodyLabel = 'Are you sure?',
    cancelLabel = 'Cancel',
    confirmLabel = 'Confirm',
    isOpen = false,
    setIsOpen = () => null,
    handleConfirm = () => null,
    handleCloseModal = () => null,
}) => {
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    handleCloseModal();
    setIsOpen(false);
  }

  const handleOnConfirm = () => {
    if (confirmButtonForm) {
      handleConfirm();
    }
  };

  return (
    <>
      <Button
        variant={buttonVariant}
        onClick={handleOpen}
        className={buttonClassName}
      >
        {buttonLabel}
      </Button>

      <Modal
        size={modalSize}
        show={isOpen}
        onHide={handleClose}
        aria-labelledby="base-modal-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="base-modal-title">
            {headerLabel}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
            {children ?? bodyLabel}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            {cancelLabel}
          </Button>

          <Button
            type={confirmButtonType}
            variant="outline-primary"
            onClick={handleOnConfirm}
            form={confirmButtonForm}
          >
            {confirmLabel}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default BaseModal;