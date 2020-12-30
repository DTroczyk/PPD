import React from "react"
import "./Pigeon.css"
import services from '../../../services/httpClient'
import { withRouter } from "react-router-dom";
import { PDFDownloadLink } from '@react-pdf/renderer'
import Label from '../Label/Label'
import Button from 'react-bootstrap/Button'
var Barcode = require('react-barcode');

class Pigeon extends React.Component {
    state = {
        isLoaded: false,
        parcels: [],
        statuses: [], 
        currentParcel: "",
        currentStatus: "InWarehouse",
        parcelStatus: "",
        currentBarcode: "0"
    }

    translateStatus = (statusId) => {
        switch(statusId){
            case 0: return "Oczekuje na wysyłkę"
            case 1: return "W magazynie"
            case 2: return "W drodze"
            case 3: return "Dostarczono"
            default: return "Błąd"
        }
    }

    setCurrentParcel = (parcel) => {
        let tmp = this.translateStatus(parcel.parcelStatus);
        this.setState({
            currentParcel: parcel,
            parcelStatus: tmp,
            currentBarcode: parcel.id
        })
    }

    setStatus = (state) => {
        this.setState({
            currentStatus: state.target.value
        })
    }

    handleSetStatus = () => {
        const setStatus = {
            parcelId: this.state.currentParcel.id,
            parcelStatus: this.state.currentStatus
        }

        services.SetStatus(setStatus)
        .then(() => {
            services.GetPigeonParcels()
            .then(response => {
                this.setState({
                    isLoaded: true,
                    parcels: response.data
                })
                if (response.data.length > 0)
                    this.setCurrentParcel(response.data[0])
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error: "catch"
                })
            })
        })  

        if(this.state.parcels[0] != null)
                    this.setCurrentParcel(this.state.parcels[0])
    }

    componentDidMount() {
        if(this.props.role() === "Pigeon")
        {
            services.GetPigeonParcels()
            .then(response => {
                this.setState({
                    isLoaded: true,
                    parcels: response.data,
                })

                if(this.state.parcels[0] != null)
                    this.setCurrentParcel(this.state.parcels[0])
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error: "catch"
                })
            })

            services.GetStatuses()
            .then(response => {
                this.setState({
                    isLoaded: true,
                    statuses: response.data
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
            this.props.history.push("/login")
        }
    }

    render(){

        const parcels = this.state.parcels.map(o => <li key={o.id} onClick={()=>this.setCurrentParcel(o)}><button id="list-item" className="btn btn-primary">{o.id}</button></li>)
        const statuses = this.state.statuses.map(o => <option key={o.id} value={o.statusName}>{this.translateStatus(o.id)}</option>)
        if(this.state.currentParcel === "") {var show = false} else {show = true}
        if(this.state.currentParcel.destinationId == null) {var showReceiver = true} else {showReceiver = false}

        return (  
            <div id="pigeon" className="container">
                <div className="row">
                    <div id="element" className="col-md-12">
                    </div>
                </div>

                <div id="pigeon-row" className="row">
                    <div className="col-md-3">
                        <div id="column">
                            <h2>Lista Paczek</h2>
                            <ul id="list" className="overflow-auto">
                                { parcels.length > 0 ? <div>{parcels}</div> : <p>Lista paczek jest pusta. Dostarczono wszystkie paczki.</p> }
                            </ul>
                        </div>
                    </div>

                    <div className="col-md-5">
                        <div id="column-status">
                            <h2>Status paczki</h2>
                            <p>Aktualny status:</p>
                            { show ? <p>{"<<"} {this.state.parcelStatus} {">>"}</p> : <p>{"<< >>"}</p> }
                            <br></br>
                            <p>Rodzaj paczki:</p>
                            { show ? <p>{"<<"} {this.state.currentParcel.parcelTypeId} {">>"}</p> : <p>{"<< >>"}</p> }
                            { show ? <div id="barcode"><Barcode value={this.state.currentBarcode.toString()}/></div> : <div id="barcode">{"<< >>"}</div> }
                            <label htmlFor="stateSelect">Wybierz status:</label>
                            <select value={this.state.currentStatus} onChange={this.setStatus} className="form-control" id="stateSelect">
                                {statuses}
                            </select>
                            { show ? <button id="stateButton" type="button" className="btn btn-success btn-lg btn-block" onClick={this.handleSetStatus}>Zmień status</button> : null }
                            { show ? <Button id="downloadButton" variant="danger" size="lg" block>
                                <PDFDownloadLink document={<Label   
                                                                id={this.state.currentParcel.id}
                                                                parcelType={this.state.currentParcel.parcelType}
                                                                sendDate={this.state.currentParcel.sendDate}
                                                                senderName={this.state.currentParcel.senderName}
                                                                senderCity={this.state.currentParcel.senderCity}
                                                                senderStreet={this.state.currentParcel.senderStreet}
                                                                senderPostalCode={this.state.currentParcel.senderPostalCode}
                                                                senderHouseNumber={this.state.currentParcel.senderHouseNumber}
                                                                senderEmail={this.state.currentParcel.senderEmail}
                                                                senderPhoneNumber={this.state.currentParcel.senderPhoneNumber}
                                                                receiverName={this.state.currentParcel.receiverName}
                                                                receiverCity={this.state.currentParcel.receiverCity}
                                                                receiverStreet={this.state.currentParcel.receiverStreet}
                                                                receiverPostalCode={this.state.currentParcel.receiverPostalCode}
                                                                receiverHouseNumber={this.state.currentParcel.receiverHouseNumber}
                                                                receiverEmail={this.state.currentParcel.receiverEmail}
                                                                receiverPhoneNumber={this.state.currentParcel.receiverPhoneNumber}
                                                            />} fileName="label.pdf">
                                    {({ blob, url, loading, error }) => (loading ? 'Trwa generowanie etykiety...' : 'Pobierz etykietę')}
                                </PDFDownloadLink></Button> : null }
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div id="column">
                            { showReceiver ? 
                                <div>
                                    <h2>Dane adresata</h2>
                                    <p>{this.state.currentParcel.receiverName}</p>
                                    <p>{this.state.currentParcel.receiverStreet} {this.state.currentParcel.receiverHouseNumber}</p>
                                    <p>{this.state.currentParcel.receiverPostalCode} {this.state.currentParcel.receiverCity}</p>
                                    <p>{this.state.currentParcel.receiverEmail}</p>
                                    <p>{this.state.currentParcel.receiverPhoneNumber}</p>
                                </div>
                            : 
                                <div>
                                    <h2>Dane magazynu</h2>
                                    <p>{this.state.currentParcel.destination.street} {this.state.currentParcel.destination.number}</p>
                                    <p>{this.state.currentParcel.destination.postalCode} {this.state.currentParcel.destination.city}</p>
                                    <p>E {this.state.currentParcel.destination.longitude}&deg;</p>
                                    <p>N {this.state.currentParcel.destination.latidute}&deg;</p>
                                </div>
                            }
                            { show ? 
                                <div>
                                    <h2>Dane nadawcy</h2>
                                    <p>{this.state.currentParcel.senderName}</p>
                                    <p>{this.state.currentParcel.senderStreet} {this.state.currentParcel.senderHouseNumber}</p>
                                    <p>{this.state.currentParcel.senderPostalCode} {this.state.currentParcel.senderCity}</p>
                                    <p>{this.state.currentParcel.senderEmail}</p>
                                    <p>{this.state.currentParcel.senderPhoneNumber}</p>
                                </div>
                            : <h2>Brak danych do wyświetlenia</h2> }
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div id="element" className="col-md-12">
                        {/* <h1>Footer</h1> */}
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Pigeon);