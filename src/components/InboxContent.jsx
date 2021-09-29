import { useEffect, useState } from 'react'
import { Col, Row } from 'reactstrap'

export default function InboxContent(props) {
   const { chat, userLocalId, selectUser, focusUserId } = props
   const [user, setUser] = useState()

   useEffect(() => {
      const getUser = chat.users_id.filter(user => user._id !== userLocalId)
      setUser({
         _id: getUser[0]._id,
         name: getUser[0].name,
         focus: focusUserId === getUser[0]._id ? true : false
      })
   }, [chat, userLocalId, focusUserId])

   return (
      <Row>
         <Col className={`inbox-item ${user?.focus ? 'inbox-focus' : ''}`} onClick={() => !user?.focus ? selectUser(user) : null}>
            <span style={{ fontSize: 14, fontWeight: 'bold' }}>{user?.name}</span> <br />
            <span style={{ fontSize: 12 }}>
               {chat.messages.sent_by_id === userLocalId ? (
                  <span style={{ fontWeight: 'bold', fontSize: 12 }}>Tú: </span>
                  ) : (
                     ''
                  )
               }
               {`${chat.messages?.content?.slice(0, 40)}${chat.messages.content.length > 40 ? '...' : ''}`}
            </span>
         </Col>
      </Row>
   );
}