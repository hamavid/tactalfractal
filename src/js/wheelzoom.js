/*! PARED DOWN FROM:
	Wheelzoom 4.0.1
	license: MIT
	http://www.jacklmoore.com/wheelzoom
	(Main changes: img is always centered rather than positioned relative to cursor, and no dragging function)
*/
window.wheelzoom = (function(){
	var defaults = {
		zoom: 0.10,
		maxZoom: false,
		initialZoom: 1,
	};

	var main = function(img, options){
		if (!img || !img.nodeName || img.nodeName !== 'IMG') { return; }

		var settings = {};
		var width;
		var height;
		var bgWidth;
		var bgHeight;
		var previousEvent;
		var transparentSpaceFiller;

		function setSrcToBackground(img) {
			img.style.backgroundRepeat = 'no-repeat';
			img.style.backgroundImage = 'url("'+img.src+'")';
			transparentSpaceFiller = 'data:image/svg+xml;base64,'+window.btoa('<svg xmlns="http://www.w3.org/2000/svg" width="'+img.naturalWidth+'" height="'+img.naturalHeight+'"></svg>');
			img.src = transparentSpaceFiller;
		}

		function updateBgStyle() {
			img.style.backgroundSize = bgWidth+'px '+bgHeight+'px';
			img.style.backgroundPosition = 'center';
		}

		function reset() {
			bgWidth = width;
			bgHeight = height;
			updateBgStyle();
		}

		function onwheel(e) {
			var deltaY = 0;

			e.preventDefault();

			if (e.deltaY) { // FireFox 17+ (IE9+, Chrome 31+?)
				deltaY = e.deltaY;
			} else if (e.wheelDelta) {
				deltaY = -e.wheelDelta;
			}

			// Update the bg size:
			if (deltaY < 0) {
				bgWidth += bgWidth*settings.zoom;
				bgHeight += bgHeight*settings.zoom;
			} else {
				bgWidth -= bgWidth*settings.zoom;
				bgHeight -= bgHeight*settings.zoom;
			}
			// Don't let bgsize get bigger than the max allowed: set to max if it would otherwise be bigger
			if (settings.maxZoom) {
				bgWidth = Math.min(width*settings.maxZoom, bgWidth);
				bgHeight = Math.min(height*settings.maxZoom, bgHeight);
			}
			// Prevent zooming out beyond the full size
			if (bgWidth <= width || bgHeight <= height) {
				reset();
			} else {
				updateBgStyle();
			}

		}


		function load() {
			var initial = Math.max(settings.initialZoom, 1);

			if (img.src === transparentSpaceFiller) return;

			var computedStyle = window.getComputedStyle(img, null);

			width = parseInt(computedStyle.width, 10);
			height = parseInt(computedStyle.height, 10);
			bgWidth = width * initial;
			bgHeight = height * initial;
			
			setSrcToBackground(img);

			img.style.backgroundSize = bgWidth+'px '+bgHeight+'px';
			img.style.backgroundPosition = 'center';
			img.addEventListener('wheelzoom.reset', reset);
			img.addEventListener('wheel', onwheel);
		}

		var destroy = function (originalProperties) {
			img.removeEventListener('wheelzoom.destroy', destroy);
			img.removeEventListener('wheelzoom.reset', reset);
			img.removeEventListener('load', load);
			img.removeEventListener('wheel', onwheel);

			img.style.backgroundImage = originalProperties.backgroundImage;
			img.style.backgroundRepeat = originalProperties.backgroundRepeat;
			img.src = originalProperties.src;
		}.bind(null, {
			backgroundImage: img.style.backgroundImage,
			backgroundRepeat: img.style.backgroundRepeat,
			src: img.src
		});

		img.addEventListener('wheelzoom.destroy', destroy);

		options = options || {};

		Object.keys(defaults).forEach(function(key){
			settings[key] = options[key] !== undefined ? options[key] : defaults[key];
		});

		if (img.complete) {
			load();
		}

		img.addEventListener('load', load);
	};

	// Do nothing in IE9 or below
	if (typeof window.btoa !== 'function') {
		return function(elements) {
			return elements;
		};
	} else {
		return function(elements, options) {
			if (elements && elements.length) {
				Array.prototype.forEach.call(elements, function (node) {
					main(node, options);
				});
			} else if (elements && elements.nodeName) {
				main(elements, options);
			}
			return elements;
		};
	}
}());