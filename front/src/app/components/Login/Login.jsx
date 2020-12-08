import React from 'react';
import { Link } from 'react-router-dom';
import "./Login.css"

class Login extends React.Component {
    state = {
        login: '',
        password: '',
        submitted: false
    };

    handleChange = this.handleChange.bind(this);
    handleSubmit = this.handleSubmit.bind(this);

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        const { login, password } = this.state;
        if (login && password) {
            console.log(`${login} ${password}`);
        }
        
    }

    render() {
        const { login, password, submitted } = this.state;
        return (
            <div className="login col-md-2 col-md-offset-5">
                <h2>Login</h2>
                <hr/>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !login ? ' has-error' : '')}>
                        <label htmlFor="login">Login</label>
                        <input type="text" className="form-control" name="login" value={login} onChange={this.handleChange} />
                        {submitted && !login &&
                            <div className="help-block">Wprowadź login!</div>
                        }
                    </div>
                    <div className={'form-group ' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Hasło</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                        {submitted && !password &&
                            <div className="help-block">Wprowadź hasło!</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Login</button>
                        <Link to="/register" className="btn btn-link">Zarejestruj się</Link>
                    </div>
                    <hr />
                </form>
            </div>
        );
    }
}

export default Login