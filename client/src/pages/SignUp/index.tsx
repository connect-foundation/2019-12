import React, { useState, useEffect } from 'react';
import SignUpTemplate from './template';
import SignUpForm from '../../components/organisms/SignUpForm';
import Btn from '../../components/atoms/Btn';

function SignUpPage(): React.ReactElement {
  const [state, setState] = useState({
    email: '',
    lastName: '',
    firstName: '',
    phoneNumber: '',
    password: '',
  });
  useEffect(() => {
    console.log(state);
  });
  const updateField = (e: any) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <SignUpTemplate
      header={<Btn content={'대충 로고'} to="/" />}
      content={<SignUpForm state={state} setState={updateField} />}
    />
  );
}

export default SignUpPage;
