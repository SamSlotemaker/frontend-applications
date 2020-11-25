import React, { useState, useRef, useEffect } from 'react';
import CirclePlot from './CirclePlot'
import './App.css'
import Cities from './Cities';
import Introduction from './Introduction';
import getData from './modules/getData.js'
import ScrollButton from './ScrollButton'
import About from './About';
const d3 = require('d3')

const root = document.getElementById('root')
const width = window.innerWidth
const heigth = window.innerHeight

const introHeading = "De auto in de stad"
const introduction = "Parkeerdata kent vele richting en inzichten. Ik heb er voor gekozen om mijn te richten op het verschil in welvaart tussen bepaalde gebieden. Ik ben gaan kijken naar het verschil in welvaart per gebied en de parkeerdata. Ook heb ik gekeken of duurdere parkeergebieden meer terugkrijgen voor hun geld."

function App() {
  const [cityAverages, setcityAverages] = useState(null)
  const [verkoopPunten, setVerkoopPunten] = useState(null)
  const cityAveragesURL = 'https://gist.githubusercontent.com/SamSlotemaker/d11dd2741cfbaf8f64ac72b0c200685a/raw/48058e82f20483c1d6c94071ac26c585989dbd02/stadsGemiddelden.json'
  const geoVerkoopPuntenURL = 'https://gist.githubusercontent.com/SamSlotemaker/62fc5047562f522f21bd584605297a3e/raw/1645b201852ba7e368ebae45136d9bb69dae7907/verkoopPunten.json'

  //fechting data on loading page
  useEffect(() => {
    getData(cityAveragesURL).then(result => {
      setcityAverages(result)
    })
    getData(geoVerkoopPuntenURL).then(result => {
      setVerkoopPunten(result)
    })
  }, [])



  return (
    <>
      <ScrollButton scrollDirection={1} />
      <ScrollButton scrollDirection={2} />
      <Introduction heading={introHeading} text={introduction} />
      {cityAverages && <CirclePlot cityAverages={cityAverages} node={root} width={width - 100} height={heigth - 50} />}
      {cityAverages && verkoopPunten && <Cities cityAverages={cityAverages} verkoopPunten={verkoopPunten} />}
      <About />
    </>
  )
}
export default App;

