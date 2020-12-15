import React from "react"
import "./Baner.css"

function Baner(params) {
    return (
        <div id="baner" class="jumbotron">
            <h2>{params.text}</h2>
        </div>
    )
}

export default Baner