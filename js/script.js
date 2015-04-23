function BrainMassage(){
	var DEBUG = true;
	var TEST = false;
	var SITE_URL = "http://www.vamoss.com.br/publico/brain/";
	var TIME_WAIT_ANSWER = 60;
	var TIME_SHOW_ANSWER = 15;
	var level = -1;
	var game = {};
	var parameter = 0;
	var user = {};
	var opponent = {};
	var editor;
	var getOpponentAnswerCount = 0;
	var match = 0;
	var diffs1 = [];
	var diffs2 = [];
	var results = [];
	var clock;
	var clockSave;


	function Game() {
		var id;
		var title;
		var description;
		var parametersTest;
		var parameters;
	}
	function ParameterTest() {
		var input;
		var output;
	}
	function User() {
		var id;
		var name;
		var image;
		var code;
	}

	function showMessage(type,msg){
		$( "#message" ).removeClass("alert-success");
		$( "#message" ).removeClass("alert-warning");
		$( "#message" ).removeClass("alert-danger");
		$( "#message" ).removeClass("alert-info");
		$( "#message" ).addClass("alert-"+type);
		
		$( "#message" ).html(msg);
		$( "#message" ).show( 500 ).delay( 5000 ).slideUp( 500 );
	}

	function selectParameter(index) {
		parameter = index;
		$( ".list-group a" ).removeClass("active");
		$($( ".list-group a" )[ index ]).addClass("active");
	}
	
	this.login = function(data){
		user = new User();
		user.id = data.id;
		user.name = data.name;
		$(".userName").text(user.name);
		showScreen("start");

		//login
		var url = SITE_URL + "api?action=login&id="+user.id+"&name="+user.name;
		$.ajax({
			url: url,
			context: document.body
		}).done(function(data) {
			if(DEBUG) console.log("url: " + url + "\ndata: " + data);
			var result = JSON.parse(data);
			if(result.status){
				user.image = result.image;
				$(".userImage").css("background-image", "url('images/" + user.image + "')");
				$(".userImage").show();
			}else{
				//TODO
				//falha no login
				//show error message or reload page
			}
		});

		$("#startGame .start a, #startGame .youWin a, #startGame .youLose a").click(function(){
			match = 0;
			findMatch();
		});

	}
	  
	function findMatch(){	
		showScreen("loading");
		
		//winners
		$( ".matches li" ).remove();
		
		var url;
		if(match){
			url = SITE_URL + "api?action=find&match="+match+"&user="+user.id;
		}else{
			url = SITE_URL + "api?action=start&user="+user.id;
		}

		$.ajax({
			url: url,
			context: document.body
		}).done(function(data) {
			if(DEBUG) console.log("url: " + url + "\ndata: " + data);
			var result = JSON.parse(data);
			if(result.status){
				match =  result.match;
				if(result.wait){
					setTimeout(findMatch,2000);
				}else{
					opponent = new User();
					opponent.id = result.opponentId;
					opponent.name = result.opponentName;
					opponent.image = result.opponentImage;
					$(".opponentName").text(opponent.name);
					$(".opponentImage").css("background-image", "url('images/" + opponent.image + "')");
					$(".opponentImage").show();
					
					hideScreens();
					level = -1;
					nextLevel();
				}
			}else{
				alert("Could not find a opponent right now.\nCall a friend to play together :)");
				showScreen("start");
			}
		});
	}

	function nextLevel(){
		level++;
		var url = SITE_URL + "api?action=level&level="+level+"&match="+match;
		$.ajax({
			url: url,
			context: document.body
		}).done(function(data) {
			if(DEBUG) console.log("url: " + url + "\ndata: " + data);
			var result = JSON.parse(data);
			if(result.status){
				var gameData = new Game();
				gameData.id = result.id;
				gameData.title = result.title;
				gameData.description = result.description;
				gameData.parameters = result.parameters;
				gameData.parametersTest = [];
				for(var i=0; i<result.parametersTest.length; i++){
					gameData.parametersTest[i] = new ParameterTest();
					gameData.parametersTest[i].input = result.parametersTest[i].input;
					gameData.parametersTest[i].output = result.parametersTest[i].output;
				}
				startGame(gameData);
			}else{
				endGame();
			}
		});
	}

	function startGame(g) {
		game = g;
		
		//ui
		editor.setOption("readOnly", false);
		$('.btn-run').show();
		$('#parametersPanel').slideDown("slow");
		$('#opponentPanel').slideUp("slow");
		$('#performancePanel').slideUp("slow");
		
		//header
		$('#challenge h1').text('');
		$('#challenge p').text('');
        $.each(game.title.split(''), function(i, letter){ 
            setTimeout(function(){
                $('#challenge h1').html(game.title.substr(0, i+1));
            }, 80*i+1000);
        });
		$.each(game.description.split(''), function(i, letter){ 
            setTimeout(function(){
                $('#challenge p').html(game.description.substr(0, i+1));
            }, 80*i+2500);
        });
		
		//parameters
		$( ".list-group a" ).remove();
		for(var i=0; i<game.parametersTest.length; i++){
			$( ".list-group" ).append( '<a href="javascript:void(0)" class="list-group-item">' + game.parametersTest[i].input + '</a>' );
		}
		selectParameter(0);
		
		//editor
		var resultVar = "result";
		if(game.parameters.split(",").length==1) resultVar = game.parameters;
		editor.setValue("function myFunction(" + game.parameters + ") {\n	\/\/ code goes here\n	return " + resultVar + ";\n}");
		
		//coutdown
		clockSave = true;
		clock.setTime(TIME_WAIT_ANSWER);
		clock.start();
	}

	function run(){
		try {
			user.code = editor.getValue();
			var code = user.code+"; myFunction(" + game.parametersTest[ parameter ].input + ")";
			var result = eval(code);
			if(JSON.stringify(result) == JSON.stringify(game.parametersTest[parameter].output)){
				$($( ".list-group a" )[ parameter ]).addClass("list-group-item-success");
				
				if(parameter==game.parametersTest.length-1){
					$( ".list-group a" ).removeClass("active");
					showMessage("success","Great! You passed all tests! Now wait for your opponent.");
				}else{
					selectParameter(parameter+1);
					run();
				}
			}else{
				showMessage("danger","Result is different. Expected: " + JSON.stringify(game.parametersTest[parameter].output));
			}
		} catch(err) {
			showMessage("danger",err);
		}
	}

	function saveAnswer(){
		if(TEST) compare();
		
		editor.setOption("readOnly", true);
		$('#opponentEditor').prop('disabled', true);
		$('.btn-run').hide();
		
		user.code = editor.getValue();
		
		var url = SITE_URL + "api?action=answer&game="+game.id+"&match="+match+"&user="+user.id+"&code="+encodeURIComponent(user.code);
		$.ajax({
			url: url,
			context: document.body
		}).done(function(data) {
			if(DEBUG) console.log("url: " + url + "\ndata: " + data);
			var result = JSON.parse(data);
			if(result.status){
				getOpponentAnswerCount = 0;
				getOpponentAnswer();
			}else{
				//TODO
				//tratar erro
			}
		});
	}

	function getOpponentAnswer(){
		var url = SITE_URL + "api?action=opponentAnswer&game="+game.id+"&match="+match+"&opponentId="+opponent.id;
		$.ajax({
			url: url,
			context: document.body
		}).done(function(data) {
			if(DEBUG) console.log("url: " + url + "\ndata: " + data);
			var result = JSON.parse(data);
			if(result.status){
				opponent.code = result.code;
				$('#opponentEditor').val(opponent.code);
				$('#parametersPanel').slideUp("slow");
				$('#opponentPanel').slideDown("slow");
				compare();
			}else{
				if(getOpponentAnswerCount<10){
					getOpponentAnswerCount++;
					setTimeout(getOpponentAnswer,1000);
				}else{
					endGame(true);
				}
			}
		});
	}

	function compare(){
		var code1;
		var code2;
		if(TEST){
			code1 = "function myFunction(value) {return value+1;}";
			code2 = "function myFunction(value) {return value+1;}";
		}else{
			code1 = user.code;
			code2 = opponent.code;
		}
		
		//console.log("code1: " + code1);
		//console.log("code2: " + code2);
		
		diffs1 = [];
		diffs2 = [];
		var compareResults = [];
		
		for(var i=0; i<game.parametersTest.length; i++){
			var result1;
			var result2;
			
			try {
				var code = code1+"; myFunction(" + game.parametersTest[ i ].input + ")";
				var start = +new Date();
				var result;
				for(var j=0;j<100;j++) result = eval(code);
				var end =  +new Date();
				diffs1[i] = [i, end - start];
				result1 = JSON.stringify(result) == JSON.stringify(game.parametersTest[i].output);
			} catch(err) {
				result1 = false;
				diffs1[i] = [i, 0];
			}
				
			try {
				var code = code2+"; myFunction(" + game.parametersTest[ i ].input + ")";
				var start = +new Date();
				var result;
				for(var j=0;j<100;j++) result = eval(code);
				var end =  +new Date();
				diffs2[i] = [i, end - start];
				result2 = JSON.stringify(result) == JSON.stringify(game.parametersTest[i].output);
			} catch(err) {
				result2 = false;
				diffs2[i] = [i, 0];
			}
			
			//console.log("result1: " + result1);
			//console.log("result2: " + result2);
			//console.log("diffs1: " + diffs1[i]);
			//console.log("diffs2: " + diffs2[i]);
			
			if(result1 && !result2){
				compareResults[i] = [i, 1];
			}else if(!result1 && result2){
				compareResults[i] = [i, -1];
			}else if(!result1 && !result2){
				compareResults[i] = [i, 0];
			}else{
				if(diffs1[i]<diffs2[i]){
					compareResults[i] = [i, 1];
				}else if(diffs1[i]>diffs2[i]){
					compareResults[i] = [i, -1];
				}else{
					compareResults[i] = [i, 0];
				}
			}
			//console.log("compareResults: " + compareResults[i][1]);
		}
		
		$('#performancePanel').slideDown("slow", function(){
			$.plot("#performance", [
				{ label: user.name, data: diffs1 },
				{ label: opponent.name, data: diffs2 }
			], {
				series: {
					lines: { show: true },
					points: { show: true }
				}
			});
		});
		
		//coutdown
		clockSave = false;
		clock.setTime(TIME_SHOW_ANSWER);
		clock.start();
		
		//who had a best performance and wins?
		var countWins = 0;
		var countLoses = 0;
		
		for(var i=0; i<compareResults.length; i++){
			if(compareResults[i][1]>0) countWins++;
			if(compareResults[i][1]<0) countLoses++;
		}
		//console.log("countWins: " + countWins);
		//console.log("countLoses: " + countLoses);
		
		if(countWins>countLoses){
			results[level] = 1;
			$(".matches").append("<li>"+(level+1)+": "+user.name+" won</li>");
		}else if(countWins<countLoses){
			results[level] = -1;
			$(".matches").append("<li>"+(level+1)+": "+opponent.name+" won</li>");
		}else{
			results[level] = 0;
			$(".matches").append("<li>"+(level+1)+": No winner</li>");
		}
	}

	function endGame(forceWin){
		if(clock && clock.destroy) clock.destroy();
		
		var countWins = 0;
		var countLoses = 0;
		
		for(var i=0; i<results.length; i++){
			if(results[i]>0) countWins++;
			if(results[i]<0) countLoses++;
		}
		
		if(countWins>countLoses || forceWin){
			showScreen("youWin");
		}else{
			showScreen("youLose");
		}
	}
	
	function clockStopped(){
		if(clockSave){
			saveAnswer();
		}else{
			nextLevel();
		}
	}

	function hideScreens(){
		$("#startGame .login").hide();
		$("#startGame .start").hide();
		$("#startGame .loading").hide();
		$("#startGame .youWin").hide();
		$("#startGame .youLose").hide();
		$("#startGame").hide();
	}

	function showScreen(screen){
		hideScreens();
		$("#startGame").show();
		$("#startGame ."+screen).show();
	}

	$(document).ready(function() {	
		$('.btn-run').click(function(){
			$( ".list-group a" ).removeClass("list-group-item-success");
			selectParameter(0);
			run();
		});
		
		editor = CodeMirror.fromTextArea(document.getElementById("editor"),
		{
			lineNumbers: true,
			styleActiveLine: true,
			lineWrapping: true,
			extraKeys: {"Ctrl-Space": "autocomplete"},
			mode: {name: "javascript", globalVars: false}
		});
		editor.setOption("theme", "base16-light");
		
		clock = $('.clock').FlipClock(0, {
			clockFace: 'MinuteCounter',
			countdown: true,
			autoStart: false,
			callbacks: {
				stop: clockStopped
			}
		});
		
		if(TEST) {
			user = new User();
			user.id = 1;
			user.name = "user1";
			opponent = new User();
			opponent.id = 2;
			opponent.name = "user2";
			TIME_WAIT_ANSWER = 30;
			SITE_URL = "http://localhost/brain-massage/";
			level = -1;
			nextLevel();
		}
	});
}

