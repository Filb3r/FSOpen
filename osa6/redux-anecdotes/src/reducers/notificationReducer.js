import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        createNotification(state, action) {
            const content = action.payload
            return content
        },
        removeNotification() {
            return initialState
        }
    }
})

export const { removeNotification, createNotification } = notificationSlice.actions
export default notificationSlice.reducer