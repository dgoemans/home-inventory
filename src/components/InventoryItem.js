import React from 'react';
import {render} from 'react-dom';
import NumberCounter from './NumberCounter';

class InventoryItem extends React.Component 
{
    constructor(props)
    {
        super(props);

        this.state = {
            item: props.item,
            edit: false
        };
    }
    
    render () 
    {
        let item = this.state.item;

        let title = null;

        if(this.state.edit)
        {
            title = <input className="item-title-edit" onChange={this.nameChange.bind(this)} onBlur={this.toggleEdit.bind(this)} autoFocus />;
        }
        else
        {
            title = <div className="item-title" onClick={this.toggleEdit.bind(this)}>{item.title}</div>;
        }

        return (<div className="item">
            {title}
            <div className="counter-root">
                <div className="item-text">Stock:</div>
                <NumberCounter amount={item.quantity} onchange={this.changeQuantity.bind(this)} />
            </div>
            <div className="counter-root">
                <div className="item-text">Max:</div>
                <NumberCounter amount={item.max} onchange={this.changeMax.bind(this)} />
            </div>
        </div>);
    }

    changeQuantity (amount)
    {
        let item = this.state.item;

        item.quantity += amount;

        this.setState({ item: item });

        this.props.onchange();
    }

    changeMax (amount)
    {
        let item = this.state.item;

        item.max += amount;

        this.setState({ item: item });

        this.props.onchange();
    }

    nameChange(event)
    {
        let newText = event.target.value;

        let item = this.state.item;
        
        item.title = newText;

        this.setState({
            item: item
        });
    }

    toggleEdit()
    {
        let edit = !this.state.edit;

        this.setState({
            edit: edit
        });

        if(!edit)
        {
            this.props.onchange();
        }
    }
}

export default InventoryItem;