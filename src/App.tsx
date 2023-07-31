import { IonApp, IonContent, IonRouterOutlet, setupIonicReact } from '@ionic/react';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { useAuthStore } from './store/auth';
import Navigation from './components/Navigation';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router';
import NewPassword from './pages/ProfilePage/NewPassword/NewPassword';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import LoginPage from './pages/LoginPage/LoginPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import ForgotPassword from './pages/ProfilePage/ForgotPassword/ForgotPassword';

setupIonicReact();

function App() {
  const isAuth = useAuthStore(state => state.isAuth)
  const profile = useAuthStore(state => state.profile)
  return (

  <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <LoginPage></LoginPage>
          <Route path='/auth/login' component={LoginPage}></Route>
          <Route path='/auth/me' component={ () => 
            <ProtectedRoute isAllowed={isAuth}>
              <ProfilePage/>
            </ProtectedRoute>}></Route>
          <Redirect to='/auth/login'/>
          <Route path='/auth/forgot-password' component={ForgotPassword}></Route>
          <Route path='/auth/new-password' component={NewPassword}></Route>
        </IonRouterOutlet>
      </IonReactRouter>
      {(() => {
        if (isAuth && profile !== null) {
          return <Navigation />;
        } 
      })()}
  </IonApp>
  )
}

export default App;