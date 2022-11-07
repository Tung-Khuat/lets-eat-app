import { Mail, Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useState } from 'react'
import styled from 'styled-components'
import FoodBackground from '../../assets/foodbackground2.jpg'
import FilledButton from '../../components/buttons/FilledButtons'
import TextField from '../../components/inputs/TextField'
import {
   PageTitle,
   StyledLink,
   Subtitle,
} from '../../components/StyledComponents/typography'
import ContentWithImageBackgroundLayout from '../layouts/ContentWithImageBackgroundLayout'
import { EMAIL_REGEX, MIN_PASSWORD_LENGTH, PASSWORD_REGEX } from './config'

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
const PasswordIconButton = styled(IconButton)`
   color: var(--color-text-muted);
   transform: translateY(-4px);
   &:hover svg {
      color: var(--color-text-base);
   }
`

const LoginPage = () => {
   const [loginDetails, setLoginDetails] = useState({
      email: '',
      password: '',
   })
   const [helperText, setHelperText] = useState('')
   const [showPassword, setShowPassword] = useState(false)

   const updateInputValue = (value: object) => {
      setLoginDetails({ ...loginDetails, ...value })
   }

   const handleSubmit = (e: any) => {
      e.preventDefault()
      const validForm = validateForm()
      if (validForm) {
         console.log(loginDetails)
      }
   }

   const validateForm = () => {
      const { email, password } = loginDetails
      if (!email || !password) {
         setHelperText('Please enter all required fields')
         return false
      }
      if (!EMAIL_REGEX.test(email)) {
         setHelperText('Please enter a valid email address')
         return false
      }
      if (!PASSWORD_REGEX.test(password)) {
         setHelperText(
            `Please enter a valid password. It must be at least ${MIN_PASSWORD_LENGTH} characters and only common special characters.`
         )
         return false
      }
      setHelperText('')
      return true
   }

   return (
      <ContentWithImageBackgroundLayout bgImage={FoodBackground}>
         <LoginSection>
            <PageTitle>
               Sign in
               <span
                  style={{
                     color: 'var(--color-text-highlight)',
                     fontSize: '1.3em',
                  }}
               >
                  .
               </span>
            </PageTitle>
            <Subtitle>
               Don't have an account? <StyledLink>Sign up here</StyledLink>
            </Subtitle>
            <LoginForm onSubmit={handleSubmit}>
               <TextField
                  label="Email"
                  value={loginDetails.email}
                  onChange={(value: string) =>
                     updateInputValue({ email: value })
                  }
                  endAdornment={<Mail />}
               />
               <TextField
                  label="Password"
                  value={loginDetails.password}
                  onChange={(value: string) =>
                     updateInputValue({ password: value })
                  }
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                     <PasswordIconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={(e) => e.preventDefault()}
                     >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                     </PasswordIconButton>
                  }
               />
               <FilledButton style={{ height: 64 }} onClick={handleSubmit}>
                  Log In
               </FilledButton>
            </LoginForm>
            {helperText && helperText}
            <StyledLink>Forgot your password?</StyledLink>
         </LoginSection>
      </ContentWithImageBackgroundLayout>
   )
}

export default LoginPage
