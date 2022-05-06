import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import UserPage from './pages/UserPage';
import React from 'react';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      path: window.location.pathname
    }
  }

  onClickLink = event => {
    event.preventDefault();
    const path = event.target.attributes.href.value;
    window.history.pushState({}, '', path);
    this.setState({
      path: path
    })
  }

  render() {
    const {path} = this.state
    return (
      <div className='container'>
        <div>
          <a href='/'  title='Home' onClick={this.onClickLink}>Hoaxify</a>
          <a href='/signup' onClick={this.onClickLink}>Sign Up</a>
          <a href='/login' onClick={this.onClickLink}>Login</a>
        </div>
        {path === '/' && <HomePage />}
        {path === '/signup' && <SignUpPage />}
        {path === '/login' && <LoginPage />}
        {path.startsWith('/user/') && <UserPage />}
      </div>
    );
  }
}

export default App;
