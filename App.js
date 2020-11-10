import React from 'react';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

// import store & persistor
import {store, persistor} from './src/redux/store';

import Main from './src/screens/Main';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
  );
}
