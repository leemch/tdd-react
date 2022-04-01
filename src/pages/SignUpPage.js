import React from "react";
//import axios from "axios";

class SignUpPage extends React.Component {


    state = {
        username: "",
        email: "",
        password: "",
        password_repeat: "",
        loading: false,
        signUpSuccess: false
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
        this.setState({ loading: true });
        fetch("/api/1.0/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, email, password})
        }).then(result => {
            this.setState({
                signUpSuccess: true
            })
        });
    }

    render() {

        const { password, password_repeat, loading, signUpSuccess } = this.state;
        let disabled = password !== password_repeat || (password === "" || password_repeat === "");
        return (
            <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2">
                { !signUpSuccess && <form className="card mt-5" data-testid="form-sign-up">
                    <div className="card-header">
                        <h1 className="text-center">Sign Up</h1>
                    </div>
                    <div className="card-body">
                        <div className="mb-3">
                            <label className="form-label" htmlFor="username">
                                Username
                            </label>

                            <input
                                className="form-control"
                                name="username"
                                id="username"
                                onChange={this.onInputChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="form-control"
                                name="email"
                                id="email"
                                onChange={this.onInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="password">Password</label>
                            <input
                                className="form-control"
                                name="password"
                                onChange={this.onInputChange}
                                id="password"
                                type="password" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="repeat_password">Repeat Password</label>
                            <input
                                className="form-control"
                                name="password_repeat"
                                onChange={this.onInputChange}
                                id="repeat_password"
                                type="password"
                            />
                        </div>
                        <div className="text-center">
                            <button className="btn btn-primary" disabled={disabled || loading} onClick={this.submit}>
                                { loading && <span className="spinner-border spinner-border-sm" role="status"></span> }
                                Sign Up
                            </button>
                        </div>
                    </div>


                </form>}
                { signUpSuccess && <div className="alert alert-success mt-3" role="alert">
                Please check your email to activate your account.
                 </div> }
            </div>

        )
    }
}

export default SignUpPage;