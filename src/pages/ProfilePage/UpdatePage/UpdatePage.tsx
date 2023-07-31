import {useState} from 'react';
import {useAuthStore} from '../../../store/auth'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { performUpdateRequest, updateRequest } from '../../../auth/auth';
import { IonAlert, IonButton } from '@ionic/react';

function UpdatePage() {

  const profile = useAuthStore(state => state.profile);

  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

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
              console.log(response); 
              resetForm();
              setShowAlert(true)
            } catch (error) {
              setShowErrorAlert(true)
              throw error;
            }
          }}
        >
          {({ errors }) => (
            <Form className='formulario'>
              <div>
                <label htmlFor='firstName'>Nombre</label><br/>
                <Field type='text' id='firstName' name='firstName' placeholder='Escribe tu Nombre'/><br />
                <ErrorMessage name='firstName' component={() => <>{errors.firstName}</>} />
              </div><br/>

              <div>
                <label htmlFor='lastName'>Apellido</label><br/>
                <Field type='text' id='lastName' name='lastName' placeholder='Escribe tu Apellido' /><br />
                <ErrorMessage name='lastName' component={() => <>{errors.lastName}</>} />
              </div><br/>

              <div>
                <label htmlFor='gender'>Genero</label><br/>
                <Field name='gender' as="select">
                  <option value="MALE">Masculino</option>
                  <option value="FEMALE">Femenino</option>
                </Field><br />
                <ErrorMessage name='gender' component={() => <>{errors.gender}</>} />
              </div><br/>

              <div>
                <label htmlFor='city'>Ciudad</label><br/>
                <Field type="text" id="city" name='city' placeholder="Escribe una Ciudad"/><br />
                <ErrorMessage name='city' component={() => <>{errors.city}</>} />
              </div><br/>
              
              <div>
                <label htmlFor='documentNumber'>Numero de Documento</label><br/>
                  <Field type="text" id="documentNumber" name="documentNumber" placeholder="Escribe tu Numero de Documento"/><br />
                <ErrorMessage name='documentNumber' component={() => <>{errors.documentNumber}</>} />
              </div><br/>

              <div>
                <label htmlFor='phoneNumber'>Numero de Celular</label><br/>
                <Field type="text" id="phoneNumber" name="phoneNumber" placeholder="Escribe tu Numero de Celular"/><br />
                <ErrorMessage name="phoneNumber" component={() => <>{errors.phoneNumber}</>}/>
              </div><br/>
              <IonButton type='submit'>Actualizar</IonButton>
              <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                header='Usuario Actualizado Correctamente'
                buttons={['Aceptar']}
              />
              <IonAlert
                isOpen={showErrorAlert}
                onDidDismiss={() => setShowErrorAlert(false)}
                header='Error al Actualizar Usuario'
                buttons={['Aceptar']}
              />
            </Form>
          )}
        </Formik>
      </>
  )
}

export default UpdatePage