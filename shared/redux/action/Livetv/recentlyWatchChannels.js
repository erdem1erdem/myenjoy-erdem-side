import { createSlice } from '@reduxjs/toolkit'

const recentlyWatchChannelsSlice = createSlice({
    name: 'recentlyWatchChannels',
    initialState: {
        value: []
    },
    reducers: {
        getRecentlyWatchChannelsList: (state, action)=>{
            let liveTvMediasStateIds= action?.payload?.liveTvMediasState
            liveTvMediasStateIds= liveTvMediasStateIds?.map(channel => channel?.mediaID)
            let liveTvChannels= action?.payload?.liveTvChannels
            const recentlyWatcSet = new Set(liveTvMediasStateIds)
            state.value= liveTvChannels.filter(channel => recentlyWatcSet.has(channel['tvg-name']));
        },
        clearRecentlyWatchChannelsList: (state)=>{
            state.value= []
        }
    }
})
export const { getRecentlyWatchChannelsList, clearRecentlyWatchChannelsList} = recentlyWatchChannelsSlice.actions
export default recentlyWatchChannelsSlice.reducer
