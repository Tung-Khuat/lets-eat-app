import { useState } from 'react'
import styled from 'styled-components'
import FoodBackground from '../assets/foodbackground2.jpg'
import FilledButton from '../components/buttons/FilledButtons'
import TextField from '../components/inputs/TextField'
import ContentWithImageBackgroundLayout from './layouts/ContentWithImageBackgroundLayout'

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
const PageTitle = styled.form`
   font-size: 64px;
   margin-bottom: 16px;
`

const LoginPage = () => {
   const [loginDetails, setLoginDetails] = useState({
      email: '',
      password: '',
   })

   const handleSubmit = (e: any) => {
      e.preventDefault()
      console.log({ loginDetails })
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
            <LoginForm onSubmit={handleSubmit}>
               <TextField
                  label="Email"
                  value={loginDetails.email}
                  onChange={(value: string) =>
                     setLoginDetails({ ...loginDetails, email: value })
                  }
               />
               <TextField
                  label="Password"
                  value={loginDetails.password}
                  onChange={(value: string) =>
                     setLoginDetails({ ...loginDetails, password: value })
                  }
                  type="password"
               />
               <FilledButton style={{ height: 64 }} onClick={handleSubmit}>
                  LOGIN
               </FilledButton>
            </LoginForm>
         </LoginSection>
      </ContentWithImageBackgroundLayout>
   )
}

export default LoginPage
