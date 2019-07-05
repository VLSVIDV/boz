$(function () {
//add bodyspace

function getScrollbarWidth() {

    // Creating invisible container
    var outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll'; // forcing scrollbar to appear
    outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
    document.body.appendChild(outer);
  
    // Creating inner element and placing it in the container
    var inner = document.createElement('div');
    outer.appendChild(inner);
  
    // Calculating difference between container's full width and the child width
    var scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);
  
    // Removing temporary elements from the DOM
    outer.parentNode.removeChild(outer);
  
    return scrollbarWidth;
  
  }
  
  var scrollbarWidth = getScrollbarWidth();
  
  
  
  function addBodySpace() {
    $('body').css('padding-right', scrollbarWidth + 'px');
    $('.product-page').css('max-width', 'calc( 100% - ' + scrollbarWidth + 'px)');
  
  }
  function removeBodySpace() {
    $('body').css('padding-right', '');
    $('.product-page').css('max-width', '');
  }

    /*==========FOR SVG ==============*/
    svg4everybody();
    /*FOR MENU*/

    $('.burger').click(function (e) {
        e.preventDefault();
        blockBody();
        $('#menu').addClass('open-menu');

    });

    $('.close-menu').click(function (e) {
        e.preventDefault();
        unblockBody();
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
            $('.popup-form').removeClass('showed');
            $('#menu').removeClass('open-menu');
            unblockBody();
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

    //product-popup tabs

    function productTabToggle() {
        $('.product-page__toggler').on('click', function(e) {
            var wrapper = $(this).find('.product-page__toggler-wrapper');
            
            if( !$(wrapper).hasClass('opened') ) {
                $(wrapper).addClass('opened');
            } 
    
            if( e.target.tagName == "BUTTON" || e.target.tagName == "SPAN") {
    
                var button = e.target;
                if (e.target.tagName = "SPAN") {
                    button = $(e.target).closest('button');
                }
                if ($(button).hasClass('active')) {
                    return;
                } else {
                    $(wrapper).find('button').removeClass('active');
                    $(button).addClass('active');
                    chooseTab(button);
                }
    
                $(wrapper).removeClass('opened');
            }
        });
    }

    productTabToggle();

    $(window).on('click', function(e) {
        
        if (
            $(e.target).hasClass('product-page__toggler') ||
            $(e.target).hasClass('product-page__toggler-wrapper') ||
            e.target.tagName == "use" ||
            e.target.tagName == "svg" ||
            $(e.target).hasClass('not-close')
        ) {
            return;
        } else {
            $('.product-page__toggler-wrapper').removeClass('opened');
        }
        
    });

    function chooseTab(button) {
        var type = $(button).data('type');
        var tabList = $(button).closest('.product-page__content').find('.product-page__tab');
        $(tabList).removeClass('active');
        
        for (var i = 0; i < tabList.length; i++) {
            var item = tabList[i];
            
            if ($(item).data('type') == type) {
                $(item).addClass('active');
            }
        }
    }
   

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


    //scroll-down button

    $('.first__scroll-btn').on('click', function() {
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#about-section").offset().top
        }, 1000);
    });


    //product-page popup

    $(document).keydown(function(event) { 
        if (event.keyCode == 27) { 
            $('body').removeClass('blocked');
            removeBodySpace();
            hidePopup();
        }
    });

    function checkPopup(number) {
        $('.product-page__slider-container').slick('slickGoTo', number - 1);

    }

    function blockBody() {
        $('body').addClass('blocked');
        addBodySpace();
    }

    function unblockBody() {
        $('body').removeClass('blocked');
        removeBodySpace();
    }

    function showPopup() {
        $('.product-page ').addClass('showed');
    
    }
    function hidePopup() {
        $('.product-page ').removeClass('showed');
    }


    $('.first__more').on('click' , function(e) {
        e.preventDefault();
        var number = $(this).data('number');
        checkPopup(number)
        showPopup();
        blockBody();
    });

    $('.card-product__more').on('click' , function(e) {
        e.preventDefault();
        var number = $(this).data('number');
        checkPopup(number)
        showPopup();
        blockBody();
    });


    $('.product-page__close').on('click' , function() {
        hidePopup();
        unblockBody();
    });

    $('.product-page__slider-container').slick({
            dots: false,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: $('.product-page__control .prev'),
            nextArrow: $('.product-page__control .next')
    })

    //scrolling to section
    $('.header__link').on('click', function(e) {
        e.preventDefault();
        var where = $(this).attr('href');

        if ($('.header .nav').hasClass('open-menu')) {
            $('.header .nav').removeClass('open-menu');
            unblockBody();
        }
        
        $([document.documentElement, document.body]).animate({
            scrollTop: $('#' + where).offset().top
        }, 1000);
    });
    
    $('.footer__link').on('click', function(e) {
        e.preventDefault();
        var where = $(this).attr('href');
        
        $([document.documentElement, document.body]).animate({
            scrollTop: $('#' + where).offset().top
        }, 1000);
    });

    //popup question & poopup request
    $('.js-call-request').on('click', function(e) {
        e.preventDefault();
        $('#request-form').addClass('showed');
        blockBody();
        hidePopup();
    });

    $('.js-call-question').on('click', function(e) {
        e.preventDefault();
        $('#question-form').addClass('showed');
        hidePopup();
        blockBody();
    });

    $('.popup-form__close').on('click', function(e) {
        e.preventDefault();
        $('.popup-form').removeClass('showed');
        unblockBody();
    });
    
});

