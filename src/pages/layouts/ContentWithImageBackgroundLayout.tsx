import { ReactNode } from 'react'
import styled from 'styled-components'
import Wave from '../../assets/wave.svg'

const LayoutContainer = styled.section<any>`
   display: grid;
   grid-template-columns: minmax(450px, 40%) 1fr;
   align-content: center;
   width: 100%;
   height: 100vh;
   background: url(${({ backgroundImage }) => backgroundImage});
   background-position: right;

   @media (max-width: 750px) {
      grid-template-columns: minmax(400px, 100%) 0;
   }
`
const BackgroundWave = styled.div`
   height: 100vh;
   background: url(${Wave});
   background-size: cover;
   background-repeat: no-repeat;
`
const BackgroundMask = styled.div`
   height: 100vh;
   background-image: linear-gradient(
      -225deg,
      #ffe29fa7 0%,
      #ffa99fa7 48%,
      #ff719aa7 100%
   );
`

interface IContentWithImageBackgroundLayout {
   children: ReactNode
   bgImage: string
}

const ContentWithImageBackgroundLayout: React.FC<
   IContentWithImageBackgroundLayout
> = ({ children, bgImage }) => {
   return (
      <LayoutContainer backgroundImage={bgImage}>
         {children}
         <BackgroundMask>
            <BackgroundWave />
         </BackgroundMask>
      </LayoutContainer>
   )
}

export default ContentWithImageBackgroundLayout
