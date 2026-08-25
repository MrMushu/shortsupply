// Client-side drug table filtering. Vanilla, no deps.
(function () {
  var search = document.getElementById("q");
  var cat = document.getElementById("cat");
  var only = document.getElementById("onlyshortage");
  var rows = Array.prototype.slice.call(document.querySelectorAll("tbody tr[data-drug]"));
  var count = document.getElementById("rowcount");
  if (!search) return;
  function apply() {
    var q = search.value.trim().toLowerCase();
    var c = cat.value;
    var b = only.checked;
    var shown = 0;
    rows.forEach(function (r) {
      var ok =
        (!q || r.getAttribute("data-drug").indexOf(q) !== -1) &&
        (!c || r.getAttribute("data-cat") === c) &&
        (!b || r.getAttribute("data-status") === "in-shortage");
      r.style.display = ok ? "" : "none";
      if (ok) shown++;
    });
    count.textContent = shown + " of " + rows.length + " drugs";
  }
  search.addEventListener("input", apply);
  cat.addEventListener("change", apply);
  only.addEventListener("change", apply);
  apply();
})();
