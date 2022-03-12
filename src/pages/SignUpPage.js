import React from "react";

class SignUpPage extends React.Component {
    render() {
        return (
            <div>
              <h1>Sign Up</h1>
              <label htmlFor="username">Username</label>
              <input id="username"/>
              <label htmlFor="email">Email</label>
              <input id="email"/>
              <label htmlFor="password">Password</label>
              <input id="password" type="password"/>
              <label htmlFor="repeat_password">Repeat Password</label>
              <input id="repeat_password" type="password"/>
              <button disabled="true">Sign Up</button>
            </div>
            
        )
    }
}

export default SignUpPage;