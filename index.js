// ── Falling lily petals 
(function spawnPetals() {
  const container = document.createElement("div");
  container.id = "petals";
  container.style.cssText =
    "position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1;overflow:hidden;";
  document.body.prepend(container);

  const petalColors = [
    [220, 100, 130],
    [240, 150, 172],
    [248, 180, 196],
    [200, 150, 60],
    [235, 185, 85],
    [130, 175, 115],
  ];

  for (let i = 0; i < 22; i++) {
    const p = document.createElement("div");
    const [r, g, b] =
      petalColors[Math.floor(Math.random() * petalColors.length)];
    const size = 5 + Math.random() * 9;
    const dur = 14 + Math.random() * 18;
    const delay = -Math.random() * dur;
    const startX = Math.random() * 100;
    const driftX = (Math.random() - 0.5) * 180;
    const rot = Math.random() * 360;
    const rotEnd = rot + (Math.random() - 0.5) * 200;
    const opacity = 0.18 + Math.random() * 0.22;
    const rx1 = 55 + Math.random() * 15;
    const ry1 = 35 + Math.random() * 10;
    p.style.cssText = `position:absolute;width:${size}px;height:${size * 0.55}px;
      border-radius:${rx1}% ${100 - rx1}% ${100 - ry1}% ${ry1}% / ${ry1}% ${ry1}% ${100 - ry1}% ${100 - ry1}%;
      background:rgba(${r},${g},${b},${opacity});left:${startX}%;top:-20px;
      animation:petalFall ${dur}s ease-in-out infinite ${delay}s;
      --drift:${driftX}px;--rot-start:${rot}deg;--rot-end:${rotEnd}deg;`;
    container.appendChild(p);
  }

  const style = document.createElement("style");
  style.textContent = `@keyframes petalFall{
    0%{transform:translateX(0) translateY(0) rotate(var(--rot-start));opacity:0}
    8%{opacity:1}88%{opacity:0.7}
    100%{transform:translateX(var(--drift)) translateY(108vh) rotate(var(--rot-end));opacity:0}}`;
  document.head.appendChild(style);
})();



(function initBarNav() {
  const nav = document.querySelector("nav");
  if (!nav) return;

  const links = Array.from(nav.querySelectorAll(".nav-links a"));

  /* Petal burst animation on click */
  function burstPetals(link) {
    const rect = link.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();
    const cx = rect.left - navRect.left + rect.width / 2;
    const cy = rect.top - navRect.top + rect.height / 2;

    const colors = [
      "rgba(212,96,122,0.75)",
      "rgba(240,150,172,0.65)",
      "rgba(248,180,196,0.60)",
      "rgba(200,150,60,0.75)",
      "rgba(235,185,85,0.62)",
      "rgba(130,175,115,0.55)",
    ];

    for (let i = 0; i < 10; i++) {
      const dot = document.createElement("span");
      dot.className = "nav-burst";
      const size = 3 + Math.random() * 5;
      const angle = (i / 10) * Math.PI * 2 + (Math.random() - 0.5);
      const dist = 16 + Math.random() * 24;
      const tx = Math.cos(angle) * dist;
      const ty = Math.sin(angle) * dist;
      const dur = 0.38 + Math.random() * 0.28;
      const delay = Math.random() * 0.06;

      dot.style.cssText =
        "width:" +
        size +
        "px;" +
        "height:" +
        size * 0.6 +
        "px;" +
        "background:" +
        colors[i % colors.length] +
        ";" +
        "left:" +
        (cx - size / 2) +
        "px;" +
        "top:" +
        (cy - size / 2) +
        "px;" +
        "--tx:" +
        tx +
        "px;" +
        "--ty:" +
        ty +
        "px;" +
        "--dur:" +
        dur +
        "s;" +
        "--delay:" +
        delay +
        "s;" +
        "border-radius:55% 45% 50% 50% / 48% 52% 48% 52%;";

      nav.querySelector(".nav-bar").appendChild(dot);
      void dot.offsetWidth;
      dot.classList.add("pop");
      setTimeout(
        function () {
          dot.remove();
        },
        (dur + delay) * 1000 + 100,
      );
    }
  }

  /* Activate a link */
  function activate(link, doInk) {
    links.forEach(function (a) {
      a.classList.remove("nav-active");
    });
    link.classList.add("nav-active");
    if (doInk) burstPetals(link);
  }

  /* Click listeners */
  links.forEach(function (a) {
    a.addEventListener("click", function (e) {
      var href = this.getAttribute("href");
      if (href.charAt(0) === "#") {
        e.preventDefault();
        var target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: "smooth" });
      }
      activate(this, true);
    });
  });

  /* Auto-detect which page is active on load */
  setTimeout(function () {
    var path = window.location.pathname.toLowerCase();
    var idx = 0;
    if (path.indexOf("about") !== -1) idx = 1;
    if (path.indexOf("timeline") !== -1) idx = 3;
    if (links[idx]) activate(links[idx], false);
  }, 80);
})();
