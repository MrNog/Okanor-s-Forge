// An addon's full page: click a screenshot to see it full size; click again or
// press Esc to close. A screenshot whose file is missing turns into a dashed box
// that names the file it wants.
(function () {
  var box = null;

  function close() {
    if (box) { box.remove(); box = null; }
  }

  document.addEventListener("error", function (e) {
    var img = e.target;
    if (img.tagName !== "IMG") return;
    var fig = img.closest(".shot");
    if (!fig) return;
    fig.classList.add("empty");
    fig.dataset.need = img.getAttribute("src").replace(/^(\.\.\/)+/, "");
    img.remove();
  }, true);

  document.addEventListener("click", function (e) {
    if (box && e.target.closest(".lb")) { close(); return; }
    var fig = e.target.closest(".shot");
    if (!fig || fig.classList.contains("empty")) return;
    var img = fig.querySelector("img");
    box = document.createElement("div");
    box.className = "lb";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-label", img.alt);
    var big = document.createElement("img");
    big.src = img.src;
    big.alt = img.alt;
    box.appendChild(big);
    document.body.appendChild(box);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") close();
  });
})();
