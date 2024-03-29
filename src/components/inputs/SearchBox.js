import React, { Component } from "react";
import SearchResult from "../fixtures/SearchResult";
import "./styles/SearchBox.css";
import Axios from "axios";
import { NavLink } from "react-router-dom";

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
      searchResultIndex: -1,
      numberOfResults: 0,
      isLoading: false,
    };

    // Refs
    this.ref = React.createRef();

    // Bindings Methods
    this.inputBlured = this.inputBlured.bind(this);
    this.inputChanged = this.inputChanged.bind(this);
    this.searchResultClicked = this.searchResultClicked.bind(this);
    this.inputKeyDown = this.inputKeyDown.bind(this);
    this.clickSearchResult = this.clickSearchResult.bind(this);
    this.moveCursorToEnd = this.moveCursorToEnd.bind(this);
  }
  moveCursorToEnd(el) {
    if (typeof el.selectionStart == "number") {
      el.selectionStart = el.selectionEnd = el.value.length;
    } else if (typeof el.createTextRange != "undefined") {
      el.focus();
      var range = el.createTextRange();
      range.collapse(false);
      range.select();
    }
  }
  inputKeyDown(event) {
    let result = document.querySelectorAll(".search-result");
    let boxShadow = "inset 0 0 0 30px #00000015";
    let rootRef = this.ref.current;
    let searchInput = rootRef.querySelector(".search-box-in");
    if (this.state.numberOfResults === 0) return;
    result.forEach((r) => {
      r.style.removeProperty("box-shadow");
    });
    // Up Key
    if (event.keyCode === 38) {
      event.preventDefault();
      if (this.state.searchResultIndex > 0) {
        this.setState(
          { searchResultIndex: this.state.searchResultIndex - 1 },
          () => {
            result[this.state.searchResultIndex].style.boxShadow = boxShadow;
          }
        );
      } else {
        this.setState(
          { searchResultIndex: this.state.numberOfResults - 1 },
          () => {
            result[this.state.searchResultIndex].style.boxShadow = boxShadow;
          }
        );
      }
    }
    // Down Key
    else if (event.keyCode === 40) {
      if (this.state.searchResultIndex < this.state.numberOfResults - 1) {
        this.setState(
          { searchResultIndex: this.state.searchResultIndex + 1 },
          () => {
            result[this.state.searchResultIndex].style.boxShadow = boxShadow;
          }
        );
      } else {
        this.setState({ searchResultIndex: 0 }, () => {
          result[this.state.searchResultIndex].style.boxShadow = boxShadow;
        });
      }
    } else if (
      event.keyCode === 13 &&
      this.state.numberOfResults !== 0 &&
      this.state.searchResultIndex !== -1
    ) {
      let name = result[this.state.searchResultIndex].querySelector(
        ".search-result-country div"
      ).innerText;
      window.location.href = `/details/${name}`;
    }
  }
  clickSearchResult(result) {
    let name = result.querySelector(".search-result-country div").innerText;
    window.location.href = `/details/${name}`;
  }
  searchResultClicked(event) {
    this.clickSearchResult(event.currentTarget);
  }
  inputChanged(event) {
    let emptyResults = (
      <div className="search-results-container">
        <div className="nothing-container">
          <i className="fa fa-ban"></i>
          <p>Nothing to show...</p>
        </div>
      </div>
    );
    let value = event.target.value.trim().toLowerCase();
    this.setState({ results: emptyResults }, () => {
      this.setState({ searchResultIndex: -1 });
      if (value === "") {
        this.setState({
          results: emptyResults,
        });
        return;
      }
      this.setState({ isLoading: true });
      Axios.get(`https://restcountries.com/v3.1/all`)
        .then((response) => {
          this.setState({ isLoading: false });
          let countries = response.data;
          let filteredCountries = countries
            .filter((country) =>
              country.name.common.trim().toLowerCase().includes(value)
            )
            .slice(0, 6);
          this.setState({ numberOfResults: filteredCountries.length });
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
                {filteredCountries.map((country, i) => {
                  let name = (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: country.name.common
                          .toLowerCase()
                          .replaceAll(
                            value,
                            `<span style="background: var(--highlighter-cr)">${value}</span>`
                          ),
                      }}
                    />
                  );
                  let flag = country.flags.svg;
                  return (
                    <SearchResult
                      key={i.toString()}
                      onClick={this.searchResultClicked}
                      flag={flag}
                      country={name}
                    />
                  );
                })}
              </div>
            ),
          });
        })
        .catch((error) => {});
    });
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
        ref={this.ref}
      >
        <div className="search-box-in-container">
          {this.state.isLoading ? (
            <div className="loader"></div>
          ) : (
            <i className="fa fa-search"></i>
          )}
          <input
            onInput={this.inputChanged}
            onBlur={this.inputBlured}
            onKeyDown={this.inputKeyDown}
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
