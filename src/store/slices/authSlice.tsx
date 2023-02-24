import { createSlice,PayloadAction } from '@reduxjs/toolkit'
import {RootState} from '../store'

export interface AuthState {
    user: any
    token: string
    roles?: number[]
    isAuthenticated: boolean
}


const initialState: AuthState = {
    user: null,
    token: '',
    roles: [],
    isAuthenticated: false,
}

// Create a slice of state
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        auth: (state, action:PayloadAction<AuthState>) => {
            state.user = action.payload.user
            state.token = action.payload.token
            state.isAuthenticated = true
            // state.isLoading = false
            // state.error = null
        },
        logout: (state) => {
            state.user = null
            state.token = ''
            state.isAuthenticated = false
            // state.isLoading = false
            // state.error = null
        }
    }
})

// Export the slice reducer
export const { auth,logout } = authSlice.actions
export default authSlice.reducer
