/* =========================================================
   UTILS — DOM + layout detection helpers
   ========================================================= */
(function () {
  const FD = window.FD;

  FD.$  = (sel, root = document) => root.querySelector(sel);
  FD.$$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  FD.el = function (tag, attrs = {}, html = "") {
    const node = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => {
      if (k === "class")         node.className = v;
      else if (k === "style")    node.style.cssText = v;
      else if (k.startsWith("on")) node.addEventListener(k.slice(2), v);
      else node.setAttribute(k, v);
    });
    if (html) node.innerHTML = html;
    return node;
  };

  FD.detectLayout = function () {
    const w = window.innerWidth;
    if (w < 768)  return "mobile";
    if (w < 1280) return "tablet";
    return "desktop";
  };
  /**
   * In light mode the ecosystem floats as a dark sphere on the page instead of a rectangle,
   * so the stage needs its inscribed circle. Measured here (not guessed in CSS) because the
   * stage size depends on the layout: `--stage-dia` is the sphere's diameter in px.
   */
  FD.fitStageSphere = function (stage) {
    if (!stage) return;
    const sr = stage.getBoundingClientRect();
    if (sr.width < 2 || sr.height < 2) return;
    stage.style.setProperty("--stage-dia", `${Math.round(Math.min(sr.width, sr.height) * 0.94)}px`);
  };
})();

