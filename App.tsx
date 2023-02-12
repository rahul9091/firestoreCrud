import React from 'react';
import {Provider} from 'react-redux';
import Router from './src/Navigation/Router';
import {store} from './src/redux/store';

function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
