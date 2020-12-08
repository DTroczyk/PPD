import React from "react"
import "./Send.css"

class Send extends React.Component {

    render() { 
        return (
            <div>

                <div class="row">
                    <div id="nadawca" class="col-md-6 " >
                        <h2 id="tytul">Dane nadawcy: </h2>
                        <form name="form">
                            <div class="form-row">
                                <div class="col-md-6">
                                    <label for="nameInputSen">Imie: </label>
                                    <input type="text" class="form-control" id="nameInputSen" placeholder="Wpisz imię nadawcy"/>
                                </div>
                                <div class="col-md-6">
                                    <label for="surnameInputSen">Nazwisko: </label>
                                    <input type="text" class="form-control" id="surnameInputSen" placeholder="Wpisz nazwisko nadawcy"/>
                                </div>
                            </div>
                        </form>
                        <div class="col-md-12">
                            <br></br>
                            <label for="adresInput">Adres: </label>
                            <input type="text" class="form-control" id="adresInputSen" placeholder="Podaj adres nadawcy"/>
                            <input type="text" class="form-control" id="adresInputSen" placeholder="Mieszkanie, apartament, pomieszczenie, budynek, piętro itp."/>
                        </div>
                        <form name="form">
                            <div class="form-row">
                                <div class="col-md-4">
                                    <br></br>
                                    <label for="zipInputSen">Kod pocztowy: </label>
                                    <input type="text" class="form-control" id="zipInputSen" placeholder="00-000"/>
                                </div>
                                <div class="col-md-8">
                                    <br></br>
                                    <label for="cityInputSen">Miasto: </label>
                                    <input type="text" class="form-control" id="cityInputSen" placeholder="Wpisz miasto"/>
                                </div>
                            </div>
                        </form>
                        <form name="form">
                            <div class="form-row">
                                <div class="col-md-6">
                                    <br></br>
                                    <label for="emailInputSen">Adres e-mail: </label>
                                    <input type="text" class="form-control" id="emailInputSen" placeholder="mail@siec.pl"/>
                                </div>
                                <div class="col-md-6">
                                    <br></br>
                                    <label for="phoneInputSen">Telefon: </label>
                                    <input id="phoneInputSen" type="text" class="form-control" placeholder="123456789"/>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div id="odbiorca" class="col-md-6 ">
                    <h2 id="tytul">Dane odbiorcy: </h2>
                        <form name="form">
                            <div class="form-row">
                                <div class="col-md-6">
                                    <label for="nameInputRec">Imie: </label>
                                    <input type="text" class="form-control" id="nameInputRec" placeholder="Wpisz imię nadawcy"/>
                                </div>
                                <div class="col-md-6">
                                    <label for="surnameInputRec">Nazwisko: </label>
                                    <input type="text" class="form-control" id="surnameInputRec" placeholder="Wpisz nazwisko nadawcy"/>
                                </div>
                            </div>
                        </form>
                        <div class="col-md-12">
                            <br></br>
                            <label for="adresInput">Adres: </label>
                            <input type="text" class="form-control" id="adresInputRec" placeholder="Podaj adres nadawcy"/>
                            <input type="text" class="form-control" id="adresInputRec" placeholder="Mieszkanie, apartament, pomieszczenie, budynek, piętro itp."/>
                        </div>
                        <form name="form">
                            <div class="form-row">
                                <div class="col-md-4">
                                    <br></br>
                                    <label for="zipInputRec">Kod pocztowy: </label>
                                    <input type="text" class="form-control" id="zipInputRec" placeholder="00-000"/>
                                </div>
                                <div class="col-md-8">
                                    <br></br>
                                    <label for="cityInputRec">Miasto: </label>
                                    <input type="text" class="form-control" id="cityInputRec" placeholder="Wpisz miasto"/>
                                </div>
                            </div>
                        </form>
                        <form name="form">
                            <div class="form-row">
                                <div class="col-md-6">
                                    <br></br>
                                    <label for="emailInputRec">Adres e-mail: </label>
                                    <input type="text" class="form-control" id="emailInputRec" placeholder="mail@siec.pl"/>
                                </div>
                                <div class="col-md-6">
                                    <br></br>
                                    <label for="phoneInputRec">Telefon: </label>
                                    <input id="phoneInputRec" type="text" class="form-control" placeholder="123456789"/>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <button type="button" class="btn btn-primary btn-lg btn-block">Nadaj paczkę</button>
            </div>
        );
    }
}

export default Send