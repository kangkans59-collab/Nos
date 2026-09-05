import { useNavigate } from 'react-router-dom'
import PageContainer from '../../components/layout/PageContainer/PageContainer.jsx'
import HeroBrand from '../../components/landing/HeroBrand/HeroBrand.jsx'
import RoleCard from '../../components/landing/RoleCard/RoleCard.jsx'
import { useApp } from '../../context/AppContext.jsx'
import './LandingPage.css'

function LandingPage() {
  const navigate = useNavigate()
  const { setRole } = useApp()

  function chooseRole(role) {
    setRole(role)
    navigate('/login')
  }

  return (
    <div className="landing-page">
      <PageContainer narrow>
        <HeroBrand />
        <div className="landing-page__roles">
          <RoleCard
            icon="🌱"
            label="SELLER"
            description="List your surplus produce for nearby buyers to reserve."
            onClick={() => chooseRole('seller')}
          />
          <RoleCard
            icon="🧺"
            label="BUYER"
            description="Browse and reserve fresh surplus produce near you."
            onClick={() => chooseRole('buyer')}
          />
        </div>
      </PageContainer>
    </div>
  )
}

export default LandingPage
