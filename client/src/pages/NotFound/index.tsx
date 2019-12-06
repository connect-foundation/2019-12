import React from 'react';

import NotFoundTemplate from './template';
import ImgBtn from 'components/molecules/ImgBtn';
import ROUTES from 'commons/constants/routes';

function NotFound(): React.ReactElement {
  return (
    <NotFoundTemplate
      content={
        <ImgBtn
          alt="404 NOT FOUND"
          src="https://kr.object.ncloudstorage.com/bookus/notfound.jpg"
          to={ROUTES.HOME}
        />
      }
    />
  );
}

export default NotFound;
