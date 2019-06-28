$(function () {

    /*==========FOR SVG ==============*/
    svg4everybody();
    /*FOR MENU*/

    $('.burger').click(function (e) {
        e.preventDefault();
        $('#menu').addClass('open-menu');

    });

    $('.close-menu').click(function (e) {
        e.preventDefault();
        $('#menu').removeClass('open-menu');

    });


    /*VALIDATE*/
        $(".js-form--top").validate({
            submitHandler: function(element) {
                $(".js-form--top").addClass('validate');
                $('#modal-thanks').addClass('open');
            }
        });

    $(".js-form--bottom").validate({
        submitHandler: function(element) {
            $(".js-form--bottom").addClass('validate');
            $('#modal-thanks').addClass('open');
        }

    });

    $(".js-form--call").validate({
        submitHandler: function(element) {
            $(".js-form--call").addClass('validate');
            $('#modal-thanks').addClass('open');
        }

    });
    /*MODAL*/
    var modal=$(".js-modal"),
        btnModal = $(".js-btn-modal"),
        overlayModal = $(".modal-overlay"),
        btnCloseModal = $(".js-close-modal");

    btnModal.on('click', function(event) {
        event.preventDefault();
        var id = $(this).attr("data-modal");
       $(id + ".js-modal").addClass('open');
    });

    btnCloseModal.on('click', function(event) {
        event.preventDefault();
        modal.removeClass('open');
    });

    overlayModal.on('click', function(event) {
        event.preventDefault();
        modal.removeClass('open');
    });

    $(document).keydown(function(evt) {
        if( evt.keyCode === 27 ) {
            $(modal).removeClass('open');
            return false;
        }
    });

    /*----------------------------------------
     TRANSITION SCROLL
     ----------------------------------------*/
    $('.scroll').on("click", function(e) {
        // e.preventDefault();
        var anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $(anchor.attr('href')).offset().top
        }, 1000);
    });

    // slider
    $slick_slider = $('.js-slider');
    settings_slider = {
        dots: true,
        arrows: false
        // more settings
    }
    slick_on_mobile( $slick_slider, settings_slider);

// slick on mobile
    function slick_on_mobile(slider, settings){
        $(window).on('load resize', function() {
            if ($(window).width() > 767) {
                if (slider.hasClass('slick-initialized')) {
                    slider.slick('unslick');
                }
                return
            }
            if (!slider.hasClass('slick-initialized')) {
                return slider.slick(settings);
            }
        });
    };
    
    //slider for faq
    var faqSlider = $('.faq__slider');
    var faqSettings = {
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
    }
    slick_on_mobile(faqSlider, faqSettings);
                  
    //first-screen slider
    var firstSlider = $('.first__slider');
    var firstSettings = {
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
    }
    slick_on_mobile(firstSlider, firstSettings);

    //first-screen toggler
    var tumlberList =$('.first__tumble');
    var itemList =$('.first__item');

    $(tumlberList).on('click', function() {
        var color = $(this).data('color');
        $(itemList).removeClass('active');
        $(tumlberList).removeClass('active brown orange green');
        $(tumlberList).addClass(color);

        $(this).addClass('active');
        $('#first-item-' + color).addClass('active');
        
    });
    

    //map filter
    var mapFilterButtons = $('.map__filter button');
    $(mapFilterButtons).on('click', function() {
        $(mapFilterButtons).removeClass('active');
        $(this).addClass('active');
        var city = $(this).data('city');

        $('.map .card-map').addClass('hidden');
        if (city == 'all') {
            $('.map .card-map').removeClass('hidden');
        } else {
            $('.map #' + city).removeClass('hidden');
        }
    });

    //map popup
    var mapCards = $('.map .card-map');

    $(mapCards).on('click', function() {
        $(mapCards).removeClass('opened');
        $(this).addClass('opened');
    });

    $('.map').on('click', function(e) {
        
        if (
            $(e.target).hasClass('card-map__pin') || 
            $(e.target).prop('tagName') == 'svg' || 
            $(e.target).prop('tagName') == 'use' || 
            $(e.target).prop('tagName') == 'P' || 
            $(e.target).prop('tagName') == 'SPAN' ||
            $(e.target).hasClass('card-map__content') ||
            $(e.target).prop('tagName') == 'IMG'
            ) 
        {
            return;
        }
        $(mapCards).removeClass('opened');
    });


    //product slider

    

    if ($(window).width() < 768) {

        $('.products__content').slick({
            dots: true,
            infinite: false,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
        });
    }

    $slick_slider_products = $('.products__content');
    settings_slider_products = {
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
    }
    slick_on_mobile( $slick_slider_products, settings_slider_products);
});


//product-page popup

$(document).keydown(function(event) { 
    if (event.keyCode == 27) { 
        $('body').removeClass('blocked');
        hidePopup();
    }
});


function blockBody() {
    $('body').addClass('blocked');
}

function unblockBody() {
    $('body').removeClass('blocked');
}

function showPopup() {
        $('.product-page ').addClass('showed');
   
}
function hidePopup() {
    $('.product-page ').removeClass('showed');
    
}


$('.first__more').on('click' , function() {
    showPopup();
    blockBody();
});

$('.card-product__more').on('click' , function() {
    showPopup();
    blockBody();
});


$('.product-page__close').on('click' , function() {
    hidePopup();
    unblockBody();
});





