import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../../../context/AppContext.jsx'
import './Navbar.css'

// Center nav links differ by role: buyers browse + track orders, sellers
// manage what they've put up for sale.
const NAV_LINKS_BY_ROLE = {
  seller: [
    { to: '/my-listings', label: 'My Listings' },
    { to: '/list-produce', label: 'List Produce' },
    { to: '/pickup-plan', label: 'Pickup Plan' },
  ],
  buyer: [
    { to: '/marketplace', label: 'Marketplace' },
    { to: '/transactions', label: 'Transactions' },
  ],
}

// Profile-menu (dropdown) options also differ by role. Sellers get
// "My Listings" here; buyers get "Cart" in that same spot instead — the
// cart never gets its own icon/button directly on the navbar.
const PROFILE_MENU_BY_ROLE = {
  seller: [
    { to: '/my-listings', label: 'My Listings', icon: '📦' },
    { to: '/list-produce', label: 'List Produce', icon: '➕' },
    { to: '/pickup-plan', label: 'Pickup Plan', icon: '🚚' },
  ],
  buyer: [
    { to: '/cart', label: 'Cart', icon: '🛒' },
    { to: '/marketplace', label: 'Marketplace', icon: '🧺' },
    { to: '/transactions', label: 'Transactions', icon: '🧾' },
  ],
}

function Navbar() {
  const navigate = useNavigate()
  const { role, setRole } = useApp()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  const navLinks = NAV_LINKS_BY_ROLE[role] || []
  const profileMenu = PROFILE_MENU_BY_ROLE[role] || []

  // Close the dropdown on any click outside it.
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleMenuNavigate(to) {
    setMenuOpen(false)
    navigate(to)
  }

  function handleSwitchRole() {
    setMenuOpen(false)
    setRole(null)
    navigate('/')
  }

  return (
    <header className="navbar">
      <Link to="/" className="navbar__brand">
        <span className="navbar__brand-name">FARMSHARE</span>
        <span className="navbar__brand-tagline">Rural Produce Exchange</span>
      </Link>

      <nav className="navbar__links">
        {navLinks.map((link) => (
          <Link key={link.to} to={link.to} className="navbar__link">
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="navbar__actions">
        {role && <span className="navbar__role-tag">{role === 'seller' ? 'Seller' : 'Buyer'}</span>}

        <div className="navbar__profile" ref={menuRef}>
          <button
            className="navbar__avatar"
            onClick={() => setMenuOpen((open) => !open)}
            aria-haspopup="true"
            aria-expanded={menuOpen}
            aria-label="Open profile menu"
          >
            U
          </button>

          {menuOpen && (
            <div className="navbar__dropdown" role="menu">
              {profileMenu.map((item) => (
                <button
                  key={item.to}
                  className="navbar__dropdown-item"
                  role="menuitem"
                  onClick={() => handleMenuNavigate(item.to)}
                >
                  <span className="navbar__dropdown-icon" aria-hidden="true">
                    {item.icon}
                  </span>
                  {item.label}
                </button>
              ))}

              <div className="navbar__dropdown-divider" />

              <button
                className="navbar__dropdown-item navbar__dropdown-item--muted"
                role="menuitem"
                onClick={handleSwitchRole}
              >
                <span className="navbar__dropdown-icon" aria-hidden="true">
                  ↩️
                </span>
                Switch Role
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar