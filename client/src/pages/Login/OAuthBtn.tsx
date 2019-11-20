import * as React from 'react';

const AuthURL = `http://localhost:13000/api/auth?returnTo=/login`;

const OAuthBtn: React.FC = () => {
  return (
    <div>
      <button
        onClick={() => {
          window.location.href = AuthURL;
        }}
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default OAuthBtn;
