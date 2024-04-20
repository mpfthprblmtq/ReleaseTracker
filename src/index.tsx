import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App.tsx'
import {PersistGate} from "redux-persist/integration/react";
import store from "./redux/store.ts";
import {Provider} from "react-redux";
import {persistStore} from "redux-persist";

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
