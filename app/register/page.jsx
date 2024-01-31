'use client'

import React, { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/app/lib/firebase/config';
import { UserAuth } from '@/app/lib/context/AuthContext';

// React Bootstrap Components.
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
    const { logInGoogle } = UserAuth();

    const handleRegisterUser = async e => {
        e.preventDefault();

        try {
             const result = await createUserWithEmailAndPassword(email.trim(), password.trim());
             sessionStorage.setItem('user', true);
             setEmail('');
             setPassword('');
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogIn = async () => {
      try {
          await logInGoogle();
      } catch (error) {
          console.error(error);
      }
    };

  return (
    <section>
      <Form onSubmit={handleRegisterUser}>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
              type="email"
              placeholder="Enter email"
              value={email} 
              onChange={e => setEmail(e.target.value)}
          />

          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>

        <Button variant='link' onClick={handleLogIn}>
            Login With Google
        </Button>
      </Form>
    </section>
  );
}

export default RegisterPage;