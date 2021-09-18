//import { createStore, applyMiddleware, compose } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'
import reducer from './reducers'

export default function configureAppStore() {
   const store = configureStore({
      reducer: reducer,
      middleware: [thunkMiddleware]
   })

   return store
}