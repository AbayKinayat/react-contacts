import { configureStore, combineReducers, isRejected } from '@reduxjs/toolkit';
import authReducer from './reducers/auth-slice/AuthSlice';
import contactsReducer from './reducers/contacts-slice/ContactsSlice';
import currentPageReducer from './reducers/current-page-slice/CurrentPageSlice';

const rootReducer = combineReducers({
  authReducer,
  contactsReducer,
  currentPageReducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch