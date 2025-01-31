import { createSlice } from '@reduxjs/toolkit'

const FavoriteChannelsSlice = createSlice({
    name: 'favoriteChannels',
    initialState: {
        value: []
    },
    reducers: {
        getFavoriteChannels: (state, action)=>{
            let favoriteChannelIds= action?.payload?.favoriteChannels
            favoriteChannelIds= favoriteChannelIds?.filter(favoriteChannel => parseInt(favoriteChannel?.mediaType) ===1)
            favoriteChannelIds= favoriteChannelIds?.map(favoriteChannels => favoriteChannels?.mediaID)
            let liveTvChannels= action?.payload?.liveTvChannels
            const favoriteSet = new Set(favoriteChannelIds)
            state.value= liveTvChannels.filter(channel => favoriteSet.has(channel['tvg-name']));
        },
        clearFavoriteChannels: (state)=>{
            state.value= []
        }
    }
})
export const { getFavoriteChannels, clearFavoriteChannels} = FavoriteChannelsSlice.actions
export default FavoriteChannelsSlice.reducer
