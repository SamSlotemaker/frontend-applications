import React, { useState, useEffect, useRef } from 'react'
import BarchartInformation from './BarchartInformation'
import City from './City'
import InformationPOPUP from './InformationPOPUP'
import { formatCityData, sortedArrayNamesSmallToLarge, calculateMaxAantal, calculateMaxAantalEnkel } from './modules/cleanData'

export default function Cities({ cityAverages, verkoopPunten }) {

    const CITIES_KEY = 'CITIES_LIST_KEY'
    const [cities, setCities] = useState([])
    const [maxValue, setmaxValue] = useState(0)
    const selectCityRef = useRef()
    //returns promise with data from given url

    useEffect(() => {
        const cityList = JSON.parse(localStorage.getItem(CITIES_KEY))
        setCities(cityList)
        // setmaxValue(calculateMaxAantal(cityAverages, verkoopPunten))
        setmaxValue(0)
    }, [])
    //add to local storage on loading page
    useEffect(() => {
        localStorage.setItem(CITIES_KEY, JSON.stringify(cities))
    }, [cities])


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
        const newMaxCityAantal = calculateMaxAantalEnkel(cityObject)
        if (maxValue < newMaxCityAantal) {
            setmaxValue(newMaxCityAantal)
        }
    }


    //clear the state with the city list
    function clearList() {
        setCities([])
        setmaxValue(0)
    }

    const sortedByCityNames = sortedArrayNamesSmallToLarge(cityAverages, "city")

    return (
        <>
            {/* create form where you can add cities to the state */}
            <section className="barchart-container">
                <InformationPOPUP>
                    <BarchartInformation />
                </InformationPOPUP>
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



