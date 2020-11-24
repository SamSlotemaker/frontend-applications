import React from 'react'
const d3 = require('d3')


export default function City({ cityObject }) {
    return <li key={cityObject.city}>{cityObject.city}</li>
}
