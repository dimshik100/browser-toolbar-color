// ========== Transition graph begin. This isn't part of the actual code. ==========
//var stats = {};
//stats.table = document.getElementById("stats").tBodies[0];
//stats.initialColor = [];
//stats.targetColor = [];
//stats.distance = [];
//stats.increment = [];
//stats.currentColor = [];
//for (var i = 0; i < 3; i++) {
//	stats.initialColor.push(stats.table.children[i + 1].children[0].children[1]);
//	stats.currentColor.push(stats.table.children[i + 1].children[1]);
//	stats.targetColor.push(stats.table.children[i + 1].children[2]);
//	stats.distance.push(stats.table.children[i + 1].children[3]);
//	stats.increment.push(stats.table.children[i + 1].children[4]);
//}
//stats.update = function (row, colorArray) {
//	for (var i = 0; i < colorArray.length; i++) {
//		stats[row][i].innerHTML = colorArray[i];
//	}
//};
//stats.bars = document.getElementsByClassName("bar");
//stats.updateBars = function () {
//	var maxWidth = 283;
//	var currentDistance = calculateDistance(currentColor, targetColor);
//	var progress = calculateDistance(distance, currentDistance);
//	for (var i = 0; i < 3; i++) {
//		var percentage = Math.floor(progress[i] / distance[i] * 100);
//		this.bars[i].style.width = Math.floor(percentage / 100 * maxWidth) + "px";
//	}
//};
// ==================== Transition graph end ====================

function getElementBG(elm) {
	var bg = getComputedStyle(elm).backgroundColor;
	bg = bg.match(/\((.*)\)/)[1];
	bg = bg.split(",");
	for (var i = 0; i < bg.length; i++) {
		bg[i] = parseInt(bg[i], 10);
	}
	if (bg.length > 3) {
		bg.pop();
	}
	return bg;
}

function generateRGB(min, max) {
	var min = min || 0;
	var max = max || 255;
	var color = [];
	for (var i = 0; i < 3; i++) {
		var num = Math.floor(Math.random() * max);
		while (num < min) {
			num = Math.floor(Math.random() * max);
		}
		color.push(num);
	}
	return color;
}

function calculateDistance(colorArray1, colorArray2) {
	var distance = [];
	for (var i = 0; i < colorArray1.length; i++) {
		distance.push(Math.abs(colorArray1[i] - colorArray2[i]));
	}
	return distance;
}

function calculateIncrement(distanceArray, fps, duration) {
	var fps = fps || 30;
	var duration = duration || 1;
	var increment = [];
	for (var i = 0; i < distanceArray.length; i++) {
		increment.push(Math.abs(Math.floor(distanceArray[i] / (fps * duration))));
		if (increment[i] == 0) {
			increment[i]++;
		}
	}
	return increment;
}

function rgb2hex(colorArray) {
	var hex = [];
	for (var i = 0; i < colorArray.length; i++) {
		hex.push(colorArray[i].toString(16));
		if (hex[i].length < 2) {
			hex[i] = "0" + hex[i];
		}
	}
	return "#" + hex.join("");
}

var fps = 30;
var duration = 50;
var transElement = document.body;
var currentColor = getElementBG(transElement);
var targetColor = generateRGB(50, 225);
var distance = calculateDistance(currentColor, targetColor);
var increment = calculateIncrement(distance, fps, duration);

//// not part of the actual code, updating top left corner stats table
//stats.update("initialColor", currentColor);
//stats.update("currentColor", currentColor);
//stats.update("targetColor", targetColor);
//stats.update("distance", distance);
//stats.update("increment", increment);

function transition() {
	if (currentColor[0] > targetColor[0]) {
		currentColor[0] -= increment[0];
		if (currentColor[0] <= targetColor[0]) {
			increment[0] = 0;
		}
	} else {
		currentColor[0] += increment[0];
		if (currentColor[0] >= targetColor[0]) {
			increment[0] = 0;
		}
	}

	if (currentColor[1] > targetColor[1]) {
		currentColor[1] -= increment[1];
		if (currentColor[1] <= targetColor[1]) {
			increment[1] = 0;
		}
	} else {
		currentColor[1] += increment[1];
		if (currentColor[1] >= targetColor[1]) {
			increment[1] = 0;
		}
	}

	if (currentColor[2] > targetColor[2]) {
		currentColor[2] -= increment[2];
		if (currentColor[2] <= targetColor[2]) {
			increment[2] = 0;
		}
	} else {
		currentColor[2] += increment[2];
		if (currentColor[2] >= targetColor[2]) {
			increment[2] = 0;
		}
	}

	transElement.style.backgroundColor = rgb2hex(currentColor);
	changeThemeColor(rgb2hex(currentColor));

	//	// not part of the actual code, updating top left corner stats table
	//	stats.update("currentColor", currentColor);
	//	stats.updateBars();

	if (increment[0] == 0 && increment[1] == 0 && increment[2] == 0) {
		clearInterval(intervalId);

		targetColor = generateRGB(25, 225);
		distance = calculateDistance(currentColor, targetColor);
		increment = calculateIncrement(distance, fps, duration);

		//		// not part of the actual code, updating top left corner stats table
		//		stats.update("initialColor", currentColor);
		//		stats.update("currentColor", currentColor);
		//		stats.update("targetColor", targetColor);
		//		stats.update("distance", distance);
		//		stats.update("increment", increment);

		intervalId = setInterval(function () {
			transition();
		}, 1000 / fps);
	}
}

var intervalId = setInterval(function () {
	transition();
}, 1000 / fps);







/*  ---------------------   */

var redBtn = document.getElementById('red');
var blueBtn = document.getElementById('blue');
var stopBtn = document.getElementById('stop');

redBtn.addEventListener('click', function () {
	changeThemeColor('#ff0000');
});

stopBtn.addEventListener('click', function () {
	clearInterval(intervalId);
});


blueBtn.addEventListener('click', function () {
	changeThemeColor('blue');
});

var chromeTheme = document.getElementsByName('theme-color')[0],
	windowsPhoneTheme = document.getElementsByName('msapplication-navbutton-color')[0],
	iosTheme = document.getElementsByName('apple-mobile-web-app-status-bar-style')[0];

function changeThemeColor(color) {
	chromeTheme.setAttribute('content', color);
	windowsPhoneTheme.setAttribute('content', color);
	iosTheme.setAttribute('content', color);
}
