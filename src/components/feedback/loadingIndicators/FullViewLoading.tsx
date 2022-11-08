import styled from 'styled-components'
import { ThemedCircleProgress } from '../../StyledComponents/common'

const LoadingContainer = styled.div`
   width: 100vw;
   height: 100vh;
   display: flex;
   align-items: center;
   justify-content: center;
`

export default function FullViewLoading() {
   return (
      <LoadingContainer>
         <ThemedCircleProgress style={{ width: 50, height: 50 }} />
      </LoadingContainer>
   )
}
