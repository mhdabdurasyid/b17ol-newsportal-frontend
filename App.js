import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

// import store & persistor
import {store, persistor} from './src/redux/store';

import Main from './src/screens/Main';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
  );
}
