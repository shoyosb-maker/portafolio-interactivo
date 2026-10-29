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
})();