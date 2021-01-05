import React from 'react'
import './About.css'

function About() {
    return (
        <div id="about" className="container">
            <h1 className="about-h1">O PPD</h1>
            <p className="about-paragraph">
                <strong>Pigeon Parcel Delivery</strong> to prężnie rozwijająca się firma kurierska, działająca na terenie całego kraju. Dostarczamy paczki
                do dwóch dni roboczych od czasu nadania. Pracujemy niestrudzenie niczym gołębie pocztowe, by dostarczyć Twoją paczkę najszybciej jak to możliwe. 
            </p>
            <div className="about-img-container"><img src="logo_500.gif" alt="PPD"></img></div>
        </div>
    )
}

export default About