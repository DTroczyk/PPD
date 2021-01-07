import React from "react"
import "./Stork.css"
import services from '../../../services/httpClient'
import { withRouter } from "react-router-dom";
import moment from 'moment'
var Barcode = require('react-barcode');


class Stork extends React.Component {
    state = {
        isLoaded: false,
        parcels : [],
        pigeons: [],
        warehouses: [],
        currentPigeon: "",
        firstParcelSelected : "",
        firstPigeonSelected : "",
        secondParcelSelected : "",
        secondPigeonSelected : "",
        currentWarehouseId: "",
        changeCurrentPigeon: true,
        currentBarcode: "1",
        currentMapLink: "",
        currentLink: "",
        currentAddress: "",
        sendDate: ""
    }

    componentDidMount() {
        if(this.props.role() === "Stork")
        {
            services.GetParcels()
            .then(response => {
                let parcels = response.data;
                let freeParcel = parcels.find(p => p.pigeonId == null)
                this.setState({
                    isLoaded: true,
                    parcels: response.data,
                })

                if (freeParcel !== undefined)
                {
                    let parcel = this.state.parcels.find(p => p.id === freeParcel.id)
                    this.setState({
                        firstParcelSelected: parcel
                    })
                }
                let withPigeons = response.data.filter(x => x.pigeon !== null);
                if(this.state.changeCurrentPigeon && (withPigeons.length > 0) && (withPigeons[0].pigeon !== null)){
                    this.setState({
                        currentPigeon: withPigeons[0].pigeon.firstName+" "+withPigeons[0].pigeon.lastName,
                        currentBarcode: withPigeons[0].id,
                        secondParcelSelected: withPigeons[0].id,
                        changeCurrentPigeon: false
                    });
                }
                else if(this.state.changeCurrentPigeon){
                    this.setState({changeCurrentPigeon: false});
                }

                let withoutPigeons = response.data.filter(x => x.pigeon === null);
                if(withoutPigeons.length > 0){
                    this.setState({
                        currentAddress: `${withoutPigeons[0].receiverCity} ${withoutPigeons[0].receiverPostalCode} ${withoutPigeons[0].receiverStreet}`,
                        sendDate : moment(withoutPigeons[0].sendDate).format('DD-MM-YYYY HH:mm').toString()
                    })
                }
                
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error: "catch"
                })
            })
        
