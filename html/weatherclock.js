var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function clock(){
	var d = new Date();
	document.getElementById('time').innerText = (d.getHours() > 12 ? d.getHours() - 12 : (d.getHours() == 0 ? 12 : d.getHours())) + ':' + (d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()) + ':' + (d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()) + ' ' + (d.getHours() > 11 ? 'PM' : 'AM');
	document.getElementById('date').innerText = days[d.getDay()] + ', ' + months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
}

function setDynamicColor(){

	var d = new Date();
	// var secondsIntoDay = (d.getHours() > 12 ? 24 - d.getHours() : d.getHours()) * 3600 + d.getMinutes() * 60 + d.getSeconds();
	var secondsIntoDay = d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
	console.log("Current secondsIntoDay: ", secondsIntoDay);
	//secondsIntoDay = (3600*10);
	//console.log("Current secondsIntoDay: ", secondsIntoDay);

	//var background_midnightColor = [25, 25, 112];
	var background_midnightColor = [0, 0, 0];
	var background_noonColor = [0, 191, 255];
	var backgroundColor = [0, 0, 0];

	for(var i = 0; i < 3; ++i){
		//var background_range = Math.abs(background_midnightColor[i] - background_noonColor[i]);
		// backgroundColor[i] = background_midnightColor[i] + background_range * secondsIntoDay / 43200;

		if(secondsIntoDay < 3600*6) {
			console.log("Currently midnight to 6am");
			console.log("Modifier: 0");
			backgroundColor[i] = 0;
		} else if(secondsIntoDay >= (3600*6) && secondsIntoDay < (3600*12)) {
			console.log("Currently 6am to noon");
			console.log("Modifier: ", ( (secondsIntoDay-(3600*6)) / (3600*6) ));
			backgroundColor[i] = background_noonColor[i] * ( (secondsIntoDay-(3600*6)) / (3600*6) );
		} else if(secondsIntoDay >= (3600*12) && secondsIntoDay < (3600*17.5)) {
			console.log("Currently noon to 5:30pm");
			console.log("Modifier: ", ( (-1/(5.5*3600)) * (secondsIntoDay - (17.5*3600)) ) );
			backgroundColor[i] = background_noonColor[i] * ( (-1/(5.5*3600)) * (secondsIntoDay - (17.5*3600)) );
		} else if(secondsIntoDay >= 3600*17.5) {
			console.log("Currently 5pm to midnight");
			console.log("Modifier: 0");
			backgroundColor[i] = 0;
		}

	}

	document.getElementById('container').style.backgroundColor = 'rgb(' + backgroundColor[0] + ', ' + backgroundColor[1] + ', ' + backgroundColor[2] + ')';

}

var skycons = new Skycons({'color':'white'});

function updateWeather(icon = Skycons.SNOW){

	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'weather.php', true);
	xhr.responseType = 'json';
	xhr.onload = function(){
		var status = xhr.status;
		if(status === 200){
			document.getElementById('weather').innerHTML = xhr.response['summary'] + '<br>' +
				xhr.response['humidity'] + '% ' +
				xhr.response['wind'] + ' mph<br>' +
				'<i class="material-icons">arrow_downward</i>' + xhr.response['low'] + '&deg; ' +
				'<i class="material-icons">arrow_upward</i>' + xhr.response['high'] + '&deg; ' +
				xhr.response['temperature'] + '&deg; (' + xhr.response['feelsLike'] + '&deg;)';
			document.getElementById('weather-icon').style.backgroundSize = '0';
			if(xhr.response['icon'] !== 'shirley'){
				skycons.remove('weather-icon');
				skycons.add('weather-icon', xhr.response['icon']);
				skycons.play();
			}else{
				document.getElementById('weather-icon').style.backgroundSize = '64px';
				skycons.remove('weather-icon');
				skycons.play();
			}

		}else{
			console.error('Failed to update weather');
			document.getElementById('weather').innerText = 'look outside';
			document.getElementById('weather-icon').style.backgroundSize = '64px';
			skycons.remove('weather-icon');
			skycons.play();
		}
	};
	xhr.send();

}

clock();
setDynamicColor();
updateWeather();

setInterval(clock, 1000);
setInterval(setDynamicColor, 60000);
setInterval(updateWeather, 600000);