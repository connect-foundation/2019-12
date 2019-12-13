import React from 'react';
import { default as AccountStoreProvider } from './accountStore';
import { default as AfterLoginStoreProvider } from './afterLoginStore';
import { default as EventsProvider } from './eventsStore';

export default function GlobalStore({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <AfterLoginStoreProvider>
      <AccountStoreProvider>
        <EventsProvider>{children}</EventsProvider>
      </AccountStoreProvider>
    </AfterLoginStoreProvider>
  );
}
