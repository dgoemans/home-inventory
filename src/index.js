import React from 'react';
import {render} from 'react-dom';
import Item from './models/Item';
import InventoryItem from './components/InventoryItem';
import FloatingActionButton from './components/FloatingActionButton';

class App extends React.Component 
{
    constructor()
    {
        super();

        this.state = {
            items: []
        }
    }

    render () 
    {
        let result = [];

        this.state.items.forEach(item => {
            result.push(<InventoryItem item={item} key={item.id} />)
        });

        return (<div>{result}
                <FloatingActionButton onpressed={this.add.bind(this)} />
                </div>);
    }

    add()
    {
        let items = this.state.items;

        items.push(new Item(items.length, "Tap here to edit", 0, 0));

        this.setState({
            items: items
        });
    }
}

render(<App/>, document.getElementById('app'));