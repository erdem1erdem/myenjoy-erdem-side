import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { domainUrl } from '../../../';

export const getLiveTvCategoriesChannels = createAsyncThunk('getLiveTvCategoriesChannels',
    async (object,{ dispatch, getState }) => {

        dispatch(gettingLiveTvCategoriesChannels())
        let methodType= object?.methodType
        var myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json")
        let payload= {portalID: object?.portalID, mediaTypeID:1}
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body:JSON.stringify(payload)
        }
        const url= methodType==="1" ? "/showDetailsM3u" : methodType==="2" ? "/showDetailsStalker" : "/showDetailsXstream"
        
        fetch(domainUrl + url, requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result?.success) {
                dispatch(liveTvCategoriesResponse({categories: result?.categories, channels: result?.channels, methodType}))
                dispatch(liveTvChannelsResponse(result?.channels))
            }
            else 
                throw result?.message
        })
        .catch(error => { 
            dispatch(liveTvCategoriesClear())
            dispatch(liveTvChannelsClear())
            console.error(error) 
        })
    }
)
export const getChannelURL = createAsyncThunk('getChannelURL',
    async (object,{ dispatch, getState }) => {

        dispatch(gettingChannelurl())
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json") 
        const dat = { "portalID":"56dc526c-cf99-43c4-89d6-e524ce5b5f34",
        "streamID":object?.channelid,
        "extension":object?.ext,
        "portalID":object.portID}   
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body:JSON.stringify(dat)
        };
        fetch(domainUrl + `/createLiveStreamUrl`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result?.success) {
              
                    dispatch(ChannelurlResponse(result?.url))
                }
                else 
                    throw result?.message
            })
            .catch(error => { 
                dispatch(ChannelurlClear())
                console.error(error) 
            })
    }
) 

export const getFilteredChannel = createAsyncThunk('getFilteredChannel',
    async (object,{ dispatch, getState }) => {
       try{
        let methodType= object?.methodType
        let portalID= object?.portalID
   
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json")
        myHeaders.append("pageNo", object?.pageNo)
        myHeaders.append("recordsPerPage", object?.pageSize)   
        const payload= object?.methodType==="1" ? {"tvgName": object?.text, portalID} :object?.methodType==="2" ? {"name":object?.text, portalID} : {"name":object?.text, portalID}     
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body:JSON.stringify(payload)
        }
        const url= methodType==="1" ? "/filterM3ULiveStreaming" : methodType==="2" ? "/fitlterStalkerLiveStreaming" : "/filterXstreamLiveStreaming"
        fetch(domainUrl + url, requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result?.success) 
                dispatch(channelsByCategoryResponse(result?.data))                  
            else 
                throw result?.message
        })
        .catch(error => { 
            dispatch(channelsByCategoryClear())
            console.error(error) 
        })
       }
       catch(error){
        console.log('search api error',error)
       }
    }
)

const LiveTvSlice = createSlice({
    name: 'liveTv',
    initialState: {
        liveTvCategories: [],
        liveTvChannels: [],
        liveTvLoading: false,

        data: [],
        channelsByCategory: [],
        ChannelUrldata:null,
        loading: false,
        pagination:{
            pageNo:1,
            pageSize: 100,
            totalRecords:0,
        },
        selectedCategoryID: null,
    },
    reducers: {
      
        gettingLiveTvCategoriesChannels: (state) => {
            state.liveTvLoading = true
        },
        liveTvCategoriesResponse: (state, action) => {
            let methodType= action?.payload?.methodType
            let categories= [...action?.payload?.categories]
            let channels= action?.payload?.channels

            categories.forEach((category, index) => {
                category.totalChannels = 0
                category.index= index
            })
            channels.forEach(channel => {
                const categoryID = methodType==="1" ? channel['group-title'] : channel?.category_id
                let category
                if(methodType==="1")
                    category = categories.find(cat => cat['group-title'] === categoryID)
                else
                    category = categories.find(cat => (cat?.category_id || cat?.id) === categoryID)
                if (category) 
                    category.totalChannels += 1
            })
            state.liveTvCategories = categories
            state.liveTvLoading = false
        },
        liveTvCategoriesClear: (state) => {
            state.liveTvCategories = []
            state.liveTvLoading = false
        },
        liveTvChannelsResponse: (state, action)=>{
            state.liveTvChannels= action?.payload
        },
        liveTvChannelsClear: (state)=>{
            state.liveTvChannels= []
        },
        


        setSelectedCatergory: (state, action) => {
            state.selectedCategoryID= action.payload
        },
        gettingChannelurl: (state) => {
            state.loading = true
        },
        ChannelurlResponse: (state, action) => {    
            state.ChannelUrldata = action.payload
            state.loading = false
        },
        ChannelurlClear: (state) => {
            state.ChannelUrldata = null;
            state.loading = false
        },
      
    },
})
export const { 
    gettingLiveTvCategoriesChannels, liveTvChannelsResponse, liveTvChannelsClear, 

 liveTvCategoriesResponse, liveTvCategoriesClear,setSelectedCatergory ,
    gettingChannelurl,ChannelurlResponse,ChannelurlClear,
} = LiveTvSlice.actions;
export default LiveTvSlice.reducer;