import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PageContainer from '../../components/layout/PageContainer/PageContainer.jsx'
import AuthForm from '../../components/auth/AuthForm/AuthForm.jsx'
import FormField from '../../components/common/FormField/FormField.jsx'
import Input from '../../components/common/Input/Input.jsx'
import './LoginPage.css'

function LoginPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    // Mock authentication only — no backend wired up yet.
    async function sendData() {
    const url = 'http://localhost:5000/api/sellers/login';
    const data = {
      username: username,
      password: password
    };

    try {
      const response = await fetch(url, {
        method: 'POST', // Specify the request method
        headers: {
          'Content-Type': 'application/json', // Tell the server we are sending JSON
        },
        body: JSON.stringify(data) // Convert the JavaScript object to a JSON string
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json(); // Parse the JSON response
      console.log('Success:', result);
      
    } catch (error) {
      console.error('Error during the request:', error);
    }
  }

  sendData();
    navigate('/marketplace')
  }

  return (
    <div className="login-page">
      <PageContainer narrow>
        <AuthForm
          title="Log in"
          submitLabel="Log In"
          onSubmit={handleSubmit}
          footer={<Link to="/signup">Create a new account</Link>}
        >
          <FormField label="Username" htmlFor="login-username">
            <Input
              id="login-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </FormField>
          <FormField label="Password" htmlFor="login-password">
            <Input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </FormField>
        </AuthForm>
      </PageContainer>
    </div>
  )
}

export default LoginPage
