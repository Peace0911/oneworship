(function () {
  const VIDEOS = window.ONEWORSHIP_VIDEOS || [];
  const CHANNEL = window.ONEWORSHIP_CHANNEL || "https://www.youtube.com/@oneworship_official";

  // Videos
  const grid = document.getElementById("videoGrid");
  if (VIDEOS.length === 0) {
    grid.innerHTML = `
      <a class="video-empty" href="${CHANNEL}/videos" target="_blank" rel="noopener">
        <span class="logo">oneworship</span>
        유튜브 채널에서 원워십의 찬양 영상을 만나보세요 →
      </a>`;
  } else {
    VIDEOS.forEach(v => {
      const el = document.createElement("div");
      el.className = "video";
      el.innerHTML = `
        <div class="thumb" role="button" tabindex="0">
          <img src="https://i.ytimg.com/vi/${encodeURIComponent(v.id)}/hqdefault.jpg" alt="" loading="lazy">
        </div>
        <div class="meta"></div>`;
      el.querySelector(".meta").textContent = v.title;
      const thumb = el.querySelector(".thumb");
      thumb.setAttribute("aria-label", v.title + " 재생");
      const play = () => {
        const f = document.createElement("iframe");
        f.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(v.id)}?autoplay=1&playsinline=1`;
        f.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen";
        f.allowFullscreen = true;
        f.title = v.title;
        thumb.replaceWith(f);
      };
      thumb.addEventListener("click", play);
      thumb.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); play(); }
      });
      grid.appendChild(el);
    });
  }

  // Nav
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 10);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const menuBtn = document.getElementById("menuBtn");
  const links = document.getElementById("navLinks");
  const setMenu = open => {
    links.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.textContent = open ? "✕" : "☰";
  };
  menuBtn.addEventListener("click", () => setMenu(!links.classList.contains("open")));
  links.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("click", e => {
    if (!nav.contains(e.target)) setMenu(false);
  });

  // Reveal on scroll (구형 브라우저에서는 바로 표시)
  const items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
    items.forEach(el => io.observe(el));
  } else {
    items.forEach(el => el.classList.add("in"));
  }

  document.getElementById("year").textContent = new Date().getFullYear();
})();
