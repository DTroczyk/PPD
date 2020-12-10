import React from "react"
import "./Pigeon.css"

function Pigeon() {
    return (  
        <div id="pigeon" class="container">
            <div class="row">
                <div id="element" class="col-md-12">
                    <h1>Pigeon</h1>
                </div>
            </div>

            <div id="pigeon-row" class="row">
                <div class="col-md-6">
                    <div id="column">
                        <h2>Lista Paczek</h2>
                        <ul id="listOfParcel">
                            <li><button class="btn btn-primary">Paczka nr 00000</button></li>
                            <li><button class="btn btn-primary">Paczka nr 00001</button></li>
                            <li><button class="btn btn-primary">Paczka nr 00002</button></li>
                            <li><button class="btn btn-primary">Paczka nr 00003</button></li>
                            <li><button class="btn btn-primary">Paczka nr 00004</button></li>
                            <li><button class="btn btn-primary">Paczka nr 00005</button></li>
                            <li><button class="btn btn-primary">Paczka nr 00006</button></li>
                            <li><button class="btn btn-primary">Paczka nr 00007</button></li>
                            <li><button class="btn btn-primary">Paczka nr 00008</button></li>
                            <li><button class="btn btn-primary">Paczka nr 00009</button></li>
                        </ul>
                    </div>
                </div>
                <div class="col-md-6">
                    <div id="column">
                        <h2>Status paczki</h2>
                        <h3>Aktualny status: Delivered</h3>
                        <ul>
                            <li>Zmieniono status na: WaitingToBePosted</li>
                            <li>Zmieniono status na: InWarehouse</li>
                            <li>Zmieniono status na: InTheRoad</li>
                            <li>Zmieniono status na: Delivered</li>
                        </ul>
                        <button id="stateButton" type="button" class="btn btn-primary btn-lg btn-block">Zmień status</button>
                    </div>
                </div>
            </div>

            <div class="row">
                <div id="element" class="col-md-12">
                    <h1>Koniec</h1>
                </div>
            </div>
        </div>
    )
}

export default Pigeon