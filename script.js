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
    const menuBtn = document.querySelector('.menu-btn');
    const closeBtn = document.querySelector('.close-menu');
    const mobileMenu = document.querySelector('.mobile-menu');

    menuBtn.addEventListener('click', function() {
        mobileMenu.classList.add('active'); // Show the mobile menu
    });

    closeBtn.addEventListener('click', function() {
        mobileMenu.classList.remove('active'); // Hide the mobile menu
    });

    // Smooth scrolling for navbar links
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-links a'); // Include mobile links

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

            // Close mobile menu if it's open
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active'); // Hide the mobile menu
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!mobileMenu.contains(event.target) && !menuBtn.contains(event.target)) {
            mobileMenu.classList.remove('active'); // Hide the mobile menu
        }
    });
});
