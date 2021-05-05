import React, { Component } from "react";
import "./styles/Details.css";
import Axios from "axios";
import Button from "../inputs/Button";

class Details extends Component {
  constructor(props) {
    super(props);

    // Refs
    this.ref = React.createRef();

    // State Object
    this.state = {
      name: "---",
      nativeName: "---",
      region: "---",
      capital: "---",
      currencies: "---",
      population: "---",
      subRegion: "---",
      topLevelDomain: "---",
      languages: "---",
      borders: "---",
      flag: null,
    };

    // Bindings Methods
  }
  componentDidMount() {
    let name = this.props.match.params.name.toLowerCase();
    let population,
      nativeName,
      region,
      capital,
      currencies,
      subRegion,
      topLevelDomain,
      languages,
      borders,
      flag;
    Axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      let countries = response.data.filter(
        (country) => country.name.toLowerCase() === name
      );
      name = countries[0].name;
      nativeName = countries[0].nativeName;
      region = countries[0].region;
      population = countries[0].population;
      capital = countries[0].capital;
      subRegion = countries[0].subregion;
      topLevelDomain = countries[0].topLevelDomain;
      flag = countries[0].flag;
      currencies = countries[0].currencies
        .map((currency) => {
          return currency.code;
        })
        .toString();
      languages = countries[0].languages
        .map((language) => {
          return language.name;
        })
        .toString();
      borders = countries[0].borders.map((border) => {
          return <label onClick={(event) => {
            let value = event.currentTarget.innerText;
            let count = response.data.filter((country) => country.alpha3Code === value);
            window.location.href = `/details/${count[0].name.toLowerCase()}`;
          }}>{border}</label>
      });
      this.setState({ name: name });
      this.setState({ nativeName: nativeName });
      this.setState({ region: region });
      this.setState({ capital: capital });
      this.setState({ currencies: currencies });
      this.setState({ population: population });
      this.setState({ subRegion: subRegion });
      this.setState({ topLevelDomain: topLevelDomain });
      this.setState({ languages: languages });
      this.setState({ borders: borders });
      this.setState({ flag: flag });
    });
  }
  render() {
    return (
      <div id="details" style={this.props.style} ref={this.ref}>
        <div id="details-controls">
          <Button
            text="Back"
            onClick={() => {
              window.location.href = "/";
            }}
            iconClass="fa fa-arrow-left"
          />
        </div>
        <div id="details-body">
          <div id="details-flag" style={{backgroundImage: `url(${this.state.flag})`}}></div>
          <div id="details-inner">
            <div id="details-name">{this.state.name}</div>
            <div id="details-descriptions">
              <p>
                Native Name: <span>{this.state.nativeName}</span>
              </p>
              <p>
                Population: <span>{this.state.population}</span>
              </p>
              <p>
                Region: <span>{this.state.region}</span>
              </p>
              <p>
                Sub Region: <span>{this.state.subRegion}</span>
              </p>
              <p>
                Capital: <span>{this.state.capital}</span>
              </p>
              <p>
                Top Level Domain: <span>{this.state.topLevelDomain}</span>
              </p>
              <p>
                Currencies: <span>{this.state.currencies}</span>
              </p>
              <p>
                Languages: <span>{this.state.languages}</span>
              </p>
            </div>
            <div id="details-borders">
              Border Countries: {this.state.borders}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Details;
