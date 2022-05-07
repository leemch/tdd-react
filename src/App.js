import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import UserPage from './pages/UserPage';
import React from 'react';
import { BrowserRouter as Router, Route, HashRouter, Link } from 'react-router-dom';

import logo from './hoaxify.png';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  onClickLink = event => {
    event.preventDefault();
    const path = event.currentTarget.attributes.href.value;
    window.history.pushState({}, '', path);
    this.setState({
      path: path
    })
  }

  render() {
    const { path } = this.state
    return (
      <Router>
        <nav className='navbar navbar-expand navbar-light bg-light shadow'>
          <div className='container'>
            <Link className='navbar-brand' to='/' title='Home'>
              <img src={logo} alt="Hoaxify" width="60" />
              Hoaxify
            </Link>
            <ul className='navbar-nav'>
              <Link className='nav-link' to='/signup'>
                Sign Up
              </Link>
              <Link className='nav-link' to='/login'>
                Login
              </Link>
            </ul>

          </div>
        </nav>

        <div className='container'>
          <Route exact path='/' component={HomePage} />
          <Route path='/signup' component={SignUpPage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/user/:id' component={UserPage} />
        </div>
      </Router>
    );
  }
}

export default App;
