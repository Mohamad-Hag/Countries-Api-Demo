import React, { Component } from "react";
import CountryCard from "../cards/CountryCard";
import SearchBox from "../inputs/SearchBox";
import SelectBox from "../inputs/SelectBox";
import "./styles/Home.css";
import Axios from "axios";
import ReactDOM from "react-dom";

class Home extends Component {
  constructor(props) {
    super(props);

    // Refs
    this.ref = React.createRef();
    this.lastCardIndex = 0;

    // State Object
    this.state = {
      countries: null,
      currentCountries: null,
      selectedFilter: null,
    };

    // Bindings Methods
    this.regionSelected = this.regionSelected.bind(this);
  }
  regionSelected(value) {
    if (this.state.selectedFilter === value)
    {
      return;
    }
    let loaders = document.querySelectorAll(
      ".country-card-flag-loader-container"
    );        
    loaders.forEach((loader) => {
      loader.classList.remove("country-card-flag-loader-container-none");
    });    
    setTimeout(() => {}, 500);
    document.querySelector("#loading-sign").style.display = "none";
    this.setState({ selectedFilter: value });
    Axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      let countries_ = response.data;
      let filteredCountries = countries_.filter(
        (country) => country.region === value
      );
      this.setState({ countries: filteredCountries }, () => {
        ReactDOM.render(
          <div id="home-countries">
            {this.state.countries.map((country) => {
              return (
                <CountryCard
                  country={country.name}
                  population={country.population}
                  region={country.region}
                  capital={country.capital}
                  flag={country.flag}
                />
              );
            })}
          </div>,
          document.getElementById("home-countries-container")
        );
      });
    });
  }
  componentDidMount() {
    Axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      this.lastCardIndex = 8;
      let countries = response.data;
      this.setState({ currentCountries: countries });
      let countries_ = countries.slice(0, this.lastCardIndex);
      this.setState({ countries: countries_ }, () => {
        ReactDOM.render(
          <div id="home-countries">
            {this.state.countries.map((country) => {
              return (
                <CountryCard
                  country={country.name}
                  population={country.population}
                  region={country.region}
                  capital={country.capital}
                  flag={country.flag}
                />
              );
            })}
          </div>,
          document.getElementById("home-countries-container")
        );
      });
    });
    window.onscroll = () => {
      if (
        this.checkIfScrolledToBottom() &&
        this.state.selectedFilter === null
      ) {
        setTimeout(() => {
          this.lastCardIndex = this.lastCardIndex + 8;
          let countries = this.state.currentCountries.slice(
            0,
            this.lastCardIndex
          );
          this.setState({ countries: countries }, () => {
            ReactDOM.render(
              <div id="home-countries">
                {this.state.countries.map((country) => {
                  return (
                    <CountryCard
                      country={country.name}
                      population={country.population}
                      region={country.region}
                      capital={country.capital}
                      flag={country.flag}
                    />
                  );
                })}
              </div>,
              document.getElementById("home-countries-container")
            );
          });
        }, 800);
        if (this.lastCardIndex >= this.state.currentCountries.length) {
          document.querySelector("#loading-sign").style.display = "none";
        }
      }
    };
  }
  checkIfScrolledToBottom() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 0.5)
      return true;
    return false;
  }
  render() {
    return (
      <div id="home">
        <div id="home-controls">
          <SearchBox placeholder="Search for a country..." />
          <SelectBox
            onValueSelected={this.regionSelected}
            placeholder="Filter by region..."
            items={["Africa", "Americas", "Asia", "Europe", "Oceania"]}
          />
        </div>
        <div id="home-countries-container"></div>
        <div id="loading-sign">Loading...</div>
      </div>
    );
  }
}

export default Home;
