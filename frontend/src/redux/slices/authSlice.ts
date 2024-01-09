import { createSlice } from '@reduxjs/toolkit';
import { LoginStates } from '../../types/LoginState';

const appSlice = createSlice({
    name: 'app',
    initialState: {
        loginState: LoginStates.LOADING,
        tokenExpired: false,
    },
    reducers: {
        updatedLoginState(state, action) {
            return {
                ...state,
                loginState: action.payload
            };
        },
        updatedTokenExpired(state, action){
            return {
                ...state,
                tokenExpired: action.payload
            }
        }
    }
});

export const {
    updatedLoginState
} = appSlice.actions;

export default appSlice.reducer;
