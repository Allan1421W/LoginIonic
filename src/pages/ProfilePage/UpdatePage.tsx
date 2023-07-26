import {useState} from 'react';
import {useAuthStore} from '../../store/auth'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { performUpdateRequest, updateRequest } from '../../auth/auth';


function UpdatePage() {

  const [formulario, setFormulario] = useState(false);
  const logout = useAuthStore(state => state.logout)
  const profile = useAuthStore(state => state.profile)

  type FormValues = {
    firstName: string;
    lastName: string;
    gender: string;
    city: string;
    documentNumber: string;
    phoneNumber: string;
  };
    
  return (
    <>
        <Formik
          initialValues={{
            firstName: (profile.firstName),
            lastName: (profile.lastName),
            gender: (profile.gender),
            city: (profile.city),
            documentNumber: (profile.documentNumber),
            phoneNumber: (profile.phoneNumber),
          }}
          validate={(valores) => {
            let errores: Partial<FormValues> = {};
  
            // Validacion de Nombre
            if(!valores.firstName){
              errores.firstName = "Por favor ingresa un nombre."
            } else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.firstName)){
              errores.firstName = "El nombre solo puede contener letras y espacios."
            }
  
            // Validacion del Apellido
            if(!valores.lastName){
              errores.lastName = "Por favor ingresa un apellido."
            } else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.lastName)){
              errores.lastName = "El apellido solo puede contener letras y espacios."
            }
  
            // Validacion de Genero
            if(!valores.gender){
              errores.gender = "Por favor selecciona un genero."
            }
  
            // Validacion de Ciudad
            if(!valores.city){
              errores.city = "Por favor ingresa una ciudad."
            } else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.city)){
              errores.city = "La ciudad solo puede contener letras y espacios"
            }
  
            // Validacion de Numero de Documento
            if(!valores.documentNumber){
              errores.documentNumber = "Por favor ingrese un numero de documento."
            } else if(!/^\d{10}$/.test(valores.documentNumber)){
              errores.documentNumber = "El numero de documento debe tener 10 digitos."
            }

            //Validacion de Numero de Celular
            if(!valores.phoneNumber){
              errores.phoneNumber = "Por favor ingrese un numero de celular."
            } else if(!/^\d{10}$/.test(valores.phoneNumber)){
              errores.phoneNumber = "El numero de celular debe tener 10 digitos"
            }
  
            return errores;
          }}
          onSubmit={async (valores: FormValues, { resetForm }) => {
            try {
              const response = await performUpdateRequest(valores);
              console.log(response); // Aquí puedes mostrar o manejar la respuesta de la solicitud, por ejemplo, mostrar un mensaje de éxito
              resetForm();
              setFormulario(true);
              setTimeout(() => setFormulario(false), 5000);
            } catch (error) {
              console.log('Error al actualizar el perfil: ' + error);
              // Aquí puedes mostrar o manejar el error, por ejemplo, mostrar un mensaje de error
            }
          }}
        >
          {({ errors }) => (
            <Form className='formulario'>
              <div>
                <label htmlFor='firstName'>Nombre</label><br/>
                <Field type='text' id='firstName' name='firstName' placeholder='Allan'/>
                <ErrorMessage name='firstName' component={() => <>{errors.firstName}</>} />
              </div><br/>

              <div>
                <label htmlFor='lastName'>Apellido</label><br/>
                <Field type='text' id='lastName' name='lastName' placeholder='Barreto' />
                <ErrorMessage name='lastName' component={() => <>{errors.lastName}</>} />
              </div><br/>

              <div>
                <label htmlFor='gender'>Genero</label><br/>
                <Field name='gender' as="select">
                  <option value="MALE">Masculino</option>
                  <option value="FEMALE">Femenino</option>
                </Field>
                <ErrorMessage name='gender' component={() => <>{errors.gender}</>} />
              </div><br/>

              <div>
                <label htmlFor='city'>Ciudad</label><br/>
                <Field type="text" id="city" name='city' placeholder="Ingresa una ciudad"/>
                <ErrorMessage name='city' component={() => <>{errors.city}</>} />
              </div><br/>
              
              <div>
                <label htmlFor='documentNumber'>Numero de Documento</label><br/>
                  <Field type="text" id="documentNumber" name="documentNumber" placeholder="1098651912"/>
                <ErrorMessage name='documentNumber' component={() => <>{errors.documentNumber}</>} />
              </div><br/>

              <div>
                <label htmlFor='phoneNumber'>Numero de Celular</label><br/>
                <Field type="text" id="phoneNumber" name="phoneNumber" placeholder="3146178812"/>
                <ErrorMessage name="phoneNumber" component={() => <>{errors.phoneNumber}</>}/>
              </div><br/>
              <button type='submit'>Actualizar</button>
              {formulario && <p className='exito'>Datos actualizados con exito</p>}
            </Form>
          )}
        </Formik>
      </>
  )
}

export default UpdatePage