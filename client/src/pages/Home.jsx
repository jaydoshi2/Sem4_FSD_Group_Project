import React, { useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "aos/dist/aos.css";
import "glightbox/dist/css/glightbox.min.css";
import "swiper/css";
import "swiper/css/bundle";
// import "../styles/Home.css";
import AOS from "aos";
import GLightbox from "glightbox";
import Swiper from "swiper";
import imagesLoaded from "imagesloaded";
import Isotope from "isotope-layout";
import HeroImage from "../assets/images/profile.png";
import four from "../assets/images/hero-img.png";
import webLogo from "../assets/images/profile.png"
import te from "../assets/images/sampleprofile.png"
import { HashLink as Link } from "react-router-hash-link";
import About from './About.jsx'
import TeamSection from "./TeamSection.jsx";
import ContactSection from "./ContactSection.jsx";
import Footer from "../components/Footer.jsx";
import Testimonials from "./Testimonials.jsx";
import NumAnimation from "../components/NumAnimation.jsx";
import NavBar from "../components/Navbar.jsx";

const Home = () => {
  const mobileNavToggleBtn = useRef(null);

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector("body");
    const selectHeader = document.querySelector("#header");
    if (
      !selectHeader ||
      !selectBody ||
      (!selectHeader.classList.contains("scroll-up-sticky") &&
        !selectHeader.classList.contains("sticky-top") &&
        !selectHeader.classList.contains("fixed-top"))
    )
      return;

    const viewportHeight = window.innerHeight;
    if (window.scrollY > viewportHeight) {
      selectBody.classList.add("scrolled");
      selectHeader.classList.add("blue");
    } else {
      selectBody.classList.remove("scrolled");
      selectHeader.classList.remove("blue");
    }
  }

  useEffect(() => {
    document.addEventListener("scroll", toggleScrolled);
    window.addEventListener("load", toggleScrolled);

    return () => {
      document.removeEventListener("scroll", toggleScrolled);
      window.removeEventListener("load", toggleScrolled);
    };
  }, []);

  /**
   * Mobile nav toggle
   */
  function mobileNavToggle() {
    document.body.classList.toggle("mobile-nav-active");
    if (mobileNavToggleBtn.current) {
      mobileNavToggleBtn.current.classList.toggle("bi-list");
      mobileNavToggleBtn.current.classList.toggle("bi-x");
    }
  }

  useEffect(() => {
    if (mobileNavToggleBtn.current) {
      mobileNavToggleBtn.current.addEventListener("click", mobileNavToggle);
    }

    return () => {
      if (mobileNavToggleBtn.current) {
        mobileNavToggleBtn.current.removeEventListener(
          "click",
          mobileNavToggle
        );
      }
    };
  }, []);

  /**
   * Hide mobile nav on same-page/hash links
   */
  useEffect(() => {
    function handleNavMenuClick() {
      if (document.body.classList.contains("mobile-nav-active")) {
        mobileNavToggle();
      }
    }

    document.querySelectorAll("#navmenu a").forEach((navmenu) => {
      navmenu.addEventListener("click", handleNavMenuClick);
      return () => navmenu.removeEventListener("click", handleNavMenuClick);
    });

    return () => {
      document.querySelectorAll("#navmenu a").forEach((navmenu) => {
        navmenu.removeEventListener("click", handleNavMenuClick);
      });
    };
  }, []);

  /**
   * Toggle mobile nav dropdowns
   */
  useEffect(() => {
    function handleToggleDropdownClick(e) {
      e.preventDefault();
      const parentNode = e.target.parentNode;
      if (parentNode) {
        parentNode.classList.toggle("active");
        if (parentNode.nextElementSibling) {
          parentNode.nextElementSibling.classList.toggle("dropdown-active");
        }
      }
      e.stopPropagation();
    }

    document
      .querySelectorAll(".navmenu .toggle-dropdown")
      .forEach((navmenu) => {
        navmenu.addEventListener("click", handleToggleDropdownClick);
        return () =>
          navmenu.removeEventListener("click", handleToggleDropdownClick);
      });

    return () => {
      document
        .querySelectorAll(".navmenu .toggle-dropdown")
        .forEach((navmenu) => {
          navmenu.removeEventListener("click", handleToggleDropdownClick);
        });
    };
  }, []);

  /**
   * Preloader
   */
  useEffect(() => {
    const preloader = document.querySelector("#preloader");
    if (preloader) {
      window.addEventListener("load", () => {
        preloader.remove();
      });
    }
  }, []);

  /**
   * Scroll top button
   */
  useEffect(() => {
    function handleScrollTopClick(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    const scrollTop = document.querySelector(".scroll-top");
    if (scrollTop) {
      scrollTop.addEventListener("click", handleScrollTopClick);
    }

    return () => {
      if (scrollTop) {
        scrollTop.removeEventListener("click", handleScrollTopClick);
      }
    };
  }, []);

  /**
   * Animation on scroll function and init
   */
  useEffect(() => {
    function aosInit() {
      AOS.init({
        duration: 600,
        easing: "ease-in-out",
        once: true,
        mirror: false,
      });
    }

    window.addEventListener("load", aosInit);

    return () => {
      window.removeEventListener("load", aosInit);
    };
  }, []);

  /**
   * Initiate glightbox
   */
  useEffect(() => {
    const glightbox = GLightbox({
      selector: ".glightbox",
    });
  }, []);

  /**
   * Init swiper sliders
   */
  useEffect(() => {
    function initSwiper() {
      document
        .querySelectorAll(".init-swiper")
        .forEach(function (swiperElement) {
          let config = JSON.parse(
            swiperElement.querySelector(".swiper-config").innerHTML.trim()
          );

          new Swiper(swiperElement, config);
        });
    }

    window.addEventListener("load", initSwiper);

    return () => {
      window.removeEventListener("load", initSwiper);
    };
  }, []);


  /**
   * Init isotope layout and filters
   */
  useEffect(() => {
    function initIsotopeLayout() {
      document
        .querySelectorAll(".isotope-layout")
        .forEach(function (isotopeItem) {
          let layout = isotopeItem.getAttribute("data-layout") || "masonry";
          let filter = isotopeItem.getAttribute("data-default-filter") || "*";
          let sort = isotopeItem.getAttribute("data-sort") || "original-order";

          imagesLoaded(
            isotopeItem.querySelector(".isotope-container"),
            function () {
              new Isotope(isotopeItem.querySelector(".isotope-container"), {
                itemSelector: ".isotope-item",
                layoutMode: layout,
                filter: filter,
                sortBy: sort,
              });
            }
          );

          isotopeItem
            .querySelectorAll(".isotope-filters li")
            .forEach(function (filters) {
              filters.addEventListener(
                "click",
                function () {
                  isotopeItem
                    .querySelector(".isotope-filters .filter-active")
                    .classList.remove("filter-active");
                  this.classList.add("filter-active");
                  // Reinitialize Isotope after filter change if needed
                  imagesLoaded(
                    isotopeItem.querySelector(".isotope-container"),
                    function () {
                      new Isotope(
                        isotopeItem.querySelector(".isotope-container"),
                        {
                          itemSelector: ".isotope-item",
                          layoutMode: layout,
                          filter: filters.getAttribute("data-filter"),
                          sortBy: sort,
                        }
                      );
                    }
                  );
                  if (typeof aosInit === "function") {
                    /*  aosInit(); */
                  }
                },
                false
              );
            });
        });
    }

    window.addEventListener("load", initIsotopeLayout);

    return () => {
      window.removeEventListener("load", initIsotopeLayout);
    };
  }, []);

  /**
   * Navmenu Scrollspy
   */
  useEffect(() => {
    const navmenulinks = document.querySelectorAll('.navmenu a');

    const navmenuScrollspy = () => {
      navmenulinks.forEach(navmenulink => {
        if (!navmenulink.hash) return;
        let section = document.querySelector(navmenulink.hash);
        if (!section) return;
        let position = window.scrollY + 200;
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
          document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
          navmenulink.classList.add('active');
        } else {
          navmenulink.classList.remove('active');
        }
      });
    };

    window.addEventListener('load', navmenuScrollspy);
    document.addEventListener('scroll', navmenuScrollspy);

    return () => {
      window.removeEventListener('load', navmenuScrollspy);
      document.removeEventListener('scroll', navmenuScrollspy);
    };
  }, []);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  useEffect(() => {
    const handlePageLoad = (e) => {
      if (window.location.hash) {
        const section = document.querySelector(window.location.hash);
        if (section) {
          setTimeout(() => {
            const scrollMarginTop = getComputedStyle(section).scrollMarginTop;
            window.scrollTo({
              top: section.offsetTop - parseInt(scrollMarginTop),
              behavior: 'smooth'
            });
          }, 100);
        }
      }
    };

    window.addEventListener('load', handlePageLoad);

    return () => {
      window.removeEventListener('load', handlePageLoad);
    };
  }, []);


  /**
   * Return Home component
   */
  return (
    <div className="home-page specific-page">
    <main className="main">
        <section id="hero" className="hero section dark-background">
          <div className="container">
            <div className="row gy-4">
              <div
                className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center"
                data-aos="zoom-out"
              >
                <h1>Skillbridge</h1>
                <p>
                  Online Learning Platform
                </p>
                <div className="d-flex">
                  <Link
                    to="https://youtu.be/y7TlnAv6cto?si=Y5aBi33foYFZVDfc"
                    className="glightbox btn-watch-video d-flex align-items-center"
                  >
                    <i className="bi bi-play-circle"></i>
                    <span>How To Use</span>
                  </Link>
                </div>
              </div>
              <div
                className="col-lg-6 order-1 order-lg-2 hero-img"
                data-aos="zoom-out"
                data-aos-delay="200"
              >
                <img
                  src={four}
                  className="img-fluid animated"
                  alt="Hero"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <About />
      <NumAnimation />
      <Testimonials />
    </div>
    );
};

export default Home;