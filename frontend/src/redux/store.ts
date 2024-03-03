import { configureStore } from '@reduxjs/toolkit';
import { catApi } from './api/cats';

export const store = configureStore({
  reducer: {
    // Add the API reducer to the store
    [catApi.reducerPath]: catApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling, and other features of RTK Query
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(catApi.middleware),
});
