import React from 'react';
import "./Register.css"
import services from '../../../services/httpClient'
import { withRouter } from "react-router-dom";

class Register extends React.Component {
    state = {
        login: '',
        firstName:'',
        lastName: '',
        email:'',
        password: '',
        confirmedPassword: '',
        submitted: false,
        success:'',
        message:''
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
        const { login,firstName,lastName,email,password,confirmedPassword} = this.state;
        if (login && firstName && lastName && email && password && confirmedPassword  && password===confirmedPassword) {
            var user = {
                login,
                firstName,
                lastName,
                email,
                password,
                confirmedPassword
            }
            services.RegisterUser(user)
                .then((response) => {
                    if(response.data==""){
                        this.setState({ success: true })
                    }
                    else{
                        this.setState({ success: false })
                        this.setState({ message: response.data})
                    }
                })
                .catch((error) => {
                    this.setState({ success: false})
                    this.setState({ message: error })
                })
        }
    }
    
    render() {
        const { login,firstName,lastName,email,password,confirmedPassword,submitted,success,message} = this.state;
        let re = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        return (
            <div id="register" className="container">
                <div className="register-wrapper col-md-4">
                    <h2>Zarejestruj się</h2>
                    <hr/>
                    {submitted && success &&
                        <div className="help-block alert alert-success">Zarejestrowano pomyślnie. Poczekaj na aktywacje konta zanim bedziesz mógł się zalogować.</div>
                    }
                    {submitted && !success && message &&
                        <div className="help-block alert alert-danger">Coś poszło nie tak! Spróbuj zarejestrować się ponownie. {message}</div>
                    }
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className={'form-group' + (submitted && !login ? ' has-error' : '')}>
                            <label htmlFor="login">Login</label>
                            <input type="text" className="form-control" name="login" value={login} onChange={this.handleChange}/>
                            {submitted && !login &&
                                <div className="help-block alert alert-danger">Wprowadź login!</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !firstName ? ' has-error' : '')}>
                            <label htmlFor="firstName">Imię</label>
                            <input type="text" className="form-control" name="firstName" value={firstName} onChange={this.handleChange}/>
                            {submitted && !firstName &&
                                <div className="help-block alert alert-danger">Wprowadź imię!</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !lastName ? ' has-error' : '')}>
                            <label htmlFor="lastName">Nazwisko</label>
                            <input type="text" className="form-control" name="lastName" value={lastName} onChange={this.handleChange}/>
                            {submitted && !lastName &&
                                <div className="help-block alert alert-danger">Wprowadź nazwisko!</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
                            <label htmlFor="email">Adres e-mail</label>
                            <input type="email" className="form-control" name="email" value={email} onChange={this.handleChange}/>
                            {submitted && !email && !re.test(email) &&
                                <div className="help-block alert alert-danger">Wprowadź prawidłowy e-mail!</div>
                            }
                        </div>
                        <div className={'form-group ' + (submitted && !password ? ' has-error' : '')}>
                            <label htmlFor="password">Hasło</label>
                            <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange}/>
                            {submitted && !password &&
                                <div className="help-block alert alert-danger">Wprowadź hasło!</div>
                            }
                        </div>
                        <div className={'form-group ' + (submitted && !confirmedPassword ? ' has-error' : '')}>
                            <label htmlFor="confirmedPassword">Potwierdź hasło</label>
                            <input type="password" className="form-control" name="confirmedPassword" value={confirmedPassword} onChange={this.handleChange}/>
                            {submitted && !confirmedPassword &&
                                <div className="help-block alert alert-danger">Potwierdź hasło!</div>
                            }
                            {confirmedPassword!==password &&
                                <div className="help-block alert alert-danger">Hasła muszą się zgadzać!</div>
                            }
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary">Utwórz konto</button>
                        </div>
                        <hr />
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(Register);