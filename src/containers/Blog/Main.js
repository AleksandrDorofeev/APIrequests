import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import './Main.css';
import Requests from '../Blog/Requests/Requests';
import asyncComponent from '../../hoc/asyncComponent';

const AsyncNewRequest = asyncComponent(() => {
    return import('./NewRequest/NewRequest');
});

class Main extends Component {
    render () {
        return (
            <div className="Main">
                <Switch>
                    <Route path="/new-request" component={AsyncNewRequest} />
                    <Route path="/requests" component={Requests} />
                    <Redirect from="/" to="/requests" />
                </Switch>
            </div>
        );
    }
}

export default Main;