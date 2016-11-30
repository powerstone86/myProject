app.controller('tablesController', function($scope, $http) 
{
     var lang = navigator.language || navigator.userLanguage || navigator.systemLanguage;
     $scope.browserLang = lang;

	$scope.cities = []; // sparar en array för arrayObjekt som t.ex weather
    $scope.weatherSevenDaysCity = [];
    //$scope.weatherTwoWeeksCity = [];
    $scope.searchedCities = []; // sparar alla sökta städer som man sökt senast på

    $scope.query = {}; // innehåpller frågan för filtreringen
    $scope.queryBy = '$'; // default värde för filtrering

    $scope.propertyName = 'temperature'; // sorterar via temperatur
    $scope.reverse = true; // om man kan sortera högt och lågt, åt båda hållen

    $scope.showWeather14Days = false; // för att inte visa texten visa väder i 14 dagar

     $scope.sortType     = ''; // set the default sort type
     $scope.sortReverse  = false;  // set the default sort order
     $scope.searchQuery   = '';     // set the default search/filter term
     $scope.currentLanguage = $scope.english;    // default är engelska   
     $scope.cnt = "";   // för att visa 7 / 14 dagar väder  

    if($scope.browserLang == "sv" || $scope.browserLang == "sv-SE" || $scope.browserLang == "sv-se" )
	{
        $scope.browserLang = "sv";
		document.getElementById("title").innerHTML = "Väder 1.0";
       // document.getElementsByName('search14')[0].placeholder='Sökfält';
        document.getElementsByName('search7')[0].placeholder='Sökfält';
        document.getElementById('btnShowWeather').value = "Visa";
		$scope.swedish = { // scope objekt  
			title: "Väder 1.0",
			searchMainText: "Prognos",
            searchCity: "Sök på en stad:",
            fourteen: "Visa vädret för 14 dagar:",
            updated: "Uppdaterad:",
            weather14Days: "Vädret för 14 dagar",
            latestSearched: "Senast sökta:",
            tableWeek14: "Vecka",
            tableDate14: "Datum",
            tableWeather14: "Väder",
            tableMorning14: "Morgon",
            tableDay14: "Dag",
            tableNight14: "Natt",
            weather7Days: "Vädret för 7 dagar",
            tableWeek7: "Vecka",
            tableDate7: "Datum",
            tableWeather7: "Väder",
            tableMorning7: "Morgon",
            tableDay7: "Dag",
            tableNight7: "Natt",

		};
		$scope.currentLanguage = $scope.swedish; // sätter currentLanguage till svenska
	}
    else if($scope.browserLang == "en-US" || $scope.browserLang == "en-GB" || $scope.browserLang == "en")
	{
        $scope.browserLang = "en";
		document.getElementById("title").innerHTML = "Weather 1.0";
        //document.getElementsByName('search14')[0].placeholder='Searchfield';
        document.getElementsByName('search7')[0].placeholder='Searchfield';
		$scope.english = { 
			title: "Weather 1.0",
			searchMainText: "Forecast",
            searchCity: "Search for a city:",
            fourteen: "Show the weather for 14 days:",
            updated: "Updated:",
            weather14Days: "The weather for 14 days",
            latestSearched: "Latest searched:",
            tableWeek14: "Week",
            tableDate14: "Date",
            tableWeather14: "Weather",
            tableMorning14: "Morning",
            tableDay14: "Day",
            tableNight14: "Night",
            weather7Days: "The weather for 7 days",
            tableWeek7: "Week",
            tableDate7: "Date",
            tableWeather7: "Weather",
            tableMorning7: "Morning",
            tableDay7: "Day",
            tableNight7: "Night",
		};
		$scope.currentLanguage = $scope.english; 
	}
    else if($scope.browserLang == "fi")
	{
		document.getElementById("title").innerHTML = "Sää 1.0";
       //document.getElementsByName('search14')[0].placeholder='Hakualue';
        document.getElementsByName('search7')[0].placeholder='Hakualue';
		$scope.finnish = {   
			title: "Sää 1.0",
			searchMainText: "Prognoosi",
            searchCity: "Etsi kaupunki:",
            fourteen: "Näytä sää 14 päivää eteenpäin:",
            updated: "Päivitetty:",
            weather14Days: "Sää 14 päivää etenpäin",
            latestSearched: "Viimeksi etsitty:",
            tableWeek14: "Viikko",
            tableDate14: "Päiväys",
            tableWeather14: "Sää",
            tableMorning14: "Aamu",
            tableDay14: "Päivä",
            tableNight14: "Ilta",
            weather7Days: "Sää 7 päivää etenpäin",
            tableWeek7: "Viikko",
            tableDate7: "Päiväys",
            tableWeather7: "Sää",
            tableMorning7: "Aamu",
            tableDay7: "Päivä",
            tableNight7: "Ilta",
		};
		$scope.currentLanguage = $scope.finnish; 
	}
    else // other languages text is set to english
     $scope.currentLanguage = $scope.english;

      $scope.showAlert = function(ev) 
      {
        // Appending dialog to document.body to cover sidenav in docs app
        // Modal dialogs should fully cover application
        // to prevent interaction outside of dialog
        $mdDialog.show(
            //$mdDialog.alert();
            //.parent(angular.element(document.querySelector('#popupContainer')))
                /*.clickOutsideToClose(true)
                .title('This is an alert title')
                .textContent('You can specify some description text in here.')
                .ariaLabel('Alert Dialog Demo')
                .ok('Got it!')
                .targetEvent(ev)*/
        );
     };

    /*$scope.getIndex = function(index)
    {
        /*alert("Väderinformation " + "longitud = " + $scope.weatherSevenDaysCity.city.coord.lon + " " +
        "latitud = " + $scope.weatherSevenDaysCity.city.coord.lat);*/
        //var intIndex = parseInt(index);
        //console.log("Väderinformation " + $scope.weatherSevenDaysCity.city.list[1].pressure);
    //}

     $scope.toggle = function() 
     {
        $scope.showWeather14Days = !$scope.showWeather14Days; // växlar mellan true och false
       if($scope.showWeather14Days == true)
       {
            document.getElementById('info').style.display = 'block';
            if($scope.browserLang == "sv" || $scope.browserLang == "sv-SE" || $scope.browserLang == "sv-se")
            document.getElementById('btnShowWeather').value = "Göm";
            else if($scope.browserLang != "sv" || $scope.browserLang!= "sv-SE" || $scope.browserLang != "sv-se")
            document.getElementById('btnShowWeather').value = "Hide";

            $scope.cnt = 14;
            getSevenDaysWeatherForCurrentLanguage($scope.cityName.id, $scope.cnt);
            $scope.english.weather7Days = "The weather for 14 days";
            $scope.swedish.weather7Days = "Vädret för 14 dagar";
            $scope.finnish.weather7Days = "Sää 14 päivää etenpäin"; 
       }
       else if($scope.showWeather14Days == false)
       {
            document.getElementById('info').style.display = 'block';
            if($scope.browserLang == "sv" || $scope.browserLang == "sv-SE" || $scope.browserLang == "sv-se")
            document.getElementById('btnShowWeather').value = "Visa";
            else if($scope.currentLanguage != "sv" || $scope.currentLanguage != "sv-SE" || $scope.currentLanguage != "sv-se")
            document.getElementById('btnShowWeather').value = "Show";

            $scope.cnt = 7;
            getSevenDaysWeatherForCurrentLanguage($scope.cityName.id, $scope.cnt);
            $scope.english.weather7Days = "The weather for 7 days";
            $scope.swedish.weather7Days = "Vädret för 7 dagar";
            $scope.finnish.weather7Days = "Sää 7 päivää etenpäin";
       }
    };

    $scope.sortBy = function(propertyName) 
    {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
  };

	 $scope.showdetails = function(weatherID) 
	 {
        var found = $filter('filter')($scope.cities, {id: id}, true);
        if (found.length) {
            $scope.selected = JSON.stringify(found[0]);
        } else {
            $scope.selected = 'Not found';
        }
     }

     // hämtar alla städer i en rektangulär area(genom longitud och latitud koordinater)
     /*$scope.getCitiesSwedenLongLat = function()
     {
           $http.get("http://api.openweathermap.org/data/2.5/box/city?bbox=11,67,55,22&cluster=yes&lang=sv",
           {
               params:
               {
                   APPID: "eaa34486712b91567e84a4e143423fe6"
               }
           }
			).then(
			 function(response)
			{
				console.log(response);
                $scope.citiesOfSweden = response.data;
                //console.log("citiesOfSweden" + $scope.citiesOfSweden);
			},
			function(response)
			{
                console.log($scope.citiesOfSweden);
				console.log(response);			
			}
            );
         
     }*/

    function getSevenDaysWeatherForCurrentLanguage(cityID)
    {   
            $http.get("http://api.openweathermap.org/data/2.5/forecast/daily?&units=metric",
                {
                    params: {
                    id: cityID,
                    lang: $scope.browserLang,
                    cnt: $scope.cnt, // ändrar antalet för att visa 7 / 14 dagar
                    APPID: "eaa34486712b91567e84a4e143423fe6"
                    }
                }
                ).then(
                function(response)
                {
                    console.log(response);
                    $scope.weatherSevenDaysCity = response.data;                
                    console.log($scope.searchedCities);
                },
                function(response)
                {
                    console.log($scope.weatherSevenDaysCity);
                    console.log(response);			
                }
                );
    }

    /*function getSevenDaysWeather(cityID)
    {   
            $http.get("http://api.openweathermap.org/data/2.5/forecast/daily?&units=metric&lang=en&cnt=7",
                {
                    params: {
                    id: cityID,
                    APPID: "eaa34486712b91567e84a4e143423fe6"
                    }
                }
                ).then(
                function(response)
                {
                    console.log(response);
                    $scope.weatherSevenDaysCity = response.data;
                    $scope.searchedCities.push($scope.cityName.name); // lägger in stadens namn i arrayen
                },
                function(response)
                {
                    console.log($scope.weatherSevenDaysCity);
                    console.log(response);			
                }
                );
    }*/

    /*function getTwoDaysWeatherSwedish(cityID)
    {
         if(getSwedish() == "swedish")
		 {
            $http.get("http://api.openweathermap.org/data/2.5/forecast/daily?&units=metric&lang=sv&cnt=14",
                {
                    params: {
                    id: cityID,
                    APPID: "eaa34486712b91567e84a4e143423fe6"
                    }
                }
                ).then(
                function(response)
                {
                    console.log(response);
                    $scope.weatherTwoWeeksCity = response.data;
                    console.log($scope.weatherTwoWeeksCity);
                },
                function(response)
                {
                    console.log($scope.weatherTwoWeeksCity);
                    console.log(response);			
                }
                );
        }
        else 
        getTwoWeeksWeather(cityID);
    }*/

    /*function getTwoWeeksWeather(cityID)
    {   
        
        $http.get("http://api.openweathermap.org/data/2.5/forecast/daily?&units=metric&cnt=14",
			  {
				 params: {
                   id: cityID,
                   lang: $scope.browserLang,
				   APPID: "eaa34486712b91567e84a4e143423fe6"
				}
			  }
			).then(
			 function(response)
			{
				console.log(response);
                $scope.weatherTwoWeeksCity = response.data;
                console.log($scope.weatherTwoWeeksCity);
                $scope.getWeekNumber();
			},
			function(response)
			{
                console.log($scope.weatherTwoWeeksCity);
				console.log(response);			
			}
			);
    }*/

// hämtar cityID från en stad som man sökt på
$scope.getCityID = function(city)
{
     $http.get("http://api.openweathermap.org/data/2.5/weather?",
			  {
				 params: {
                   q: city,
				   APPID: "eaa34486712b91567e84a4e143423fe6"
				}
			  }
			).then(
			 function(response)
			{
				console.log(response);
                $scope.cityName = response.data;
                getSevenDaysWeatherForCurrentLanguage($scope.cityName.id, $scope.cnt);
                 $scope.searchedCities.push($scope.cityName.name); // lägger in stadens namn i arrayen
                //getTwoWeeksWeather($scope.cityName.id);
                $scope.dt = $scope.cityName;
                
			},
			function(response)
			{
                console.log($scope.cityName);
				console.log(response);			
			}
			);
}

$scope.lastUpdateDate = function(lastUpdateDate)
{
    var date = new Date(parseInt(lastUpdateDate)*1000).toLocaleDateString(lang);
    console.log(lastUpdateDate);
    return date;
}

});

