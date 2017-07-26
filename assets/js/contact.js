// Validating Empty Field
function check_empty() {
  if (document.getElementById('name').value == "" || document.getElementById('email').value == "" || document.getElementById('msg').value == "") {
    alert("Fill All Fields !");
  } else {
    document.getElementById('form').submit();
    alert("Form Submitted Successfully...");
  }
}

//Function To Display Popup
function div_show() {
  document.getElementById('inline').style.display = "block";
}
//Function to Hide Popup
function div_hide(){
  document.getElementById('inline').style.display = "none";
}

function validateEmail(email) {
		var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return reg.test(email);
	}

$(document).ready(function() {
	$(".popupContact").fancybox();
	$("#form").submit(function() { return false; });


	$("#send").on("click", function(){
		var emailval  = $("#email").val();
		var msgval    = $("#msg").val();
		var msglen    = msgval.length;
		var mailvalid = validateEmail(emailval);

		if(mailvalid == false) {
			$("#email").addClass("error");
		}
		else if(mailvalid == true){
			$("#email").removeClass("error");
		}

		if(msglen < 4) {
			$("#msg").addClass("error");
		}
		else if(msglen >= 4){
			$("#msg").removeClass("error");
		}

		if(mailvalid == true && msglen >= 4) {
			// if both validate we attempt to send the e-mail
			// first we hide the submit btn so the user doesnt click twice
			$("#submit").replaceWith("<em>sending...</em>");

			$.ajax({
				type: 'POST',
				url: 'assets/php/sendmessage.php',
				data: $("#contact").serialize(),
				success: function(data) {
					if(data == "true") {
						$("#contact").fadeOut("fast", function(){
							$(this).before("<p><strong>Success! Your feedback has been sent, thanks :)</strong></p>");
							setTimeout("$.fancybox.close()", 1000);
						});
					}
				}
			});
		}
	});
});
