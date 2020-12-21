import React from "react"
import "./Pigeon.css"
import services from '../../../services/httpClient'
import { withRouter } from "react-router-dom";
var Barcode = require('react-barcode');

class Pigeon extends React.Component {
    state = {
        isLoaded: false,
        parcels: [],
        statuses: [], 
        currentParcel: "",
        currentStatus: "InWarehouse",
        parcelStatus: "",
        currentBarcode: "0",
        warehouses: [],
        currentWarehouse: ""
    }

    setCurrentParcel = (parcel) => {
        let tmp = ""
        switch(parcel.parcelStatus){
            case 0: tmp = "Waiting to be posted"; break
            case 1: tmp = "In Warehouse"; break
            case 2: tmp = "In the road"; break
            case 3: tmp = "Delivered"; break
        }
        let warehouse = this.state.warehouses.map(w=>w.id == this.state.currentParcel.destinationId ? w : "")//
        console.log("warehouses")//
        console.log(this.state.warehouses)//
        console.log("warehouses")//
        this.setState({
            currentParcel: parcel,
            parcelStatus: tmp,
            currentBarcode: parcel.id,
            currentWarehouse: warehouse//
        })
    }

    setStatus = (state) => {
        this.setState({
            currentStatus: state.target.value
        })
        console.log(state.target.value)
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
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error: "catch"
                })
            })
        })  
        this.setState({
            currentParcel: "",
            currentStatus: ""
        })
        
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
                //ustawianie: currentParcel, parcelStatus, currentBarcode
                if(this.state.parcels[0] != null){}
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

            services.GetWarehouses()
            .then(response => {
                this.setState({
                    warehouses: response.data
                })
                this.refreshMap(null)
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
        const statuses = this.state.statuses.map(o => <option key={o.id}>{o.statusName}</option>)
        if(this.state.currentParcel == "") {var show = false} else {var show = true}
        //if(this.state.currentParcel == "") {var show = true} else {var show = false}
        if(this.state.currentParcel.destinationId == null) {var showReceiver = true} else {var showReceiver = false}

        return (  
            <div id="pigeon" className="container">
                <div className="row">
                    <div id="element" className="col-md-12">
                        <h1>Panel kuriera</h1>
                    </div>
                </div>

                <div id="pigeon-row" className="row">
                    <div className="col-md-3">
                        <div id="column">
                            <h2>Lista Paczek</h2>
                            <ul id="list">
                                { show ? <div>{parcels}</div> : <p>Lista paczek jest pusta. Dostarczono wszystkie paczki.</p> }
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
                            { show ? <button id="stateButton" type="button" className="btn btn-primary btn-lg btn-block" onClick={this.handleSetStatus}>Zmień status</button> : null }
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
                                    <p>informacje o magazynie</p>
                                    <p>{this.state.currentWarehouse.Street} {this.state.currentWarehouse.Number}</p>
                                    <p>{this.state.currentWarehouse.PostalCode} {this.state.currentWarehouse.City}</p>
                                    <p>{this.state.currentWarehouse.Longitude} {this.state.currentWarehouse.Latidute}</p>
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
                        {/* <h1>Koniec</h1> */}
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Pigeon);