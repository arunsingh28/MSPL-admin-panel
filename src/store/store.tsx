import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import authSlice from './slices/authSlice'
import TutuorialSlice from './slices/TutuorialSlice'

// configureStore is a function that accepts a Redux configuration object
export const store = configureStore({
    reducer: {
        auth: authSlice,
        tutorial: TutuorialSlice
    },
    // devTools: process.env.NODE_ENV !== 'production',
    // devTools: false
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
// setupListeners is a function that accepts a dispatch function
setupListeners(store.dispatch)