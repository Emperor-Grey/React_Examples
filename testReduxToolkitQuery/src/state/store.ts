import { configureStore } from '@reduxjs/toolkit';
import { DummyApi } from './api';

const store = configureStore({
  reducer: {
    [DummyApi.reducerPath]: DummyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(DummyApi.middleware),
});

export default store;

// setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
