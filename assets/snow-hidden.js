function snow() {
	var canvas = $('<canvas></canvas>').attr('id', 'background').css({
		position: 'fixed',
		left: 0,
		top: 0,
		pointerEvents: 'none' 	// forwarding mouse event : background is overlayed on body, but this allow to clike on body's elements
	}).appendTo('body')[0];
	var canvasWidth = canvas.width = screen.width;
	var canvasHeight = canvas.height = screen.height;
	var mouseX = 0, mouseY = 0;
	var isPressed = false;
	var bombCount = 0;

	var context = canvas.getContext('2d');

	var snows = [];
	var angle = 0;
	var windVelX = 0;
	var windAccelX = 0;
	var windForceX = 0;

	for (i = 0; i < 60; i++) {
		snows.push({
			x: Math.random() * canvasWidth,
			y: Math.random() * canvasHeight,
			radius: Math.random() * 3 + 2,
			curvature: Math.random() * 3 + 1
		});
	}

	function draw() {
		context.clearRect(0, 0, canvasWidth, canvasHeight);
		//context.fillRect(0, 0, canvasWidth, canvasHeight);

    var WHITE = "rgba(255, 255, 255, 0.9)";
    var GRAY = "rgba(200, 200, 200, 0.7)"

    function fillCircle(colorStr, radiusInc) {
      context.fillStyle = colorStr;
  		context.beginPath();
  		for (i = 0; i < snows.length; i++) {
  			context.moveTo(snows[i].x, snows[i].y);
  			context.arc(snows[i].x, snows[i].y, snows[i].radius + radiusInc, 0, 2 * Math.PI, false);
  		}
  		context.fill();
  		context.closePath();
    }

    fillCircle(GRAY, 2);
    fillCircle(WHITE, 0);
	}

	function falling() {
		for (i = 0; i < snows.length; i++) {
			snows[i].x += Math.sin(angle) * snows[i].radius + windVelX;
			snows[i].y += Math.cos(angle) + snows[i].curvature + snows[i].radius / 2;

			if ((snows[i].x < -5 || snows[i].x > canvasWidth + 5) || snows[i].y > canvasHeight + 5) {
				if (i % 3 != 0) {
					snows[i].x = Math.random() * canvasWidth;
					snows[i].y = -5;
				} else {
					if (windVelX > 0) {
						snows[i].x = -5;
						snows[i].y = Math.random() * canvasHeight;
					} else {
						snows[i].x = canvasWidth + 5;
						snows[i].y = Math.random() * canvasHeight;
					}
				}
			}
		}
	}

	function attract() {
		for (i = 0; i < snows.length; i++) {
			snows[i].x += (mouseX - snows[i].x) / 10;
			snows[i].y += (mouseY - snows[i].y) / 10;
		}
	}

	function distract() {
		var theta = 1 / snows.length * Math.PI * 2;
		for (i = 0; i < snows.length; i++) {
			snows[i].x += 100 * Math.cos(theta * i);
			snows[i].y += 100 * Math.sin(theta * i);
		}
	}

	function windy() {
		windForceX *= 0.9;
		windAccelX += windForceX;
		windAccelX *= 0.9;
		windVelX += windAccelX;
		windVelX *= 0.9;
	}

	$('body').mousemove(function(e) {	// make winds
		windForceX = (e.clientX - mouseX) / 10;
		if (windForceX > 5) windForceX = 5;
		if (windForceX < -5) windForceX = -5;
		mouseX = e.clientX;
		mouseY = e.clientY;
	});

	$('body, html').mouseleave(function(e) {	// initialize windForce when mouse re enter
		windForceX = 0;
		$(this).one({
			mouseenter: function(e) { windForceX = 0; mouseX = e.pageX; }
		});
	});

	$('body').mousedown(function(e) {	// save attracted position, and attract flag ( isPressed ) true
		mouseX = e.clientX;
		mouseY = e.clientY;
		output = '';
		isPressed = true;
	});

	$('body').mouseup(function() {	// charge bombCount to spread snows for that counts
		isPressed = false;
		bombCount = 5;
	});

	$(this).mouseleave();	// when body load, init mouseX, mouseY by trigger event

	setInterval(function() {
		windy();
		falling();
		if (isPressed) {
			attract();
		}
		if (bombCount > 0) {
			distract();
			bombCount--;
		}
		draw();
		angle += 0.05;
	}, 33);
}

(function() {
  var LEFT_ARROW = 37;
  var UP_ARROW = 38;
  var RIGHT_ARROW = 39;
  var DOWN_ARROW = 40;

  var COMMAND = [ UP_ARROW, UP_ARROW, DOWN_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, LEFT_ARROW, RIGHT_ARROW, 'b', 'a' ];
  var step = 0;

  window.addEventListener('keydown', function(e) {
    if (step < COMMAND.length && (e.keyCode == COMMAND[step] || e.key === COMMAND[step])) {
      step++;

      if (step == COMMAND.length) {
        snow();
      }
    } else {
      step = 0;
    }
  });
})();
