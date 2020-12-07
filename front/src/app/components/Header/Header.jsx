import React from "react"
import "./Header.css"
import { Link } from "react-router-dom"

function Header() {
    return (
        <header>
            <image alt="not found"/>
            <ul>
                <li><Link to="/send">Wysyłam</Link></li>
                <li><Link to="/forbuisness">Oferta dla firm</Link></li>
                <li><Link to="/about">O PPD</Link></li>
                <li><Link to="/prices">Cennik</Link></li>
                <li><Link to="/contact">Kontakt</Link></li>
                <li><Link to="/login">Zaloguj się</Link></li>
                <li><Link to="/register">Zarejestruj się</Link></li>
            </ul>
        </header>
    )
}

export default Header