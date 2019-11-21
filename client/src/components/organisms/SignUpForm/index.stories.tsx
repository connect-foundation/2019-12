import React from 'react';
import SignUpForm from '.';

export default {
  title: 'Organisms / SignUpForm',
};

export const defaultInput: React.FC = () => {
  const [state, setState] = React.useState({
    email: '',
    lastName: '',
    firstName: '',
    phoneNumber: '',
    password: '',
  });
  const updateField = (e: any) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  return <SignUpForm state={state} setState={updateField} />;
};
