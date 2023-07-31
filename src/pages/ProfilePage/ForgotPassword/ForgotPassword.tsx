import { IonAlert, IonButton, IonContent, IonHeader, IonIcon, IonLabel, IonPage, IonRouterOutlet, IonTitle, IonToolbar } from "@ionic/react"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { codeRequest } from "../../../auth/auth"
import { useState } from "react"
import { useHistory } from "react-router"

const ForgotPassword: React.FC = () => {
  
  const history = useHistory()
  const navigate = () => {
    history.push('/auth/new-password')
  }
  const [showAlert, setShowAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  type FormValues = {
    email: string
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Recuperar Contraseña</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Formik
          initialValues={{
            email: '',
          }}

          validate={(valores) => {
            let errores: Partial<FormValues> = {};

             //Validacion del Correo
             if(!valores.email){
              errores.email = "Ingresa un Correo Electronico"
             } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.email)){
               errores.email = "El correo solo puede contener letras, numeros, guiones y guion bajo."
             }
             return errores
            }
          }
          onSubmit={ async (valores, {resetForm}) => {
            try {
              setShowAlert(true)
              const response = await codeRequest(valores.email)
              console.log(response)
              resetForm()
              setShowAlert(true)
              navigate()
            } catch (error){
              setShowErrorAlert(true)
            }
          }}
        >
          {({ errors }) => (
            <Form>
              <div>
                <label htmlFor="email">Introduce tu correo</label><br />
                <Field id='email' name='email' placeholder='Escribe tu Correo Electronico' /><br/>
                <ErrorMessage name='email' component={() => <>{errors.email}</>}/>
              </div>
              <IonButton type="submit">
                Enviar
              </IonButton>
              <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShowErrorAlert(false)}
                header="Codigo Enviado Exitosamente"
                buttons={['Aceptar']}
              />
              <IonAlert
                isOpen={showErrorAlert}
                onDidDismiss={() => setShowErrorAlert(false)}
                header="Error :("
                buttons={['Aceptar']}
              />
            </Form>
          )}
        </Formik>
      </IonContent>
    </IonPage>
  )
}

export default ForgotPassword;