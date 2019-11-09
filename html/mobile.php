<?php

header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

/*if($_SERVER['REMOTE_ADDR'] != '127.0.0.1' && $_SERVER['REMOTE_ADDR'] != '::1'){
	header('Location: http://www.shirleyannjackson.biz');
	die('Error: Failed to redirect to shirley');
}*/

?>
<!DOCTYPE html>
<html>
	<head>
		<title>Mobile</title>
		<link rel="stylesheet" type="text/css" href="mobile.css">
		<link rel="icon" href="shirley-favicon.png">
		<meta charset="UTF-8">
	</head>
	<body>
		<div id="container">
			<div class="button" id="unlock" onclick="unlock()">
				<i class="material-icons">lock_open</i>
			</div>
			<div class="button" id="lock" onclick="lock()">
				<i class="material-icons">lock</i>
			</div>
			<div class="button" id="autolock" onclick="timed()">
				<i class="material-icons">timer</i>
			</div>
			<div class="button" id="sweep" onclick="sweep()">
				<i class="material-icons">sync</i>
			</div>
		</div>
		<script src="controls.js"></script>
	</body>
</html>