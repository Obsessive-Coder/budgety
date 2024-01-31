'use client'

import React, { useState } from 'react';
import { useSignInWithEmailAndPassword, useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/app/lib/firebase/config';
import { UserAuth } from '@/app/lib/context/AuthContext';

// React Bootstrap Components.
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const AuthenticationForm = ({toggleIsRegisterForm, isRegisterForm = false}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
  const { logInGoogle } = UserAuth();

  const handleEmailLogin = async () => {
    try {
        const result = await signInWithEmailAndPassword(email.trim(), password.trim());
        sessionStorage.setItem('user', true);
        setEmail('');
        setPassword('');
    } catch (error) {
        console.error(error);
    }
};

const handleEmailRegistration = async () => {
  try {
       const result = await createUserWithEmailAndPassword(email.trim(), password.trim());
       sessionStorage.setItem('user', true);
       setEmail('');
       setPassword('');
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

  const handleSubmit = event => {
    event.preventDefault();

    if (isRegisterForm) {
      handleEmailRegistration();
    } else {
      handleEmailLogin();
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {isRegisterForm && (
        <Form.Group controlId="formUsername" className="my-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="bg-dark-subtle"
          />
        </Form.Group>
      )}

      <Form.Group controlId="formEmail" className="my-3">
        <Form.Label>Email Address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email} 
          onChange={e => setEmail(e.target.value)}
          className="bg-dark-subtle"
        />
      </Form.Group>

      <Form.Group controlId="formPassword" className="my-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="bg-dark-subtle"
        />
      </Form.Group>

      {isRegisterForm && (
        <Form.Group controlId="formPasswordConfirm" className="my-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={passwordConfirm}
            onChange={e => setPasswordConfirm(e.target.value)}
            className="bg-dark-subtle"
          />
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
  )
}

export default AuthenticationForm