import { IonAlert, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonToast, IonIcon, IonLoading, IonInput, IonButton, IonRouterOutlet, IonFooter } from '@ionic/react';
import { useAuthStore } from '../../store/auth';
import { useHistory } from 'react-router-dom'
import { loginRequest, profileRequest } from '../../auth/auth';
import './style.css'
import { useState } from 'react';

const LoginPage: React.FC = () => {
  const setToken = useAuthStore(state => state.setToken)
  const setProfile = useAuthStore(state => state.setProfile)
  const navigate = useHistory()

  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showLoadingAlert, setShowLoadingAlert] = useState(false);
  
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = (e.currentTarget.elements[0] as HTMLInputElement).value
    const password = (e.currentTarget.elements[1] as HTMLInputElement).value
    try {
    setShowLoadingAlert(true)
    const resLogin = await loginRequest(email, password)
    setToken(resLogin.data.token)

    const resProfile = await profileRequest()
    setProfile(resProfile.data)
    navigate.push('/auth/me')
    } catch (error) {
      setShowErrorAlert(true);
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton/>
            </IonButtons>
            <IonTitle>Registrate</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='container-form'>
        <form onSubmit={handleSubmit}>
          <IonInput className='ion-input' type='email' label="Correo Electronico" labelPlacement="floating" fill="outline" placeholder="Escribe un Correo Electronico" required/><br />
          <IonInput type='password' label="Contraseña" labelPlacement="floating" fill="outline" placeholder="Escribe una Contraseña" required/>
          <IonButton type='submit'>
            Login
          </IonButton>
        </form>
      </IonContent>
      <IonFooter>
        <IonButton expand='full' onClick={() => navigate.push('/auth/forgot-password')}>Olvide mi Contraseña</IonButton>
      </IonFooter>
      <IonLoading
        isOpen={showLoadingAlert}
        onDidDismiss={() => setShowLoadingAlert(false)}
        duration={100}
      />
      <IonAlert
        isOpen={showErrorAlert}
        onDidDismiss={() => setShowErrorAlert(false)}
        header="Error al Iniciar Sesion"
        buttons={['Aceptar']}
      />
    </IonPage>
  );
};

export default LoginPage;
