import  *  as  React  from  "react"

export default function DateBlock(props) {

    const months = {
        0:"January",
        1:"February",
        2:"March",
        3:"April",
        4:"May",
        5:"June",
        6:"July",
        7:"August",
        8:"September",
        9:"October",
        10:"November",
        11:"December",
    }

    function getDate(date) {
        if(date){
            var currentDate = new Date(date*1000)
            let cDay = currentDate.getDate()
            let cMonth = months[currentDate.getMonth()]
            let cYear = currentDate.getFullYear()

            return <span>{cMonth} {cDay}, {cYear}</span>
        }else {
            let currentDate = new Date()
            let cDay = currentDate.getDate()
            let cMonth = months[currentDate.getMonth()]
            let cYear = currentDate.getFullYear()
        
            return <span>{cMonth} {cDay}, {cYear}</span>
        }
    }

    return (
        <div className="date">
            {getDate(props.date)}
        </div>
    )
}