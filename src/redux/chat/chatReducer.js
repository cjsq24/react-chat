import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   list: [],
   messages: [],
   focusUserId: null,
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
         state.focusUserId = action.payload.userToId
         if (action.payload.success) {
            state.messages = action.payload.values.messages
         } else {
            state.messages = []
         }
         state.loading = false
      },
      sendMessage(state, action) {
         state.loading = false
         if (action.payload.success) {
            state.messages = action.payload.values.messages
            state.list = action.payload.newChatList
         }
      },
      receiveMessage(state, action) {
         //state.loading = false
         //state.messages = action.payload.messages
         state.messages = action.payload.messages
         state.list = action.payload.newChatList
      },
   }
})

export const { actions, reducer } = countrySlice