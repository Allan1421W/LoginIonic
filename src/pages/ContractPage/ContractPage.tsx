import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonLabel, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import DocuPDFPage from './DocuPDFPage'

function ContractPage() {
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
            <IonButton>Descargar PDF</IonButton>
          </PDFDownloadLink>
        </IonContent>
    </IonPage>
  )
}

export default ContractPage