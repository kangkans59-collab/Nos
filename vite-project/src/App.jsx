import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar/Navbar.jsx';
import LandingPage from './pages/LandingPage/LandingPage.jsx'
import LoginPage from './pages/LoginPage/LoginPage.jsx'
import SignupPage from './pages/SignupPage/SignupPage.jsx'
import MarketplacePage from './pages/MarketplacePage/MarketplacePage.jsx'
import ListProducePage from './pages/ListProducePage/ListProducePage.jsx'
import MyListingsPage from './pages/MyListingsPage/MyListingsPage.jsx'
import CartPage from './pages/CartPage/CartPage.jsx'
import ReservationPage from './pages/ReservationPage/ReservationPage.jsx'
import TransactionHistoryPage from './pages/TransactionHistoryPage/TransactionHistoryPage.jsx'
import GroupPickupPlanPage from './pages/GroupPickupPlanPage/GroupPickupPlanPage.jsx'
import { AppProvider } from './context/AppContext.jsx'
import './App.css'

function App() {
  // The landing page ("/") is where a visitor first picks Buyer/Seller and
  // hasn't "entered" the app yet, so it renders without the navbar.
  const location = useLocation()
  const isLandingPage = location.pathname === '/'

  return (
    <AppProvider>
      <div className="app-shell">
        {!isLandingPage && <Navbar />}
        <main className="app-main">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/list-produce" element={<ListProducePage />} />
            <Route path="/my-listings" element={<MyListingsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/reserve/:produceId" element={<ReservationPage />} />
            <Route path="/transactions" element={<TransactionHistoryPage />} />
            <Route path="/pickup-plan" element={<GroupPickupPlanPage />} />
          </Routes>
        </main>
      </div>
    </AppProvider>
  )
}

export default App