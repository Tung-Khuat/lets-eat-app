import { ReactNode } from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
   color: var(--color-text-base);
   background-color: var(--color-button-accent);
   padding: 12px 16px;
   border-radius: 8px;
   cursor: pointer;
   border: none;
   min-width: 100px;
   &:hover {
      background-color: var(--color-button-accent-hover);
      opacity: 0.9;
   }
`

export interface IFilledButton {
   children: ReactNode
   onClick: React.MouseEventHandler
}

const FilledButton: React.FC<IFilledButton> = ({ children, onClick }) => {
   return <StyledButton onClick={onClick}>{children}</StyledButton>
}

export default FilledButton
