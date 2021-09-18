import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Form, Input, InputGroup, InputGroupAddon, Row } from 'reactstrap';
import { FaPaperPlane } from 'react-icons/fa';
import MsgContainer from '../../components/MsgContainer';
import useLocalStorage from '../../helpers/useLocalStorage';

import chatCont from '../../redux/chat/chatController'
import userCont from '../../redux/user/userController'

import Inbox from "./Inbox";

export default function Chat() {
   const params = useParams()
   const dispatch = useDispatch()
   const [userSelected, setUserSelected] = useState()
   const chat = useSelector(store => store.chat)
   const [message, setMessage] = useState('')
   const [userLocal] = useLocalStorage('csc_user')

   useEffect(() => {
      if (params?.userToId) {
         const getChat = async () => {
            const resp = await dispatch(userCont.get(params.userToId))
            if (resp.success) {
               setUserSelected(resp.values)
               await dispatch(chatCont.getChat(params.userToId))
            }
         }
         getChat()
      } else {
         setUserSelected()
      }
   }, [params, dispatch])


   const setUserToChat = async (value) => {
      setUserSelected(value)
      await dispatch(chatCont.getChat(value._id))
   }

   const sendMessage = async (e) => {
      e.preventDefault()
      if (message === '') return
      const resp = await dispatch(chatCont.sendMessage({
         user_local_id: userLocal._id,
         user_to_id: userSelected._id,
         content: message
      }))

      if (resp.success) {
         setMessage('')
      }
   }

   return (
      <Row style={{ height: '91vh' }}>
         <Col md='8' sm='8' xs='12' className='p-3' style={{ height: '100%' }}>
            <Card style={{ height: '100%' }}>
               {userSelected &&
                  <>
                     <CardHeader>
                        <div>
                           <h6>
                              {`${userSelected.name} ${userSelected.last_name}`}
                              <small style={{ marginLeft: 10 }}>({userSelected.email})</small>
                           </h6>
                        </div>
                     </CardHeader>
                     <CardBody className='d-flex' style={{flexDirection: 'column-reverse', overflowY: 'scroll'}}>
                        <div style={{width:'100%'}}>
                           {chat.messages?.length > 0 &&
                              chat.messages.map((message, i) => (
                                 <MsgContainer key={i} userLocalId={userLocal._id} message={message} />
                              ))
                           }
                        </div>
                     </CardBody>
                     <CardFooter>
                        <Form onSubmit={sendMessage}>
                           <InputGroup>
                              <Input placeholder='Escribe tu mensaje aquí' value={message} onChange={(e) => setMessage(e.target.value)} />
                              <InputGroupAddon addonType="append">
                                 <Button type='submit' color="primary">
                                    <FaPaperPlane />
                                 </Button>
                              </InputGroupAddon>
                           </InputGroup>
                        </Form>
                     </CardFooter>
                  </>
               }
            </Card>
         </Col>
         <Col md='4' sm='4' xs='12' className='p-3' style={{ height: '100%' }}>
            <Inbox setUserToChat={setUserToChat} />
         </Col>
      </Row>
   );
}