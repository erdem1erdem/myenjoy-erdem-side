import { createSlice } from '@reduxjs/toolkit'
const CategorySlice = createSlice({
    name: 'category',
    initialState: {
        value: {
            id: null,
            name: null
        }
    },
    reducers: {
        setCategory: (state, action)=>{
            state.value= action?.payload
        },
        setCategoryClear: (state)=>{
            state.value= null
        },
    }
})
export const { setCategory,setCategoryClear } = CategorySlice.actions
export default CategorySlice.reducer