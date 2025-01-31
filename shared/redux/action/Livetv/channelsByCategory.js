import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getChannelsByCategory = createAsyncThunk('getChannelsByCategory',
    async (object,{ dispatch, getState }) => {
        dispatch(channelsByCategoryResponse({...object}))
    }
)
const ChannelsByCategorySlice = createSlice({
    name: 'channelsByCategory',
    initialState: {
        value: []
    },
    reducers: {
        channelsByCategoryResponse: (state, action) => {  
            let methodType= action?.payload?.methodType
            let categoryID= action?.payload?.categoryID
            let liveTvChannels= action?.payload?.liveTvChannels
            let text = action?.payload?.text || ''
            let channels= []
           if(action?.payload?.leftSideBarItem !==2){
            if(methodType==="1")
                channels= liveTvChannels?.filter(channel=> channel['group-title'] === categoryID)  
            else if(methodType==="3")
                channels= liveTvChannels?.filter(channel=> channel?.category_id === categoryID)  
           }
           else{
            if (text) {
                channels = liveTvChannels?.filter(channel =>
                  channel['tvg-name']?.toLowerCase()?.includes(text.toLowerCase())
                )
              }
           }
            state.value = [...channels]
        },
        channelsByCategoryClear: (state) => {
            state.value = []
        }
    }
})
export const { channelsByCategoryResponse, channelsByCategoryClear } = ChannelsByCategorySlice.actions
export default ChannelsByCategorySlice.reducer
