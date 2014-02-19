$(document).ready(function() {
	function countdown( elementName, minutes, seconds ) {
		var element, endTime, hours, mins, msLeft, time;

		function twoDigits( n ) {
			return (n <= 9 ? "0" + n : n);
		}
		function updateTimer() {
			msLeft = endTime - (+new Date);

			if ( msLeft < 1000 ) {
				var snd = new Audio("/sound/redalert.mp3"); // buffers automatically when created
				snd.play();

				$("body").css("background-image", "url(/img/bg.gif)");
				element.remove();
			} else {
				time = new Date( msLeft );
				hours = time.getUTCHours();
				mins = time.getUTCMinutes();
				var seconds = twoDigits( time.getUTCSeconds());
				if(seconds === "05"){
					var countdownSnd = new Audio("/sound/countdown.mp3");
					countdownSnd.play();
				}
				element.innerHTML = (hours ? hours + ':' + twoDigits( mins ) : mins) + ':' + twoDigits( time.getUTCSeconds() );
				setTimeout( updateTimer, time.getUTCMilliseconds() + 500 );
			}
		}
		element = document.getElementById( elementName );
		endTime = (+new Date) + 1000 * (60*minutes + seconds) + 500;
		updateTimer();
	}

	$("#start").click(function() {
		countdown( "countdown", $("#min").val(), $("#sec").val() );
		$("#footer").remove();
	});


});