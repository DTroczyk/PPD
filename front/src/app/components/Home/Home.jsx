import React from "react"
import "./Home.css"
import { Link } from "react-router-dom"


class Home extends React.Component {

    state = {
        link: ""
    }
    changeValue = (v) => {
        this.setState({link: v.target.value});
    }

    render() { 
        return (
            <div id="home" className="container">
                <div className="tracking">
                    <div className="form-group">
                        <label htmlFor="track">Śledź przesyłkę:</label><br></br>
                        <input type="text" className="form-control" id="track" onChange={this.changeValue} placeholder="Wpisz id paczki"/>
                        <Link to={"/tracking/"+this.state.link} className="btn btn-primary mb-2">Śledź</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home