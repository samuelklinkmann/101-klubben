$(document).ready(function() {
	var shotsTaken = 0;
    var snd = new Audio("sound/redalert.mp3"); // buffers automatically when created
    var countdownSnd = new Audio("sound/drick.m4a");
                     
	function countdown( elementName, minutes, seconds ) {
		var element, endTime, hours, mins, msLeft, time;

		function twoDigits( n ) {
			return (n <= 9 ? "0" + n : n);
		}
		function updateTimer() {
			msLeft = endTime - (+new Date);

			if ( msLeft < 1000 ) {
				snd.play();

				$("body").css("background-image", "url(img/bg.gif)");
				element.remove();
			} else {
				time = new Date( msLeft );
				hours = time.getUTCHours();
				mins = time.getUTCMinutes();
				var seconds = twoDigits( time.getUTCSeconds());
				if(seconds === "05"){
					countdownSnd.play();
				}
				element.innerHTML = (hours ? hours + ':' + twoDigits( mins ) : mins) + ':' + twoDigits( time.getUTCSeconds() );
				setTimeout( updateTimer, time.getUTCMilliseconds() + 500 );
				if(seconds === "00"){
					shotsTaken++;
					console.log(minutes);
					var shotsLeft = minutes-shotsTaken;
					$("#bottles h3").text(shotsTaken + " shottar nere,  " + shotsLeft +" kvar");
					$("#bottles ul").append("<li></li>");
				}

			}
		}
		element = document.getElementById( elementName );
		endTime = (+new Date) + 1000 * (60*minutes + seconds) + 500;
		updateTimer();
	}
	var configMinutes = 101;
	$("#start").click(function() {
		countdown( "countdown", configMinutes, 0 );
		$("#footer").remove();
	});


});