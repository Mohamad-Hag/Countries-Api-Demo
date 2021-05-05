import React, { Component } from "react";
import "./styles/SelectBoxItem.css";

class SelectBoxItem extends Component {
  constructor(props) {
    super(props);

    // Refs
    this.ref = React.createRef();

    // State Object
    this.state = {};

    // Binding Methods
  }

  render() {
    return (
      <div
        className="select-box-item"
        id={this.props.id}
        style={this.props.style}
        ref={this.ref}
        tabIndex="0"
        onClick={this.props.onClick}                
      >        
      {this.props.text}
      </div>
    );
  }
}

export default SelectBoxItem;
