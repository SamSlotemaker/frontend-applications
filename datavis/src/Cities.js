import React, { useState, useEffect } from 'react'

export default function Cities() {

    const geoVerkoopPuntenURL = 'https://gist.githubusercontent.com/SamSlotemaker/d11dd2741cfbaf8f64ac72b0c200685a/raw/48058e82f20483c1d6c94071ac26c585989dbd02/stadsGemiddelden.json'
    const [cities, setCities] = useState([])

    //returns promise with data from given url
    function getData(url) {
        return fetch(url)
    }

    useEffect(() => {
        const verkoopPunten = getData(geoVerkoopPuntenURL)
        verkoopPunten.then(result => result.json())
            .then(data => {
                console.log(data)
                const cities = data.map(item => item.city)
                setCities(cities)
            })
    }, [])

    return (
        <div>
            {cities.map(item => {
                return <p key={item}>{item}</p>
            })
            }
        </div>
    )
}
