function action(action){
	var req = new XMLHttpRequest();
	req.open('GET', 'action.php?action=' + action, true);
	req.send();
}

function unlock(){
	action('unlock');
}

function lock(){
	action('lock');
}

function timed(){
	action('timer');
}

function sweep(){
	action('sweep');
}
