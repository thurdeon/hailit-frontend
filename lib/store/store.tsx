
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import { supabaseAuthSlice } from './slice/authSlice';
import { userSlice } from './slice/userSlice';
import { onBoardingSlice } from './slice/onBoardingSlice';
import { deliveryChoiceSlice } from './slice/deliveryChoicesSlice';
import { newOrderSlice } from './slice/newOrderSlice';
import { hailitApi } from './apiSlice/hailitApi';
import { dashboardSlice } from './slice/dashboardSlice';
import { mapSlice } from './slice/mapSlice';
import { dashboardTablesSlice } from './slice/dashboardTablesSlice';
import { USER_LOGOUT } from './actions';
import { dispatcherSlice } from './slice/dispatcherSlice';
import { tripSlice } from './slice/tripSlice';

const appReducer = combineReducers({
  auth: supabaseAuthSlice.reducer,
  user: userSlice.reducer,
  onBoarding: onBoardingSlice.reducer,
  deliveryChoices: deliveryChoiceSlice.reducer,
  map: mapSlice.reducer,
  newOrder: newOrderSlice.reducer,
  dashboard: dashboardSlice.reducer,
  dashboardTables: dashboardTablesSlice.reducer,
  dispatcher: dispatcherSlice.reducer,
  trip: tripSlice.reducer,
  [hailitApi.reducerPath]: hailitApi.reducer,
});

const rootReducer = (state:any, action:any)=> {
    if (action.type === USER_LOGOUT) {
        storage.removeItem('persist:root')
        return appReducer(undefined, action)
    }  
    return appReducer(state, action)

}
// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'user', 'onBoarding', 'form', 'deliveryChoices', 'map', 'newOrder', 'dashboard'], // Add slices you want to persist
};


const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
      // serializableCheck: {

      //   ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'map'],
      // },
    }).concat([hailitApi.middleware]),
});



export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
