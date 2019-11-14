import * as React from 'react';

const AuthURL = `http://localhost:13000/api/auth`;

const OAuthBtn: React.FC = () => {
  return (
    <div>
      <button
        onClick={() => {
          window.location.href = AuthURL;
        }}
      >
        안녕
      </button>
    </div>
  );
};

export default OAuthBtn;
