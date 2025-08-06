import { contactReducer, filterReducer } from './reducers'
import { persistStore, persistReducer,
  FLUSH, REHYDRATE, PAUSE,
  PERSIST, PURGE, REGISTER } from 'redux-persist';
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storage from "redux-persist/lib/storage"; // localStorage?

const persistConfig = {
  key: "root", // кореневий ключ для збереження даних
  storage,
  whitelist: [
    'cont', 'fil'
  ]
};
const persistedContactReducer = persistReducer(persistConfig, contactReducer);

export const store = configureStore({
  reducer: combineReducers({
    // cont: persistedContactReducer,
    cont: contactReducer,
    fil: filterReducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);