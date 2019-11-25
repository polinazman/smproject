var request = new XMLHttpRequest();

request.open("GET", "https://www.anapioficeandfire.com/api/characters");

request.onload = function() {
	var charData = JSON.parse(request.response);

	for(var i = 0; i < 10; i++) {
		var charName = charData.name[i];
	}

	console.log(charName);
}

request.send();

fetch("https://www.anapioficeandfire.com/api/characters")
	.then((response) => {
		return response.json();
	})
	.then(jsonResult => {
		console.log(jsonResult);
	})