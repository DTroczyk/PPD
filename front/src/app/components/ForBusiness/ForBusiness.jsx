import React from "react"
import "./ForBusiness.css"

function ForBusiness() {
    return (  
        <div id="business" class="container">
            <div class="row">
                <div id="element" class="col-md-12">
                    <h1>Dla firm</h1>
                    <h2>Posiadamy zachęcające oferty dla firm.</h2>
                </div>
            </div>

            <div id="business-row" class="row">
                <div class="col-md-4">
                    <div id="offer">
                        <h2 id="offer-name">Micro Firma 150</h2>
                        <p id="pgh">Abonament dla początkujących przedsiębiorców z możliwością rezygnacji bez konsekwencji do 3 miesięcy.</p>
                        <p id="pgh">Dla wysyłających średnio 10 – 20 paczek miesięcznie</p>
                        <button id="offerButton" type="button" class="btn btn-primary btn-lg btn-block">Sprawdź</button>
                    </div>
                </div>
                <div class="col-md-4">
                    <div id="offer">
                        <h2 id="offer-name">Mini Firma 300</h2>
                        <p id="pgh">Abonament dedykowany przedsiębiorcom, którzy stawiają pierwsze kroki w e‑commerce.</p>
                        <p id="pgh">Dla wysyłających średnio 20 – 50 paczek miesięcznie</p>
                        <button id="offerButton" type="button" class="btn btn-primary btn-lg btn-block">Sprawdź</button>
                    </div>
                </div>
                <div class="col-md-4">
                    <div id="offer">
                        <h2 id="offer-name">Midi Firma 600</h2>
                        <p id="pgh">Abonament dedykowany przedsiębiorcom, którzy już rozwijają swoją działalność e‑commerce.</p>
                        <p id="pgh">Dla wysyłających średnio 50 – 100 paczek miesięcznie</p>
                        <button id="offerButton" type="button" class="btn btn-primary btn-lg btn-block">Sprawdź</button>
                    </div>
                </div>

                <div class="row">
                    <div id="element" class="col-md-12">
                        <h3>Potrzebujesz indywidualną ofertę abonamentu?</h3>
                        <button id="offerEndButton" type="button" class="btn btn-primary btn-lg btn-block">Skontaktuj się z nami</button>
                        <h3>Zachęcamy do współpracy.</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForBusiness