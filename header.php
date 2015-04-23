<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Brain Massage</title>
	
	<meta property="og:title" content="Brain Massage" />
	<meta property="og:url" content="http://www.vamoss.com.br/publico/brain/" />
	<meta property="og:description" content="Use your JavaScript programming skills to win challenges against opponents." />
	<meta property="fb:app_id" content="819647358121261" />
	<meta property="og:locale" content="en_US" />
	<meta property="article:author" content="https://www.facebook.com/carlos.oliveira.junior" />
	<meta property="article:publisher" content="https://www.facebook.com/pages/Vamoss/182778015085817" />
	<meta property="og:image" content="http://www.vamoss.com.br/publico/brain/design/banner.gif" />
	
	<link rel="apple-touch-icon" sizes="57x57" href="design/apple-icon-57x57.png">
	<link rel="apple-touch-icon" sizes="60x60" href="design/apple-icon-60x60.png">
	<link rel="apple-touch-icon" sizes="72x72" href="design/apple-icon-72x72.png">
	<link rel="apple-touch-icon" sizes="76x76" href="design/apple-icon-76x76.png">
	<link rel="apple-touch-icon" sizes="114x114" href="design/apple-icon-114x114.png">
	<link rel="apple-touch-icon" sizes="120x120" href="design/apple-icon-120x120.png">
	<link rel="apple-touch-icon" sizes="144x144" href="design/apple-icon-144x144.png">
	<link rel="apple-touch-icon" sizes="152x152" href="design/apple-icon-152x152.png">
	<link rel="apple-touch-icon" sizes="180x180" href="design/apple-icon-180x180.png">
	<link rel="icon" type="image/png" sizes="192x192"  href="design/android-icon-192x192.png">
	<link rel="icon" type="image/png" sizes="32x32" href="design/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="96x96" href="design/favicon-96x96.png">
	<link rel="icon" type="image/png" sizes="16x16" href="design/favicon-16x16.png">
	
    <link href="css/bootstrap.min.css" rel="stylesheet">
	<link href="css/flipclock.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
	<link href="css/codemirror.css" rel="stylesheet">
	<link href="css/codemirror-theme-base16-light.css" rel="stylesheet">
	<link href="css/codemirror-addon-show-hint.css" rel="stylesheet">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
	
  </head>
  <body>
  <div id="startGame">
	<div class="login">
		<img src="design/logo.png" class="logo" /><br/><br/>
		<p>Use your JavaScript programming skills to win challenges against opponents.</p>
		<!--<fb:login-button scope="public_profile,email" onlogin="checkLoginState();"></fb:login-button>-->
		<div class="cube flip-to-top" onclick="fb_login()">
			<div class="default-state">
				<span>Enter</span>
			</div>
			<div class="active-state">
				<span>Play</span>
			</div>
		</div>
	</div>
	<div class="start">
		<div class="userImage"></div>
		Hi <span class="userName"></span>,<br/><br/>
		<a href="javascript:void(0)" class="button-link">Start a game</a>
	</div>
	<div class="loading">
		Waiting for your opponent...
	</div>
	<div class="youWin">
		<div class="userImage"></div>
		<span class="userName"></span> wins!<br/>
		<a href="javascript:void(0)" class="button-link">Start a new game</a>
	</div>
	<div class="youLose">
		<div class="opponentImage"></div>
		<span class="opponentName"></span> wins!<br/>
		<a href="javascript:void(0)" class="button-link">Start a new game</a>
	</div>
  </div>
  
	<!-- top navbar -->
    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
    	<div class="navbar-header">
           <span class="navbar-brand">Brain Massage</span>
    	</div>
    </nav>
      
    <div class="container-fluid">
      <div class="row row-offcanvas row-offcanvas-left">