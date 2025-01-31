import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getMoviesByCategory = createAsyncThunk('getMoviesByCategory',
    async (object,{ dispatch, getState }) => {
      
        dispatch(moviesByCategoryResponse({...object}))
    }
)
const MoviesByCategorySlice = createSlice({
    name: 'moviesByCategory',
    initialState: {
        value: [],
        totalMovies:0,
        moviesPageNo: 0,
        allMoviesInCategory:[]
    },
    reducers: {
        moviesByCategoryResponse: (state, action) => {  
            let methodType= action?.payload?.methodType
            let categoryID= action?.payload?.categoryID
            let moviesArray= action?.payload?.movies
            let moviesPageNo= action?.payload?.moviesPageNo
            let text = action?.payload?.text || ''
            let movies=[]
           
            if(action?.payload?.leftSideBarItem !==2){
                if(methodType==="1")
                    movies= moviesArray.filter(movie => movie['group-title'] === categoryID)
                else if(methodType==="3")
                    movies= moviesArray.filter(movie => movie?.category_id === categoryID)
            }
            else{
                if (text) {
                    movies= moviesArray?.filter(movie =>
                      movie['tvg-name']?.toLowerCase()?.includes(text.toLowerCase())
                    )
                  }
            }
            
            state.totalMovies= movies?.length
            state.allMoviesInCategory=movies
            state.value= movies?.length<=8 ? movies :movies.slice(0, 8 * moviesPageNo)
           
            state.moviesPageNo= moviesPageNo
        },
        moviesByCategoryClear: (state) => {
            state.value = []
            state.allMoviesInCategory=[]
            state.moviesPageNo= 0
        }
    }
})
export const { moviesByCategoryResponse, moviesByCategoryClear } = MoviesByCategorySlice.actions
export default MoviesByCategorySlice.reducer
