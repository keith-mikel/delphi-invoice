import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const [loginMutation] = useMutation(LOGIN);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await loginMutation({
        variables: { email, password },
      });

      const userToken = data.login.token;

      setToken(userToken);
      Auth.login(userToken);

      console.log('Login response:', data);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <section className="section">
      <div className="container">
        <h2 className="title is-2">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="field">
            <label className="label">Email:</label>
            <div className="control">
              <input
                className="input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Password:</label>
            <div className="control">
              <input
                className="input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-primary" type="submit">
                Login
              </button>
            </div>
          </div>
        </form>
        {token && (
          <article className="message is-success">
            <div className="message-body">Token: {token}</div>
          </article>
        )}
      </div>
    </section>
  );
}

export default LoginForm;
