$(document).ready(function(){

fetch("https://www.anapioficeandfire.com/api/books/2")
	.then((response) => {
		return response.json();
	})
	.then(jsonResult => {
		for (var i = 0; i < jsonResult.povCharacters.length; i++){
			var povUrl = jsonResult.povCharacters[i];
			console.log(povUrl);

			fetch(povUrl)
			.then((response) => {
				return response.json();
			})
			.then(cardResult => {
				console.log(cardResult.name);
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
						
						console.log(player1);
						console.log(player2);
						
						$(".game-container").toggleClass("pregame");
						$(".subhead").addClass("game");
						$("#characters").addClass("game");
						
						boardGame();
					}

				};
				//Game function 
				
				function boardGame() {
		
					var playerName1 = document.getElementById("player1");
					playerName1.innerHTML = player1;
					var playerName2 = document.getElementById("player2");
					playerName2.innerHTML = player2;

					var rollButton = document.getElementById("dice-roll");
					rollButton.onclick = Game.takeTurn;

					Game.populateBoard();
				};

				var Game = (function() {
					var game = {};

					game.tiles = 30;

					game.players = [
					new Player(playerName1, "Triangle", "player1"),
					new Player(playerName2, "Circle", "player2")
					];

					game.currentPlayer = 0;

					game.populateBoard = function() {
					var id = this.tiles[i].squareID;
					var tileNumber = document.getElementById(id + "-number");
					tileNumber.innerHTML = this.squares[i].name;

					var startTile = document.getElementById("startTile-residents");
					for (var i = 0; i < game.players.length; i++){
						game.players[i].createToken(tile1);
					}

					game.takeTurn = function() {
						movePlayer();

						game.currentPlayer = nextPlayer(game.currentPlayer);

						updateByID("currentTurn", game.players[game.currentPlayer]);
					};

					function nextPlayer(currentPlayer) {
						var nextPlayer = currentPlayer + 1;

						if (nextPlayer === game.players.length){
							return 0;
						}

						return nextPlayer;
					}

					function movePlayer() {
						var moves = Math.floor(Math.random() * 6) + 1;
						var totalTiles = game.tiles + 1;
						var currentPlayer = game.players[game.currentPlayer];
						var currentTile = parseInt(currentPlayer.currentTile.slice(6));

						currentPlayer.currentTile = "tile" + nextTile;

						var currentToken = document.getElementById(currentPlayer.id);
						currentToken.parentNode.removeChild(currentToken);

						currentPlayer.createToken(document.getElementById(currentPlayer.currentTile));
					}

					function checkTile() {
						var currentTileId = currentPlayer.currentTile;

						if (currentTileId === "tile30")
							currentPlayer //has won the game
					}

					function updateById(id, msg) {
						document.getElementById(id).innerHTML = msg;
					}

					function Tile(number) {
						this.number = number;
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
						playerSpan.setAttribute("id", this.id);
						tile.appendChild(playerSpan);
					};
				};
			}

		);
				
			});
			
		}
	});
});