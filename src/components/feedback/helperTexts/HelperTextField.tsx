import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const FieldTypes = {
   success: {
      color: '#00521a',
      bgColor: '#12a50861',
   },
   error: {
      color: '#960101',
      bgColor: '#ff46464d',
   },
   default: {
      color: 'var(--color-text-base)',
      bgColor: '#6e6e6eab',
   },
}

const FieldContainer = styled.div`
   display: flex;
   background-color: #eeeeee;
   border-radius: 16px;
   width: 100%;
   overflow: hidden;
`
const FieldContent = styled.div<any>`
   width: 100%;
   height: 100%;
   padding: 24px;
   background-color: ${({ bgColor }) => (bgColor ? bgColor : 'transparent')};
   color: ${({ textColor }) =>
      textColor ? textColor : 'var(--color-text-base)'};
   font-weight: 500;
   display: flex;
   align-items: center;
`

interface IHelperTextField {
   children: React.ReactNode
   type?: keyof typeof FieldTypes
}
const HelperTextField: React.FC<IHelperTextField> = ({ children, type }) => {
   const [currentFieldType, setCurrentFieldType] = useState(FieldTypes.default)

   useEffect(() => {
      const checkType = () => {
         if (type === 'success') return FieldTypes.success

         if (type === 'error') return FieldTypes.error

         return FieldTypes.default
      }
      const fieldType = checkType()
      setCurrentFieldType(fieldType)
   }, [type])

   if (!currentFieldType) return <div />

   return (
      <FieldContainer>
         <FieldContent
            bgColor={currentFieldType.bgColor}
            textColor={currentFieldType.color}
         >
            {children}
         </FieldContent>
      </FieldContainer>
   )
}

export default HelperTextField
