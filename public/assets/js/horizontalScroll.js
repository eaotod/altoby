/* horizontal-scroll-section */
var core = document.documentElement,
	that = $(".horizontal-scroll-section"),
	middle,
	spot,
	deluge,
	peak,
	free;

$(core).on("mousewheel keydown", function (e, delta) {
	if (e.which == 38 || e.which == 40) e.preventDefault();
	if (e.originalEvent.repeat && that.add(core).is(":animated")) return;

	var up = delta > 0,
		area = core.scrollTop,
		seat = that[0].scrollLeft,
		room = seat < deluge,
		edges = that[0].getBoundingClientRect(),
		space = peak - area,
		early = area < peak,
		beyond = area > peak,
		leap = 300;
	free = true;

	if (delta) {
		if (
			(!up && edges.top < middle && !beyond) ||
			(up && edges.bottom > middle && !early)
		) {
			if ((!up && room) || (up && seat)) {
				that[0].scrollLeft -= 100 * delta;
				free = false;
			}
		}
	}

	if (e.which == 38) {
		if (seat && space > -300 && !early) leap = Math.abs(space);
		if (space || !seat)
			$(core)
				.stop()
				.animate({ scrollTop: "-=" + leap }, 500);
		else if (!space) {
			that.stop().animate(
				{
					scrollLeft: "-=500",
				},
				{
					duration: 500,
					step: function () {
						if (!that[0].scrollLeft) that.stop();
					},
				},
			);
		}
	}

	if (e.which == 40) {
		if (room && space < 300 && !beyond) leap = Math.abs(space);
		if (space || !room)
			$(core)
				.stop()
				.animate({ scrollTop: "+=" + leap }, 500);
		else if (!space) {
			that.stop().animate(
				{
					scrollLeft: "+=500",
				},
				{
					duration: 500,
					step: function () {
						if (that[0].scrollLeft == deluge) that.stop();
					},
				},
			);
		}
	}
});

$(window)
	.resize(function () {
		middle = $(this).height() / 2;
		spot = that.offset().top;
		deluge = that[0].scrollWidth - that.width();
		peak = Math.round(spot - (2 * middle - that.outerHeight(true)) / 2);
	})
	.resize()[0]
	.addEventListener(
		"wheel",
		function (e) {
			e.preventDefault();
			if (free) core.scrollTop += e.deltaY;
			else core.scrollTop = peak;
		},
		{
			passive: false,
		},
	);
