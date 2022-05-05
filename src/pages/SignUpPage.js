import React from "react";
import axios from "axios";
import Input from "../components/Input";

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
            [input.name]: input.value,
            errors: {...this.state.errors, [event.target.name]: ""}
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

        let passwordMismatch = password !== password_repeat ? "Password mismatch" : "";
        return (
            <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2" data-testid="signup-page">
                {!signUpSuccess && <form className="card mt-5" data-testid="form-sign-up">
                    <div className="card-header">
                        <h1 className="text-center">Sign Up</h1>
                    </div>
                    <div className="card-body">
                        <Input id="username" label="Username" onChange={this.onInputChange} help={errors.username} />
                        <Input id="email" label="Email" onChange={this.onInputChange} help={errors.email} />
                        <Input id="password" label="Password" onChange={this.onInputChange} help={errors.password} type="password" />
                        <Input id="password_repeat" label="Repeat Password" onChange={this.onInputChange} help={passwordMismatch} type="password" />
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