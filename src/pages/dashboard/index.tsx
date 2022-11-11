import { useSelector } from 'react-redux'
import FilledButton from '../../components/buttons/FilledButtons'
import { PageTitle } from '../../components/StyledComponents/typography'
import { _logout } from '../../state/firebaseActions/auth-actions'

function Dashboard() {
   const accountUser = useSelector(
      ({ app: { currentLocalAuthUser } }: any) => currentLocalAuthUser
   )

   return (
      <div
         style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
         }}
      >
         {accountUser ? (
            <PageTitle
               style={{ marginBlock: 16 }}
            >{`Welcome ${accountUser.displayName}!`}</PageTitle>
         ) : null}

         <FilledButton onClick={_logout}>Sign out</FilledButton>
      </div>
   )
}

export default Dashboard
