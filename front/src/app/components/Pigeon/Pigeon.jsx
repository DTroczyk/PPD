import React from "react"
import "./Pigeon.css"
import services from '../../../services/httpClient'
import { withRouter } from "react-router-dom";
//var Barcode = require('react-barcode');

class Pigeon extends React.Component {
    state = {
        isLoaded: false,
        parcels: [],
        statuses: [], 
        currentParcel: "",
        //currentStatus: "",
        parcelStatus: "",
        currentBarcode: "1"
    }

    setCurrentParcel = (parcel) => {
        let tmp = ""
        switch(parcel.parcelStatus){
            case 0:   
               tmp = "Waiting to be posted"; break
            case 1:   
               tmp = "In Warehouse"; break
            case 2:   
               tmp = "In the road"; break
            case 3:   
               tmp = "Delivered"; break
        }
        this.setState({
            currentParcel: parcel,
            parcelStatus: tmp
        }) 
        console.log(parcel.parcelStatus+" "+tmp)
    }

    // setStatus = (state) => {
    //     this.state({
    //         currentStatus: state.target.value
    //     })
    // }

    handleSetStatus = () => {
        const setStatus = {
            parcelId: this.state.currentParcel.id,
            parcelStatus: this.state.currentStatus
        }
    }

    componentDidMount() {
        if(this.props.role() === "Pigeon")
        {
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
        const statuses = this.state.statuses.map(o => <option key={o.id}>{o.statusName}</option>)

        return (  
            <div id="pigeon" className="container">
                <div className="row">
                    <div id="element" className="col-md-12">
                        <h1>Pigeon</h1>
                    </div>
                </div>

                <div id="pigeon-row" className="row">
                    <div className="col-md-6">
                        <div id="column">
                            <h2>Lista Paczek</h2>
                            <ul id="list">
                                {parcels}
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div id="column">
                            <h2>Status paczki</h2>
                            <h3>Aktualny status:</h3>
                            <h3>{this.state.parcelStatus}</h3>
                            <label htmlFor="stateSelect">Wybierz status:</label>
                            <select onChange={()=>this.setStatus} className="form-control" id="stateSelect">
                                {statuses}
                            </select>
                            <button id="stateButton" type="button" className="btn btn-primary btn-lg btn-block" onClick={this.handleSetStatus}>Zmień status</button>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div id="element" className="col-md-12">
                        <h1>Koniec</h1>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Pigeon);