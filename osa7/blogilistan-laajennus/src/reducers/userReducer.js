import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.currentUser = action.payload
        },
        logoutUser(state, action){
            state.currentUser = null
        }
    }
})

export const { setUser } = userSlice.actions

export default userSlice.reducer