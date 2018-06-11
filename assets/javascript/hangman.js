//	Initializes the Hangman object, with 0 wins and 0 losses.
var hangman = {
	wins: 0,
	losses: 0
};

//	This method restarts the game
hangman.start = function start() {
	hangman.word = hangman.generateWord(); 	//	generate a word and assign it to the word property..
	hangman.setWordDisplay(hangman.word);	//	Set the word display using the setWordDisplay method.
	hangman.triesLeft = 7;					//	Initializes the number of tries left.
	$('#tries').text(hangman.triesLeft);	//	Sets the display for number of tries.
	$('#guesses').text('');					//	Empties out the "guesses" display.
	$('.body-part').fadeOut();				//  Get rid of the body.
	$('#wins').text(hangman.wins);			// Reset win counter display.
	$('#losses').text(hangman.losses);		//Reset losses counter display.
}


// This method accepts a letter as a parameter.  It checks this letter against the current word (hangman.word),
//	and updates all of the variables and DOM elements.
hangman.checkLetter = function checkLetter(letter) {
	//	Check for special characters and numbers in the input.
	var pattern = new RegExp(/[~`!#$%\^&*+=1234567890\-\[\]\\';,/{}|\\":<>\?]/); 
	if (!pattern.test(letter)) { 
		if (hangman.word.toLowerCase().indexOf(letter.toLowerCase()) > -1) { //	Looks for the letter in hangman.word
			// Replace the text inside every ".letter" element with a data-letter attribute equal to letter with letter.
			$('.letter').each(function() {
				if ($(this).data('letter').toLowerCase() == letter.toLowerCase()) {
					$(this).text(letter.toUpperCase());
					$(this).attr('solved', "true");		//	The "Solved" attribute is used to see if the user just won.  
				}
			})
			if ($('[solved=true]').length == $('.letter').length) { //	If the number of '.letter' elements equals the number of 'solved=true' elements, run the "win" method!
				hangman.win();
			}

		} else {	//	If the guess is wrong.
			var guesses = $('#guesses');	//	Selects the "guesses" element.

			if ((guesses.text().toLowerCase().indexOf(letter.toLowerCase())) === -1) {	//	Makes sure the letter wasn't already guessed before.
				//	if it's the first guess, just push in the letter; for any subsequent guess, add a comma and a space.
				if (hangman.triesLeft === 7) {	
					guesses.text(letter.toUpperCase())
				} else {
					guesses.append(', ' + letter.toUpperCase());
				}
				//	Run the deductTry method to deduct the number of tries and update the view.
				hangman.deductTry();
			}
		}
	}


}

//	This function handles the "win" scenario - increments the win property, displays a modal, and clears the "word" property.
hangman.win = function win() {
	hangman.word = '';											//	clear word
	hangman.wins++;												//	increment wins
	$('#wins').text(hangman.wins);								//	update view
	hangman.modal('YOU WIN!  Press any key to try again!');		//	show modal
}

//	Returns a random word pulled from an array.
hangman.generateWord = function generateWord() {
	var words = ["Adult", "Aeroplane", "Air", "Aircraft Carrier", "Airforce", "Airport", "Album", "Alphabet", "Apple", "Arm", "Army", "Baby", "Baby", "Backpack", "Balloon", "Banana", "Bank", "Barbecue", "Bathroom", "Bathtub", "Bed", "Bed", "Bee", "Bible", "Bible", "Bird", "Bomb", "Book", "Boss", "Bottle", "Bowl", "Box", "Boy", "Brain", "Bridge", "Butterfly", "Button", "Cappuccino", "Car", "Car-race", "Carpet", "Carrot", "Cave", "Chair", "Chess Board", "Chief", "Child", "Chisel", "Chocolates", "Church", "Church", "Circle", "Circus", "Circus", "Clock", "Clown", "Coffee", "Coffee-shop", "Comet", "Compact Disc", "Compass", "Computer", "Crystal", "Cup", "Cycle", "Data Base", "Desk", "Diamond", "Dress", "Drill", "Drink", "Drum", "Dung", "Ears", "Earth", "Egg", "Electricity", "Elephant", "Eraser", "Explosive", "Eyes", "Family", "Fan", "Feather", "Festival", "Film", "Finger", "Fire", "Floodlight", "Flower", "Foot", "Fork", "Freeway", "Fruit", "Fungus", "Game", "Garden", "Gas", "Gate", "Gemstone", "Girl", "Gloves", "God", "Grapes", "Guitar", "Hammer", "Hat", "Hieroglyph", "Highway", "Horoscope", "Horse", "Hose", "Ice", "Ice-cream", "Insect", "Jet fighter", "Junk", "Kaleidoscope", "Kitchen", "Knife", "Leather jacket", "Leg", "Library", "Liquid", "Magnet", "Man", "Map", "Maze", "Meat", "Meteor", "Microscope", "Milk", "Milkshake", "Mist", "Money $$$$", "Monster", "Mosquito", "Mouth", "Nail", "Navy", "Necklace", "Needle", "Onion", "PaintBrush", "Pants", "Parachute", "Passport", "Pebble", "Pendulum", "Pepper", "Perfume", "Pillow", "Plane", "Planet", "Pocket", "Post-office", "Potato", "Printer", "Prison", "Pyramid", "Radar", "Rainbow", "Record", "Restaurant", "Rifle", "Ring", "Robot", "Rock", "Rocket", "Roof", "Room", "Rope", "Saddle", "Salt", "Sandpaper", "Sandwich", "Satellite", "School", "Sex", "Ship", "Shoes", "Shop", "Shower", "Signature", "Skeleton", "Slave", "Snail", "Software", "Solid", "Space Shuttle", "Spectrum", "Sphere", "Spice", "Spiral", "Spoon", "Sports-car", "Spot Light", "Square", "Staircase", "Star", "Stomach", "Sun", "Sunglasses", "Surveyor", "Swimming Pool", "Sword", "Table", "Tapestry", "Teeth", "Telescope", "Television", "Tennis racquet", "Thermometer", "Tiger", "Toilet", "Tongue", "Torch", "Torpedo", "Train", "Treadmill", "Triangle", "Tunnel", "Typewriter", "Umbrella", "Vacuum", "Vampire", "Videotape", "Vulture", "Water", "Weapon", "Web", "Wheelchair", "Window", "Woman", "Worm", "X-ray"];
	return words[Math.floor(Math.random() * words.length)];
}


//	Accepts a "word" parameter and updates the display with blank squares to start the game.
hangman.setWordDisplay = function setWordDisplay(word) {
	var container = $('#word');						//	Select the 'word' container div.
	container.html('');								//	Empty it out (from previous rounds)
	for (var i = 0; i < word.length; i++) {			//	Iterate through each character in the word.
		var square = $('<div>');					//	Create empty div to start
		if (word[i] === " ") {						//	Checks to see if the current character is a space, and adds a "space" class to the div, with no text.
			square.addClass('space')
		} else {
			var pattern = new RegExp(/[~`!#$%\^1234567890&*+=\-\[\]\\';,/{}|\\":<>\?]/);
			if (pattern.test(word[i])) {			//	Checks for special characters or numbers, and just displays them instead of making the user guess.
				square
					.addClass('letter')
					.text(word[i])
					.attr('data-letter', word[i])
					.attr('solved', 'true');		//	This is sort of a workaround.
			} else {
				square
					.addClass('letter')
					.text('__')
					.attr('data-letter', word[i]);	//	data-letter attribute is used when actually filling in correct guesses.
			}

		}
		container.append(square);					//	Append into the container div!
	}
}

//	This method deducts the number of tries left, and updates the DOM (including the dude).
hangman.deductTry = function deductTry() {
	$($('.body-part')[7 - hangman.triesLeft]).fadeIn();
	if (hangman.triesLeft == 1) {
		hangman.modal('YOU LOSE!  The word was ' + hangman.word + '.  Press any key to try again.');
		hangman.losses++;
		hangman.word = '';
	} else {
		hangman.triesLeft--;
		$('#tries').text(hangman.triesLeft);
	}

}

//		Creates a modal.  I don't think it should be in the "hangman" object though...
hangman.modal = function modal(text) {
	$('#modal .message').text(text);
	$('#modal').fadeIn();
}

//		Hides the modal.
hangman.killModal = function killModal() {
	$('#modal').fadeOut();
}