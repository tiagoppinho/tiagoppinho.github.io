$(function(){
    $("a").not("#download-buttons a").click(function(e){
        //don't activate the default action of 'a' element.
        e.preventDefault();
        $("html, body").animate({
            //gets the href attribute of the element and scrolls to their top.
            scrollTop: $($(this).attr("href")).offset().top
        }, 1200);
    });
})

//Shows the side navigation bar or hides it and sets the active anchor, depending on the window top position.
$(window).scroll(function(){
    if ($(window).scrollTop() >= $("#about").offset().top - 5){
        $("#side-nav").css("visibility", "visible");
        var windowTopPosition = $(window).scrollTop();
        $("#side-nav ul li a").not("first").each(function(){
            var section = $($(this).attr("href"));
            var sectionTop = section.offset().top - 20;
            var sectionBottom = section.offset().top + section.height();
            if(sectionTop <= windowTopPosition && sectionBottom >= windowTopPosition){
                //Removes any active anchor before setting up the new one.
                $("#side-nav ul li a.active").removeClass("active");
                $(this).addClass("active");
            }
        });
    } else {
        $("#side-nav").css("visibility", "hidden");
    }
});
