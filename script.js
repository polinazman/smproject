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
				outerDiv.setAttribute("data-cardSelect", "")
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
				$('[data-cardSelect]').on("click", function(e) {
					e.preventDefault();

					if($("[data-cardSelect].is-selected").length >= cardLimit){
						$("#message").addClass('show');
						if($(this).hasClass("is-selected")) {
							$(this).toggleClass("is-selected");
							$("#message").removeClass('show');

							document.getElementById("startGame").onclick = function() {
								var player1 = document.getElementsByClassName("charSelected")[0].innerHTML;
								var player2 = document.getElementsByClassName("charSelected")[1].innerHTML;
								console.log(player1 + " " + player2);

								location.href = "board.html";
							}
						}
					}else{
						$(this).toggleClass("is-selected");
						$("is-selected .charName", this).toggleClass('charSelected');
					}
				});
			})
			
		}
	})
});