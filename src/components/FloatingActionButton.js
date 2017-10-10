import React from 'react';
import {render} from 'react-dom';

class FloatingActionButton extends React.Component 
{
    constructor(props)
    {
        super(props);
    }
    
    render () 
    {
        return (<div className="floating-action-button" onClick={this.pressed.bind(this)}>+</div>);
    }

    pressed()
    {
        if(this.props.onpressed)
        {
            this.props.onpressed();
        }
        
    }

}

export default FloatingActionButton;