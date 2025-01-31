import { createSlice } from '@reduxjs/toolkit'

const FavoriteSeriesSlice = createSlice({
    name: 'favoriteSeries',
    initialState: {
        value: []
    },
    reducers: {
        getFavoriteSeries: (state, action)=>{
            let favoriteSeriesIds= action?.payload?.seriesFavorite
            favoriteSeriesIds= favoriteSeriesIds?.map(movie => movie?.mediaID)
            let series= action?.payload?.series
            const favoriteSet = new Set(favoriteSeriesIds)
            state.value= series.filter(series => favoriteSet.has(series['tvg-name'] || series?.stream_id || series?.series_id))
            state.value= state?.value?.map(series => ({...series,  isFavorite: true}))
        },
        clearFavoriteSeries: (state)=>{
            state.value= []
        }
    }
})
export const { getFavoriteSeries, clearFavoriteSeries} = FavoriteSeriesSlice.actions
export default FavoriteSeriesSlice.reducer
