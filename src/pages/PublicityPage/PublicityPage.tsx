import { IonButtons, IonContent, IonHeader, IonLabel, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'

function PublicityPage() {
  return (
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonMenuButton/>
                </IonButtons>
                <IonTitle>Anuncios</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonLabel>
            Hola
          </IonLabel>
        </IonContent>
    </IonPage>
  )
}

export default PublicityPage