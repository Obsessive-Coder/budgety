export const transactionsColumnLabels = ['otherPartyId', 'amount', 'categoryId', 'accountId', 'date', 'note'];

export const formGroups = [[{
    labelText: 'transaction type',
    controlType: 'select',
    controlProps: {
        name: 'typeId',
        'aria-label': 'Select transaction type'
    }
  }, {
    labelText: 'account',
    controlType: 'select',
    controlProps: {
        name: 'accountId',
        'aria-label': 'Select an account type'
    }
  }], [{
    labelText: 'category',
    controlType: 'custom',
    controlProps: {
        name: 'categoryId',
        'aria-label': 'Select a transaction category'
    }
  }, {
    labelText: 'amount',
    controlType: 'control',
    controlProps: {
        name: 'amount',
        'aria-label': 'Enter a transaction amount',
        type: 'number',
        placeholder: '0',
        step: '0.01',
        min: '0'
    }
  }], [{
    labelText: 'other party',
    controlType: 'custom',
    controlProps: {
      name: 'otherPartyId',
      'aria-label': 'Party who paid or received this transaction',
      placeholder: 'Other Party',
      className: 'form-control form-control-sm'
    }
  }], [{
    labelText: 'date',
    controlType: 'control',
    controlProps: {
        name: 'date',
        'aria-label': 'Enter or select a transaction date',
        type: 'date',
        placeholder: 'Enter or select a data'
    }
  }, {
    labelText: 'time',
    controlType: 'control',
    controlProps: {
        name: 'time',
        'aria-label': 'Enter a transaction time',
        type: 'time',
        placeholder: 'Enter a time'
    }
  }], [{
    labelText: 'note',
    controlType: 'control',
    controlProps: {
        name: 'note',
        'aria-label': 'Add a note (optional)',
        as: 'textarea',
        placeholder: 'Add a note (optional)',
        style:{ height: 150 }
    }
  }]];