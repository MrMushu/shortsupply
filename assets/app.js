// Client-side behavior: watchlist stars (index + drug pages) + drug table filtering.
// Vanilla JS, localStorage only — no accounts, no tracking, no server.
(function () {
  var KEY = "shortsupply-watchlist";
  function load() {
    try { return new Set(JSON.parse(localStorage.getItem(KEY) || "[]")); } catch (e) { return new Set(); }
  }
  function save(set) { localStorage.setItem(KEY, JSON.stringify(Array.from(set))); }
  var watched = load();
  // Index stars read the drug key off their row (no duplicate data-d per row);
  // drug-page heroes carry their own data-d, since they have no row.
  function drugOf(btn) {
    if (btn.hasAttribute("data-d")) return btn.getAttribute("data-d");
    var row = btn.parentNode;
    while (row && row.nodeName !== "TR") row = row.parentNode;
    return row ? row.getAttribute("data-drug") : "";
  }
  function paint(btn) {
    var on = watched.has(drugOf(btn));
    btn.textContent = on ? "★" : "☆";
    btn.classList.toggle("on", on);
    btn.setAttribute("aria-pressed", on ? "true" : "false");
  }
  var stars = Array.prototype.slice.call(document.querySelectorAll("button.watch"));
  stars.forEach(function (btn) {
    paint(btn);
    btn.addEventListener("click", function () {
      var d = drugOf(btn);
      if (watched.has(d)) watched.delete(d); else watched.add(d);
      save(watched);
      stars.forEach(paint);
      apply();
    });
  });

  var search = document.getElementById("q");
  var cat = document.getElementById("cat");
  var only = document.getElementById("onlyshortage");
  var onlyw = document.getElementById("onlywatched");
  var rows = Array.prototype.slice.call(document.querySelectorAll("tbody tr[data-drug]"));
  var count = document.getElementById("rowcount");
  function apply() {
    if (!search) return;
    var q = search.value.trim().toLowerCase();
    var c = cat.value;
    var b = only.checked;
    var w = onlyw && onlyw.checked;
    var shown = 0;
    rows.forEach(function (r) {
      var d = r.getAttribute("data-drug");
      var ok =
        (!q || d.indexOf(q) !== -1) &&
        (!c || r.getAttribute("data-cat") === c) &&
        (!b || r.getAttribute("data-status") === "in-shortage") &&
        (!w || watched.has(d));
      r.style.display = ok ? "" : "none";
      if (ok) shown++;
    });
    count.textContent = shown + " of " + rows.length + " drugs";
  }
  if (search) {
    search.addEventListener("input", apply);
    cat.addEventListener("change", apply);
    only.addEventListener("change", apply);
    if (onlyw) onlyw.addEventListener("change", apply);
    apply();
  }
})();
