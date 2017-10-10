import React from 'react';
import {render} from 'react-dom';

class NumberCounter extends React.Component 
{
    constructor(props)
    {
        super(props);
    }
    
    render () 
    {
        let item = this.props.item;

        return (<div className="number-counter">
            <div className="inc-dec-button" onClick={this.decrement.bind(this)}>-</div>
            <div className="number">{this.props.amount}</div>
            <div className="inc-dec-button" onClick={this.increment.bind(this)}>+</div>
        </div>);
    }

    decrement()
    {
        if(this.props.onchange)
        {
            this.props.onchange(-1);
        }
        
    }

    increment()
    {
        if(this.props.onchange)
        {
            this.props.onchange(1);
        }
    }
}

export default NumberCounter;