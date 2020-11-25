
//format city data to where you can use it in a bar chart
export function formatCityData(array, city) {
    const cityVerkoopPunten = filterArray(array, 'city', city)
    const cityVerkoopPuntenEnJaren = createArrayCityYears(cityVerkoopPunten)
    const countedDates = countItemsinArray(cityVerkoopPuntenEnJaren)
    const cityObject = {
        city: city,
        dates: countedDates
    }
    const arrayOfYears = []
    for (const key in countedDates) {
        arrayOfYears.push({
            jaar: key,
            aantal: countedDates[key]
        })
    }
    const sortedArrayOfYears = sortArrayLargeToSmall(arrayOfYears, 'jaar')
    console.log(sortedArrayOfYears)
    return arrayOfYears
}


//filter given array on given column and value
export function filterArray(array, column, value) {
    return array.filter(item => {
        return item[column] === value
    })
}

//create array with only the city and start year of the selling point
export function createArrayCityYears(array) {
    return array.map(item => {
        const datum = item.startdatesellingpoint
        const jaar = datum.slice(0, 4)
        return {
            city: item.city,
            jaar: jaar
        }
    })
}

//return an object with all years and thier quantitive values
export function countItemsinArray(array) {
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


//returns sorted array from large to small
export function sortArrayLargeToSmall(array, property) {
    let newArray = [...new Set(array)]
    //check of er een property is meegegeven voor sorteren van objecten
    if (typeof property == 'undefined') { //geen property meegegeven
        return newArray.sort((a, b) => {
            return b - a
        })
    }
    //wel property meegegeven
    return newArray.sort((a, b) => {
        return b[property] - a[property]
    })
}