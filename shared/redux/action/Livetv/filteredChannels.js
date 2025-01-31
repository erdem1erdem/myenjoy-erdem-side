import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getFilteredChannels = createAsyncThunk('getFilteredChannels',
    async (object,{ dispatch, getState }) => {
        
        dispatch(filteredChannelsResponse({...object}))
    }
)
const FilteredChannelsSlice = createSlice({
    name: 'filteredchannels',
    initialState: {
        filteredChannels: []
    },
    reducers: {
        filteredChannelsResponse: (state, action) => {  
            let methodType= action?.payload?.methodType
            let liveTvChannels= action?.payload?.liveTvChannels
            let text = action?.payload?.text || ''
            let channels= []
            if(methodType==="1"){
                if (text) {
                    channels = liveTvChannels?.filter(channel =>
                      channel['tvg-name']?.toLowerCase()?.includes(text.toLowerCase())
                    )
                  }
                  state.filteredChannels = [...channels]
                }
        },
        filteredChannelsClear: (state) => {
            state.filteredChannels = []
        }
    }
})
export const { filteredChannelsResponse, filteredChannelsClear } = FilteredChannelsSlice.actions
export default FilteredChannelsSlice.reducer