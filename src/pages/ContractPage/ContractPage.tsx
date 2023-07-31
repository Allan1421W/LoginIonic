import { IonAlert, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonLabel, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react'
import React, { useState } from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import DocuPDFPage from './DocuPDFPage'

function ContractPage() {

  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  return (
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                  <IonMenuButton/>
                </IonButtons>
                <IonTitle>Mi Contrato</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
          <PDFDownloadLink document={<DocuPDFPage></DocuPDFPage>} fileName='contrato.pdf'>
            <IonButton onClick={ async () => {
              try {
                setTimeout(() => setShowAlert(true), 3000);
              } catch (error) {
                setShowErrorAlert(true);
              }
            }}>
              Descargar PDF
            </IonButton>
          </PDFDownloadLink>
        </IonContent>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header='PDF Descargado con Exito'
          buttons={['Aceptar']}
        />
        <IonAlert
          isOpen={showErrorAlert}
          onDidDismiss={() => setShowErrorAlert(false)}
          header='Error al Descargar el PDF'
          buttons={['Aceptar']}
        />
    </IonPage>
  )
}

export default ContractPage