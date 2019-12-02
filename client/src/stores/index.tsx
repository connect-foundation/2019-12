import React from 'react';
import { default as AccountStoreProvider } from './accountStore';

export default function GlobalStore({
  children,
}: {
  children: React.ReactElement;
}) {
  return <AccountStoreProvider>{children}</AccountStoreProvider>;
}
