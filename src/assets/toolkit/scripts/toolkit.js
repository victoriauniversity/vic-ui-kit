/**
 * Toolkit JavaScript
 */
var fastclick = require('fastclick');
var Headroom = require('headroom.js');


$(function(){

	fastclick.attach(document.body);
	var $body = $('body');
	var $globalNav = $("#global-nav");
	var $globalSearch = $("#global-search");
	if ($globalNav.length) {
		var eGlobalNav = $globalNav[0];
		var headroom  = new Headroom(eGlobalNav, {
		  "offset": eGlobalNav.clientHeight,
		  "tolerance": {
		  	up: 20,
		  	down: 5
		  },
		  onPin: function (){
		  	//reset in-menu scrolling 
		  	$globalNav.find('.menu').scrollTop(0);
		  },
		  onUnpin: function (){
		  	$globalNav.toggleClass('is-open', false);
		  }

		});
		headroom.init();

		$body.on('click ', '.js-toggle-global-nav', function(_event){
			$globalNav.toggleClass('is-open');
		});
	}


	$body.on('click ', '.js-toggle-global-search', function(_event){
		$globalSearch.toggleClass('is-open');
	});


	//Study areas tabs toggle

	$('#study-area-tabs li a').click(function(){
		console.log('test');
		if ($(this).parent().hasClass('active')) {
			return;
		}
		$('.active').removeClass('active');
		$(this).parent().addClass('active');
		$('.tile-grid').toggleClass('hidden');
	});


});