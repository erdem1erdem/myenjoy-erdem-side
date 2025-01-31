import { createSlice } from '@reduxjs/toolkit'
const ChannelUrlSlice = createSlice({
    name: 'channelUrl',
    initialState: {
        value: null
    },
    reducers: {
        setChannelUrl: (state, action)=>{
            state.value= action?.payload
        }
    }
})
export const { setChannelUrl } = ChannelUrlSlice.actions
export default ChannelUrlSlice.reducer
