import * as yup from 'yup';

// Custom Imports.
import { passwordRegex } from './global';

export const emailSchema = yup.string().required().email();

export const passwordSchema = yup.string()
    .required('password is a required field')
    .min(8, 'Password must be at least 8 characters')
    .matches(passwordRegex, {
        excludeEmptyString: true,
        message: 'Password must include 1 uppercase, 1 lowercase, and 1 special character.'
    }
);

export const passwordConfirmSchema = yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords do not match')
    .required('Required')

export const newPasswordConfirmSchema = yup.string()
    .oneOf([yup.ref('newPassword'), null], 'Passwords do not match')
    .required()