var bm = new BrainMassage();

/************
FACEBOOK
************/
function statusChangeCallback(response) {
	if(response.status === 'connected'){
		// Logged into your app and Facebook.
		userLogin();
	}else if (response.status === 'not_authorized'){
		// The person is logged into Facebook, but not your app.
		// TODO
		// show message 'Please log into this app.';
	}else{
		// The person is not logged into Facebook, so we're not sure if they are logged into this app or not.
		// TODO
		// show message 'Please log into Facebook.';
	}
}

// This function is called when someone finishes with the Login Button.
function checkLoginState() {
	FB.getLoginStatus(function(response) {
		statusChangeCallback(response);
	});
}

function fb_login(){
    FB.login(function(response) {
        statusChangeCallback(response);
    }, {
        scope: 'publish_stream,email'
    });
}

window.fbAsyncInit = function() {
	FB.init({
		appId      : '819647358121261',
		cookie     : true,  // enable cookies to allow the server to access 
							// the session
		xfbml      : true,  // parse social plugins on this page
		version    : 'v2.2' // use version 2.2
	});

	FB.getLoginStatus(function(response) {
		statusChangeCallback(response);
	});
};

// Load the SDK asynchronously
(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function userLogin() {
	FB.api('/me', function(response) {
		bm.login(response);
	});
}