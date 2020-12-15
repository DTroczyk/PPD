import React from "react"
import "./Stork.css"

function Stork() {
    return (
        <div id="stork-container" class="container">
            <h1>Opcje Managera</h1>
            <hr></hr>
            <div class="row">
                <div class="col-md-6">
                    <div class="box">
                        <h3>Przydziel nowe paczki kurierowi</h3>
                        <hr></hr>
                        <div class="form-group">
                            <label for="parcelSelect">Wybierz paczkę:</label>
                            <select class="form-control" id="parcelSelect">
                                <option>Paczka nr 00000</option>
                                <option>Paczka nr 00001</option>
                                <option>Paczka nr 00002</option>
                                <option>Paczka nr 00003</option>
                                <option>Paczka nr 00004</option>
                            </select>
                            <label for="pigeonSelect">Wybierz kuriera:</label>
                            <select class="form-control" id="pigeonSelect">
                                <option>Jan Kowalski</option>
                                <option>Tomasz Nowak</option>
                                <option>Tomasz Kucharski</option>
                            </select>
                            <button type="submit" class="btn btn-primary mb-2">Przydziel</button>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="box">
                        <h3>Zmień przypisane paczki</h3>
                        <hr></hr>
                        <div class="form-group">
                            <label for="parcelSelect">Wybierz paczkę:</label>
                            <select class="form-control" id="parcelSelect">
                                <option>Paczka nr 00000</option>
                                <option>Paczka nr 00001</option>
                                <option>Paczka nr 00002</option>
                                <option>Paczka nr 00003</option>
                                <option>Paczka nr 00004</option>
                            </select>
                            <label for="pigeonSelect">Wybierz nowego kuriera:</label>
                            <select class="form-control" id="pigeonSelect">
                                <option>Jan Kowalski</option>
                                <option>Tomasz Nowak</option>
                                <option>Tomasz Kucharski</option>
                            </select>
                            <button type="submit" class="btn btn-primary mb-2">Zmień przydział</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stork