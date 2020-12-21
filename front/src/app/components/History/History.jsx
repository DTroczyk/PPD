import React from "react"
import "./History.css"
import services from '../../../services/httpClient'
import { withRouter } from "react-router-dom";

class History extends React.Component {
    state = {
        deliveredParcels: [],
        otherParcels: []
    }

    componentDidMount() {
        //if(this.props.role() === "Stork")
        //{
        services.GetParcels()
            .then(response => {
                this.setState({
                    otherParcels: response.data.filter(x => x.ParcelStatus !== 3),
                    deliveredParcels: response.data.filter(x => x.ParcelStatus === 3)
                })
                console.log(this.state.otherParcels)
            },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error: "catch"
                    })
                })


        //else
        //{
        //    this.props.history.push("/login");
        //}
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
            <div id="history-container" className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="box">
                            <h2>W drodze</h2>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Odbiorca</th>
                                        <th scope="col">Adres</th>
                                        <th scope="col">Wysłano</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Śledź przesyłkę</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.otherParcels.map(p =>
                                        <tr key={p.id}>
                                            <th scope="row">{p.receiverName}</th>
                                            <td>{p.receiverCity} {p.receiverPostalCode} {p.receiverHouseNumber}</td>
                                            <td>{p.sendDate}</td>
                                            <td>{this.getStatus(p.parcelStatus)}</td>
                                            <td><a href={"/follow/"+p.id} target="_blank" rel="noreferrer" className="link">Link</a></td>
                                        </tr>
                                    )}

                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="box">
                            <h2>Dostarczone</h2>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Odbiorca</th>
                                        <th scope="col">Adres</th>
                                        <th scope="col">Wysłano</th>
                                        <th scope="col">Dostarczono</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.deliveredParcels.map(p =>
                                        <tr>
                                            <th scope="row">{p.receiverName}</th>
                                            <td>{p.receiverCity} {p.receiverPostalCode} {p.receiverHouseNumber}</td>
                                            <td>{p.sendDate}</td>
                                            <td>{p.receivedDate}</td>
                                        </tr>
                                    )}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(History);