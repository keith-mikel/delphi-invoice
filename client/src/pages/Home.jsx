import React from 'react';

import { Link } from 'react-router-dom';
import AuthService from '../utils/auth'; // Import your AuthService
import Delphi from "../assets/delphi.png"

function Home() {
    if (!AuthService.loggedIn()) {
        return (
            <div>
            <h1>Welcome to Delphi</h1>
            <img src={Delphi} alt="Delphi" />
            <p>Please login to see your invoices.</p>
            <Link to="/login">
              <button>Login</button>
            </Link>
            <h2>New to Delphi?</h2>
            <p>Sign Up Here</p>
            <Link to="/signup">
              <button>Sign Up</button>
            </Link>
          </div>
        );
      }
  return (
    <div>
      <h1>Welcome to Delphi</h1>
      <img src='../assets/delphi.png'></img>
      <p>Please Click Below to See Your Invoices</p>
      <Link to="/profile">
        <button>Profile</button>
      </Link>
    </div>
  );
}

export default Home;

