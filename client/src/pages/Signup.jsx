import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../utils/mutations'; // Import your CREATE_USER mutation

import Auth from '../utils/auth';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [createUser] = useMutation(CREATE_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await createUser({
        variables: { ...formData },
      });

      const userToken = data.createUser.token; // Access the token from the response

      if (userToken) {
        Auth.login(userToken);

        // Handle the signup response data here, e.g., store the token, navigate to a different page, etc.
        console.log('Signup response:', data);
      } else {
        console.error('Signup error: Token not found in response.');
      }
    } catch (error) {
      // Handle signup error here
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="title is-2 has-text-centered">Signup</h1>
      <form onSubmit={handleSubmit} className="box">
        <div className="field">
          <label className="label">Username:</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Email:</label>
          <div className="control">
            <input
              className="input"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Password:</label>
          <div className="control">
            <input
              className="input"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" type="submit">
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
