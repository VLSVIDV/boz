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



});


