import React from 'react';
import { default as AccountStoreProvider } from './accountStore';
import { default as AfterLoginStoreProvider } from './afterLoginStore';

export default function GlobalStore({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <AfterLoginStoreProvider>
      <AccountStoreProvider>{children}</AccountStoreProvider>
    </AfterLoginStoreProvider>
  );
}
