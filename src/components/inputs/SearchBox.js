import React, { Component } from "react";
import SearchResult from "../fixtures/SearchResult";
import "./styles/SearchBox.css";
import Axios from "axios";

class SearchBox extends Component {
  constructor(props) {
    super(props);

    // State Object
    this.state = {
      results: (
        <div className="search-results-container">
          <div className="nothing-container">
            <i className="fa fa-ban"></i>
            <p>Nothing to show...</p>
          </div>
        </div>
      ),
    };

    // Refs
    this.ref = React.createRef();

    // Bindings Methods
    this.inputBlured = this.inputBlured.bind(this);
    this.inputChanged = this.inputChanged.bind(this);
    this.searchResultClicked = this.searchResultClicked.bind(this);
  }
  searchResultClicked(event)
  {
    let name = event.currentTarget.querySelector(".search-result-country div").innerText;
    window.location.href = `/details/${name}`;
  }
  inputChanged(event) {
    let value = event.target.value.trim().toLowerCase();
    if (value === "") {
      this.setState({
        results: (
          <div className="search-results-container">
            <div className="nothing-container">
              <i className="fa fa-ban"></i>
              <p>Nothing to show...</p>
            </div>
          </div>
        ),
      });
      return;
    }
    Axios.get(`https://restcountries.eu/rest/v2/all`)
      .then((response) => {
        let countries = response.data;
        let filteredCountries = countries
          .filter((country) =>
            country.name.trim().toLowerCase().includes(value)
          )
          .slice(0, 10);
        if (filteredCountries.length === 0) {
          this.setState({
            results: (
              <div className="search-results-container">
                <div className="nothing-container">
                  <i className="fa fa-ban"></i>
                  <p>Nothing to show...</p>
                </div>
              </div>
            ),
          });
          return;
        }
        this.setState({
          results: (
            <div className="search-results-container">
              {filteredCountries.map((country) => {
                let name = (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: country.name
                        .toLowerCase()
                        .replaceAll(
                          value,
                          `<span style="background: var(--highlighter-cr)">${value}</span>`
                        ),
                    }}
                  />
                );
                let flag = country.flag;
                return <SearchResult onClick={this.searchResultClicked} flag={flag} country={name} />;
              })}
            </div>
          ),
        });
      })
      .catch((error) => {});
  }
  inputBlured(event) {}
  componentDidMount() {}

  render() {
    return (
      <div
        className="search-box"
        tabIndex="0"
        id={this.props.id}
        style={this.props.style}
      >
        <div className="search-box-in-container">
          <i className="fa fa-search"></i>
          <input
            onInput={this.inputChanged}
            onBlur={this.inputBlured}
            type={this.props.inputType}
            className="search-box-in"
            placeholder={this.props.placeholder}
          />
        </div>
        {this.state.results}
      </div>
    );
  }
}

export default SearchBox;
