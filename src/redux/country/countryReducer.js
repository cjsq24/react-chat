import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   list: [],
   loading: false
}

const countrySlice = createSlice({
   name: 'country',
   initialState,
   reducers: {
      loading(state) {
         state.loading = true
      },
      list(state, action) {
         //console.log('action', action)
         state.loading = false
         state.list = (action.payload.success) ? action.payload.values : []
      },
      todoAdded(state, action) {
         // ✅ This "mutating" code is okay inside of createSlice!
         state.push(action.payload)
      },
      todoToggled(state, action) {
         const todo = state.find(todo => todo.id === action.payload)
         todo.completed = !todo.completed
      },
      todosLoading(state, action) {
         return {
            ...state,
            status: 'loading'
         }
      }
   }
})

export const { actions, reducer } = countrySlice