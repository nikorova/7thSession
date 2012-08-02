// extend array with numeric sort
Array.prototype.sortNum = function () {
	return this.sort(function (a,b) {return a-b});
};

// actor object
function Actor(name, panache) {
	this.name = name; 
	this.panache = panache;
	this.init;
	this.id = Math.floor(Math.random() * 9000) + 1000; 
	console.log(this.id);
};

// Session object
var Session =  (function () {
	// lol private
	var phase = 1;
	var turn = 1;
	var actors = [];

	// public
	return {
		// phase accessors
		getPhase: function () {
			return phase;
		},

		incrPhase: function () {
			if (phase < 10) {
				phase += 1;
			} else {
				alert('Phase 10! Next turn, please');
			}
		},

		decrPhase: function() {
			if (phase > 1) {
				phase -= 1;
			} else {
				alert('Phase 1! Previous turn, please');
			}
		},

		// turn accessors
		getTurn: function () {
			return turn; 
		},

		incrTurn: function () {
			turn += 1;
		},

		decrTurn: function () {
			if (turn > 1) {
				turn -= 1;
			} else {
				alert("Can't go that far back in time, chief");
			}
		}, 

		// actor accessors
		addActor: function (actor) {
			actors[actor.id] = actor; 	
		},

		removeActor: function (actor) {
			delete actors[actor.id];
		},
	};
} () );

// le application object
var App = {};
//
// generate a player's init for a turn
App.genInitScore = function (r, k) {
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
	var kept = dice.sortNum().slice(r-k);

	return kept;
};

// generate actor div with init display
App.generateActorDiv = (function (actor) {
	actor.init = App.genInitScore(actor.panache);
	
	return actorDiv = '<div class="actor" id="' + actor.id + '">' 
		+ '<h3>' + actor.name + ' ' + actor.init
		+ '</h3>'
		+ '<ul class="phase_list">' 
		+ '<li id="1" class="phase_block generated">1</li>'
		+ '<li id="2" class="phase_block generated">2</li>'
		+ '<li id="3" class="phase_block generated">3</li>'
		+ '<li id="4" class="phase_block generated">4</li>'
		+ '<li id="5" class="phase_block generated">5</li>'
		+ '<li id="6" class="phase_block generated">6</li>'
		+ '<li id="7" class="phase_block generated">7</li>'
		+ '<li id="8" class="phase_block generated">8</li>'
		+ '<li id="9" class="phase_block generated">9</li>'
		+ '<li id="10" class="phase_block generated">10</li>'
		+ '</ul></div>';
});

$(document).ready(function () {
	console.log('ready!');
	console.log('App object: ', App);

	var iBar = $('#indicator_bar');

	var guide = $('#phase_guide #1').position();

	// set position (note -1 offset) 
	iBar.css('left', guide.left - 1);
	console.log(iBar, guide);

	// phase and iBar handlers
	$('#next_phase').on('click', function () {
		Session.incrPhase();
		phase = Session.getPhase();

		console.log('post incr: ', Session.getPhase());
		
		guide = $('#phase_guide #' + phase).position();
		iBar.css('left', guide.left - 1);	
	});

	$('#prev_phase').on('click', function () {
		Session.decrPhase();
		phase = Session.getPhase();

		guide = $('#phase_guide #' + phase).position();
		iBar.css('left', guide.left - 1);
	});

	// new actor handler
	$('#actor_form').on('submit', function (ev) {
		ev.preventDefault();
		var name = $('#name').val();
		var panache = $('#panache').val();

		var actor = new Actor(name, panache);
		console.log(actor);
		
		var actorDiv = App.generateActorDiv(actor);

		$('body').append(actorDiv);
	});
});
