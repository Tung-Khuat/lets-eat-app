import { ReactNode } from 'react'
import styled from 'styled-components'
import { StandardCard } from '../../components/StyledComponents/common'
import Sidebar, { SIDEBAR_WIDTH } from './Sidebar'

const LayoutContainer = styled.div`
   display: grid;
   grid-template-columns: ${SIDEBAR_WIDTH}px 1fr;
   align-content: center;
   margin: 3px;
   gap: 3px;
`
const SidebarContainer = styled.div``

const ContentCard = styled(StandardCard)`
   min-height: calc(100vh - 4px);
   background: #1a1a1aba;
`
interface IPageWithSidebarLayout {
   children: ReactNode
}

const PageWithSidebarLayout: React.FC<IPageWithSidebarLayout> = ({
   children,
}) => {
   return (
      <LayoutContainer>
         <SidebarContainer>
            <Sidebar />
         </SidebarContainer>
         <ContentCard>{children}</ContentCard>
      </LayoutContainer>
   )
}

export default PageWithSidebarLayout
