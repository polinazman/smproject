/**window.addEventListener("DOMContentLoaded", function() {

function rollDice() {
	var diceResult = document.getElementById("dice");
	var status = document.getElementById("status");
	var rolled = Math.floor(Math.random()*6+1);
	return rolled;

	var img = document.getElementById("img-result");
	var imgUrl = diceImages["dice" + dice.rolled];
	img.setAttribute("src", imgUrl);
	console.log(imgUrl);


	dice.innerHTML = rolled;
	status.innerHTML = "You rolled " + rolled;

	}
		var btnRollDice = document.querySelector("dice-roll");
		btnRollDice.addEventListener("click", rollDice(), false);
}, false);

**/

var game = window.addEventListener("DOMContentLoaded", function() {

	import { player1 } from 'script.js'
	alert(player1);

	var k = 0,
	    turn = 0,
	    allow = 1,
	    player_assign_allow = 1,
	    sel = 1,
	    no = 0,
	    allow_part = 1;
	var control=1;
	var user1, user2, user3, user4;

	var dice = {
		sides: 6,
		roll: function(){
			var rolled = Math.floor(Math.random() * this.sides) + 1;
			return rolled;
		}
	}

	function show(url) {
		var diceResult = document.getElementById("dice");
		diceResult.setAttribute("src", url);
	}

	var button = document.getElementById("dice-roll");

	button.onclick = function() {
		var result = dice.roll();
		show("graphics/dice" + result + ".png");
	};

	/*

allow_new_part:function(){
    if (no == 6 && allow_part == 1) {
        switch (turn) {
            case 0:
               general_operation.del_insert(user1);
                break;
            case 1:
                general_operation.del_insert(user2);
                break;
            case 2:
                general_operation.del_insert(user3);

                break;
            case 3:
                general_operation.del_insert(user4);
                break;
        }

        /*next_player();*/
        /*allow_part=0;*/
//    } 
//}

});