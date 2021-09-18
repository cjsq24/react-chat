import { useEffect, useState } from 'react'
import { Col, Row } from 'reactstrap'

export default function InboxContent(props) {
   const { chat, userLocalId, selectUser } = props
   const [user, setUser] = useState()

   useEffect(() => {
      const getUser = chat.users_id.filter(user => user._id !== userLocalId)
      setUser({
         _id: getUser[0]._id,
         name: getUser[0].name
      })
   }, [chat, userLocalId])

   return (
      <Row>
         <Col className='inbox-item' onClick={() => selectUser(user)}>
            <span style={{ fontSize: 14, fontWeight:'bold' }}>{user?.name}</span> <br />
            <span style={{ fontSize: 12 }}>
               {`
                  ${chat.messages.sent_by_id === userLocalId ? 'Tú: ' : ''}
                  ${chat.messages.content.slice(0, 50)}...`
               }
            </span>
         </Col>
      </Row>
   );
}