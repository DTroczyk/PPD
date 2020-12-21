import React from "react"
import "./Tracking.css"
import services from '../../../services/httpClient'
import { withRouter } from "react-router-dom";

class Tracking extends React.Component {
    state = {
        id: ""
    }

    componentDidMount() {
        
    }

    getStatus(status) {
        switch (status) {
            case 0:
                return "Oczekuje na wysyłkę";
            case 1:
                return "W magazynie";
            case 2:
                return "W drodze";
            case 3:
                return "Dostarczono";
            default:
                return "Błąd";
        }
    }

    render() {


        return (
            <div id="tracking-container" className="container">
                <h2>Paczka nr {this.props.match.params.id}</h2>

                <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Miasto</th>
                                        <th scope="col">Ulica</th>
                                        <th scope="col">Kod pocztowy</th>
                                        <th scope="col">Numer</th>
                                    </tr>
                                </thead>
                                <tbody>
                                        <tr key="1">
                                            <th>t</th>
                                            <td>t</td>
                                            <td>t</td>
                                            <td>t</td>
                                        </tr>

                                </tbody>
                            </table>
                            
            </div>
        )
    }
}
export default withRouter(Tracking);