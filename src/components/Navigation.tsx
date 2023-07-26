import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonAvatar } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { bodyOutline, logInOutline, readerOutline, cardOutline, megaphoneOutline, logOutOutline } from 'ionicons/icons'
import React from 'react'
import { Route, Redirect, useHistory } from 'react-router'
import ContractPage from '../pages/ContractPage/ContractPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import PayPage from '../pages/PayPage/PayPage'
import ProfilePage from '../pages/ProfilePage/ProfilePage'
import PublicityPage from '../pages/PublicityPage/PublicityPage'
import { ProtectedRoute } from './ProtectedRoute'
import { useAuthStore } from '../store/auth'
import NewPassword from '../pages/ProfilePage/NewPassword'

function Navigation() {

  const isAuth = useAuthStore(state => state.isAuth)
  const profile = useAuthStore(state => state.profile)
  const logout = useAuthStore(state => state.logout)
  const navigate = useHistory()
  const username = profile.firstName + ' ' + profile.lastName

  return (
    <IonReactRouter>
      <IonMenu contentId='menu'>
        <IonHeader>
          <IonToolbar>
            <IonAvatar slot='start'>
              <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
            </IonAvatar>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <IonLabel>{username}</IonLabel>
            </div> 
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonMenuToggle>
              <IonItem routerLink='/auth/me' routerDirection='none'>
                <IonIcon color='medium' slot='start' icon={bodyOutline}></IonIcon>
                <IonLabel>Perfil</IonLabel>
              </IonItem>
            </IonMenuToggle>
            <IonMenuToggle>
              <IonItem routerLink='/auth/contract' routerDirection='none'>
                <IonIcon color='medium' slot='start' icon={readerOutline}></IonIcon>
                <IonLabel>Mi Contracto</IonLabel>
              </IonItem>
            </IonMenuToggle>
            <IonMenuToggle>
              <IonItem routerLink='/auth/pay' routerDirection='none'>
                <IonIcon color='medium' slot='start' icon={cardOutline}></IonIcon>
                <IonLabel>Mis Pagos</IonLabel>
              </IonItem>
            </IonMenuToggle>
            <IonMenuToggle>
              <IonItem routerLink='/auth/publicity' routerDirection='none'>
                <IonIcon color='medium' slot='start' icon={megaphoneOutline}></IonIcon>
                <IonLabel>Anuncios</IonLabel>
              </IonItem>
            </IonMenuToggle>
            <IonMenuToggle>
              <IonItem routerLink='/auth/login' routerDirection='none' onClick={() => {
                    logout()
                    navigate.push('/auth/login')}}>
                <IonIcon color='medium' slot='start' icon={logInOutline}></IonIcon>
                <IonLabel>Cerrar sesion</IonLabel>
              </IonItem>
            </IonMenuToggle>
          </IonList>
        </IonContent>
      </IonMenu>
      <IonRouterOutlet id='menu'>
        <Route exact path='/auth/me' component={ () => 
          <ProtectedRoute isAllowed={isAuth}>
            <ProfilePage/>
          </ProtectedRoute>}>
        </Route>
        <Route exact path='/auth/contract' component={ () => 
          <ProtectedRoute isAllowed={isAuth}>
            <ContractPage/>
          </ProtectedRoute>}>
        </Route>
        <Route exact path='/auth/pay' component={ () => 
          <ProtectedRoute isAllowed={isAuth}>
            <PayPage/>
          </ProtectedRoute>}>
        </Route>
        <Route exact path='/auth/publicity' component={ () => 
          <ProtectedRoute isAllowed={isAuth}>
            <PublicityPage/>
          </ProtectedRoute>}>
        </Route>
        <Route exact path='/auth/new-password' component={ () => 
          <ProtectedRoute isAllowed={isAuth}>
            <NewPassword/>
          </ProtectedRoute>
        }></Route>
        <Redirect to='/auth/me'></Redirect>
      </IonRouterOutlet>
    </IonReactRouter>
  )
}

export default Navigation