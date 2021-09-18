import { useHistory } from 'react-router-dom'
import { Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Label, Row } from "reactstrap";
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import validations from './validations'
import useAuth from '../../auth/useAuth';

import userCont from '../../redux/user/userController'

export default function Login() {
   const history = useHistory()
   const dispatch = useDispatch()
   const auth = useAuth()
   const { register, formState: { errors }, handleSubmit } = useForm();

   const onSubmit = async (values) => {
      const resp = await dispatch(userCont.login(values))
      if (resp.success) {
         auth.login(resp.values)
         history.push('/dashboard')
      }
   }

   const goToRegister = () => {
      history.push('/register')
   }

   return (
      <div className='container pt-5'>
         <Row>
            <Col className='col-md-6 offset-md-3 col-sm-12'>
               <Card>
                  <CardHeader><h4>Inicio de Sesión</h4></CardHeader>
                  <CardBody>
                     <Form onSubmit={handleSubmit(onSubmit)}>
                        <FormGroup>
                           <Label>Email <span className='text-danger'>*</span></Label>
                           <input className='form-control' type="text" {...register('email', validations.email)} />
                           <small className='text-danger'>{errors?.email?.message}</small>
                        </FormGroup>
                        <FormGroup className='mt-2'>
                           <Label>Contraseña <span className='text-danger'>*</span></Label>
                           <input className='form-control' type="password" {...register('password', validations.password)} />
                           <small className='text-danger'>{errors?.password?.message}</small>
                        </FormGroup>
                        <FormGroup className='mt-3'>
                           <Button type='submit' style={{width:'100%'}} color='primary'>Iniciar Sesión</Button>
                        </FormGroup>
                        <FormGroup className='mt-1'>
                           <Button style={{width:'100%'}} color='secondary' onClick={goToRegister}>Registrarme</Button>
                        </FormGroup>
                     </Form>
                  </CardBody>
               </Card>
            </Col>
         </Row>
      </div>
   );
}