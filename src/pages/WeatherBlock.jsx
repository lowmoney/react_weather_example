import  *  as  React  from  "react"
import  { useState }  from  "react"
import DateBlock from "../components/date-block"
import WindBlock from "../components/wind-block"


export default function WeatherBlock (props) {

    const date = props.date ? props.date:null;
    const [unit, setUnit] = useState(0); // imperial is zero and metric is one, so intial load of temps are in F
    const [temprature, setTemprature] = useState(props.temp);
    const [high, setHigh] = useState(false);
    const [low, setLow] = useState(false);

    function unitChange() {
        let celsius, fahrenheit, highCelsius, lowCelsius, highFahrenheit, lowFahrenheit;

        if (unit === 0) {
            setUnit(1);
            celsius = (temprature-32)*(5/9);
            setTemprature(Math.round(celsius));

            if(high && low) {
                highCelsius = (high-32)*(5/9);
                lowCelsius = (low-32)*(5/9);
                setHigh(Math.round(highCelsius));
                setLow(Math.round(lowCelsius));
            }
        } else {
            setUnit(0);
            fahrenheit = (temprature * (9/5) +32);
            setTemprature(Math.round(fahrenheit));

            if(high && low){
                highFahrenheit = (high * (9/5) +32);
                lowFahrenheit = (low * (9/5) +32);
                setHigh(Math.round(highFahrenheit));
                setLow(Math.round(lowFahrenheit));
            }
        }
    }


    
    return (
        <div className="container">

            <div className="weather-card">
    
                <div className="weather-card-left-panel">
        
                <div className="city">
                    {props.city}
                </div>
        
                <DateBlock date={date}/>
        
                <div>
                    <img src={`http://openweathermap.org/img/wn/${props.icon}@2x.png`} alt="variable weather icon based on the current weather" />
                </div>
                </div>
    
                <div className="weather-card-right-panel">
                <div className="temp-block">
                    <span>{temprature}&deg;{(unit===0) ? "F" : "C"}</span>

                    {high &&
                    <span className="high-low-temp">{high}&deg; / {low}&deg;</span>
                    }
        
                    <WindBlock degree={props.wind}/>
        
                    <div className="unit-block">
                        <button title={(unit === 1) ? "click to change to imperial" : "click to change to metric"} className="weather-block" onClick={unitChange}>{(unit === 1) ? "imperial" :"metric" }</button>
                    </div>
                </div>
                </div>
            
            </div>
          
        </div>
    )
}