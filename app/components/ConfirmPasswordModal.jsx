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
import { passwordSchema } from '@/app/lib/constants/yup';
import { UserAuth } from '@/app/lib/context/AuthContext';

const ConfirmPasswordModal = (props) => {
  const {
    buttonLabel = 'Open Modal', 
    buttonVariant = 'outline-primary',
    buttonClassName = 'mx-auto d-block my-5',   
    handleConfirm = () => null
  } = props;

  const { Formik } = formik;
  const { user, loginWithEmailPassword } = UserAuth();
  const [userError, setUserError] = useState(undefined);

  const schema = yup.object().shape({ password: passwordSchema });

  const handleOnConfirm = async ({ password }) => {
    try {
      const userCredential = await loginWithEmailPassword(user?.email?.trim(), password.trim());
  
      if (!userCredential?.user) {
        setUserError('Unknown User. Please try again.');
        throw new Error('Unknown User');
      }
  
      setUserError(undefined);
      handleConfirm();
    } catch (error) {
        console.error(error);
    }
  };

  const handleOnClose = () => setUserError(undefined);

  return (
    <BaseModal
      buttonLabel={buttonLabel}
      buttonVariant={buttonVariant}
      buttonClassName={buttonClassName}
      confirmButtonType="submit"
      confirmButtonForm="confirm-password-form"
      isConfirmButtonDisabled={false}
      headerLabel="Confirm Password"
      bodyLabel="Please confirm your password"
      modalSize="sm"
      handleCloseModal={handleOnClose}
    >
      <Formik
        validationSchema={schema}
        onSubmit={handleOnConfirm}
        initialValues={{ password: '' }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate id="confirm-password-form" onSubmit={handleSubmit}>
            {userError && (
              <Form.Control.Feedback type="invalid" className={userError ? 'd-block' : 'd-none'} style={{inlineSize: '265px', overflowWrap: 'break-word'}}>
                {userError}
              </Form.Control.Feedback>
            )}

            <Form.Group controlId="formPassword" className="my-3">
              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Confirm password"
                  value={values.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                />

                <Form.Control.Feedback type="invalid" style={{inlineSize: '265px', overflowWrap: 'break-word'}}>
                  {errors.password}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
          </Form>
        )}
      </Formik>
    </BaseModal>
  )
}

export default ConfirmPasswordModal;