/* jshint node: true */

//FORM API INTEGRATION with SIMPLE VALIDATION

"use strict";

var $ = require('jquery');

var API_URL = 'forms.colab.coop';
//var API_URL = 'localhost:8113';

$(document).ready(function () {

	$(document).on('submit', '.form-api', function(e) {
		e.preventDefault();

		// Clears the form of content and validation.
		function clearform() {
			document.forms[0].reset();
		}

		// Simple Validation for non-html5 browsers & textarea.
		var $validated = 'true';
		$(this).find('.required').each( function(){
			if ($(this).val().trim() === '') {
				$(this).addClass('error-empty');
				$validated = 'false';
				$(this).focus( function(){
					$(this).removeClass('error-empty').unbind('focus');
				});
			}
		});

		if ($validated == 'false') {
			$('#errorMsg').text('Please include all required fields');
			$('#error').fadeIn();
				window.setTimeout(function () {
					$('#error').fadeOut();
				}, 3000);
		}
		else {
			//disable submit button
			$(this).find('input[type="submit"]').each( function(){
				$(this).attr('disabled', 'disabled').addClass('busy');
			});

			// Time to format the data to send over to the FORM.API
			// !!! We will need to add functionality for checkboxes & SELECTs if they get added to the form !!!
			var form_data = {'Form': $(this).attr('name')};
			var latest = {};
			$(this).find('input, textarea, select').each( function(){
				var label = $(this).siblings('label').html();
				var value = $(this).val();
				// Add some more markup for textarea
				if ($(this).is('textarea') && value.length > 0 ){
					value = '<br />' + value;
				}
				var type = $(this).attr('type');
				if ((typeof label != 'undefined' && typeof value != 'undefined') && value.length > 0) {
					// If radio handle it differently (change to switch (or else if) if we need to test for checkboxes and selects as well)
					if (type == 'radio') {
						if ($(this).is(':checked')) {
							value = label;
							label = $(this).parent().siblings('label').html();
							if (value == 'Other:') {
								value = 'Other: '+ $(this).parent('div').next('div').children('input').val(); //(this is heavily dependent html structure)
							}
							form_data[label] = value;
						}
					}
					else if (type =='checkbox'){
						if ($(this).is(':checked')) {

							label = $(this).parent().siblings('label').html();
							var checkbox_name = $(this).attr('name');

							if(isNaN(latest[checkbox_name])) {
								latest[checkbox_name] = 0;
								form_data[label] = '<br />' + value + '<br />';
							}
							else{
								latest[checkbox_name]++;
								form_data[label] += value + '<br />';
							}
						}

					}// Input type=text or textarea (default)
					else {
						form_data[label] = value;
					}
				}
			});

			$.ajax({
				type: 'POST',
				datatype: 'jsonp',
				headers: {
					'Accept': 'application/json'
				},
				url: window.location.protocol + '//' + API_URL + '/form',
				data: JSON.stringify(form_data),
				processData: false,
				contentType: 'application/json',
				success: function (response) {
					console.log('got success: ', response);
					clearform();
					$('#success').fadeIn();
					$('input[type="submit"].busy').removeAttr('disabled').removeClass('busy');
					$('.form-api').find('input, textarea').focus( function(){
						$('#success').fadeOut();
						$('.form-api').find('input, textarea').unbind('focus');
					});

                                        // say thank you
                                        window.location.href = "/thank-you/";

					/*
					window.setTimeout(function () {
						$('#success').fadeOut();
					}, 3000);
					*/
				},
				error: function (jqXHR, status, errorThrown) {
					console.log('got error: ', jqXHR);
					$('#errorMsg').text(errorThrown);
					$('#error').fadeIn();
					$('input[type="submit"].busy').removeAttr('disabled').removeClass('busy');
					window.setTimeout(function () {
						$('#error').fadeOut();
					}, 3000);
				}
			});


		} // End if(validated)
	});

});
