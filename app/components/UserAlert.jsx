import React from 'react';

// React Bootstrap Components.
import Alert from 'react-bootstrap/Alert';

const UserAlert = ({ userAlert: { variant = 'primary', headingLabel = 'Alert', message = 'Insert error message here.' }, setUserAlert = () => null }) => {
  const handleOnClose = () => setUserAlert(null);

  return (
    <Alert variant={variant} onClose={handleOnClose} dismissible>
        <Alert.Heading>{headingLabel}</Alert.Heading>
        <p>
            {message}
        </p>
    </Alert>
  )
}

export default UserAlert;