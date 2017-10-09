import React from 'react';
import {render} from 'react-dom';

class InventoryItem extends React.Component 
{
    constructor(props)
    {
        super(props);
    }
    
    render () 
    {
        let item = this.props.item;

        return (<div className="item">
            <div className="item-title">{item.title}</div>
            <div className="item-text">Stock:</div>
            <div className="inc-dec-button">-</div>
            <div className="item-number">{item.quantity}</div>
            <div className="inc-dec-button">+</div>
            <div className="item-text">Max:</div>
            <div className="inc-dec-button">-</div>
            <div className="item-number item-max">{item.max}</div>
            <div className="inc-dec-button">+</div>
        </div>);
    }
}

export default InventoryItem;