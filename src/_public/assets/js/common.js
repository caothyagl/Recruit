document.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth <= 1024) {
    document.querySelectorAll("img[loading='lazy']").forEach((img) => {
      img.loading = "eager";
    });
  }
});

window.addEventListener("load", () => {
  initHamburger();
  initHeaderActiveOnScroll();
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

function initHeaderActiveOnScroll() {
  const header = document.querySelector(".c-header");
  const mainvisual = document.querySelector(".c-mv");

  if (!header || !mainvisual) return;

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
