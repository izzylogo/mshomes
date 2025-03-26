let slideIndex = 0;

function moveSlide(step) {
    const slides = document.querySelectorAll(".carousel-slide");
    const totalSlides = slides.length;
    slideIndex += step;

    if (slideIndex >= totalSlides) {
        slideIndex = 0;
    } else if (slideIndex < 0) {
        slideIndex = totalSlides - 1;
    }

    updateCarousel();
}

function updateCarousel() {
    const track = document.querySelector(".carousel-track");
    const slides = document.querySelectorAll(".carousel-slide");
    const dots = document.querySelectorAll(".carousel-dots span");

    track.style.transform = `translateX(-${slideIndex * 100}%)`;

    // Update active dot
    dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === slideIndex);
    });
}

function createDots() {
    const slides = document.querySelectorAll(".carousel-slide");
    const dotsContainer = document.querySelector(".carousel-dots");

    slides.forEach((_, index) => {
        const dot = document.createElement("span");
        dot.addEventListener("click", () => {
            slideIndex = index;
            updateCarousel();
        });
        dotsContainer.appendChild(dot);
    });

    updateCarousel(); // Set initial active dot
}

// Auto-slide function
function autoSlide() {
    moveSlide(1);
}

// Initialize dots and set auto-slide every 4 seconds
createDots();
setInterval(autoSlide, 4000);

document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const closeBtn = document.querySelector('.close-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    const mobileMenuLinks = document.querySelectorAll('.mobile-nav-links a');

    function toggleMenu() {
        mobileMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    hamburger.addEventListener('click', toggleMenu);
    closeBtn.addEventListener('click', toggleMenu);
    menuOverlay.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleMenu();
            
            // Smooth scroll to section
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Smooth scrolling for navbar links
    const navLinks = document.querySelectorAll('.nav-links a'); 

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor click behavior
            const targetId = this.getAttribute('href'); // Get the target section ID
            const targetSection = document.querySelector(targetId); // Select the target section

            // Scroll to the target section
            targetSection.scrollIntoView({
                behavior: 'smooth', // Smooth scroll
                block: 'start' // Align to the start of the section
            });
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!mobileMenu.contains(event.target) && !hamburger.contains(event.target)) {
            mobileMenu.classList.remove('active'); // Hide the mobile menu
        }
    });
});

// Browse More Properties functionality
document.addEventListener('DOMContentLoaded', function() {
    const browseMoreBtn = document.querySelector('.browse-more-properties .browse-more');
    const propertyCards = document.querySelectorAll('.property-card');
    let isShowingAll = false;

    browseMoreBtn.addEventListener('click', function() {
        isShowingAll = !isShowingAll;
        propertyCards.forEach(card => {
            card.classList.toggle('show-all', isShowingAll);
        });

        // Update button text
        browseMoreBtn.textContent = isShowingAll ? 'Show Less' : 'Browse More Properties';

        // Reinitialize AOS for newly visible elements
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const propertyCarousels = document.querySelectorAll(".property-carousel");

    propertyCarousels.forEach((carousel) => {
        let currentSlide = 0;
        let isAnimating = false; // Prevents multiple clicks at once
        const imagesContainer = carousel.querySelector(".property-carousel-images");
        const images = imagesContainer.querySelectorAll("img");
        const totalSlides = images.length;
        const prevButton = carousel.querySelector(".property-prev-btn");
        const nextButton = carousel.querySelector(".property-next-btn");
        const dotsContainer = carousel.parentElement.querySelector(".property-carousel-dots");

        function updateCarousel() {
            if (isAnimating) return; // Prevent spamming clicks

            isAnimating = true; // Lock animation
            imagesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;

            // Smoothly update active dot
            const dots = dotsContainer.querySelectorAll("span");
            dots.forEach((dot, i) => {
                dot.classList.toggle("active", i === currentSlide);
            });

            // Unlock after transition
            setTimeout(() => {
                isAnimating = false;
            }, 800);
        }

        function changeSlide(step) {
            if (isAnimating) return; // Prevents rapid clicking

            currentSlide += step;

            if (currentSlide >= totalSlides) {
                currentSlide = 0;
            } else if (currentSlide < 0) {
                currentSlide = totalSlides - 1;
            }

            updateCarousel();
        }

        function createDots() {
            dotsContainer.innerHTML = ""; // Clear existing dots if any
            images.forEach((_, i) => {
                const dot = document.createElement("span");
                dot.addEventListener("click", () => {
                    currentSlide = i;
                    updateCarousel();
                });
                dotsContainer.appendChild(dot);
            });

            updateCarousel(); // Set initial active dot
        }

        function autoSlide() {
            changeSlide(1);
        }

        // Attach event listeners
        prevButton.addEventListener("click", () => changeSlide(-1));
        nextButton.addEventListener("click", () => changeSlide(1));

        createDots();
        setInterval(autoSlide, 10000); // Increased auto-slide time for better user experience
    });
});
