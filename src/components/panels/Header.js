import React, { Component } from "react";
import Button from "../inputs/Button";
import "./styles/Header.css";

class Header extends Component {
  constructor(props) {
    super(props);

    // Refs
    this.ref = React.createRef();

    // State Object
    this.state = {
      text: "Dark Mode",
      icon: "fa fa-moon",
      theme: "l",
    };

    // Bindings Methods
    this.switchTheme = this.switchTheme.bind(this);
    this.switchThemeTo = this.switchThemeTo.bind(this);
    this.homeClicked = this.homeClicked.bind(this);
  }
  homeClicked()
  {
    window.location.href = "/";
  }
  componentDidMount() {
    let theme = localStorage.getItem("theme");
    if (theme === undefined) {
      localStorage.setItem("theme", "l");
      return;
    }
    if (theme === "l") {
      this.setState({theme: "l"}, () => {
        this.switchThemeTo("l");
      });      
    } else {
      this.setState({ theme: "d" }, () => {
        this.switchThemeTo("d");
      });      
    }
  }
  switchThemeTo(theme) {
    let root = document.querySelector(":root");
    if (theme === "d") {
      this.setState({ text: "Light Mode", icon: "fa fa-sun", theme: "d" });
      root.style.setProperty("--lm-bg", "hsl(207, 26%, 17%)");
      root.style.setProperty("--lm-dm-elements", "hsl(209, 23%, 22%)");
      root.style.setProperty("--lm-txt-cr", "hsl(0, 100%, 100%)");
      root.style.setProperty("--lm-dark-cr", "hsl(209, 26%, 15%)");
      root.style.setProperty("--lm-input-cr", "hsl(209, 26%, 65%)");
      localStorage.setItem("theme", "d");
    } else {
      this.setState({ text: "Dark Mode", icon: "fa fa-moon", theme: "l" });
      root.style.setProperty("--lm-bg", "hsl(0, 0%, 98%)");
      root.style.setProperty("--lm-dm-elements", "hsl(0, 0%, 100%)");
      root.style.setProperty("--lm-txt-cr", "hsl(200, 15%, 8%)");
      root.style.setProperty("--lm-dark-cr", "hsl(0, 0%, 80%)");
      root.style.setProperty("--lm-input-cr", "hsl(0, 0%, 52%)");
      localStorage.setItem("theme", "l");
    }
  }
  switchTheme() {
    if (this.state.theme === "l") {
      this.switchThemeTo("d");
    } else {
      this.switchThemeTo("l");
    }
  }
  render() {
    return (
      <header id="header">
        <p onClick={this.homeClicked}>{this.props.title}</p>
        <Button
          onClick={this.switchTheme}
          iconClass={this.state.icon}
          text={this.state.text}
          type="no-bg"
        />
      </header>
    );
  }
}

export default Header;
