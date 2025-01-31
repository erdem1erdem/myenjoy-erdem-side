import { createSlice } from '@reduxjs/toolkit'

const RecentlyViewedMoviesSlice = createSlice({
    name: 'recentlyViewedMovies',
    initialState: {
        value: []
    },
    reducers: {
        getRecentlyViewedMovies: (state, action)=>{
            let recentlyViewedMoviesIds= action?.payload?.movieMediasState
            recentlyViewedMoviesIds= recentlyViewedMoviesIds?.map(movie => movie?.mediaID)
            let movies= action?.payload?.movies
            const recentlyViewedMoviesSet = new Set(recentlyViewedMoviesIds)
            state.value= movies.filter(movie => recentlyViewedMoviesSet.has(movie['tvg-name'] || movie?.stream_id || movie?.series_id))
        },
        clearRecentlyViewedMovies: (state)=>{
            state.value= []
        }
    }
})
export const { getRecentlyViewedMovies, clearRecentlyViewedMovies} = RecentlyViewedMoviesSlice.actions
export default RecentlyViewedMoviesSlice.reducer
