import React from 'react';

// React Bootstrap Components.
import Alert from 'react-bootstrap/Alert';

const UserAlert = ({ userAlert: { variant = 'primary', headingLabel = 'Alert', message = 'Insert error message here.' }, setUserAlert = () => null }) => {
  const handleOnClose = () => setUserAlert(null);

  return (
    <Alert dismissible variant={variant} onClose={handleOnClose} className="w-50 p-2 mx-auto">
        <Alert.Heading>{headingLabel}</Alert.Heading>
        <p className="m-0">
            {message}
        </p>
    </Alert>
  )
}

export default UserAlert;