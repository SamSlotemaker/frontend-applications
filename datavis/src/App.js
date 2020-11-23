import React, { useState, useRef, useEffect } from 'react';
import { SVGContainer } from './SVGContainer'
import CirclePlot from './CirclePlot'
import './App.css'
import Cities from './Cities';
import Introduction from './Introduction';
const d3 = require('d3')

const root = document.getElementById('root')
const width = window.innerWidth
const heigth = window.innerHeight
console.log(width)

const introHeading = "Welcome readers,"
const introduction = "we are here to look at some patterns Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non, quis numquam similique saepe, maiores ea voluptate corrupti ipsum consequatur harum reprehenderit voluptatum rem aliquid. Officia rem hic odio omnis optio, magni laboriosam tempore dicta delectus repellat quia quasi! Magni doloremque voluptates nihil officiis ex facilis cupiditate et consequatur rerum sunt, reprehenderit quibusdam iusto eum debitis sit quas veniam ducimus quidem are here to look at some patterns Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non, quis numquam similique saepe, maiores ea voluptate corrupti ipsum consequatur harum reprehenderit voluptatum rem aliquid. Officia rem hic odio omnis optio, magni laboriosam tempore dicta delectus repellat quia quasi! Magni doloremque voluptates nihil officiis ex facilis cupiditate et consequatur rerum sunt, reprehenderit quibusdam iusto eum debitis sit quas veniam ducimus quidem are here to look at some patterns Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non, quis numquam similique saepe, maiores ea voluptate corrupti ipsum consequatur harum reprehenderit voluptatum rem aliquid. Officia rem hic odio omnis optio, magni laboriosam tempore dicta delectus repellat quia quasi! Magni doloremque voluptates nihil officiis ex facilis cupiditate et consequatur rerum sunt, reprehenderit quibusdam iusto eum debitis sit quas veniam ducimus quidemrerum sunt, reprehenderit quibusdam iusto eum debitis sit quas veniam ducimus quidemrerum sunt, reprehenderit quibusdam iusto eum debitis sit quas veniam ducimus quidemrerum sunt, reprehenderit quibusdam iusto eum debitis sit quas veniam ducimus quidem"


function App() {
  return (
    <>
      <Introduction heading={introHeading} text={introduction} />
      <CirclePlot node={root} width={width - 100} height={heigth} />

      <Cities />
    </>
  )
}



export default App;
