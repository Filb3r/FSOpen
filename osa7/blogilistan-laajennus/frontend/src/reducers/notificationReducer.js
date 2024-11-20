import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        createNotification(action) {
            const content = action.payload
            return content
        },
        removeNotification() {
            return initialState
        }
    }
})

export const { removeNotification, createNotification } = notificationSlice.actions

export const setNotification = (content, time) => {
    return async dispatch => {
        dispatch(createNotification(content))
        setTimeout(() => {
            dispatch(removeNotification())
        }, time * 1000)
    }
}
export default notificationSlice.reducer