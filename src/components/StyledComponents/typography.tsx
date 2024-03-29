import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const LogoFont = styled.div`
   font-size: 52px;
   line-height: 48px;
   font-weight: 600;
   font-family: 'Parisienne', cursive;
`
export const PageTitle = styled.header`
   font-size: 52px;
   line-height: 40px;
   font-weight: 600;
`

export const Subtitle = styled.p`
   color: var(--color-text-muted);
`

export const StyledLink = styled(Link)`
   cursor: pointer;
   color: var(--color-text-highlight);
   text-decoration: none;
`
