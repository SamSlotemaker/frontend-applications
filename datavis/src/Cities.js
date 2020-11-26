import React, { useState, useEffect, useRef } from 'react'
import BarchartInformation from './BarchartInformation'
import City from './City'
import InformationPopup from './InformationPopup'
import { formatCityData, sortedArrayNamesSmallToLarge, calculateMaxAantal } from './modules/cleanData'

export default function Cities({ cityAverages, verkoopPunten }) {

    const CITIES_KEY = 'CITIES_LIST_KEY'
    const MAX_VALUE_KEY = 'MAX_VALUE_KEY'
    const [cities, setCities] = useState([])
    const [maxValue, setmaxValue] = useState(0)
    const selectCityRef = useRef()
    const sortedByCityNames = sortedArrayNamesSmallToLarge(cityAverages, "city")

    //on page load
    useEffect(() => {
        //add localstorage value to states
        const cityList = JSON.parse(localStorage.getItem(CITIES_KEY))
        const maxValue = JSON.parse(localStorage.getItem(MAX_VALUE_KEY))
        setCities(cityList)
        setmaxValue(maxValue)
    }, [])
    //add to localstorage on state change
    useEffect(() => {
        localStorage.setItem(CITIES_KEY, JSON.stringify(cities))
        localStorage.setItem(MAX_VALUE_KEY, JSON.stringify(maxValue))
    }, [cities])

    //add targeted city to state
    function handleAddCity() {
        const city = selectCityRef.current.value
        // const cityObject = verkoopPunten.find(item => city === item.city)
        const cityObject = formatCityData(verkoopPunten, city)
        const cityObject2 = {
            city: city,
            data: cityObject
        }
        setCities(
            [...cities, cityObject2]
        )
        const newMaxCityAantal = calculateMaxAantal(cityObject)
        if (maxValue < newMaxCityAantal) {
            setmaxValue(newMaxCityAantal)
        }
    }
    //clear the state with the city list
    function clearList() {
        setCities([])
        setmaxValue(0)
    }

    return (
        <>
            {/* create form where you can add cities to the state */}
            <section className="barchart-container">
                <InformationPopup>
                    <BarchartInformation />
                </InformationPopup>
                <h2>Aantal toegevoegde parkeerautomaten per jaar</h2>
                <form>
                    <select ref={selectCityRef}>
                        {sortedByCityNames.map(item => {
                            return <option key={item.city} value={item.city}>{item.city}</option>
                        }
                        )}
                    </select>
                    <button type="button" onClick={handleAddCity}>Add</button>
                    <button type="button" onClick={clearList}>Clear</button>
                </form>
                {cities.length === 0 && <ul className="zeroState">
                    <li>Voeg een stad toe om te vergelijken</li>
                </ul>}
                {/* return city visualisations of all cities in the state */}
                <ul>
                    {cities.map(item => {
                        return <City key={item.city} cityObject={item} maxValue={maxValue} />
                    })}
                </ul>
            </section>
        </>

    )
}



