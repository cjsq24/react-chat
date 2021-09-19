import axios from '../../helpers/interceptor'
import { actions } from './userReducer'

const base = '/users'

const controller = {
   list: (_data = {}) => async (dispatch, getState) => {
      await dispatch(actions.loading())
      const {data} = await axios.get(`${base}/list`, {params: _data})
      await dispatch(actions.list(data))
   },
   login: (_data) => async (dispatch, getState) => {
      await dispatch(actions.loading())
      const {data} = await axios.post(`${base}/login`, _data)
      await dispatch(actions.list(data))
      if (!data.success) {
         alert('Usuario o contraseña incorrecta')
      }
      return data;
   },
   filter: (_data) => async (dispatch, getState) => {
      await dispatch(actions.loading())
      const {data} = await axios.get(`${base}/filter`, {params: {search: _data}})
      await dispatch(actions.filter(data))
      return data;
   },
   get: (_data) => async (dispatch, getState) => {
      await dispatch(actions.loading())
      const {data} = await axios.get(`${base}/get/${_data}`)
      await dispatch(actions.get())
      return data;
   },
   register: (_data) => async (dispatch, getState) => {
      await dispatch(actions.loading())
      const {data} = await axios.post(`${base}/register`, _data)
      await dispatch(actions.list(data))
      if (!data.success) {
         alert('No se ha podido registrar tu usuario')
      }
      return data;
   },
}

export default controller