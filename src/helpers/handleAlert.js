import { toast } from 'react-toastify'
import Loader from "react-loader-spinner";
//import i18next from 'i18next'

const messages = {
	create_success: { message: 'Se ha registrado exitosamente', type: 'success' },
	create_failed: { message: 'No se ha podido crear el registro', type: 'error' },
	update_success: { message: 'Registro actualizado exitosamente', type: 'success' },
	update_failed: { message: 'No se ha podido actualizar el registro', type: 'error' },
	delete_success: { message: 'Se ha eliminado el registro exitosamente', type: 'success' },
	delete_failed: { message: 'No se ha podido eliminar el registro', type: 'error' },
	change_status_success: { message: 'Se ha cambiado el estatus del registro exitosamente', type: 'success' },
	change_status_failed: { message: 'No se ha podido cambiar el estatus del registro', type: 'error' },
	list_failed: { message: 'No se han podido obtener los registros', type: 'error' },
	user_register_success: { message: 'Se ha registrado su usuario exitosamente. Puede iniciar sesión', type: 'success' },
	user_email_exists: { message: 'Ese email ya está registrado', type: 'error' },
	login_success: { message: 'Bienvenid@', type: 'success' },
	login_failed: { message: 'Usuario y/o contraseña incorrecta', type: 'error' },
	update_profile_success: { message: 'Se ha actualizado tu perfil', type: 'success' },
	update_profile_failed: { message: 'No hemos podido actualizar tu perfil', type: 'error' },
}

const props = {
	position: "top-right",
	autoClose: 5000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
	closeButton: true
}

const propsShowAlert = {
	autoClose: 5000, 
	closeButton: true, 
	closeOnClick: true,
	draggable: true
}

export function showAlert2(msg) {
	if (msg) {
		console.log('handleAlert', msg.toString())
		if (messages[msg]) {
			const value = messages[msg]
			toast[value.type](value.message, props)
		} else {
			toast.warning(msg.toString(), props)
		}
	}
}

export async function loadingAlert() {
	await toast(
		<div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
				<Loader
					type="Oval"
					color="gray"
					height={20}
					width={20}
				/>
			<span style={{marginLeft:8, marginBottom:2}}>Loading...</span>
	 	</div>, { 
		autoClose: false, 
		closeOnClick: false, 
		draggable: false, 
		closeButton: false,
		toastId: 'loadingAlert'
	})

	return 'loadingAlert'
}

export async function showAlert(msg, id = 'loadingAlert') {
	if (msg) {
		console.log('handleAlert', msg.toString())
		if (messages[msg]) {
			const value = messages[msg]
			await toast.update(id, { render: value.message, type: value.type, ...propsShowAlert })
		} else {
			await toast.update(id, { render: msg.toString(), type: 'warning', ...propsShowAlert })
		}
	}
}

export function showCustomAlert() {}