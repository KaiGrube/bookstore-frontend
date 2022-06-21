import { createSlice } from '@reduxjs/toolkit';

export const initialSettingsState = {
  darkMode: false,
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: initialSettingsState,
  reducers: {
    toggleDarkMode: (state, action) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const {
  toggleDarkMode,
} = settingsSlice.actions;


export const selectDarkMode = state => state.settings.darkMode;

export default settingsSlice.reducer;