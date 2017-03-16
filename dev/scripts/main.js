"use strict";

const kmOutage = {
	devEnvironment: false,
	videosLoaded: false,

	// shorthand helper methods that implicitly return
	// the querySelector and querySelectorAll methods
	dqs: (query) => document.querySelector(query),
	dqsa: (query) => document.querySelectorAll(query)
};

kmOutage.init = () => {
	kmOutage.checkEnvironment();
	kmOutage.initialWidth();
};

kmOutage.checkEnvironment = () => {
	if(window.location.href.indexOf("localhost") > -1) {
		kmOutage.devEnvironment = true;
	}
};

kmOutage.initialWidth = () => {
	const initialWidth = window.innerWidth; // width of window + scrollbar

	// if initial width is tablet/desktop, load the videos
	// if initial width is mobile, do nothing
	if (initialWidth >= 768) {
		kmOutage.loadVideos();
	}
};

kmOutage.loadVideos = () => {
	kmOutage.dqs(".paddle").setAttribute("src", "/sites/default/files/uploads/outage/paddle.mp4");
	kmOutage.dqs(".drums").setAttribute("src", "/sites/default/files/uploads/outage/drums.mp4");
	kmOutage.videosLoaded = true;
};

kmOutage.calculateWidth = () => {
	let currentWidth = window.innerWidth; // width of viewable area + scrollbar

	// if current width is tablet/desktop AND the videos are not loaded, load the videos
	// if current width is mobile, do nothing
	if (currentWidth >= 768 && kmOutage.videosLoaded === false) {
		kmOutage.loadVideos();
	}
};

// when window is resized, recalculate width and check the environment
window.onresize = () => {
	kmOutage.calculateWidth();
	
	if(kmOutage.devEnvironment === true) {
		wdHelper.calculateDimensions();
	}
};

document.addEventListener("DOMContentLoaded", () => {
	kmOutage.init();
});