$(function () {
    $("a").not("#download-buttons a, .project-buttons").click(function (e) {
        //don't activate the default action of 'a' element.
        e.preventDefault();
        $("html, body").animate({
            //gets the href attribute of the element and scrolls to their top.
            scrollTop: $($(this).attr("href")).offset().top
        }, 1200);
    });

    //Contact form validation.
    $("form#contact-form").submit(function (e) {
        //Get all input fields except hidden or submit.
        var inputFields = $("form#contact-form :input").not("[type=hidden], [type=submit]");
        var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var error = false;
        var errorType; // 0 - Empty fields, 1 - Invalid email.

        //Loop through each input field, apply validation and event listeners.
        inputFields.each(function () {
            var field = $(this);
            var fieldValue = field.val().trim();

            //Validate
            if (!fieldValue) {
                if (!error)
                    error = true;

                errorType = 0;
                $("#form-errors span").text("All fields are required!");
                field.addClass("error");
            } else if (field.attr("type") == "email" && !emailRegex.test(fieldValue)) {
                if (!error)
                    error = true;

                errorType = 1;
                $("#form-errors span").text("Please enter a valid email!");
                field.addClass("error");
            }

            //Add event listeners.
            $(field).on("change paste keyup", function () {
                var fieldValue = $(this).val().trim();

                if (errorType == 0 && fieldValue) {
                    $(this).removeClass("error");

                    if ($(".error").length == 0) {
                        $("#form-errors").fadeOut();
                        error = false;
                    }

                } else if (errorType == 1 && emailRegex.test(fieldValue)) {
                    $(this).removeClass("error");
                    error = false;
                } else {
                    $(this).addClass("error");
                }
            });

        });

        //Prevent default action in case of error.
        //Reset otherwise.
        if (error) {
            e.preventDefault();
            $("#form-errors").fadeIn();
        } else {
            $(".error").each(function () {
                $(this).removeClass("error");
            });

            inputFields.each(function () {
                $(this).off("change paste keyup");
            });
        }

    });

    $("#menu-icon").click(function () {
        $(this).toggleClass("active-menu-icon");
        $("#main-nav").toggleClass("active");
    });
})

//Shows the side navigation bar or hides it and sets the active anchor, depending on the window top position.
$(window).scroll(function () {
    if ($(window).scrollTop() >= $("#about").offset().top - 5) {
        var windowMiddlePosition = $(window).scrollTop() + ($(window).height() / 2);

        $("#side-nav").css("visibility", "visible");
        $("#side-nav ul li a").not("first").each(function () {
            var section = $($(this).attr("href"));
            var sectionTop = section.offset().top - 20;
            var sectionBottom = section.offset().top + section.height();

            if (sectionTop <= windowMiddlePosition && sectionBottom >= windowMiddlePosition) {
                //Removes any active anchor before setting up the new one.
                $("#side-nav ul li a.active").removeClass("active");
                $(this).addClass("active");
            }
        });
    } else {
        $("#side-nav").css("visibility", "hidden");
    }

    //Animations on-scroll.
    //Doesn't apply on smartphones/small tablets.
    if (!window.matchMedia('(max-width: 700px)').matches) {

        if (isInView($("#experience-timeline-wrapper"))) {
            $(".vertical-line").delay(350).animate({ height: '100%' }, 1500, "linear");
        }

        $(".experience-content").each(function () {
            if (isInView($(this))) {
                $(this).delay(350).animate({ opacity: '1' }, 1200, "linear");
            }
        });

        var i = 0;

        $(".skill-line").each(function () {
            if (isInView($(this))) {
                var valueElement = $(".skill-value").get(i);
                var value = valueElement.innerHTML;
                var animationObject = { width: value };
                $(this).delay(200).animate(animationObject, 1000, "linear");
                $(valueElement).delay(1100).animate({ opacity: '1' }, 600, "linear");
            }
            i++;
        });
    }
});

//Checks if element is in view based on it's top compared with window's bottom.
function isInView(element) {
    return element.offset().top <= ($(window).scrollTop() + $(window).height());
}
