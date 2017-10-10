import React from 'react';
import {render} from 'react-dom';
import Item from './models/Item';
import InventoryItem from './components/InventoryItem';
import FloatingActionButton from './components/FloatingActionButton';
import FirebaseHelper from './FirebaseHelper';

class App extends React.Component 
{
    constructor()
    {
        super();

        this.state = {
            items: [],
            loggedIn: false
        }

        this.firebaseHelper = new FirebaseHelper();

        if(!this.firebaseHelper.isSignedIn())
        {
            //this.login();
        }
        else
        {
            this.setState({
                loggedIn: true
            });
        }
    }

    loginResult(result)
    {
        console.log(result);
        if(result.credential)
        {
            this.setState({
                loggedIn: true
            });

            this.firebaseHelper.load();
        }
        else
        {
            this.setState({
                loggedIn: false
            });
        }
    }

    render () 
    {
        if(this.firebaseHelper.isSignedIn())
        {
            let result = [];
            
            this.state.items.forEach(item => {
                result.push(<InventoryItem item={item} key={item.id} />)
            });
    
            return (<div>{result}
                    <FloatingActionButton onpressed={this.add.bind(this)} />
                    </div>);            
        }
        else
        {
            return (<div className="button" onClick={this.login.bind(this)}>LOGIN</div>);
        }
    }

    login()
    {
        this.firebaseHelper.login()
            .then((result) => this.loginResult(result))
            .catch((error) => console.log(error));
    }

    add()
    {
        let items = this.state.items;

        items.push(new Item(items.length, "Tap here to edit", 0, 0));

        this.setState({
            items: items
        });

        this.firebaseHelper.save(items);
    }
}

render(<App/>, document.getElementById('app'));