import React from 'react';
import { Link } from 'react-router-dom';
import "./Login.css"
import services from '../../../services/httpClient'
import { withRouter } from "react-router-dom";

class Login extends React.Component {
    state = {
        login: '',
        password: '',
        submitted: false
    };

    componentDidMount() {
        if(this.props.isLoggedIn)
            this.props.history.push("/")
    }

    handleChange = this.handleChange.bind(this);
    handleSubmit = this.handleSubmit.bind(this);

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault()
        this.setState({ submitted: true })
        const { login, password } = this.state
        if (login && password) {
        services.CreateToken(login,password)
            .then((response) => {
                if (response.data!=="") {
                    localStorage.setItem('token', response.data)
                    this.props.checkLogin()
                    this.props.history.push("/");
                }
                else{
                    this.setState({login: ""})
                    this.setState({password: ""})
                }
            })
            .catch((error) => {
                console.log(error)
            })
        }
    }

    render() {
        const { login, password, submitted } = this.state;
        return (
            <div id="login" className="container">
                <div className="login-wrapper col-md-4">
                    <h2>Login</h2>
                    <hr/>
                    {submitted && (!login || !password) &&
                        <div className="help-block alert alert-danger">
                            Podano nieprawidłowy login lub hasło.
                        </div>
                    }
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className={'form-group' + (submitted && !login ? ' has-error' : '')}>
                            <label htmlFor="login">Login</label>
                            <input type="text" className="form-control" name="login" value={login} onChange={this.handleChange} />
                            {submitted && !login &&
                                <div className="help-block alert alert-danger">Wprowadź login!</div>
                            }
                        </div>
                        <div className={'form-group ' + (submitted && !password ? ' has-error' : '')}>
                            <label htmlFor="password">Hasło</label>
                            <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                            {submitted && !password &&
                                <div className="help-block alert alert-danger">Wprowadź hasło!</div>
                            }
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary">Login</button>
                            <Link to="/register" className="btn btn-link">Zarejestruj się</Link>
                        </div>
                        <hr />
                    </form>
                </div>
            </div>
        );
    }
}
export default withRouter(Login);