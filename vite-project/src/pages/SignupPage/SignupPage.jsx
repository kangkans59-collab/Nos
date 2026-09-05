import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PageContainer from '../../components/layout/PageContainer/PageContainer.jsx'
import AuthForm from '../../components/auth/AuthForm/AuthForm.jsx'
import FormField from '../../components/common/FormField/FormField.jsx'
import Input from '../../components/common/Input/Input.jsx'
import './SignupPage.css'

const initialForm = {
  username: '',
  password: '',
  confirmPassword: '',
  idNumber: '',
  phone: '',
}

function SignupPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)

  function updateField(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    // Mock signup only — no backend wired up yet.
    navigate('/marketplace')
  }

  return (
    <div className="signup-page">
      <PageContainer narrow>
        <AuthForm
          title="Create an account"
          submitLabel="Sign Up"
          onSubmit={handleSubmit}
          footer={<Link to="/login">Already have an account? Log in</Link>}
        >
          <FormField label="Username" htmlFor="signup-username">
            <Input id="signup-username" value={form.username} onChange={updateField('username')} placeholder="Enter your username" />
          </FormField>
          <FormField label="Password" htmlFor="signup-password">
            <Input
              id="signup-password"
              type="password"
              value={form.password}
              onChange={updateField('password')}
              placeholder="Create a password"
            />
          </FormField>
          <FormField label="Confirm Password" htmlFor="signup-confirm">
            <Input
              id="signup-confirm"
              type="password"
              value={form.confirmPassword}
              onChange={updateField('confirmPassword')}
              placeholder="Re-enter your password"
            />
          </FormField>
          <FormField label="GST / Aadhaar Number" htmlFor="signup-id">
            <Input id="signup-id" value={form.idNumber} onChange={updateField('idNumber')} placeholder="Enter GST or Aadhaar number" />
          </FormField>
          <FormField label="Phone Number" htmlFor="signup-phone">
            <Input id="signup-phone" value={form.phone} onChange={updateField('phone')} placeholder="+91 __________" />
          </FormField>
        </AuthForm>
      </PageContainer>
    </div>
  )
}

export default SignupPage
