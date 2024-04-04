import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import profileDataReducer from './slices/ProfileData'; // Import the entire slice
const persistConfig = {
    key: 'root',
    storage,
    // Optionally whitelist specific reducers to be persisted
    // whitelist: ['profile'],
  };
  const persistedReducer = persistReducer(persistConfig, profileDataReducer);
const Store = configureStore({
    reducer: {
        profile: persistedReducer // Use the reducer from the slice
    }
});
const persistor = persistStore(Store);

export { Store, persistor };