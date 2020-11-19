import React, { useRef } from 'react'

export default function Profile({ persoon, handleAgeChange, handleNameChange }) {
    const naamRef = useRef()
    const leeftijdRef = useRef()

    function handleAgeChangeButton() {
        const nieuweLeeftijd = leeftijdRef.current.value
        handleAgeChange(persoon, nieuweLeeftijd)
    }

    function handleNameChangeButton() {
        const nieuweNaam = naamRef.current.value
        handleNameChange(persoon, nieuweNaam)
    }
    return (
        <div className="profile">
            <p>welkom, {persoon.naam}</p>
            <p>je bent {persoon.leeftijd} jaar oud</p>

            <div className="forms">
                <input ref={naamRef} type="text" />
                <button onClick={handleNameChangeButton}>Change name</button>
            </div>
            <div className="forms">
                <input ref={leeftijdRef} type="number" />
                <button onClick={handleAgeChangeButton}>Change age</button>
            </div>
        </div>
    )
}
