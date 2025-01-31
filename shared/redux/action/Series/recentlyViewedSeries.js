import { createSlice } from '@reduxjs/toolkit'

const RecentlyViewedSeriesSlice = createSlice({
    name: 'recentlyViewedSeries',
    initialState: {
        value: []
    },
    reducers: {
        getRecentlyViewedSeries: (state, action)=>{
            let recentlyViewedSeriesIds= action?.payload?.seriesMediasState
            recentlyViewedSeriesIds= recentlyViewedSeriesIds?.map(movie => movie?.mediaID)
            let series= action?.payload?.series
            const recentlyViewedSeriesSet = new Set(recentlyViewedSeriesIds)
            state.value= series.filter(season => recentlyViewedSeriesSet.has(season['tvg-name'] || season?.stream_id || season?.series_id))
        },
        clearRecentlyViewedSeries: (state)=>{
            state.value= []
        }
    }
})
export const { getRecentlyViewedSeries, clearRecentlyViewedSeries} = RecentlyViewedSeriesSlice.actions
export default RecentlyViewedSeriesSlice.reducer
