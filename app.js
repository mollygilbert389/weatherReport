$(document).ready(function() {

    let cityName = document.querySelector('.searchBar')
    let humidSpace = document.querySelector('#currentHumid')
    let tempSpace = document.querySelector('#currentTemp')
    let uvSpace = document.querySelector("#currentUV")
    let windSpace = document.querySelector("#currentWind")
    let iconSpace = document.querySelector("#icon")
    let cityNameSpace = document.querySelector("#cityNameSpace")
    let weekForcastSpace = document.querySelector("#fiveDayForcast")
    let currWeatherDesSpace = document.querySelector("#weatherDescription")
    let searchHistory = document.getElementById('#searchHistory')
    document.getElementById("searchBtn").addEventListener("click", searchBtn);
    let input = document.getElementById('cityName')
    input.addEventListener("keyup", enterBtn)
    let cityNames = localStorage.getItem("cityNames")
   
    
    function enterBtn(e){
        if (e.keyCode === 13) {
        document.getElementById("searchBtn").click()
        }
    };

    let apiKey = "8caaadc8db15b925a1499e0138c3eb13"

    function searchBtn() { 
        //clear form
        cityName.innerHTML = ''
        humidSpace.innerHTML = ''
        tempSpace.innerHTML = ''
        uvSpace.innerHTML = ''
        windSpace.innerHTML = ''
        iconSpace.innerHTML = ''
        cityNameSpace.innerHTML = ''
        weekForcastSpace.innerHTML = ''
        currWeatherDesSpace.innerHTML = ''


        let city = cityName.value.toLowerCase().trim()
        cityNameSpace.append("City: ", city)

        //sending to local storage
        localStorage.setItem("cityNames", city)
        console.log(cityNames)
        // searchHistory.append(cityNames)

        const queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + apiKey

        $.ajax({
        url: queryURL,
        method: 'GET'
        }).then(function (response) {
            console.log(response)
            const forcastObject = []
            let currentTemp = response.list[0].main.temp
            let currentHumid = response.list[0].main.humidity
            let coords = response.city.coord
            let currIcon = response.list[0].weather[0].icon
            let currWind = response.list[0].wind.speed
            let currWeatherDes = response.list[0].weather[0].description

            iconSpace.setAttribute("src", "http://openweathermap.org/img/wn/" + currIcon + "@2x.png")
            humidSpace.append("Current Humidity: ", currentHumid)
            tempSpace.append("Current Temperature: ", currentTemp)
            windSpace.append("Current Wind Speed: ", currWind)
            currWeatherDesSpace.append("Current Weather: ", currWeatherDes)
            
            let lon = coords.lon
            let lat = coords.lat
            let iconCode;

            const secondQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat="+ lat + "&lon=" + lon + "&units=imperial&exclude={part}&appid=" + apiKey

            $.ajax({
                url: secondQueryURL,
                method: 'GET'
            }).then(function(response) {
                console.log(response)
                let currentUV = response.current.uvi
                uvSpace.append("Current UV: ", currentUV)
                if (currentUV > 10) {
                    uvSpace.setAttribute("class", "")
                }

                let date;
                let mainWeatherDes;
                let temp;
                let humidity;
                let iconURL;

                
                let secondResponse = response.daily[1]
                let thirdResponse = response.daily[2]
                let fourthResponse = response.daily[3]
                let fifthResponse = response.daily[4]
                let firstResponse = response.daily[5]

                function findData(responses) {
                    date = responses.dt
                    date =  new Date(date * 1000).toDateString()
                    mainWeatherDes = responses.weather[0].description
                    temp = responses.temp.day
                    humidity = responses.humidity
                    iconCode = responses.weather[0].icon
                    iconURL = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png"
                    forcastObject.push({date, mainWeatherDes, temp, humidity, iconURL})
                }

                findData(secondResponse)
                findData(thirdResponse)
                findData(fourthResponse)
                findData(fifthResponse)
                findData(firstResponse)

                console.log(forcastObject)

                forcastObject.forEach(function(item){
                    let newDateDiv = document.createElement('div')
                    let newMainWeatherDiv = document.createElement('img')
                    let newWeatherDes = document.createElement('div')
                    let tempDiv = document.createElement('div')
                    let humidityDiv = document.createElement('div')
                    let containerDiv = document.createElement('div')
                    containerDiv.setAttribute('class', 'forcastCard')
                    newDateDiv.append(item.date)
                    newMainWeatherDiv.setAttribute("src", item.iconURL)
                    newWeatherDes.append(item.mainWeatherDes)
                    tempDiv.append("Temp: ", item.temp)
                    humidityDiv.append("Humidity: " ,item.humidity)
                    containerDiv.append(newDateDiv, newMainWeatherDiv, newWeatherDes, tempDiv, humidityDiv)
                    weekForcastSpace.append(containerDiv)
                })
              

            }).catch(function (error){
                console.log(error)
            })

        }).catch(function (error) {
            console.log(error)
        })

        input.value = ''
    }




})

