import { useEffect } from 'react';
import { AppProvider, useApp } from './lib/AppContext';
import { useHashPath, matchRoute, navigate } from './lib/router';
import Header from './components/Header';
import Toasts from './components/Toasts';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import SurplusBrowse from './pages/SurplusBrowse';
import SurplusDetail from './pages/SurplusDetail';
import Reservations from './pages/Reservations';
import SellerHub from './pages/SellerHub';
import SellerList from './pages/SellerList';
import SellerListings from './pages/SellerListings';
import SellerImport from './pages/SellerImport';
import SurplusList from './pages/SurplusList';
import SurplusMine from './pages/SurplusMine';
import SellerOrders from './pages/SellerOrders';
import Coordinator from './pages/Coordinator';
import Transaction from './pages/Transaction';
import Account from './pages/Account';

// Public routes reachable without being logged in. Everything else redirects
// to /login; /login and /signup redirect to /home once a session exists.
const PUBLIC_PATHS = ['/login', '/signup'];

const ROUTES = [
  { path: '/login', el: Login },
  { path: '/signup', el: Signup },
  { path: '/home', el: Home },
  { path: '/marketplace', el: Marketplace },
  { path: '/cart', el: Cart },
  { path: '/orders', el: Orders },
  { path: '/surplus', el: SurplusBrowse },
  { path: '/surplus/:id', el: SurplusDetail },
  { path: '/reservations', el: Reservations },
  { path: '/seller', el: SellerHub },
  { path: '/seller/list', el: SellerList },
  { path: '/seller/listings', el: SellerListings },
  { path: '/seller/import', el: SellerImport },
  { path: '/seller/surplus/list', el: SurplusList },
  { path: '/seller/surplus/listings', el: SurplusMine },
  { path: '/seller/orders', el: SellerOrders },
  { path: '/coordinator', el: Coordinator },
  { path: '/transaction/:id', el: Transaction },
  { path: '/account', el: Account },
];

function Shell() {
  const { auth } = useApp();
  const path = useHashPath();
  const isPublic = PUBLIC_PATHS.includes(path);

  useEffect(() => {
    if (!auth && !isPublic) { navigate('/login'); return; }
    if (auth && isPublic) { navigate('/home'); return; }
    if (path === '/') navigate(auth ? '/home' : '/login');
  }, [auth, path, isPublic]);

  // Render nothing for a tick while the effect above redirects, so a guarded
  // page never flashes before the hash actually changes.
  if (!auth && !isPublic) return null;
  if (auth && isPublic) return null;
  if (path === '/') return null;

  const match = matchRoute(ROUTES, path);
  const Page = match ? match.route.el : null;

  return (
    <>
      {auth && <Header />}
      <main className="app">
        {Page ? <Page params={match.params} /> : (
          <div className="empty-state">
            <div className="emoji">🤔</div>
            <p>Page not found.</p>
          </div>
        )}
      </main>
      <Toasts />
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Shell />
    </AppProvider>
  );
}