// autofocus på sök textfältet, även om man uppdaterar sidan
app.directive('autofocus', [function() 
{
    return {
        restrict: 'A',
        link: function(scope, element) {
            element[0].focus();
        }
    };
}]);

app.directive('weatherRowData', function() 
{
  return {

    //restrict: 'EA',
    templateUrl: "weatherData.html",
    scope: {
      weatherData: '=', // "=" betyder ta emot objekt (som weatherData)
      index: "@" // "@" betyder ta emot sträng (index är ju bara ett värde, en sträng, inte ett objekt)
    },
    link: function(scope, element, attr) {

      //alert(scope.weatherData);
      scope.getWeather = function()
      {
          //alert(scope.weatherData.weather[scope.index].description);    ppproovhnajokdjhnke
          //alert(scope.index);
          console.log(scope.index);
          alert(scope.weatherData.weather[scope.index].description);
      }
    }
    /*controller: function($scope, $element) {

    }*/
    
  };

});

app.filter('secondsToDate',function() // en filter som filtrerar datum ifrån tiden(DT) 
{
    var options = {
    weekday: "long",
    year: "numeric",
    month: "2-digit",
    day: "numeric"
    }
    return function(secondsAsString)
    {
        var lang = navigator.language || navigator.userLanguage || navigator.systemLanguage;
        var date = new Date(parseInt(secondsAsString)*1000);
        var localeString = date.toLocaleDateString(lang,options);
        var d = localeString;
        return d;
    } 
}); 

