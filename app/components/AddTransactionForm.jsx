'use client'

import React from 'react';

// Form Validation.
import * as formik from 'formik';

// React Bootstrap Components.
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

// Custom Imports.
import { UserTransactions } from '@/app/lib/context/TransactionsContext';
import { transactionSchema } from '@/app/lib/constants/yup';
import { formGroups } from '@/app/lib/constants/transactions';

const FormGroup = ({ labelText, controlType, controlProps, errorText, items = [] }) => {
    const removeWhitespace = value => value.replace(' ', '');

    return (
        <Form.Group controlId={`form${removeWhitespace(labelText)}`}  className="m-2 flex-basis-100">
            <FloatingLabel controlId={`floating${removeWhitespace(labelText)}`} label={labelText} className="text-capitalize">
                {controlType === 'select' && (
                    <Form.Select size="sm" className="text-capitalize" {...controlProps}>
                        <option value={null}>-- select one --</option>

                        {items.map(({ id, definition }) => (
                            <option key={`${removeWhitespace(labelText)}-${id}`} value={id}>
                                {definition}
                            </option>
                        ))}
                    </Form.Select>
                )}

                {controlType === 'control' && (
                    <Form.Control size="sm" {...controlProps} />
                )}

                <Form.Control.Feedback type="invalid" style={{ overflowWrap: 'break-word' }} className="text-start">
                    {errorText}
                </Form.Control.Feedback>
            </FloatingLabel>
        </Form.Group>
    );
};

const AddTransactionForm = ({ handleAddTransaction, handleCloseSidebar }) => {
  const { transactionTypes: typeIds, transactionCategories: categoryIds, accountTypes: accountIds } = UserTransactions();
  const { Formik } = formik;

  const selectItemsData = { typeIds, categoryIds, accountIds };

  const initialValues = formGroups
    .map((items) => items.map(({ controlProps: { name } }) => name))
    .flat()
    .reduce((prev, key) => ({ ...prev, [key]: '' }), {});

  return (
    <Formik
        validationSchema={transactionSchema}
        onSubmit={handleAddTransaction}
        initialValues={initialValues}
        validateOnChange={false}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
                {formGroups.map((items, index) => (
                    <div key={`form-groups-${index}`} className="d-flex">
                        {items.map(({ labelText, controlType, controlProps: { name, ...controlProps } }) => (
                            <FormGroup
                                key={`formGroup-${labelText}`}
                                labelText={labelText}
                                controlType={controlType}
                                items={selectItemsData[`${name}s`] || []}
                                errorText={errors[name]}
                                controlProps={{
                                    ...controlProps,
                                    name,
                                    value: values[name],
                                    onChange: handleChange,
                                    isInvalid: !!errors[name]
                                }}
                            />
                        ))}
                    </div>
                ))}

                <div className="d-flex justify-content-end">
                    <Button variant="link" onClick={handleCloseSidebar}>
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