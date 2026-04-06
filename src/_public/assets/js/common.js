document.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth <= 1024) {
    document.querySelectorAll("img[loading='lazy']").forEach((img) => {
      img.loading = "eager";
    });
  }
});

window.addEventListener("load", () => {
  initHamburger();
  initHeaderOnScroll();
  initSwiper();
});

function initHamburger() {
  const hamburger = document.getElementById("hamburger");
  const menu = document.getElementById("menu");

  if (!hamburger || !menu) {
    console.log("ERROR: hamburger or menu element not found");
    return;
  }

  hamburger.addEventListener("click", () => {
    const isActive = hamburger.classList.toggle("active");
    menu.classList.toggle("show");

    document.body.classList.toggle("is-menu-open", isActive);
  });

  // Close menu when a link is clicked
  const menuLinks = menu.querySelectorAll("a");
  console.log("Menu links found:", menuLinks.length);
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      menu.classList.remove("show");
    });
  });

  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !menu.contains(e.target)) {
      if (hamburger.classList.contains("active")) {
        const isActive = hamburger.classList.toggle("active");
        menu.classList.toggle("show");
        document.body.classList.toggle("is-menu-open", isActive);
      }
    }
  });
}

function initHeaderOnScroll() {
  const header = document.querySelector(".c-header");
  if (!header) return;

  const mainvisual = document.querySelector(".c-mv");

  if (mainvisual) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            header.classList.add("is-active");
          } else {
            header.classList.remove("is-active");
          }
        });
      },
      {
        root: null,
        threshold: 0,
      },
    );

    observer.observe(mainvisual);
    return;
  }

  const page = document.querySelector(".js-header-contrast");
  if (!page) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.classList.add("is-active");
    } else {
      header.classList.remove("is-active");
    }
  });
}

function initSwiper() {
  const swiper = new Swiper(".js-inter-slide", {
    slidesPerView: "auto",
    spaceBetween: 8,
    breakpoints: {
      768: {
        spaceBetween: 16,
      },
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}
