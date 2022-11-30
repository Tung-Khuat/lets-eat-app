import Avatar from 'react-avatar'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import FullViewLoading from '../../components/feedback/loadingIndicators/FullViewLoading'
import { PageTitle } from '../../components/StyledComponents/typography'
import { _logout } from '../../state/firebaseActions/auth-actions'
import BlobSceneBackground from '../layouts/BlobSceneBackground'
import PageWithSidebar from '../layouts/PageWithSidebarLayout'
import MealPlannerPlaceholder from './MealPlannerPlaceholder'

const PageContainer = styled.section`
   display: flex;
   width: 100%;
   justify-content: center;
   align-items: center;
   flex-direction: column;
`
const PageHeader = styled.header`
   display: flex;
   gap: 16px;
   margin-bottom: 32px;
   align-items: center;
`
const PageContent = styled.div`
   display: flex;
   flex-direction: column;
   /* flex-wrap: nowrap; */
   gap: 16px;
`
const MealPlannerContainer = styled.div``

function Dashboard() {
   const accountUser = useSelector(
      ({ app: { currentLocalAuthUser } }: any) => currentLocalAuthUser
   )

   if (!accountUser) return <FullViewLoading />

   return (
      <BlobSceneBackground>
         <PageWithSidebar>
            <PageContainer>
               <PageHeader>
                  <PageTitle
                     style={{ marginBlock: 16 }}
                  >{`Welcome ${accountUser.displayName}!`}</PageTitle>
                  <Avatar
                     name={accountUser.displayName}
                     size={'70'}
                     round
                     onClick={_logout}
                     style={{ cursor: 'pointer' }}
                  />
               </PageHeader>
               <PageContent>
                  <MealPlannerContainer>
                     <MealPlannerPlaceholder />
                  </MealPlannerContainer>
               </PageContent>
            </PageContainer>
         </PageWithSidebar>
      </BlobSceneBackground>
   )
}

export default Dashboard
