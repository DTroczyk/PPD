import React from "react"
import "./Tracking.css"
import services from '../../../services/httpClient'
import { withRouter } from "react-router-dom";

class Tracking extends React.Component {
    state = {
        id: "",
        parcelHistory: [],
        isLoaded: false
    }

    componentDidMount() {
        services.FollowParcel(this.props.match.params.id)
            .then(response => {
                this.setState({
                    parcelHistory: response.data.warehouses
                })
            },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error: "catch"
                    })
                })
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
        const warehouses = this.state.parcelHistory.map(w => (
            <tr key="1">
                <th>{w.dateOfArrival}</th>
                <th>{w.warehouse.city}</th>
                <td>{w.warehouse.street}</td>
                <td>{w.warehouse.postalCode}</td>
                <td>{w.warehouse.number}</td>
            </tr>
        ))

        return (
            <div id="tracking-container" className="container">
                <h2>Paczka nr {this.props.match.params.id}</h2>

                <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Godzina dotarcia</th>
                                        <th scope="col">Miasto</th>
                                        <th scope="col">Ulica</th>
                                        <th scope="col">Kod pocztowy</th>
                                        <th scope="col">Numer</th>
                                    </tr>
                                </thead>
                                <tbody>
                                        {warehouses}
                                </tbody>
                            </table>
                            
            </div>
        )
    }
}
export default withRouter(Tracking);