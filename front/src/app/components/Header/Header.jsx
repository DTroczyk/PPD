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
        if (role === "Guest" || role === "Sparrow")
            return (
                <>
                    <li className="nav-item" ><Link to="/send" className="nav-link">Wysyłam</Link></li>
                    {this.props.isLoggedIn &&
                        <li className="nav-item" ><Link to="/history" className="nav-link">Twoja historia</Link></li>
                    }
                    <li className="nav-item" ><Link to="/forbusiness" className="nav-link">Oferta dla firm</Link></li>
                    <li className="nav-item" ><Link to="/about" className="nav-link">O PPD</Link></li>
                    <li className="nav-item" ><Link to="/prices" className="nav-link">Cennik</Link></li>
                    <li className="nav-item" ><Link to="/contact" className="nav-link">Kontakt</Link></li>
                </>
            )
        if (role === "Stork")
            return (
                <li className="nav-item"><Link to="/stork" className="nav-link">Panel Menadżera</Link></li>
            )
        if (role === "Pigeon")
            return (
            <li className="nav-item" ><Link to="/pigeon" className="nav-link">Panel Kuriera</Link></li>
        )
    }

    render() { 
        return(
            <header id="header">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
                    <Link to="/"><div className="navbar-brand img-container"><img src="/logo_500.gif" alt="PPD"></img></div></Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav">
                            {this.navigation()}
                            {this.props.isLoggedIn
                                ? <li onClick={this.LogOut} class="nav-item" ><Link to="/" className="nav-link">Wyloguj się</Link></li> 
                                : <li className="nav-item"><Link to="/login" className="nav-link">Zaloguj się</Link></li>
                            }
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }
}
export default Header;