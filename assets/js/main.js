jQuery(document).ready(function($) {


    /*======= Skillset *=======*/

    $('.level-bar-inner').css('width', '0');

    $(window).on('load', function() {

        $('.level-bar-inner').each(function() {

            var itemWidth = $(this).data('level');

            $(this).animate({
                width: itemWidth
            }, 800);

        });

    });

    /* Bootstrap Tooltip for Skillset */
    $('.level-label').tooltip();


    /* jQuery RSS - https://github.com/sdepold/jquery-rss */

    $("#rss-feeds").rss(

        //Change this to your own rss feeds
        "http://feeds.feedburner.com/TechCrunch/startups",

        {
        // how many entries do you want?
        // default: 4
        // valid values: any integer
        limit: 3,

        // the effect, which is used to let the entries appear
        // default: 'show'
        // valid values: 'show', 'slide', 'slideFast', 'slideSynced', 'slideFastSynced'
        effect: 'slideFastSynced',

        // outer template for the html transformation
        // default: "<ul>{entries}</ul>"
        // valid values: any string
        layoutTemplate: "<div class='item'>{entries}</div>",

        // inner template for each entry
        // default: '<li><a href="{url}">[{author}@{date}] {title}</a><br/>{shortBodyPlain}</li>'
        // valid values: any string
        entryTemplate: '<h3 class="title"><a href="{url}" target="_blank">{title}</a></h3><div><p>{shortBodyPlain}</p><a class="more-link" href="{url}" target="_blank"><i class="fa fa-external-link"></i>Read more</a></div>'

        }
    );

    /* Github Calendar - https://github.com/IonicaBizau/github-calendar */
    GitHubCalendar("#github-graph", "freecaykes");


    /* Github Activity Feed - https://github.com/caseyscarborough/github-activity */
    // GitHubActivity.feed({ username: "freecaykes", selector: "#ghfeed" });

    function validateEmail(email) {
  		var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  		return reg.test(email);
  	}

  	$(document).ready(function() {
  		$(".modalbox").fancybox();
  		$("#contact").submit(function() { return false; });


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
  				$("#send").replaceWith("<em>sending...</em>");

  				$.ajax({
  					type: 'POST',
  					url: 'sendmessage.php',
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


});
