/* eslint-disable comma-dangle */
import AsyncStorage from '@react-native-community/async-storage';
import { StyleProvider, View, Text } from 'native-base';
import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { logger } from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/es/integration/react';
import thunk from 'redux-thunk';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import Root from './app/Navigation';
import rootReducer from './app/Redux/Reducers/';

const persistConfig = {
  timeout: 10000,
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['video', 'colors'],
};
const args = __DEV__ ? [thunk, logger] : [thunk];

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(...args));
const persistor = persistStore(store);
const App = (props) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StyleProvider style={getTheme(material)}>
          <Root />
        </StyleProvider>
      </PersistGate>
    </Provider>
  );
};
export default App;
