import React, { Component } from 'react';
import Greeting from './components/Greeting'
import {Container, Row, Col, Form, FormGroup, Label, Input, Button, ListGroup, ListGroupItem} from 'reactstrap'
import moment from 'moment'
import LineChart from './components/LineChart'
import './App.css';

// componente funcional
class App extends Component  {
  constructor(){
    super();
    this.state = {
      greeting: 'Estadisticas covid19',
      countries: [],
      filteredCountries: [],
      countrySlug: '',
      countryName: '',
      isListHidden: true,
      startDate: '',
      endDate: '',
      countryData:[]
    }
    // revisar nuevamente este punto para registrar en el componente
    this.changeCountryHandler = this.changeCountryHandler.bind(this)
    this.selectCountryHandler = this.selectCountryHandler.bind(this)
    this.changeDateHandler = this.changeDateHandler.bind(this)
    this.getCountryData = this.getCountryData.bind(this)
  }

  componentDidMount(){
    //console.log('Hola Coders')
    fetch('https://api.covid19api.com/countries').then(response => {
      response.json().then( json => {
        this.setState({countries : json })
      })
    })
  }

  changeCountryHandler(event){
    let value = event.target.value
    //console.log(value)

    let filteredCountries = this.state.countries.filter(country => {
      return country.Slug.includes(value)
    })

    //console.log(filteredCountries)

    this.setState({filteredCountries, isListHidden: false})
  }

  selectCountryHandler(event) {
    // dataset permite acceder a todos los values de mi html data-'', y accedo con cammelcase desde js sin el data
    let countryName = event.target.dataset.countryName
    let countrySlug = event.target.dataset.countrySlug 
    this.setState({countryName, countrySlug, isListHidden: true})
  }

  changeDateHandler(event){
    let key = event.target.name/* startDate or endDate */
    let value = moment(event.target.value).toISOString() 
    this.setState({ [key]: value})
  }

  getCountryData() {
    fetch(`https://api.covid19api.com/country/${this.state.countrySlug}?from=${this.state.startDate}&to=${this.state.endDate}`).then(
      response => {
        response.json().then( json => {
          //console.log('mi generar boton:', json)
          this.setState({countryData: json})
        })
      }
    )
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <Container fluid>
            <Row>
                <Col xs="12"><Greeting greeting={this.state.greeting}/></Col>
                <Col xs="12" md="4">
                  <Form className="p-3 bg-light shadow rounded form">
                    <FormGroup>
                      <Label>País</Label>
                      <Input 
                        type="text"
                        name="country"
                        placeholder="Nombre del país"
                        onChange={this.changeCountryHandler}
                        autoComplete='off'
                      >
                      </Input>
                      <ListGroup
                      className="shadow mt-2 over-list"
                      >
                        {
                          this.state.filteredCountries.map((country, index) => {
                            // parentesis para mas de una linea en el return
                          return   (
                            <ListGroupItem
                              // dinamicamente ocultamos la lista en el cambio de estado
                              className={` item-list-full ${this.state.isListHidden ? 'd-none' : ''}`} 
                              key={index} 
                              data-country-name={country.Country} 
                              data-country-slug={country.Slug}
                              onClick = {this.selectCountryHandler}
                              >{country.Country}
                            </ListGroupItem>)
                          })
                        }    
                      </ListGroup>
                    </FormGroup>
                    <FormGroup>
                      <Label>Fecha de inicio</Label>
                      <Input 
                        type="date"
                        name="startDate"
                        placeholder="Fecha de inicio"
                        onChange = {this.changeDateHandler}
                        >
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label>Fecha de término</Label>
                      <Input 
                        type="date"
                        name="endDate"
                        placeholder="Fecha de término"
                        onChange = {this.changeDateHandler}
                        >
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Button 
                      className="btn btn-primary btn-block"
                      onClick={this.getCountryData}
                      >
                          Generar Gráfica
                      </Button>
                    </FormGroup>
                  </Form>
                </Col>
                <Col xs="12" md="8">
                  <LineChart
                  countryData = {this.state.countryData}
                  />
                </Col>
            </Row>
          </Container>
        </header>
      </div>
    );
  } 
}

export default App;
