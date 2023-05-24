import React from "react";
import { Provider } from 'react-redux';
import store from './Constant/store';
import TabNavigator from './tabNavigation/TabNavigator';

export default function App() {
  return (
    <Provider store={store}>
      <TabNavigator />
    </Provider>
  );
}
