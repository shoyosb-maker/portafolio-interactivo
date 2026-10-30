/* =========================================================
   DESKTOP LAYOUT — orbital stage + two flanking cards
   ========================================================= */
(function () {
  const FD = window.FD;
  const { $, $$, el, t, item, d, State } = FD;

  function render() {
    const root = document.getElementById("layout-desktop");
    root.className = "layout active flex flex-col justify-between h-screen w-screen overflow-hidden relative font-sans bg-canvas text-ink";

    root.innerHTML = `
      <!-- Ambient backdrop -->
      <div class="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[760px] h-[760px] rounded-full ambient-halo blur-2xl satin-halo"></div>
        <div class="absolute inset-0 ambient-grid opacity-25"></div>
      </div>

      <!-- Topbar -->
      <header class="relative z-30 w-full h-[54px] shrink-0 bg-canvas/80 backdrop-blur-2xl border-b border-ink/[0.07] px-4 lg:px-7 flex items-center justify-between">
        <div class="flex items-center gap-3.5">
          <img src="assets/img/logo-mark.png" alt="" class="h-7 w-7 shrink-0 select-none" draggable="false" />
          <div class="flex items-center gap-2.5">
            <span class="font-display text-[13px] tracking-[0.06em] uppercase text-ink font-semibold">${t("brand.name")}</span>
            <span class="text-ink/20 text-xs hidden sm:inline">/</span>
            <span class="font-mono text-[10.5px] text-ink4 tracking-wide hidden sm:inline">${t("brand.subtitle")}</span>
          </div>
        </div>
        <div class="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-ink/[0.03] border border-ink/[0.08]">
          <span class="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
          <span class="font-mono text-[10px] text-ink3 tracking-wide" id="d-topbar-status">—</span>
          <span class="w-1 h-1 rounded-full bg-ink/20"></span>
          <span class="font-mono text-[10px] text-ink4" id="d-topbar-coverage">—</span>
        </div>
        <div class="flex items-center gap-2">
          <button class="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full specular-btn bg-ink/[0.04] text-ink2 text-[11px] font-medium tracking-[0.02em] whitespace-nowrap" data-action="open-modal">
            <span class="material-symbols-outlined text-[13px] text-ink3">folder_open</span>
            <span>${t("topbar.dossier")}</span>
          </button>
          <a class="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full specular-btn bg-ink/[0.04] text-ink2 text-[11px] font-medium tracking-[0.02em] whitespace-nowrap whitespace-nowrap" href="https://wa.me/573046814396" target="_blank" rel="noopener noreferrer">
            <span class="w-1.5 h-1.5 rounded-full bg-ink4"></span>
            <span>+57 304 681 4396</span>
          </a>
          <button class="flex items-center gap-1.5 px-3 py-1.5 rounded-full specular-btn bg-ink/[0.04] text-ink text-[11px] font-medium tracking-[0.02em]" data-action="toggle-overview">
            <span class="material-symbols-outlined text-[14px] text-ink3">grid_view</span>
            <span class="hidden sm:inline">${t("topbar.ecosystem")}</span>
          </button>
          <button class="lang-toggle flex items-center gap-1.5 px-2.5 py-1.5 rounded-full specular-btn bg-ink/[0.04] text-ink2 text-[11px] font-medium tracking-[0.02em]" aria-label="Cambiar idioma / Change language" title="ES / EN">
            <span class="w-1.5 h-1.5 rounded-full bg-ink/40"></span>
            <span data-lang-label>${FD.currentLang.toUpperCase()}</span>
          </button>
          <button class="theme-toggle w-[30px] h-[30px] flex items-center justify-center rounded-full specular-btn bg-ink/[0.04] text-ink3 hover:text-ink" data-theme-toggle aria-label="${t(FD.theme === "light" ? "theme.toDark" : "theme.toLight")}" title="${t(FD.theme === "light" ? "theme.toDark" : "theme.toLight")}">
            <span class="material-symbols-outlined text-[15px]" data-theme-icon>${FD.themeIcon(FD.theme)}</span>
          </button>
        </div>
      </header>

      <!-- Main -->
      <main class="relative z-10 flex-1 w-full min-h-0 flex items-stretch overflow-hidden px-3 lg:px-6 py-2.5 gap-3.5">
        <!-- Left -->
        <aside class="w-64 lg:w-72 shrink-0 flex flex-col justify-between specular-card rounded-xl p-4 z-20 overflow-hidden">
          <div class="flex flex-col h-full min-h-0">
              <div class="flex items-center justify-between pb-3 border-b border-ink/[0.07] mb-3 shrink-0">
                <div class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-ink/70"></span>
                  <span class="text-[10.5px] uppercase text-ink tracking-[0.06em] font-semibold">${t("left.title")}</span>
                </div>
                <span class="font-mono text-[10px] px-1.5 py-0.5 rounded bg-ink/[0.06] text-ink4 border border-ink/[0.06]" id="d-left-code">—</span>
              </div>
              <div class="fluid flex flex-col gap-2.5 flex-1 min-h-0 overflow-y-auto thin-sb pr-1.5" id="d-left-body">
                <div class="border-t border-ink/[0.06] pt-3">
                  <span class="text-[10px] text-ink4 uppercase tracking-[0.06em] block mb-1">${t("left.purpose")}</span>
                  <p class="text-[11.5px] text-ink2 leading-snug" id="d-synopsis">—</p>
                </div>
                <div class="border-t border-ink/[0.06] pt-3">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-[10px] text-ink4 uppercase tracking-[0.06em]">${t("left.specialties")}</span>
                    <span class="font-mono text-[9px] px-1.5 py-0.5 rounded-full bg-ink/[0.05] text-ink3" id="d-spec-count">—</span>
                  </div>
                  <ul class="space-y-1.5 font-mono text-[10px] text-ink3" id="d-specialties"></ul>
                </div>
                <div class="border-t border-ink/[0.06] pt-3">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-[10px] text-ink4 uppercase tracking-[0.06em]">${t("left.phases")}</span>
                    <span class="font-mono text-[9px] text-ink5">${t("left.timeEstimate")}</span>
                  </div>
                  <div class="space-y-1.5 font-mono text-[10px]" id="d-phases"></div>
                </div>
              </div>
            <div class="pt-3 mt-2 border-t border-ink/[0.07] flex flex-col gap-1 shrink-0">
              <span class="font-mono text-[9.5px] uppercase tracking-[0.06em] text-ink5" id="d-coverage-label">—</span>
              <span class="font-mono text-[10.5px] font-medium leading-snug text-ink text-balance" id="d-coverage-tag">—</span>
              <p class="font-mono text-[9.5px] leading-snug text-ink4 text-pretty" id="d-coverage-detail">—</p>
            </div>
          </div>
        </aside>

        <!-- Center -->
        <section class="flex-1 relative flex items-center justify-center overflow-hidden" id="d-stage">
          <div class="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <div class="rounded-full border border-dashed border-ink/[0.09] orbit-cw" id="d-ring-outer" style="width:500px;height:500px;"></div>
            <div class="absolute w-[360px] h-[360px] rounded-full border border-ink/[0.05] orbit-ccw"></div>
            <svg class="absolute w-[440px] h-[440px] pointer-events-none opacity-25 text-ink orbit-cw" style="animation-duration:180s;" viewBox="0 0 200 200">
              <circle cx="100" cy="100" fill="none" r="96" stroke="currentColor" stroke-dasharray="1 8" stroke-width="0.6"></circle>
              <circle cx="100" cy="100" fill="none" r="80" stroke="currentColor" stroke-dasharray="2 10" stroke-width="0.4"></circle>
              <line stroke="currentColor" stroke-dasharray="2 4" stroke-width="0.3" x1="100" x2="100" y1="0" y2="200"></line>
              <line stroke="currentColor" stroke-dasharray="2 4" stroke-width="0.3" x1="0" x2="200" y1="100" y2="100"></line>
            </svg>
          </div>
          <div class="relative z-10 w-[240px] sm:w-[265px] md:w-[295px] h-[240px] sm:h-[265px] md:h-[295px] rounded-full core-glow flex items-center justify-center cursor-pointer group select-none transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
               id="d-core" role="button" tabindex="0" aria-label="Abrir dossier técnico">
            <div class="core-media w-full h-full rounded-full overflow-hidden relative flex items-center justify-center" id="d-core-media">
              <img alt="" class="core-still" id="d-core-still" src="" />
              <div class="absolute inset-0 core-hover-veil opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-all duration-200 p-6 text-center">
                <span class="font-display text-[11px] text-ink tracking-wide font-semibold">${t("core.hoverTitle")}</span>
                <span class="font-mono text-[8.5px] text-ink4 mt-1">Fundaserinco@gmail.com</span>
                <span class="font-mono text-[8.5px] text-ink3 mt-0.5">+57 304 681 4396</span>
                <span class="font-mono text-[8px] text-ink5 mt-2">${t("core.hoverClick")}</span>
              </div>
            </div>
          </div>
          <div class="absolute inset-0 pointer-events-none" id="d-nodes"></div>
        </section>

        <!-- Right -->
        <aside class="w-64 lg:w-72 shrink-0 flex flex-col justify-between specular-card rounded-xl p-4 z-20 overflow-hidden">
          <div class="flex flex-col h-full min-h-0">
              <div class="flex items-center justify-between pb-3 border-b border-ink/[0.07] mb-3 shrink-0">
                <div class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-ink/70"></span>
                  <span class="text-[10.5px] uppercase text-ink tracking-[0.06em] font-semibold">${t("right.title")}</span>
                </div>
                <span class="font-mono text-[10px] px-1.5 py-0.5 rounded bg-ink/[0.06] text-ink4 border border-ink/[0.06]" id="d-right-code">—</span>
              </div>
              <div class="fluid flex flex-col gap-2.5 flex-1 min-h-0 overflow-y-auto thin-sb pr-1.5" id="d-right-body">
                <div class="border-t border-ink/[0.06] pt-3">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-[10px] text-ink4 uppercase tracking-[0.06em]">${t("right.deliverables")}</span>
                    <span class="font-mono text-[9px] px-1.5 py-0.5 rounded-full bg-ink/[0.05] text-ink3">${t("right.auditables")}</span>
                  </div>
                  <ul class="space-y-1 font-mono text-[10px]" id="d-deliverables"></ul>
                  <button class="mt-3 w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg specular-btn bg-ink/[0.05] text-ink text-[10.5px] uppercase tracking-[0.06em]" data-action="open-modal">
                    <span class="material-symbols-outlined text-[13px] text-ink3">folder_open</span>
                    <span>${t("right.openDossier")}</span>
                  </button>
                </div>
                <div class="border-t border-ink/[0.06] pt-3">
                  <span class="text-[10px] text-ink4 uppercase tracking-[0.06em] block mb-1">${t("right.verification")}</span>
                  <p class="font-display text-[12px] text-ink font-semibold" id="d-verif-title">—</p>
                  <p class="text-[11px] text-ink3 leading-snug mt-1" id="d-verif-desc">—</p>
                </div>
                <div class="border border-ink/[0.06] rounded-[10px] p-2.5 text-[10px] font-mono">
                  <div class="flex items-center justify-between text-ink4 mb-1">
                    <span>${t("right.contact")}</span>
                    <span class="text-ink font-medium">FUNDASERINCO</span>
                  </div>
                  <div class="text-ink4 flex flex-col gap-0.5 text-[9px]">
                    <span class="text-ink2">E: Fundaserinco@gmail.com</span>
                    <span class="text-ink3">W: +57 304 681 4396</span>
                    <span>Pereira, Risaralda</span>
                  </div>
                </div>
              </div>
            <div class="pt-3 mt-2 border-t border-ink/[0.07] flex items-center justify-between font-mono text-[10px] text-ink4 shrink-0">
              <span>${t("right.template")}</span>
              <span class="text-ink font-medium" id="d-compendium">—</span>
            </div>
          </div>
        </aside>
      </main>

      <!-- Discipline indicator: its own lane above the status footer -->
      <div class="relative z-30 disc-lane hidden md:flex items-center justify-center h-9 shrink-0 bg-\[var\(--lane\)\]">
        <div class="disc-dots" id="d-dots"></div>
      </div>

      <!-- Bottom -->
      <footer class="relative z-30 w-full h-[58px] shrink-0 bg-canvas/85 backdrop-blur-2xl border-t border-ink/[0.07] px-4 lg:px-7 flex items-center justify-between">
        <div class="flex items-center gap-3.5 max-w-2xl overflow-hidden">
          <div class="w-7 h-7 rounded-lg bg-ink/[0.05] border border-ink/[0.1] flex items-center justify-center shrink-0">
            <span class="font-mono text-[11px] font-semibold text-ink" id="d-bottom-num">—</span>
          </div>
          <div class="flex flex-col truncate">
            <div class="flex items-center gap-2">
              <span class="font-display text-[12.5px] uppercase tracking-wide text-ink font-semibold truncate" id="d-bottom-title">—</span>
              <span class="px-2 py-0.5 rounded-full bg-ink/[0.05] border border-ink/[0.08] text-[8.5px] font-mono text-ink3 shrink-0" id="d-bottom-protocol">—</span>
            </div>
            <p class="text-[11px] text-ink4 truncate" id="d-bottom-synopsis">—</p>
          </div>
        </div>
        <div class="flex items-center gap-2 shrink-0">
          <span class="font-mono text-[10.5px] text-ink4 hidden sm:inline" id="d-bottom-counter">—</span>
          <button class="flex items-center gap-1.5 text-[11px] font-medium tracking-[0.02em] text-ink px-3 py-1.5 rounded-full specular-btn bg-ink/[0.05]" data-action="open-modal">
            <span class="material-symbols-outlined text-[13px] text-ink3">folder_open</span>
            <span class="hidden sm:inline">${t("bottom.dossier")}</span>
          </button>
          <a class="hidden md:flex items-center gap-1.5 text-[11px] font-medium tracking-[0.02em] text-ink3 px-3 py-1.5 rounded-full specular-btn bg-ink/[0.04]" href="mailto:Fundaserinco@gmail.com?subject=Solicitud%20de%20Cotizacion%20Tecnica">
            <span class="material-symbols-outlined text-[13px] text-ink3">mail</span>
            <span>${t("bottom.quote")}</span>
          </a>
          <button class="flex items-center gap-1 text-[11px] font-medium tracking-[0.02em] text-canvas bg-ink hover:bg-ink2 px-3.5 py-1.5 rounded-full transition-all duration-200" data-action="next">
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
    if (core) {
      core.addEventListener("click", () => FD.toggleOverview());
      core.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); FD.toggleOverview(); }
      });
    }
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
      <li class="flex items-start gap-2 leading-snug"><span class="w-1 h-1 rounded-full bg-ink/70 mt-1.5 shrink-0"></span><span class="text-ink3">${s}</span></li>
    `).join("");
    $("#d-phases").innerHTML = loc.phases.map((ph) => `
      <div class="flex justify-between items-center text-ink4 border-b border-ink/[0.04] pb-1">
        <span class="truncate">${ph.name}</span>
        <span class="text-ink font-medium shrink-0 ml-1.5">${ph.time}</span>
      </div>
    `).join("");
    $("#d-coverage-tag").textContent = loc.coverageTag;
    $("#d-coverage-detail").textContent = loc.coverageText;
    $("#d-coverage-label").textContent = t("left.coverage").replace(/:$/, "");

    $("#d-right-code").textContent = `SEC.B // ${it.code}`;
    $("#d-deliverables").innerHTML = loc.deliverables.map((dd, i) => `
      <li class="flex items-start gap-1.5 leading-tight pb-1 border-b border-ink/[0.04] last:border-b-0">
        <span class="text-ink5">${String(i + 1).padStart(2, "0")}.</span>
        <span class="text-ink3">${dd}</span>
      </li>
    `).join("");
    $("#d-verif-title").textContent = loc.verificationTitle;
    $("#d-verif-desc").textContent = loc.verificationDesc;
    $("#d-compendium").textContent = `FUNDASERINCO // ${it.code}`;

    $("#d-core-still").src = it.image;

    $("#d-bottom-num").textContent = it.id;
    $("#d-bottom-title").textContent = isOv ? t("topbar.ecosystem") : loc.headline;
    $("#d-bottom-protocol").textContent = it.protocol.split("/")[0].trim();
    $("#d-bottom-synopsis").textContent = loc.synopsis;
    $("#d-bottom-counter").textContent = `${t("bottom.counter")} [ ${it.id} / 07 ]`;

    $("#d-dots").innerHTML = FD.DATA.map((_, i) => `
      <button class="disc-dot" data-dot="${i}" aria-label="Disciplina ${i + 1}" aria-current="${i === State.activeIndex}"></button>
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
    // The ring keeps a margin from the stage edges: the stage itself fades into the page there,
    // and labels must never sit on that gradient.
    const radius = Math.max(150, Math.min(
      minDim * 0.4,
      255,
      halfW - NODE_REACH - 42,
      halfH - 96,
      // In light mode the ecosystem is a sphere: keep every label inside it.
      minDim * 0.47 - NODE_REACH - 14
    ));

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
      const fullName = (serv[FD.currentLang] || serv.es).name;
      const tooltipBelow = Math.sin(angle) < -0.35;

      const node = el("div", {
        class: `orbital-node absolute pointer-events-auto cursor-pointer flex flex-col items-center justify-center text-center select-none ${
          isActive ? "active text-ink z-30 opacity-100" : "text-ink5 opacity-40 hover:opacity-90 hover:text-ink z-10"
        } ${tooltipBelow ? "tt-below" : ""}`,
        style: `left:${x}px;top:${y}px;transform:translate(-50%,-50%) ${isActive ? "scale(1.08)" : "scale(1)"};width:${nodeWidth}px;`,
        "data-full": fullName,
        "aria-label": `${serv.id} · ${fullName}`,
        role: "button",
        tabindex: "0",
      });
      node.innerHTML = `
        <div class="node-float w-full flex flex-col items-center" style="animation-delay:${delays[i % 7]};">
          <div class="flex items-center justify-center gap-1.5 w-full font-mono text-[9px] mb-0.5 tracking-[0.06em] ${isActive ? "text-ink" : "text-ink5"}">
            <span class="node-dot inline-flex w-1.5 h-1.5 rounded-full ${isActive ? "bg-[#EDEDEF]" : "bg-[#3A3A40]"}"></span>
            <span>${serv.id}</span><span class="opacity-40">/</span><span>${serv.code}</span>
          </div>
          <span class="node-label font-display text-[12.5px] sm:text-[13.5px] font-semibold tracking-tight uppercase leading-snug ${isActive ? "text-ink" : "text-ink3"}">${serv.short}</span>
          <span class="font-mono text-[8px] tracking-[0.06em] mt-0.5 uppercase ${isActive ? "text-ink4" : "text-[#4E4E56]"}">${protoShort}</span>
        </div>
      `;
      node.addEventListener("click", (e) => {
        e.stopPropagation();
        FD.setDiscipline(i);
      });
      node.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          FD.setDiscipline(i);
        }
      });
      container.appendChild(node);
    });

    // Keep the black pool solid underneath every label, whatever the stage size.
    FD.fitStageSphere(stage);
  }

  FD.DesktopLayout = { render, sync };
})();