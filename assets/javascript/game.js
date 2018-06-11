$(document).ready(function() {
	hangman.modal('Press any key to start!');
	$(document).keypress(function(e) {
		if (hangman.word) {
			hangman.checkLetter(e.key);
		} else {
			$('#modal').fadeOut();
			hangman.start();
		}
	});
})