import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { domainUrl } from '../../../constants';
export const getLiveTvMediasState = createAsyncThunk('getLiveTvMediasState',
    async (payload,{ dispatch }) => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json") 
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body:JSON.stringify(payload)
        }
        fetch(domainUrl + "/getMediaState", requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result?.success) {
                dispatch(liveTvMediasStateResponse(result?.data))
            }      
            else 
                throw result?.message
        })
        .catch(error => { 
            dispatch(liveTvMediasStateResponse([]))
            console.error(error) 
        })
})
const LiveTvMediasStateSlice = createSlice({
    name: 'liveTvMediasState',
    initialState: {
        value: []
    },
    reducers: {
        liveTvMediasStateResponse: (state, action)=>{
            state.value= action.payload
        },
    }
})
export const { liveTvMediasStateResponse } = LiveTvMediasStateSlice.actions
export default LiveTvMediasStateSlice.reducer
