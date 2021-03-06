import React, { useEffect, useRef, useState } from 'react'
import InformationPopup from './InformationPopup'
import VariableList from './VariableList'
const d3 = require('d3')

//This function will wrap all the logic for the Linechart component
function CirclePlot({ node, width, height, cityAverages }) {
    const data = cityAverages
    const parent = useRef(node)
    console.log("Creating CirclePlot component.", node, width, parent)
    const yStandard = 'gemiddeldeUurPrijs'

    useEffect(() => {
        createScatterPlot(yStandard, 'gemiddeldeGroeiPerJaar')
    })
    return <section ref={parent} className="svgParent">
        <InformationPopup>
            <VariableList />
        </InformationPopup>
    </section>

    function createScatterPlot(y, x) {

        function svgDoesExist() {
            const svgTest = d3.select('.svgParent svg');
            if (svgTest._groups[0][0]) {
                return true;
            }
        }
        if (svgDoesExist()) {
            return;
        }


        const svg = d3.select(parent.current)
            .append("svg").attr("width", width).attr("height", height);

        //globale variabelen voor functies
        let xScale;
        let yScale;
        let xAxis;
        let yAxis;
        let yAxisG;
        let xAxisG;

        const circleRadius = 10
        const graphTitle = 'Vermogen ten opzichten van groei in parkeer automaten'
        const margin = {
            top: 70,
            right: 120,
            bottom: 80,
            left: 140
        }
        const pixelStep = "18"
        let pixelOffsetY;
        let pixelOffsetX;
        let maxDragDistance = 120;

        //bereken maximale lengtes van grafiek
        const innerWidth = width - margin.left - margin.right
        const innerHeight = height - margin.top - margin.bottom

        //cip path maken zodat bolletjes niet buiten de assen komen
        svg.append("defs").append("clipPath")
            .attr("id", "clip")
            .append("rect")
            .attr("width", innerWidth)
            .attr("height", innerHeight);

        let xVar = x
        let yVar = y

        //callback functions die loopen over de waardes
        const xValue = d => d[xVar]
        const yValue = d => d[yVar]
        //render de chart
        var zoom = d3.zoom()
            .scaleExtent([1, 20])
            .extent([
                [0, 0],
                [width, height]
            ])
            .on("zoom", zoomed)
        svg.call(zoom);

        //haal propertynames uit de data voor de filteropties
        let propertyNames = Object.getOwnPropertyNames(data[0])
        let propertyNamesWithoutCity = propertyNames.slice(1, 6)
        let yFields = propertyNamesWithoutCity

        console.log(propertyNames)
        //creeer groep voor grafiek
        const g = svg.append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`)
        //title toevoegen
        g.append('text')
            .attr('y', -40)
            .text(graphTitle)

        //initiele setup
        setupScales()
        setupInput(yFields)
        setupAxis()

        //creer aparte groep voor de getekende punten met een clip path
        var points_g = g.append("g")
            .attr("clip-path", "url(#clip)")
            .classed("points_g", true);
        var points;
        //roep 1 keer aan bij laden grafiek
        selectionChangedY()

        //initieren van de x- en yScale
        function setupScales() {
            xScale = d3.scaleLinear()
                .domain(d3.extent(data, xValue)) //extent retured array met berekende min en max
                .range([0, innerWidth])
                .nice()

            yScale = d3.scaleLinear()
                .domain([d3.max(data, yValue), d3.min(data, yValue)])
                .range([0, innerHeight])
                .nice()
        }
        //initieren van de x- en yAxis
        function setupAxis() {
            xAxis = d3.axisBottom(xScale)
                .tickSize(-innerHeight)
                .tickPadding(15)

            //creer axis
            yAxis = d3.axisLeft(yScale)
                .tickSize(-innerWidth)
                .tickPadding(15)
            yAxisG = g.append('g')

            //toevoegen van label aan Y-as
            yAxisG.append('text')
                .attr('fill', 'white')
                .attr('class', 'axis-label')
                .attr('transform', `rotate(-90)`)
                .text(yVar)
                .attr('y', -50)
                .attr('x', -innerHeight / 2)
                .attr('text-anchor', 'middle')

            //voeg groep toe en creer yas label
            xAxisG = g.append('g')
                .call(xAxis)
            xAxisG
                .attr('transform', `translate(0, ${innerHeight})`)
                .selectAll('.domain').remove()

            //toevoegen van legenda aan X-as
            xAxisG.append('text')
                .attr('y', 50)
                .attr('x', innerWidth / 2)
                .attr('fill', 'white')
                .attr('class', 'axis-label')
                .text(xVar)
        }
        //wordt aangeroepen wanneer select element veranderd
        function selectionChangedY() {
            //verwijder een bestaande error message

            //this is the form element, zet naar standaard wanneer er geen change is uitgevoerd (eerste keer)
            yVar = this ? this.value : yVar
            //geef een error message wanneer de gekozen Y-as gelijk is aan de X-as
            if (checkSameAxis()) {
                return;
            }
            yScale.domain([d3.max(data, yValue), 0]) //nieuw domain maken

            //call nieuwe Y-as
            yAxisG.call(yAxis)
            yAxisG.selectAll('.domain').remove()
            //update y-as label
            yAxisG.select('text').text(yVar)

            //selecteer alle circles in parent element 'points_g'
            points = points_g.selectAll('circle').data(data)
            //update selection
            points.transition().attr('cy', d => yScale(yValue(d)))
            //enter selection
            points = points.enter().append('circle')
                .on('mouseover', mouseOverEvent)
                .on('mouseout', mouseOutEvent)
                .attr('cy', d => yScale(yValue(d))) //y attribute wordt geset voor ieter item
                .attr('cx', d => xScale(xValue(d))) //x attribute wordt geset voor ieter item
                .attr('r', circleRadius) //circle radius
                .attr('fill', 'white')
            //exit selection
            points.exit().remove()
        }
        //setup input formulier
        function setupInput(yFields, xFields) {

            d3.select(parent.current)
                .append('form')
                .append('select')
                .text("Select a text value")
                .on('change', selectionChangedY)
                .selectAll('option')
                .data(yFields)
                .enter()
                .append('option')
                .attr('value', d => d)
                .text(d => "Y-as: " + d)
                .property("selected", d => d === yVar)
        }
        //zoomed wordt uitgevoerd op het scrollevent
        function zoomed(e) {
            //create max transform distance, snap back when dragged too far
            checkMaxDragDistance(e)
            // create new scale objects based on event
            var new_xScale = e.transform.rescaleX(xScale);
            var new_yScale = e.transform.rescaleY(yScale);
            // update axes
            xAxisG.call(xAxis.scale(new_xScale));
            yAxisG.call(yAxis.scale(new_yScale));
            //update points
            points = points_g.selectAll('circle').data(data)
            points
                .attr('cx', (d) => new_xScale(xValue(d)))
                .attr('cy', (d) => new_yScale(yValue(d)));
        }
        //maximale drag distance waarna de grafiek terugschiet naar een begint punt
        function checkMaxDragDistance(e) {
            //enkel wanneer niet ingezoomd
            if (e.transform.k == 1) {
                if (e.transform.x > maxDragDistance) {
                    e.transform.x = 20
                }
                if (e.transform.y < -maxDragDistance) {
                    e.transform.y = -20
                }
            }
        }
        function checkSameAxis() {
            d3.select('.error').remove()
            if (yVar == xVar) {
                d3.select('form').append('text')
                    .text('Het heeft weinig zin om dezelfde assen te kiezen!')
                    .classed('error', true)
                return true;
            }
        }
        //mouseover event
        function mouseOverEvent(d, i) {
            //verwijder alle niet letter en numerieke charachters als id's
            let city = i.city;

            let id = city.replace(/[\W_]+/g, "")
            //vergroot circle radius * 2 en kleur oranje
            d3.select(this).transition().attr('r', circleRadius * 2)
                .attr('fill', 'orangered')
            //verplaats hover informatie naar linksboven wanneer je je op de rand van de grafiek bevindt
            if (d.offsetX > innerWidth - innerWidth / 4) {
                pixelOffsetX = 150;
            } else {
                pixelOffsetX = -10;
            }
            if (d.offsetY > (innerHeight - innerHeight / 4)) {
                pixelOffsetY = 60;
            } else {
                pixelOffsetY = -10;
            }

            //toevoegen van labels op hover
            addHoverLabels(d, i, id)
        }
        //mouseout event
        function mouseOutEvent(d, i) {
            //verwijder alle niet letter en numerieke charachters als id's
            let city = i.city;
            let id = city.replace(/[\W_]+/g, "");
            d3.select(this).transition().attr('r', circleRadius) //radius naar normaal
                .attr('fill', 'white')
            removeHoverLabels(d, id)
        }
        function addHoverLabels(d, i, id) {
            //toevoegen hover informatie
            svg.append('text')
                .attr('id', "t" + id)
                .attr('x', d.offsetX - pixelOffsetX)
                .attr('y', d.offsetY - pixelOffsetY)
                .text(`${i.city}`)
            svg.append('text')
                .attr('id', "t" + id + '1')
                .attr('x', d.offsetX - pixelOffsetX)
                .attr('y', d.offsetY - pixelOffsetY + pixelStep * 1)
                .text(`Gemiddeld vermogen: ${i.GemiddeldVermogenPlaats}`)
            svg.append('text')
                .attr('id', "t" + id + '2')
                .attr('x', d.offsetX - pixelOffsetX)
                .attr('y', d.offsetY - pixelOffsetY + pixelStep * 2)
                .text(`Gemiddelde uur prijs: ${i.gemiddeldeUurPrijs}`)
            svg.append('text')
                .attr('id', "t" + id + '3')
                .attr('x', d.offsetX - pixelOffsetX)
                .attr('y', d.offsetY - pixelOffsetY + pixelStep * 3)
                .text(`gemiddelde groei per jaar: ${i.gemiddeldeGroeiPerJaar}`)
        }
        function removeHoverLabels(d, id) {
            d3.select("#t" + id).remove() //verwijder toegevoegd label
            d3.select("#t" + id + '1').remove() //verwijder toegevoegd label
            d3.select("#t" + id + '2').remove() //verwijder toegevoegd label
            d3.select("#t" + id + '3').remove() //verwijder toegevoegd label

        }
    }
}
export default CirclePlot