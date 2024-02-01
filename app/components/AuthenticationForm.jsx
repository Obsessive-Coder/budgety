'use client'

import React, { useState } from 'react';
import { useSignInWithEmailAndPassword, useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import * as formik from 'formik';
import * as yup from 'yup';
import { auth } from '@/app/lib/firebase/config';
import { UserAuth } from '@/app/lib/context/AuthContext';

// React Bootstrap Components.
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

const AuthenticationForm = () => {
  const { Formik } = formik;
  const [isRegisterForm, setIsRegisterForm] = useState(false);
  const toggleIsRegisterForm = () => setIsRegisterForm(!isRegisterForm);
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
  const { logInGoogle } = UserAuth();

  const passwordRegex = new RegExp('(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$');
  const passwordSchema = yup.string().required('password is a required field').min(8, 'Password must be at least 8 characters')
    .matches(passwordRegex, {
      excludeEmptyString: true,
      message: 'Password must include 1 uppercase, 1 lowercase, and 1 special character.'
    });

  const schema = yup.object().shape({
    email: yup.string().required().email(),
    password: passwordSchema,
    ... (isRegisterForm ? {
      passwordConfirm: yup.string()
        .oneOf([yup.ref('password'), null], "Passwords do not match")
        .required('Required'),
    } : {}),
  });

const handleEmailLogin = async (formData) => {
  try {
    const { email, password } = formData;
    const result = await signInWithEmailAndPassword(email.trim(), password.trim());
    sessionStorage.setItem('user', true);
    console.log('USER: ', result);
  } catch (error) {
      console.error(error);
  }
};

const handleEmailRegistration = async (formData) => {
  try {
       const { email, password } = formData;
       const result = await createUserWithEmailAndPassword(email.trim(), password.trim());
       sessionStorage.setItem('user', true);
       console.log('USER: ', result);
  } catch (error) {
      console.error(error);
  }
};
  
  const handleGoogleLogin = async () => {
    try {
      await logInGoogle();
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
    <section className="p-3 bg-dark text-dark-emphasis rounded">
      <h3 className="text-center">{isRegisterForm ? 'Register' : 'Login'}</h3>
      <Formik
        validationSchema={schema}
        onSubmit={handleAuthSubmit}
        onChange={() => console.log('HERE AGAIN')}
        initialValues={{ email: '', password: '' }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail" className="my-3">
              <FloatingLabel controlId="floatingEmail" label="Email">
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={values.email} 
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                  className="bg-dark-subtle"
                />

                <Form.Control.Feedback type="invalid">
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
                  className="bg-dark-subtle"
                />

                <Form.Control.Feedback type="invalid">
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
                    className="bg-dark-subtle"
                  />

                  <Form.Control.Feedback type="invalid">
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

            <Button variant='link' onClick={handleGoogleLogin} className="d-block mx-auto mt-3">
              Login With Google
            </Button>
          </Form>
        )}
      </Formik>
    </section>
  )
}

export default AuthenticationForm