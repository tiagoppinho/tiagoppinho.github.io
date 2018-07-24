$(function(){
    $("a").click(function(e){
        //don't activate the default action of 'a' element.
        e.preventDefault();
        $("html, body").animate({
            //gets the href attribute of the element and scrolls to their top.
            scrollTop: $($(this).attr('href')).offset().top
        }, 1200);
    });
})

//TODO: 

//TODO: 

