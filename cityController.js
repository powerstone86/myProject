app.controller('cityController', function($scope, $http) 
{

	$scope.cities = []; // sparar en array för arrayObjekt som t.ex weather
    $scope.rectCities = [];
	$scope.showText = false; // visar inte diven showText

	var lang = navigator.language || navigator.userLanguage || navigator.systemLanguage;
	$scope.browserLang = lang;

	$scope.swedish = { // scope objekt  
			title: "Väder 1.0",
			searchMainText: "Sök på en stad",
			searchCity: "Sök på en stad:",
			todaysTemp: "Dagens väder/temperatur i",
			weatherText: "och temperaturen ligger på",
			youNeedToSearch: "Du måste söka på en stad!"
		};
		$scope.english = { // scope objekt   sen skriv {{currentLanguage.WelcomeMessage}}
			title: "Weather 1.0",
			searchMainText: "Search for a city",
			searchCity: "Search for a city:",
			todaysTemp: "Todays weather in",
			weatherText: "and the temperature is at",
			youNeedToSearch: "You must search for a city!"
		};
		$scope.finnish = { // scope objekt   sen skriv {{currentLanguage.WelcomeMessage}}
			title: "Sää 1.0",
			searchMainText: "Etsi kaupunki",
			searchCity: "Etsi kaupunki:",
			todaysTemp: "Päivän säätieto",
			weatherText: "ja lämpötila on",
			youNeedToSearch: "Pitää etsiä kaupunki!"
		};
		

	if($scope.browserLang == "sv" || $scope.browserLang == "sv-SE" || $scope.browserLang == "sv-se")
	{
		$scope.browserLang = "sv";
		//document.querySelector("html").setAttribute("lang", "sv");
		document.getElementById("title").innerHTML = "Väder 1.0";
		$scope.currentLanguage = $scope.swedish; // sätter currentLanguage till svenska
		
	}
	else if($scope.browserLang == "en-US" || $scope.browserLang == "en-GB" || $scope.browserLang == "en")
	{
		$scope.browserLang = "en";
		document.getElementById("title").innerHTML = "Weather 1.0";
		
		$scope.currentLanguage = $scope.english; // sätter currentLanguage till svenska
	}
	else if($scope.browserLang == "fi") // om språket inte är engelska, svenska eller finska sätt som engelska 
	{
		document.getElementById("title").innerHTML = "Sää 1.0";
		$scope.currentLanguage = $scope.finnish;
	}
	else // om språket inte är svenska, engelska eller finska
		$scope.currentLanguage = $scope.english;

	/*function getSwedish()
	{
		return $scope.languageSwedish
	}*/

	 /*$scope.showdetails = function(weatherID) 
	 {
		var found = $filter('filter')($scope.cities, {id: id}, true);
		if (found.length) {
			$scope.selected = JSON.stringify(found[0]);
		} else {
			$scope.selected = 'Not found';
		}
	 }*/

	/*$scope.getCitySwedish = function(cityName)
	{
		if(getSwedish() == "swedish")
		{
			$http.get("http://api.openweathermap.org/data/2.5/weather?&units=metric&type=accurate&lang=sv",
			  {
				 params: {
                   q: cityName,
				   APPID: "eaa34486712b91567e84a4e143423fe6"
				}
			  }
			).then(
			 function(response)
			{
				console.log(response);
                $scope.cities = response.data;
				$scope.showText = true;
				document.getElementById('info').style.display = 'block';
			},
			function(response)
			{
                console.log($scope.cities);
				console.log(response);	
				$scope.bool = false;
				$scope.showText = false;		
			}
			);
			
		else
		$scope.getCity(cityName);
	}*/

	$scope.getCity = function(cityName)
	{		
			$http.get("http://api.openweathermap.org/data/2.5/weather?&units=metric&type=accurate",
			  {
				 params: {
                   q: cityName,
				   lang: $scope.browserLang,
				   APPID: "eaa34486712b91567e84a4e143423fe6"
				}
			  }
			).then(
			 function(response)
			{
				console.log(response);
				//$scope.cities = response.data;
                $scope.cities = response.data;
				$scope.showText = true;
				document.getElementById('info').style.display = 'block';
			},
			function(response)
			{
				//console.log($scope.cities);
                console.log($scope.cities);
				console.log(response);	
				$scope.bool = false;
				$scope.showText = false;		
			}
			);
	}

    /*$scope.changedCityValue = function(cityID) 
	{		
		$scope.selectedCityID = cityID;
		console.log($scope.selectedCityID);
	}*/

    /*function getRectCity(rect)
    {
        
        $http.get("http://api.openweathermap.org/data/2.5/box/city?bbox=12,32,15,37,10&cluster=yes&lang=sv",
			  {
				 params: {
				   APPID: "eaa34486712b91567e84a4e143423fe6"
				}
			  }
			).then(
			 function(response)
			{
				console.log(response);
                $scope.rectCities = response.data;
			},
			function(response)
			{
                console.log($scope.rectCities);
				console.log(response);			
			}
			);
    }*/

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