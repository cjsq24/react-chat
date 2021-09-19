import axios from '../../helpers/interceptor'
import { actions } from './chatReducer'

const base = '/chats'

const controller = {
   list: (_data = {}) => async (dispatch, getState) => {
      await dispatch(actions.loading())
      const { data } = await axios.get(`${base}/list`)
      await dispatch(actions.list(data))
   },
   getChat: (userToId) => async (dispatch) => {
      await dispatch(actions.loading())
      const { data } = await axios.get(`${base}/get-chat/${userToId}`)
      await dispatch(actions.getChat({...data, userToId}))
      return data;
   },
   sendMessage: (_data) => async (dispatch, getState) => {
      await dispatch(actions.loading())
      const { chat } = getState()
      const { data } = await axios.post(`${base}/send-message/${_data.user_to_id}`, { content: _data.content })

      let newChatList = JSON.parse(JSON.stringify(chat.list)) //Este parseo es para que no me restrinja a newChatList

      if (data.success) {
         const userLocalId = _data.user_local_id
         const userToId = _data.user_to_id

         let indexList = null
         const exists = chat.list.some((item, index) => {
            if ((item.users_id[0]._id === userLocalId || item.users_id[0]._id === userToId) &&
               (item.users_id[1]._id === userLocalId || item.users_id[1]._id === userToId)) {
               indexList = index
               return true
            }
            return false
         })

         if (exists) {
            newChatList = newChatList.filter((newChat, i) => i !== indexList)
            newChatList.unshift({
               ...chat.list[indexList],
               messages: data.values.messages[data.values.messages.length - 1]
            })
         } else {
            newChatList.unshift({
               ...data.values,
               messages: data.values.messages[0]
            })
         }
      }

      await dispatch(actions.sendMessage({ ...data, newChatList }))
      return data;
   },

   receiveMessage: (_data = {}) => async (dispatch, getState) => {
      const { chat } = getState()
      let newChatList = JSON.parse(JSON.stringify(chat.list))
      let messages = JSON.parse(JSON.stringify(chat.messages))
      const { focusUserId } = chat

      const { userLocalId, userToId } = _data

      let indexList = null
      const exists = chat.list.some((item, index) => {
         if ((item.users_id[0]._id === userLocalId || item.users_id[0]._id === userToId) &&
            (item.users_id[1]._id === userLocalId || item.users_id[1]._id === userToId)) {
            indexList = index
            return true
         }
         return false
      })

      if (exists) {
         newChatList = newChatList.filter((newChat, i) => i !== indexList)
         newChatList.unshift({
            ...chat.list[indexList],
            messages: _data.messages
         })
      } else {
         newChatList.unshift(_data)
      }

      if (focusUserId && focusUserId === userToId) {
         messages.push(_data.messages)
      }
      
      await dispatch(actions.receiveMessage({messages, newChatList}))
   },
}

export default controller