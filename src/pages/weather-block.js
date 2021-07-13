import  *  as  React  from  "react"
import  { useState }  from  "react"
import DateBlock from "../components/date-block"
import WindBlock from "../components/wind-block"


export default function WeatherBlock (props) {

    const date = props.date ? props.date:null

    // imperial is zero and metric is one
    const [unit, setUnit] = useState(0)
    const [temprature, setTemprature] = useState(props.temp)

    const [high, setHigh] = useState(false)
    const [low, setLow] = useState(false)

    function unitChange() {
        if (unit === 0) {
            setUnit(1)
            const celsius = (temprature-32)*(5/9)
            setTemprature(Math.round(celsius))

            if(high && low) {
                const highCelsius = (high-32)*(5/9)
                const lowCelsius = (low-32)*(5/9)
                setHigh(Math.round(highCelsius))
                setLow(Math.round(lowCelsius))
            }
        } else {
            setUnit(0)
            const fahrenheit = (temprature * (9/5) +32)
            setTemprature(Math.round(fahrenheit))

            if(high && low){
                const highfahrenheit = (high * (9/5) +32)
                const lowfahrenheit = (low * (9/5) +32)
                setHigh(Math.round(highfahrenheit))
                setLow(Math.round(lowfahrenheit))
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
                    <img src={`http://openweathermap.org/img/wn/${props.icon}@2x.png`} alt="" />
                </div>
                </div>
    
                <div className="weather-card-right-panel">
                <div className="temp-block">
                    <span>{temprature}&deg;</span>

                    {high &&
                    <span className="high-low-temp">{high}&deg; / {low}&deg;</span>
                    }
        
                    <WindBlock degree={props.wind}/>
        
                    <div className="unit-block">
                        <button onClick={unitChange}>{(unit === 1) ? "metric" :"imperial" }</button>
                    </div>
                </div>
                </div>
            
            </div>
          
        </div>
    )
}