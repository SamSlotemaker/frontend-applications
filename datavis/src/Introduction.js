import React from 'react'

export default function Introduction({ heading, text }) {
    return (
        <section>
            <h1>{heading}</h1>
            <p>{text}</p>
        </section>
    )
}
