$(function () {
    $("a").not("#download-buttons a").click(function (e) {
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

            $(field).on("change paste keyup", function () {
                var fieldValue = $(this).val().trim();

                if (errorType == 0 && fieldValue) {
                    $(this).removeClass("error");

                    if ($(".error").length == 0)
                        $("#form-errors").fadeOut();

                } else if (errorType == 1 && emailRegex.test(fieldValue)) {
                    $(this).removeClass("error");
                } else {
                    $(this).addClass("error");
                }
            });

        });

        if (error) {
            e.preventDefault();
            $("#form-errors").fadeIn();
        }

    });
})

//Shows the side navigation bar or hides it and sets the active anchor, depending on the window top position.
$(window).scroll(function () {
    if ($(window).scrollTop() >= $("#about").offset().top - 5) {
        var windowTopPosition = $(window).scrollTop();
        
        $("#side-nav").css("visibility", "visible");
        $("#side-nav ul li a").not("first").each(function () {
            var section = $($(this).attr("href"));
            var sectionTop = section.offset().top - 20;
            var sectionBottom = section.offset().top + section.height();

            if (sectionTop <= windowTopPosition && sectionBottom >= windowTopPosition) {
                //Removes any active anchor before setting up the new one.
                $("#side-nav ul li a.active").removeClass("active");
                $(this).addClass("active");
            }
        });
    } else {
        $("#side-nav").css("visibility", "hidden");
    }
});
