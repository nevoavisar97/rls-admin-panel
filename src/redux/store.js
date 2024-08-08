// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice"; // Import the new userSlice

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer, // Add userReducer to the store
  },
});

export default store;
