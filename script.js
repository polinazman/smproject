$(document).ready(function(){

fetch("https://www.anapioficeandfire.com/api/books/2")
	.then((response) => {
		return response.json();
	})
	.then(jsonResult => {
		for (var i = 0; i < jsonResult.povCharacters.length; i++){
			var povUrl = jsonResult.povCharacters[i];

			fetch(povUrl)
			.then((response) => {
				return response.json();
			})
			.then(cardResult => {
				var cards = document.getElementById("cards");

				var outerDiv = document.createElement("div");
				outerDiv.setAttribute("class", "col-sm-3half card-select");
				outerDiv.setAttribute("data-cardSelect", "");
				cards.appendChild(outerDiv);

				var innerDiv = document.createElement("div");
				innerDiv.setAttribute("class", "card-container");
				outerDiv.appendChild(innerDiv);

				var h4 = document.createElement("h4");
				h4.innerHTML = cardResult.name;
				h4.setAttribute("class", "charName");
				innerDiv.appendChild(h4);

				var gender = document.createElement("p");
				gender.innerHTML = "Gender: " + cardResult.gender;
				gender.setAttribute("class", "gender");
				innerDiv.appendChild(gender);

				if(cardResult.culture !== "") {
					var culture = document.createElement("p");
					culture.innerHTML = "Culture: " + cardResult.culture;
					culture.setAttribute("class", "culture");
					innerDiv.appendChild(culture);
				}

				if(cardResult.titles !== "") {
					var titles = document.createElement("p");
					titles.innerHTML = "Titles: " + cardResult.titles;
					titles.setAttribute("class", "titles");
					innerDiv.appendChild(titles);
				}

				var cardLimit = 2;
				var card = document.getElementsByClassName("card-select");
				var selected = document.getElementsByClassName("is-selected");
				var charName = document.getElementsByClassName("charName");

				function selectCards() {

					if ($(selected).length >= cardLimit) {
						$("#message").addClass('show');
						if($(this).hasClass("is-selected")) {
							$(this).toggleClass("is-selected");
							$("#message").removeClass('show');
							$(this).find(charName).toggleClass('charSelected');
						}
					} else {
						$(this).toggleClass("is-selected");
						$(this).find(charName).toggleClass('charSelected');
					}
					
					if ($(selected).length === cardLimit) {
						$("#startGame").addClass("selected");
					} else {
						$("#startGame").removeClass("selected");
					}

				}
				outerDiv.addEventListener("click", selectCards, false);
				var player1 = "";
				var player2 = "";
				document.getElementById("startGame").onclick = function() {

					if($(selected).length >= cardLimit) {
						player1 = document.getElementsByClassName("charSelected")[0].innerHTML;
						player2 = document.getElementsByClassName("charSelected")[1].innerHTML;
						
						$(".game-container").toggleClass("pregame");
						$(".subhead").addClass("game");
						$("#characters").addClass("game");

						var playerName1 = document.getElementById("player1");
						playerName1.innerHTML = player1;
						var playerName2 = document.getElementById("player2");
						playerName2.innerHTML = player2;

						boardGame();
					}						
				};
			});
		}
	});
});
				
function boardGame() {

	var rollButton = document.getElementById("dice-roll");
	rollButton.onclick = Game.takeTurn;

	Game.populateBoard();
};

