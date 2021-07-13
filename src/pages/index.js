import  *  as  React  from  "react";
import  { useState, useEffect }  from  "react";
import WeatherBlock from "../components/WeatherBlock";
import TodayWeatherBlock from "../components/TodayWeatherBlock";
import "../components/index.css";

function  Index()  {

  const [todayWeather, setTodayWeather] = useState(false);
  const [forecastWeatherBlocks, setForecastWeatherBlocks] = useState(null);
  const [localWeather, setLocalWeather] = useState(null);
  const [zip, setZip] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [errors, setErrors] = useState(false);

  function success (position) {
    let lon = position.coords.longitude;
    let lat = position.coords.latitude;

    fetch(`https://api.openweathermap.org/data/2.5/onecall?exclude=minutely,hourly,alerts&lat=${lat}&lon=${lon}&units=imperial&mode=json&appid=adcf3df86bbf69a63f68d9e73ae92860`)
    .then(res => res.json())
    .then(data => {
      let dailyWeather, weatherBlocks;

      dailyWeather = data.daily;

      weatherBlocks = dailyWeather.map((dailyWeather) => 
          <WeatherBlock key={dailyWeather.dt} date={dailyWeather.dt} city={data.timezone} wind={dailyWeather.wind_deg} temp={Math.floor(dailyWeather.temp.day)} icon={dailyWeather.weather[0].icon} high={dailyWeather.temp.max} low={dailyWeather.temp.min}/>
      )

      setForecastWeatherBlocks(weatherBlocks);
      setLoaded(true);
    })
    .catch((error) => setErrors('An error occured when trying to fetch the data form the weather API'));

  }

  function error() {
    setErrors('Unable to get your location :( Make sure geolocation is turned on. Look for the pin icon on the search bar and then reload the page!');
  }

  function zipCodeEvent(e){
    var parsedZip, zipCode;

    if (e.target.id === 'zip_code_button'){
      zipCode = document.getElementById('location').value;

      try {
        parsedZip = parseInt(zipCode);

        if (!isNaN(parsedZip)) {
          if(zipCode.length === 5) {
            setZip(document.getElementById('location').value);
            setErrors(false);
          } else {
            setErrors('the zip code needs to be length of 5');
          }
        } else {
          setErrors('the zip code needs to be a number');
        }
      } catch (error) {
        setErrors('zip code needs to be length of 5 and a number');
      }

    }

    if (e.target.id === 'location' && e.keyCode === 13){
      zipCode = e.target.value;
      try {
        parsedZip = parseInt(zipCode)

        if (!isNaN(parsedZip)) {
          if(zipCode.length === 5) {
            setZip(document.getElementById('location').value);
            setErrors(false);
          } else {
            setErrors('the zip code needs to be length of 5');
          }
        } else {
          setErrors('the zip code needs to be a number');
        }
      } catch (error) {
        setErrors('zip code needs to be length of 5 and a number');
      }
    }
  }

  useEffect(() => {
    if(!(zip == null)) {
      setTodayWeather(<TodayWeatherBlock zip={zip} key={zip}/>);
      setLoaded(false);
    }
    return setLocalWeather(false);
  }, [zip])

  useEffect(() => {
    if(localWeather) {
      if(!navigator.geolocation) {
        setErrors('geolocation is not supported! Look for the location pin icon on the search bar and change to allow.');
      } else {
        navigator.geolocation.getCurrentPosition(success, error);
      }
    }
    return setZip(null)
  },[localWeather])

  return  (
    <>
      <div className="container">

        <div className="search-container" onKeyUp={zipCodeEvent} onClick={zipCodeEvent} role="button" tabIndex={-1}>
          <input className="input-location" id="location" type="text" placeholder="enter zip code" minLength={5} maxLength={5}/>
          <button id="zip_code_button">Search</button>
        </div>

        {
          !errors && !loaded && todayWeather
        }
      
        {
          !errors && loaded && localWeather && forecastWeatherBlocks
        }

        {
          !errors ? null : <div style={{"marginTop":"5px"}}>{errors}</div>
        }

        {
          !localWeather ? <button style={{"marginTop":"5px"}} onClick={() => setLocalWeather(true)}>Click me to get the local weather</button> : null
        }

        
      </div>
    </>  
    
  )
}
export  default  Index