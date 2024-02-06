'use client'

import React, { useState } from 'react';

// Form Validation.
import * as formik from 'formik';
import * as yup from 'yup';

// React Bootstrap Components.
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

// Custom Components.
import BaseModal from './BaseModal';

// Custom Imports.
import { passwordSchema, newPasswordConfirmSchema } from '@/app/lib/constants/yup';
import { UserAuth } from '@/app/lib/context/AuthContext';

const ChangePasswordModal = (props) => {
  const {
    buttonLabel = 'Change Password', 
    buttonVariant = 'outline-info',
    buttonClassName = '',
    headerLabel = 'Change Password',
    modalLabel = 'Change Password',
    handleConfirm = () => null
  } = props;

  const { Formik } = formik;
  const [isOpen, setIsOpen] = useState(false);
  const [userError, setUserError] = useState(undefined);
  const { user, loginWithEmailPassword } = UserAuth();

  const schema = yup.object().shape({
    currentPassword: passwordSchema,
    newPassword: passwordSchema,
    newPasswordConfirm: newPasswordConfirmSchema
  });

  const handleEmailAuth = async password => {
    try {
      return await loginWithEmailPassword(user?.email?.trim(), password.trim());
    } catch ({ code, message }) {
      console.error(code, message);
    }
  };

  const handleOnClose = () => setUserError(undefined);

  const handleOnConfirm = async ({ currentPassword, newPassword }) => {
    const userCredential = await handleEmailAuth(currentPassword);

    if (!userCredential?.user) {
      setUserError('Incorrect Password. Please try again.');
      throw new Error('Unknown User');
    }

    setUserError(undefined);
    handleConfirm(newPassword);
    setIsOpen(false);
  };

  return (
    <BaseModal
      buttonLabel={buttonLabel}
      buttonVariant={buttonVariant}
      buttonClassName={buttonClassName}
      confirmButtonType="submit"
      confirmButtonForm="change-password-form"
      headerLabel={headerLabel}
      bodyLabel="Change your password"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      handleCloseModal={handleOnClose}
    >
        <Formik
            validationSchema={schema}
            onSubmit={handleOnConfirm}
            initialValues={{
                currentPassword: '',
                newPassword: '',
                newPasswordConfirm: ''
            }}
        >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form noValidate id="change-password-form" onSubmit={handleSubmit}>
                    {userError && (
                        <Form.Control.Feedback type="invalid" className={userError ? 'd-block' : 'd-none'} style={{inlineSize: '265px', overflowWrap: 'break-word'}}>
                            {userError}
                        </Form.Control.Feedback>
                    )}

                    <Form.Group controlId="formCurrentPassword" className="my-3">
                        <FloatingLabel controlId="floatingCurrentPassword" label="Current Password">
                        <Form.Control
                            type="password"
                            name="currentPassword"
                            placeholder="Enter current password"
                            value={values.currentPassword}
                            onChange={handleChange}
                            isInvalid={!!errors.currentPassword}
                        />

                        <Form.Control.Feedback type="invalid" style={{inlineSize: '265px', overflowWrap: 'break-word'}}>
                            {errors.currentPassword}
                        </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group controlId="formNewPassword" className="my-3">
                        <FloatingLabel controlId="floatingNewPassword" label="New Password">
                            <Form.Control
                                type="password"
                                name="newPassword"
                                placeholder="Enter new password"
                                value={values.newPassword}
                                onChange={handleChange}
                                isInvalid={!!errors.newPassword}
                            />

                            <Form.Control.Feedback type="invalid" style={{inlineSize: '265px', overflowWrap: 'break-word'}}>
                                {errors.newPassword}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group controlId="formNewPasswordConfirm" className="my-3">
                        <FloatingLabel controlId="floatingNewPasswordConfirm" label="Confirm New Password">
                            <Form.Control
                                type="password"
                                name="newPasswordConfirm"
                                placeholder="Enter new password again"
                                value={values.newPasswordConfirm}
                                onChange={handleChange}
                                isInvalid={!!errors.newPasswordConfirm}
                            />

                            <Form.Control.Feedback type="invalid" style={{inlineSize: '265px', overflowWrap: 'break-word'}}>
                                {errors.newPasswordConfirm}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                </Form>
            )}
      </Formik>
    </BaseModal>
  )
}

export default ChangePasswordModal;