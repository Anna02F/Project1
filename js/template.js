/* Theme Name: The Project - Responsive Website Template
 * Author:HtmlCoder
 * Author URI:http://www.htmlcoder.me
 * Author e-mail:htmlcoder.me@gmail.com
 * Version:1.4.0
 * Created:March 2015
 * License URI:http://support.wrapbootstrap.com/
 * File Description: Initializations of plugins
 */

(function($){
	$(document).ready(function(){


        $(window).load(function() {
            $("body").removeClass("no-trans");
        });
		// Enable Smooth Scroll only on Chrome and only on Win and Linux Systems
		var platform = navigator.platform.toLowerCase();
		if ((platform.indexOf('win') == 0 || platform.indexOf('linux') == 0) && !Modernizr.touch) {
			if ($.browser.webkit) {
				$.webkitSmoothScroll();
			}
		};
		//Show dropdown on hover only for desktop devices
		//-----------------------------------------------
		var delay=0, setTimeoutConst;
		if ((Modernizr.mq('only all and (min-width: 768px)') && !Modernizr.touch) || $("html.ie8").length>0) {
			$('.main-navigation:not(.onclick) .navbar-nav>li.dropdown, .main-navigation:not(.onclick) li.dropdown>ul>li.dropdown').hover(
			function(){
				var $this = $(this);
				setTimeoutConst = setTimeout(function(){
					$this.addClass('open').slideDown();
					$this.find('.dropdown-toggle').addClass('disabled');
				}, delay);

			},	function(){
				clearTimeout(setTimeoutConst );
				$(this).removeClass('open');
				$(this).find('.dropdown-toggle').removeClass('disabled');
			});
		};

		//Show dropdown on click only for mobile devices
		//-----------------------------------------------
		if (Modernizr.mq('only all and (max-width: 767px)') || Modernizr.touch || $(".main-navigation.onclick").length>0 ) {
			$('.header [data-toggle=dropdown], .header-top [data-toggle=dropdown]').on('click', function(event) {
			// Avoid following the href location when clicking
			event.preventDefault();
			// Avoid having the menu to close when clicking
			event.stopPropagation();
			// close all the siblings
			$(this).parent().siblings().removeClass('open');
			// close all the submenus of siblings
			$(this).parent().siblings().find('[data-toggle=dropdown]').parent().removeClass('open');
			// opening the one you clicked on
			$(this).parent().toggleClass('open');
			});
		};

		//Owl carousel
		//-----------------------------------------------
		if ($('.owl-carousel').length>0) {
            $("*[dir='ltr'] .owl-carousel.home-carousel").owlCarousel({
                items:1,
                loop: false,
                dots: true,
                nav: true,
                navText: false
            });
			$("*[dir='ltr'] .owl-carousel.offer-carousel").owlCarousel({
				items:1,
				dots: true,
				nav: true,
				loop: false,
				navText: false,
				responsive:{
					479:{
						items:2
					},
					768:{
						items:2
					},
					992:{
						items:3
					},
					1200:{
						items:4
					}
				}
			});
            $("*[dir='ltr'] .owl-carousel.dest-carousel").owlCarousel({
                items:1,
                loop: false,
                dots: true,
                nav: true,
                navText: false,
                responsive:{
                	380:{
                        items:2
					},
                    480:{
                        items:2
                    },
                    768:{
                        items:2
                    },
                    992:{
                        items:4
                    },
                    1200:{
                        items:4
                    },
                    1300:{
                        items:5
                    }
                }
            });

			$("*[dir='ltr'] .owl-carousel.content-slider").owlCarousel({
				items: 1,
				autoplay: true,
				autoplayTimeout: 5000,
				autoplaySpeed: 700,
				loop: false,
				nav: false,
				navText: false,
				dots: false
			});
			$("*[dir='ltr'] .owl-carousel.content-slider-with-controls").owlCarousel({
				items: 1,
				loop: false,
				autoplay: false,
				nav: true,
				dots: true
			});

			var sync1 = $(".owl-carousel.content-slider-with-thumbs");
			var sync2 = $(".owl-carousel.content-slider-thumbs");
			var slidesPerPage = 4; //globaly define number of elements per page
			var syncedSecondary = true;

			if ($("*[dir='ltr']").length>0) {
				sync1.owlCarousel({
					items : 1,
					slideSpeed : 700,
					nav: true,
					autoplay: false,
					dots: false,
					loop: false,
					responsiveRefreshRate : 200
				}).on('changed.owl.carousel', syncPosition);

				sync2.on('initialized.owl.carousel', function () {
					sync2.find(".owl-item").eq(0).addClass("current");
				}).owlCarousel({
					items : slidesPerPage,
					dots: false,
					nav: false,
					smartSpeed: 200,
					slideSpeed : 500,
					slideBy: slidesPerPage,
					responsiveRefreshRate : 100
				}).on('changed.owl.carousel', syncPosition2);
			} else {
				sync1.owlCarousel({
					items : 1,
					slideSpeed : 700,
					nav: true,
					autoplay: false,
					rtl: true,
					dots: false,
					loop: false,
					responsiveRefreshRate : 200
				}).on('changed.owl.carousel', syncPosition);

				sync2.on('initialized.owl.carousel', function () {
					sync2.find(".owl-item").eq(0).addClass("current");
				}).owlCarousel({
					items : slidesPerPage,
					dots: false,
					nav: false,
					rtl: true,
					smartSpeed: 200,
					slideSpeed : 500,
					slideBy: slidesPerPage,
					responsiveRefreshRate : 100
				}).on('changed.owl.carousel', syncPosition2);
			}
			function syncPosition(el) {
				//if you set loop to false, you have to restore this next line
				//var current = el.item.index;

				//if you disable loop you have to comment this block
				var count = el.item.count-1;
				var current = Math.round(el.item.index - (el.item.count/2) - .5);

				if(current < 0) {
					current = count;
				}
				if(current > count) {
					current = 0;
				}

				//end block
				sync2.find(".owl-item").removeClass("current").eq(current).addClass("current");
				var onscreen = sync2.find('.owl-item.active').length - 1;
				var start = sync2.find('.owl-item.active').first().index();
				var end = sync2.find('.owl-item.active').last().index();

				if (current > end) {
					sync2.data('owl.carousel').to(current, 100, true);
				}
				if (current < start) {
					sync2.data('owl.carousel').to(current - onscreen, 100, true);
				}
			}

			function syncPosition2(el) {
				if(syncedSecondary) {
					var number = el.item.index;
					sync1.data('owl.carousel').to(number, 100, true);
				}
			}

			sync2.on("click", ".owl-item", function(e){
				e.preventDefault();
				var number = $(this).index();
				sync1.data('owl.carousel').to(number, 300, true);
			});
		};

		// Stats Count To
		//-----------------------------------------------
		if ($(".stats [data-to]").length>0) {
			$(".stats [data-to]").each(function() {
				var stat_item = $(this),
				offset = stat_item.offset().top;
				if($(window).scrollTop() > (offset - 800) && !(stat_item.hasClass('counting'))) {
					stat_item.addClass('counting');
					stat_item.countTo({
                        formatter: function (value, options) {
                            value = value.toFixed(options.decimals);
                            value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                            return value;
                        }
					});

				};
				$(window).scroll(function() {
					if($(window).scrollTop() > (offset - 800) && !(stat_item.hasClass('counting'))) {
						stat_item.addClass('counting');
						stat_item.countTo({
                            formatter: function (value, options) {
                                value = value.toFixed(options.decimals);
                                value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                                return value;
                            }
						});
					}
				});
			});
		};
		//Scroll totop
		//-----------------------------------------------
		$(window).scroll(function() {
			if($(this).scrollTop() != 0) {
				$(".scrollToTop").addClass("fadeToTop");
				$(".scrollToTop").removeClass("fadeToBottom");
			} else {
				$(".scrollToTop").removeClass("fadeToTop");
				$(".scrollToTop").addClass("fadeToBottom");
			}
		});

		$(".scrollToTop").click(function() {
			$("body,html").animate({scrollTop:0},800);
		});


		// Parallax section
		//-----------------------------------------------
		if (($(".parallax").length>0)  && !Modernizr.touch ){
			$(".parallax").parallax();
		};


		// Remove Button
		//-----------------------------------------------
		$(".btn-remove").click(function() {
			$(this).closest(".remove-data").remove();
		});

		//-----------------------------------------------
		$('.header-top .dropdown-menu input').click(function(e) {
			e.stopPropagation();
		});
        var didScroll;
        var lastScrollTop = 0;
        var delta = 5;
        var navbarHeight = $('header').outerHeight();

        $(window).scroll(function(event){
            didScroll = true;
        });

        setInterval(function() {
            if (didScroll) {
                hasScrolled();
                didScroll = false;
            }
        }, 250);

        function hasScrolled() {
            var st = $(this).scrollTop();
            if(Math.abs(lastScrollTop - st) <= delta)
                return;
            if (st > lastScrollTop && st > navbarHeight){
                $('header').removeClass('nav-down').addClass('nav-up');
                $('.sorting-banner').removeClass('sorting-top')
            } else {
                if(st + $(window).height() < $(document).height()) {
                    $('header').removeClass('nav-up').addClass('nav-down');
                    $('.sorting-banner').addClass('sorting-top')
                }
            }

            lastScrollTop = st;
        }
        $('header, .sorting-banner').affix({
            offset: {
                top: 100
            }
        })
        $("#open-search").click(function () {
            $('#search-banner').addClass('popup-box-on');
        });

        $(".remove-search").click(function () {
            $('#search-banner').removeClass('popup-box-on');
        });
        $('[data-toggle="tooltip"]').tooltip();

        if ($(".rev_slider_wrapper").length>0) {
            $("#rev_slider_20_1").show().revolution({
                sliderType:"hero",
                jsFileLocation:"plugins/rs-plugin/js/",
                sliderLayout:"fullwidth",
                dottedOverlay:"none",
                delay:1000,
                navigation: {
                },
                responsiveLevels:[1240,1024,778,480],
                gridwidth:[1400,1240,778,480],
                gridheight:[650, 768, 768, 768],
                lazyType:"none",
                parallax: {
                    type:"mouse+scroll",
                    origo:"slidercenter",
                    speed:1000,
                    levels:[1,2,3,20,25,30,35,40,45,50],
                    disable_onmobile:"on"
                },
                shadow:0,
                spinner:"off",
                autoHeight:"off",
                disableProgressBar:"on",
                hideThumbsOnMobile:"off",
                hideSliderAtLimit:0,
                hideCaptionAtLimit:0,
                hideAllCaptionAtLilmit:0,
                debugMode:false,
                fallbacks: {
                    simplifyAll:"off",
                    disableFocusListener:false,
                }
            });
		};

    });

})(this.jQuery);


