$(document).ready(function() {
	hangman.modal('Press any key to start!');			//		Open a modal when ready, with instructions.
	$(document).keypress(function(e) { 						//	Add keypress event listener.
		if (hangman.word) {								// 		Checks to see if game is initialized (by checking for hangman.word property)
			hangman.checkLetter(e.key);					//		If started, pass the pressed key into the "checkLetter" method.
		} else {										//		Otherwise, hide the modal and start the game!
			$('#modal').fadeOut();
			hangman.start();
		}
	});
})