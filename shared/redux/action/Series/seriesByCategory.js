import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getSeriesByCategory = createAsyncThunk('getSeriesByCategory',
    async (object,{ dispatch, getState }) => {
        dispatch(seriesByCategoryResponse({...object}))
    }
)
const SeriesByCategorySlice = createSlice({
    name: 'seriesByCategory',
    initialState: {
        value: [],
        allSeriesInCategory:[],
        totalSeries:0,
        seriesPageNo: null,
    },
    reducers: {
        seriesByCategoryResponse: (state, action) => {  
            let methodType= action?.payload?.methodType
            let categoryID= action?.payload?.categoryID
            let seriesArray= action?.payload?.series
            let seriesPageNo= action?.payload?.seriesPageNo
             let text = action?.payload?.text || ''
            let series=[]

            if(action?.payload?.leftSideBarItem !==2){
                if(methodType==="1")
                    series= seriesArray.filter(season => season['group-title'] === categoryID)
                else if(methodType==="3")
                    series= seriesArray.filter(season => season?.category_id === categoryID)
            }
            else{
                if (text) {
                    series= seriesArray?.filter(ser =>
                      ser['tvg-name']?.toLowerCase()?.includes(text.toLowerCase())
                    )
                  }
            }
            state.totalSeries= series?.length
            state.allSeriesInCategory=series
            state.value= series?.length<=8 ? series : series.slice(0, 8 * seriesPageNo)
            state.seriesPageNo= seriesPageNo
        },
        seriesByCategoryClear: (state) => {
            state.value = []
            state.allSeriesInCategory=[]
            state.seriesPageNo= null
        }
    }
})
export const { seriesByCategoryResponse, seriesByCategoryClear } = SeriesByCategorySlice.actions
export default SeriesByCategorySlice.reducer
