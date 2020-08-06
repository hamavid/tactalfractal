// Set up stuff - defaults are for no js
	// disappear nojs version
	$('div#nojs').css('display','none').css('height',0);
	// disappear the banner and appear the slider
	$('div#banner').addClass('disappear');
	$('div#slider').removeClass('disappear');
	// make elements proper heights
	$('div#bigone').css('height','1060%'); // heights of all unfixed elements should add to this
	$('div#smallone').css('height','9.4%'); // reciprocal of total heights (scales it to 100%)
	$('div#pa').css('height','410%');
	$('div#pb').css('height','450%');
	$('div#titlepocket,div#puzzle-a,div#puzzle-b').css('height','100%');
	$('div.textpocket').css('height','50%');
	
	// call the svgs for puzzles
	/*d3.svg("../svgs/puzzle-a-withdata.svg").then(function(xml) {
		d3.select("div#puzzle-a").node().appendChild(xml.documentElement);
	});
	d3.svg("../svgs/puzzle-b-withdata.svg").then(function(xml) {
		d3.select("div#puzzle-b>div").node().appendChild(xml.documentElement);
	});*/
	
	// show instructions and wantmore bars
	$('div#instructions, div#wantmore').css('display','block');


// function to get window info
	function getwindowinfo() {
		var titletop = document.getElementById('titlepocket').getBoundingClientRect().top;
		var vh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		var vw = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		var bannerthresh = 61;
		return {
	        titletop: titletop,
	        vh: vh,
	        bannerthresh: bannerthresh
	    };
	}
var puzzlea_positions = {
	'k':{"from":0.055,"to":0.047,"x":350,"y":50},
	'i':{"from":0.065,"to":0.055,"x":-350,"y":250},
	'l':{"from":0.07,"to":0.059,"x":200,"y":150},
	'n':{"from":0.081,"to":0.074,"x":-400,"y":-300},
	'g':{"from":0.089,"to":0.076,"x":-300,"y":200},
	'm':{"from":0.102,"to":0.092,"x":-300,"y":-500},
	'f':{"from":0.111,"to":0.096,"x":380,"y":-50},
	'r':{"from":0.127,"to":0.117,"x":-200,"y":-700},
	't':{"from":0.146,"to":0.127,"x":800,"y":-200},
	's':{"from":0.162,"to":0.141,"x":330,"y":-650},
	'e':{"from":0.17,"to":0.152,"x":-220,"y":290},
	'p':{"from":0.192,"to":0.182,"x":-850,"y":-500},
	'o':{"from":0.212,"to":0.188,"x":-900,"y":-50},
	'b':{"from":0.23,"to":0.208,"x":550,"y":580},
	'q':{"from":0.249,"to":0.229,"x":-840,"y":150},
	'c':{"from":0.261,"to":0.24,"x":500,"y":250},
	'a':{"from":0.278,"to":0.263,"x":0,"y":750},
	'v':{"from":0.289,"to":0.27,"x":-300,"y":-400},
	'u':{"from":0.307,"to":0.293,"x":370,"y":-690},
	'd':{"from":0.324,"to":0.305,"x":780,"y":-140},
	'h':{"from":0.34,"to":0.32,"x":500,"y":480}
};

var puzzlea = $('#puzzle-a>svg>g');
for (var key in puzzlea_positions) {
	var piece = puzzlea_positions[key];
	puzzlea.children('.'+key)
		.attr('data-from',piece['from'])
		.attr('data-to',piece['to'])
		.attr('data-translatex',piece['x'])
		.attr('data-translatey',piece['y']);
}
puzzlea.children().attr('data-when','span');

var puzzleb_positions = {
	'm':{"from":0.61,"to":0.604,"x":-200,"y":100},
	'l':{"from":0.619,"to":0.611,"x":350,"y":-50},
	'k':{"from":0.625,"to":0.614,"x":250,"y":50},
	'n':{"from":0.637,"to":0.628,"x":-350,"y":-250},
	'g':{"from":0.643,"to":0.629,"x":-180,"y":-150},
	'i':{"from":0.652,"to":0.644,"x":-250,"y":-250},
	'f':{"from":0.662,"to":0.651,"x":380,"y":-50},
	's':{"from":0.666,"to":0.655,"x":-100,"y":-150},
	'r':{"from":0.676,"to":0.669,"x":330,"y":160},
	't':{"from":0.696,"to":0.684,"x":400,"y":-650},
	'e':{"from":0.712,"to":0.691,"x":-500,"y":400},
	'o':{"from":0.737,"to":0.718,"x":-850,"y":-400},
	'p':{"from":0.76,"to":0.734,"x":-900,"y":-50},
	'b':{"from":0.781,"to":0.755,"x":550,"y":550},
	'q':{"from":0.789,"to":0.767,"x":300,"y":150},
	'c':{"from":0.804,"to":0.793,"x":500,"y":250},
	'a':{"from":0.823,"to":0.806,"x":350,"y":650},
	'v':{"from":0.842,"to":0.821,"x":450,"y":-600},
	'u':{"from":0.861,"to":0.84,"x":320,"y":-650},
	'd':{"from":0.884,"to":0.863,"x":850,"y":250},
	'h':{"from":0.896,"to":0.871,"x":-100,"y":450}
};
var puzzleb = $('#puzzle-b>div>svg>g');
for (var key in puzzleb_positions) {
	var piece = puzzleb_positions[key];
	puzzleb.children('.'+key)
		.attr('data-from',piece['from'])
		.attr('data-to',piece['to'])
		.attr('data-translatex',piece['x'])
		.attr('data-translatey',piece['y']);
}
puzzleb.children().attr('data-when','span');


$(document).ready(function(){

	// Do stuff when page is fully loaded + a bit just in case
	$(window).load( function(){ 
		setTimeout( function(){
			// set vars
			var puzza = $('div#puzzle-a');
			var puzzbstill = $('div#puzzle-b>div>svg>g>g.still');
			var puzzbanim = $('div#puzzle-b>div>svg>g>g.animateme');
			var banner = $('div#banner');
			var slider = $('div#slider');

			// show puzzle a
			puzza.css('opacity',1);

			//SWITCH THINGS UP 
			scrollControl();
			$(window).bind('scroll resize', scrollControl);
			function scrollControl() {

				// get window info
				var windowinfo = getwindowinfo();
				var titletop = windowinfo.titletop;
				var vh = windowinfo.vh;
				var bannerthresh = windowinfo.bannerthresh;

			// PUZZLES
				// Switch from puzzle a to b when the top of the text pocket hits the bottom of the viewport on its way in
				if (titletop < vh) {puzza.css('opacity',0);puzzbstill.css('opacity',1);}
				// Switch from b to a when it gets below the top of the viewport when scrolling back up
				else {puzza.css('opacity',1);puzzbstill.css('opacity',0);}
			
			// BANNER/SLIDER
				// Switch from slider to banner when top of text pocket hits where bottom of banner will be on its way in
				if (titletop <= bannerthresh) {
					slider.addClass('disappear');
					banner.removeClass('disappear');
					$('div#puzzle-a>div>svg,div#puzzle-b>div>svg').addClass('shift');
					puzzbanim.css('opacity',1);
				} 
				// Switch from banner to slider when top of text pocket gets below that threshold when scrolling back up
				else {
					banner.addClass('disappear');
					slider.removeClass('disappear');
					$('div#puzzle-a>div>svg,div#puzzle-b>div>svg').removeClass('shift');
					puzzbanim.css('opacity',0);
				}
			}

		} , 100 ) 

	});
	
});


