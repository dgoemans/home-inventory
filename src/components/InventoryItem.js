import React from 'react';
import {render} from 'react-dom';
import NumberCounter from './NumberCounter';

class InventoryItem extends React.Component 
{
    constructor(props)
    {
        super(props);

        this.state = {
            item: props.item
        };
    }
    
    render () 
    {
        let item = this.state.item;

        return (<div className="item">
            <div className="item-title">{item.title}</div>
            <div className="item-text">Stock:</div>
            <NumberCounter amount={item.quantity} onchange={this.changeQuantity.bind(this)} />
            <div className="item-text">Max:</div>
            <NumberCounter amount={item.max} onchange={this.changeMax.bind(this)} />
        </div>);
    }

    changeQuantity (amount)
    {
        let item = this.state.item;

        item.quantity += amount;

        this.setState({ item: item });
    }

    changeMax (amount)
    {
        let item = this.state.item;

        item.max += amount;

        this.setState({ item: item });
    }
}

export default InventoryItem;