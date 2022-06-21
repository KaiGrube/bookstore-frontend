import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from './_store/store.js';
import App from "./App.jsx";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
        <HashRouter>
          <App/>
        </HashRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);