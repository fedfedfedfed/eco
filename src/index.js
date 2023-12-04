import React from "react";
import { createRoot } from "react-dom/client";
import App from "./frontend/components/App";
import store from './frontend/redux/store'; 
import { Provider } from 'react-redux'; 

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
