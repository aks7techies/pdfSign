import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import profileDataReducer from './slices/ProfileData';
import adminData from './slices/adminData';
import historyDataReducer from './slices/historyDraftData';
import clientDataReducer from './slices/clientData';

const persistConfig = {
  key: 'root',
  storage,
};

// Combine all reducers into a single reducer
const rootReducer = combineReducers({
  profile: adminData,
  history: historyDataReducer,
  client: clientDataReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
