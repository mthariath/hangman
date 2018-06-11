$(document).ready(function() {
	$('#modal .message').text('Press any key to start!');
	$(document).keypress(function(e) {
		if (word) {
			hangman.checkLetter(e.key);
		} else {
			$('#modal').fadeOut();
			hangman.start();
		}
	});
})