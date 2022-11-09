import FilledButton from '../../components/buttons/FilledButtons'
import { PageTitle } from '../../components/StyledComponents/typography'
import { _logout } from '../../state/firebaseActions/auth-actions'

function Dashboard() {
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
         <PageTitle style={{ marginBlock: 16 }}>Hello World!</PageTitle>
         <FilledButton onClick={_logout}>Sign out</FilledButton>
      </div>
   )
}

export default Dashboard
