import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   list: [],
   payload: {},
   loading: false
}

const countrySlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      loading(state) {
         state.loading = true
      },
      login(state, action) {
         state.payload = action.payload
      },
      register(state, action) {
         return { ...state, payload: action.payload, loading: false }
      },
      filter(state, action) {
         state.loading = false
      },
      list(state, action) {
         //console.log('action', action)
         state.loading = false
         state.list = (action.payload.success) ? action.payload.values : []
      },
      get(state, action) {
         state.loading = false
      },
   }
})

export const { actions, reducer } = countrySlice