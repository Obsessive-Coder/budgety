'use client'

import React, { useState } from "react";

// Form Validation.
import * as formik from 'formik';
import * as yup from 'yup';

// React Bootstrap Components.
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

const AddTransactionForm = () => {
    const [startDate, setStartDate] = useState(new Date());

    const handleSubmit = () => {
        alert('Add transaction')
    };

  return (
    <Form noValidate onSubmit={handleSubmit}>
        <div className="d-flex">
            <Form.Group controlId="formTransactionType" className="m-2 flex-basis-100">
                <FloatingLabel controlId="floatingTransactionType" label="Transaction Type">
                    <Form.Select size="sm" aria-label="Select transaction type">
                        <option>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>
                </FloatingLabel>
            </Form.Group>

            <Form.Group controlId="formCategory" className="m-2 flex-basis-100">
                <FloatingLabel controlId="floatingCategory" label="Category">
                    <Form.Select size="sm" aria-label="Select transaction category">
                        <option>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>
                </FloatingLabel>
            </Form.Group>
        </div>

        <div className="d-flex">
            <Form.Group controlId="formAmount" className="m-2 flex-basis-100">
                <FloatingLabel controlId="floatingAmount" label="Amount">
                    <Form.Control 
                        type="number"
                        name="amount"
                        size="sm"
                        placeholder="88.88"
                    />
                </FloatingLabel>
            </Form.Group>

            <Form.Group controlId="formAccount" className="m-2 flex-basis-100">
                <FloatingLabel controlId="floatingAccount" label="Account">
                    <Form.Select size="sm" aria-label="Select transaction category">
                        <option>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>
                </FloatingLabel>
            </Form.Group>
        </div>
        
        <div className="d-flex">
            <Form.Group controlId="formDate" className="m-2 flex-basis-100">
                <FloatingLabel controlId="floatingDate" label="Date">
                    <Form.Control 
                        type="date"
                        name="date"
                        size="sm"
                        placeholder="Select a date"
                    />
                </FloatingLabel>
            </Form.Group>

            <Form.Group controlId="formTime" className="m-2 flex-basis-100">
                <FloatingLabel controlId="floatingTime" label="Time">
                    <Form.Control 
                        type="time"
                        name="time"
                        size="sm"
                        placeholder="Select a time"
                    />
                </FloatingLabel>
            </Form.Group>
        </div>

        <div className="d-flex">
            <Form.Group controlId="formNote" className="m-2 flex-basis-100">
                <FloatingLabel controlId="floatingNote" label="Note">
                    <Form.Control 
                        as="textarea"
                        name="note"
                        size="sm"
                        placeholder="Add a note"
                        style={{ height: 150 }}
                    />
                </FloatingLabel>
            </Form.Group>
        </div>
    </Form>
  )
}

export default AddTransactionForm;