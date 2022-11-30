import { CircularProgress } from '@material-ui/core'
import styled from 'styled-components'

export const HighlightText = styled.span`
   color: var(--color-text-highlight) !important;
   font-family: inherit;
`
export const ThemedCircleProgress = styled(CircularProgress)`
   color: var(--color-text-highlight) !important;
`
export const ThemedBaseColorCircleProgress = styled(CircularProgress)`
   color: var(--color-text-base) !important;
`
export const StandardCard = styled.div`
   padding: 5vw;
   border-radius: 16px;
   background: #1a1a1afa;
   width: 100%;
   display: block;
`
// 1a1a1aba
