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
    headerLabel = 'Confirm',
    modalLabel = 'Are you sure?',
    handleConfirm = () => null
  } = props;

  const { Formik } = formik;
  const { user, loginWithEmailPassword, logInWithGoogle } = UserAuth();
  const [userError, setUserError] = useState(undefined);
  const isGoogleUser = user?.providerData.filter(({ providerId }) => providerId === 'google.com').length > 0;

  const schema = yup.object().shape({ password: passwordSchema });

  const handleEmailAuth = async password => {
    try {
      return await loginWithEmailPassword(user?.email?.trim(), password.trim());
    } catch ({ code, message }) {
      console.error(code, message);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      return await logInWithGoogle();
    } catch ({ code, message }) {
      console.log(code, message);
    }
  };

  const handleOnConfirm = async (event) => {
    if (event.preventDefault) {
      event.preventDefault();
    }

    const userCredential = isGoogleUser ? await handleGoogleAuth() : await handleEmailAuth(event?.password);

    if (!userCredential?.user) {
      setUserError('Unknown User. Please try again.');
      throw new Error('Unknown User');
    }

    setUserError(undefined);
    handleConfirm();
  };  

  const handleOnClose = () => setUserError(undefined);

  return (
    <BaseModal
      buttonLabel={buttonLabel}
      buttonVariant={buttonVariant}
      buttonClassName={buttonClassName}
      confirmButtonType="submit"
      confirmButtonForm="confirm-password-form"
      headerLabel={headerLabel}
      bodyLabel="Please confirm your password"
      handleCloseModal={handleOnClose}
    >
      {isGoogleUser ? (
        <Form noValidate id="confirm-password-form" onSubmit={handleOnConfirm}>
          {userError && (
            <Form.Control.Feedback type="invalid" className={userError ? 'd-block' : 'd-none'} style={{inlineSize: '265px', overflowWrap: 'break-word'}}>
              {userError}
            </Form.Control.Feedback>
          )}

          <Form.Label>{modalLabel}</Form.Label>
        </Form>
      ) : (
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
      )}
    </BaseModal>
  )
}

export default ConfirmPasswordModal;