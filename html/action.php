<?php

$action = $_GET['action'] ?? null;

switch($action){
	case 'unlock':
		echo file_get_contents('http://localhost:8080/unlock');
		break;
	case 'lock':
		echo file_get_contents('http://localhost:8080/lock');
		break;
	case 'timer':
		echo file_get_contents('http://localhost:8080/timer/15.0');
		break;
	case 'sweep':
		echo file_get_contents('http://localhost:8080/sweep/5');
		break;
	default:
		die('<img src="shirley.png">');
}
