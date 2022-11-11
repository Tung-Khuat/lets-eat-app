import {
   ErrorOutline,
   Mail,
   Visibility,
   VisibilityOff,
} from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import FoodBackground from '../../assets/foodbackground2.jpg'
import FilledButton from '../../components/buttons/FilledButtons'
import HelperTextField from '../../components/feedback/helperTexts/HelperTextField'
import TextField from '../../components/inputs/TextField'
import { ThemedBaseColorCircleProgress } from '../../components/StyledComponents/common'
import {
   PageTitle,
   StyledLink,
   Subtitle,
} from '../../components/StyledComponents/typography'
import { _logInWithEmailAndPassword } from '../../state/firebaseActions/auth-actions'
import { auth } from '../../state/store'
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

const LoginPage = () => {
   const [loginDetails, setLoginDetails] = useState({
      email: '',
      password: '',
   })
   const [helperText, setHelperText] = useState('')
   const [showPassword, setShowPassword] = useState(false)
   const [processing, setProcessing] = useState(false)
   const [user, loading] = useAuthState(auth)
   const navigate = useNavigate()

   useEffect(() => {
      if (loading) return
      if (user) navigate('/')
   }, [user, loading])

   const updateInputValue = (value: object) => {
      setLoginDetails({ ...loginDetails, ...value })
   }

   const handleSubmit = async (e: any) => {
      e.preventDefault()
      const validForm = validateForm()
      if (validForm) {
         setProcessing(true)

         await _logInWithEmailAndPassword(loginDetails, (errorMessage) =>
            setHelperText(errorMessage)
         )

         setProcessing(false)
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
               Don't have an account?{' '}
               <StyledLink to="/signup">Sign up here</StyledLink>
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
                  {processing ? (
                     <ThemedBaseColorCircleProgress size={24} />
                  ) : (
                     'Login'
                  )}
               </FilledButton>
            </LoginForm>
            {helperText && (
               <HelperTextField type={'error'}>
                  <ErrorOutline style={{ marginRight: 8 }} />
                  {helperText}
               </HelperTextField>
            )}
            <StyledLink to="/password-recovery">
               Forgot your password?
            </StyledLink>
         </LoginSection>
      </ContentWithImageBackgroundLayout>
   )
}

export default LoginPage
