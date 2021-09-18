import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   list: [],
   messages: [],
   loading: false
}

const countrySlice = createSlice({
   name: 'chat',
   initialState,
   reducers: {
      loading(state) {
         state.loading = true
      },
      list(state, action) {
         state.loading = false
         state.list = (action.payload.success) ? action.payload.values : []
      },
      getChat(state, action) {
         state.loading = false
         if (action.payload.success) {
            state.messages = action.payload.values.messages
         } else {
            state.messages = []
         }
      },
      sendMessage(state, action) {
         state.loading = false
         if (action.payload.success) {
            state.messages = action.payload.values.messages
            console.log(action.payload)
            state.list = action.payload.newChatList
         }
      },
   }
})

export const { actions, reducer } = countrySlice