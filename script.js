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
			.then(cardResult=> {
				console.log(cardResult.name);
				var cards = document.getElementById("cards");

				var outerDiv = document.createElement("div");
				outerDiv.setAttribute("class", "col-sm-3half");
				cards.appendChild(outerDiv);

				var innerDiv = document.createElement("div");
				innerDiv.setAttribute("class", "card-container");
				outerDiv.appendChild(innerDiv);

				var h4 = document.createElement("h4");
				h4.innerHTML = cardResult.name;
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
			})
		}
	})