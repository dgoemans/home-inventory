import React from 'react';
import {render} from 'react-dom';
import Item from './models/Item';
import InventoryItem from './components/InventoryItem';

class App extends React.Component 
{
    constructor()
    {
        super();

        this.items = [];

        this.items.push(new Item(1, "Palmolive Hand Soap", 4, 6));
        this.items.push(new Item(2, "Ariel washing stuff", 4, 6));
    }

    render () 
    {
        let result = [];

        this.items.forEach(item => {
            result.push(<InventoryItem item={item} key={item.id} />)
        });

        return <div>{result}</div>;
    }
}

render(<App/>, document.getElementById('app'));