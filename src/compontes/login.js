import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('id', data.id);
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: data
        });
        window.location.href = '/profile';
      } else {
        throw new Error('Invalid username or password');
      }
    } catch (error) {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: error.message
      });
      setError(error.message);
    }
  };

  return (
    <div className="heading">
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form>
        <input
          type="text"
          placeholder="Username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <NavLink to="/profile" onClick={handleLogin}>
          Login
        </NavLink>
      </form>
    </div>
  );
}

export default Login;
