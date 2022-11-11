import {
   Badge,
   ErrorOutline,
   Mail,
   Visibility,
   VisibilityOff,
} from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { bindActionCreators, compose } from 'redux'
import styled from 'styled-components'
import FoodBackground from '../../assets/foodbackground5.jpg'
import FilledButton from '../../components/buttons/FilledButtons'
import HelperTextField from '../../components/feedback/helperTexts/HelperTextField'
import TextField from '../../components/inputs/TextField'
import { ThemedBaseColorCircleProgress } from '../../components/StyledComponents/common'
import {
   PageTitle,
   StyledLink,
   Subtitle,
} from '../../components/StyledComponents/typography'
import { _signUpWithEmailAndPassword } from '../../state/firebaseActions/auth-actions'
import * as userActions from '../../state/firebaseActions/user-actions'
import { auth } from '../../state/store'
import ContentWithImageBackgroundLayout from '../layouts/ContentWithImageBackgroundLayout'
import { EMAIL_REGEX, MIN_PASSWORD_LENGTH, PASSWORD_REGEX } from './config'

const SignUpSection = styled.section`
   display: flex;
   justify-content: center;
   flex-direction: column;
   gap: 16px;
   padding: 5vw;
   background-color: var(--color-fill);
`
const SignUpForm = styled.form`
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

interface ISignUpPage {
   _createUser: (user: userActions.INewUser) => void
}

const SignUpPage = ({ _createUser }: ISignUpPage) => {
   const [signUpDetails, setSignUpDetails] = useState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
   })
   const [showPassword, setShowPassword] = useState(false)
   const [helperText, setHelperText] = useState('')
   const [processing, setProcessing] = useState(false)
   const [user, loading] = useAuthState(auth)
   const navigate = useNavigate()

   useEffect(() => {
      if (loading) return
      if (user) navigate('/')
   }, [user, loading])

   const updateInputValue = (value: object) => {
      setSignUpDetails({ ...signUpDetails, ...value })
   }

   const handleSubmit = async (e: any) => {
      e.preventDefault()
      const validForm = validateForm()
      if (validForm) {
         setProcessing(true)

         const userCredential = await _signUpWithEmailAndPassword(
            signUpDetails,
            (errorMessage) => setHelperText(errorMessage)
         )

         if (userCredential) {
            const { uid, email, metadata } = userCredential.user
            const { firstName, lastName } = signUpDetails
            const newUserData = {
               uid,
               email,
               metadata,
               firstName,
               lastName,
               displayName: `${firstName} ${lastName}`,
            }

            try {
               await _createUser(newUserData)
            } catch (error) {
               console.error({ error })
            }
         }

         setProcessing(false)
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
         <SignUpSection>
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
               Already have an account?{' '}
               <StyledLink to="/login">Log In</StyledLink>
            </Subtitle>
            <SignUpForm onSubmit={handleSubmit}>
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
                  maxLength={100}
               />
               <FilledButton style={{ height: 64 }} onClick={handleSubmit}>
                  {processing ? (
                     <ThemedBaseColorCircleProgress size={24} />
                  ) : (
                     'Sign Up'
                  )}
               </FilledButton>
            </SignUpForm>
            {helperText && (
               <HelperTextField type={'error'}>
                  <ErrorOutline style={{ marginRight: 8 }} />
                  {helperText}
               </HelperTextField>
            )}
         </SignUpSection>
      </ContentWithImageBackgroundLayout>
   )
}

const mapDispatchToProps = (dispatch: any) => ({
   _createUser: bindActionCreators(userActions._createUser, dispatch),
})

export default compose<React.FunctionComponent>(
   connect(null, mapDispatchToProps)
)(SignUpPage)
