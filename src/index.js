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

        this.firebaseHelper.authenticate().then(() => {
            this.loggedIn();
        }).catch(() => {
            this.loggedOut();
        });
    }

    loggedIn()
    {
        this.setState({
            loggedIn: true
        });

        this.firebaseHelper.load().then((result) => {
            this.setState({
                items: result
            });
        });
    }

    loggedOut()
    {
        this.setState({
            loggedIn: false
        });
    }

    loginResult(result)
    {
        if(result.credential)
        {
            this.loggedIn();
        }
        else
        {
            this.loggedOut();
        }
    }

    render () 
    {
        if(this.firebaseHelper.isSignedIn())
        {
            let result = [];
            
            this.state.items.forEach(item => {
                result.push(<InventoryItem item={item} key={item.id} onchange={this.save.bind(this)} />)
            });
    
            return (<div className="container">{result}
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
    }

    save()
    {
        this.firebaseHelper.save(this.state.items);
    }
}

render(<App/>, document.getElementById('app'));