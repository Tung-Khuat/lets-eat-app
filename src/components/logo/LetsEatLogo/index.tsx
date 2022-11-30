import styled from 'styled-components'
import { HighlightText } from '../../StyledComponents/common'
import { LogoFont } from '../../StyledComponents/typography'
import LetsEatLogoIcon from './LetsEatLogoIcon'

const Logo = styled.div`
   display: flex;
   place-items: center;
   justify-content: center;
`

export default function LetsEatLogo() {
   return (
      <Logo>
         <div>
            <LogoFont>
               Let
               <HighlightText>'</HighlightText>s
            </LogoFont>
            <LogoFont>
               Eat<HighlightText>!</HighlightText>
            </LogoFont>
         </div>
         <div>
            <LetsEatLogoIcon />
         </div>
      </Logo>
   )
}
