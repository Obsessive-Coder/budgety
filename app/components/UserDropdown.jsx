import React from 'react';

// NextJS Components.
import Link from 'next/link'

// Bootstrap Components.
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Image from 'react-bootstrap/Image';

// Custom Imports.
import { UserAuth } from '@/app/lib/context/AuthContext';

const dropdownItems = ['account'];
const defaultProfileImage = 'https://placehold.co/32x32/png';

const UserImage = () => {
    const { user } = UserAuth();
    if (!user) return null;
    const { photoURL } = user;

    return (
        <Image roundedCircle src={photoURL ?? defaultProfileImage} alt="profile photo" className="user-image" />
    );
};

const UserDropdown = ({ handleLogOut }) => {
    const { user } = UserAuth();
    if (!user) return null;
    const { displayName, email } = user;

  return (
    <DropdownButton title={<UserImage />} className="bg-transparent user-dropdown">
      <Dropdown.ItemText>{displayName ?? email}</Dropdown.ItemText>

      <Dropdown.Divider />

      {dropdownItems.map(labelText => (
        <Dropdown.Item key={`user-dropdown-item-${labelText}`} href={`/${labelText}`} as={Link} className="text-capitalize">
            {labelText}
        </Dropdown.Item>
      ))}

      <Dropdown.Divider />

      <Dropdown.Item as="button" onClick={handleLogOut}>
        Logout
      </Dropdown.Item>
    </DropdownButton>
  )
}

export default UserDropdown;