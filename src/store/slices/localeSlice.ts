import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LocaleState {
  current: 'en' | 'tr';
}

const initialState: LocaleState = {
  current: 'en',
};

const localeSlice = createSlice({
  name: 'locale',
  initialState,
  reducers: {
    setLocale: (state, action: PayloadAction<'en' | 'tr'>) => {
      state.current = action.payload;
    },
  },
});

export const { setLocale } = localeSlice.actions;
export default localeSlice.reducer;
