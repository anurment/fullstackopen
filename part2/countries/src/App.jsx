import { useState, useEffect } from 'react'
import countryService from './services/countries'
import {Countries, CountryWDetails, Filter} from './components/Components'
const api_key = import.meta.env.VITE_OPEN_WEATHER_MAP

function App() {
  const [searchInput, setSearchInput] = useState('')
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState(null)
  const [weatherForecast, setWeatherForecast] = useState(null)
  const [filteredCountries, setFilteredCountries] = useState([])


  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  useEffect(() => {

    if(country){
      countryService
      .getWeatherData(country.capital, api_key)
      .then(weatherData => {
        setWeatherForecast(weatherData)
      })
      .catch(error => {
        console.log(error)
      })
    }
  }, [country])

  const handleFilterChange = (searchValue) => {
    setSearchInput(searchValue)
    if (searchInput.length === 0) {
      setFilteredCountries([])
      
    } else {
      const filteredData = countries.filter(country => country.name.common.toLowerCase().match(searchValue.toLowerCase()))
      if(filteredData.length === 1){
        setCountry(filteredData[0])
        setFilteredCountries([])
      } else {
        setFilteredCountries(filteredData)
        setCountry(null)
      }
    } 
  }
  
  const selectCountry = country => {
    setCountry(country)
    setFilteredCountries([])
    setSearchInput('')
  }

  return (
    <div>
      <Filter searchInput={searchInput} handleFilter={(e) => handleFilterChange(e.target.value)} />
      <CountryWDetails country={country} weatherData={weatherForecast} />
      <Countries countries={filteredCountries} handleBtn={selectCountry} />
    </div>
  )
}

export default App
