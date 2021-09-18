import { useHistory } from 'react-router-dom'
import { Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Label, Row } from "reactstrap";
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import validations from './validations'

import userCont from '../../redux/user/userController'

export default function Register() {
   const history = useHistory()
   const dispatch = useDispatch()
   const { register, formState: { errors }, handleSubmit } = useForm();

   const onSubmit = async (values) => {
      const resp = await dispatch(userCont.register(values))
      if (resp.success) {
         alert('Ahora puedes iniciar sesión')
         goToLogin()
      } else {
         alert('No se ha podido registrar')
      }
   }

   const goToLogin = () => {
      history.push('/login')
   }

   return (
      <div className='container pt-5'>
         <Row>
            <Col className='col-md-6 offset-md-3 col-sm-12'>
               <Card>
                  <CardHeader><h4>Registrar mi Cuenta</h4></CardHeader>
                  <CardBody>
                     <Form onSubmit={handleSubmit(onSubmit)}>
                        <FormGroup>
                           <Label>Nombres <span className='text-danger'>*</span></Label>
                           <input className='form-control' type="text" {...register('name', validations.name)} />
                           <small className='text-danger'>{errors?.name?.message}</small>
                        </FormGroup>
                        <FormGroup className='mt-2'>
                           <Label>Apellidos <span className='text-danger'>*</span></Label>
                           <input className='form-control' type="text" {...register('last_name', validations.last_name)} />
                           <small className='text-danger'>{errors?.last_name?.message}</small>
                        </FormGroup>
                        <FormGroup className='mt-2'>
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
                           <Button type='submit' style={{ width: '100%' }} color='primary'>Registrarme</Button>
                        </FormGroup>
                        <FormGroup className='mt-1'>
                           <Button style={{ width: '100%' }} color='secondary' onClick={goToLogin}>Ir a inicio de sesión</Button>
                        </FormGroup>
                     </Form>
                  </CardBody>
               </Card>
            </Col>
         </Row>
      </div>
   );
}