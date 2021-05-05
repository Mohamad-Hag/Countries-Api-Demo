import React, { Component } from "react";
import "./styles/CountryCard.css";

class CountryCard extends Component {
  constructor(props) {
    super(props);

    // Refs
    this.ref = React.createRef();

    //State Object
    this.state = {};

    // Binding Methods
    this.cardClicked = this.cardClicked.bind(this);
    this.flagLoaded = this.flagLoaded.bind(this);
  }
  flagLoaded(event)
  {
    let target = event.currentTarget.parentElement;
    let loader = target.querySelector(".country-card-flag-loader-container");
    setTimeout(() => {
      loader.classList.add("country-card-flag-loader-container-none");
    }, 500);    
  }
  cardClicked()
  {
    let current = this.ref.current; 
    let name = current.querySelector(".country-card-name").innerText.toLowerCase();
    window.location.href = `/details/${name}`;
  }
  render() {
    return (
      <div className="country-card" ref={this.ref} onClick={this.cardClicked}>
        <div className="country-card-flag">
          <img
            alt=""
            src={this.props.flag}
            loading="lazy"
            onLoad={this.flagLoaded}
          />
          <div className="country-card-flag-loader-container">
            <div className="country-card-flag-loader"></div>
          </div>
        </div>
        <div className="country-card-details">
          <dt className="country-card-name">{this.props.country}</dt>
          <p>
            Population: <span>{this.props.population}</span>
          </p>
          <p>
            Region: <span>{this.props.region}</span>
          </p>
          <p>
            Capital: <span>{this.props.capital}</span>
          </p>
        </div>
      </div>
    );
  }
}
export default CountryCard;
