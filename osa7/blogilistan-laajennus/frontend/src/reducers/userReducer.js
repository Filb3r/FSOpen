import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    token: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.currentUser = action.payload.username
            state.token = action.payload.token
        },
        logoutUser(state, action){
            state.currentUser = null
            state.token = null
        }
    }
})

export const { setUser, logoutUser } = userSlice.actions

export default userSlice.reducer