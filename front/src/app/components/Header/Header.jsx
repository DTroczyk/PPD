import React from "react"
import "./Header.css"
import { Link } from "react-router-dom"

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            matches: window.matchMedia("(max-width: 991px)").matches
        }
        this.Collapse();
    }

    Collapse = () => {
        setInterval(() => {
            if (this.state.matches !== window.matchMedia("(max-width: 991px)").matches)
                this.setState({
                    matches: window.matchMedia("(max-width: 991px)").matches
                })
        }, 500);
    }

    LogOut = (e) => {
        localStorage.removeItem("token")
        this.props.checkLogin()
    }

    navigation = () => {
        const role = this.props.role();
        if (role === "Guest" || role === "Sparrow")
            return (
                <>
                    <li className="nav-item" ><Link to="/send" className="nav-link" data-toggle="collapse" data-target=".active">Wysyłam</Link></li>
                    {this.props.isLoggedIn &&
                        <li className="nav-item" ><Link to="/history" className="nav-link" data-toggle="collapse" data-target=".active">Twoja historia</Link></li>
                    }
                    <li className="nav-item" ><Link to="/forbusiness" className="nav-link" data-toggle="collapse" data-target=".active">Oferta dla firm</Link></li>
                    <li className="nav-item" ><Link to="/about" className="nav-link" data-toggle="collapse" data-target=".active">O PPD</Link></li>
                    <li className="nav-item" ><Link to="/prices" className="nav-link" data-toggle="collapse" data-target=".active">Cennik</Link></li>
                    <li className="nav-item" ><Link to="/contact" className="nav-link" data-toggle="collapse" data-target=".active">Kontakt</Link></li>
                </>
            )
        if (role === "Stork")
            return (
                <li className="nav-item"><Link to="/stork" className="nav-link" data-toggle="collapse" data-target=".active">Panel Menadżera</Link></li>
            )
        if (role === "Pigeon")
            return (
            <li className="nav-item" ><Link to="/pigeon" className="nav-link" data-toggle="collapse" data-target=".active">Panel Kuriera</Link></li>
        )
    }

    render() { 
        return(
            <header id="header">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
                    <Link to="/"><div className="navbar-brand img-container"><img src="/logo_500.gif" alt="PPD"></img></div></Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".active" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className={this.state.matches ? "collapse navbar-collapse active" : "collapse navbar-collapse"} id="navbarTogglerDemo02">
                        <ul className="navbar-nav">
                            {this.navigation()}
                            {this.props.isLoggedIn
                                ? <li onClick={this.LogOut} className="nav-item" ><Link to="/" className="nav-link" data-toggle="collapse" data-target=".active">Wyloguj się</Link></li> 
                                : <li className="nav-item"><Link to="/login" className="nav-link" data-toggle="collapse" data-target=".active">Zaloguj się</Link></li>
                            }
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }
}
export default Header;