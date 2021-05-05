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
    this.flagLoaded = this.flagLoaded.bind(this);
    this.openFlag = this.openFlag.bind(this);
    this.closeFlag = this.closeFlag.bind(this);
  }
  openFlag(event)
  {
    let target = event.currentTarget;
    let parent = target.parentElement;
    parent.setAttribute("id", "details-flag-open");
  }
  closeFlag(event)
  {
    let target = event.target;
    if (target.getAttribute("id") === "details-flag-open")
    {      
      target.setAttribute("id", "details-flag");
    }      
  }
  flagLoaded(event) {
    let target = event.currentTarget.parentElement;
    let loader = target.querySelector("#details-flag-loader-container");
    setTimeout(() => {
      loader.classList.add("details-flag-loader-container-none");
    }, 500);
  }
  componentDidMount() {        
    let params = this.props.match.params;        
    let name = params.name.toLowerCase();
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
    document.title = "Where in the world? | " + name;
    Axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      let countries = response.data.filter(
        (country) => country.name.toLowerCase() === name
      );
      if (countries[0] === undefined) {
        window.location.replace("/");
        return;
      }
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
        border = response.data.filter(c => c.alpha3Code === border)[0].name;        
        return (
          <label
            onClick={(event) => {
              let value = event.currentTarget.innerText;
              let count = response.data.filter(
                (country) => country.name === value
              );
              window.location.href = `/details/${count[0].name.toLowerCase()}`;
            }}
          >
            {border}
          </label>
        );
      });
      if (borders.length === 0) borders = <span>&nbsp;No Borders</span>;
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
              window.history.back();
            }}
            iconClass="fa fa-arrow-left"
          />
        </div>
        <div id="details-body">
          <div id="details-flag" onClick={this.closeFlag}>
            <img alt="" src={this.state.flag} onLoad={this.flagLoaded} onClick={this.openFlag}/>
            <div id="details-flag-loader-container">
              <div id="details-flag-loader"></div>
            </div>
          </div>
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
