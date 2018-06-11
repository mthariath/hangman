var hangman = {};
var word, triesLeft;
var guessedLetters = [];
var wins = 0,
	losses = 0;

hangman.start = function start() {
	word = hangman.generateWord();
	hangman.setWordDisplay(word);
	guessedLetter = [];
	triesLeft = 7;
	$('#tries').text(triesLeft);
	$('#guesses').text('');
	$('.body-part').fadeOut();
	$('#wins').text(wins);
	$('#losses').text(losses);
}

hangman.checkLetter = function checkLetter(letter) {
	if (word.toLowerCase().indexOf(letter.toLowerCase()) > -1) {
		$('.letter').each(function() {
			if ($(this).data('letter').toLowerCase() == letter.toLowerCase()) {
				$(this).text(letter.toUpperCase());
				$(this).attr('solved', "true");
			}
		})
		if ($('[solved=true]').length == $('.letter').length) {
			hangman.win();
		}

	} else {
		if (triesLeft === 7) {
			$('#guesses').text(letter.toUpperCase())
		} else {
			$('#guesses').append(', ' + letter.toUpperCase());
		}
		hangman.deductTry();
	}

}


hangman.win = function win() {
	word = '';
	wins++;
	$('#wins').text(wins);
	hangman.modal('YOU WIN!  Press any key to try again!');
}
hangman.generateWord = function generateWord() {
	var words = ["Adult", "Aeroplane", "Air", "Aircraft Carrier", "Airforce", "Airport", "Album", "Alphabet", "Apple", "Arm", "Army", "Baby", "Baby", "Backpack", "Balloon", "Banana", "Bank", "Barbecue", "Bathroom", "Bathtub", "Bed", "Bed", "Bee", "Bible", "Bible", "Bird", "Bomb", "Book", "Boss", "Bottle", "Bowl", "Box", "Boy", "Brain", "Bridge", "Butterfly", "Button", "Cappuccino", "Car", "Car-race", "Carpet", "Carrot", "Cave", "Chair", "Chess Board", "Chief", "Child", "Chisel", "Chocolates", "Church", "Church", "Circle", "Circus", "Circus", "Clock", "Clown", "Coffee", "Coffee-shop", "Comet", "Compact Disc", "Compass", "Computer", "Crystal", "Cup", "Cycle", "Data Base", "Desk", "Diamond", "Dress", "Drill", "Drink", "Drum", "Dung", "Ears", "Earth", "Egg", "Electricity", "Elephant", "Eraser", "Explosive", "Eyes", "Family", "Fan", "Feather", "Festival", "Film", "Finger", "Fire", "Floodlight", "Flower", "Foot", "Fork", "Freeway", "Fruit", "Fungus", "Game", "Garden", "Gas", "Gate", "Gemstone", "Girl", "Gloves", "God", "Grapes", "Guitar", "Hammer", "Hat", "Hieroglyph", "Highway", "Horoscope", "Horse", "Hose", "Ice", "Ice-cream", "Insect", "Jet fighter", "Junk", "Kaleidoscope", "Kitchen", "Knife", "Leather jacket", "Leg", "Library", "Liquid", "Magnet", "Man", "Map", "Maze", "Meat", "Meteor", "Microscope", "Milk", "Milkshake", "Mist", "Money $$$$", "Monster", "Mosquito", "Mouth", "Nail", "Navy", "Necklace", "Needle", "Onion", "PaintBrush", "Pants", "Parachute", "Passport", "Pebble", "Pendulum", "Pepper", "Perfume", "Pillow", "Plane", "Planet", "Pocket", "Post-office", "Potato", "Printer", "Prison", "Pyramid", "Radar", "Rainbow", "Record", "Restaurant", "Rifle", "Ring", "Robot", "Rock", "Rocket", "Roof", "Room", "Rope", "Saddle", "Salt", "Sandpaper", "Sandwich", "Satellite", "School", "Sex", "Ship", "Shoes", "Shop", "Shower", "Signature", "Skeleton", "Slave", "Snail", "Software", "Solid", "Space Shuttle", "Spectrum", "Sphere", "Spice", "Spiral", "Spoon", "Sports-car", "Spot Light", "Square", "Staircase", "Star", "Stomach", "Sun", "Sunglasses", "Surveyor", "Swimming Pool", "Sword", "Table", "Tapestry", "Teeth", "Telescope", "Television", "Tennis racquet", "Thermometer", "Tiger", "Toilet", "Tongue", "Torch", "Torpedo", "Train", "Treadmill", "Triangle", "Tunnel", "Typewriter", "Umbrella", "Vacuum", "Vampire", "Videotape", "Vulture", "Water", "Weapon", "Web", "Wheelchair", "Window", "Woman", "Worm", "X-ray"];
	return words[Math.floor(Math.random() * words.length)];
}


hangman.setWordDisplay = function setWordDisplay(word) {
	var container = $('#word');
	container.html('');
	for (var i = 0; i < word.length; i++) {
		var square = $('<div>');
		if (word[i] === " ") {
			square.addClass('space')
		} else {
			square
				.addClass('letter')
				.text('__')
				.attr('data-letter', word[i])
		}
		container.append(square);
	}
}

hangman.deductTry = function deductTry() {
	$($('.body-part')[7 - triesLeft]).fadeIn();
	if (triesLeft == 1) {
		hangman.modal('YOU LOSE!  The word was ' + word + '.  Press any key to try again.');
		losses++;
		word = '';
	} else {
		triesLeft--;
		$('#tries').text(triesLeft);
	}

}

hangman.modal = function modal(text) {
	$('#modal .message').text(text);
	$('#modal').fadeIn();
}

hangman.killModal = function killModal() {
	$('#modal').fadeOut();
}