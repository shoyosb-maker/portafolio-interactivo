/* =========================================================
   TABLET LAYOUT — orbital stage + flanking cards
   Shares the desktop visual language: near-black canvas, hairline
   cards, a single live accent and Inter-first typography.
   ========================================================= */
(function () {
  const FD = window.FD;
  const { $, $$, el, t, item, d, State } = FD;

  function render() {
    const root = document.getElementById("layout-tablet");
    root.className = "layout active relative flex-col h-screen w-screen overflow-hidden bg-[#0b0b0c] text-[#ededef] font-sans";

    root.innerHTML = `
      <!-- Ambient backdrop -->
      <div class="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[760px] h-[760px] rounded-full bg-[radial-gradient(circle_at_center,rgba(237,237,239,0.025)_0%,transparent_65%)] blur-2xl satin-halo"></div>
        <div class="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:32px_32px] opacity-25"></div>
      </div>

      <!-- Topbar -->
      <header class="relative z-30 w-full h-[54px] shrink-0 bg-[#0b0b0c]/80 backdrop-blur-2xl border-b border-white/[0.07] pl-4 pr-16 lg:pl-6 lg:pr-16 flex items-center justify-between gap-3">
        <div class="flex items-center gap-3.5 min-w-0">
          <img src="assets/img/logo-mark.png" alt="" class="h-7 w-7 shrink-0 select-none" draggable="false" />
          <div class="flex items-center gap-2.5 min-w-0">
            <span class="font-display text-[13px] tracking-[0.06em] uppercase text-white font-semibold">${t("brand.name")}</span>
            <span class="text-white/20 text-xs hidden sm:inline">/</span>
            <span class="font-mono text-[10.5px] text-[#8A8A93] tracking-wide hidden lg:inline truncate">${t("brand.subtitle")}</span>
          </div>
        </div>
        <div class="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] min-w-0 max-w-[300px] lg:max-w-[400px]">
          <span class="w-1.5 h-1.5 rounded-full bg-[#6EE7B7] animate-pulse shrink-0"></span>
          <span class="font-mono text-[10px] text-[#B4B4BC] tracking-wide truncate" id="t-topbar-status">—</span>
          <span class="w-1 h-1 rounded-full bg-white/20 shrink-0 hidden lg:inline-block"></span>
          <span class="font-mono text-[10px] text-[#8A8A93] truncate max-w-[170px] hidden lg:inline" id="t-topbar-coverage">—</span>
        </div>
        <div class="flex items-center gap-2 shrink-0">
          <button class="flex items-center gap-1.5 px-3 py-1.5 rounded-full specular-btn bg-white/[0.04] text-[#D6D6DB] text-[11px] font-medium tracking-[0.02em] whitespace-nowrap" data-action="open-modal">
            <span class="material-symbols-outlined text-[13px] text-[#B4B4BC]">folder_open</span>
            <span class="hidden lg:inline">${t("topbar.dossier")}</span>
          </button>
          <a class="flex items-center gap-1.5 px-3 py-1.5 rounded-full specular-btn bg-white/[0.04] text-[#D6D6DB] text-[11px] font-medium tracking-[0.02em] whitespace-nowrap" href="https://wa.me/573046814396" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp +57 304 681 4396">
            <span class="w-1.5 h-1.5 rounded-full bg-[#8A8A93]"></span>
            <span class="hidden md:inline">+57 304 681 4396</span>
          </a>
        </div>
      </header>

      <!-- Main -->
      <main class="relative z-10 flex-1 w-full min-h-0 flex items-stretch overflow-hidden px-3 lg:px-6 py-2.5 gap-3.5">
        <!-- Left -->
        <aside class="w-48 lg:w-60 shrink-0 flex flex-col justify-between specular-card rounded-xl p-4 z-20 overflow-hidden">
          <div class="flex flex-col h-full min-h-0 min-w-0">
              <div class="flex items-center justify-between pb-3 border-b border-white/[0.07] mb-3 gap-2 shrink-0">
                <div class="flex items-center gap-2 min-w-0">
                  <span class="w-1.5 h-1.5 rounded-full bg-white/70 shrink-0"></span>
                  <span class="text-[10px] uppercase text-white tracking-[0.06em] font-semibold truncate">${t("left.title")}</span>
                </div>
                <span class="font-mono text-[9.5px] px-1.5 py-0.5 rounded bg-white/[0.06] text-[#8A8A93] border border-white/[0.06] shrink-0 hidden lg:inline-block" id="t-left-code">—</span>
              </div>
              <div class="fluid flex flex-col gap-2.5 flex-1 min-h-0 overflow-y-auto thin-sb pr-1">
                <div class="border-t border-white/[0.06] pt-3">
                  <span class="text-[10px] text-[#8A8A93] uppercase tracking-[0.06em] block mb-1">${t("left.purpose")}</span>
                  <p class="text-[11.5px] text-[#D6D6DB] leading-snug" id="t-synopsis">—</p>
                </div>
                <div class="border-t border-white/[0.06] pt-3">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-[10px] text-[#8A8A93] uppercase tracking-[0.06em]">${t("left.phases")}</span>
                    <span class="font-mono text-[9px] text-[#6E6E76] hidden lg:inline">${t("left.timeEstimate")}</span>
                  </div>
                  <div class="space-y-1.5 font-mono text-[9px]" id="t-phases"></div>
                </div>
              </div>
            <div class="pt-3 mt-2 border-t border-white/[0.07] flex flex-col gap-1 shrink-0">
              <span class="font-mono text-[9.5px] uppercase tracking-[0.06em] text-[#6E6E76]" id="t-coverage-label">—</span>
              <span class="font-mono text-[10.5px] font-medium leading-snug text-white text-balance" id="t-coverage-tag" title="">—</span>
              <p class="font-mono text-[9.5px] leading-snug text-[#8A8A93] text-pretty" id="t-coverage-detail" title="">—</p>
            </div>
          </div>
        </aside>

        <!-- Center -->
        <section class="relative flex-1 flex items-center justify-center overflow-hidden" id="t-stage">
          <svg class="absolute inset-0 w-full h-full pointer-events-none" id="t-orbit" aria-hidden="true"></svg>
          <div class="relative z-10 w-52 h-52 rounded-full core-glow flex items-center justify-center cursor-pointer group select-none transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]" id="t-core">
            <div class="core-media w-full h-full rounded-full overflow-hidden relative flex items-center justify-center" id="t-core-media">
              <img alt="" class="core-still" id="t-core-still" src="" />
              <div class="absolute inset-0 core-hover-veil opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-all duration-200 p-5 text-center">
                <span class="font-display text-[11px] text-white tracking-wide font-semibold">${t("right.title")}</span>
                <span class="font-mono text-[8.5px] text-[#8A8A93] mt-1">Fundaserinco@gmail.com</span>
                <span class="font-mono text-[8.5px] text-[#B4B4BC] mt-0.5">+57 304 681 4396</span>
                <span class="font-mono text-[8px] text-[#6E6E76] mt-2">[ ${t("topbar.dossier")} ]</span>
              </div>
            </div>
          </div>
          <div class="absolute inset-0 pointer-events-none" id="t-nodes"></div>
        </section>

        <!-- Right -->
        <aside class="w-48 lg:w-60 shrink-0 flex flex-col justify-between specular-card rounded-xl p-4 z-20 overflow-hidden">
          <div class="flex flex-col h-full min-h-0 min-w-0">
              <div class="flex items-center justify-between pb-3 border-b border-white/[0.07] mb-3 gap-2 shrink-0">
                <div class="flex items-center gap-2 min-w-0">
                  <span class="w-1.5 h-1.5 rounded-full bg-white/70 shrink-0"></span>
                  <span class="text-[10px] uppercase text-white tracking-[0.06em] font-semibold truncate">${t("right.title")}</span>
                </div>
                <span class="font-mono text-[9.5px] px-1.5 py-0.5 rounded bg-white/[0.06] text-[#8A8A93] border border-white/[0.06] shrink-0 hidden lg:inline-block" id="t-right-code">—</span>
              </div>
              <div class="fluid flex flex-col gap-2.5 flex-1 min-h-0 overflow-y-auto thin-sb pr-1">
                <div class="border-t border-white/[0.06] pt-3">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-[10px] text-[#8A8A93] uppercase tracking-[0.06em] whitespace-nowrap">${t("right.deliverables")}</span>
                    <span class="font-mono text-[8px] px-1.5 py-0.5 rounded-full bg-white/[0.05] text-[#B4B4BC] whitespace-nowrap">${t("right.auditables")}</span>
                  </div>
                  <ul class="space-y-0.5 font-mono text-[9.5px]" id="t-deliverables"></ul>
                  <button class="mt-2 w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg specular-btn bg-white/[0.05] text-white text-[10.5px] uppercase tracking-[0.06em]" data-action="open-modal">
                    <span class="material-symbols-outlined text-[13px] text-[#B4B4BC] hidden lg:inline">folder_open</span>
                    <span>${t("right.openDossier")}</span>
                  </button>
                </div>
                <div class="border-t border-white/[0.06] pt-3">
                  <span class="text-[10px] text-[#8A8A93] uppercase tracking-[0.06em] block mb-1">${t("right.verification")}</span>
                  <p class="font-display text-[12px] text-white font-semibold" id="t-verif-title">—</p>
                  <p class="text-[10.5px] text-[#B4B4BC] leading-snug mt-1 line-clamp-2" id="t-verif-desc">—</p>
                </div>
              </div>
            <div class="pt-3 mt-2 border-t border-white/[0.07] flex items-center justify-between font-mono text-[10px] text-[#8A8A93] gap-2 shrink-0">
              <span class="shrink-0">${t("right.template")}</span>
              <span class="text-white font-medium truncate" id="t-compendium">—</span>
            </div>
          </div>
        </aside>
      </main>

      <!-- Discipline indicator: its own lane above the status footer -->
      <div class="relative z-30 disc-lane hidden md:flex items-center justify-center h-9 shrink-0 bg-black">
        <div class="disc-dots" id="t-dots"></div>
      </div>

      <!-- Bottom -->
      <footer class="relative z-30 w-full h-[58px] shrink-0 bg-[#0b0b0c]/85 backdrop-blur-2xl border-t border-white/[0.07] px-4 lg:px-6 flex items-center justify-between gap-3">
        <div class="flex items-center gap-3.5 max-w-[420px] overflow-hidden">
          <div class="w-7 h-7 rounded-lg bg-white/[0.05] border border-white/[0.1] flex items-center justify-center shrink-0">
            <span class="font-mono text-[11px] font-semibold text-white" id="t-bottom-num">—</span>
          </div>
          <div class="flex flex-col truncate">
            <div class="flex items-center gap-2 min-w-0">
              <span class="font-display text-[12.5px] uppercase tracking-wide text-white font-semibold truncate" id="t-bottom-title">—</span>
              <span class="px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-[8.5px] font-mono text-[#B4B4BC] shrink-0" id="t-bottom-protocol">—</span>
            </div>
            <p class="text-[11px] text-[#8A8A93] truncate" id="t-bottom-synopsis">—</p>
          </div>
        </div>
        <div class="flex items-center gap-2 shrink-0">
          <span class="font-mono text-[10.5px] text-[#8A8A93] hidden sm:inline" id="t-bottom-counter">—</span>
          <button class="flex items-center gap-1.5 text-[11px] font-medium tracking-[0.02em] text-white px-3 py-1.5 rounded-full specular-btn bg-white/[0.05]" data-action="open-modal">
            <span class="material-symbols-outlined text-[13px] text-[#B4B4BC]">folder_open</span>
            <span class="hidden sm:inline">${t("bottom.dossier")}</span>
          </button>
          <a class="hidden md:flex items-center gap-1.5 text-[11px] font-medium tracking-[0.02em] text-[#B4B4BC] px-3 py-1.5 rounded-full specular-btn bg-white/[0.04]" href="mailto:Fundaserinco@gmail.com?subject=Solicitud%20de%20Cotizacion%20Tecnica">
            <span class="material-symbols-outlined text-[13px] text-[#B4B4BC]">mail</span>
            <span>${t("bottom.quote")}</span>
          </a>
          <button class="flex items-center gap-1 text-[11px] font-medium tracking-[0.02em] text-black bg-white hover:bg-[#dcdce0] px-3.5 py-1.5 rounded-full transition-all duration-200" data-action="next">
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
    $$("#layout-tablet [data-action]").forEach((b) => {
      const act = b.getAttribute("data-action");
      if (act === "open-modal") b.addEventListener("click", () => FD.openModal());
      else if (act === "next") b.addEventListener("click", () => FD.setDiscipline(State.activeIndex + 1));
    });
    const core = $("#t-core");
    if (core) core.addEventListener("click", () => FD.openModal());
  }

  function sync() {
    const it = item();
    const loc = d();

    $("#t-topbar-status").textContent = `${t("topbar.statusPrefix")}: ${it.id} ${it.code} // ${loc.name.toUpperCase()}`;
    $("#t-topbar-coverage").textContent = loc.coverageText;

    $("#t-left-code").textContent = it.id;
    $("#t-synopsis").textContent = loc.synopsis;
    $("#t-phases").innerHTML = loc.phases.map((ph) => `
      <div class="flex justify-between items-center text-[#8A8A93] border-b border-white/[0.04] pb-1 gap-1" title="${ph.name}">
        <span class="truncate">${ph.name}</span>
        <span class="text-white font-medium shrink-0 text-[8px]">${ph.time}</span>
      </div>
    `).join("");
    $("#t-coverage-tag").textContent = loc.coverageTag;
    $("#t-coverage-tag").title = loc.coverageTag;
    $("#t-coverage-detail").textContent = loc.coverageText;
    $("#t-coverage-detail").title = loc.coverageText;
    $("#t-coverage-label").textContent = t("left.coverage").replace(/:$/, "");

    $("#t-right-code").textContent = it.id;
    $("#t-deliverables").innerHTML = loc.deliverables.map((dd, i) => `
      <li class="flex items-start gap-1.5 leading-tight pb-0.5 border-b border-white/[0.04] last:border-b-0" title="${dd}">
        <span class="text-[#6E6E76] shrink-0">${String(i + 1).padStart(2, "0")}.</span>
        <span class="text-[#B4B4BC] truncate">${dd}</span>
      </li>
    `).join("");
    $("#t-verif-title").textContent = loc.verificationTitle;
    $("#t-verif-desc").textContent = loc.verificationDesc;
    $("#t-compendium").textContent = `FUNDASERINCO // ${it.code}`;


    $("#t-core-still").src = it.image;

    $("#t-bottom-num").textContent = it.id;
    $("#t-bottom-title").textContent = loc.headline;
    $("#t-bottom-protocol").textContent = it.protocol.split("/")[0].trim();
    $("#t-bottom-synopsis").textContent = loc.synopsis;
    $("#t-bottom-counter").textContent = `${t("bottom.counter")} [ ${it.id} / 07 ]`;

    $("#t-dots").innerHTML = FD.DATA.map((_, i) => `
      <button class="disc-dot" data-tdot="${i}" aria-label="Disciplina ${i + 1}" aria-current="${i === State.activeIndex}"></button>
    `).join("");
    $$("#t-dots button").forEach((b) => b.addEventListener("click", () => FD.setDiscipline(parseInt(b.getAttribute("data-tdot"), 10))));

    layoutNodes();
  }

  function buildNode(serv, i, labelled) {
    const isActive = i === State.activeIndex;
    const loc = serv[FD.currentLang];

    const node = el("button", {
      type: "button",
      class: `orbital-node absolute pointer-events-auto border-0 bg-transparent p-0 leading-none cursor-pointer ${isActive ? "active" : ""}`,
      style: `transform:translate(-50%,-50%);`,
      "aria-label": `${serv.id} · ${loc.name}`,
      "aria-pressed": String(isActive),
      "data-full": loc.name,
    });

    // Float animation lives on the inner wrapper so it can't override the centering translate.
    node.innerHTML = labelled
      ? `<div class="node-float flex flex-col items-center whitespace-nowrap" style="animation-delay:-${(i * 0.85).toFixed(2)}s;">
           <div class="flex items-center justify-center gap-1.5 font-mono text-[9px] tracking-[0.06em] ${isActive ? "text-white" : "text-[#6E6E76]"}">
             <span class="node-dot inline-flex w-1.5 h-1.5 rounded-full ${isActive ? "bg-[#EDEDEF]" : "bg-[#3A3A40]"}"></span>
             <span>${serv.id}</span><span class="opacity-40">/</span><span>${serv.code}</span>
           </div>
           <span class="node-label font-display text-[12px] font-semibold tracking-tight uppercase leading-snug ${isActive ? "text-white" : "text-[#B4B4BC]"}">${serv.short}</span>
           <span class="font-mono text-[7.5px] tracking-[0.06em] mt-0.5 uppercase ${isActive ? "text-[#8A8A93]" : "text-[#4E4E56]"}">${serv.protocol.split("/")[0].trim()}</span>
         </div>`
      : `<span class="node-float inline-flex h-7 w-7 items-center justify-center rounded-full border font-mono text-[10px] transition-colors ${
          isActive
            ? "bg-white text-[#2f3131] border-white font-semibold"
            : "bg-[#0e0e0e]/85 text-[#8A8A93] border-white/[0.08] hover:text-white hover:border-white/40"
        }" style="animation-delay:-${(i * 0.4).toFixed(2)}s;">${(i + 1).toString().padStart(2, "0")}</span>`;

    node.addEventListener("click", () => FD.setDiscipline(i));
    return node;
  }

  function drawOrbit(cx, cy, rx, ry) {
    const ring = $("#t-orbit");
    if (!ring) return;
    if (rx < 8 || ry < 8) {
      ring.innerHTML = "";
      return;
    }
    ring.setAttribute("viewBox", `0 0 ${Math.round(cx * 2)} ${Math.round(cy * 2)}`);
    const origin = `transform-origin:${cx}px ${cy}px;`;
    ring.innerHTML = `
      <g fill="none">
        <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" stroke="rgba(255,255,255,0.14)" stroke-width="1" stroke-dasharray="3 6" class="orbit-cw" style="animation-duration:180s;${origin}"></ellipse>
        <ellipse cx="${cx}" cy="${cy}" rx="${rx * 0.76}" ry="${ry * 0.76}" stroke="rgba(255,255,255,0.07)" stroke-width="1" stroke-dasharray="1 5" class="orbit-ccw" style="animation-duration:90s;${origin}"></ellipse>
        <ellipse cx="${cx}" cy="${cy}" rx="${rx * 0.5}" ry="${ry * 0.5}" stroke="rgba(52,211,153,0.16)" stroke-width="1" stroke-dasharray="8 24" class="orbit-cw" style="animation-duration:55s;${origin}"></ellipse>
      </g>
    `;
  }

  // Keep the core relationship stable and measured only after Tailwind's lazily generated
  // utilities are applied, otherwise node widths (and the chosen node style) would be wrong.
  const CORE_BASE = 208;
  const CORE_MIN = 156;
  const PAD = 14;      // room for the float animation (±5px) and the active glow
  const CORE_GAP = 18; // breathing room between the core edge and the nodes

  function setCoreSize(size) {
    const core = $("#t-core");
    if (!core) return;
    core.style.width = `${size}px`;
    core.style.height = `${size}px`;
  }

  // First paint can happen before the Tailwind CDN injects utilities, so re-orbit whenever the stage resizes.
  let stageObserver = null;
  function observeStage() {
    const stage = $("#t-stage");
    if (!stage) return;
    if (typeof ResizeObserver === "undefined") {
      setTimeout(layoutNodes, 300);
      return;
    }
    if (stageObserver) stageObserver.disconnect();
    let frame = 0;
    stageObserver = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (stage.isConnected) layoutNodes();
      });
    });
    stageObserver.observe(stage);

    const relayout = () => { if (stage.isConnected) layoutNodes(); };
    setTimeout(relayout, 350);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(relayout);
  }

  let layoutToken = 0;

  function layoutNodes() {
    const container = $("#t-nodes");
    if (!container) return;
    const stage = container.parentElement;
    const rect = stage.getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) return;

    const token = ++layoutToken;
    const total = FD.DATA.length;
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    // Mount first, then measure on the next frame so freshly generated utility classes apply.
    container.style.visibility = "hidden";
    container.replaceChildren(...FD.DATA.map((serv, i) => buildNode(serv, i, true)));

    requestAnimationFrame(() => {
      if (token !== layoutToken || !container.isConnected) return;

      const measure = (nodes) => {
        const nodeW = Math.max(...nodes.map((n) => n.offsetWidth));
        const nodeH = Math.max(...nodes.map((n) => n.offsetHeight));
        const rx = Math.max(0, cx - nodeW / 2 - PAD);
        // Largest core that still leaves room for the ring.
        return { nodeW, nodeH, rx, maxCore: 2 * (rx - nodeW / 2 - CORE_GAP) };
      };

      // Prefer named nodes; fall back to numbered dots only when the core would get too small.
      let nodes = Array.from(container.children);
      let metrics = measure(nodes);
      if (metrics.maxCore < CORE_MIN) {
        nodes = FD.DATA.map((serv, i) => buildNode(serv, i, false));
        container.replaceChildren(...nodes);
        metrics = measure(nodes);
      }

      const { nodeH, rx } = metrics;
      const coreSize = Math.round(Math.max(120, Math.min(CORE_BASE, metrics.maxCore)));
      // Ellipse fitted to the free stage area so no node is clipped.
      const ry = Math.max(0, Math.min(cy - nodeH / 2 - PAD, rx * 1.9));

      setCoreSize(coreSize);
      drawOrbit(cx, cy, rx, ry);

      nodes.forEach((node, i) => {
        const angle = (i * 2 * Math.PI) / total - Math.PI / 2;
        node.style.left = `${cx + rx * Math.cos(angle)}px`;
        node.style.top = `${cy + ry * Math.sin(angle)}px`;
        node.classList.toggle("tt-below", Math.sin(angle) < -0.35);
      });
      container.style.visibility = "";
    });
  }

  FD.TabletLayout = { render, sync };
})();
