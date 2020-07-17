// scroll to top on reload - not sure if this is a desirable behavior yet, trying out
//$(window).on('beforeunload', function() {$(window).scrollTop(0);});

// Set up stuff - defaults are for no js
	// disappear nojs version
	$('#nojs').css('display','none').css('height',0);
	// disappear the banner and appear the slider
	$('#banner').addClass('disappear');
	$('#slider').removeClass('disappear');
	// make elements proper heights
	$('#pa').css('height','200%');
	$('#pb').css('height','350%');
	$('#holder1,#holder2,#puzzle-a,#puzzle-b,#puzzle-b-solved').css('height','100%');
	$('#textpocket').css('height','99%');
	$('#holder3').css('height','100%');
	
	// call the svgs for puzzles
	d3.svg("../svgs/puzzle-a-withdata.svg").then(function(xml) {
		d3.select("#puzzle-a").node().appendChild(xml.documentElement);
	});
	d3.svg("../svgs/puzzle-b-withdata.svg").then(function(xml) {
		d3.select("#puzzle-b").node().appendChild(xml.documentElement);
	});
	d3.svg("../svgs/puzzle-b-solved.svg").then(function(xml) {
		d3.select("#puzzle-b-solved").node().appendChild(xml.documentElement);
	});

	// show instructions and wantmore bars
	$('#instructions, #wantmore').css('display','block');


// function to get window info
	function getwindowinfo() {
		var texttop = document.getElementById('textpocket').getBoundingClientRect().top;
		var vh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		var vw = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		var bannerthresh = 61;
		if (vw < 600 || vh < 500){var bannerthresh = 54;}
		if (vw < 450 || vh < 400){var bannerthresh = 42;}
		return {
	        texttop: texttop,
	        vh: vh,
	        bannerthresh: bannerthresh
	    };
	}

// control location of instructions bar on small screens 
//(centered so it isn't hidden below bottom of visible page)




$(document).ready(function(){

	// set vars
	var puzza = $('#puzzle-a');
	var puzzb = $('#puzzle-b');
	var puzzbs = $('#puzzle-b-solved');
	var wantmore = $('#wantmore');
	var instructions = $('#instructions');
	var banner = $('#banner');
	var slider = $('#slider');

	// show puzzle a
	puzza.css('opacity',1);
	
	/* SWITCH THINGS UP */
	scrollControl();
	$(window).bind('scroll resize', scrollControl);
	function scrollControl() {

		// get window info
		var windowinfo = getwindowinfo();
		var texttop = windowinfo.texttop;
		var vh = windowinfo.vh;
		var bannerthresh = windowinfo.bannerthresh;

	// PUZZLES
		// Switch from puzzle a to b when the top of the text pocket hits the bottom of the viewport on its way in
		if (texttop < vh) {
			// fadeout puzzle a
			puzza.css('opacity',0);
			// If we are at the end, ensure puzzb is correctly zoomed and solved, then hide it and show solved one
			if (texttop < -4.49*vh) {
				$('#puzzle-b>svg g.animateme').css('transform','translate(0px, 0px)');
				$('#puzzle-b>svg>g').css('transform','translate(290px, 272px) scale(0.25,0.25)');
				puzzbs.css('opacity',1);
			} 
			// Otherwise, show puzzb and hide solved version
			else{
				puzzb.css('opacity',1);puzzbs.css('opacity',0);
			}
				
		}
		// Switch from b to a when it gets below the top of the viewport when scrolling back up
		else {
			puzza.css('opacity',1);puzzb.css('opacity',0);puzzbs.css('opacity',0);
		}
		
	// INSTRUCTIONS/WANTMORE
		// control opacity of instructions bar at top and wantmore bar at bottom
		if (texttop>2.7*vh) {instructions.css('opacity',1);wantmore.css('opacity',0);}
		else {
			if (texttop<-4.9*vh) {
				wantmore.css('opacity',1);
			} else {
				wantmore.css('opacity',0);
			}
			instructions.css('opacity',0);
		}
		
		
	// BANNER/SLIDER
		// Switch from slider to banner when top of text pocket hits where bottom of banner will be on its way in
		if (texttop <= bannerthresh) {
			slider.addClass('disappear');banner.removeClass('disappear');$('#puzzle-a>svg,#puzzle-b>svg').addClass('shift');
		} 
		// Switch from banner to slider when top of text pocket gets below that threshold when scrolling back up
		else {
			banner.addClass('disappear');slider.removeClass('disappear');$('#puzzle-a>svg,#puzzle-b>svg').removeClass('shift');
		}
	}

});

