/* =========================================================
   TRANSITION — central core morphs between services
   ========================================================= */
(function () {
  const FD = window.FD;

  /* Catalogue of core morph clips, keyed by 1-indexed service numbers
     following the order of FD.DATA:
       "1-2" → Ingeniería civil  → Seguridad electrónica (forward)
       "2-1" → Seguridad electrónica → Ingeniería civil (same morph, reversed)
       "1-3" → Ingeniería civil  → Telecomunicaciones
       "3-1" → Telecomunicaciones → Ingeniería civil (same morph, reversed)
       "1-4" → Ingeniería civil  → Energía y RETIE
       "4-1" → Energía y RETIE   → Ingeniería civil (same morph, reversed)
       "1-5" → Ingeniería civil  → Tecnología y Software
       "5-1" → Tecnología y Software → Ingeniería civil (same morph, reversed)
       "1-6" → Ingeniería civil  → Proyectos Integrales
       "6-1" → Proyectos Integrales → Ingeniería civil (same morph, reversed)
       "1-7" → Ingeniería civil  → Instalaciones Deportivas
       "7-1" → Instalaciones Deportivas → Ingeniería civil (same morph, reversed)
       "2-3" → Seguridad electrónica → Telecomunicaciones
       "3-2" → Telecomunicaciones → Seguridad electrónica (same morph, reversed)
       "2-4" → Seguridad electrónica → Energía y RETIE
       "4-2" → Energía y RETIE   → Seguridad electrónica (same morph, reversed)
       "2-5" → Seguridad electrónica → Tecnología y Software
       "5-2" → Tecnología y Software → Seguridad electrónica (same morph, reversed)
       "2-6" → Seguridad electrónica → Proyectos Integrales
       "6-2" → Proyectos Integrales → Seguridad electrónica (same morph, reversed)
       "2-7" → Seguridad electrónica → Instalaciones Deportivas
       "7-2" → Instalaciones Deportivas → Seguridad electrónica (same morph, reversed)
       "3-4" → Telecomunicaciones → Energía y RETIE
       "4-3" → Energía y RETIE   → Telecomunicaciones (same morph, reversed)
       "3-5" → Telecomunicaciones → Tecnología y Software
       "5-3" → Tecnología y Software → Telecomunicaciones (same morph, reversed)
       "3-6" → Telecomunicaciones → Proyectos Integrales
       "6-3" → Proyectos Integrales → Telecomunicaciones (same morph, reversed)
       "3-7" → Telecomunicaciones → Instalaciones Deportivas
       "7-3" → Instalaciones Deportivas → Telecomunicaciones (same morph, reversed)
       "4-5" → Energía y RETIE   → Tecnología y Software
       "5-4" → Tecnología y Software → Energía y RETIE (same morph, reversed)
       "4-6" → Energía y RETIE   → Proyectos Integrales
       "6-4" → Proyectos Integrales → Energía y RETIE (same morph, reversed)
       "4-7" → Energía y RETIE   → Instalaciones Deportivas
       "7-4" → Instalaciones Deportivas → Energía y RETIE (same morph, reversed)
       "5-6" → Tecnología y Software → Proyectos Integrales
       "6-5" → Proyectos Integrales → Tecnología y Software (same morph, reversed)
       "5-7" → Tecnología y Software → Instalaciones Deportivas
       "7-5" → Instalaciones Deportivas → Tecnología y Software (same morph, reversed)
       "6-7" → Proyectos Integrales → Instalaciones Deportivas
       "7-6" → Instalaciones Deportivas → Proyectos Integrales (same morph, reversed)
       (all 21 service pairs registered) */
  FD.CORE_VIDEOS = {
    "1-2": "assets/video/1-2.mp4",
    "2-1": "assets/video/2-1.mp4",
    "1-3": "assets/video/1-3.mp4",
    "3-1": "assets/video/3-1.mp4",
    "1-4": "assets/video/1-4.mp4",
    "4-1": "assets/video/4-1.mp4",
    "1-5": "assets/video/1-5.mp4",
    "5-1": "assets/video/5-1.mp4",
    "1-6": "assets/video/1-6.mp4",
    "6-1": "assets/video/6-1.mp4",
    "1-7": "assets/video/1-7.mp4",
    "7-1": "assets/video/7-1.mp4",
    "2-3": "assets/video/2-3.mp4",
    "3-2": "assets/video/3-2.mp4",
    "2-4": "assets/video/2-4.mp4",
    "4-2": "assets/video/4-2.mp4",
    "2-5": "assets/video/2-5.mp4",
    "5-2": "assets/video/5-2.mp4",
    "2-6": "assets/video/2-6.mp4",
    "6-2": "assets/video/6-2.mp4",
    "2-7": "assets/video/2-7.mp4",
    "7-2": "assets/video/7-2.mp4",
    "3-4": "assets/video/3-4.mp4",
    "4-3": "assets/video/4-3.mp4",
    "3-5": "assets/video/3-5.mp4",
    "5-3": "assets/video/5-3.mp4",
    "3-6": "assets/video/3-6.mp4",
    "6-3": "assets/video/6-3.mp4",
    "3-7": "assets/video/3-7.mp4",
    "7-3": "assets/video/7-3.mp4",
    "4-5": "assets/video/4-5.mp4",
    "5-4": "assets/video/5-4.mp4",
    "4-6": "assets/video/4-6.mp4",
    "6-4": "assets/video/6-4.mp4",
    "4-7": "assets/video/4-7.mp4",
    "7-4": "assets/video/7-4.mp4",
    "5-6": "assets/video/5-6.mp4",
    "6-5": "assets/video/6-5.mp4",
    "5-7": "assets/video/5-7.mp4",
    "7-5": "assets/video/7-5.mp4",
    "6-7": "assets/video/6-7.mp4",
    "7-6": "assets/video/7-6.mp4",
  };

  // Hidden layouts keep their DOM, so always resolve the core inside the active one.
  const CORE_MEDIA = {
    desktop: "#layout-desktop #d-core-media",
    tablet: "#layout-tablet #t-core-media",
    mobile: "#layout-mobile #m-core",
  };
  const FADE_MS = 280;
  const SAFETY_MS = 9000;
  // Every morph reads in the same beat regardless of its own length: the clip is played at
  // whatever rate makes it last CLIP_SECONDS. Clips are ~3.88s, so they run at ~1.94x.
  const CLIP_SECONDS = 2;

  let current = null; // { node, timer }
  // Last resting frame of a finished clip, so a re-render (language, resize) can put it back.
  let rest = null;    // { to, src, time }

  function reducedMotion() {
    return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }

  FD.coreVideoSrc = function (from, to) {
    return FD.CORE_VIDEOS[`${from + 1}-${to + 1}`] || null;
  };

  function detach(node) {
    if (!node.isConnected) return;
    node.remove();
  }

  /* Speed the clip up (or down) so it always lasts CLIP_SECONDS. Because the whole clip is
     still played, the last frame — which is the destination service render — is preserved. */
  function matchClipLength(node) {
    const d = node.duration;
    if (!d || !isFinite(d) || d <= 0) return;
    const rate = Math.min(4, Math.max(0.5, d / CLIP_SECONDS));
    try { node.playbackRate = rate; } catch (e) { /* ignore */ }
  }

  function release(node) {
    if (!node.isConnected) return;
    node.style.opacity = "0";
    setTimeout(() => detach(node), FADE_MS);
  }

  FD.stopCoreTransition = function () {
    if (!current) return;
    const { node, timer } = current;
    current = null;
    clearTimeout(timer);
    try { node.pause(); } catch (e) { /* ignore */ }
    const host = node.parentElement;
    if (host) host.classList.remove("is-playing");
    release(node);
  };

  // The pair has no clip (or the core was dismissed): forget the resting frame too.
  FD.clearCoreRest = function () {
    rest = null;
  };

  /* A layout re-render destroys the <video>, so the resting frame is rebuilt from the
     last finished clip. Without this the core would jump back to the still photo on
     every language change or breakpoint resize. */
  FD.restoreCoreRestState = function () {
    if (!rest || rest.to !== FD.State.activeIndex) return false;
    const host = document.querySelector(CORE_MEDIA[FD.State.layout] || "");
    if (!host || host.querySelector(".core-morph")) return false;

    const node = document.createElement("video");
    node.className = "core-morph";
    node.src = rest.src;
    node.muted = true;
    node.defaultMuted = true;
    node.playsInline = true;
    node.setAttribute("muted", "");
    node.setAttribute("playsinline", "");
    node.setAttribute("aria-hidden", "true");
    node.preload = "auto";

    const still = host.querySelector(".core-still");
    host.insertBefore(node, still ? still.nextSibling : host.firstChild);

    const entry = { node, timer: 0 };
    current = entry;

    const place = () => {
      if (current !== entry) return;
      try { node.currentTime = rest.time; } catch (e) { /* ignore */ }
      try { node.pause(); } catch (e) { /* ignore */ }
      host.classList.add("is-playing");
    };
    node.addEventListener("loadedmetadata", place, { once: true });
    node.addEventListener("seeked", place, { once: true });
    setTimeout(place, 600);
    return true;
  };

  /* Returns true when the clip took over the core. The still photo of the service we
     leave stays underneath until the clip paints, then steps aside; the destination
     photo only comes back when the clip ends. */
  FD.playCoreTransition = function (from, to) {
    const src = reducedMotion() ? null : FD.coreVideoSrc(from, to);
    if (!src || from === to) return false;

    const host = document.querySelector(CORE_MEDIA[FD.State.layout] || "");
    if (!host || !document.createElement("video").canPlayType("video/mp4")) return false;

    const previous = current;
    current = null;
    if (previous) clearTimeout(previous.timer);

    const node = document.createElement("video");
    node.className = "core-morph";
    node.src = src;
    node.muted = true;
    node.defaultMuted = true;
    node.playsInline = true;
    node.setAttribute("muted", "");
    node.setAttribute("playsinline", "");
    node.setAttribute("aria-hidden", "true");
    node.preload = "auto";

    // Above the still photo, below the hover veil.
    const still = host.querySelector(".core-still");
    host.insertBefore(node, still ? still.nextSibling : host.firstChild);

    // sync() already painted the destination photo; hold the origin one while the clip
    // starts so the first frame lands on an identical image.
    if (still && FD.DATA[from]) still.src = FD.DATA[from].image;

    const entry = { node, timer: 0 };
    current = entry;

    // The previous frame stays on screen until this clip paints its first frame,
    // so switching clips never falls into a black gap.
    let handedOver = false;
    const handOver = () => {
      if (handedOver) return;
      handedOver = true;
      if (previous && previous.node.isConnected) release(previous.node);
      host.classList.add("is-playing");
    };

    // Playback blocked or broken: drop the clip and leave the destination photo.
    const revert = () => {
      if (current !== entry) return;
      clearTimeout(entry.timer);
      if (still && FD.DATA[to]) still.src = FD.DATA[to].image;
      host.classList.remove("is-playing");
      detach(node);
      current = previous && previous.node.isConnected ? previous : null;
    };

    // On end the last frame of the clip stays as the resting image of the destination
    // service: every clip ends on its own render, so there is never a jump to a
    // different still. The photo underneath is kept in sync as a fallback.
    const finish = () => {
      if (current !== entry) return;
      clearTimeout(entry.timer);
      try { node.pause(); } catch (e) { /* ignore */ }
      if (still && FD.DATA[to]) still.src = FD.DATA[to].image;
      rest = { to, src, time: Math.max(0, (node.duration || node.currentTime || 0) - 0.05) };
    };

    node.addEventListener("ended", finish, { once: true });

    node.addEventListener("error", revert, { once: true });
    // Duration is only known once metadata arrives; until then the clip plays at 1x for a
    // few milliseconds, which is imperceptible.
    node.addEventListener("loadedmetadata", () => matchClipLength(node), { once: true });
    if (node.readyState >= 1) matchClipLength(node);
    if (typeof node.requestVideoFrameCallback !== "function") {
      node.addEventListener("playing", handOver, { once: true });
    }

    const playing = node.play();
    if (playing && typeof playing.catch === "function") playing.catch(revert);

    if (typeof node.requestVideoFrameCallback === "function") node.requestVideoFrameCallback(handOver);

    entry.timer = setTimeout(finish, SAFETY_MS);
    return true;
  };

  // Keep the warm-up elements alive: a detached video is garbage collected mid-download
  // and the buffered bytes are lost.
  const warmPool = [];

  FD.preloadCoreVideos = function () {
    // Respect data-saver / very slow connections: the clips load on demand instead.
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (conn && (conn.saveData || /(^|-)2g$/.test(conn.effectiveType || ""))) return;

    const seen = new Set(warmPool.map((node) => node.getAttribute("src")));
    Object.values(FD.CORE_VIDEOS).forEach((src) => {
      if (seen.has(src)) return;
      seen.add(src);
      const node = document.createElement("video");
      node.preload = "auto";
      node.muted = true;
      node.setAttribute("src", src);
      node.load();
      warmPool.push(node);
    });
  };

  // The still photos swap at the end of a clip, so keep them decoded and ready.
  const stillPool = [];

  FD.preloadCoreStills = function () {
    (FD.DATA || []).forEach((it) => {
      if (!it.image || stillPool.some((img) => img.src.endsWith(it.image))) return;
      const img = new Image();
      img.src = it.image;
      stillPool.push(img);
    });
  };

  const warm = () => {
    const run = () => { FD.preloadCoreStills(); FD.preloadCoreVideos(); };
    if (window.requestIdleCallback) requestIdleCallback(run, { timeout: 2500 });
    else setTimeout(run, 1200);
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", warm);
  else warm();
})();
