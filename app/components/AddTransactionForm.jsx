'use client'

import React from "react";

// Form Validation.
import * as formik from 'formik';

// React Bootstrap Components.
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

// Custom Imports.
import { UserTransactions } from '@/app/lib/context/TransactionsContext';
import { transactionSchema } from '@/app/lib/constants/yup';

const AddTransactionForm = ({ handleAddTransaction }) => {
  const { transactionTypes, transactionCategories, accountTypes } = UserTransactions();
  const { Formik } = formik;

  return (
    <Formik
        validationSchema={transactionSchema}
        onSubmit={handleAddTransaction}
        initialValues={{ 
            typeId: undefined, 
            categoryId: undefined, 
            amount: undefined,
            accountId:undefined,
            date: undefined,
            time: undefined,
            note: undefined
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
                                className="text-capitalize"
                            >
                                <option value={null}>-- select one --</option>

                                {transactionTypes.map(({ id, definition }) => (
                                    <option key={`transaction-type-${id}`} value={id}>
                                        {definition}
                                    </option>
                                ))}
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
                                className="text-capitalize"
                            >
                                <option value={undefined}>-- select one --</option>

                                {transactionCategories.map(({ id, definition }) => (
                                    <option key={`transaction-categories-${id}`} value={id}>
                                        {definition}
                                    </option>
                                ))}
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
                                className="text-capitalize"
                            >
                                <option value={undefined}>-- select one --</option>

                                {accountTypes.map(({ id, definition }) => (
                                    <option key={`account-types-${id}`} value={id}>
                                        {definition}
                                    </option>
                                ))}
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
                                name="note"
                                size="sm"
                                placeholder="Add a note"
                                style={{ height: 150 }}
                                value={values.note}
                                onChange={handleChange}
                                isInvalid={!!errors.note}
                            />

                            <Form.Control.Feedback type="invalid" style={{ overflowWrap: 'break-word' }} className="text-start">
                                {errors.note}
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