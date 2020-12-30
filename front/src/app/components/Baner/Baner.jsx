import React from "react"
import "./Baner.css"
import { Link } from "react-router-dom"
import Button from 'react-bootstrap/Button'

class Baner extends React.Component {
    state = {
        link: ""
    }
    changeValue = (v) => {
        this.setState({link: v.target.value});
    }
    render(){
        return (
            <div id="baner" className="jumbotron">
                <div>
                    <h2>{this.props.text}</h2>
                </div>
                <div id="tracking">
                    <input type="text" className="form-control" id="track" onChange={this.changeValue} placeholder="Wpisz numer paczki"/>
                    <Button id="trackingButton" variant="warning"><Link to={"/tracking/"+this.state.link} rel="noreferrer" className="link">Śledź przesyłkę</Link></Button>
                </div>
            </div>
        )
    }
}

export default Baner