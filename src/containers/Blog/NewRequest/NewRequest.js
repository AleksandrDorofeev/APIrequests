import React, { Component } from 'react';
import Select from 'react-select';
import axios from '../../../axios';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import './NewRequest.css';

const options = [
    { value: 'dollar', label: 'USD' },
    { value: 'euro', label: 'EUR' },
  ];

class NewRequest extends Component {
    state = {
        from: undefined,
        to: undefined,
        passengers: '',
        price: '',
        selectedOption: null,
        error: false
    }
    constructor(props) {
        super(props);
        this.handleDayClick = this.handleDayClick.bind(this);
      }

    handleDayClick(day) {
        const range = DateUtils.addDayToRange(day, this.state);
        this.setState(range);
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
      }  

    postDataHandler = () => {
        const post = {
            date_from: this.state.from.toLocaleDateString("en-EU").split("/").reverse().join("/"),
            date_until: this.state.to.toLocaleDateString("en-EU").split("/").reverse().join("/"),
            passengers: this.state.passengers,
            price: this.state.price,
            currency: this.state.selectedOption.label
        }
        axios.post('/requests', post)
            .then(response => {
                console.log(response);
                this.props.history.push('/requests');
            })
            .catch((error) => {
                console.log(error)
                  this.setState({error: true});
            })
    }

    render () {
        const { from, to, selectedOption } = this.state;
        const modifiers = { start: from, end: to };

        return (
            <div className="NewRequest">
                <h1>Create request</h1>
                <div>
                    <label className="price">Price</label>
                    <input type="text" value={this.state.price} onChange={(event) => this.setState({price: event.target.value})} />
                </div>
                <div>
                    <label className="currency">Currency</label>
                    <Select
                        value={selectedOption}
                        onChange={this.handleChange}
                        options={options}
                    />
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

export default NewRequest;