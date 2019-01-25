import React from "react";
import Home from "./pages/home";
import { Provider } from "react-redux";

import { store } from "./reducers/store";

export default () => (
  <Provider store={store}>
    <Home />
  </Provider>
);
