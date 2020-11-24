import React, { useState, useEffect, useRef } from 'react'
import City from './City'

export default function Cities({ cityAverages, verkoopPunten }) {

    const CITIES_KEY = 'CITIES_LIST_KEY'
    const [cities, setCities] = useState([])
    const selectCityRef = useRef()
    //returns promise with data from given url

    useEffect(() => {
        const cityList = JSON.parse(localStorage.getItem(CITIES_KEY))
        setCities(cityList)
    }, [])
    //add to local storage on loading page
    useEffect(() => {
        localStorage.setItem(CITIES_KEY, JSON.stringify(cities))
    }, [cities])


    function handleAddCity() {
        const city = selectCityRef.current.value
        // const cityObject = verkoopPunten.find(item => city === item.city)
        const cityVerkoopPunten = filterArray(verkoopPunten, 'city', city)
        const cityVerkoopPuntenEnJaren = createArrayCityYears(cityVerkoopPunten)
        const countedDates = countItemsinArray(cityVerkoopPuntenEnJaren)
        const cityObject = {
            city: city,
            dates: countedDates
        }
        setCities(
            [...cities, cityObject]
        )
    }

    function clearList() {
        setCities([])
    }
    return (
        <>
            <form>
                <select ref={selectCityRef}>
                    {cityAverages.map(item => {
                        return <option key={item.city} value={item.city}>{item.city}</option>
                    }
                    )}
                </select>
                <button type="button" onClick={handleAddCity}>Add</button>
            </form>
            <ul>

                {cities.map(item => {
                    return <City cityObject={item} />
                })}
            </ul>
            <button onClick={clearList}>Clear</button>
        </>

    )
}

function filterArray(array, column, value) {
    return array.filter(item => {
        return item[column] === value
    })
}

function createArrayCityYears(array) {
    return array.map(item => {
        const datum = item.startdatesellingpoint
        const jaar = datum.slice(0, 4)
        return {
            city: item.city,
            jaar: jaar
        }
    })
}

function countItemsinArray(array) {
    const allYears = array.map(item => item.jaar)
    let allItems = [...new Set(allYears)] //maak array van alle unieke jaartallen
    console.log(allItems)
    let counter = {} //maak counter object dat later gevuld wordt
    allItems.forEach(item => {
        counter[item] = 0
    })

    for (let i = 0; i < array.length; ++i) { //loop over volledige array
        for (let j = 0; j < allItems.length; j++) { //loop over unieke jaartallen voor iedere waarde in volledige array
            if (array[i].jaar == allItems[j])
                counter[allItems[j]] += 1
        }
    }
    return counter;
}