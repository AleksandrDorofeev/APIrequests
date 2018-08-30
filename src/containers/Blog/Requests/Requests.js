import React, { Component } from 'react';
import axios from '../../../axios';
import { Route, NavLink } from 'react-router-dom';

import Post from '../../../components/Request/Request';
import './Requests.css';

class Requests extends Component {
  state = {
    requests: [],
    // selectedPostId: null,
    error: false
  }

  componentDidMount() {
    axios.get('/requests')
      .then( response => {
        console.log(response)
        const requests = response.data;
        const updateRequests = requests.map(request => {
          return {
            ...request,
          }
        })
        this.setState({requests: updateRequests})
      })
      .catch((error) => {
        console.log(error)
          this.setState({error: true});
      })
  }

  render() {
    let requests = <p style={{ textAlign: "center" }}>Somthing went wrong!</p>
      if(!this.state.error) {
        requests = this.state.requests.map(request => {
          return (
              <Post key={request.id}   
                    price={request.price}
                    id={request.id}
                    dateFrom={request.date_from}
                    dateTo={request.date_until}
                    passengers={request.passengers} 
              />
          )
         } )
      }

    return (
      <div>
        <section className="Requests">
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
          {requests}
        </section>
      </div>
    )
  }
}

export default Requests;