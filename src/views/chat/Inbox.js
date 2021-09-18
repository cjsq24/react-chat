import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Button, Card, CardBody, CardHeader, Form, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import { FaSearch } from 'react-icons/fa';
import useLocalStorage from '../../helpers/useLocalStorage';

import InboxContent from '../../components/InboxContent';
import chatCont from '../../redux/chat/chatController'
import userCont from '../../redux/user/userController'

export default function Inbox(props) {
   const history = useHistory()
   const dispatch = useDispatch()
   const chat = useSelector(store => store.chat)
   const [search, setSearch] = useState('')
   const [userList, setUserList] = useState([])
   const [userLocal] = useLocalStorage('csc_user')

   //console.log(...chat.list)

   useEffect(() => {
      dispatch(chatCont.list())
   }, [dispatch])

   useEffect(() => {
      if (search === '') {
         setUserList([])
      }
   }, [search])

   const filterUser = async (e) => {
      if (e) {
         e.preventDefault()
      }
      if (search === '') return
      const resp = await dispatch(userCont.filter(search))
      if (resp.success) {
         setUserList(resp.values)
      }
   }

   const selectUser = (user) => {
      setSearch('')
      history.push(`/chat/${user._id}`)
   }

   return (
      <Card style={{ height: '100%' }}>
         <CardHeader>
            <Form onSubmit={filterUser}>
               <div className='autocomplete'>
                  <InputGroup>
                     <Input 
                        placeholder='Buscar un usuario' 
                        value={search} 
                        onChange={(e) => {
                           setSearch(e.target.value);
                           filterUser()
                        }} 
                     />
                     <InputGroupAddon addonType="append">
                        <Button type='submit' color="success">
                           <FaSearch />
                        </Button>
                     </InputGroupAddon>
                  </InputGroup>

                  {search !== '' && userList?.length > 0 &&
                     <div className='autocomplete-items-container'>
                        {userList.map((user, i) => (
                           <div key={i} className='autocomplete-items' onClick={() => selectUser(user)}>
                              <span style={{ fontSize: 14 }}>{`${user.name} ${user.last_name}`}</span> <br />
                              <span style={{ fontSize: 10, color: 'gray' }}>{user.email}</span>
                           </div>
                        ))}
                     </div>
                  }
               </div>
            </Form>
         </CardHeader>
         <CardBody>
            {chat.list?.length > 0 &&
               chat.list.map((chat, i) => (
                  <InboxContent key={i} chat={chat} userLocalId={userLocal._id} selectUser={selectUser} />
               ))
            }
         </CardBody>
      </Card>
   );
}