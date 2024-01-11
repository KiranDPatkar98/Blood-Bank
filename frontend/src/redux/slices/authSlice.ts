import { createSlice } from '@reduxjs/toolkit';
import { LoginStates } from '../../types/LoginState';

const appSlice = createSlice({
    name: 'app',
    initialState: {
        loginState: LoginStates.LOADING,
        isSuperUser: false,
        sessionExpired: false,
    },
    reducers: {
        updatedLoginState(state, action) {
            return {
                ...state,
                loginState: action.payload
            };
        },
        updateIsSuperUser(state,action){
            return {
                ...state,
                isSuperUser: action.payload
            };

        },
        updatedSessionExpired(state, action){
            return {
                ...state,
                sessionExpired: action.payload
            }
        },

    }
});

export const {
    updatedLoginState, updateIsSuperUser, updatedSessionExpired
} = appSlice.actions;

export default appSlice.reducer;
