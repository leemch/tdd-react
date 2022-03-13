import React from "react";
import axios from "axios";

class SignUpPage extends React.Component {


    state = {
        username: "",
        email: "",
        password: "",
        password_repeat: ""
    }


    onInputChange = event => {
        const input = event.target;
        this.setState({
            [input.name]: input.value
        });
    }

    submit = (e) => {
        e.preventDefault();
        const { username, email, password } = this.state;
        axios.post("/api/1.0/users", { username, email, password });
    }

    render() {

        const { password, password_repeat } = this.state;
        let disabled = password !== password_repeat || (password === "" || password_repeat === "");
        return (
            <div>
                <form>
                    <h1>Sign Up</h1>
                    <label htmlFor="username">
                        Username
                    </label>
                    <input
                        name="username"
                        id="username"
                        onChange={this.onInputChange}
                    />
                    <label htmlFor="email">
                        Email
                    </label>
                    <input
                        name="email"
                        id="email"
                        onChange={this.onInputChange}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        name="password"
                        onChange={this.onInputChange}
                        id="password"
                        type="password" />
                    <label htmlFor="repeat_password">Repeat Password</label>
                    <input
                        name="password_repeat"
                        onChange={this.onInputChange}
                        id="repeat_password"
                        type="password"
                    />
                    <button disabled={disabled} onClick={this.submit}>
                        Sign Up
                    </button>
                </form>
            </div>

        )
    }
}

export default SignUpPage;