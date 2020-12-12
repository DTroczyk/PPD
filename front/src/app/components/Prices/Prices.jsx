import React from "react"
import "./Prices.css"
import {Accordion, Card, Button} from 'react-bootstrap'
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';



class Prices extends React.Component {

    render() { 
        return (
            <div id="prices" className="container">
                <div className="row">
                    <div id="pricesTytul" className="col-md-12">
                        <h1>Cennik</h1>
                    </div>

                    <Accordion defaultActiveKey="0">
                      <Card>
                        <Card.Header>
                          <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            Click me!
                          </Accordion.Toggle>
                        </Card.Header>
                          <Accordion.Collapse eventKey="0">
                            <Card.Body>Hello! I'm the body</Card.Body>
                          </Accordion.Collapse>
                      </Card>
                    <Card>
                      <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="1">
                          Click me!
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="1">
                        <Card.Body>Hello! I'm another body</Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>

                </div>
            </div>
        );
    }
}

export default Prices