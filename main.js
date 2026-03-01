// main.js

document.addEventListener("DOMContentLoaded", () => {
  // ===== Mobile nav toggle =====
  const navToggle = document.querySelector(".nav-toggle");
  const siteHeader = document.querySelector(".site-header");

  if (navToggle && siteHeader) {
    navToggle.addEventListener("click", () => {
      siteHeader.classList.toggle("nav-open");
    });
  }

    // ===== Partners strip horizontal scroll (wheel + drag) =====
  const partnersStrip = document.querySelector(".partners-strip");
  const partnersTrack = document.querySelector('.partners-track');

  if (partnersStrip && partnersTrack) {
    // Auto scroll class
   partnersTrack.innerHTML += partnersTrack.innerHTML;

    // pause on hover
    partnersStrip.addEventListener("mouseenter", () => {
      partnersTrack.style.animationPlayState = "paused";
    });

    partnersStrip.addEventListener("mouseleave", () => {
      partnersTrack.style.animationPlayState = "running";
    });
    
    // scroll horizontally with mouse wheel / touchpad
    partnersStrip.addEventListener("wheel", (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        partnersStrip.scrollLeft += e.deltaY;
      }
    });

    // click + drag to scroll
    let isDown = false;
    let startX;
    let startScrollLeft;

    partnersStrip.addEventListener("mousedown", (e) => {
      isDown = true;
      partnersStrip.classList.add("dragging");
      startX = e.pageX - partnersStrip.offsetLeft;
      startScrollLeft = partnersStrip.scrollLeft;
    });

    window.addEventListener("mouseup", () => {
      isDown = false;
      partnersStrip.classList.remove("dragging");
    });

    partnersStrip.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - partnersStrip.offsetLeft;
      const walk = (x - startX) * 1.2; // drag speed
      partnersStrip.scrollLeft = startScrollLeft - walk;
    });
  }

  // ===== Contact form success popup (only if form + popup exist) =====
  const contactForm = document.querySelector("form");
const successPopup = document.getElementById("success-popup");

if (contactForm && successPopup) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    successPopup.style.display = "block";
    setTimeout(() => {
      successPopup.style.display = "none";
      contactForm.reset(); // Clear form after submit
    }, 3500);
  });
}

  // ===== Scroll reveal =====
  const revealElements = document.querySelectorAll(".reveal");

  function handleScrollReveal() {
    const triggerBottom = window.innerHeight * 0.85;

    revealElements.forEach((el) => {
      const elementTop = el.getBoundingClientRect().top;

      if (elementTop < triggerBottom) {
        el.classList.add("active");
      }
    });
  }

  // run once on load
  handleScrollReveal();
  // and on scroll
  window.addEventListener("scroll", handleScrollReveal);
});

// ===== Navbar scroll shadow effect =====
window.addEventListener("scroll", () => {
  if (window.scrollY > 10) {
    document.body.classList.add("scrolled");
  } else {
    document.body.classList.remove("scrolled");
  }
});

  // ===== Load shared footer =====
  const footerPlaceholder = document.getElementById("footer-placeholder");

  if (footerPlaceholder) {
    fetch("footer.html")
      .then((response) => response.text())
      .then((html) => {
        footerPlaceholder.innerHTML = html;
      })
      .catch((err) => {
        console.error("Error loading footer:", err);
      });
  }