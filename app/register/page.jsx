'use client'

import React, { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/config';

// React Bootstrap Components.
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);

    const handleRegisterUser = async e => {
        e.preventDefault();

        try {
             const result = await createUserWithEmailAndPassword(email.trim(), password.trim());
             sessionStorage.setItem('user', true);
             setEmail('');
             setPassword('');
            console.log('New user registered: ', result);
        } catch (error) {
            console.error(error);
        }
    };

  return (
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
    </Form>
  );
}

export default RegisterPage;