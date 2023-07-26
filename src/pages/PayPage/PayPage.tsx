import { IonButtons, IonContent, IonHeader, IonLabel, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'

function PayPage() {
  return (
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonMenuButton/>
                </IonButtons>
                <IonTitle>Mis Pagos</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonLabel>HOLAAA</IonLabel>
        </IonContent>
    </IonPage>
  )
}

export default PayPage