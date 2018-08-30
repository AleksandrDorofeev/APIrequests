import React, { Component } from 'react';
import axios from '../../../axios';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { Redirect } from "react-router-dom";

import './NewPost.css';

class NewPost extends Component {
    state = {
        price: '',
        passengers: '',
        author: 'Max',
        from: undefined,
        to: undefined,
        error: false
        // submitted: false
    }
    constructor(props) {
        super(props);
        this.handleDayClick = this.handleDayClick.bind(this);
        // this.state = this.getInitialState();
      }

    // getInitialState() {
    //     return {
    //       from: undefined,
    //       to: undefined,
    //     };
    //   }
    
    handleDayClick(day) {
        const range = DateUtils.addDayToRange(day, this.state);
        this.setState(range);
    }  

    postDataHandler = () => {
        const post = {
            price: this.state.price,
            passengers: this.state.passengers,
            author: this.state.author,
            date_from: this.state.from.toLocaleDateString("en-EU").split("/").reverse().join("/"),
            date_until: this.state.to.toLocaleDateString("en-EU").split("/").reverse().join("/")
        }
        axios.post('/posts', post)
            .then(response => {
                console.log(response);
                this.props.history.push('/posts');
                // this.setState({ submitted: true })
            })
            .catch((error) => {
                console.log(error)
                  this.setState({error: true});
            })
    }

    render () {
        // let redirect = null;
        // if(this.state.submitted) {
        //     redirect = <Redirect to="/posts" />
        // }
        const { from, to } = this.state;
        const modifiers = { start: from, end: to };

        return (
            <div className="NewPost">
                {/* {redirect} */}
                <h1>Create request</h1>
                <div>
                    <label className="price">Price</label>
                    <input type="text" value={this.state.price} onChange={(event) => this.setState({price: event.target.value})} />
                </div>
                <div>
                    <label className="passengers">Passengers</label>
                    <input value={this.state.passengers} onChange={(event) => this.setState({passengers: event.target.value})} />
                </div>
                <div>
                    <label className="time">From / Until</label>
                    <span>
                        {!from && !to && 'Please select the first day.'}
                        {from && !to && 'Please select the last day.'}
                        {from &&
                            to &&
                            `Selected from ${from.toLocaleDateString()} to
                                ${to.toLocaleDateString()}`}{' '}
                    </span>
                    <DayPicker
                        className="Selectable"
                        numberOfMonths={this.props.numberOfMonths}
                        selectedDays={[from, { from, to }]}
                        modifiers={modifiers}
                        onDayClick={this.handleDayClick}
                    />
                </div>
                <button onClick={this.postDataHandler} disabled={!from && !to || from && !to}>Create</button>
            </div>
        );
    }
}

export default NewPost;