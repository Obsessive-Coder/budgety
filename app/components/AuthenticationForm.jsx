'use client'

import React, { useState } from 'react';

// Form Validation.
import * as formik from 'formik';
import * as yup from 'yup';

// Google Button Component.
import GoogleButton from 'react-google-button';

// React Bootstrap Components.
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

// Custom Imports.
import { emailSchema, passwordSchema, passwordConfirmSchema } from '@/app/lib/constants/yup';
import { UserAuth } from '@/app/lib/context/AuthContext';

const AuthenticationForm = () => {
  const { Formik } = formik;
  const { logInWithGoogle, loginWithEmailPassword, registerWithEmailPassword } = UserAuth();

  const [userError, setUserError] = useState(undefined);
  const [isRegisterForm, setIsRegisterForm] = useState(false);
  const toggleIsRegisterForm = () => setIsRegisterForm(!isRegisterForm);

  const schema = yup.object().shape({
    email: emailSchema,
    password: passwordSchema,
    ...(isRegisterForm ? { passwordConfirm: passwordConfirmSchema } : {})
  });

const handleEmailLogin = async (formData) => {
  try {
    const { email, password } = formData;
    const userCredential = await loginWithEmailPassword(email.trim(), password.trim());

    if (!userCredential?.user) {
      setUserError('Unknown User. Please try again.');
      throw new Error('Unknown User');
    }

    setUserError(undefined);
  } catch (error) {
      console.error(error);
  }
};

const handleEmailRegistration = async (formData) => {
  try {
       const { email, password } = formData;
       const userCredential = await registerWithEmailPassword(email.trim(), password.trim());

       if (!userCredential?.user) {
        setUserError('Unknown Error. Please try again.');
        throw new Error('Unknown Error');
      }

      setUserError(undefined);
  } catch (error) {
      console.error(error);
  }
};
  
  const handleGoogleLogin = async () => {
    try {
      const userCredential = await logInWithGoogle();

      if (!userCredential?.user) {
        setUserError('Unknown user. Please try again later.');
        throw new Error('Unknown user. Please try again later.');
      }

      setUserError(undefined);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAuthSubmit = formData => {
    if (isRegisterForm) {
      handleEmailRegistration(formData);
    } else {
      handleEmailLogin(formData);
    }
  };

  return (
    <section className="p-3 rounded">
      <h3 className="text-center">{isRegisterForm ? 'Register' : 'Login'}</h3>
      <Formik
        validationSchema={schema}
        onSubmit={handleAuthSubmit}
        initialValues={{ email: '', password: '' }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
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
                  placeholder="Enter email"
                  value={values.email} 
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                />

                <Form.Control.Feedback type="invalid" style={{inlineSize: '265px', overflowWrap: 'break-word'}}>
                  {errors.email}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>

            <Form.Group controlId="formPassword" className="my-3">
              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={values.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                />

                <Form.Control.Feedback type="invalid" style={{inlineSize: '265px', overflowWrap: 'break-word'}}>
                  {errors.password}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>

            {isRegisterForm && (
              <Form.Group controlId="formPasswordConfirm" className="my-3">
                <FloatingLabel controlId="floatingPasswordConfirm" label="Confirm Password">
                  <Form.Control
                    type="password"
                    name="passwordConfirm"
                    placeholder="Confirm password"
                    value={values.passwordConfirm}
                    onChange={handleChange}
                    isInvalid={!!errors.passwordConfirm}
                  />

                  <Form.Control.Feedback type="invalid" style={{inlineSize: '265px', overflowWrap: 'break-word'}}>
                    {errors.passwordConfirm}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
            )}

            <div className="d-flex justify-content-between">
              <Button variant="outline-primary" type="submit">
                {isRegisterForm ? 'Register' : 'Login'}
              </Button>

              <Button variant="link" onClick={toggleIsRegisterForm} className="px-0">
                {isRegisterForm ? 'Login' : 'Register'}
              </Button>
            </div>

            <GoogleButton onClick={handleGoogleLogin} className="my-5 w-100" />
          </Form>
        )}
      </Formik>
    </section>
  )
}

export default AuthenticationForm