import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux'
import app from './slices/authSlice';
import users from './slices/userSlice'

const rootReducer = combineReducers({
  app,
  users

});

const store = configureStore({
  devTools: true,
  reducer: rootReducer,
});

export default store;