app.filter('lastUpdate',function() // en filter som filtrerar datum ifrån tiden(DT) 
{
    var options = {
    weekday: "long",
    year: "numeric",
    month: "2-digit",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
    }
    return function(secondsAsString)
    {
        var lang = navigator.language || navigator.userLanguage || navigator.systemLanguage;
        var date = new Date(parseInt(secondsAsString)*1000);
        var localeString = date.toLocaleDateString(lang,options);
        var d = localeString;
        /*if($scope.getCityID() == null) // om man inte sökt på en stad
        return;*/
        return d;
    } 
}); 

app.filter('week',function($filter) // en filter som filtrerar datum ifrån tiden(DT) 
{
    return function(secondsAsString, index)
    {
        var currentLang = navigator.language || navigator.userLanguage || navigator.systemLanguage;
        var date = new Date(parseInt(secondsAsString)*1000);
        var weekText = "";
        //console.log($scope.reverse);
        if(date.getDay() != 1 && index != 0) // om dagen inte är måndag eller index inte är 0
        return;
        date.setDate(date.getDate()-1); // sätter första dagen till måndag
        var weekNumber = $filter('date')(date, 'w');
    
        if(currentLang == "sv" || currentLang == "sv-SE" || currentLang  == "sv-se")
            weekText = "Vecka:";
        else if(currentLang == "en" || currentLang == "en-US" || currentLang == "en-GB")
            weekText = "Week:";
        else if(currentLang == "fi")
            weekText = "Viiko:";
        else
        weekText = "Week:";

        var d = weekText + " " + weekNumber;
            
        return d;
    }  

});