import React from "react"
import "./Send.css"
import services from '../../../services/httpClient'

class Send extends React.Component {
    state = {
        senderName: '',
        senderCity: '',
        senderStreet: '',
        senderPostalCode: '',
        senderHouseNumber: '',
        senderEmail: '',
        senderPhoneNumber: '',
        receiverName: '',
        receiverCity: '',
        receiverStreet: '',
        receiverPostalCode: '',
        receiverHouseNumber: '',
        receiverEmail: '',
        receiverPhoneNumber: '',
        submitted: false,
        typeParcel: '',
        typeParcels : []
    }

    componentDidMount() {
        services.GetParcelsTypes()
            .then(response => {
                this.setState({
                    typeParcels: response.data
                })
            })
    };

    handleChange = this.handleChange.bind(this);
    handleClick = this.handleClick.bind(this);

    handleChange(e){
        const {name, value} = e.target;
        this.setState({[name]: value})
    }

    handleClick(e) {
        e.preventDefault()
        this.setState({ submitted: true })
        console.log("esa");
        const{  senderName,
            senderCity,
            senderStreet,
            senderPostalCode,
            senderHouseNumber,
            senderEmail,
            senderPhoneNumber,
            receiverName,
            receiverCity,
            receiverStreet,
            receiverPostalCode,
            receiverHouseNumber,
            receiverEmail,
            receiverPhoneNumber,
            typeParcel
        } = this.state;

        var parcel = {
            parcelTypeId: typeParcel,
            senderName,
            senderCity,
            senderStreet,
            senderPostalCode,
            senderHouseNumber,
            senderEmail,
            senderPhoneNumber,
            receiverName,
            receiverCity,
            receiverStreet,
            receiverPostalCode,
            receiverHouseNumber,
            receiverEmail,
            receiverPhoneNumber
        }
        services.SendParcel(parcel).then(
            console.log("Wyslano paczke")
        )
    }

    // changeSelect = (event) => {
    //     this.setState({currentPigeon: tmpPigeon.firstName+" "+tmpPigeon.lastName});
    // }

