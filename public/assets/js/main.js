$(document).ready(function () {
	$(".tabContent .tabpanel:not(:first)").toggle();

	$(".tabs li").click(function () {
		var position = $(this).position();
		var corresponding = $(this).data("id");
		// scroll to clicked tab with a little gap left to show previous tabs
		scroll = $(".tabs").scrollLeft();

		if (window.innerWidth < 576) {
			$(".tabs").animate(
				{
					scrollLeft: scroll + position.left - 100,
				},
				200,
			);
		} else {
			$(".tabs").animate(
				{
					scrollLeft: scroll + position.left - 350,
				},
				200,
			);
		}

		// hide all content divs
		$(".tabContent > .tabpanel").hide();

		// show content of corresponding tab
		$("div." + corresponding).toggle();

		// remove active class from currently not active tabs
		$(".tabs li").removeClass("active");

		// add active class to clicked tab
		$(this).addClass("active");
	});

	$(".accordion-panel .accordion-panel-button").click(function (e) {
		$(".accordion-panel .accordion-panel-button").removeClass("active");
		$(".collapse.show").removeClass("show");
		$(this).addClass("active");
	});

	var worklistCarousel = function () {
		$(".worklist-carousel").owlCarousel({
			loop: true,
			margin: 32,
			dots: false,
			nav: true,
			autoplay: true,
			autoplayTimeout: 3000,
			smartSpeed: 1000,
			autoplayHoverPause: true,
			navText: [
				"<img src='/assets/images/icons/right-arrow.svg'>",
				"<img src='/assets/images/icons/right-arrow.svg'>",
			],
			responsive: {
				0: {
					items: 1.3,
				},
				767: {
					items: 2,
				},
				1200: {
					items: 2,
				},
			},
		}); //hero gaming slider
	};
	worklistCarousel();

	var carousel = function () {
		$(".featurePress-carousel").owlCarousel({
			loop: true,
			margin: 32,
			dots: false,
			nav: true,
			autoplay: true,
			autoplayTimeout: 3000,
			smartSpeed: 1000,
			autoplayHoverPause: true,
			navText: [
				"<img src='/assets/images/icons/right-arrow.svg'>",
				"<img src='/assets/images/icons/right-arrow.svg'>",
			],
			responsive: {
				0: {
					items: 1.3,
				},
				767: {
					items: 2,
				},
				1200: {
					items: 3,
				},
			},
		}); //hero gaming slider
	};
	carousel();

	var brandingCarousel = function () {
		$(".branding-carousel").owlCarousel({
			loop: true,
			margin: 32,
			dots: false,
			nav: true,
			autoplay: true,
			autoplayTimeout: 3000,
			smartSpeed: 1000,
			autoplayHoverPause: true,
			navText: [
				"<img src='/assets/images/icons/right-arrow.svg'>",
				"<img src='/assets/images/icons/right-arrow.svg'>",
			],
			responsive: {
				0: {
					items: 1.3,
					nav: false,
				},
				576: {
					items: 2,
				},
				1200: {
					items: 4,
				},
				1920: {
					items: 5,
				},
			},
		}); //hero gaming slider
	};

	brandingCarousel();
	// Start marquee
	$(".antimated-logos-left").marquee({
		direction: "left",
		duration: 10000,
		gap: 50,
		delayBeforeStart: 0,
		duplicated: true,
		startVisible: true,
	});
	$(".antimated-logos-right").marquee({
		direction: "right",
		duration: 10000,
		gap: 50,
		delayBeforeStart: 0,
		duplicated: true,
		startVisible: true,
	});

	//scrollBar
	$(".scrollBar").animate({ height: "100%" }, 10000);
	var headings = $(".animated-heading .heading");
	var currentHeading = 0;

	function showNextHeading() {
		headings.eq(currentHeading).addClass("active");
		currentHeading++;
		if (currentHeading < headings.length) {
			setTimeout(showNextHeading, 3000);
		}
	}
	showNextHeading();

	/* count */
	$(".count").each(function () {
		$(this)
			.prop("Counter", 0)
			.animate(
				{
					Counter: $(this).text(),
				},
				{
					duration: 5000,
					easing: "swing",
					step: function (now) {
						$(this).text(Math.ceil(now));
					},
				},
			);
	});

	/* topToButton */
	$(".topToButton").on("click", function () {
		$("html, body").animate(
			{
				scrollTop: 0,
			},
			1500,
		);
	});
	/* bookmark */
	$(".bookmark[href^=#]").on("click", function (e) {
		e.preventDefault();
		var href = $(this).attr("href");
		$("html, body").animate(
			{
				scrollTop: $(href).offset().top,
			},
			"slow",
		);
	});

	/* filter */
	$(".filter-btn").click(function () {
		$(this).addClass("closeBtn");
		$(this).removeClass("showBtn");
		$(".filtert-content").addClass("active");
	});

	$(".toggleIcon").click(function () {
		$(".filtert-content").removeClass("active");
		$(".filter-btn").removeClass("closeBtn");
		$(".filter-btn").addClass("showBtn");
	});

	/*  */
	let attached = false;
	let $imageContainer = $("#image-container");

	const followMouse = (event) => {
		$imageContainer.css({
			left: event.pageX + "px",
		});
	};

	$("#showBtn").hover(function () {
		if (!attached) {
			attached = true;
			$imageContainer.css("display", "block");
			$(document).on("mousemove", followMouse);
		} else {
			attached = false;
			$imageContainer.css("display", "none");
			$(document).off("mousemove", followMouse);
		}
	});
});

