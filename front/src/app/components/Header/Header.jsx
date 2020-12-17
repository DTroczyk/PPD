import React from "react"
import "./Header.css"
import { Link } from "react-router-dom"

class Header extends React.Component {

    LogOut = (e) => {
        localStorage.removeItem("token")
        this.props.checkLogin()
    }

    render() { 
        return(
            <header id="header">
                {/* <image alt="not found"/> */}
                <Link to="/"><div className="img-container"><img src="logo_500.png" alt="PPD"></img></div></Link>
                <ul className="header-list">
                    <li><Link to="/send">Wysyłam</Link></li>
                    <li><Link to="/forbusiness">Oferta dla firm</Link></li>
                    <li><Link to="/about">O PPD</Link></li>
                    <li><Link to="/prices">Cennik</Link></li>
                    <li><Link to="/contact">Kontakt</Link></li>
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