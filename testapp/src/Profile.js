import React, { useRef } from 'react'
import Namelist from './Namelist'

export default function Profile({ persoon, handleAgeChange, handleNameChange, names }) {
    const naamRef = useRef()
    const leeftijdRef = useRef()

    function changeNameInput(name) {
        naamRef.current.value = name
    }

    function handleAgeChangeButton() {
        const nieuweLeeftijd = leeftijdRef.current.value
        handleAgeChange(persoon, nieuweLeeftijd)
        leeftijdRef.current.value = null

    }

    function handleNameChangeButton() {
        const nieuweNaam = naamRef.current.value
        handleNameChange(persoon, nieuweNaam)
        naamRef.current.value = null
    }
    return (
        <div className="profile">
            <p>welkom, {persoon.naam}</p>
            <p>je bent {persoon.leeftijd} jaar oud</p>
            <Namelist names={names} changeNameInput={changeNameInput} />
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