    render() { 

        const typeParcels = this.state.typeParcels.map(o => <option>{o.name}</option>)
        const{  senderName,
                senderCity,
                senderStreet,
                senderPostalCode,
                senderHouseNumber,
                senderEmail,
                senderPhoneNumber,
                receiverName,
                receiverCity,
                receiverStreet,
                receiverPostalCode,
                receiverHouseNumber,
                receiverEmail,
                receiverPhoneNumber,
                typeParcel
            } = this.state;
        return (
            
            <div id="send" className="container">
                <div className="row">
                    <div id="nadawca" className="col-md-6 " >
                        <h2 id="tytul">Dane nadawcy: </h2>
                        <form name="form">
                            <div className="form-row">
                                <div className="col-md-12">
                                    <label htmlFor="nameInputSen">Imie i nazwisko: </label>
                                    <input type="text" className="form-control" id="nameInputSen" placeholder="Wpisz imię nadawcy" name="senderName" value={senderName} onChange={this.handleChange}/>
                                </div>
                            </div>
                        </form>
                        <div className="col-md-12">
                            <br></br>
                            <label htmlFor="adresInput">Adres: </label>
                            <input type="text" className="form-control" id="adresInputSen" placeholder="Podaj nazwe ulicy nadawcy" name="senderStreet" value={senderStreet} onChange={this.handleChange}/>
                            <input type="text" className="form-control" id="adresInputSen" placeholder="Numer mieszkania, apartamentu, pomieszczenia, budynkui itp." name="senderHouseNumber" value={senderHouseNumber} onChange={this.handleChange}/>
                        </div>
                        <form name="form" >
                            <div className="form-row">
                                <div className="col-md-4">
                                    <br></br>
                                    <label htmlFor="zipInputSen">Kod pocztowy: </label>
                                    <input type="text" className="form-control" id="zipInputSen" placeholder="00-000" name="senderPostalCode" value={senderPostalCode} onChange={this.handleChange}/>
                                </div>
                                <div className="col-md-8">
                                    <br></br>
                                    <label htmlFor="cityInputSen">Miasto: </label>
                                    <input type="text" className="form-control" id="cityInputSen" placeholder="Wpisz miasto" name="senderCity" value={senderCity} onChange={this.handleChange} />
                                </div>
                            </div>
                        </form>
                        <form name="form" >
                            <div className="form-row">
                                <div className="col-md-6">
                                    <br></br>
                                    <label htmlFor="emailInputSen">Adres e-mail: </label>
                                    <input type="text" className="form-control" id="emailInputSen" placeholder="mail@siec.pl" name="senderEmail" value={senderEmail} onChange={this.handleChange}/>
                                    <br></br>
                                    <label htmlFor="parcelSelect">Wybierz rodzaj paczki:</label>
                                    <select className="form-control" name="typeParcel" value={typeParcel} onChange={this.handleChange}>
                                        {typeParcels}
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <br></br>
                                    <label htmlFor="phoneInputSen">Telefon: </label>
                                    <input id="phoneInputSen" type="text" className="form-control" placeholder="123456789" name="senderPhoneNumber" value={senderPhoneNumber} onChange={this.handleChange}/>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div id="odbiorca" className="col-md-6 ">
                    <h2 id="tytul">Dane odbiorcy: </h2>
                        <form name="form" >
                            <div className="form-row">
                                <div className="col-md-12">
                                    <label htmlFor="nameInputRec">Imie i nazwisko: </label>
                                    <input type="text" className="form-control" id="nameInputRec" placeholder="Wpisz imię i nazwisko odbiorcy" name="receiverName" value={receiverName} onChange={this.handleChange}/>
                                </div>
                            </div>
                        </form>
                        <div className="col-md-12">
                            <br></br>
                            <label htmlFor="adresInput">Adres: </label>
                            <input type="text" className="form-control" id="adresInputRec" placeholder="Podaj nazwe ulicy odbiorcy" name="receiverStreet" value={receiverStreet} onChange={this.handleChange}/>
                            <input type="text" className="form-control" id="adresInputRec" placeholder="Numer mieszkania, apartamentu, pomieszczenia, budynkui itp." name="receiverHouseNumber" value={receiverHouseNumber} onChange={this.handleChange}/>
                        </div>
                        <form name="form" >
                            <div className="form-row">
                                <div className="col-md-4">
                                    <br></br>
                                    <label htmlFor="zipInputRec">Kod pocztowy: </label>
                                    <input type="text" className="form-control" id="zipInputRec" placeholder="00-000" name="receiverPostalCode" value={receiverPostalCode} onChange={this.handleChange}/>
                                </div>
                                <div className="col-md-8">
                                    <br></br>
                                    <label htmlFor="cityInputRec">Miasto: </label>
                                    <input type="text" className="form-control" id="cityInputRec" placeholder="Wpisz miasto" name="receiverCity" value={receiverCity} onChange={this.handleChange}/>
                                </div>
                            </div>
                        </form>
                        <form name="form" >
                            <div className="form-row">
                                <div className="col-md-6">
                                    <br></br>
                                    <label htmlFor="emailInputRec">Adres e-mail: </label>
                                    <input type="text" className="form-control" id="emailInputRec" placeholder="mail@siec.pl" name="receiverEmail" value={receiverEmail} onChange={this.handleChange}/>
                                </div>
                                <div className="col-md-6">
                                    <br></br>
                                    <label htmlFor="phoneInputRec">Telefon: </label>
                                    <input id="phoneInputRec" type="text" className="form-control" placeholder="123456789" name="receiverPhoneNumber" value={receiverPhoneNumber} onChange={this.handleChange}/>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <button onClick={this.handleClick} id="sendButton" type="button" className="btn btn-primary btn-lg btn-block">Nadaj paczkę</button>
            </div>
        );
    }
}

export default Send