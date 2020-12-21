import React from "react"
import "./Home.css"

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
                    <div class="form-group">
                        <label for="track">Śledź przesyłkę:</label><br></br>
                        <input type="text" class="form-control" id="track" onChange={this.changeValue} placeholder="Wpisz id paczki"/>
                        <a href={"/tracking/"+this.state.link} class="btn btn-primary mb-2">Śledź</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home