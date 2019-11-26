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
			.then(jsonResult => {
				console.log(jsonResult.name);
			})
		}
	})