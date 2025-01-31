import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { domainUrl } from '../../../';

export const getMovieCategoriesMovies = createAsyncThunk('getMovieCategoriesMovies',
    async (object,{ dispatch, getState }) => {

        dispatch(gettingMovieCategoriesMovies())
        let methodType= object?.methodType
        var myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json")
        let payload= {portalID: object?.portalID, mediaTypeID:2}
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
                dispatch(movieCategoriesReponse(result?.categories))
                dispatch(moviesResponse(result?.channels))
            }
            else 
                throw result?.message
        })
        .catch(error => { 
            dispatch(movieCategoriesClear())
            dispatch(moviesClear())
            console.error(error) 
        })
    }
)



export const getMovieDetail = createAsyncThunk('getMovieDetail',
    async (object,{ dispatch, getState }) => {
    
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json") 
        const payload = {
            "endPoint": "get_vod_info",
            "vodID": object?.stream_id,
            "portalID": object?.portalID
        }       
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body:JSON.stringify(payload)
        };
        fetch(domainUrl + `/xStreamCodeByVodID`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result?.success) {
                    dispatch(movieDetailResponse(result?.data))
                }
                else 
                    throw result?.message
            })
            .catch(error => { 
                dispatch(movieDetailClear())
                console.error(error) 
            })
    }
)

export const getMovieURL = createAsyncThunk('getMovieURL',
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
        let url= methodType==="3" ? "/createMovieUrl" : {}
        fetch(domainUrl + url, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result?.success) 
                    dispatch(movieUrlResponse(result?.url))
                else 
                    throw result?.message
            })
            .catch(error => { 
                dispatch(movieUrlClear())
                console.error(error) 
            })
    }
)

export const setMovieResume = createAsyncThunk('setMovieResume',
    async (object,{ dispatch, getState }) => {  
       
        dispatch(settingMovieState())  
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json") 
        const dat = { 
        "streamID":object?.movie_data?.stream_id,
        "categoryID":object?.movie_data?.category_id,
        "portalID":object.portID,
        "macAddress":object.macAddress,
        "duration":String(object.currentTime)
        }     
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body:JSON.stringify(dat)
        }
        
        fetch(domainUrl + `/saveMovieState`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result?.success) {
                    dispatch(movieResumeResponse(result?.message))
                }
                else 
                    throw result?.message
            })
            .catch(error => { 
                dispatch(movieResumeClear())
                console.error(error) 
            })
    }
)

export const getMovieState = createAsyncThunk('getMovieState',
    async (object,{ dispatch, getState }) => {    
        dispatch(gettingMovieState())  
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json") 
        const dat = { 
        "streamID":object?.movie_data?.stream_id,
        "categoryID":object?.movie_data?.category_id,
        "portalID":object.portID,
        "macAddress":object.macAddress,
        }     
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body:JSON.stringify(dat)
        };
      
        fetch(domainUrl + `/getMovieState`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result?.success) {   
                    dispatch(movieStateResponse(result?.data))
                }
                else 
                    throw result?.message
            })
            .catch(error => { 
                dispatch(movieStateClear())
                console.error(error) 
            })
    }
)
export const getMovieMediasState = createAsyncThunk('getMediasState',
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
                dispatch(movieMediasStateResponse(result?.data))
                dispatch(movieMediasStateByCategoryResponse(result?.data))
            }      
            else 
                throw result?.message
        })
        .catch(error => { 
            dispatch(movieMediasStateResponse([]))
            console.error(error) 
        })
})
export const getFilteredData = createAsyncThunk('getFilteredData',
    async (object,{ dispatch, getState }) => {
        let methodType= object?.methodType
        dispatch(setPages({pageNo: object?.pageNo, pageSize: object?.pageSize}))
        var myHeaders = new Headers();
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
        let url= methodType==="1" ? "/filterM3UMovies" : methodType==="3" ? "/filterXstreamMovies" : "/fitlterStalkerMovies"
        fetch(domainUrl + url, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result?.success) {
                    dispatch(setPages({totalRecords: result?.totalRecords}))
                }
                else
                    throw result?.message
            })
            .catch(error => {
                dispatch(moviesByCategoryClear())
                console.error(error)
            })
    }
)

const MoviesSlice = createSlice({
    name: 'movies',
    initialState: {
        movieCategories: [],
        movies: [],
        movieLoading: false,



        movieDetail: null,
        movieUrl:null,
        movieState:null,
        movieStateData:null,
        loading: false,
        movieMediasState: [],
        movieMediasStateByCategory: [],
        pagination:{
            pageNo:1,
            pageSize: 8,
            totalRecords:0,
        },
        selectedCategoryID: null,
    },
    reducers: {
       
        gettingMovieCategoriesMovies: (state) => {
            state.movieLoading = true
        },
        movieCategoriesReponse: (state, action) => {
            state.movieCategories = [...action?.payload]
            state.movieLoading = false
        },
        movieCategoriesClear: (state) => {
            state.movieCategories = []
            state.movieLoading = false
        },
        moviesResponse: (state, action)=>{
            state.movies= action?.payload
        },
        moviesClear: (state)=>{
            state.movies= []
        },








        setPages:(state, action)=>{
            state.pagination= {...state?.pagination, ...action.payload}
        },
        setSelectedCatergory: (state, action) => {
            state.selectedCategoryID= action.payload
        },
    
    
     
        movieDetailResponse: (state, action) => {    
            state.movieDetail = action.payload
            state.loading = false
        },
        movieDetailClear: (state) => {
            state.movieDetail = null;
            state.loading = false
        },
        movieUrlResponse: (state, action) => {    
            state.movieUrl = action.payload
        },
        movieUrlClear: (state) => {
            state.movieUrl = null
        },

        settingMovieState: (state) => {
            state.loading = true
        },
        movieResumeResponse: (state, action) => {    
            state.movieState = action.payload
            state.loading = false
        },
        movieResumeClear: (state) => {
            state.movieState = null
            state.loading = false
        },
        gettingMovieState: (state) => {
            state.loading = true
        },
        movieStateResponse: (state, action) => {    
            state.movieStateData = action.payload
            state.loading = false
        },
        movieStateClear: (state) => {
            state.movieStateData = null
            state.loading = false
        },
        movieMediasStateResponse: (state, action)=>{
            state.movieMediasState= action.payload
        },
        movieMediasStateClear: (state)=>{
            state.movieMediasState= []
        },
        movieMediasStateByCategoryResponse: (state, action)=>{
            state.movieMediasStateByCategory= action.payload
        },
    },
})
export const {
    
    gettingMovieCategoriesMovies, movieCategoriesReponse, movieCategoriesClear, moviesResponse, moviesClear,

    setPages, setSelectedCatergory,
    movieDetailResponse, movieDetailClear,
    movieUrlResponse,movieUrlClear,
    movieResumeResponse,movieResumeClear,settingMovieState,movieStateClear,gettingMovieState,movieStateResponse,
    movieMediasStateResponse, movieMediasStateClear, movieMediasStateByCategoryResponse
} = MoviesSlice.actions;
export default MoviesSlice.reducer