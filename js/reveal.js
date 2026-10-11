(function () {
  "use strict";

  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  var TARGET_SELECTOR = [
    ".eyebrow",
    "h1",
    "h2",
    "h3",
    "p",
    ".btn",
    ".text-link-chevron",
    ".text-link-arrow",
    ".expect-step",
    ".topic-list li",
    ".podcast-item",
    ".work-cta-box"
  ].join(", ");

  function init() {
    var sections = document.querySelectorAll("section");

    sections.forEach(function (section) {
      // The homepage hero already has its own load-in animation; don't double it up.
      if (section.classList.contains("hero")) return;

      var targets = section.querySelectorAll(TARGET_SELECTOR);
      var count = 0;

      targets.forEach(function (el) {
        // Skip elements whose ancestor within this same set is already a reveal target
        // (keeps list items from double-animating with their own nested text).
        if (el.closest(".reveal")) return;

        el.classList.add("reveal");
        var delay = Math.min(count * 0.08, 0.4);
        el.style.transitionDelay = delay + "s";
        count++;
      });
    });

    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach(function (el) {
        el.classList.add("is-in");
      });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".reveal").forEach(function (el) {
      io.observe(el);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
