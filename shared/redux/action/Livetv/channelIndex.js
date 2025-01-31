import { createSlice } from '@reduxjs/toolkit'
const ChannelIndexSlice = createSlice({
    name: 'channelIndex',
    initialState: {
        value: null
    },
    reducers: {
        setChannelIndex: (state, action)=>{
            state.value= action?.payload
        },
        channelIndexClear: (state) => {
            state.value = null
        }
    }
})
export const { setChannelIndex,channelIndexClear } = ChannelIndexSlice.actions
export default ChannelIndexSlice.reducer
