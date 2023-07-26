import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { eye, eyeOff } from 'ionicons/icons';
import { passwordRequest } from '../../auth/auth';
import { useHistory } from 'react-router-dom';
import { arrowBackOutline } from 'ionicons/icons';

const NewPassword: React.FC = () => {

  const history = useHistory()
  const navigate = () => {
    history.push('/auth/me')
  }

  const [savePassword, setSavePassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  type FormValues = {
    password: string;
    confPassword: string;
    email: string;
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
          }}
          validate={(valores) => {
            let errores: Partial<FormValues> = {};

            if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.email)){
              errores.email = "El correo solo puede contener letras, numeros, guiones y guion bajo."
            } 

            //Validacion de la Contraseña
            if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/.test(valores.password)) {
              errores.password = "La contraseña debe tener entre 8 y 15 caracteres, al menos una mayúscula, una minúscula, un número y un carácter especial";
            }

            //Validacion de que ambas contraseñas coincidan
            if (valores.password !== valores.confPassword) {
              errores.confPassword = "Las contraseñas no son iguales";
            }

            return errores;
          }}
          onSubmit={(valores, { resetForm }) => {
            try {
            passwordRequest(valores.email, valores.password);
            resetForm();
            console.log(valores);
            setSavePassword(true);
            setTimeout(() => setSavePassword(false), 5000);
            } catch(error){
              console.log('No se pudo guardar la contraseña: ' + error)
            }
          }}
        >
          {({ errors }) => (
            <Form>
              <div>
                <label htmlFor='email'>Correo electronico:</label><br />
                <div>
                  <Field type='email' id='email' name='email' placeholder='correo@correo@com'/><br />
                  <ErrorMessage name='email' component={() =><>{errors.email}</>}/>
                </div>
              </div><br />
              <div>
                <label htmlFor='password'>Contraseña</label><br />
                <div style={{ position: 'relative' }}>
                  <Field
                    type={showPassword ?'text' : 'password'}
                    id='password'
                    name='password'
                    placeholder='************'
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
                <label htmlFor='confPassword'>Confirma la contraseña</label><br />
                <div style={{ position: 'relative' }}>
                  <Field
                    type={showPassword ? 'text' : 'password'}
                    id='confPassword'
                    name='confPassword'
                    placeholder='*************'
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
              <button type='submit'>Guardar Contraseña</button>
              {savePassword && <p className='exito'>Contraseña guardada correctamente</p>}
            </Form>
          )}
        </Formik>
      </IonContent>
    </IonPage>
  );
}

export default NewPassword;
