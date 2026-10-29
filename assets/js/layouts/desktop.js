/* =========================================================
   DESKTOP LAYOUT — orbital stage + two flanking cards
   ========================================================= */
(function () {
  const FD = window.FD;
  const { $, $$, el, t, item, d, State } = FD;

  function render() {
    const root = document.getElementById("layout-desktop");
    root.className = "layout active flex flex-col justify-between h-screen w-screen overflow-hidden relative font-sans bg-[#050507] text-[#f4f4f5]";

    root.innerHTML = `
      <!-- Ambient backdrop -->
      <div class="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[760px] h-[760px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_0%,rgba(52,211,153,0.015)_25%,rgba(255,255,255,0.003)_50%,transparent_70%)] blur-2xl satin-halo"></div>
        <div class="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] opacity-40"></div>
      </div>

      <!-- Topbar -->
      <header class="relative z-30 w-full h-[54px] shrink-0 bg-[#09090c]/75 backdrop-blur-2xl border-b border-white/[0.07] px-4 lg:px-7 flex items-center justify-between">
        <div class="flex items-center gap-3.5">
          <img src="assets/img/logo-mark.png" alt="" class="h-7 w-7 shrink-0 select-none" draggable="false" />
          <div class="flex items-center gap-2.5">
            <span class="font-display text-[13px] tracking-wider uppercase text-white font-bold">${t("brand.name")}</span>
            <span class="text-white/20 text-xs hidden sm:inline">/</span>
            <span class="font-mono text-[10.5px] text-zinc-400 tracking-wide hidden sm:inline">${t("brand.subtitle")}</span>
          </div>
        </div>
        <div class="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08]">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span class="font-mono text-[10px] text-zinc-300 tracking-wide" id="d-topbar-status">—</span>
          <span class="w-1 h-1 rounded-full bg-white/20"></span>
          <span class="font-mono text-[10px] text-zinc-400" id="d-topbar-coverage">—</span>
        </div>
        <div class="flex items-center gap-2">
          <button class="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full specular-btn bg-white/[0.04] text-zinc-200 text-[11px] font-mono" data-action="open-modal">
            <span class="material-symbols-outlined text-[13px] text-zinc-300">folder_open</span>
            <span>${t("topbar.dossier")}</span>
          </button>
          <a class="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full specular-btn bg-white/[0.04] text-zinc-200 text-[11px] font-mono whitespace-nowrap" href="https://wa.me/573046814396" target="_blank" rel="noopener noreferrer">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>+57 304 681 4396</span>
          </a>
          <button class="flex items-center gap-1.5 px-3 py-1.5 rounded-full specular-btn bg-white/[0.04] text-white text-[11px] font-mono" data-action="toggle-overview">
            <span class="material-symbols-outlined text-[14px] text-zinc-300">grid_view</span>
            <span class="hidden sm:inline">${t("topbar.ecosystem")}</span>
          </button>
        </div>
      </header>

      <!-- Main -->
      <main class="relative z-10 flex-1 w-full min-h-0 flex items-stretch overflow-hidden px-3 lg:px-6 py-2.5 gap-3.5">
        <!-- Left -->
        <aside class="w-64 lg:w-72 shrink-0 flex flex-col justify-between specular-card rounded-2xl p-4 z-20 overflow-hidden">
          <div class="flex flex-col h-full min-h-0">
              <div class="flex items-center justify-between pb-3 border-b border-white/[0.07] mb-3 shrink-0">
                <div class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-white/70"></span>
                  <span class="font-mono text-[10px] uppercase text-white tracking-widest font-semibold">${t("left.title")}</span>
                </div>
                <span class="font-mono text-[10px] px-1.5 py-0.5 rounded bg-white/[0.06] text-zinc-400 border border-white/[0.06]" id="d-left-code">—</span>
              </div>
              <div class="fluid flex flex-col gap-2.5 flex-1 min-h-0 overflow-y-auto thin-sb pr-1.5" id="d-left-body">
                <div class="bg-white/[0.025] border border-white/[0.06] rounded-xl p-3">
                  <span class="font-mono text-[9px] text-zinc-400 uppercase tracking-wider block mb-1">${t("left.purpose")}</span>
                  <p class="text-[11.5px] text-zinc-200 leading-snug" id="d-synopsis">—</p>
                </div>
                <div class="bg-white/[0.025] border border-white/[0.06] rounded-xl p-3">
                  <div class="flex items-center justify-between mb-2">
                    <span class="font-mono text-[9px] text-zinc-400 uppercase tracking-wider">${t("left.specialties")}</span>
                    <span class="font-mono text-[9px] px-1.5 py-0.5 rounded-full bg-white/[0.05] text-zinc-300" id="d-spec-count">—</span>
                  </div>
                  <ul class="space-y-1.5 font-mono text-[10px] text-zinc-300" id="d-specialties"></ul>
                </div>
                <div class="bg-white/[0.025] border border-white/[0.06] rounded-xl p-3">
                  <div class="flex items-center justify-between mb-2">
                    <span class="font-mono text-[9px] text-zinc-400 uppercase tracking-wider">${t("left.phases")}</span>
                    <span class="font-mono text-[9px] text-zinc-500">${t("left.timeEstimate")}</span>
                  </div>
                  <div class="space-y-1.5 font-mono text-[10px]" id="d-phases"></div>
                </div>
              </div>
            <div class="pt-3 mt-2 border-t border-white/[0.07] flex flex-col gap-0.5 font-mono text-[10px] shrink-0">
              <div class="flex items-center justify-between text-zinc-400">
                <span>${t("left.coverage")}</span>
                <span class="text-white font-medium truncate ml-1 text-right" id="d-coverage-tag">—</span>
              </div>
              <p class="text-[9.5px] text-zinc-400 truncate" id="d-coverage-detail">—</p>
            </div>
          </div>
        </aside>

        <!-- Center -->
        <section class="flex-1 relative flex items-center justify-center overflow-hidden" id="d-stage">
          <div class="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <div class="rounded-full border border-dashed border-white/[0.09] orbit-cw" id="d-ring-outer" style="width:500px;height:500px;"></div>
            <div class="absolute w-[360px] h-[360px] rounded-full border border-white/[0.05] orbit-ccw"></div>
            <svg class="absolute w-[440px] h-[440px] pointer-events-none opacity-25 text-white orbit-cw" style="animation-duration:180s;" viewBox="0 0 200 200">
              <circle cx="100" cy="100" fill="none" r="96" stroke="currentColor" stroke-dasharray="1 8" stroke-width="0.6"></circle>
              <circle cx="100" cy="100" fill="none" r="80" stroke="currentColor" stroke-dasharray="2 10" stroke-width="0.4"></circle>
              <line stroke="currentColor" stroke-dasharray="2 4" stroke-width="0.3" x1="100" x2="100" y1="0" y2="200"></line>
              <line stroke="currentColor" stroke-dasharray="2 4" stroke-width="0.3" x1="0" x2="200" y1="100" y2="100"></line>
            </svg>
          </div>
          <div class="relative z-10 w-[240px] sm:w-[265px] md:w-[295px] h-[240px] sm:h-[265px] md:h-[295px] rounded-full p-2 bg-[#09090d]/80 border border-white/[0.14] flex items-center justify-center cursor-pointer group select-none transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]" id="d-core">
            <div class="absolute -inset-1.5 rounded-full border border-white/[0.06] pointer-events-none"></div>
            <div class="w-full h-full rounded-full overflow-hidden relative bg-black flex items-center justify-center border border-white/[0.12]">
              <img alt="" class="w-full h-full object-cover filter grayscale contrast-125 transition-all duration-500 group-hover:scale-105" id="d-core-img" src="" />
              <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(5,5,7,0.85)_100%)] pointer-events-none"></div>
              <div class="absolute top-3.5 inset-x-0 flex justify-between px-4 font-mono text-[8px] text-zinc-300 pointer-events-none">
                <span class="px-1.5 py-0.5 rounded-full bg-black/60 border border-white/[0.08]" id="d-hud-protocol">—</span>
                <span class="px-1.5 py-0.5 rounded-full bg-black/60 border border-white/[0.08]">PEREIRA // CO</span>
              </div>
              <div class="absolute bottom-3.5 inset-x-0 flex flex-col items-center pointer-events-none px-4">
                <div class="px-3 py-1 rounded-full bg-[#09090c]/85 border border-white/[0.14] text-center backdrop-blur-md">
                  <span class="font-mono text-[9px] uppercase tracking-wider text-white font-medium block" id="d-core-label">—</span>
                  <span class="font-mono text-[7.5px] text-zinc-400 block" id="d-core-verify">—</span>
                </div>
              </div>
              <div class="absolute inset-0 bg-[#07070a]/85 backdrop-blur-md opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-all duration-200 p-4 text-center">
                <span class="font-display text-[11px] text-white tracking-wide font-semibold">${t("core.hoverTitle")}</span>
                <span class="font-mono text-[8.5px] text-zinc-400 mt-1">Fundaserinco@gmail.com</span>
                <span class="font-mono text-[8.5px] text-emerald-400 mt-0.5">+57 304 681 4396</span>
                <span class="font-mono text-[8px] text-zinc-500 mt-2">${t("core.hoverClick")}</span>
              </div>
            </div>
          </div>
          <div class="absolute inset-0 pointer-events-none" id="d-nodes"></div>
        </section>

        <!-- Right -->
        <aside class="w-64 lg:w-72 shrink-0 flex flex-col justify-between specular-card rounded-2xl p-4 z-20 overflow-hidden">
          <div class="flex flex-col h-full min-h-0">
              <div class="flex items-center justify-between pb-3 border-b border-white/[0.07] mb-3 shrink-0">
                <div class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-white/70"></span>
                  <span class="font-mono text-[10px] uppercase text-white tracking-widest font-semibold">${t("right.title")}</span>
                </div>
                <span class="font-mono text-[10px] px-1.5 py-0.5 rounded bg-white/[0.06] text-zinc-400 border border-white/[0.06]" id="d-right-code">—</span>
              </div>
              <div class="fluid flex flex-col gap-2.5 flex-1 min-h-0 overflow-y-auto thin-sb pr-1.5" id="d-right-body">
                <div class="bg-white/[0.025] border border-white/[0.06] rounded-xl p-3">
                  <div class="flex items-center justify-between mb-2">
                    <span class="font-mono text-[9px] text-zinc-400 uppercase tracking-wider">${t("right.deliverables")}</span>
                    <span class="font-mono text-[9px] px-1.5 py-0.5 rounded-full bg-white/[0.05] text-zinc-300">${t("right.auditables")}</span>
                  </div>
                  <ul class="space-y-1 font-mono text-[10px]" id="d-deliverables"></ul>
                  <button class="mt-3 w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg specular-btn bg-white/[0.05] text-white font-mono text-[10px] uppercase tracking-wider" data-action="open-modal">
                    <span class="material-symbols-outlined text-[13px] text-zinc-300">folder_open</span>
                    <span>${t("right.openDossier")}</span>
                  </button>
                </div>
                <div class="bg-white/[0.025] border border-white/[0.06] rounded-xl p-3">
                  <span class="font-mono text-[9px] text-zinc-400 uppercase tracking-wider block mb-1">${t("right.verification")}</span>
                  <p class="font-display text-[12px] text-white font-semibold" id="d-verif-title">—</p>
                  <p class="text-[11px] text-zinc-300 leading-snug mt-1" id="d-verif-desc">—</p>
                </div>
                <div class="bg-white/[0.025] border border-white/[0.06] rounded-xl p-2.5 text-[10px] font-mono">
                  <div class="flex items-center justify-between text-zinc-400 mb-1">
                    <span>${t("right.contact")}</span>
                    <span class="text-white font-medium">FUNDASERINCO</span>
                  </div>
                  <div class="text-zinc-400 flex flex-col gap-0.5 text-[9px]">
                    <span class="text-zinc-200">E: Fundaserinco@gmail.com</span>
                    <span class="text-emerald-400">W: +57 304 681 4396</span>
                    <span>Pereira, Risaralda</span>
                  </div>
                </div>
              </div>
            <div class="pt-3 mt-2 border-t border-white/[0.07] flex items-center justify-between font-mono text-[10px] text-zinc-400 shrink-0">
              <span>${t("right.template")}</span>
              <span class="text-white font-medium" id="d-compendium">—</span>
            </div>
          </div>
        </aside>
      </main>

      <!-- Bottom -->
      <footer class="relative z-30 w-full h-[58px] shrink-0 bg-[#09090c]/80 backdrop-blur-2xl border-t border-white/[0.07] px-4 lg:px-7 flex items-center justify-between">
        <div class="flex items-center gap-3.5 max-w-2xl overflow-hidden">
          <div class="w-7 h-7 rounded-lg bg-white/[0.05] border border-white/[0.1] flex items-center justify-center shrink-0">
            <span class="font-mono text-[11px] font-semibold text-white" id="d-bottom-num">—</span>
          </div>
          <div class="flex flex-col truncate">
            <div class="flex items-center gap-2">
              <span class="font-display text-[12.5px] uppercase tracking-wide text-white font-bold truncate" id="d-bottom-title">—</span>
              <span class="px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-[8.5px] font-mono text-zinc-300 shrink-0" id="d-bottom-protocol">—</span>
            </div>
            <p class="text-[11px] text-zinc-400 truncate" id="d-bottom-synopsis">—</p>
          </div>
        </div>
        <div class="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.025] border border-white/[0.06]" id="d-dots"></div>
        <div class="flex items-center gap-2 shrink-0">
          <span class="font-mono text-[10.5px] text-zinc-400 hidden sm:inline" id="d-bottom-counter">—</span>
          <button class="flex items-center gap-1.5 font-mono text-[11px] text-white px-3 py-1.5 rounded-full specular-btn bg-white/[0.05]" data-action="open-modal">
            <span class="material-symbols-outlined text-[13px] text-zinc-300">folder_open</span>
            <span class="hidden sm:inline">${t("bottom.dossier")}</span>
          </button>
          <a class="hidden md:flex items-center gap-1.5 font-mono text-[11px] text-zinc-300 px-3 py-1.5 rounded-full specular-btn bg-white/[0.04]" href="mailto:Fundaserinco@gmail.com?subject=Solicitud%20de%20Cotizacion%20Tecnica">
            <span class="material-symbols-outlined text-[13px] text-zinc-300">mail</span>
            <span>${t("bottom.quote")}</span>
          </a>
          <button class="flex items-center gap-1 font-mono text-[11px] text-black bg-white hover:bg-zinc-100 font-medium px-3.5 py-1.5 rounded-full transition-all duration-200" data-action="next">
            <span>${t("bottom.next")}</span>
            <span class="material-symbols-outlined text-[13px]">arrow_forward</span>
          </button>
        </div>
      </footer>
    `;

    wire();
    sync();
    observeStage();
  }

  function wire() {
    $$("#layout-desktop [data-action]").forEach((b) => {
      const act = b.getAttribute("data-action");
      if (act === "open-modal")      b.addEventListener("click", () => FD.openModal());
      else if (act === "next")       b.addEventListener("click", () => FD.setDiscipline(State.activeIndex + 1));
      else if (act === "toggle-overview") b.addEventListener("click", () => FD.toggleOverview());
    });
    const core = $("#d-core");
    if (core) core.addEventListener("click", () => FD.toggleOverview());
  }

  function sync() {
    const it = item();
    const loc = d();
    const isOv = State.isOverview;

    $("#d-topbar-status").textContent = isOv
      ? `${t("topbar.statusPrefix")}: ${t("topbar.ecosystem")} // 7`
      : `${t("topbar.statusPrefix")}: ${it.id} ${it.code} // ${loc.name.toUpperCase()}`;
    $("#d-topbar-coverage").textContent = isOv ? "Fundaserinco · Pereira, Risaralda" : loc.coverageText;

    $("#d-left-code").textContent = it.code;
    $("#d-synopsis").textContent = loc.synopsis;
    $("#d-spec-count").textContent = `${loc.specialties.length} ${t("left.areas")}`;
    $("#d-specialties").innerHTML = loc.specialties.map((s) => `
      <li class="flex items-start gap-2 leading-snug"><span class="w-1 h-1 rounded-full bg-white/70 mt-1.5 shrink-0"></span><span class="text-zinc-300">${s}</span></li>
    `).join("");
    $("#d-phases").innerHTML = loc.phases.map((ph) => `
      <div class="flex justify-between items-center text-zinc-400 border-b border-white/[0.04] pb-1">
        <span class="truncate">${ph.name}</span>
        <span class="text-white font-medium shrink-0 ml-1.5">${ph.time}</span>
      </div>
    `).join("");
    $("#d-coverage-tag").textContent = loc.coverageTag;
    $("#d-coverage-detail").textContent = loc.coverageText;

    $("#d-right-code").textContent = `SEC.B // ${it.code}`;
    $("#d-deliverables").innerHTML = loc.deliverables.map((dd, i) => `
      <li class="flex items-start gap-1.5 leading-tight pb-1 border-b border-white/[0.04] last:border-b-0">
        <span class="text-zinc-500">${String(i + 1).padStart(2, "0")}.</span>
        <span class="text-zinc-300">${dd}</span>
      </li>
    `).join("");
    $("#d-verif-title").textContent = loc.verificationTitle;
    $("#d-verif-desc").textContent = loc.verificationDesc;
    $("#d-compendium").textContent = `FUNDASERINCO // ${it.code}`;

    $("#d-core-img").src = it.image;
    $("#d-hud-protocol").textContent = it.protocol;
    $("#d-core-label").textContent = isOv ? "FUNDASERINCO // 7" : `${it.code} // ${loc.name.toUpperCase()}`;
    $("#d-core-verify").textContent = isOv ? "GLOBAL · DIRECT CONTACT" : loc.verificationBrief;

    $("#d-bottom-num").textContent = it.id;
    $("#d-bottom-title").textContent = isOv ? t("topbar.ecosystem") : loc.headline;
    $("#d-bottom-protocol").textContent = it.protocol.split("/")[0].trim();
    $("#d-bottom-synopsis").textContent = loc.synopsis;
    $("#d-bottom-counter").textContent = `${t("bottom.counter")} [ ${it.id} / 07 ]`;

    $("#d-dots").innerHTML = FD.DATA.map((_, i) => `
      <button class="h-2 rounded-full transition-all duration-300 ${i === State.activeIndex ? "w-7 bg-white" : "w-2 bg-white/20 hover:bg-white/40 hover:w-3.5"}" data-dot="${i}"></button>
    `).join("");
    $$("#d-dots button").forEach((b) => b.addEventListener("click", () => FD.setDiscipline(parseInt(b.getAttribute("data-dot"), 10))));

    layoutNodes();
  }

  // The stage size depends on utilities injected by the Tailwind CDN, so the first paint can
  // measure an un-styled layout; re-orbit whenever the stage actually settles or resizes.
  let stageObserver = null;
  function observeStage() {
    const stage = $("#d-stage");
    if (!stage) return;
    if (typeof ResizeObserver === "undefined") {
      setTimeout(layoutNodes, 300);
    } else {
      if (stageObserver) stageObserver.disconnect();
      let frame = 0;
      stageObserver = new ResizeObserver(() => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          if (stage.isConnected) layoutNodes();
        });
      });
      stageObserver.observe(stage);
    }
    const relayout = () => { if (stage.isConnected) layoutNodes(); };
    setTimeout(relayout, 350);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(relayout);
  }

  let layoutRetries = 0;

  // Desktop core is 295px (md:w-[295px]); nodes are 155px wide (±77.5px around their center).
  const CORE_BASE = 295;
  const NODE_REACH = 78;
  const CORE_GAP = 12;

  function layoutNodes() {
    const stage = $("#d-stage");
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) {
      if (layoutRetries++ < 3) requestAnimationFrame(layoutNodes);
      return;
    }
    layoutRetries = 0;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const minDim = Math.min(rect.width, rect.height);
    const halfW = rect.width / 2;
    const halfH = rect.height / 2;
    // Fit the ring inside the stage so side nodes are never clipped by overflow.
    const radius = Math.max(150, Math.min(minDim * 0.4, 255, halfW - NODE_REACH - 14, halfH - 46));

    // Keep the service ring clear of the core: on short/narrow stages the core shrinks instead
    // of letting the nodes overlap it.
    const maxCore = 2 * (radius - NODE_REACH - CORE_GAP);
    const coreSize = Math.round(Math.max(180, Math.min(CORE_BASE, maxCore)));
    const core = $("#d-core");
    if (core) {
      core.style.width = `${coreSize}px`;
      core.style.height = `${coreSize}px`;
    }

    const outerRing = $("#d-ring-outer");
    if (outerRing) {
      outerRing.style.width = `${radius * 2}px`;
      outerRing.style.height = `${radius * 2}px`;
    }

    const container = $("#d-nodes");
    container.innerHTML = "";
    const total = FD.DATA.length;
    const angleOffset = -Math.PI / 2.6;
    const delays = ["0s", "-0.85s", "-1.7s", "-2.55s", "-3.4s", "-4.25s", "-5.1s"];
    // Keep neighbouring labels from colliding: width follows the chord between two nodes.
    const chord = 2 * radius * Math.sin(Math.PI / total);
    const nodeWidth = Math.max(112, Math.min(155, Math.round(chord) - 14));

    FD.DATA.forEach((serv, i) => {
      const angle = angleOffset + (i * 2 * Math.PI) / total;
      const x = cx + radius * Math.cos(angle);
      const y = cy + radius * Math.sin(angle);
      const isActive = i === State.activeIndex;
      const protoShort = serv.protocol.split("/")[0].trim();

      const node = el("div", {
        class: `orbital-node absolute pointer-events-auto cursor-pointer flex flex-col items-center justify-center text-center select-none ${
          isActive ? "active text-white z-30 opacity-100" : "text-zinc-500 opacity-40 hover:opacity-90 hover:text-white z-10"
        }`,
        style: `left:${x}px;top:${y}px;transform:translate(-50%,-50%) ${isActive ? "scale(1.08)" : "scale(1)"};width:${nodeWidth}px;`,
      });
      node.innerHTML = `
        <div class="node-float w-full flex flex-col items-center" style="animation-delay:${delays[i % 7]};">
          <div class="flex items-center justify-center gap-1.5 w-full font-mono text-[9px] mb-0.5 tracking-wider ${isActive ? "text-white" : "text-zinc-500"}">
            <span class="node-dot inline-flex w-2 h-2 rounded-full ${isActive ? "bg-white" : "bg-white/20"}"></span>
            <span>${serv.id}</span><span class="opacity-40">/</span><span>${serv.code}</span>
          </div>
          <span class="node-label font-display text-[12.5px] sm:text-[13.5px] font-semibold tracking-tight uppercase leading-snug ${isActive ? "text-white" : "text-zinc-300"}">${serv.short}</span>
          <span class="font-mono text-[8px] tracking-wider mt-0.5 uppercase ${isActive ? "text-zinc-400" : "text-zinc-600"}">${protoShort}</span>
        </div>
      `;
      node.addEventListener("click", (e) => {
        e.stopPropagation();
        FD.setDiscipline(i);
      });
      container.appendChild(node);
    });
  }

  FD.DesktopLayout = { render, sync };
})();