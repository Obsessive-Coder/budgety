import React from 'react';

// NextJS Components.
import Link from 'next/link'

// Bootstrap Components.
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Image from 'react-bootstrap/Image';

const UserImage = () => {
    return <Image src="https://placehold.co/32x32/png" alt="profile-photo" roundedCircle />;
};

const UserDropdown = ({ handleLogOut }) => {
  return (
    <DropdownButton title={<UserImage />} className="bg-transparent user-dropdown">
      <Dropdown.Item href="/profile" as={Link}>Profile</Dropdown.Item>
      <Dropdown.Item as="button" onClick={handleLogOut}>
        Logout
      </Dropdown.Item>
    </DropdownButton>
  )
}

export default UserDropdown;