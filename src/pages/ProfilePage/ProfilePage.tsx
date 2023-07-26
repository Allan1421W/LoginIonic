import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonMenuButton, IonModal, IonPage, IonRouterOutlet, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';
import { useState } from 'react';
import { useAuthStore } from '../../store/auth';
import UpdatePage from './UpdatePage';

import { Route, useHistory } from 'react-router';

const ProfilePage: React.FC = () => {
    const history= useHistory()
    const navigate = () => {
      history.push('/auth/new-password');
    };
    const profile = useAuthStore(state => state.profile)

    const [isOpenUp, setIsOpenUp] = useState(false);

  return (
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonMenuButton/>
                </IonButtons>
                <IonTitle>Perfil de Usuario</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <IonGrid>
                <IonRow>
                  <IonCol>
                    <IonLabel>Nombre:</IonLabel><br />
                    {profile.firstName}
                  </IonCol>
                  <IonCol>
                  <IonLabel>Apellido:</IonLabel><br />
                    {profile.lastName}
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                  <IonLabel>Genero:</IonLabel><br />
                      {(() => {
                        if (profile.gender == 'MALE') {
                          return "Femenino";
                        } else if(profile.gender == 'FEMALE'){
                          return "Masculino";
                        }
                      })()}
                      
                  </IonCol>
                  <IonCol>
                  <IonLabel>Ciudad:</IonLabel><br />
                    {profile.city}
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                  <IonLabel>Numero de Documento:</IonLabel><br />
                    {profile.documentNumber}
                  </IonCol>
                  <IonCol>
                  <IonLabel>Numero de Celular:</IonLabel><br />
                    {profile.phoneNumber}
                  </IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>
        <IonContent className="ion-padding">
        <IonButton expand="block" onClick={() => setIsOpenUp(true)}>
          Actualizar Usuario
        </IonButton>
        <IonModal isOpen={isOpenUp}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Hola {profile.firstName}</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsOpenUp(false)}>Cerrar</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <UpdatePage></UpdatePage>
          </IonContent>
        </IonModal>
      </IonContent>
      <IonContent>
            <IonButton onClick={navigate} routerDirection='none'>Cambiar contraseña</IonButton>
      </IonContent>
    </IonPage>
  )
};

export default ProfilePage;