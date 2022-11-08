import { Mail } from '@mui/icons-material'
import { useState } from 'react'
import styled from 'styled-components'
import FoodBackground from '../../assets/foodbackground1.jpg'
import FilledButton from '../../components/buttons/FilledButtons'
import TextField from '../../components/inputs/TextField'
import {
   PageTitle,
   StyledLink,
} from '../../components/StyledComponents/typography'
import ContentWithImageBackgroundLayout from '../layouts/ContentWithImageBackgroundLayout'
import { EMAIL_REGEX } from './config'

const LoginSection = styled.section`
   display: flex;
   justify-content: center;
   flex-direction: column;
   gap: 16px;
   padding: 5vw;
   background-color: var(--color-fill);
`
const LoginForm = styled.form`
   display: flex;
   flex-direction: column;
   gap: 16px;
`

const PasswordRecoveryPage = () => {
   const [email, setEmail] = useState('')
   const [helperText, setHelperText] = useState('')

   const handleSubmit = (e: any) => {
      e.preventDefault()
      const validForm = validateForm()
      if (validForm) {
         console.log(email)
      }
   }

   const validateForm = () => {
      if (!email) {
         setHelperText('Please enter all required fields')
         return false
      }
      if (!EMAIL_REGEX.test(email)) {
         setHelperText('Please enter a valid email address')
         return false
      }
      setHelperText('')
      return true
   }

   return (
      <ContentWithImageBackgroundLayout bgImage={FoodBackground}>
         <LoginSection>
            <PageTitle style={{ marginBottom: 16 }}>
               Password Reset
               <span
                  style={{
                     color: 'var(--color-text-highlight)',
                     fontSize: '1.3em',
                  }}
               >
                  .
               </span>
            </PageTitle>
            <LoginForm onSubmit={handleSubmit}>
               <TextField
                  label="Email"
                  value={email}
                  onChange={(value: string) => setEmail(value)}
                  endAdornment={<Mail />}
               />

               <FilledButton style={{ height: 64 }} onClick={handleSubmit}>
                  Reset Password
               </FilledButton>
            </LoginForm>
            {helperText && helperText}
            <StyledLink to="/login">Back to sign in.</StyledLink>
         </LoginSection>
      </ContentWithImageBackgroundLayout>
   )
}

export default PasswordRecoveryPage
