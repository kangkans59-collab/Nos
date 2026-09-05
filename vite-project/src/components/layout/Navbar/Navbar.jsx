import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../../../context/AppContext.jsx'
import './Navbar.css'

const NAV_LINKS = [
  { to: '/marketplace', label: 'Marketplace' },
  { to: '/list-produce', label: 'List Produce' },
  { to: '/my-listings', label: 'My Listings' },
  { to: '/pickup-plan', label: 'Pickup Plan' },
  { to: '/transactions', label: 'Transactions' },
]

function Navbar() {
  const navigate = useNavigate()
  const { role } = useApp()

  return (
    <header className="navbar">
      <Link to="/" className="navbar__brand">
        <span className="navbar__brand-name">FARMSHARE</span>
        <span className="navbar__brand-tagline">Rural Produce Exchange</span>
      </Link>

      <nav className="navbar__links">
        {NAV_LINKS.map((link) => (
          <Link key={link.to} to={link.to} className="navbar__link">
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="navbar__actions">
        {role && <span className="navbar__role-tag">{role === 'seller' ? 'Seller' : 'Buyer'}</span>}
        <button className="navbar__cart" onClick={() => navigate('/transactions')} aria-label="Transaction history">
          🛒
        </button>
        <button className="navbar__avatar" onClick={() => navigate('/')} aria-label="Switch role">
          U
        </button>
      </div>
    </header>
  )
}

export default Navbar
