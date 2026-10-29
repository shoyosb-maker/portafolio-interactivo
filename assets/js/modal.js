/* =========================================================
   MODAL — Dossier de Calidad (desktop/tablet card + mobile sheet)
   ========================================================= */
(function () {
  const FD = window.FD;
  const { $, $$, t, item, d, State } = FD;

  FD.openModal = function () {
    const it = item();
    const loc = d();
    const isMobile = State.layout === "mobile";
    const root = $("#modal-root");

    if (isMobile) {
      root.innerHTML = `
        <div class="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex flex-col justify-end" id="modal-backdrop">
          <div class="w-full bg-surf2 border-t border-outlinev/40 rounded-t-2xl max-h-[82vh] flex flex-col translate-y-full transition-transform duration-500" style="transition-timing-function:cubic-bezier(0.16,1,0.3,1)" id="modal-panel">
            <div class="w-full flex items-center justify-center py-2"><div class="w-10 h-1 bg-outlinev/60 rounded-full"></div></div>
            <div class="px-4 pb-2 flex items-center justify-between border-b border-surf3/60">
              <div>
                <span class="font-mono text-[10px] text-white font-semibold">DOSSIER // ${it.code}</span>
                <div class="font-display text-[17px] text-white font-bold">${loc.name}</div>
              </div>
              <button class="w-7 h-7 rounded-full bg-surf4 flex items-center justify-center text-white" data-action="close">
                <span class="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
            <div class="px-4 py-3 overflow-y-auto space-y-2.5 pb-8">
              <div class="p-2.5 bg-[#0e0e0e]/80 border border-outlinev/20 rounded-xl flex items-start gap-2.5">
                <span class="material-symbols-outlined text-white text-[22px] shrink-0">verified</span>
                <div>
                  <div class="font-display text-white text-[13px] font-bold">${t("modal.mobile.qualityProtocol")}</div>
                  <p class="text-[11px] text-onvar leading-relaxed mt-1">${t("modal.mobile.qualityDesc")}</p>
                </div>
              </div>
              <div class="bg-[#0e0e0e]/80 border border-outlinev/20 rounded-xl p-2.5 space-y-1.5">
                <div class="font-mono text-onvar uppercase text-[10px]">${t("modal.mobile.matrix")}</div>
                <div class="space-y-1 text-[11px]">
                  <div class="flex justify-between py-1 bg-surf3/40 px-2 rounded"><span class="text-onvar">${t("modal.mobile.calcRev")}</span><span class="font-mono text-white">SAP2000</span></div>
                  <div class="flex justify-between py-1 bg-surf3/40 px-2 rounded"><span class="text-onvar">${t("modal.mobile.memDesc")}</span><span class="font-mono text-white">BIM / DWG</span></div>
                  <div class="flex justify-between py-1 bg-surf3/40 px-2 rounded"><span class="text-onvar">${t("modal.mobile.labTests")}</span><span class="font-mono text-white">28 DÍAS</span></div>
                  <div class="flex justify-between py-1 bg-surf3/40 px-2 rounded"><span class="text-onvar">${t("modal.mobile.support")}</span><span class="font-mono text-white">+57 304 681 4396</span></div>
                </div>
              </div>
              <div class="bg-[#0e0e0e]/80 border border-outlinev/20 rounded-xl p-2.5 space-y-1.5">
                <span class="font-mono text-onvar uppercase text-[10px]">${t("modal.mobile.package")}</span>
                <div class="grid grid-cols-2 gap-1.5">
                  ${loc.deliverables.slice(0, 4).map((del) => `
                    <div class="px-2 py-1.5 bg-surf2 border border-outlinev/30 rounded flex items-center gap-1.5">
                      <span class="material-symbols-outlined text-white text-[14px]">check_circle</span>
                      <span class="font-mono text-white text-[10px] truncate">${del}</span>
                    </div>
                  `).join("")}
                </div>
              </div>
              <a class="w-full h-10 bg-white text-[#2f3131] rounded-lg flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-wider font-semibold" href="https://wa.me/573046814396?text=Solicito%20Dossier%20Completo%20${encodeURIComponent(loc.name)}" target="_blank" rel="noopener noreferrer">
                <span class="material-symbols-outlined text-[17px]">verified_user</span>
                ${t("modal.mobile.requestAudit")}
              </a>
            </div>
          </div>
        </div>
      `;
      setTimeout(() => {
        const panel = $("#modal-panel");
        if (panel) panel.classList.remove("translate-y-full");
      }, 10);
    } else {
      root.innerHTML = `
        <div class="fixed inset-0 z-[200] flex items-center justify-center p-3 bg-black/80 backdrop-blur-xl opacity-0 transition-opacity duration-300" id="modal-backdrop" style="transition-timing-function:cubic-bezier(0.16,1,0.3,1)">
          <div class="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl bg-[#0e0e12] border border-white/[0.1] shadow-2xl overflow-hidden transform scale-95 transition-all duration-300" id="modal-panel" style="transition-timing-function:cubic-bezier(0.16,1,0.3,1)">
            <div class="shrink-0 px-5 sm:px-7 py-4 bg-white/[0.02] border-b border-white/[0.08] flex items-center justify-between">
              <div class="flex items-center gap-3">
                <img src="assets/img/logo-mark.png" alt="" class="h-7 w-7 shrink-0 select-none" draggable="false" />
                <div>
                  <div class="flex items-center gap-2">
                    <span class="font-mono text-[10px] px-1.5 py-0.5 rounded bg-white/[0.08] text-white">${it.code}</span>
                    <span class="text-white/20 text-xs">/</span>
                    <h2 class="font-display text-[13px] sm:text-[14px] font-bold uppercase text-white tracking-wide">${t("modal.title")}</h2>
                  </div>
                  <p class="font-mono text-[9px] sm:text-[10px] text-zinc-400 truncate mt-0.5">${loc.name.toUpperCase()} — ${t("modal.subtitle")}</p>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <span class="hidden sm:inline font-mono text-[9.5px] px-2.5 py-1 rounded-full border border-white/[0.1] bg-white/[0.04] text-zinc-300">NORMA: ${it.protocol}</span>
                <button class="flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.1] text-zinc-400 hover:text-white" data-action="close">
                  <span class="material-symbols-outlined text-[16px]">close</span>
                </button>
              </div>
            </div>
            <div class="flex-1 overflow-y-auto custom-sb p-5 sm:p-7 space-y-4 text-left">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3 bg-white/[0.02] border border-white/[0.07] rounded-2xl p-4 font-mono">
                <div class="border-b md:border-b-0 md:border-r border-white/[0.06] pb-3 md:pb-0 md:pr-4">
                  <span class="text-[9px] text-zinc-400 uppercase tracking-wider block">${t("modal.norm")}</span>
                  <span class="text-[12px] text-white font-semibold block mt-1">${it.protocol}</span>
                  <span class="text-[9.5px] text-zinc-400 block mt-0.5">${t("modal.normSub")}</span>
                </div>
                <div class="border-b md:border-b-0 md:border-r border-white/[0.06] pb-3 md:pb-0 md:px-4">
                  <span class="text-[9px] text-zinc-400 uppercase tracking-wider block">${t("modal.state")}</span>
                  <div class="flex items-center gap-1.5 mt-1">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span class="text-[12px] text-emerald-400 font-semibold block">${t("modal.stateValue")}</span>
                  </div>
                  <span class="text-[9.5px] text-zinc-400 block mt-0.5">${loc.techLead}</span>
                </div>
                <div class="md:pl-4">
                  <span class="text-[9px] text-zinc-400 uppercase tracking-wider block">${t("modal.compendium")}</span>
                  <span class="text-[12px] text-white font-semibold block mt-1">FUNDASERINCO // ${it.code}</span>
                  <span class="text-[9.5px] text-zinc-400 block mt-0.5">${t("modal.compendiumSub")}</span>
                </div>
              </div>

              <div class="border border-white/[0.07] bg-white/[0.015] rounded-2xl p-4 sm:p-5">
                <div class="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-3">
                  <div class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-white/70"></span>
                    <h3 class="font-display text-[12px] uppercase tracking-wider text-white font-semibold">${t("modal.deliverablesTitle")}</h3>
                  </div>
                  <span class="font-mono text-[9px] text-zinc-400 uppercase">${t("modal.traceability")}</span>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-2.5 font-mono text-[10px]">
                  ${loc.deliverables.map((dd, i) => `
                    <div class="p-2.5 rounded-xl border border-white/[0.06] bg-black/40">
                      <div class="flex items-start justify-between gap-1.5">
                        <span class="text-zinc-500">${String(i + 1).padStart(2, "0")}.</span>
                        <span class="text-white font-medium flex-1 leading-snug">${dd}</span>
                        <span class="text-[8.5px] px-2 py-0.5 rounded-full border border-emerald-500/30 text-emerald-400 bg-emerald-500/10 shrink-0">OK</span>
                      </div>
                    </div>
                  `).join("")}
                </div>
              </div>

              <div class="border border-white/[0.07] bg-white/[0.015] rounded-2xl p-4 sm:p-5">
                <div class="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-3">
                  <div class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-white/70"></span>
                    <h3 class="font-display text-[12px] uppercase tracking-wider text-white font-semibold">${t("modal.testsTitle")}</h3>
                  </div>
                  <span class="font-mono text-[9px] px-2 py-0.5 rounded-full bg-white/[0.06] text-zinc-300">${loc.tests.length} ${t("modal.testsActive")}</span>
                </div>
                <div class="space-y-2.5">
                  ${loc.tests.map((tt, i) => `
                    <div class="p-3 rounded-xl bg-black/40 border border-white/[0.06] font-mono">
                      <div class="flex items-center justify-between text-[11px] font-semibold text-white">
                        <div class="flex items-center gap-2">
                          <span class="text-zinc-500 text-[10px]">P-${String(i + 1).padStart(2, "0")}</span>
                          <span>${tt}</span>
                        </div>
                        <span class="text-[8px] text-zinc-300 uppercase px-2 py-0.5 rounded-full border border-white/[0.08] bg-white/[0.03]">OK</span>
                      </div>
                    </div>
                  `).join("")}
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-[10px] bg-white/[0.02] border border-white/[0.07] rounded-2xl p-4">
                <div class="space-y-1.5">
                  <div class="flex items-center justify-between text-zinc-400"><span>${t("modal.entity")}</span><span class="text-white font-medium">FUNDASERINCO SAS</span></div>
                  <div class="flex items-center justify-between text-zinc-400"><span>${t("modal.techLead")}</span><span class="text-white">${loc.techLead}</span></div>
                  <div class="flex items-center justify-between text-zinc-400"><span>${t("modal.headquarters")}</span><span class="text-white">Pereira, Risaralda · Eje Cafetero</span></div>
                </div>
                <div class="space-y-1.5">
                  <div class="flex items-center justify-between text-zinc-400"><span>${t("modal.legal")}</span><span class="text-white">Ley 400 de 1997 / ONAC</span></div>
                  <div class="flex items-center justify-between text-zinc-400"><span>${t("modal.bonds")}</span><span class="text-white">Cumplimiento · Salarios · Estabilidad</span></div>
                  <div class="flex items-center justify-between text-zinc-400"><span>${t("modal.act")}</span><span class="text-emerald-400">${t("modal.actValue")}</span></div>
                </div>
              </div>
            </div>
            <div class="shrink-0 px-5 sm:px-7 py-3.5 bg-white/[0.02] border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
              <div class="flex items-center gap-2">
                <a class="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full specular-btn bg-white/[0.05] text-white font-mono text-[11px]" href="https://wa.me/573046814396?text=${encodeURIComponent("Solicito dossier " + loc.name)}" target="_blank" rel="noopener noreferrer">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>${t("modal.whatsapp")}
                </a>
                <a class="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full specular-btn bg-white/[0.04] text-zinc-300 font-mono text-[11px]" href="mailto:Fundaserinco@gmail.com?subject=${encodeURIComponent("Dossier " + it.code)}">
                  <span class="material-symbols-outlined text-[13px]">mail</span>${t("modal.email")}
                </a>
              </div>
              <button class="flex items-center gap-1 px-4 py-1.5 rounded-full specular-btn bg-white/[0.08] text-white font-mono text-[11px]" data-action="close">${t("modal.close")}</button>
            </div>
          </div>
        </div>
      `;
      setTimeout(() => {
        const bd = $("#modal-backdrop");
        const panel = $("#modal-panel");
        if (bd) bd.style.opacity = "1";
        if (panel) { panel.classList.remove("scale-95"); panel.classList.add("scale-100"); }
      }, 10);
    }

    $$('#modal-root [data-action="close"]').forEach((b) => b.addEventListener("click", FD.closeModal));
    $("#modal-backdrop").addEventListener("click", (e) => {
      if (e.target.id === "modal-backdrop") FD.closeModal();
    });
  };

  FD.closeModal = function () {
    const bd = $("#modal-backdrop");
    const panel = $("#modal-panel");
    if (!bd) return;
    if (State.layout === "mobile") {
      if (panel) panel.classList.add("translate-y-full");
    } else {
      bd.style.opacity = "0";
      if (panel) { panel.classList.remove("scale-100"); panel.classList.add("scale-95"); }
    }
    setTimeout(() => {
      const r = $("#modal-root");
      if (r) r.innerHTML = "";
    }, 320);
  };
})();