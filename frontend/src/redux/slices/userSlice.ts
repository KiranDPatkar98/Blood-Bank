import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'users',
    initialState: {
        users:[],
    },
    reducers: {
        receivedUsers(state, action) {
            return {
                ...state,
                users: action.payload
            };
        }
    }
});

export const {
    receivedUsers
} = userSlice.actions;

export default userSlice.reducer;
