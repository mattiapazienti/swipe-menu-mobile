(function ($) {
    
    wrapper = $('body');
    el = wrapper.find('.mobile'); 
    act = el.children().children();
    act.children().not('a').hide();
    act.click(function() {
        if($(this).hasClass('open')) {
            $(this).removeClass('open');
            $(this).children().not('a').slideUp('slow');
        } else {
            $(this).addClass('open');
            $(this).children().not('a').slideDown('slow');
            $(this).siblings().removeClass('open');
            $(this).siblings().children().not('a').slideUp('slow');
        }
    });
   
   
    var target = document.getElementsByTagName('body');
    var check = {any:function(){
       return navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i);
    }};
    if(check.any()) {
        $('nav').css('position', 'relative');
    };

   
    var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x
    $('body').bind(mousewheelevt, function(e){

        var evt = window.event || e //equalize event object     
        evt = evt.originalEvent ? evt.originalEvent : evt; //convert to originalEvent if possible               
        var delta = evt.detail ? evt.detail*(-40) : evt.wheelDelta //check for detail first, because it is used by Opera and FF

        if(delta > 0) {
              $('#nav').slideDown(300);  
        }
        else{
            $('#nav').slideUp(300);
        }   
    });


    // detect upward downward swipe
    function addSwipeListener(el, listener){
        var startY;
        var distance;
        var direction;

        function onTouchStart(e){
            if (e.touches.length > 0) {
                startY = e.touches[0].pageY;
                el.addEventListener('touchmove', onTouchMove, false);
                el.addEventListener('touchend', onTouchEnd, false);
            }
        };

        function onTouchMove(e){
            if (e.touches.length > 1){
                return;
            } else {
              distance = e.touches[0].pageY - startY;
            }
            if (Math.abs(distance) > 15) {
                c = 10;
                listener({ target: el, direction: distance > 0 ? '' + $('#nav').addClass('m_open') + '' : '' + $('#nav').removeClass('m_open') + '' });
            }
        };
        el.addEventListener('touchstart', onTouchStart, false);
    };

    addSwipeListener(document.body);
    
})(jQuery);
