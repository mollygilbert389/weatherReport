$(document).ready(function() {

    let cityName = document.querySelector('#cityName')
    let humidSpace = document.querySelector('#currentHumid')
    let tempSpace = document.querySelector('#currentTemp')
    let uvSpace = document.querySelector("#currentUV")
    let windSpace = document.querySelector("#currentWind")
    let iconSpace = document.querySelector("#icon")
    document.getElementById("searchBtn").addEventListener("click", searchBtn);
    

    let apiKey = "8caaadc8db15b925a1499e0138c3eb13"


    // const queryURL = "https://api.openweathermap.org/data/2.5/weather?q=london&appid=" + apiKey

    function searchBtn() {
        let city = cityName.value.toLowerCase().trim()
        // const queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey
        const queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=austin&units=imperial&appid=" + apiKey
        

        $.ajax({
        url: queryURL,
        method: 'GET'
        }).then(function (response) {
            console.log(response)

            let currentTemp = response.list[0].main.temp
            let currentHumid = response.list[0].main.humidity
            let coords = response.city.coord
            
            
            humidSpace.append("Current Humidity: ", currentHumid)
            tempSpace.append("Current Temperature: ", currentTemp)

            
            let lon = coords.lon
            let lat = coords.lat

            const secondQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat="+ lat + "&lon=" + lon + "&units=imperial&exclude={part}&appid=" + apiKey

            $.ajax({
                url: secondQueryURL,
                method: 'GET'
            }).then(function(response) {
                console.log(response)
                let currentUV = response.current.uvi
                uvSpace.append("Current UV: ", currentUV)
                
                

            }).catch(function (error){
                console.log(error)
            })

        }).catch(function (error) {
            console.log(error)
        })
    }




})

