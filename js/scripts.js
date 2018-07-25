$(function(){
    $("a").click(function(e){
        //don't activate the default action of 'a' element.
        e.preventDefault();
        $("html, body").animate({
            //gets the href attribute of the element and scrolls to their top.
            scrollTop: $($(this).attr("href")).offset().top
        }, 1200);
    });
})

//Shows the side navigation bar or hides it, depending on the scroll position.
$(window).scroll(function(){
    if ($(window).scrollTop() >= $("#about").offset().top - 5) 
        $("#side-nav").css("visibility", "visible");
    else
        $("#side-nav").css("visibility", "hidden");
});
