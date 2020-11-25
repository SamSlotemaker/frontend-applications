import React from 'react'

export default function Introduction({ heading, text }) {
    return (
        <section className="introduction">
            <div>
                <h1>{heading}</h1>
                <p>{text}</p>
            </div>
        </section>
    )
}
