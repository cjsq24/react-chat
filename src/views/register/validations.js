const validations = {
   name: {
      required: 'Ingrese el nombre'
   }, 
   last_name: {
      required: 'Ingrese los apellidos'
   },
   email: {
      required: 'Ingrese el email',
      pattern: { 
         value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
         message: 'Ingrese un email válido'
      }
   }, 
   password: {
      required: 'Ingrese la contraseña',
      minLength: {value: 4, message: 'Debe tener mínimo 4 caracteres'},
      maxLength: {value: 12, message: 'No puede tener más de 12 caracteres'}
   }
}

export default validations