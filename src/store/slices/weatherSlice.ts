import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WeatherState {
  currentWeather: any;
  weeklyWeather: any[];
  yearlyWeather: any[];
  selectedCity: string;
  selectedCountry: string;
  isLoading: boolean;
}

const initialState: WeatherState = {
  currentWeather: null,
  weeklyWeather: [],
  yearlyWeather: [],
  selectedCity: 'Istanbul',
  selectedCountry: 'Turkey',
  isLoading: false,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setCurrentWeather: (state, action: PayloadAction<any>) => {
      state.currentWeather = action.payload;
    },
    setWeeklyWeather: (state, action: PayloadAction<any[]>) => {
      state.weeklyWeather = action.payload;
    },
    setYearlyWeather: (state, action: PayloadAction<any[]>) => {
      state.yearlyWeather = action.payload;
    },
    setLocation: (
      state,
      action: PayloadAction<{ city: string; country: string }>
    ) => {
      state.selectedCity = action.payload.city;
      state.selectedCountry = action.payload.country;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setCurrentWeather,
  setWeeklyWeather,
  setYearlyWeather,
  setLocation,
  setLoading,
} = weatherSlice.actions;
export default weatherSlice.reducer;
