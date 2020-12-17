import React from "react"
import "./Header.css"
import { Link } from "react-router-dom"

class Header extends React.Component {
    LogOut = (e) => {
        localStorage.removeItem("token")
        this.props.checkLogin()
    }

    navigation = () => {
        const role = this.props.role();
        console.log(role);
        if (role === "Guest" || role === "Sparrow")
            return (
                <>
                    <li><Link to="/send">Wysyłam</Link></li>
                    <li><Link to="/forbusiness">Oferta dla firm</Link></li>
                    <li><Link to="/about">O PPD</Link></li>
                    <li><Link to="/prices">Cennik</Link></li>
                    <li><Link to="/contact">Kontakt</Link></li>
                </>
            )
        if (role === "Stork")
            return (
                <li><Link to="/stork">Panel Menadżera</Link></li>
            )
        if (role === "Pigeon")
            return (
            <li><Link to="/pigeon">Panel Kuriera</Link></li>
        )
    }

    render() { 
        return(
            <header id="header">
                {/* <image alt="not found"/> */}
                <Link to="/"><div className="img-container"><img src="logo_500.png" alt="PPD"></img></div></Link>
                <ul className="header-list">
                    {this.navigation()}
                    {this.props.isLoggedIn
                        ? <li onClick={this.LogOut}><Link to="/">Wyloguj się</Link></li> 
                        : <li><Link to="/login">Zaloguj się</Link></li>
                    }
                </ul>
            </header>
        );
    }
}
export default Header;