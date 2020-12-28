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
        senderLogin: null,
        receiverName: '',
        receiverCity: '',
        receiverStreet: '',
        receiverPostalCode: '',
        receiverHouseNumber: '',
        receiverEmail: '',
        receiverPhoneNumber: '',
        submitted: false,
        typeParcel: 'S',
        typeParcels : [],
        success: '',
        message: ''
    }

    componentDidMount() {
        services.GetParcelsTypes()
            .then(response => {
                this.setState({
                    typeParcels: response.data.sort((a,b)=>(a.price > b.price) ? 1:-1)
                })
            })
        if(this.props.isLoggedIn)
        {
            services.GetSparrow()
                .then(response => {
                    this.setState({
                        senderEmail: response.data.email,
                        senderName: response.data.firstName +" "+ response.data.lastName,
                        senderLogin: response.data.login
                    })
                })
        }
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
        const{  senderName,
            senderCity,
            senderStreet,
            senderPostalCode,
            senderHouseNumber,
            senderEmail,
            senderPhoneNumber,
            senderLogin,
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
            senderLogin,
            receiverName,
            receiverCity,
            receiverStreet,
            receiverPostalCode,
            receiverHouseNumber,
            receiverEmail,
            receiverPhoneNumber
        }
        services.SendParcel(parcel)
            .then(response => {
                if(response.data==="")
                {
                    this.setState({success: true})
                }
                else
                {
                    this.setState({success: false})
                    this.setState({message: response.data})
                }      
            })
            .catch(error => {
                this.setState({success: false})
                this.setState({message: error})
            })

        //Dodać komunikat, że paczka została wysłana pomyślnie. I żeby był przycisk który
        //umożliwi pobranie etykiety.
    }

    // changeSelect = (event) => {
    //     this.setState({currentPigeon: tmpPigeon.firstName+" "+tmpPigeon.lastName});
    // }

    render() { 
        
        const typeParcels = this.state.typeParcels.sort().map(o => <option key={o.name}>{o.name}</option>)
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
                typeParcel,
                success,
                message, 
                submitted
            } = this.state;

        
        let remail = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        
        //let reCode = new RegExp(/^([0-9]{2})(-[0-9]{3})?$/);
        //let remail = new RegExp(/^([\w.-]+)@([\w-]+)((\.(\w){2,3})+)$/);
        //let rephone = new RegExp(/^(?<!\w)((?(+|00)?48)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)/);

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
                                    {submitted && !senderName &&
                                        <div className="help-block alert alert-danger">Wprowadź imie i nazwisko nadawcy!</div>
                                    }
                                </div>
                            </div>
                        </form>
                        <div className="col-md-12 adresDiv">
                            <br></br>
                            <label htmlFor="adresInput">Adres: </label>
                            <input type="text" className="form-control" id="adresInputSen" placeholder="Podaj nazwe ulicy nadawcy" name="senderStreet" value={senderStreet} onChange={this.handleChange}/>
                            <input type="text" className="form-control" id="numerDomuInputSen" placeholder="Numer mieszkania, apartamentu, pomieszczenia, budynkui itp." name="senderHouseNumber" value={senderHouseNumber} onChange={this.handleChange}/>
                            {submitted && !senderStreet && !senderHouseNumber &&
                                <div className="help-block alert alert-danger">Wprowadź adres nadawcy!</div>
                            }
                        </div>
                        <form name="form" >
                            <div className="form-row">
                                <div className="col-md-4">
                                    <br></br>
                                    <label htmlFor="zipInputSen">Kod pocztowy: </label>
                                    <input type="text" className="form-control" id="zipInputSen" placeholder="00-000" name="senderPostalCode" value={senderPostalCode} onChange={this.handleChange}/>
                                    {submitted && !senderPostalCode &&
                                        <div className="help-block alert alert-danger">Wprowadź prawdiłowy kod pocztowy nadawcy!</div>
                                    }
                                </div>
                                <div className="col-md-8">
                                    <br></br>
                                    <label htmlFor="cityInputSen">Miasto: </label>
                                    <input type="text" className="form-control" id="cityInputSen" placeholder="Wpisz miasto" name="senderCity" value={senderCity} onChange={this.handleChange} />
                                    {submitted && !senderCity &&
                                        <div className="help-block alert alert-danger">Wprowadź miasto nadawcy!</div>
                                    }
                                </div>
                            </div>
                        </form>
                        <form name="form" >
                            <div className="form-row">
                                <div className="col-md-6">
                                    <br></br>
                                    <label htmlFor="emailInputSen">Adres e-mail: </label>
                                    <input type="email" className="form-control" id="emailInputSen" placeholder="mail@siec.pl" name="senderEmail" value={senderEmail} onChange={this.handleChange}/>
                                    {submitted && !senderEmail && !remail.test(senderEmail) &&
                                        <div className="help-block alert alert-danger">Wprowadź prawidłowy e-mail!</div>
                                    }
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
                                    {submitted && !senderPhoneNumber &&
                                        <div className="help-block alert alert-danger">Wprowadź prawdidłowy numer telefonu nadawcy!</div>
                                    }
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
                                    {submitted && !receiverName &&
                                        <div className="help-block alert alert-danger">Wprowadź imie i nazwisko odbiorcy!</div>
                                    }
                                </div>
                            </div>
                        </form>
                        <div className="col-md-12 adresDiv">
                            <br></br>
                            <label htmlFor="adresInput">Adres: </label>
                            <input type="text" className="form-control" id="adresInputRec" placeholder="Podaj nazwe ulicy odbiorcy" name="receiverStreet" value={receiverStreet} onChange={this.handleChange}/>
                            <input type="text" className="form-control" id="numerDomuInputRec" placeholder="Numer mieszkania, apartamentu, pomieszczenia, budynkui itp." name="receiverHouseNumber" value={receiverHouseNumber} onChange={this.handleChange}/>
                            {submitted && !receiverStreet && !receiverHouseNumber &&
                                <div className="help-block alert alert-danger">Wprowadź adres odbiorcy!</div>
                            }
                        </div>
                        <form name="form" >
                            <div className="form-row">
                                <div className="col-md-4">
                                    <br></br>
                                    <label htmlFor="zipInputRec">Kod pocztowy: </label>
                                    <input type="text" className="form-control" id="zipInputRec" placeholder="00-000" name="receiverPostalCode" value={receiverPostalCode} onChange={this.handleChange}/>
                                    {submitted && !receiverPostalCode &&
                                        <div className="help-block alert alert-danger">Wprowadź prawdiłowy kod pocztowy odbiorcy!</div>
                                    }
                                </div>
                                <div className="col-md-8">
                                    <br></br>
                                    <label htmlFor="cityInputRec">Miasto: </label>
                                    <input type="text" className="form-control" id="cityInputRec" placeholder="Wpisz miasto" name="receiverCity" value={receiverCity} onChange={this.handleChange}/>
                                    {submitted && !receiverCity &&
                                        <div className="help-block alert alert-danger">Wprowadź miasto odbiorcy!</div>
                                    }
                                </div>
                            </div>
                        </form>
                        <form name="form" >
                            <div className="form-row">
                                <div className="col-md-6">
                                    <br></br>
                                    <label htmlFor="emailInputRec">Adres e-mail: </label>
                                    <input type="email" className="form-control" id="emailInputRec" placeholder="mail@siec.pl" name="receiverEmail" value={receiverEmail} onChange={this.handleChange}/>
                                    {submitted && !receiverEmail && !remail.test(senderEmail) &&
                                        <div className="help-block alert alert-danger">Wprowadź prawidłowy e-mail!</div>
                                    }
                                </div>
                                <div className="col-md-6">
                                    <br></br>
                                    <label htmlFor="phoneInputRec">Telefon: </label>
                                    <input id="phoneInputRec" type="text" className="form-control" placeholder="123456789" name="receiverPhoneNumber" value={receiverPhoneNumber} onChange={this.handleChange}/>
                                    {submitted && !receiverPhoneNumber &&
                                        <div className="help-block alert alert-danger">Wprowadź prawdidłowy numer telefonu odbiorcy!</div>
                                    }
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