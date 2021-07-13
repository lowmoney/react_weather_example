import  *  as  React  from  "react"
import northeast from "../images/northeast.svg"
import southeast from "../images/southeast.svg"
import southwest from "../images/southwest.svg"
import northwest from "../images/northwest.svg"

export default function WindBlock (props) {

    function getWindDirection (degree) {
        if(degree>0 && degree<90){
            return (
                <div>
                    <img src={northeast} alt="North East wind direction" />
                    <span className="wind-direction">NE</span>
                </div>
            )
        }
        if(degree>90 && degree<180){
            return (
                <div>
                    <img src={northwest} alt="North West wind direction" />
                    <span className="wind-direction">NW</span>
                </div>
            )
        }
        if(degree>180 && degree<270){
            return (
                <div>
                    <img src={southwest} alt="South West wind direction" />
                    <span className="wind-direction">SW</span>
                </div>
            )
        }else{
            return (
                <div>
                    <img src={southeast} alt="South East wind direction" />
                    <span className="wind-direction">SE</span>
                </div>
            )
        }
    }



    return (
        <div className="wind-block">
            {getWindDirection(props.degree)}
        </div>
    )
}