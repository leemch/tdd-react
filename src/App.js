import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import UserPage from './pages/UserPage';

function App() {
  return (
    <div className='container'>
      {window.location.pathname === '/' && <HomePage />}
      {window.location.pathname === '/signup' && <SignUpPage />}
      {window.location.pathname === '/login' && <LoginPage />}
      {window.location.pathname.startsWith('/user/')  && <UserPage />}
    </div>
  );
}

export default App;
