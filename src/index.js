import React from "react";
import { createRoot } from "react-dom/client";
import App from "./frontend/components/App";
import store from './frontend/redux/store'; // Імпортуємо магазин
import { Provider } from 'react-redux'; // Імпортуємо Provider з react-redux

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    {/* Оточте дерево компонентів Provider */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
