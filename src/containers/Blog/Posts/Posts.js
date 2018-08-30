import React, { Component } from 'react';
import axios from '../../../axios';
import { Route, NavLink } from 'react-router-dom';

import Post from '../../../components/Post/Post';
import './Posts.css';
import FullPost from '../FullPost/FullPost';


class Posts extends Component {
  state = {
    users: [],
    selectedPostId: null,
    error: false
  }

  componentDidMount() {
    axios.get('/users')
      .then( response => {
        const users = response.data.slice(0, 4);
        const updatedUsers = users.map(user => {
          return {
            ...user,
          }
        })
        this.setState({users: updatedUsers})
      })
      .catch((error) => {
        console.log(error)
          this.setState({error: true});
      })
  }

  postSelectedHandler = (id) => {
    this.props.history.push({pathname: "/posts/"+ id});
  }

  render() {
    let users = <p style={{ textAlign: "center" }}>Somthing went wrong!</p>
      if(!this.state.error) {
        users = this.state.users.map(user => {
          return (
            // <Link to={"/" + post.id} key={post.id}>
              <Post key={user.id}   
                    title={user.name} 
                    author={user.address.street} 
                    clicked={() => this.postSelectedHandler(user.id)}
              />
            // </Link>
          )
         } )
      }

    return (
      <div>
        <section className="Posts">
        <h1>Requests</h1>
                <div className="Nav">
                    <NavLink className="link" to={{
                        pathname: "/new-request",
                        hash: "#submit"
                    }}>Add New</NavLink>
                </div>
          <ul className="title">
            <li>Price</li>
            <li>id</li>
            <li>From / Until</li>
            <li>Passengers</li>
          </ul>
          {users}
        </section>
        <Route path={this.props.match.url + "/:id"} exact component={FullPost} />
      </div>
    )
  }
}

export default Posts;