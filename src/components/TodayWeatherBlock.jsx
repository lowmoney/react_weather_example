import  *  as  React  from  "react";
import  { useState, useEffect }  from  "react";
import WeatherBlock from "../components/WeatherBlock";

export default function TodayWeatherBlock(props) {
  const [city, setCity] = useState(null);
  const [windPoint, setWindPoint] = useState(null);
  const [temp, setTemp] = useState(0);
  const [weatherIcon,  setWeatherIcon] = useState(null);
  const [errors, setErrors] = useState(false);
  const [loaded, setLoaded] = useState(false);


  useEffect(() => {
      if(!(props.zip == null)) {
        try {
          fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${props.zip}&units=imperial&mode=json&appid=adcf3df86bbf69a63f68d9e73ae92860`)
          .then((res) => res.json())
          .then((data) => {
            setCity(data.name)
            setTemp(Math.round(data.main.temp))
            setWeatherIcon(data.weather[0].icon)
            setWindPoint(data.wind.deg)
            setLoaded(true)
            setErrors(false)
          })
          .catch(error => setErrors('An error with the weather API occured when trying to get the weather info with the zip code'));
        } catch (error) {
          setErrors('An error occured when trying to fetch the data form the weather API');
        }
      }
  
    }, [props.zip])
    
    return (
        <>
        {
            !errors && loaded && <WeatherBlock key={props.zip} city={city} wind={windPoint} temp={temp} icon={weatherIcon} high={false}/>
        }

        {
            !errors ? null : errors
        }
        </>
    )
}