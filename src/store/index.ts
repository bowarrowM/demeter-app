import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import weatherSlice from './slices/weatherSlice';
import localeSlice from './slices/localeSlice';
import userSlice from './slices/userSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedWeatherReducer = persistReducer(persistConfig, weatherSlice);

export const store = configureStore({
  reducer: {
    weather: persistedWeatherReducer,
    locale: localeSlice,
    user: userSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


// npm run dev error:

//  ✓ Compiled /_not-found in 350ms (768 modules)
// redux-persist failed to create sync storage. falling back to noop storage.