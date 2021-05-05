import React, { Component } from "react";
import "./styles/SearchResult.css";

class SearchResult extends Component {
  constructor(props) {
    super(props);

    // State Object
    this.state = {};

    // Refs
    this.ref = React.createRef();

    // Bindings Methods
  }
  componentDidMount() {}

  render() {
    return (
      <div
        className="search-result"
        tabIndex="0"
        id={this.props.id}
        style={this.props.style}
        onClick={this.props.onClick}
      >
          <img className="search-result-flag" src={this.props.flag} alt="Flag"/>
          <span className="search-result-country">{this.props.country}</span>
      </div>
    );
  }
}

export default SearchResult;
