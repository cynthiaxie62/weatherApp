import React from "react";
import { Form, Button, Container, Col, Row, Figure } from "react-bootstrap";
import _ from "lodash";
import "./search.css";

const apiKey = "b9231a95c21a4fccf0254438d3087f8c";

class SearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      inState: "",
      zipcode: "",
      country: "us",
      response: null,
      units: "imperial",
      valid: true, //checks that user input is valid
    };
  }

  //API calls to OpenWeather
  async getWeather() {
    if (!_.isEmpty(this.state.city) && !_.isEmpty(this.state.inState)) {
      await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${this.state.city},${this.state.inState}&units=${this.state.units}&appid=${apiKey}`
      )
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          this.setState({ response: response });
          this.setState({ valid: true });
        })
        .catch((err) => {
          console.log("Error", err);
          this.setState({ valid: false });
        });
    } else if (
      !_.isEmpty(this.state.zipcode)
      // &&
      // _.isNumeric(this.state.zipcode) //TODO: should check that zipcode input is a number for valid input
    ) {
      await fetch(
        `http://api.openweathermap.org/data/2.5/weather?zip=${this.state.zipcode},${this.state.country}&units=${this.state.units}&appid=${apiKey}`
      )
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          this.setState({ response: response });
          this.setState({ valid: true });
        })
        .catch((err) => {
          console.log("Error", err);
          this.setState({ valid: false });
        });
    } else {
      //TODO: display error message, prompt user for correct input
    }
  }

  render() {
    return (
      <Container className="justify-content-center">
        <center>
          <br></br>
          <h1 className="page-header ">Weather App</h1>
        </center>
        <Row className="justify-content-center">
          <div>
            <Form>
              <Row>
                {/* City Input */}
                <Form.Group className="mx-3" controlId="city">
                  <Form.Label>Enter City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="City"
                    value={this.state.city}
                    onChange={(e) => this.setState({ city: e.target.value })}
                  />
                </Form.Group>
                {/* State Selector */}
                <Form.Group className="mx-3" controlId="state">
                  <Form.Label>Select State</Form.Label>
                  <Form.Control
                    as="select"
                    value={this.state.inState}
                    onChange={(e) => this.setState({ inState: e.target.value })}
                  >
                    <option>Alabama</option>
                    <option>Alaska</option>
                    <option>Arizona</option>
                    <option>Arkansas</option>
                    <option>California</option>
                    <option>Colorado</option>
                    <option>Connecticut</option>
                    <option>Delaware</option>
                    <option>Florida</option>
                    <option>Georgia</option>
                    <option>Hawaii</option>
                    <option>Idaho</option>
                    <option>Illinois</option>
                    <option>Indiana</option>
                    <option>Iowa</option>
                    <option>Kansas</option>
                    <option>Kentucky</option>
                    <option>Louisiana</option>
                    <option>Maine</option>
                    <option>Maryland</option>
                    <option>Massachusetts</option>
                    <option>Michigan</option>
                    <option>Minnesota</option>
                    <option>Mississippi</option>
                    <option>Missouri</option>
                    <option>Montana</option>
                    <option>Nebraska</option>
                    <option>Nevada</option>
                    <option>New Hampshire</option>
                    <option>New Jersey</option>
                    <option>New Mexico</option>
                    <option>New York</option>
                    <option>North Carolina</option>
                    <option>North Dakota</option>
                    <option>Ohio</option>
                    <option>Oklahoma</option>
                    <option>Oregon</option>
                    <option>Pennsylvania</option>
                    <option>Rhode Island</option>
                    <option>South Carolina</option>
                    <option>South Dakota</option>
                    <option>Tennessee</option>
                    <option>Texas</option>
                    <option>Utah</option>
                    <option>Vermont</option>
                    <option>Virginia</option>
                    <option>Washington</option>
                    <option>West Virginia</option>
                    <option>Wisconsin</option>
                    <option>Wyoming</option>
                  </Form.Control>
                </Form.Group>
                <h5 className="mt-4 vertical-align">OR</h5>
                {/* Zip Code Input */}
                <Form.Group className="mx-3" controlId="zipcode">
                  <Form.Label>Enter Zip Code</Form.Label>
                  <Form.Control
                    type="text"
                    maxLength="5"
                    pattern="(\d{5}([\-]\d{4})?)"
                    placeholder="Zip Code"
                    value={this.state.zipcode}
                    onChange={(e) => this.setState({ zipcode: e.target.value })}
                  />
                </Form.Group>
              </Row>
              {/* Units Selector */}
              <Row className="mb-3 justify-content-center">
                <div className="mx-3">
                  <Form.Check
                    type="radio"
                    label="Fahrenheit"
                    checked={this.state.units === "imperial"}
                    value="imperial"
                    onChange={(e) => this.setState({ units: e.target.value })}
                  />
                </div>
                <div className="mx-3">
                  <Form.Check
                    type="radio"
                    label="Celsius"
                    checked={this.state.units === "metric"}
                    value="metric"
                    onChange={(e) => this.setState({ units: e.target.value })}
                  />
                </div>
              </Row>
              {/* Search Button */}
              <center>
                <Button variant="primary" onClick={() => this.getWeather()}>
                  Search
                </Button>
              </center>
            </Form>
            {/* Search Results */}
            <Row className="mt-3 justify-content-center">
              <center>
                {!_.isNull(
                  this.state.response &&
                    this.state.valid &&
                    !_.isUndefined(this.state.response)
                ) ? (
                  <div>
                    <div className="result-text temp-font icon-row">
                      {" "}
                      <Figure>
                        <Figure.Image
                          width={200}
                          height={200}
                          src={`http://openweathermap.org/img/wn/${this.state.response.weather[0].icon}@2x.png`}
                        />
                      </Figure>
                      {Math.round(this.state.response.main.temp)}&#176;
                    </div>
                    <h2 className="result-text">{this.state.response.name}</h2>
                    <h4 className="result-text description">
                      {this.state.response.weather[0].description}
                    </h4>
                  </div>
                ) : null}
              </center>
            </Row>
          </div>
        </Row>
      </Container>
    );
  }
}

export default SearchContainer;
