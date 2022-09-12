(function($) {

	"use strict";

	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	$(".toggle-password").click(function() {

	  $(this).toggleClass("fa-eye fa-eye-slash");
	  var input = $($(this).attr("toggle"));
	  if (input.attr("type") == "password") {
	    input.attr("type", "text");
	  } else {
	    input.attr("type", "password");
	  }
	});

})(jQuery);
const loginForm = document.querySelector("form");
const user = document.querySelector("#username-field");
const pass = document.querySelector("#password-field");
loginForm.addEventListener("submit",(event)=>{
	event.preventDefault();
	const username = user.value;
	const password = pass.value;
	const query = "/homepage?name="+username;
	location.href = query;

})
