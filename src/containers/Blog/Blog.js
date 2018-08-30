import React, { Component } from 'react';
// import axios from 'axios';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

// import Post from '../../components/Post/Post';
// import FullPost from '../../components/FullPost/FullPost';
// import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
import Posts from '../Blog/Posts/Posts';
// import NewPost from './NewPost/NewPost';
import asyncComponent from '../../hoc/asyncComponent';
// import FullPost from './FullPost/FullPost';

const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost');
});

class Blog extends Component {
    render () {
        return (
            <div className="Blog">
                {/* <h1>Requests</h1>
                <div className="Nav">
                    <NavLink className="link" to={{
                        pathname: "/new-request",
                        hash: "#submit"
                    }}>Add New</NavLink>
                </div> */}
                <Switch>
                    <Route path="/new-request" component={AsyncNewPost} />
                    <Route path="/requests" component={Posts} />
                    <Redirect from="/" to="/requests" />
                    {/* <Route path="/:id" exact component={FullPost} /> */}
                </Switch>
            </div>
        );
    }
}

export default Blog;