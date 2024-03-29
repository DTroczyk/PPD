import React from "react"
import "./Contact.css"

function Contact() {
    return (
        <div className="contact-container container">
            <div className="contact-content">
                <div className="info">
                    <span><h1>✉️Kontakt</h1> Firma <strong>PPD</strong> dba o dobry kontakt z klientami. W roku 2020 zdobyliśmy główną nagrodę w konkursie konsumenckim <i>Gold Client's Awards</i> w Bytomiu dla firmy przyjaznej klientowi. Jeśli masz jakieś pytania lub sugestie, chętnie na nie odpowiemy!</span>
                </div>
                <ul className="contact-list">
                    <table>
                        <tbody>
                            <tr>
                                <td>💼 Biuro obsługi klienta</td><td><strong>biuro@ppd.com</strong></td>
                            </tr>
                            <tr>
                                <td>✍🏻 Skargi i pochwały</td><td><strong>skargi@ppd.com</strong></td>
                            </tr>
                            <tr>
                                <td>🤝🏻 Współpraca</td><td><strong>wspolpraca@ppd.com</strong></td>
                            </tr>
                            <tr>
                                <td>🤵 Kontakt do zarządu</td><td><strong>zarzad@ppd.com</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </ul>
                <br></br>
                <ul className="contact-list">
                    <li>Biuro obsługi klienta (BOK)</li>
                    <li>
                        <strong>📞 502 302 203</strong>
                    </li>
                    <li>
                        🕙 Godziny pracy:
                </li>
                    <li>Poniedziałek - Piątek: 8:00 - 16:00</li>
                    <li>Sobota: 9:00 - 14:00</li>
                </ul>
            </div>
        </div>
    )
}

export default Contact