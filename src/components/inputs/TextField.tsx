import { FiberManualRecord } from '@mui/icons-material'
import { ReactNode, useRef, useState } from 'react'
import styled from 'styled-components'

const MAX_LENGTH = 250

const TextFieldContainer = styled.div<any>`
   display: block;
   position: relative;
   width: 100%;
   height: 64px;
   min-width: 150px;
   border-radius: 16px;
   color: var(--color-text-base);
   background-color: var(--color-fill-accent);
   box-shadow: ${({ isFocused }) =>
      isFocused
         ? '0 0 0 1px var(--color-text-highlight), 0 0 4px 2px var(--color-text-highlight)'
         : 'none'};
`
const FieldLabel = styled.label<any>`
   position: absolute;
   color: ${({ isFocused }) =>
      isFocused ? 'var(--color-text-highlight)' : 'var(--color-text-muted)'};
   top: ${({ isRaised }) => (isRaised ? '4px' : '50%')};
   left: 16px;
   transform: translateY(${({ isRaised }) => (isRaised ? '0' : '-50%')});
   font-size: ${({ isRaised }) => (isRaised ? '0.7em' : '1em')};
   transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
   cursor: text;
`
const InputContainer = styled.div`
   height: 100%;
   display: flex;
`
const InputField = styled.input`
   width: 100%;
   height: 100%;
   padding: 16px;
   border-radius: 16px;
   color: var(--color-text-base);
   font-size: 16px;
   background-color: var(--color-fill-accent);
   border: none;
   box-sizing: border-box;
   &:focus-visible {
      outline: none;
   }
`
const InputAdornment = styled.div<any>`
   height: 100%;
   max-width: 50px;
   display: grid;
   justify-content: center;
   place-items: center;
   padding: ${({ hasItem }) => (hasItem ? '16px' : 0)};
   box-sizing: border-box;
`
const RequiredAsterisk = styled.span`
   height: 100%;
   display: flex;
   place-items: top;
   & svg {
      font-size: 5px;
      color: var(--color-text-highlight) !important;
      opacity: 0.7;
   }
`

export interface ITextField {
   label: string
   value: string
   onChange: (value: string) => void
   placeholder?: string
   required?: boolean
   readOnly?: boolean
   type?: string
   maxLength?: number
   startAdornment?: ReactNode
   endAdornment?: ReactNode
}

const TextField: React.FC<ITextField> = ({
   label = 'Unlabeled Field',
   value,
   onChange,
   placeholder = '',
   required = false,
   readOnly = false,
   type = 'text',
   startAdornment,
   endAdornment,
   maxLength = MAX_LENGTH,
   ...props
}) => {
   const [isFocused, setIsFocused] = useState(false)
   const inputRef = useRef<any>(null)
   return (
      <TextFieldContainer
         onFocus={() => setIsFocused(true)}
         onBlur={() => setIsFocused(false)}
         isFocused={isFocused}
      >
         <FieldLabel
            onClick={() => inputRef.current && inputRef.current.focus()}
            isRaised={isFocused || value?.length > 0}
         >
            <div style={{ display: 'flex', gap: 2 }}>
               {label}
               <RequiredAsterisk>
                  <FiberManualRecord />
               </RequiredAsterisk>
            </div>
         </FieldLabel>
         <InputContainer>
            <InputAdornment hasItem={startAdornment}>
               {startAdornment ? startAdornment : null}
            </InputAdornment>
            <InputField
               ref={inputRef}
               value={value}
               onChange={(e) => onChange(e.target.value)}
               placeholder={placeholder}
               required={required}
               readOnly={readOnly}
               type={type}
               maxLength={maxLength}
               {...props}
            />
            <InputAdornment hasItem={endAdornment}>
               {endAdornment ? endAdornment : null}
            </InputAdornment>
         </InputContainer>
      </TextFieldContainer>
   )
}

export default TextField
