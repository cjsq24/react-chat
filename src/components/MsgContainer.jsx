import { Col } from 'reactstrap';
import moment from 'moment'
import 'moment/locale/es';

moment.locale('es')

export default function MsgContainer(props) {
   const { userLocalId, message } = props

   const type = (userLocalId === message.sent_by_id) ? 'sent' : 'received'

   return (
      <Col
         className={'d-flex ' + (type === 'sent' ? 'justify-content-end' : 'justify-content-start')} 
         style={{ padding: 10 }}
      >
         <div className={`container-msg container-msg-${type}`}>
            <span style={{}} className={`content-message`}>{message.content}</span>
            <small style={{fontSize: 10, color: 'gray'}} className={`content-message`}>
               {(message?.date) ? 
                  moment(message.date).fromNow()
                  : ''
               }
            </small>
         </div>
      </Col>
   );
}