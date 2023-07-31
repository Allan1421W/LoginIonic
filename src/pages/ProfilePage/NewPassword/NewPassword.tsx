import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { IonAlert, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { eye, eyeOff } from 'ionicons/icons';
import { passwordRequest } from '../../../auth/auth';
import { useHistory } from 'react-router-dom';
import { arrowBackOutline } from 'ionicons/icons';

const NewPassword: React.FC = () => {

  const history = useHistory()
  const navigate = () => {
    history.push('/auth/me')
  }

  const [savePassword, setSavePassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  type FormValues = {
    password: string;
    confPassword: string;
    email: string;
    code: string;
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Cambiar contraseña</IonTitle>
          <IonButton onClick={navigate} routerDirection='none' slot='end'>
            <IonIcon icon={arrowBackOutline}></IonIcon>
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Formik
          initialValues={{
            password: '',
            confPassword: '',
            email: '',
            code: 1,
          }}
          validate={(valores) => {
            let errores: Partial<FormValues> = {};

            //Validacion del Correo
            if(!valores.email){
              errores.email = "Introduzca un Correo Electronico"
            } else if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.email)){
              errores.email = "El correo solo puede contener letras, numeros, guiones y guion bajo."
            } 

            //Validacion de la Contraseña
            if(!valores.password){
              errores.password = "Introduzca una Contraseña"
            }
            else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/.test(valores.password)) {
              errores.password = "La contraseña debe tener entre 8 y 15 caracteres, al menos una mayúscula, una minúscula, un número y un carácter especial";
            }

            //Validacion de que ambas contraseñas coincidan
            if (valores.password !== valores.confPassword) {
              errores.confPassword = "Las contraseñas no son iguales";
            }

            //Validacion del Codigo
            if(!valores.code){
              errores.code = "Ingresa un Codigo"
              //@ts-ignore
            } else if (!/^[1-9]\d*$/.test(valores.code)){
              errores.code = "El codigo solo puede contener numeros"
            }

            return errores;
          }}
          onSubmit={ async (valores, { resetForm }) => {
            try {
            const response = await passwordRequest(valores.email, valores.password, valores.code);
            resetForm();
            console.log(response);
            setSavePassword(true);
            setTimeout(() => setSavePassword(false), 5000);
            } catch(error){
              setShowErrorAlert(true)
              console.log('No se pudo guardar la contraseña: ' + error)
              console.log(valores)
            }
          }}
        >
          {({ errors }) => (
            <Form className='conrtainer-form'>
              <div>
                <label htmlFor='email'>Correo electronico:</label><br />
                <div>
                  <Field id='email' name='email' placeholder='Escribe un Correo Electronico'/><br />
                  <ErrorMessage name='email' component={() =><>{errors.email}</>}/>
                </div>
              </div><br />
              <div>
                <label htmlFor='code'>Codigo para Cambiar Contraseña:</label><br />
                <div>
                  <Field type='number' id='code' name='code' placeholder='Escribe el Codigo Enviado'/><br />
                  <ErrorMessage name='code' component={() => <>{errors.code}</>}/>
                </div>
              </div><br />
              <div>
                <label htmlFor='password'>Nueva Contraseña:</label><br />
                <div style={{ position: 'relative' }}>
                  <Field
                    type={showPassword ?'text' : 'password'}
                    id='password'
                    name='password'
                    placeholder='Escribe la Nueva Contraseña'
                  />
                  <span
                    onClick={toggleShowPassword}
                    style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', cursor: 'pointer' }}
                  >
                    <IonIcon icon={showPassword ? eyeOff : eye} />
                  </span>
                </div>
                <br />
                <ErrorMessage name='password' component={() => <>{errors.password}</>} />
              </div>
              <br />
              <div>
                <label htmlFor='confPassword'>Confirma la contraseña:</label><br />
                <div style={{ position: 'relative' }}>
                  <Field
                    type={showPassword ? 'text' : 'password'}
                    id='confPassword'
                    name='confPassword'
                    placeholder='Confirma la Contraseña'
                  />
                  <span
                    onClick={toggleShowPassword}
                    style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', cursor: 'pointer' }}
                  >
                    <IonIcon icon={showPassword ? eyeOff : eye} />
                  </span>
                </div>
                <br />
                <ErrorMessage name='confPassword' component={() => <>{errors.confPassword}</>} />
              </div>
              <br />
              <IonButton type='submit'>Guardar Contraseña</IonButton>
              <IonAlert
                isOpen={savePassword}
                onDidDismiss={() => setSavePassword(false)}
                header='Contraseña Guardada Correctamente'
                buttons={['Aceptar']}
              />
              <IonAlert 
              isOpen={showErrorAlert}
              onDidDismiss={() => setShowErrorAlert(false)}
              header='Error al Cambiar la Contraseña'
              buttons={['Aceptar']}
              />
            </Form>
          )}
        </Formik>
      </IonContent>
    </IonPage>
  );
}

export default NewPassword;