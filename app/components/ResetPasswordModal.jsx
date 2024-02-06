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
import { emailSchema } from '@/app/lib/constants/yup';
import { UserAuth } from '@/app/lib/context/AuthContext';

const ResetPasswordModal = (props) => {
  const {
    buttonLabel = 'Reset Password', 
    buttonVariant = 'link',
    buttonClassName = '',
    headerLabel = 'Reset Password',
    modalLabel = 'We will send an email to reset your password.',
    handleConfirm = () => null
  } = props;
        
  const { Formik } = formik;
  const { setUserAlert, sendPasswordResetEmail } = UserAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [userError, setUserError] = useState(undefined);

  const schema = yup.object().shape({ email: emailSchema });

  const handleOnConfirm = async ({ email }) => {
    try {
        await sendPasswordResetEmail(email.trim());
        setUserError(undefined);
        setIsOpen(false);
        setUserAlert({ variant: 'success', headingLabel: 'Reset Password', message: 'An email has been sent to the provided email address.'});
        setTimeout(() => setUserAlert(null), 5000);
    } catch ({ code, message }) {
        console.error(code, message);
    }
  };

  const handleOnClose = () => setUserError(undefined);

  return (
    <BaseModal
      buttonLabel={buttonLabel}
      buttonVariant={buttonVariant}
      buttonClassName={buttonClassName}
      confirmButtonType="submit"
      confirmButtonForm="reset-password-form"
      headerLabel={headerLabel}
      bodyLabel="If your email address is associated with an account we will send you an email to reset your password."
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      handleCloseModal={handleOnClose}
    >
        <Formik
            validationSchema={schema}
            onSubmit={handleOnConfirm}
            initialValues={{ email: '' }}
            >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form noValidate id="reset-password-form" onSubmit={handleSubmit}>
                    <Form.Label>{modalLabel}</Form.Label>

                    {userError && (
                        <Form.Control.Feedback type="invalid" className={userError ? 'd-block' : 'd-none'} style={{inlineSize: '265px', overflowWrap: 'break-word'}}>
                        {userError}
                        </Form.Control.Feedback>
                    )}

                    <Form.Group controlId="formEmail" className="my-3">
                        <FloatingLabel controlId="floatingEmail" label="Email">
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            value={values.email}
                            onChange={handleChange}
                            isInvalid={!!errors.email}
                        />

                        <Form.Control.Feedback type="invalid" style={{inlineSize: '265px', overflowWrap: 'break-word'}}>
                            {errors.email}
                        </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                </Form>
            )}
        </Formik>
    </BaseModal>
  )
}

export default ResetPasswordModal;