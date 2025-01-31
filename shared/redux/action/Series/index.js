import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { domainUrl } from '../../../'



export const getSeriesCategoriesSeries = createAsyncThunk('getSeriesCategoriesSeries',
    async (object,{ dispatch, getState }) => {

        dispatch(gettingSeriesCategoriesSeries())
        let methodType= object?.methodType
        var myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json")
        let payload= {portalID: object?.portalID, mediaTypeID:3}
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
                dispatch(seriesCategoriesReponse(result?.categories))
                dispatch(seriesResponse(result?.channels))
            }
            else 
                throw result?.message
        })
        .catch(error => { 
            dispatch(seriesCategoriesClear())
            dispatch(seriesClear())
            console.error(error) 
        })
    }
)





export const getSeriesDetails = createAsyncThunk('getSeriesDetails',
    async (object,{ dispatch, getState }) => {
    
        let methodType= object?.methodType
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json") 
        const dat = methodType==='1' ? {"portalID": object?.portalID, seriesName : object?.seriesName} :{endPoint: "get_series_info", "series": object?.series_id, "portalID": object?.portalID}       
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body:JSON.stringify(dat)
        }
        let url= methodType==='1' ? `/m3uSeriesDetails` : '/xStreamCodeBySeries'
        fetch(domainUrl + url, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result?.success) {
                    dispatch(seriesDetailResponse(result?.data))
                }
                else 
                    throw result?.message
            })
            .catch(error => { 
                dispatch(seriesDetailClear())
                console.error(error) 
            })
    }
)

export const getSeriesURL = createAsyncThunk('getSeriesURL',
    async (object,{ dispatch, getState }) => {

        let methodType= object?.methodType
        let portalID= object?.portalID
        var myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json") 

        let payload= methodType==="3" ? {portalID, streamID: object?.streamID, extension: object?.extension} : {}
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body:JSON.stringify(payload)
        }
        let url= methodType==="3" ? "/createSeriesUrl" : {}
        fetch(domainUrl + url, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result?.success) 
                    dispatch(seriesUrlResponse(result?.url))
                else 
                    throw result?.message
            })
            .catch(error => { 
                dispatch(seriesUrlClear())
                console.error(error) 
            })
    }
)
export const getSeriesMediasState = createAsyncThunk('getMediasState',
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
                dispatch(seriesMediasStateResponse(result?.data))
                dispatch(seriesMediasStateByCategoryResponse(result?.data))
            }      
            else 
                throw result?.message
        })
        .catch(error => { 
            dispatch(seriesMediasStateResponse([]))
            console.error(error) 
        })
})
export const getFilteredSeries = createAsyncThunk('getFilteredSeries',
    async (object,{ dispatch, getState }) => {
        dispatch(setPages({pageNo: object?.pageNo, pageSize: object?.pageSize}))
        var myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json")
        myHeaders.append("pageNo", object?.pageNo)
        myHeaders.append("recordsPerPage", object?.pageSize)
        const payload=(
            object?.methodType==="1" ?
           {"portalID": object?.portalID, tvgName:object?.text} :
           object?.methodType==="3" ?
           {name: object?.text,"portalID": object?.portalID} :
           {name: object?.text,"portalID": object?.portalID}
       )
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body:JSON.stringify(payload)
        }
        let url= object?.methodType==='1' ? `/filterM3USeries` : object?.methodType==='3'? '/filterXstreamSeries':'/fitlterStalkerSeries'
        fetch(domainUrl + url, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result?.success) {
                 
                }
                else
                    throw result?.message
            })
            .catch(error => {
                console.log('error:', error)
            })
    }
)


const Serieslice = createSlice({
    name: 'series',
    initialState: {
        seriesCategories: [],
        series: [],
        seriesLoading: false,

       
        loading: false,
        seriesDetail: null,
        seriesUrl:null,
        seriesMediasState: [],
        seriesMediasStateByCategory: [],
        seriesPagination:{
            pageNo:1,
            pageSize: 8,
            totalRecords:0,
        },
        selectedCategoryID: null,
    },
    reducers: {
        gettingSeriesCategoriesSeries: (state) => {
            state.seriesLoading = true
        },
        seriesCategoriesReponse: (state, action) => {
            state.seriesCategories = [...action?.payload]
            state.seriesLoading = false
        },
        seriesCategoriesClear: (state) => {
            state.seriesCategories = []
            state.seriesLoading = false
        },
        seriesResponse: (state, action)=>{
            state.series= action?.payload
        },
        seriesClear: (state)=>{
            state.series= []
        },




        setSelectedCatergory: (state, action) => {
            state.selectedCategoryID= action.payload
        },
        setPages:(state, action)=>{
            state.seriesPagination= {...state?.seriesPagination, ...action.payload}
        },
       
        
       
    
    
        seriesDetailResponse: (state, action) => {    
            state.seriesDetail = action.payload       
            state.loading = false
        },
        seriesDetailClear: (state) => {
            state.seriesDetail = null
            state.loading = false
        },
      
        seriesUrlResponse: (state, action) => {    
            state.seriesUrl = action.payload
        },
        seriesUrlClear: (state) => {
            state.seriesUrl = null
        },
        seriesMediasStateResponse: (state, action)=>{
            state.seriesMediasState= action.payload
        },
        seriesMediasStateClear: (state)=>{
            state.seriesMediasState= []
        },
        seriesMediasStateByCategoryResponse: (state, action)=>{
            state.seriesMediasStateByCategory= action.payload
        }
    }
})
export const { 
    gettingSeriesCategoriesSeries, seriesCategoriesReponse, seriesCategoriesClear, seriesResponse, seriesClear,
    setSelectedCatergory, setPages,
    seriesDetailResponse,seriesDetailClear,
    seriesUrlResponse, seriesUrlClear,
    seriesMediasStateResponse, seriesMediasStateClear, seriesMediasStateByCategoryResponse
} = Serieslice.actions;
export default Serieslice.reducer;