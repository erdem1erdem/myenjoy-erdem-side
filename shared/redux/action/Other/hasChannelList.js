import { createSlice } from '@reduxjs/toolkit'
const HasChannelListSlice = createSlice({
    name: 'hasChannelList',
    initialState: {
        hasChannelList: false
    },
    reducers: {
        setHasChannelList: (state, action)=>{
            state.hasChannelList= action?.payload
        }
    }
})
export const { setHasChannelList } = HasChannelListSlice.actions
export default HasChannelListSlice.reducer