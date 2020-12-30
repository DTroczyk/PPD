import React from "react"
import "./History.css"
import services from '../../../services/httpClient'
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom"
import Button from 'react-bootstrap/Button'
import { PDFDownloadLink } from '@react-pdf/renderer'
import moment from 'moment'
import Label from '../Label/Label'

class History extends React.Component {
    state = {
        deliveredParcels: [],
        otherParcels: []
    }

    componentDidMount() {
        if(this.props.role() === "Sparrow")
        {
        services.GetSparrowParcels()
            .then(response => {
                this.setState({
                    otherParcels: response.data.filter(x => x.parcelStatus !== 3),
                    deliveredParcels: response.data.filter(x => x.parcelStatus === 3)
                })
            },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error: "catch"
                    })
                })
        }
        else
        {
           this.props.history.push("/login");
        }
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
                                        <th scope="col">Etykieta</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.otherParcels.map(p =>
                                        <tr key={p.id}>
                                            <th scope="row">{p.receiverName}</th>
                                            <td>{p.receiverCity} {p.receiverPostalCode} {p.receiverHouseNumber}</td>
                                            <td>{moment(p.sendDate).format('DD-MM-YYYY HH:mm').toString()}</td>
                                            <td>{this.getStatus(p.parcelStatus)}</td>
                                            <td><Link to={"/tracking/"+p.id} rel="noreferrer" className="link">Link</Link></td>
                                            <td><Button id="downloadButton" variant="info" size="sm" block>
                                                <PDFDownloadLink document={<Label   
                                                                                id={p.id}
                                                                                parcelType={p.parcelType}
                                                                                sendDate={moment(p.sendDate).format('DD-MM-YYYY HH:mm').toString()}
                                                                                senderName={p.senderName}
                                                                                senderCity={p.senderCity}
                                                                                senderStreet={p.senderStreet}
                                                                                senderPostalCode={p.senderPostalCode}
                                                                                senderHouseNumber={p.senderHouseNumber}
                                                                                senderEmail={p.senderEmail}
                                                                                senderPhoneNumber={p.senderPhoneNumber}
                                                                                receiverName={p.receiverName}
                                                                                receiverCity={p.receiverCity}
                                                                                receiverStreet={p.receiverStreet}
                                                                                receiverPostalCode={p.receiverPostalCode}
                                                                                receiverHouseNumber={p.receiverHouseNumber}
                                                                                receiverEmail={p.receiverEmail}
                                                                                receiverPhoneNumber={p.receiverPhoneNumber}
                                                                            />} fileName="label.pdf">
                                                    {({ blob, url, loading, error }) => (loading ? 'Trwa generowanie etykiety...' : 'Pobierz etykietę')}
                                                </PDFDownloadLink>
                                            </Button></td>
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
                                        <tr key={p.id}>
                                            <th scope="row">{p.receiverName}</th>
                                            <td>{p.receiverCity} {p.receiverPostalCode} {p.receiverHouseNumber}</td>
                                            <td>{moment(p.sendDate).format('DD-MM-YYYY HH:mm').toString()}</td>
                                            <td>{moment(p.receivedDate).format('DD-MM-YYYY HH:mm').toString()}</td>
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