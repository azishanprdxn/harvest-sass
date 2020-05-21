/* Author: Zishan Ansari */
'use strict';

// Hamburger Function Starts -------------------------
var hamburger = document.getElementsByClassName('header-flex__hamburger')[0];
var nav = document.getElementsByTagName('nav')[0];
var main = document.getElementsByTagName('main')[0];
var hamburgerIcon = hamburger.children[0];

function toggleNavigation() {
	if (nav.style.maxHeight) {
		hideNavigation();
	} else {
		showNavigation();
	}
}

// Hides the Nav Bar when clicked outside Header
main.addEventListener('click', function () {
	hideNavigation();
});

// Function for Showing Nav Bar
function showNavigation() {
	nav.style.maxHeight = nav.scrollHeight + 'px';
	hamburgerIcon.setAttribute('class', 'fa fa-times');
	hamburgerIcon.style.transform = 'rotate(90deg)';
	hamburgerIcon.style.transition = '.2s';
}

// Function for Hiding Nav Bar
function hideNavigation() {
	nav.style.maxHeight = null;
	hamburgerIcon.setAttribute('class', 'fa fa-bars');
	hamburgerIcon.style.transform = 'rotate(0)';
	hamburgerIcon.style.transition = '.2s';
}
// ---------------------------------------------------

// Banner Slider Starts ------------------------------
var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
	showSlides(slideIndex += n);
}

function showSlides(n) {
	var slides = document.getElementsByClassName('slides');
	if (n > slides.length) { slideIndex = 1 }
	if (n < 1) { slideIndex = slides.length }
	for (var i = 0; i < slides.length; i++) {
		slides[i].style.display = 'none';
	}
	slides[slideIndex - 1].style.display = 'block';
}
// ---------------------------------------------------

// To the top Function Starts ------------------------
function goToTop() {
	document.body.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

window.onscroll = function () {
	toggleToTop();
};

// Hides and Displays button according to some specified pixel
function toggleToTop() {
	if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) {
		document.getElementsByClassName('to-the-top')[0].style.display = 'block';
	} else {
		document.getElementsByClassName('to-the-top')[0].style.display = 'none';
	}
}
// ---------------------------------------------------

// Accordion Function Starts -------------------------
toggleAccordion();

function toggleAccordion() {
	var accordions = document.getElementsByClassName('accordion-title');
	var accordionsData = document.getElementsByClassName('accordion-data');
	var accordionsLength = accordions.length;

	for (var i = 0; i < accordionsLength; i++) {
		accordions[i].onclick = function () {
			var content = this.nextElementSibling;
			// accordion is currently open, so close it
			if (content.style.maxHeight) {
				content.style.maxHeight = null;
				this.classList.remove('active');
				this.firstElementChild.classList.remove('active');
			} else { // accordion is currently closed, so open it
				content.style.maxHeight = content.scrollHeight + 'px';
				this.classList.add('active');
				this.firstElementChild.classList.add('active');
			}

			// Add/Remove codes below this line for single/multiple opened accordions
			for (var i = 0; i < accordionsLength; i++) {
				if (accordionsData[i].style.maxHeight) {
					// This will remove all the properties
					accordionsData[i].style.maxHeight = null;
					accordions[i].classList.remove('active');
					accordions[i].firstElementChild.classList.remove('active');
					// This will add the properties on clicked accordion
					content.style.maxHeight = content.scrollHeight + 'px';
					this.classList.add('active');
					this.firstElementChild.classList.add('active');
				}
			} // Remove till here if you want multiple accordion
		}
	}
}
// ---------------------------------------------------

// Lightbox Function Starts --------------------------
var lightbox = document.getElementsByClassName('lightbox')[0];

function openLightbox() {
	lightbox.style.opacity = '1';
	lightbox.style.transform = 'scale(1, 1)';
}

// Closes the Modal
function closeLightbox() {
	lightbox.style.opacity = '0';
	lightbox.style.transform = 'scale(0, 0)';
}

var imageIndex = 1;
showImages(imageIndex);

// Thumbnail image controls
function currentImage(n) {
	showImages(imageIndex = n);
}

function showImages(n) {
	var slides = document.getElementsByClassName('mySlides');
	if (n > slides.length) { imageIndex = 1 }
	if (n < 1) { imageIndex = slides.length }
	for (var i = 0; i < slides.length; i++) {
		slides[i].style.display = 'none';
	}
	slides[imageIndex - 1].style.display = 'block';

	var images = document.querySelectorAll('.modal-content')[0];

	images.addEventListener('click', function () {
		event.stopPropagation();
	});

	lightbox.addEventListener('click', function () {
		closeLightbox();
	});

	document.onkeydown = function (evt) {
		evt = evt || window.event;
		var isEscape = false;
		if ('key' in evt) {
			isEscape = (evt.key === 'Escape' || evt.key === 'Esc');
		} else {
			isEscape = (evt.keyCode === 27);
		}
		if (isEscape) {
			closeLightbox();
		}
	};
}
// ---------------------------------------------------

// Form Validation Starts ----------------------------
var helperLength = document.getElementsByClassName('helper').length;
var helperArray = [];
for (var i = 0; i < helperLength; i++) {
	helperArray.push(document.getElementsByClassName('helper')[i]);
}
var emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// On Submit Function
function onFormSubmit() {
	// Store value from the input given by the user
	var name = document.getElementById('name').value;
	var email = document.getElementById('email').value;
	var company = document.getElementById('company').value;
	var terms = document.getElementById('terms');

	// For name
	if (!name) {
		showHelper(0);
	} else {
		hideHelper(0);
	}

	// For email
	if (email.match(emailPattern)) {
		hideHelper(1);
	} else {
		showHelper(1);
	}

	// For Company
	if (!company) {
		showHelper(2);
	} else {
		hideHelper(2);
	}

	// For Terms
	if (terms.checked == false) {
		showHelper(3);
	} else {
		hideHelper(3);
	}

	function showHelper(index) {
		for (var i = 0; i < helperLength; i++) {
			helperArray[index].style.opacity = '1';
			helperArray[index].style.paddingLeft = '16px';
			helperArray[index].style.transition = '.2s';
		}
	}

	function hideHelper(index) {
		for (var i = 0; i < helperLength; i++) {
			helperArray[index].style.opacity = '0';
			helperArray[index].style.paddingLeft = '6px';
			helperArray[index].style.transition = '.2s';
		}
	}

	// Validate if all the data is filled
	if (!name || !email.match(emailPattern) || !company || terms.checked == false) {
		return;
	} else { // Run this if all the data is filled
		alert('Thank You!');
		// Reset the current form data
		document.querySelector('form').reset();
	}
}
// ---------------------------------------------------