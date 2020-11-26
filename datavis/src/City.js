import React, { useState } from 'react'
const d3 = require('d3')

const width = 450;
const height = 350;
const margin = {
    top: 50,
    right: 20,
    bottom: 20,
    left: 50
}

export default function City({ cityObject, maxValue }) {
    const [data, setData] = useState(cityObject.data);
    console.log(maxValue)
    const title = cityObject.city
    //bereken maximale lengtes van grafiek
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom
    let maxDomainValue = maxValue;
    const xScale = d3.scaleBand()
        .domain(data.map(d => d.jaar))
        .range([0, innerWidth])
        .padding(0.1)
    const yScale = d3.scaleLinear()
        .domain([maxDomainValue, 0])
        .range([0, innerHeight])

    return (
        <li>
            <svg width={width} height={height}>
                <g transform={`translate(${margin.left}, ${margin.top})`}>
                    <text className="barchart-title" x={innerWidth / 2} y={"-.71em"}>{title}</text>
                    {yScale.ticks().map(tickValue => {
                        return <g key={tickValue} transform={`translate(${0}, ${yScale(tickValue)})`}>
                            <line x2={innerWidth} stroke="lightblue" />
                            <text dy=".32em" dx="-.2em" style={{ textAnchor: "end" }}>{tickValue}</text>
                        </g>
                    })}
                    {xScale.domain().map(tickValue => {
                        return <text key={tickValue} y={innerHeight + 5} x={xScale(tickValue) + xScale.bandwidth() / 2} dy=".71em" style={{ textAnchor: "middle" }}>{tickValue}</text>
                    })}
                    {data.map((d) => <rect y={yScale(d.aantal)}
                        key={d.jaar}
                        x={xScale(d.jaar)}
                        height={innerHeight - yScale(d.aantal)}
                        width={xScale.bandwidth()}
                    />)}
                </g>
            </svg>
        </li>
    )
}
