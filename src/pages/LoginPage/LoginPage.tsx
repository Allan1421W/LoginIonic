import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import { useAuthStore } from '../../store/auth';
import { useHistory } from 'react-router-dom'
import { loginRequest, profileRequest } from '../../auth/auth';
import './style.css'

const LoginPage: React.FC = () => {
  const setToken = useAuthStore(state => state.setToken)
  const setProfile = useAuthStore(state => state.setProfile)
  const navigate = useHistory()
  
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = (e.currentTarget.elements[0] as HTMLInputElement).value
    const password = (e.currentTarget.elements[1] as HTMLInputElement).value

    const resLogin = await loginRequest(email, password)
    setToken(resLogin.data.token)

    const resProfile = await profileRequest()
    setProfile(resProfile.data)
    navigate.push('/auth/me')
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
        <label>Correo Electronico</label><br />
        <input type="email" placeholder='email@email.com' /><br />
        <label>Contraseña</label><br />
        <input type="password" placeholder='*******'/><br />
        <button>
          Login
        </button>
      </form>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
