'use client'

import React, { useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/config';
import { useRouter } from 'next/navigation';

// React Bootstrap Components.
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
    const router = useRouter();

    const handleLoginUser = async e => {
        e.preventDefault();

        try {
            const result = await signInWithEmailAndPassword(email.trim(), password.trim());
            sessionStorage.setItem('user', true);
            setEmail('');
            setPassword('');
            console.log('New user login: ', result);
            router.push('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Form onSubmit={handleLoginUser}>
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

export default LoginPage;