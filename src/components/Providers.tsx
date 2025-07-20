'use client';

import { SessionProvider } from 'next-auth/react';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { IntlProvider } from 'react-intl';
import { store, persistor, RootState } from '@/store'; // import RootState from your store

import enMessages from '@/locales/en.json';
import trMessages from '@/locales/tr.json';

// Flatten nested objects (locale.json respone) - redux does not allow un-flattened
function flattenMessages(
  nestedMessages: Record<string, any>,
  prefix = ''
): Record<string, string> {
  return Object.keys(nestedMessages).reduce(
    (messages, key) => {
      const value = nestedMessages[key];
      const prefixedKey = prefix ? `${prefix}.${key}` : key;

      if (typeof value === 'string') {
        messages[prefixedKey] = value;
      } else {
        Object.assign(messages, flattenMessages(value, prefixedKey));
      }

      return messages;
    },
    {} as Record<string, string>
  );
}

//  messages
const messages = {
  en: flattenMessages(enMessages),
  tr: flattenMessages(trMessages),
};

//  Intl wrapper -> uses Redux's locale state
function IntlProviderWrapper({ children }: { children: React.ReactNode }) {
  const locale = useSelector((state: RootState) => state.locale.current);

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      {children}
    </IntlProvider>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
          <IntlProviderWrapper>{children}</IntlProviderWrapper>
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
}
