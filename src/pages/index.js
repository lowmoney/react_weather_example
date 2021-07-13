import  *  as  React  from  "react"
import  { useState, useEffect }  from  "react"
// import styles from "../components/index.module.css"
import "../components/index.css"
import WeatherBlock from "./weather-block"
import loading_lottie from "../images/loading"

function  Index()  {

  const [city, setCity] = useState(null)
  const [windPoint, setWindPoint] = useState(null)
  const [temp, setTemp] = useState(0)
  const [weatherIcon,  setWeatherIcon] = useState(null)  

  const [load, setLoad] = useState(false)
  const [today, setToday] = useState(false)
  const [blocks, setBlocks] = useState(null)

  const [zip, setZip] = useState(null)

  // const loading_icon = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: loading_lottie,
  //   rendererSettings: {
  //       preserveAspectRatio: "xMidYMid slice"
  //   }
  // }

  useEffect(() => {
    try {
      fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip}&units=imperial&mode=json&appid=adcf3df86bbf69a63f68d9e73ae92860`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        console.log(typeof(zip))
        setCity(data.name)
        setTemp(Math.round(data.main.temp))
        setWeatherIcon(data.weather[0].icon)
        setWindPoint(data.wind.deg)
        setToday(true)
        setLoad(false)
      })
      .catch(error => console.log(error))
    } catch (error) {
      console.log(error)
    }

  }, [zip])

  useEffect(() => {
    function success (position) {
      const lon = position.coords.latitude;
      const lat = position.coords.longitude;
  
      fetch(`https://api.openweathermap.org/data/2.5/onecall?exclude=minutely,hourly,alerts&lat=${lat}&lon=${lon}&units=imperial&mode=json&appid=adcf3df86bbf69a63f68d9e73ae92860`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setCity(data.timezone)

        setTemp(data.current.temp)
        setWeatherIcon(data.current.weather[0].icon)
        setWindPoint(data.current.wind_deg)

        const daily_weather = data.daily

        const weather_blocks = daily_weather.map((daily_weather) => 
            <WeatherBlock key={data.dt} date={daily_weather.dt} city={data.timezone} wind={daily_weather.wind_deg} temp={daily_weather.temp.day} icon={daily_weather.weather[0].icon} high={daily_weather.temp.max} low={daily_weather.temp.min}></WeatherBlock>
        )

        setBlocks(weather_blocks)
        setLoad(true)
      })

    }

    function error() {
      console.log('something went wrong when etting location data')
    }

    if(!navigator.geolocation) {
      alert('geolocation is not supported')
    } else {
      navigator.geolocation.getCurrentPosition(success, error)

    }

  },[])

  return  (
    <>
      <div className="container">

        <div className="search-container">
          <input className="input-location" id="location" type="search" placeholder="enter zip code or city name"/>
          <button onClick={() => setZip(document.getElementById("location").value)}>click me</button>
        </div>

        {
          today && <WeatherBlock key={zip} city={city} wind={windPoint} temp={temp} icon={weatherIcon} high={false}/>
        }
      


        {
          load && blocks
        }

        
      </div>
    </>  
    
  )
}
export  default  Index