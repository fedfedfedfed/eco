// themeReducer.js

import { createSlice } from "@reduxjs/toolkit";

// Створюємо slice (частину) для управління темою
const themeSlice = createSlice({
  name: "theme",
  initialState: {
    // Початковий стан, може містити, наприклад, тему "light" чи "dark"
    mode: "light",
  },
  reducers: {
    // Додайте дії для зміни теми
    toggleTheme: (state) => {
      // Якщо тема "light", змініть її на "dark", і навпаки
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

// Експортуємо дії (actions) та редуктор
export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
