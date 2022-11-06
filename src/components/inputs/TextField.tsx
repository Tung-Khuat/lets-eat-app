import { useRef, useState } from 'react'
import styled from 'styled-components'

const InputFieldContainer = styled.div`
   display: block;
   position: relative;
   width: 100%;
   height: 64px;
   min-width: 150px;
   border-radius: 16px;
   color: var(--color-text-base);
   background-color: var(--color-fill-accent);
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
      box-shadow: 0 0 0 1px var(--color-text-highlight),
         0 0 4px 2px var(--color-text-highlight);
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
}

const TextField: React.FC<ITextField> = ({
   label = 'Unlabeled Field',
   value,
   onChange,
   placeholder = '',
   required = false,
   readOnly = false,
   type = 'text',
   ...props
}) => {
   const [isFocused, setIsFocused] = useState(false)
   const inputRef = useRef<any>(null)

   return (
      <InputFieldContainer
         onFocus={() => setIsFocused(true)}
         onBlur={() => setIsFocused(false)}
      >
         <FieldLabel
            onClick={() => inputRef.current && inputRef.current.focus()}
            isRaised={isFocused || value?.length > 0}
         >
            <span>{label}</span>
         </FieldLabel>
         <InputField
            ref={inputRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            required={required}
            readOnly={readOnly}
            type={type}
            {...props}
         />
      </InputFieldContainer>
   )
}

export default TextField
