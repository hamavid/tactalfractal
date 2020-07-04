
// Set up stuff - defaults are for no js
	// disappear the banner and appear the slider
	$('#banner').addClass('disappear');
	$('#slider').removeClass('disappear');
	// make elements proper heights
	$('#pa').css('height','200%');
	$('#pb').css('height','350%');
	$('#holder,#puzzle-a,#puzzle-b').css('height','100%');
	$('#textpocket').css('height','99%');
	// disappear nojs version
	$('#nojs').css('display','none').css('height',0);

	// call the svgs for puzzles
	d3.svg("../svgs/puzzle-a-withdata.svg").then(function(xml) {
		d3.select("#puzzle-a").node().appendChild(xml.documentElement);
	});
	d3.svg("../svgs/puzzle-b-withdata.svg").then(function(xml) {
		d3.select("#puzzle-b").node().appendChild(xml.documentElement);
	});

	// show instructions
	$('#instructions').css('display','block');


$(document).ready(function(){
	/* SWITCH THINGS UP */
	scrollControl();
	$(window).bind('scroll resize', scrollControl);
	function scrollControl() {
		// get window info
		var status = document.getElementById('textpocket').getBoundingClientRect().top;
		var vh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		var vw = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		var bannerthresh = 61;
		if (vw < 600 || vh < 500){var bannerthresh = 54;}
		if (vw < 450 || vh < 400){var bannerthresh = 42;}

		// disappear/reappear instructions bar on bottom of screen
		if (status>2.7*vh) {$('#instructions').css('opacity',1);}
		else {$('#instructions').css('opacity',0);}

		// thicken/thin lines in puzzle-b partway through zoomout/in
		if (status<-0.8*vh) {$('#pb path').css('stroke-width',0.8);}
		else{$('#pb path').css('stroke-width',0.4);}

		// Switch from puzzle a to b when the top of the text pocket hits the top of the viewport on its way in
		if (status <= 0) {
			$('#puzzle-a').css('opacity',0);$('#puzzle-b').css('opacity',1);
		} 
		// Switch from b to a when it gets below the top of the viewport when scrolling back up
		else {
			$('#puzzle-a').css('opacity',1);$('#puzzle-b').css('opacity',0);
		}

		// Switch from slider to banner when top of text pocket hits where bottom of banner will be on its way in
		if (status <= bannerthresh) {
			$('#slider').addClass('disappear');$('#banner').removeClass('disappear');$('#puzzle-a>svg,#puzzle-b>svg').addClass('shift');
		} 
		// Switch from banner to slider when top of text pocket gets below that threshold when scrolling back up
		else {
			$('#banner').addClass('disappear');$('#slider').removeClass('disappear');$('#puzzle-a>svg,#puzzle-b>svg').removeClass('shift');
		}
	}

});

