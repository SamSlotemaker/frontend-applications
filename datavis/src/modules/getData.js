export default async function getData(url) {
    const result = await fetch(url)
    const resultJSON = await result.json()
    return resultJSON
}
