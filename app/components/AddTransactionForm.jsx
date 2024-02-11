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
    const { Formik } = formik;
    const [startDate, setStartDate] = useState(new Date());

    const schema = yup.object().shape({
        typeId: yup.string().required('* Required Field'),
        categoryId: yup.string().required('* Required Field'),
        amount: yup.number().required('* Required Field'),
        accountId: yup.string().required('* Required Field'),
        date: yup.date().required('* Required Field'),
        time: yup.string().required('* Required Field'),
        noteId: yup.string().required('* Required Field')
    });

    const handleAddTransaction = (formData) => {
        console.log(formData);
    };

  return (
    <Formik
        validationSchema={schema}
        onSubmit={handleAddTransaction}
        initialValues={{ 
            typeId: '', 
            categoryId: '', 
            amount: '',
            accountId: '',
            date: '',
            time: '',
            noteId: ''
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
                <div className="d-flex">
                    <Form.Group controlId="formTransactionType" className="m-2 flex-basis-100">
                        <FloatingLabel controlId="floatingTransactionType" label="Transaction Type">
                            <Form.Select
                                size="sm"
                                name="typeId"
                                aria-label="Select transaction type"
                                value={values.typeId}
                                onChange={handleChange}
                                isInvalid={!!errors.typeId} 
                            >
                                <option>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>

                            <Form.Control.Feedback type="invalid" style={{ overflowWrap: 'break-word' }} className="text-start">
                                {errors.typeId}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group controlId="formCategory" className="m-2 flex-basis-100">
                        <FloatingLabel controlId="floatingCategory" label="Category">
                            <Form.Select 
                                size="sm" 
                                name="categoryId" 
                                aria-label="Select transaction category"
                                value={values.categoryId}
                                onChange={handleChange}
                                isInvalid={!!errors.categoryId}
                            >
                                <option>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>

                            <Form.Control.Feedback type="invalid" style={{ overflowWrap: 'break-word' }} className="text-start">
                                {errors.categoryId}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                </div>

                <div className="d-flex">
                    <Form.Group controlId="formAmount" onSubmit={handleSubmit} className="m-2 flex-basis-100">
                        <FloatingLabel controlId="floatingAmount" label="Amount">
                            <Form.Control 
                                type="number"
                                name="amount"
                                size="sm"
                                placeholder="88.88"
                                value={values.amount}
                                onChange={handleChange}
                                isInvalid={!!errors.amount}
                            />

                            <Form.Control.Feedback type="invalid" style={{ overflowWrap: 'break-word' }} className="text-start">
                                {errors.amount}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group controlId="formAccount" className="m-2 flex-basis-100">
                        <FloatingLabel controlId="floatingAccount" label="Account">
                            <Form.Select 
                                size="sm"
                                name="accountId"
                                aria-label="Select an account"
                                value={values.accountId}
                                onChange={handleChange}
                                isInvalid={!!errors.accountId}
                            >
                                <option>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>

                            <Form.Control.Feedback type="invalid" style={{ overflowWrap: 'break-word' }} className="text-start">
                                {errors.accountId}
                            </Form.Control.Feedback>
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
                                value={values.date}
                                onChange={handleChange}
                                isInvalid={!!errors.date}
                            />

                            <Form.Control.Feedback type="invalid" style={{ overflowWrap: 'break-word' }} className="text-start">
                                {errors.date}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group controlId="formTime" className="m-2 flex-basis-100">
                        <FloatingLabel controlId="floatingTime" label="Time">
                            <Form.Control 
                                type="time"
                                name="time"
                                size="sm"
                                placeholder="Select a time"
                                value={values.time}
                                onChange={handleChange}
                                isInvalid={!!errors.time}
                            />

                            <Form.Control.Feedback type="invalid" style={{ overflowWrap: 'break-word' }} className="text-start">
                                {errors.time}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                </div>

                <div className="d-flex">
                    <Form.Group controlId="formNote" className="m-2 flex-basis-100">
                        <FloatingLabel controlId="floatingNote" label="Note">
                            <Form.Control 
                                as="textarea"
                                name="noteId"
                                size="sm"
                                placeholder="Add a note"
                                style={{ height: 150 }}
                                value={values.noteId}
                                onChange={handleChange}
                                isInvalid={!!errors.noteId}
                            />

                            <Form.Control.Feedback type="invalid" style={{ overflowWrap: 'break-word' }} className="text-start">
                                {errors.noteId}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                </div>

                <div className="d-flex justify-content-end">
                    <Button variant="link">
                        Cancel
                    </Button>

                    <Button variant="outline-primary" type="submit">
                        Add Transaction
                    </Button>
                </div>
            </Form>
        )}
    </Formik>
  )
}

export default AddTransactionForm;