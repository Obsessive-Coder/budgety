'use client'

import React, { useState } from 'react';

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
import { removeWhitespace } from '@/app/lib/helpers/global';

const Option = ({ labelText, ...props }) => {
    return (
        <option {...props}>
            {labelText}
        </option>
    );
};

const FormGroup = ({ labelText, controlType, controlProps, errorText, items = [], isDisabled = false }) => {
    const spacelessLabelText = removeWhitespace(labelText);

    return (
        <Form.Group controlId={`form${spacelessLabelText}`}  className="m-2 flex-basis-100">
            <FloatingLabel controlId={`floating${spacelessLabelText}`} label={labelText} className="text-capitalize">
                {controlType === 'select' && (
                    <Form.Select size="sm" className="text-capitalize" {...controlProps} disabled={isDisabled}>
                        <option value={null}>-- select one --</option>

                        {items.map(({ id, definition, items = [] }) => (
                            controlProps.name === 'categoryId' ? (
                                <optgroup key={`group-${spacelessLabelText}-${id}`} label={definition}>
                                    {items.map(({ id, definition }) => (
                                        <Option
                                            key={`option-${spacelessLabelText}-${id}`} 
                                            labelText={definition}
                                            value={id}
                                        />
                                    ))}
                                </optgroup>
                            ) : (
                                <Option key={`option-${spacelessLabelText}-${id}`} labelText={definition} value={id} />
                            )
                        ))}
                    </Form.Select>
                )}

                {controlType === 'control' && (
                    <Form.Control size="sm" {...controlProps}  disabled={isDisabled} />
                )}

                <Form.Control.Feedback type="invalid" style={{ overflowWrap: 'break-word' }} className="text-start">
                    {errorText}
                </Form.Control.Feedback>
            </FloatingLabel>
        </Form.Group>
    );
};

const AddTransactionForm = ({ isEditing = false, editingItemData, handleAddTransaction, handleUpdateTransaction, handleCloseSidebar }) => {
  const { transactionTypes: typeIds, transactionCategories: categoryIds, accountTypes: accountIds } = UserTransactions();
  const [selectItemsData, setSelectedItemsData] = useState({ typeIds, categoryIds, accountIds });
  const { Formik } = formik;

  const initialValues = formGroups
    .map((items) => items.map(({ controlProps: { name } }) => name))
    .flat()
    .reduce((prev, key) => {
        return ({
            ...prev,
            [key]: key === 'date' ? new Date().toJSON().slice(0,10) : ''
        });
    }, {});

    console.log(new Date().toJSON().slice(0,10))

  const handleOnChange = (event, callback) => {
    const { value, name } = event.currentTarget;

    const isRefund = typeIds.filter(({ id, definition }) => id === value && definition === 'refund').length > 0;
    const [{ id: expenseTypeId }] = typeIds.filter(({ definition }) => definition === 'expense');
    const categories = categoryIds.filter(({ transactionTypeId }) => isRefund ? transactionTypeId === expenseTypeId : transactionTypeId === value);
    
    if (name === 'typeId') {
        setSelectedItemsData({
            ...selectItemsData,
            categoryIds: categories
        })
    }

    if (callback) {
        callback(event)
    }
}

  return (
    <Formik
        validationSchema={transactionSchema}
        onSubmit={isEditing ? handleUpdateTransaction : handleAddTransaction}
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
                                isDisabled={name === 'categoryId' && (!values.typeId || values.typeId === '-- select one --')}
                                controlProps={{
                                    ...controlProps,
                                    name,
                                    value: values[name],
                                    onChange: event => handleOnChange(event, handleChange),
                                    isInvalid: !!errors[name]
                                }}
                            />
                        ))}
                    </div>
                ))}

                <div className="d-flex justify-content-end p-2">
                    <Button variant="link" onClick={handleCloseSidebar}>
                        Cancel
                    </Button>

                    <Button variant="outline-primary" type="submit" className="text-capitalize">
                        {isEditing ? 'update transaction' : 'add transaction'}
                    </Button>
                </div>
            </Form>
        )}
    </Formik>
  )
}

export default AddTransactionForm;