import { NavLink } from 'react-router-dom';
import { useAuth } from './components/useAuth';

function App() {
  const { authToken, handleLogin, handleLogout } = useAuth();

  return (
    <div>
      <h1>Protected Route example</h1>
      <NavLink style={{ fontSize: 20, margin: 12 }} to={'/protected'}>
        GO to the protected page
      </NavLink>
      <br />
      {authToken ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}

export default App;
