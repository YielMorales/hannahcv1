document.addEventListener("DOMContentLoaded", function () {
  const sliderTrack = document.querySelector(".slider-track");
  const slides = Array.from(document.querySelectorAll(".project-slide"));
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const dotsContainer = document.querySelector(".slider-dots");
  if (!sliderTrack || !slides.length) return;

  const GAP = 24;
  let currentIndex = 0;

  // How many cards are visible at once
  function visibleCount() {
    if (window.innerWidth <= 640) return 1;
    if (window.innerWidth <= 960) return 2;
    return 2; 
  }

  // Total number of "pages"
  function pageCount() {
    return Math.ceil(slides.length / visibleCount());
  }

  // Width of one card
  function cardWidth() {
    const n = visibleCount();
    return (sliderTrack.parentElement.offsetWidth - GAP * (n - 1)) / n;
  }

  // Apply widths to all slides
  function applyWidths() {
    const w = cardWidth();
    slides.forEach((s) => {
      s.style.width = w + "px";
      s.style.minWidth = w + "px";
      s.style.flexShrink = "0";
    });
  }

  // Move track
  function updateSlider(animate) {
    applyWidths();
    const w = cardWidth();
    const n = visibleCount();
    // Jump by n cards per page
    const offset = -(currentIndex * n * (w + GAP));
    sliderTrack.style.transition =
      animate === false ? "none" : "transform 0.45s ease";
    sliderTrack.style.transform = `translateX(${offset}px)`;
    // Mark all slides as fully visible (no dimming)
    slides.forEach((s) => {
      s.classList.remove("center", "visible", "edge");
      s.classList.add("visible");
    });
    updateDots();
    updateButtons();
  }

  // Dots — one per page
  function buildDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = "";
    for (let i = 0; i < pageCount(); i++) {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => {
        currentIndex = i;
        updateSlider(true);
      });
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    if (!dotsContainer) return;
    const dots = dotsContainer.querySelectorAll(".dot");
    if (dots.length !== pageCount()) {
      buildDots();
      return;
    }
    dots.forEach((d, i) => d.classList.toggle("active", i === currentIndex));
  }

  function updateButtons() {
    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = currentIndex >= pageCount() - 1;
  }

  function next() {
    if (currentIndex < pageCount() - 1) {
      currentIndex++;
      updateSlider(true);
    }
  }
  function prev() {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider(true);
    }
  }

  if (nextBtn) nextBtn.addEventListener("click", next);
  if (prevBtn) prevBtn.addEventListener("click", prev);

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  });

  let tStart = 0;
  sliderTrack.addEventListener("touchstart", (e) => {
    tStart = e.changedTouches[0].screenX;
  });
  sliderTrack.addEventListener("touchend", (e) => {
    const diff = tStart - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
  });

  let rTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(rTimeout);
    rTimeout = setTimeout(() => {
      currentIndex = 0;
      buildDots();
      updateSlider(false);
    }, 200);
  });

  buildDots();
  updateSlider(false);
});