        services.GetPigeons()
            .then(response => {
                this.setState({
                    isLoaded: true,
                    pigeons: response.data
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
            this.props.history.push("/login");
        }
    }

    changeSelect = (event) => {
        let tmpPigeon = this.state.parcels.find((x) => x.id === parseInt(event.target.value)).pigeon;
        this.setState({currentBarcode: event.target.value});
        if(tmpPigeon)
        this.setState({currentPigeon: tmpPigeon.firstName+" "+tmpPigeon.lastName});
        else
        this.setState({currentPigeon: "Brak"});
        this.changeSecondParcel(event)
    }

    setPigeonFirst = () => {
        let pigeonLogin = this.state.firstPigeonSelected;
        let parcelId = this.state.firstParcelSelected.id;
        let warehouseId = this.state.currentWarehouseId;
        if(pigeonLogin === "") pigeonLogin = this.state.pigeons[0].login;
        if(parcelId === "") {
            if(this.state.parcels.filter(o => o.pigeonId === null).length < 1) return;
            parcelId = this.state.parcels.filter(o => o.pigeonId === null)[0].id;
        }
        if(warehouseId === "") warehouseId = this.state.warehouses[0].id;
        let pigeon = {PigeonLogin: pigeonLogin, ParcelId: parcelId, WarehouseId: warehouseId};
        if(pigeon.PigeonLogin === "" || pigeon.ParcelId === "" || pigeon.WarehouseId === "") return;
        services.SetPigeon(pigeon).then(() => {
            if(this.state.parcels.filter(x => x.pigeon !== null).length < 1)
            this.setState({changeCurrentPigeon: true});
            this.componentDidMount();
        });
    }

    sendToClient = () => {
        let pigeonLogin = this.state.firstPigeonSelected;
        let parcelId = this.state.firstParcelSelected.id;
        let warehouseId = -1;
        if(pigeonLogin === "") pigeonLogin = this.state.pigeons[0].login;
        if(parcelId === "") {
            if(this.state.parcels.filter(o => o.pigeonId === null).length < 1) return;
            parcelId = this.state.parcels.filter(o => o.pigeonId === null)[0].id;
        }
        let pigeon = {PigeonLogin: pigeonLogin, ParcelId: parcelId, WarehouseId: warehouseId};
        if(pigeon.PigeonLogin === "" || pigeon.ParcelId === "") return;
        services.SetPigeon(pigeon).then(() =>{
            let freeParcel = this.state.parcels.find(p => p.pigeonId == null)
            if (freeParcel !== undefined)
                this.setState({firstParcelSelected: freeParcel})

            if(this.state.parcels.filter(x => x.pigeon !== null).length < 1)
            this.setState({
                changeCurrentPigeon: true,
            });
            this.componentDidMount();
        });
    }

    setPigeonSecond = () => {
        let pigeonLogin = this.state.secondPigeonSelected;
        let parcelId = this.state.secondParcelSelected;
        if(pigeonLogin === "") pigeonLogin = this.state.pigeons[0].login;
        if(parcelId === "") parcelId = this.state.parcels.filter(o => o.pigeonId !== null)[0].id;
        let pigeon = {PigeonLogin: pigeonLogin, ParcelId: parcelId}
        if(pigeon.PigeonLogin === "" || pigeon.ParcelId === "") return;
        services.SetPigeon(pigeon).then(() =>{
            this.componentDidMount()

            let tmpPigeon = this.state.pigeons.find((x) => x.login === pigeonLogin)
            if(tmpPigeon)
            this.setState({currentPigeon: tmpPigeon.firstName+" "+tmpPigeon.lastName});
            else
            this.setState({currentPigeon: "Brak"});

        });
    }
    changeFirstParcel = (v) => {
        let parcel = this.state.parcels.find(p => p.id.toString() === v.target.value)
        this.setState({firstParcelSelected: parcel})

        if(parcel !== undefined){
            this.setState({
                currentAddress: `${parcel.receiverCity} ${parcel.receiverPostalCode} ${parcel.receiverStreet}`,
                sendDate : moment(parcel.sendDate).format('DD-MM-YYYY HH:mm').toString()
            })
        }
    }
    changeFirstPigeon = (v) => {
        this.setState({firstPigeonSelected: v.target.value})
    }
    changeSecondParcel = (v) => {
        this.setState({secondParcelSelected: v.target.value})
    }
    changeSecondPigeon = (v) => {
        this.setState({secondPigeonSelected: v.target.value})
    }
    changeWarehouse = (v) => {
        this.setState({currentWarehouseId: v.target.value})
        let warehouse = this.state.warehouses.find(x => x.id === parseInt(v.target.value))
        this.refreshMap(warehouse)
    }

    refreshMap(warehouse){
        if(warehouse === null){
            if(this.state.warehouses.length < 1) return;
            warehouse = this.state.warehouses[0];
        }
        let currentX = warehouse.longitude.toString();
        let currentY = warehouse.latidute.toString();
        let currentYOffset = (warehouse.latidute+0.002).toString();
        this.setState({currentMapLink : `https://www.openstreetmap.org/export/embed.html?bbox=${currentX}%2C${currentY}%2C${currentX}%2C${currentYOffset}&amp;layer=mapnik&amp;marker=${currentY}%2C${currentX}`,
        currentLink: `https://www.openstreetmap.org/?mlat=${currentY}&amp;mlon=${currentX}#map=16/${currentY}/${currentX}`});
    }
    render() {

        const selectedParcels = this.state.parcels.filter(o => o.pigeonId !== null).map(o => <option key={o.id} >{o.id}</option>)
        const freeParcels = this.state.parcels.filter(o => o.pigeonId === null).map(o => <option key={o.id}>{o.id}</option>)
        const pigeons = this.state.pigeons.map(o => <option key={o.login} value={o.login}>{o.firstName} {o.lastName}</option>)
        const warehouses = this.state.warehouses.map(o => <option key={o.id} value={o.id}>{o.city} {o.postalCode} {o.street}</option>);
        return (
        <div id="stork-container" className="container">
            <h1>Opcje Managera</h1>
            <hr></hr>
            <div className="row">
                <div className="col-md-6">
                    <div className="box">
                        <h3>Przydziel nowe paczki kurierowi</h3>
                        <hr></hr>
                        <div className="form-group">
                            <label htmlFor="parcelSelect">Wybierz paczkę:</label>
                            <select onChange={this.changeFirstParcel} className="form-control" id="parcelSelect" value={this.state.firstParcelSelected !== undefined ? this.state.firstParcelSelected.id : ""}>
                                {freeParcels}
                            </select>
                            <br></br>
                            <strong>Adres: </strong>{this.state.currentAddress}<br></br>
                            <strong>Data nadania: </strong>{this.state.sendDate}<br></br>
                            <br></br>
                            
                            {this.state.firstParcelSelected.parcelStatus === 0 ? 
                                <>
                                    <label htmlFor="pigeonSelect">Przydziel kuriera do odebrania paczki od nadawcy:</label>
                                    <select onChange={this.changeFirstPigeon} className="form-control" id="pigeonSelect">
                                        {pigeons}
                                    </select>
                                    <button type="submit" onClick={this.setPigeonFirst} className="btn btn-primary mb-2">Przydziel</button>
                                </>
                                :
                                <>
                                    <label htmlFor="pigeonSelect">Wybierz kuriera:</label>
                                    <select onChange={this.changeFirstPigeon} className="form-control" id="pigeonSelect">
                                        {pigeons}
                                    </select>
                                    <label htmlFor="warehouseSelect">Wybierz magazyn:</label>
                                    <select onChange={this.changeWarehouse} className="form-control" id="warehouseSelect">
                                        {warehouses}
                                    </select>
                                    <br></br>
                                    <iframe title="map" width="100%" height="250px" frameBorder="0" scrolling="no" src={this.state.currentMapLink}></iframe><br/><small><a target="_blank" rel="noreferrer" href={this.state.currentLink}>Wyświetl większą mapę</a></small>
                                    <br></br>
                                    <button type="submit" onClick={this.setPigeonFirst} className="btn btn-primary mb-2">Przydziel</button>

                                    <br></br>
                                    Wyślij paczkę bezpośrednio do klienta:<br></br>
                                    <button type="submit" onClick={this.sendToClient} className="btn btn-primary mb-2">Wyślij do klienta</button>
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="box">
                        <h3>Zmień przypisane paczki</h3>
                        <hr></hr>
                        <div className="form-group">
                            <label htmlFor="parcelSelect">Wybierz paczkę:</label>
                            <select className="form-control" id="parcelSelect" onChange={this.changeSelect} value={this.secondParcelSelected}>
                                {selectedParcels}
                            </select>
                            <br></br>
                            <div id="barcode-container"><Barcode value={this.state.currentBarcode.toString()} /></div>
                            Aktualnie wybrany kurier: <strong>{this.state.currentPigeon}</strong>
                            <br></br>
                            <br></br>
                            <label htmlFor="pigeonSelect">Wybierz nowego kuriera:</label>
                            <select onChange={this.changeSecondPigeon} className="form-control" id="pigeonSelect">
                                {pigeons}
                            </select>
                            <button type="submit" onClick={this.setPigeonSecond} className="btn btn-primary mb-2">Zmień przydział</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )}
}
export default withRouter(Stork);