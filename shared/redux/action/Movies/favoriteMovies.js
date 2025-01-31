import { createSlice } from '@reduxjs/toolkit'

const FavoriteMoviesSlice = createSlice({
    name: 'favoriteMovies',
    initialState: {
        value: []
    },
    reducers: {
        getFavoriteMovies: (state, action)=>{
            let favoriteMoviesIds= action?.payload?.moviesFavorite
            favoriteMoviesIds= favoriteMoviesIds?.map(movie => movie?.mediaID)
            let movies= action?.payload?.movies
            const favoriteSet = new Set(favoriteMoviesIds)
            state.value= movies.filter(movie => favoriteSet.has(movie['tvg-name'] || movie?.stream_id || movie?.series_id))
            state.value= state?.value?.map(movie => ({...movie,  isFavorite: true}))
        },
        clearFavoriteMovies: (state)=>{
            state.value= []
        }
    }
})
export const { getFavoriteMovies, clearFavoriteMovies} = FavoriteMoviesSlice.actions
export default FavoriteMoviesSlice.reducer
