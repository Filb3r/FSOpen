import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        createNotification(state, action) {
            const content = action.payload
            state.push({
                content
            })
        }
    }

})

export const {createNotification} = notificationSlice.actions
export default notificationSlice.reducer