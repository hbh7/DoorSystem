<?php

header('Content-Type: application/json');

$curl = curl_init('https://api.darksky.net/forecast/YOURAPIKEYHERE/COORDS,COORDS?exclude=minutely,hourly,alerts,flags');
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
$data = json_decode(curl_exec($curl), true);
$code = curl_getinfo($curl, CURLINFO_HTTP_CODE);
curl_close($curl);

http_response_code($code);

$return = [];

$icon = $data['currently']['icon'];

$iconmap = [
	'clear-day' => 'CLEAR_DAY',
	'clear-night' => 'CLEAR_NIGHT',
	'rain' => 'RAIN',
	'snow' => 'SNOW',
	'sleet' => 'SLEET',
	'wind' => 'WIND',
	'fog' => 'FOG',
	'cloudy' => 'CLOUDY',
	'partly-cloudy-day' => 'PARTLY_CLOUDY_DAY',
	'partly-cloudy-night' => 'PARTLY_CLOUDY_NIGHT'
];

$return['icon'] = $iconmap[$data['currently']['icon']] ?? 'shirley';
$return['temperature'] = round($data['currently']['temperature']);
$return['feelsLike'] = round($data['currently']['apparentTemperature']);
$return['low'] = round($data['daily']['data'][0]['temperatureLow']);
$return['high'] = round($data['daily']['data'][0]['temperatureHigh']);
$return['humidity'] = $data['currently']['humidity'] * 100;
$return['wind'] = round($data['currently']['windSpeed']);
$return['summary'] = $data['currently']['summary'];

echo json_encode($return);
