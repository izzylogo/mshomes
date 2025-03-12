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






// let currentSlide = 0;

// function changeSlide(step) {
//     const propertySlides = document.querySelectorAll(".property-carousel-images img");
//     const totalPropertySlides = propertySlides.length;
//     currentSlide += step;

//     if (currentSlide >= totalPropertySlides) {
//         currentSlide = 0;
//     } else if (currentSlide < 0) {
//         currentSlide = totalPropertySlides - 1;
//     }

//     updatePropertyCarousel();
// }

// function updatePropertyCarousel() {
//     const propertyTrack = document.querySelector(".property-carousel-images");
//     const propertyDots = document.querySelectorAll(".property-carousel-dots span");

//     propertyTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

//     // Update active dot
//     propertyDots.forEach((dot, index) => {
//         dot.classList.toggle("active", index === currentSlide);
//     });
// }

// function createPropertyDots() {
//     const propertySlides = document.querySelectorAll(".property-carousel-images img");
//     const propertyDotsContainer = document.querySelector(".property-carousel-dots");

//     propertySlides.forEach((_, index) => {
//         const dot = document.createElement("span");
//         dot.addEventListener("click", () => {
//             currentSlide = index;
//             updatePropertyCarousel();
//         });
//         propertyDotsContainer.appendChild(dot);
//     });

//     updatePropertyCarousel(); // Set initial active dot
// }

// // Auto-slide function
// function autoPropertySlide() {
//     changeSlide(1);
// }

// // Initialize dots and set auto-slide every 4 seconds
// document.addEventListener("DOMContentLoaded", () => {
//     createPropertyDots();
//     setInterval(autoPropertySlide, 4000);
// });


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
