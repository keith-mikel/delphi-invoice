import React from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../utils/auth';
import Delphi from "../assets/delphi.png";

function Home() {
  if (!AuthService.loggedIn()) {
    return (
      <section className="hero is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title is-1">Welcome to Delphi</h1>
            <div className="centered-image">
              <img src={Delphi} alt="Delphi" />
            </div>
            <p>Please login to see your invoices.</p>
            <div className="buttons is-centered">
              <Link to="/login" className="button is-primary is-medium">
                Login
              </Link>
            </div>
            <h2 className="subtitle is-3">New to Delphi?</h2>
            <div className="buttons is-centered">
              <Link to="/signup" className="button is-info is-medium">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="hero is-fullheight">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title is-1">Welcome to Delphi</h1>
          <div className="centered-image">
            <img src={Delphi} alt="Delphi" />
          </div>
          <p>Please Click Below to See Your Invoices</p>
          <div className="buttons is-centered">
            <Link to="/profile" className="button is-primary is-medium">
              Profile
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
