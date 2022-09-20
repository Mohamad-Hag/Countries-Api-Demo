import React, { Component } from "react";
import SelectBoxItem from "../fixtures/SelectBoxItem";
import "./styles/SelectBox.css";

class SelectBox extends Component {
  constructor(props) {
    super(props);

    // Refs
    this.ref = React.createRef();

    // State Object
    this.state = {};

    // Binding Methods
    this.itemSelected = this.itemSelected.bind(this);
  }
  itemSelected(event) {
    let target = event.currentTarget;
    let value = target.innerText;
    this.props.onValueSelected(value);
    let current = this.ref.current;
    let head = current.querySelector(".select-box-head");
    let items = current.querySelector(
      ".select-box:focus-within .select-box-items"
    );
    head.childNodes[0].textContent = value;
    items.style.visibility = "hidden";
    items.style.opacity = "0";
    items.style.top = "45px";
  }
  render() {
    return (
      <div
        className="select-box"
        id={this.props.id}
        style={this.props.style}
        ref={this.ref}
        tabIndex="0"
      >
        <div
          className="select-box-head"
          onClick={(event) => {
            let current = this.ref.current;
            let items = current.querySelector(
              ".select-box:focus-within .select-box-items"
            ); 
            let items_ = current.querySelector(".select-box-items");                    
            items.style.visibility = "visible";
            items.style.opacity = "1";
            items.style.top = "50px";
            items_.style.removeProperty("visibility");
            items_.style.removeProperty("opacity");
            items_.style.removeProperty("top");
          }}
        >
          {this.props.placeholder}
          <i className="fa fa-angle-down"></i>
        </div>
        <div className="select-box-items">
          {this.props.items.map((item, i) => {
            return (
              <SelectBoxItem
                key={i.toString()}
                onClick={this.itemSelected}
                text={item}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default SelectBox;
