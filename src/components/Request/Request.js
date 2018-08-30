import React from 'react';

import './Request.css';

const post = (props) => (
    <article className="Request">
        <div className="Price">{props.price}</div>
        <div className="Id">{props.id}</div>
        <div className="Date">{props.dateFrom}-{props.dateTo}</div>
        <div className="Passengers">{props.passengers}</div>
    </article>
);

export default post;