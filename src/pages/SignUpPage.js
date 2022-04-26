import React from "react";
import axios from "axios";

class SignUpPage extends React.Component {


    state = {
        username: "",
        email: "",
        password: "",
        password_repeat: "",
        loading: false,
        signUpSuccess: false,
        errors: {}
    }


    onInputChange = event => {
        const input = event.target;
        this.setState({
            [input.name]: input.value
        });
    }

    submit = async (e) => {
        e.preventDefault();
        const { username, email, password } = this.state;
        this.setState({ loading: true });

        try {
            await axios.post("/api/1.0/users", { username, email, password });
            this.setState({ signUpSuccess: true });
        } catch (error) {
            if (error.response.status == 400) {
                console.log(error.response);
                this.setState({
                    errors: error.response.data.validationErrors
                });
            }
            this.setState({ loading: false });
        }


    }

    render() {

        const { password, password_repeat, loading, signUpSuccess, errors } = this.state;
        let disabled = password !== password_repeat || (password === "" || password_repeat === "");
        return (
            <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2">
                {!signUpSuccess && <form className="card mt-5" data-testid="form-sign-up">
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
                            <span>{errors.username}</span>
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
                                {loading && <span className="spinner-border spinner-border-sm" role="status"></span>}
                                Sign Up
                            </button>
                        </div>
                    </div>


                </form>}
                {signUpSuccess && <div className="alert alert-success mt-3" role="alert">
                    Please check your email to activate your account.
                </div>}
            </div>

        )
    }
}

export default SignUpPage;