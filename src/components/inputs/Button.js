import React, { Component } from "react";
import "./styles/Button.css";

class Button extends Component {
  constructor(props) {
    super(props);

    // State Object
    this.state = {};

    // Refs
    this.ref = React.createRef();

    // Bindings Methods
  }
  componentDidMount()
  {
      let current = this.ref.current;
      if (this.props.type === "no-bg")
      {          
          current.classList.remove("button-bg");
      }      
      if (this.props.iconPlace === "after")
      {
          current.classList.add("button-icon-after");
      }
      if (this.props.icon === "none")
      {
          current.classList.add("button-no-icon");                    
      }
  }

  render() {
    return (
      <button
        style={this.props.style}
        id={this.props.id}
        ref={this.ref}
        className="button button-bg"
        onClick={this.props.onClick}
      >
          <i className={this.props.iconClass}></i>
          <span>{this.props.text}</span>
      </button>
    );
  }
}

export default Button;
