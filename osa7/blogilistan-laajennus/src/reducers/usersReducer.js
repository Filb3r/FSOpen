import { createSlice } from "@reduxjs/toolkit";

const initialState = [{
    username: 'pekka'
}
]

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser(state, action) {
            state.push({username: action.payload})
        }
    }
})

export const { addUser } = usersSlice.actions

export default usersSlice.reducer