if (window.innerWidth < 991) {
	$(".info-section .row").marquee({
		direction: "left",
		duration: 10000,
		gap: 50,
		delayBeforeStart: 0,
		duplicated: false,
	});
}

/* header */
$(window).scroll(function () {
	var sticky = $(".headerSticky"),
		scroll = $(window).scrollTop();

	if (scroll >= 100) sticky.addClass("fixed");
	else sticky.removeClass("fixed");
});
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $("header").outerHeight();

$(window).scroll(function (event) {
	didScroll = true;
});

setInterval(function () {
	if (didScroll) {
		hasScrolled();
		didScroll = false;
	}
}, 250);

function hasScrolled() {
	var st = $(this).scrollTop();

	if (Math.abs(lastScrollTop - st) <= delta) return;
	if (st > lastScrollTop && st > navbarHeight) {
		// Scroll Down
		$("header").removeClass("nav-down").addClass("nav-up");
	} else {
		// Scroll Up
		if (st + $(window).height() < $(document).height()) {
			$("header").removeClass("nav-up").addClass("nav-down");
		}
	}

	lastScrollTop = st;
}

$(".navbar-toggle").click(function () {
	$(this).toggleClass("toggler-close");
	$(".header-popup").toggleClass("show");
	$("body,html").toggleClass("no-scroll");
	$(".header").toggleClass("menuopen");
});

$(".dropdown-hover").hover(function () {
	$(".header").toggleClass("menuopen");
});

/* scrollBar animation */
var $line = $(".scrollBar");
var itemHeight =
	$line.parent().height() / $(".animated-heading .heading").length;
$line.css("height", 149);

$(".animated-heading .heading").click(function () {
	$(".animated-heading .heading").removeClass("active");
	$(this).addClass("active");
	var index = $(this).index();
	var targetHeight = (index + 1) * itemHeight;

	$line.css("height", targetHeight);
});

var cursor = {
	delay: 4,
	_x: 0,
	_y: 0,
	endX: window.innerWidth / 2,
	endY: window.innerHeight / 2,
	cursorVisible: true,
	cursorEnlarged: false,
	$dot: $(".cursor-dot"),
	$outline: $(".cursor-dot-outline"),

	init: function () {
		// Set up element sizes
		this.dotSize = this.$dot.width();
		this.outlineSize = this.$outline.width();

		this.setupEventListeners();
		this.animateDotOutline();
	},

	setupEventListeners: function () {
		var self = this;

		// Anchor hovering
		$("a,button")
			.on("mouseover", function () {
				self.cursorEnlarged = true;
				self.toggleCursorSize();
			})
			.on("mouseout", function () {
				self.cursorEnlarged = false;
				self.toggleCursorSize();
			});

		// Click events
		$(document)
			.on("mousedown", function () {
				self.cursorEnlarged = true;
				self.toggleCursorSize();
			})
			.on("mouseup", function () {
				self.cursorEnlarged = false;
				self.toggleCursorSize();
			});

		$(document).on("mousemove", function (e) {
			// Show the cursor
			self.cursorVisible = true;
			self.toggleCursorVisibility();

			// Position the dot
			self.endX = e.pageX;
			self.endY = e.pageY;
			self.$dot.css({
				top: self.endY + "px",
				left: self.endX + "px",
			});
		});

		// Hide/show cursor
		$(document)
			.on("mouseenter", function (e) {
				self.cursorVisible = true;
				self.toggleCursorVisibility();
				self.$dot.css("opacity", 1);
				self.$outline.css("opacity", 1);
			})
			.on("mouseleave", function (e) {
				self.cursorVisible = true;
				self.toggleCursorVisibility();
				self.$dot.css("opacity", 0);
				self.$outline.css("opacity", 0);
			});
	},

	animateDotOutline: function () {
		var self = this;

		self._x += (self.endX - self._x) / self.delay;
		self._y += (self.endY - self._y) / self.delay;
		self.$outline.css({
			top: self._y + "px",
			left: self._x + "px",
		});

		requestAnimationFrame(this.animateDotOutline.bind(self));
	},

	toggleCursorSize: function () {
		var self = this;

		if (self.cursorEnlarged) {
			self.$dot.css({
				"transform": "translate(-50%, -50%) scale(0.5)",
				"background-color": "var(--color-accent)",
				"mix-blend-mode": "normal"
			});
			self.$outline.css("transform", "translate(-50%, -50%) scale(1.5)");
			self.$outline.addClass("active");
		} else {
			self.$dot.css({
				"transform": "translate(-50%, -50%) scale(1)",
				"background-color": "#fff",
				"mix-blend-mode": "difference"
			});
			self.$outline.css("transform", "translate(-50%, -50%) scale(1)");
			self.$outline.removeClass("active");
		}
	},

	toggleCursorVisibility: function () {
		var self = this;
		if (self.cursorVisible) {
			self.$dot.css("opacity", 1);
			self.$outline.css("opacity", 1);
		} else {
			self.$dot.css("opacity", 0);
			self.$outline.css("opacity", 0);
		}
	},
};

cursor.init();

/*  */
$(window).scroll(function () {
	if ($(this).scrollTop() > 500) {
		$(".filter-btn").addClass("show");
	} else {
		$(".filter-btn").removeClass("show");
	}
});
