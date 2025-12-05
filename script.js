// script.js
document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("nav");
  const navLinks = document.getElementById("navLinks");
  const hamburger = document.getElementById("hamburger");
  const navItems = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("section[id]");
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");
  const yearSpan = document.getElementById("year");

  // Set current year
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // MOBILE NAV TOGGLE
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
      document.body.style.overflow = navLinks.classList.contains("active")
        ? "hidden"
        : "";
    });

    // Close menu on link click
    navItems.forEach((item) => {
      item.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
        document.body.style.overflow = "";
      });
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (
        !hamburger.contains(e.target) &&
        !navLinks.contains(e.target) &&
        navLinks.classList.contains("active")
      ) {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }

  // NAVBAR SCROLL EFFECT
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    if (scrollY > 80) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });

  // SMOOTH SCROLL FOR INTERNAL LINKS
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const navHeight = nav.offsetHeight;
      const targetPosition = target.offsetTop - navHeight - 10;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    });
  });

  // INTERSECTION OBSERVER FOR SECTIONS (FADE IN)
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");

          // If this is the research section, animate its cards with stagger
          if (entry.target.id === "research") {
            const cards = entry.target.querySelectorAll(".research-card");
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add("animate");
              }, index * 150);
            });
          }
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -80px 0px",
    }
  );

  document.querySelectorAll(".reveal").forEach((section) => {
    observer.observe(section);
  });

  // ACTIVE NAV LINK ON SCROLL
  const setActiveNavLink = () => {
    const scrollPosition = window.scrollY;
    const navHeight = nav.offsetHeight;

    sections.forEach((section) => {
      const top = section.offsetTop - navHeight - 120;
      const bottom = top + section.offsetHeight;

      if (scrollPosition >= top && scrollPosition < bottom) {
        navItems.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${section.id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  };

  window.addEventListener("scroll", setActiveNavLink);
  setActiveNavLink();

  // CONTACT FORM (FRONT-END ONLY)
  if (contactForm && formStatus) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name")?.value.trim();
      const email = document.getElementById("email")?.value.trim();
      const message = document.getElementById("message")?.value.trim();

      if (!name || !email || !message) {
        formStatus.textContent = "Please fill in all fields.";
        formStatus.style.color = "#ffdddd";
        return;
      }

      formStatus.textContent = "Sending...";
      formStatus.style.color = "#f0e4d7";

      setTimeout(() => {
        formStatus.textContent =
          "✓ Message sent (demo). Connect via email or LinkedIn to follow up.";
        formStatus.style.color = "#b6fbb6";
        contactForm.reset();
      }, 1200);
    });
  }

  // SCROLL TO TOP BUTTON
  const scrollBtn = document.createElement("button");
  scrollBtn.className = "scroll-top-btn";
  scrollBtn.textContent = "↑";
  document.body.appendChild(scrollBtn);

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      scrollBtn.classList.add("visible");
    } else {
      scrollBtn.classList.remove("visible");
    }
  });

  // SUBTLE PAGE FADE-IN
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";
  requestAnimationFrame(() => {
    document.body.style.opacity = "1";
  });

  console.log("✨ Portfolio loaded with interactive hover and research animations.");
});
