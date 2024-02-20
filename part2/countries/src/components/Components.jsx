const Countries = ({ countries, handleBtn }) => {
    if (countries.length === 0) {
        return
    }
    else if(countries.length > 10) {
        return(<div>Too many matches, spesify another filter</div>)
    }else {
        return(
            <div>
                <ul>    
                    {countries.map(country => 
                        <Country 
                            key={country.tld} 
                            country={country}
                            handleBtn={() => handleBtn(country)}   
                        />
                    )}
                </ul>  
            </div>  
        )
    }  
}
  
const Country  = ({country, handleBtn}) => (
    <li>
      {country.name.common} <button onClick={handleBtn}>show</button>
    </li>
)

const Languages = ({languages}) => {
    return(
        <ul>
            {Object.values(languages).map(language => 
                <li key={language}>{language}</li>
            )}
        </ul>
    )
}

const WeatherData = ({weatherData}) => {
    //console.log('WeatherData components')
    //console.log(weatherData)
    if (weatherData){
        return(
        <div>
            <p>temperature {weatherData.main.temp} Celsius </p>
            <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}></img>
            <p>wind {weatherData.wind.speed} m/s</p>
        </div>
        )
    } else {
        return(<div>No weather data available</div>)
    }
} 

const CountryWDetails = ({country, weatherData}) => {
    if(country){
        return(   
            <div>
                <h1>{country.name.common}</h1>
                    <p>capital {country.capital}</p>
                    <p>area {country.area}</p>
                <h3>languages:</h3>
                    <Languages languages={country.languages}/>    
                <img src={country.flags.png}></img>
                <h2>Wearther in {country.capital}</h2>
                <WeatherData weatherData={weatherData}/>
            </div> 
        )
    } else {
        return null
    }
}

const Filter = (props) => (  
    <div>
      find countries
      <input type='text'
        value={props.searchInput}
        onChange={props.handleFilter}
      />
    </div>
)

export {Countries, CountryWDetails, Country, Filter, WeatherData}