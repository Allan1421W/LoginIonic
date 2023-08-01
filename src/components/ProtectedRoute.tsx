import { IonRouterOutlet } from '@ionic/react'
import { Redirect, Route } from 'react-router-dom'

interface Props {
    isAllowed: boolean
    children?: React.ReactNode
}

export const ProtectedRoute = ({isAllowed, children}: Props) => {
    if (!isAllowed) return <Redirect to='/auth/login'/>
    return children ? <>{children}</> : <IonRouterOutlet/>
}