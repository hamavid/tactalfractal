$(document).ready(function(){

// call the svgs for puzzles
	d3.svg("./svgs/puzzle-a-withdata.svg").then(function(xml) {
		d3.select("div#pa").node().appendChild(xml.documentElement);
	});
	d3.svg("./svgs/puzzle-b-withdata.svg").then(function(xml) {
		d3.select("div#pb>div").node().appendChild(xml.documentElement);
	});
	d3.svg("./svgs/web_outline_three_pieces.svg").then(function(xml) {
		d3.select("div#pb-borders").node().appendChild(xml.documentElement);
	});
	
// function to get window info
	function getwindowinfo() {
		var titletop = document.getElementById('title-pocket').getBoundingClientRect().top;
		//var wantmoretop = document.getElementById('wantmore').getBoundingClientRect().top;
		var bigonetop = document.getElementById('bigone').getBoundingClientRect().top;
		var bigoneheight = document.getElementById('bigone').clientHeight;
		//console.log(bigoneheight);
		var vh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		//var vw = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		var bannerthresh = 61;
		return {
	        titletop: titletop,
	        bigonetop: bigonetop,
	        bigoneheight: bigoneheight,
	        //wantmoretop: wantmoretop,
	        vh: vh,
	        bannerthresh: bannerthresh
	    };
	}

	// Do stuff when page is fully loaded + a bit just in case
	$(window).load( function(){ 
		setTimeout( function(){
			// set vars
			var puzza = $('div#pa');
			var puzzbstill = $('div#pb>div>svg>g>g.still');
			var puzzbanim = $('div#pb>div>svg>g>g.animateme');
			var puzzbborder = $('div#pb-borders');
			var lvl2 = $('path#lvl2');
			var lvl1 = $('path#lvl1');
			var lvl0 = $('path#lvl0');
			var banner = $('div#banner');
			var slider = $('div#slider');

			// show puzzle a
			puzza.css('opacity',1);

			//SWITCH THINGS UP 
			scrollControl();
			$('#wantmorelink').click(scrollControl);
			$(window).bind('scroll resize', scrollControl);
			function scrollControl() {

				// get window info
				var windowinfo = getwindowinfo();
				var titletop = windowinfo.titletop;
				var bigonetop = windowinfo.bigonetop;
				var bigoneheight = windowinfo.bigoneheight;
				//var wantmoretop = windowinfo.wantmoretop;
				//var vh = windowinfo.vh;
				var bannerthresh = windowinfo.bannerthresh;

			// PUZZLES
				// Switch from puzzle a to b when a is solved
				//console.log(bigonetop/bigoneheight);
				if (bigonetop < -0.276 * bigoneheight) {puzzbstill.css('opacity',1);}else{puzzbstill.css('opacity',0);}
				if (bigonetop < -0.3 * bigoneheight) {puzza.css('opacity',0);}else {puzza.css('opacity',1);}
				//if (titletop < vh) {puzza.css('opacity',0);puzzbstill.css('opacity',1);}else {puzza.css('opacity',1);puzzbstill.css('opacity',0);}
				// Add borders to puzzle b at end
				if (bigonetop < -0.731 * bigoneheight) {puzzbborder.css('opacity',1);lvl2.css('opacity',1);}
				else{puzzbborder.css('opacity',0);lvl2.css('opacity',0);}
				if (bigonetop < -0.76 * bigoneheight) {lvl1.css('opacity',1);}else{lvl1.css('opacity',0);}
				if (bigonetop < -0.79 * bigoneheight) {lvl0.css('opacity',1);}else{lvl0.css('opacity',0);}
				// TO FIX: THIS IS INCONSISTENT ON MOBILE BROWSERS
				/*if (wantmoretop < 2.78 * vh) {lvl2.css('opacity',1);}else{lvl2.css('opacity',0);}
				if (wantmoretop < 2.33 * vh) {lvl1.css('opacity',1);}else{lvl1.css('opacity',0);}
				if (wantmoretop < 1.66 * vh) {lvl0.css('opacity',1);}else{lvl0.css('opacity',0);}*/
			
			// BANNER/SLIDER
				// Switch from slider to banner when top of text pocket hits where bottom of banner will be on its way in
				if (titletop <= bannerthresh) {
					slider.addClass('disappear');
					banner.removeClass('disappear');
					$('div#pa>div>svg,div#pb>div>svg').addClass('shift');
					puzzbanim.css('opacity',1);
				} 
				// Switch from banner to slider when top of text pocket gets below that threshold when scrolling back up
				else {
					banner.addClass('disappear');
					slider.removeClass('disappear');
					$('div#pa>div>svg,div#pb>div>svg').removeClass('shift');
					puzzbanim.css('opacity',0);
				}
			}

		} , 100 ) 

	});
	
});


