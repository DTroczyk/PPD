import React from "react"
import "./Stork.css"
import services from '../../../services/httpClient'



class Stork extends React.Component {
    state = {
        isLoaded: false,
        parcels : [],
        pigeons: [],
        currentPigeon: ""
    }

    componentDidMount() {
        services.GetParcels()
            .then(response => {
                this.setState({
                    isLoaded: true,
                    parcels: response.data,
                    currentPigeon: response.data[0].pigeon.firstName+" "+response.data[0].pigeon.lastName
                })
                
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

    }

    changeSelect = (event) => {
        let tmpPigeon = this.state.parcels.find((x) => x.id == parseInt(event.target.value)).pigeon
        if(tmpPigeon)
        this.setState({currentPigeon: tmpPigeon.firstName+" "+tmpPigeon.lastName});
        else
        this.setState({currentPigeon: "Brak"});

    }

    render() {

        const parcels = this.state.parcels.map(o => <option>{o.id}</option>)
        const freeParcels = this.state.parcels.filter(o => o.pigeonId == null).map(o => <option>{o.id}</option>)
        const pigeons = this.state.pigeons.map(o => <option login={o.login}>{o.firstName} {o.lastName}</option>)
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
                            <label for="parcelSelect">Wybierz paczkę:</label>
                            <select className="form-control" id="parcelSelect">
                                {freeParcels}
                            </select>
                            <label for="pigeonSelect">Wybierz kuriera:</label>
                            <select className="form-control" id="pigeonSelect">
                                {pigeons}
                            </select>
                            <button type="submit" className="btn btn-primary mb-2">Przydziel</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="box">
                        <h3>Zmień przypisane paczki</h3>
                        <hr></hr>
                        <div className="form-group">
                            <label for="parcelSelect">Wybierz paczkę:</label>
                            <select className="form-control" id="parcelSelect" onChange={this.changeSelect}>
                                {parcels}
                            </select>
                            <br></br>
                            Aktualnie wybrany kurier: <strong>{this.state.currentPigeon}</strong>
                            <br></br>
                            <br></br>
                            <label for="pigeonSelect">Wybierz nowego kuriera:</label>
                            <select className="form-control" id="pigeonSelect">
                                {pigeons}
                            </select>
                            <button type="submit" className="btn btn-primary mb-2">Zmień przydział</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )}
}

export default Stork