import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'

const getAll = () => {
  const request = axios.get(`${baseUrl}/all`)
  return request.then(response => response.data)
}

const getOne = country => {
  const request = axios.get(`${baseUrl}/name/${country}`)
  return request.then(response => response.data)
}

const getCityData = async (city, api_key) => {
  const cityData = await axios
                      .get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${api_key}`)
                      .then(cityData => cityData.data )
                      .catch(error => {
                          console.log(error)
                      })
    return cityData
                    }
const getWeatherData = async (city, api_key) => {
    const cityData = await getCityData(city, api_key)
    const weatherData = axios                    
                        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${cityData[0].lat}&lon=${cityData[0].lon}&appid=${api_key}&units=metric`)
                        .then(weatherData => weatherData.data)
                        .catch(error => {
                            console.log(error)
                        })
    //console.log(weatherData)
    return weatherData
}

export default { 
  getAll: getAll, 
  getOne: getOne,
  getWeatherData, getWeatherData
}