import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations'; // Import your LOGIN mutation

import Auth from '../utils/auth'

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(''); // State variable to store the token

  const [loginMutation] = useMutation(LOGIN);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await loginMutation({
        variables: { email, password },
      });

      // Extract the token from the login response data
      const userToken = data.login.token;

      // Update the state with the token
      setToken(userToken);
      Auth.login(userToken)

      // Handle the login response data here, e.g., store token, navigate to the next page, etc.
      console.log('Login response:', data);
    } catch (error) {
      // Handle login error here
      console.error('Login error:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>

      {/* Display the token if it exists */}
    </div>
  );
}

export default LoginForm;
