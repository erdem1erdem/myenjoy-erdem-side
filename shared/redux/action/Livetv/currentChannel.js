import { createSlice } from '@reduxjs/toolkit'
const CurrentChannelSlice = createSlice({
    name: 'currentChannel',
    initialState: {
        value: false
    },
    reducers: {
        setCurrentChannel: (state, action)=>{
            state.value= action?.payload
        },
        clearCurrentChannel: state => {
            state.value= null
        },
    }
})
export const { setCurrentChannel, clearCurrentChannel } = CurrentChannelSlice.actions
export default CurrentChannelSlice.reducer
