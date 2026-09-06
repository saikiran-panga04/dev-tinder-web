import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import feedReducer from './feedSlice';
console.log("🔥 appStore.js loaded");
console.log("🔥 feedReducer:", feedReducer);
const store = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer
    }
})
console.log("🔥 STORE INITIAL STATE:", store.getState());
export default store;