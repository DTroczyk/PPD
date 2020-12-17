import React from 'react';
import "./Register.css"
import services from '../../../services/httpClient'
import { withRouter } from "react-router-dom";

class Register extends React.Component {
    componentDidMount() {
        if(this.props.isLoggedIn)
            this.props.history.push("/")
    }

    render() {
        return (
            <div id="register" className="container">
                Zarejestruj się formularz
            </div>
        );
    }
}

export default withRouter(Register);