var Game = (function() {
	var game = {};

	game.tiles = [
		new Tile("tile1"),
		new Tile("tile2"),
		new Tile("tile3"),
		new Tile("tile4"),
		new Tile("tile5"),
		new Tile("tile6"),
		new Tile("tile7"),
		new Tile("tile8"),
		new Tile("tile9"),
		new Tile("tile10"),
		new Tile("tile11"),
		new Tile("tile12"),
		new Tile("tile13"),
		new Tile("tile14"),
		new Tile("tile15"),
		new Tile("tile16"),
		new Tile("tile17"),
		new Tile("tile18"),
		new Tile("tile19"),
		new Tile("tile20"),
		new Tile("tile21"),
		new Tile("tile22"),
		new Tile("tile23"),
		new Tile("tile24"),
		new Tile("tile25"),
		new Tile("tile26"),
		new Tile("tile27"),
		new Tile("tile28"),
		new Tile("tile29"),
		new Tile("tile30")
	];

	game.players = [
		new Player(document.getElementById("player1"), "playerToken1", "player1"),
		new Player(document.getElementById("player2"), "playerToken2", "player2")
	];

	game.currentPlayer = 0;

	game.populateBoard = function() {
		for (var i = 0; i < this.tiles.length; i++) {
			var id = this.tiles[i].tileID;
		}

		var tile1 = document.getElementById("tile1-residents");
		for (var i = 0; i < game.players.length; i++){
			game.players[i].createToken(tile1);
		}
	};

	game.takeTurn = function() {
		movePlayer();

		checkTile();
	};

	function nextPlayer(currentPlayer) {
		var nextPlayer = currentPlayer + 1;

		if (nextPlayer === game.players.length){
			return 0;
		}

		return nextPlayer;
	}

	function movePlayer() {
		var rolled = Math.floor(Math.random() * 6) + 1;
		var url = "graphics/dice" + rolled + ".png";
		var diceResult = document.getElementById("dice");
		diceResult.setAttribute("src", url);
		var moves = rolled;
		var totalTiles = game.tiles.length + 1;
		var currentPlayer = game.players[game.currentPlayer];
		var currentTile = parseInt(currentPlayer.currentTile.slice(4));
		var nextTile = currentTile + moves;

		if (moves === 6) {
			game.currentPlayer = game.currentPlayer;
			updateByID(
        		"messageP",
        		currentPlayer.name.innerHTML + ", the dice rolled 6. You get another turn!"
     		);
			
		} else {
			game.currentPlayer = nextPlayer(game.currentPlayer);
		}

		if (currentTile + moves <= totalTiles) {
			var nextTile = currentTile + moves;
		} else {
			$("#winner").toggleClass("waiting");
			document.getElementById("congrats").innerHTML = "Congratulations " + game.players[game.currentPlayer].name.innerHTML + ", you win!";
			$("#board").addClass('alerting');
			$("#heading").addClass('alerting');

		}

		currentPlayer.currentTile = "tile" + nextTile;

		var currentToken = document.getElementById(currentPlayer.id + "-token");
		currentToken.parentNode.removeChild(currentToken);

		currentPlayer.createToken(document.getElementById(currentPlayer.currentTile));
	}

	function checkTile() {
		var currentPlayer = game.players[game.currentPlayer];
		var currentTileId = currentPlayer.currentTile;

		if (currentTileId === "tile5") {
			game.moves = -2;
			updateByID(
        		"messageP",
        		currentPlayer.name.innerHTML + ", you have been attacked by a dragon. Move two steps backwards."
     		);
		} else if (currentTileId === "tile10") {
			game.moves = -2;
			updateByID(
        		"messageP",
        		currentPlayer.name.innerHTML + ", you had to fight a walker. Move two steps backwards"
     		);
		} else if (currentTileId === "tile18") {
			game.moves = -1;
			updateByID(
        		"messageP",
        		currentPlayer.name.innerHTML + ", your horse got tired. Move one step backwards"
     		);
		} else if (currentTileId === "tile23") {
			game.moves = -2;
			updateByID(
        		"messageP",
        		currentPlayer.name.innerHTML + ", your enemies tried to poison you. Move two steps backwards"
     		);
		} else if (currentTileId === "tile27"){
			game.moves = -1;
			updateByID(
        		"messageP",
        		currentPlayer.name.innerHTML + ", a meeting with the Red Woman. Move one step backwards"
     		);
		}
	}

	function updateByID(id, msg) {
    	document.getElementById(id).innerHTML = msg;
  	}

	function Tile(tileID) {
		this.tileID = tileID;
	}
	
	function Player(name, token, id) {
	    this.name = name;
	    this.token = token;
	    this.id = id;
	    this.currentTile = "tile1";
	}

	Player.prototype.createToken = function(tile) {
		var playerSpan = document.createElement("span");
		playerSpan.setAttribute("class", this.token);
		playerSpan.setAttribute("id", this.id + "-token");
		tile.appendChild(playerSpan);
	};
	return game;
})();