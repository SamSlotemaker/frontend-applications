import React, { useState, useRef, useEffect } from 'react';
import CirclePlot from './CirclePlot'
import './App.css'
import Cities from './Cities';
import Introduction from './Introduction';
const d3 = require('d3')

const root = document.getElementById('root')
const width = window.innerWidth
const heigth = window.innerHeight

const introHeading = "Welcome readers,"
const introduction = "we are here to look at some patterns Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non, quis numquam similique saepe, maiores ea voluptate corrupti ipsum consequatur harum reprehenderit voluptatum rem aliquid. Officia rem hic odio omnis optio, magni laboriosam tempore dicta delectus repellat quia quasi! Magni doloremque voluptates nihil officiis ex facilis cupiditate et consequatur rerum sunt, reprehenderit quibusdam iusto eum debitis sit quas veniam ducimus quidem are here to look at some patterns Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non, quis numquam similique saepe, maiores ea voluptate corrupti ipsum consequatur harum reprehenderit voluptatum rem aliquid. Officia rem hic odio omnis optio, magni laboriosam tempore dicta delectus repellat quia quasi! Magni doloremque voluptates nihil officiis ex facilis cupiditate et consequatur rerum sunt, reprehenderit quibusdam iusto eum debitis sit quas veniam ducimus quidem are here to look at some patterns Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non, quis numquam similique saepe, maiores ea voluptate corrupti ipsum consequatur harum reprehenderit voluptatum rem aliquid. Officia rem hic odio omnis optio, magni laboriosam tempore dicta delectus repellat quia quasi! Magni doloremque voluptates nihil officiis ex facilis cupiditate et consequatur rerum sunt, reprehenderit quibusdam iusto eum debitis sit quas veniam ducimus quidemrerum sunt, reprehenderit quibusdam iusto eum debitis sit quas veniam ducimus quidemrerum sunt, reprehenderit quibusdam iusto eum debitis sit quas veniam ducimus quidemrerum sunt, reprehenderit quibusdam iusto eum debitis sit quas veniam ducimus quidem"

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
      <Introduction heading={introHeading} text={introduction} />
      {cityAverages && <CirclePlot cityAverages={cityAverages} node={root} width={width - 100} height={heigth} />}
      {cityAverages && verkoopPunten && <Cities cityAverages={cityAverages} verkoopPunten={verkoopPunten} />}
    </>
  )
}

export default App;

async function getData(url) {
  const result = await fetch(url)
  const resultJSON = await result.json()
  return resultJSON
}