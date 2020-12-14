import React from "react"
import "./Prices.css"
import {Accordion, Card, CardGroup, Button, ListGroup, Table} from 'react-bootstrap'
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';



class Prices extends React.Component {

    render() { 
        return (
            <div id="prices" className="container">
                <div className="row">
                    <div id="pricesTytul" className="col-md-12">
                        <h1>📦 Cennik</h1>
                    </div>
                    <Accordion style={
                      {
                        "width":"100rem",
                        "text-align" : "center"
                      }} >
                      <Card>
                        <Card.Header style={{}}>
                          <Accordion.Toggle as={Button} variant="link" eventKey="0" 
                          style={
                          {
                            "font-size": "20px",
                            "text-decoration": "none",

                          }} >
                            Rozmiar paczki
                          </Accordion.Toggle>
                        </Card.Header>
                          <Accordion.Collapse eventKey="0">
                            <CardGroup style ={{}}>
                              <Card>
                                {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
                                <Card.Body>
                                  <Card.Title>S</Card.Title>
                                  <Card.Text>
                                    Maksymalne wymiary: <br></br> 80 x 380 x 640 mm <br></br> 
                                    Minimalna wysokość: <br></br>1 mm<br></br> 
                                    Maksymalna waga: <br></br>25 kg
                                  </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                  {/* <small className="text-muted">Last updated 3 mins ago</small> */}
                                  Cena od: 8,99zł brutto
                                </Card.Footer>
                              </Card>
                              <Card>
                                {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
                                <Card.Body>
                                  <Card.Title>M</Card.Title>
                                  <Card.Text>
                                    Maksymalne wymiary: <br></br> 190 x 380 x 640 mm <br></br> 
                                    Minimalna wysokość: <br></br>81 mm<br></br> 
                                    Maksymalna waga: <br></br>25 kg
                                  </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                  {/* <small className="text-muted">Last updated 3 mins ago</small> */}
                                  Cena od: 11,99zł brutto
                                </Card.Footer>
                              </Card>
                              <Card>
                                {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
                                <Card.Body>
                                  <Card.Title>L</Card.Title>
                                  <Card.Text>
                                    Maksymalne wymiary: <br></br> 290 x 380 x 640 mm <br></br> 
                                    Minimalna wysokość: <br></br>131 mm<br></br> 
                                    Maksymalna waga: <br></br>25 kg
                                  </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                  {/* <small className="text-muted">Last updated 3 mins ago</small> */}
                                  Cena od: 12,99zł brutto
                                </Card.Footer>
                              </Card>
                              <Card>
                                {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
                                <Card.Body>
                                  <Card.Title>XL</Card.Title>
                                  <Card.Text>
                                    Maksymalne wymiary: <br></br> 500 x 500 x 640 mm <br></br> 
                                    Minimalna wysokość: <br></br>191 mm<br></br> 
                                    Maksymalna waga: <br></br>25 kg
                                  </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                  {/* <small className="text-muted">Last updated 3 mins ago</small> */}
                                  Cena od: 19,99zł brutto
                                </Card.Footer>
                              </Card>
                            </CardGroup>
                          </Accordion.Collapse>
                      </Card>
                    <Card>
                      <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="1" style={
                          {
                            "font-size": "20px",
                            "text-decoration": "none",

                          }} >
                          Ubezpieczenie
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="1">
                      <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>Rodzaj ubezpieczenia</th>
                              <th>Cena</th>
                              <th>Opis</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Ubezpieczenie przesyłki do 5 000 zł</td>
                              <td>1,85 zł</td>
                              <td>Usługa realizowana dla przesyłek kurierskich
                                  zawierających towary handlowe lub przedmioty wartościowe 
                                  o maksymalnej wartości 5 000 zł brutto.</td>
                            </tr>
                            <tr>
                              <td>Ubezpieczenie przesyłki do 10 000 zł</td>
                              <td>2,50 zł</td>
                              <td>Usługa realizowana dla przesyłek kurierskich
                                  zawierających towary handlowe lub przedmioty wartościowe 
                                  o maksymalnej wartości 10 000 zł brutto.</td>
                            </tr>
                            <tr>
                              <td>Ubezpieczenie przesyłki do 15 000 zł</td>
                              <td>3,00 zł</td>
                              <td>Usługa realizowana dla przesyłek kurierskich
                                  zawierających towary handlowe lub przedmioty wartościowe 
                                  o maksymalnej wartości 15 000 zł brutto.</td>
                            </tr>
                            <tr>
                              <td>Ubezpieczenie przesyłki do 20 000 zł</td>
                              <td>4,00 zł</td>
                              <td>Usługa realizowana dla przesyłek kurierskich
                                  zawierających towary handlowe lub przedmioty wartościowe 
                                  o maksymalnej wartości 20 000 zł brutto.</td>
                            </tr>
                          </tbody>
                        </Table>
                      </Accordion.Collapse>
                    </Card>
                    <Card>
                      <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="2" style={
                          {
                            "font-size": "20px",
                            "text-decoration": "none",

                          }}>
                          Dopłaty
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="2">
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>Rodzaj dopłaty</th>
                              <th>Cena brutto</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Weryfikacja wagi i wymiarów Przesyłki</td>
                              <td>12,30 zł</td>
                            </tr>
                            <tr>
                              <td>Opłata za traktowanie przesyłki, jako "ponadgabarytowej"</td>
                              <td>18,45 zł</td>
                            </tr>
                            <tr>
                              <td>Opłata za przesyłkę ponad gabaryt 500x500x800 mm</td>
                              <td>246 zł</td>
                            </tr>
                            <tr>
                              <td>Opłata za przesyłkę ponad wagę 30 kg</td>
                              <td>246 zł</td>
                            </tr>
                          </tbody>
                        </Table>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>

                </div>
            </div>
        );
    }
}

export default Prices