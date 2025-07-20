import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  profile: unknown; //any
  preferences: {
    theme: 'light' | 'dark';
    notifications: boolean;
  };
}

const initialState: UserState = {
  profile: null,
  preferences: {
    theme: 'light',
    notifications: true,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<unknown>) => {
      state.profile = action.payload;
    },
    updatePreferences: (
      state,
      action: PayloadAction<Partial<UserState['preferences']>>
    ) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
  },
});

export const { setProfile, updatePreferences } = userSlice.actions;
export default userSlice.reducer;
