import { createSlice } from '@reduxjs/toolkit'

const LockedChannelsSlice = createSlice({
    name: 'lockedChannels',
    initialState: {
        value: []
    },
    reducers: {
        getLockedChannelsList: (state, action)=>{
            let lockedChannelIds= action?.payload?.lockedChannels
            lockedChannelIds= lockedChannelIds?.map(lockedChannel => lockedChannel?.channelID)
            let liveTvChannels= action?.payload?.liveTvChannels
            const lockedSet = new Set(lockedChannelIds)
            state.value= liveTvChannels.filter(channel => lockedSet.has(channel['tvg-name']));
        },
        clearLockedChannelsList: (state)=>{
            state.value= []
        }
    }
})
export const { getLockedChannelsList, clearLockedChannelsList} = LockedChannelsSlice.actions
export default LockedChannelsSlice.reducer
