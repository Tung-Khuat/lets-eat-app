import React, { ReactNode } from 'react'
import styled, { keyframes } from 'styled-components'
import AnimatedBlobBackground1 from '../../assets/animatedBlob1.svg'
import AnimatedBlobBackground2 from '../../assets/animatedBlob2.svg'

const triangleFloat = keyframes`
	0%{transform: translate(0, 0)}
   40%{transform: translate(150px, 30px)}
   80%{transform: translate(400px, 100px)}
   100%{transform: translate(0, 0)}
`
const LayoutContainer = styled.section<any>`
   position: relative;
`
const BlobBackground = styled.div<any>`
   width: 100%;
   position: relative;
   overflow: hidden;
   &::before {
      width: 150%;
      height: 150%;
      content: '';
      position: fixed;
      top: -35%;
      left: -55%;
      z-index: -1;
      background: url(${({ topLeftImage }) => topLeftImage});
      background-repeat: no-repeat;
      animation: ${triangleFloat} 45s infinite;
   }
   &::after {
      content: '';
      width: 150%;
      height: 170%;
      position: fixed;
      bottom: -35%;
      right: -85%;
      z-index: -1;
      background: url(${({ bottomRight }) => bottomRight});
      background-repeat: no-repeat;
      animation: ${triangleFloat} 45s infinite;
      animation-delay: 2s;
   }
`
const ContentContainer = styled.div`
   width: 100%;
   height: 100%;
   z-index: 5;
   /* backdrop-filter: blur(40px); */
`

interface IBlobSceneBackground {
   children: ReactNode
}

const BlobSceneBackground: React.FC<IBlobSceneBackground> = ({ children }) => {
   return (
      <LayoutContainer>
         <ContentContainer>{children}</ContentContainer>
         <BlobBackground
            topLeftImage={AnimatedBlobBackground1}
            bottomRight={AnimatedBlobBackground2}
         />
      </LayoutContainer>
   )
}

export default BlobSceneBackground
