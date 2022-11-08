import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const PageTitle = styled.header`
   font-size: 56px;
   line-height: 40px;
`

export const Subtitle = styled.p`
   color: var(--color-text-muted);
`

export const StyledLink = styled(Link)`
   cursor: pointer;
   color: var(--color-text-highlight);
   text-decoration: none;
`
