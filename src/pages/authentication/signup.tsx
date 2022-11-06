import { Badge, Mail, Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useState } from 'react'
import styled from 'styled-components'
import FoodBackground from '../../assets/foodbackground5.jpg'
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
   & svg {
      color: var(--color-text-muted);
   }
`
const PasswordIconButton = styled(IconButton)`
   color: var(--color-text-muted);
   transform: translateY(-4px);
   &:hover svg {
      color: var(--color-text-base);
   }
`

const SignUpPage = () => {
   const [signUpDetails, setSignUpDetails] = useState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
   })
   const [showPassword, setShowPassword] = useState(false)
   const [helperText, setHelperText] = useState('')

   const updateInputValue = (value: object) => {
      setSignUpDetails({ ...signUpDetails, ...value })
   }

   const handleSubmit = (e: any) => {
      e.preventDefault()
      const validForm = validateForm()
      if (validForm) {
         console.log(signUpDetails)
      }
   }

   const validateForm = () => {
      const { firstName, lastName, email, password } = signUpDetails
      if (!firstName || !lastName || !email || !password) {
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
               Create new account
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
               Already have an account? <StyledLink>Log In</StyledLink>
            </Subtitle>
            <LoginForm onSubmit={handleSubmit}>
               <div style={{ display: 'flex', gap: 16 }}>
                  <TextField
                     label="First Name"
                     value={signUpDetails.firstName}
                     onChange={(value: string) =>
                        updateInputValue({ firstName: value })
                     }
                     endAdornment={<Badge />}
                     maxLength={20}
                  />
                  <TextField
                     label="Last Name"
                     value={signUpDetails.lastName}
                     onChange={(value: string) =>
                        updateInputValue({ lastName: value })
                     }
                     endAdornment={<Badge />}
                     maxLength={20}
                  />
               </div>
               <TextField
                  label="Email"
                  value={signUpDetails.email}
                  onChange={(value: string) =>
                     updateInputValue({ email: value })
                  }
                  endAdornment={<Mail />}
                  maxLength={100}
               />
               <TextField
                  label="Password"
                  value={signUpDetails.password}
                  onChange={(value: string) =>
                     updateInputValue({ password: value })
                  }
                  type="password"
                  endAdornment={
                     <PasswordIconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={(e) => e.preventDefault()}
                     >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                     </PasswordIconButton>
                  }
                  maxLength={100}
               />
               <FilledButton style={{ height: 64 }} onClick={handleSubmit}>
                  Sign Up
               </FilledButton>
            </LoginForm>
            {helperText && helperText}
         </LoginSection>
      </ContentWithImageBackgroundLayout>
   )
}

export default SignUpPage
