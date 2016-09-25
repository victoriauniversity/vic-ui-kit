/**
 * Toolkit JavaScript
 */
var Headroom = require('headroom.js');


$(function(){
	var $body = $('body');
	var $globalNav = $("#global-nav");
	if ($globalNav.length) {
		var eGlobalNav = $globalNav[0];
		var headroom  = new Headroom(eGlobalNav, {
		  "offset": eGlobalNav.clientHeight,
		  "tolerance": {
		  	up: 20,
		  	down: 5
		  },
		  onUnpin: function (){
		  	$globalNav.toggleClass('is-open', false);
		  }
		});
		headroom.init();

		$body.on('click', '.js-toggle-global-nav', function(_event){
			$globalNav.toggleClass('is-open');
		});
	}
});