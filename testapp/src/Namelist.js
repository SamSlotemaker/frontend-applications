import React, { useRef } from 'react'

export default function Namelist({ names, changeNameInput }) {

    const selectNameRef = useRef()

    function handleSelectChange() {
        changeNameInput(selectNameRef.current.value)
    }

    return (
        <select ref={selectNameRef} onChange={handleSelectChange}>
            {names.map(name => <option key={name} value={name}>{name}</option>)}
        </select>
    )
}
