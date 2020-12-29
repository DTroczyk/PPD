import React from "react"
import "./Send.css"
import services from '../../../services/httpClient'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import { withRouter } from "react-router-dom";


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
            .then(response =>{
                this.setState({success: true, parcelId: response.data})     
            })
            .catch(error => {
                this.setState({success: false})
                this.setState({message: error})
            })

        //Dodać komunikat, że paczka została wysłana pomyślnie. I żeby był przycisk który
        //umożliwi pobranie etykiety.
    }

    handleClickTracking = (e) => {
        e.preventDefault()
        const {parcelId} = this.state;
        this.props.history.push("/tracking/" + parcelId)
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
                submitted,
                parcelId
            } = this.state;

        let reMail = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        let rePhone = new RegExp(/^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,6}$/im);
        let reCode = new RegExp(/^[0-9]{2}\\-[0-9]{3}/);

        return (
            
                <div id="send" className="container">
                {!success &&
                    <>
                    <Alert variant="success">
                        <Alert.Heading>Twoja paczka została nadana</Alert.Heading>
                        <p>
                            W najbliższym czasie Twoja paczka zostanie odebrana przez kuriera. Prosimy o przygotowanie paczki do wysyłki
                            pamiętając o standardach obowiązujących zgodnie z wybranym rozmiarem. Zabezpiecz swój towar oraz naklej na 
                            paczkę etykietę, która możesz pobrać poniżej. W razie braku możliwości wydrukowania etykiety, kurier zrobi 
                            to za Ciebie. Dziękujemy za skorzystanie z usług naszej firmy.
                        </p>
                        <hr />
                        <p className="mb-0">
                            <Button variant="danger" size="lg" block>Pobierz etykiete</Button>
                            <Button onClick={this.handleClickTracking} variant="warning" size="lg" block>Śledź przesyłkę</Button>
                        </p>
                    </Alert>
                    </>
                }
                {success &&
                    <>
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
                                            {submitted && !senderPostalCode && !reCode.test(senderPostalCode) &&
                                                <div className="help-block alert alert-danger">Wprowadź prawidłowy kod pocztowy nadawcy!</div>
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
                                            {submitted && !senderEmail && !reMail.test(senderEmail) &&
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
                                            {submitted && !senderPhoneNumber && !rePhone.test(senderPhoneNumber) &&
                                                <div className="help-block alert alert-danger">Wprowadź prawidłowy numer telefonu nadawcy!</div>
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
                                            {submitted && !receiverPostalCode && !rePhone.test(receiverPostalCode) &&
                                                <div className="help-block alert alert-danger">Wprowadź prawidłowy kod pocztowy odbiorcy!</div>
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
                                            {submitted && !receiverEmail && !reMail.test(receiverEmail) &&
                                                <div className="help-block alert alert-danger">Wprowadź prawidłowy e-mail!</div>
                                            }
                                        </div>
                                        <div className="col-md-6">
                                            <br></br>
                                            <label htmlFor="phoneInputRec">Telefon: </label>
                                            <input id="phoneInputRec" type="text" className="form-control" placeholder="123456789" name="receiverPhoneNumber" value={receiverPhoneNumber} onChange={this.handleChange}/>
                                            {submitted && !receiverPhoneNumber && !rePhone.test(receiverPhoneNumber) &&
                                                <div className="help-block alert alert-danger">Wprowadź prawidłowy numer telefonu odbiorcy!</div>
                                            }
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <button onClick={this.handleClick} id="sendButton" type="button" className="btn btn-success btn-lg btn-block">Nadaj paczkę</button>
                        
                    </>
                 }
                </div>
        );
    }
}

export default withRouter(Send);