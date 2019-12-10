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
var player1Selections = new Array();
var player2Selections = new Array();
var currentPlayer = 0;
var progress1 = 0;    // player 1 points
var progress2 = 0;    // player 2 points

window.addEventListener("DOMContentLoaded", function() {

	// 1. random number
	var dice = Math.floor(Math.random() * 6) + 1;

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

/**
	var handler = function(e) {
                if (currentPlayer == 0) {
                    this.innerHTML = "X";
                    player1Selections.push(parseInt(this.id));
                    player1Selections.sort(function(a, b) { return a - b });
                }

                else {
                    this.innerHTML = "O";
                    player2Selections.push(parseInt(this.id));
                    player2Selections.sort(function(a, b) { return a - b });
                }
    }

	var k = 0,
	    turn = 0,
	    allow = 1,
	    player_assign_allow = 1,
	    sel = 1,
	    no = 0,
	    allow_part = 1;
	var control=1;
	var player1, player2;

	function player(name, position_array,color_half,starting_position) {
	    this.color= color;
	    this.position_array = position_array;
	    this.starting_position=starting_position;
	    this.color_half=color_half;

	}

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