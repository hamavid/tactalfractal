// scroll to top on reload - not sure if this is a desirable behavior yet, trying out
//$(window).on('beforeunload', function() {$(window).scrollTop(0);});

// Set up stuff - defaults are for no js
	// disappear nojs version
	$('div#nojs').css('display','none').css('height',0);
	// disappear the banner and appear the slider
	$('div#banner').addClass('disappear');
	$('div#slider').removeClass('disappear');
	// make elements proper heights
	$('div#pa').css('height','300%');
	$('div#pb').css('height','400%');
	$('div#titlepocket,div#puzzle-a,div#puzzle-b').css('height','100%');
	$('div.textpocket').css('height','50%');
	$('div.holder').css('height','110%');
	
	// call the svgs for puzzles
	d3.svg("../svgs/puzzle-a-withdata.svg").then(function(xml) {
		d3.select("div#puzzle-a").node().appendChild(xml.documentElement);
	});
	d3.svg("../svgs/puzzle-b-withdata.svg").then(function(xml) {
		d3.select("div#puzzle-b").node().appendChild(xml.documentElement);
	});
	
	// show instructions and wantmore bars
	$('div#instructions, div#wantmore').css('display','block');


// function to get window info
	function getwindowinfo() {
		var titletop = document.getElementById('titlepocket').getBoundingClientRect().top;
		var vh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		var vw = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		var bannerthresh = 61;
		if (vw < 600 || vh < 500){var bannerthresh = 54;}
		if (vw < 450 || vh < 400){var bannerthresh = 42;}
		return {
	        titletop: titletop,
	        vh: vh,
	        bannerthresh: bannerthresh
	    };
	}


$(document).ready(function(){

	// Do stuff when page is fully loaded + a bit just in case
	$(window).load( function(){ 
		setTimeout( function(){
			// set vars
			var puzza = $('div#puzzle-a');
			var puzzbstill = $('div#puzzle-b>svg>g>g.still');
			var puzzbanim = $('div#puzzle-b>svg>g>g.animateme');
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
					$('div#puzzle-a>svg,div#puzzle-b>svg').addClass('shift');
					puzzbanim.css('opacity',1);
				} 
				// Switch from banner to slider when top of text pocket gets below that threshold when scrolling back up
				else {
					banner.addClass('disappear');
					slider.removeClass('disappear');
					$('div#puzzle-a>svg,div#puzzle-b>svg').removeClass('shift');
					puzzbanim.css('opacity',0);
				}
			}

		} , 100 ) 

	});
	
});

