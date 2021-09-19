import { io } from 'socket.io-client'
import chatCont from './redux/chat/chatController'

export default function socket(store) {
   const ioClient = io.connect(process.env.REACT_APP_SOCKET_URL, { 
      'forceNew': true, 
      'reconnection': true 
   });

   ioClient.on("connect", () => {
      //console.log('conectado')
   });

   ioClient.on("receive-message", async (data) => {
      try {
         const myLocalData = JSON.parse(await window.localStorage.getItem('csc_user'))
         if (data.userToId === myLocalData._id) {
            store.dispatch(chatCont.receiveMessage({
               ...data,
               userLocalId: data.userToId,
               userToId: data.userFromId
            }))
         }
      } catch (error) {
         console.log(error)
      }
   });
}