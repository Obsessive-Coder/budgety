'use client'

import React, { useState } from 'react';

// Form Validation.
import { Formik } from 'formik';

// React Bootstrap Components.
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

// Custom Components.
import CategoriesDropdown from '../components/CategoriesDropdown';
import TypeAhead from '../components/TypeAhead';

// Custom Imports.
import { UserTransactions } from '@/app/lib/context/TransactionsContext';
import { transactionSchema } from '@/app/lib/constants/yup';
import { formGroups } from '@/app/lib/constants/transactions';
import { removeWhitespace, USDollar } from '@/app/lib/helpers/global';

const Option = ({ labelText, ...props }) => {
    return (
        <option {...props}>
            {labelText}
        </option>
    );
};

const FormGroup = ({ labelText, controlType, controlProps, errorText, categories = [], items = [], isDisabled = false }) => {
    const spacelessLabelText = removeWhitespace(labelText);

    return (
        <Form.Group controlId={`form${spacelessLabelText}`}  className="m-2 flex-basis-100">
            {controlProps.name === 'categoryId' && (
                <Form.Control
                    size="sm"
                    disabled={isDisabled}
                    // eslint-disable-next-line react/display-name
                    as={React.forwardRef((props, ref) => <CategoriesDropdown {...props} ref={ref} />)}
                    items={items}
                    categories={categories}
                    isSmallImage={true}
                    errorText={errorText}
                    isDisabled={isDisabled}
                    controlProps={controlProps}
                />
            )}

            {controlProps.name === 'otherPartyId' && (
                <TypeAhead controlProps={controlProps} />
            )}

            {controlType !== 'custom' && (
                <FloatingLabel controlId={`floating${spacelessLabelText}`} label={labelText} className="text-capitalize">
                    {controlType === 'select' && (
                        <Form.Select size="sm" className="text-capitalize" {...controlProps} disabled={isDisabled}>
                            <option value={null}>-- select one --</option>

                            {items.map(({ id, definition, items = [] }) => (
                                <Option key={`option-${spacelessLabelText}-${id}`} labelText={definition} value={id} />
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
            )}
        </Form.Group>
    );
};

const AddTransactionForm = ({ isEditing = false, editingItemData, handleAddTransaction, handleUpdateTransaction, handleCloseSidebar }) => {
  const { transactionTypes: typeIds, transactionCategories: categoryIds, accountTypes: accountIds } = UserTransactions();
  const [selectItemsData, setSelectItemsData] = useState({ typeIds, categoryIds, accountIds });

  const initialValues = formGroups
    .map((items) => items.map(({ controlProps: { name } }) => name))
    .flat()
    .reduce((prev, key) => ({
        ...prev,
        [key]: key === 'date' ? new Date().toJSON().slice(0, 10) : editingItemData ? editingItemData[key] : ''
    }), {});

  const handleOnChange = (event, setFieldValue, callback) => {
    const { value, name } = event.currentTarget;

    const isRefund = typeIds.filter(({ id, definition }) => id === value && definition === 'refund').length > 0;
    const [{ id: expenseTypeId }] = typeIds.filter(({ definition }) => definition === 'expense');
    const categories = categoryIds.filter(({ transactionTypeId }) => isRefund ? transactionTypeId === expenseTypeId : transactionTypeId === value);

    if (name === 'categoryId' && value) {
        setFieldValue(name, value, false);
    }

    if (name === 'otherPartyId' && !value) {
        setFieldValue(name, value, false);
    }
    
    if (name === 'typeId') {
        setSelectItemsData({ ...selectItemsData, categoryIds: categories });

        if (isRefund) {

        }
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
        {({ handleSubmit, handleChange, values, touched, errors, setFieldValue }) => {
            return (
                <Form noValidate id="transaction-form" onSubmit={handleSubmit}>
                    {formGroups.map((items, index) => (
                        <div key={`form-groups-${index}`} className="d-flex">
                            {items.map(({ labelText, controlType, controlProps: { name, ...controlProps } }) => (
                                <FormGroup
                                    key={`formGroup-${labelText}`}
                                    labelText={labelText}
                                    controlType={controlType}
                                    items={selectItemsData[`${name}s`] || []}
                                    errorText={errors[name]}
                                    categories={categoryIds}
                                    isDisabled={name === 'categoryId' && (!values.typeId || values.typeId === '-- select one --')}
                                    controlProps={{
                                        ...controlProps,
                                        name,
                                        value: values[name],
                                        isInvalid: !!errors[name],
                                        onChange: event => handleOnChange(event, setFieldValue, handleChange)
                                    }}
                                />
                            ))}
                        </div>
                    ))}
    
                    <div className="d-flex justify-content-end p-2">
                        <Button variant="link" onClick={handleCloseSidebar} className="text-danger">
                            Cancel
                        </Button>
    
                        <Button variant="outline-primary" type="submit" className="text-capitalize">
                            {isEditing ? 'update transaction' : 'add transaction'}
                        </Button>
                    </div>
                </Form>
            )
        }}
    </Formik>
  )
}

export default AddTransactionForm;