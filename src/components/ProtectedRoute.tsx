import { Redirect } from 'react-router-dom'

interface Props {
    isAllowed: boolean
    children: React.ReactNode
}

export const ProtectedRoute = ({isAllowed, children}: Props) => {

    if (!isAllowed) return <Redirect to='/auth/login'/>
    return children
}