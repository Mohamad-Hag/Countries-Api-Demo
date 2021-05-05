import React, {Component} from 'react'
import "./styles/NotFound.css";

class NotFound extends Component
{
    constructor(props)
    {
        super(props);

        // Refs
        this.ref = React.createRef();

        // State Object

        // Binding Methods
    }
    render()
    {
        return (
          <div id="not-found">
            <dt>404 :/</dt>
            <dd>{this.props.message}</dd>
          </div>
        );
    }
}

export default NotFound;