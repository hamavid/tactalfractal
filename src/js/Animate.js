// Set up stuff - defaults are for no js
	// disappear nojs version
	$('div#nojs').css('display','none').css('height',0);
	// disappear the banner and appear the slider
	$('div#banner').addClass('disappear');
	$('div#slider').removeClass('disappear');
	// make elements proper heights
	$('div#bigone').css('height','1220%'); // heights of all unfixed elements should add to this
	$('div#smallone').css('height','8.19%'); // reciprocal of total heights (scales it to 100%)
	$('div#pa,div#pb').css('height','410%');
	// titlepocket, pb-zoom, pb-borders are unfixed (so count toward total)
	$('div#titlepocket,div#pb-zoom,div#pb-borders,div#puzzle-a,div#puzzle-b,div#puzzle-b-borders').css('height','100%');
	$('div.textpocket').css('height','50%'); // two of these
	// Total: 410+410+100+100+100+50+50 = 1220
	// Reciprocal: 1000/1220 = 0.8196 : round down to make sure it's not possible to scroll out of the div
	
	// call the svgs for puzzles
	d3.svg("./svgs/puzzle-a-withdata.svg").then(function(xml) {
		d3.select("div#puzzle-a").node().appendChild(xml.documentElement);
	});
	d3.svg("./svgs/puzzle-b-withdata.svg").then(function(xml) {
		d3.select("div#puzzle-b>div").node().appendChild(xml.documentElement);
	});
	d3.svg("./svgs/web_outline_three_pieces.svg").then(function(xml) {
		d3.select("div#puzzle-b-borders").node().appendChild(xml.documentElement);
	});
	
	// show instructions and wantmore bars
	$('div#instructions, div#wantmore').css('display','block');


// function to get window info
	function getwindowinfo() {
		var titletop = document.getElementById('titlepocket').getBoundingClientRect().top;
		var wantmoretop = document.getElementById('wantmore').getBoundingClientRect().top;
		var vh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		var vw = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		var bannerthresh = 61;
		return {
	        titletop: titletop,
	        wantmoretop: wantmoretop,
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
			var puzzbstill = $('div#puzzle-b>div>svg>g>g.still');
			var puzzbanim = $('div#puzzle-b>div>svg>g>g.animateme');
			var lvl2 = $('path#lvl2');
			var lvl1 = $('path#lvl1');
			var lvl0 = $('path#lvl0');
			var banner = $('div#banner');
			var slider = $('div#slider');

			// show puzzle a
			//puzza.css('opacity',1);

			//SWITCH THINGS UP 
			scrollControl();
			$(window).bind('scroll resize', scrollControl);
			function scrollControl() {

				// get window info
				var windowinfo = getwindowinfo();
				var titletop = windowinfo.titletop;
				var wantmoretop = windowinfo.wantmoretop;
				var vh = windowinfo.vh;
				var bannerthresh = windowinfo.bannerthresh;

			// PUZZLES
				// Switch from puzzle a to b when the top of the text pocket hits the bottom of the viewport on its way in
				if (titletop < vh) {puzza.css('opacity',0);puzzbstill.css('opacity',1);}
				// Switch from b to a when it gets below the top of the viewport when scrolling back up
				else {puzza.css('opacity',1);puzzbstill.css('opacity',0);}
				// Add borders to puzzle b at end
				if (wantmoretop < 2.78 * vh) {lvl2.css('opacity',1);}else{lvl2.css('opacity',0);}
				if (wantmoretop < 2.33 * vh) {lvl1.css('opacity',1);}else{lvl1.css('opacity',0);}
				if (wantmoretop < 1.66 * vh) {lvl0.css('opacity',1);}else{lvl0.css('opacity',0);}
			
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


