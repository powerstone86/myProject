app.config(function($routeProvider) 
{
            $routeProvider
                    .when('/', {template : "<center><h1><p class='t'>{{currentLanguage.main}}</p></h1></center>"})
                    .when('/city', {
            templateUrl: 'city.html',
            controller: 'cityController'
        })
		 .when('/tables', {
            templateUrl: 'tables.html',
            controller: 'tablesController'
		})
		.otherwise({
            redirectTo: '/'
        });
});

app.controller('mainController', function($scope, $http) 
{
	var lang = navigator.language || navigator.userLanguage || navigator.systemLanguage;
	$scope.browserLang = lang;

	// splittar så man ser bara /bg för bulgaria istället för /en/bg
	var googleLanguage = readCookie('googtrans');
	if(googleLanguage == null)
	document.getElementById('del').disabled = true;

	var language = "/"+lang+"/"+lang;

	$scope.english = { // scope objekt   
			title: "Weather 1.0",
			mainHeader: "WeatherApp for the web",
			browserLanguage: "Browser language:",
			main: "Mainpage",
			city: "Search for a city",
			forecast: "Forecast",
			currentnWeather: "Todays weather in Enköping",
			todaysDate: "Todays date:",
			weatherText: "and the temperature is at",
			del: "Delete cookies"
		};
	$scope.swedish = { // scope objekt   sen skriv t.ex {{currentLanguage.title}}
			title: "Väder 1.0",
			mainHeader: "VäderApp för webben",
			browserLanguage: "Webbläsarens språk:",
			main: "Huvudsida",
			city: "Sök på en stad",
			forecast: "Prognos",
			currentnWeather: "Dagens väder i Enköping",
			todaysDate: "Dagens datum:",
			weatherText: "och temperaturen ligger på",
			del: "Radera kakor"
		};
	$scope.finnish = {   
			title: "Sää 1.0",
			mainHeader: "SääApplikatio verkkoon",
			browserLanguage: "Verkkoselaimen kieli:",
			main: "Pääsivu",
			city: "Etsi kaupunki",
			forecast: "Prognoosi",
			currentnWeather: "Päivän säätieto Enköpingissä",
			todaysDate: "Päiväys:",
			weatherText: "ja lämpötila on",
			del: "Poista keksit"
		};

		function addClassNoTranslationSwedish()
		{
			document.getElementById("mainHeader").className = "notranslate";
			/*document.getElementById("browserLanguage").className = "notranslate";
			document.getElementById("main").className = "notranslate";
			document.getElementById("city").className = "notranslate";
			document.getElementById("forecast").className = "notranslate";
			document.getElementById("currentnWeather").className = "notranslate";
			document.getElementById("todaysDate").className = "notranslate";
			document.getElementById("weatherText").className = "notranslate";
			document.getElementById("del").className = "notranslate";*/
		}
	
	if($scope.browserLang == "sv" || $scope.browserLang == "sv-SE" || $scope.browserLang == "sv-se")
	{
			//document.querySelector("html").setAttribute("lang", "sv");
			$scope.browserLang = "sv";
			document.getElementById("title").innerHTML = "Väder 1.0";
			addClassNoTranslationSwedish();
			
			
		$scope.currentLanguage = $scope.swedish; // sätter currentLanguage till svenska
		setLanguage();
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
		// översätter till de språk som webläsaren har t.ex fr, nl etc och anger hur
		// länge cookien ska vara tillgänglig

		// on page refresh delete cookie document.cookie = "name=; value=; expires=Thu, 01 Jan 1970 00:00:00 UTC";

	}
	else // om språket inte är svenska,engelska eller finska sätt standard till Engelska
	{
		$scope.currentLanguage = $scope.english;
	}
	//getCookie('googtrans');
	//setcookie('googtrans', language,'#googtrans(lang)'); 

	/*$scope.showDragable = function()
	{
		document.getElementById('draggable').style.display = "block";
	}
	$scope.closeDragable = function()
	{
		$("#draggable").removeAttr("style");
		document.getElementById('draggable').style.display = "none";
	}*/


	function readCookie(name)
	{
		var c = document.cookie.split('; '),
		cookies = {}, i, C;

		for (i = c.length - 1; i >= 0; i--) {
			C = c[i].split('=');
			cookies[C[0]] = C[1];
		}

		return cookies[name];
	}
	
	function setcookie(name, value)
	{
		/*if (days)
		{*/
			var date = new Date();
			var time = date.getTime();
			var expireTime = time +(30*1000);
  			date.setTime(expireTime);
			//date.setTime(date.getTime()+days*24*60*60*1000); 
			var expires = "; expires=" + date.toGMTString(); 
			console.log("cookie experies in: " + expires);
			document.cookie = name + "=" + value + expires + ";path=/";
		//}
		// delete cookie 

	} 

	$scope.deleteCookie = function(name)
	{
		//console.log(name);
		document.cookie = 'googtrans' + '=;Path=/;Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
		//document.cookie = name + '=;Path=/.;Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
		//$('.goog-te-combo').val('select language');
		var domain = '.kimsim.org';
		//setcookie('googtrans', -1, "path=/" + domain);
		setcookie('googtrans', '/""/""', '/', domain);
		//getCookie('googtrans');
		//setcookie('googtrans',language);
		console.log("cookie deleted");
		forceGet = true;
		//location.reload(forceGet);
	}

	function getCookie(name) 
	{
		var value = "; " + document.cookie;
		var parts = value.split("; " + name + "=");
		if (parts.length == 2) console.log("GetCookie: " + parts.pop().split(";").shift());
	}

	function setLanguage()
	{
		getCurrentWeatherForCurrentLanguage($scope.browserLang);
		$scope.currentDate = todaysDate($scope.browserLang);
	}

	var reload = false;
	var loc=""+document.location;
	loc = loc.indexOf("?reload=")!=-1?loc.substring(loc.indexOf("?reload=")+10,loc.length):"";
	loc = loc.indexOf("&")!=-1?loc.substring(0,loc.indexOf("&")):loc;
	reload = loc!=""?(loc=="true"):reload;

	function reloadPage()
	 {
    	if (!reload) 
        window.location.replace(window.location+"?reload=true");
	}

	if(googleLanguage != null)
	{
		var googleLang = readCookie('googtrans').slice(4);
		console.log("Language selected is: " + googleLang);
		getCurrentWeatherForCurrentLanguage(googleLang);
		$scope.currentDate = todaysDate(googleLang);
		document.getElementById('del').disabled = false;
		reloadPage();
	}
	else if(googleLanguage == null) // om man inte valt ett språk via google translate
	setLanguage();


	$scope.getTemperatureClass = function(temp)
	{
		if(temp < 1 && temp > -10) 
		return "coldTemperature"; // retunerar namn på en klass, som man kan använda i CSS
		if(temp < -9 && temp > -20)
		return "colderTemperature";
		if(temp < -19)
		return "coldestTemperature";

		if(temp > 0 && temp < 10)
		return "warmTemperature";
		if(temp > 9 && temp < 20)
		return "warmerTemperature";
	    if(temp > 19)
		return "warmestTemperature";
	}

	function todaysDate(dateLanguage)
	{
		 var options = {
   		 weekday: "long",
   		 year: "numeric",
   		 month: "2-digit",
   		 day: "numeric"
   		 }

		/*if(navigator.userAgent.indexOf("Safari") != -1) // om det är Safari
  	   {
       	 alert('Safari');
   	   }*/

		 var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;

		 if(isSafari == true)
		 {
			 //var dat = new Date().toLocaleDateString(dateLanguage,options);
		 }

		if((navigator.userAgent.indexOf("MSIE") != -1  || (!!document.documentMode == true )) // if IE ver > 10
		|| document.documentMode == false) // om IE inte är version 10
		{
			var d = new Date().toLocaleDateString(dateLanguage,options);
	
			/*if(dateLanguage == "sv")
			{
				var dat = new Date();
				var weekday = new Array(7);
				weekday[0]=  "söndag";
				weekday[1] = "måndag";
				weekday[2] = "tisdag";
				weekday[3] = "onsdag";
				weekday[4] = "torsdag";
				weekday[5] = "fredag";
				weekday[6] = "lördag";

				var thisWeekDay = weekday[dat.getDay()];
				var year = dat.getFullYear();
				var month =dat.getMonth()+1;
				var day = dat.getDate(); // hämtar dagen från 1-31
				var newDate = thisWeekDay + " " + "den" + " " + year + "-" + month + "-" + day;
				return newDate;
			}*/
			return d;
		}
		var date = new Date().toLocaleDateString(dateLanguage,options);
        return date; 
	}

	/*$scope.dragOptions = function(e)
	{
		start: function(e) {
		console.log("STARTING");
		},
		drag: function(e) {
		console.log("DRAGGING");
		},
		stop: function(e) {
		console.log("STOPPING");
		},
		container: 'container-id'
	}*/

	function getCurrentWeatherForCurrentLanguage(language)
	{
				$http.get("http://api.openweathermap.org/data/2.5/weather?&units=metric",
				{ 
					params: {
					id: "2716166",
					lang: language,
					APPID: "eaa34486712b91567e84a4e143423fe6"
					}
				}
				).then(
				function(response)
				{
					console.log(response);
					$scope.city = response.data;
				},
				function(response)
				{
					console.log($scope.city);
					console.log(response);			
				}
				);
	}
	
});