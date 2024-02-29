'use client';

import { Provider } from 'react-redux';
import React, { ReactNode } from 'react';

import { store } from './store';

const StoreProvider = ({ children }: { children: ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
