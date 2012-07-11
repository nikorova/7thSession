function rollNKeep(r, k) {
	if (!k) {
		var k = r;
	}

	// generate dice array
	var dice = [];
	for (i = 0; i < r; i++) {
		var die = 1 + Math.floor((Math.random() * 10));	
		dice.push(die);		
	}
	
	// pick keepers
	kept = dice.sortNum().slice(r-k);

	return kept;
}

function generateTurn(data) {
	// get init dice
	var init = rollNKeep(data.panache);

	$("#turn_panel").append(
		'<div class="turn_instance">' +
			'<h3 id="player_title">' + data.name + '  ' + init + '</h3>' +
			'<ul class="turn" id="' + data.name.replace(/ /g, "_") + '">' +
				'<li class="phase" id="phase1">1</li>' +
				'<li class="phase" id="phase2">2</li>' +
				'<li class="phase" id="phase3">3</li>' +
				'<li class="phase" id="phase4">4</li>' +
				'<li class="phase" id="phase5">5</li>' +
				'<li class="phase" id="phase6">6</li>' +
				'<li class="phase" id="phase7">7</li>' +
				'<li class="phase" id="phase8">8</li>' +
				'<li class="phase" id="phase9">9</li>' +
				'<li class="phase" id="phase10">10</li>' +
			'</ul>' +
			'</div>');
	$.each(init, function(_i, initDie) {
		$("ul#" + data.name.replace(/ /g,"_")).find("li#phase" + initDie).addClass("in_phase");
	});
}

Array.prototype.sortNum = function () {
	return this.sort(function (a,b) {return a-b});
}



$(document).ready(function () {
	$("a").hover(function () {
		$(this).toggleClass("hovering");
	});

	$("button").mousedown(function () {
		$(this).addClass("depressed");
	});
	
	$("button").mouseup(function () {
		$(this).removeClass("depressed");
	});

	$("li.selector_bar").hide();
	$("#selector").children().first().show();

	$("#next_phase").on("click", function () {
	});

	$("#new_actor_button").on('click', function () {
		$("#new_form_panel").show("150");
	});

	$("#new_actor_form").on('submit', function (e) {
		e.preventDefault();

		var form_data = [];
		form_data.name = $("#name").val();
		form_data.panache = $("#panache").val();
		
		generateTurn(form_data);

		$("#new_form_panel").hide();
		$(this).each(function() {this.reset(); });
	});

	$("#dismiss_new_actor_form").on("click", function () {
		$("#new_form_panel").hide();
	});
});

