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

// "What's new": built from GitHub on every visit, so a release never needs a page edit.
// Each vX.Y.Z tag is a version; its notes are the commit lines between it and the tag
// before, with the same rules as the Discord release post:
//   new: / feature: / add: / added:  -> New
//   fix: / fixed: / bug:             -> Fixed
// Every other line is left out, officer: lines included. Cached for an hour per visitor
// (GitHub allows 60 calls an hour without login).
(function () {
  var box = document.querySelector("[data-changelog]");
  if (!box) return;
  var repo = box.getAttribute("data-changelog");
  var SHOW = 6;
  var KEY = "okf-changes-" + repo;
  var API = "https://api.github.com/repos/MrNog/" + repo;

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
  }
  function key(t) { return t.slice(1).split(".").map(Number); }
  function newer(a, b) {
    var x = key(a), y = key(b);
    for (var i = 0; i < 3; i++) if (x[i] !== y[i]) return x[i] > y[i];
    return false;
  }
  function getJSON(url) {
    return fetch(url).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); });
  }
  function notes(commits) {
    var out = { added: [], fixed: [] }, seen = {};
    commits.forEach(function (c) {
      c.commit.message.split("\n").forEach(function (line) {
        var m = /^\s*[-*]?\s*(new|feature|add|added|fix|fixed|bug):\s*(.+)$/i.exec(line);
        if (!m || seen[m[2]]) return;
        seen[m[2]] = 1;
        (/^(fix|fixed|bug)$/i.test(m[1]) ? out.fixed : out.added).push(m[2].trim());
      });
    });
    return out;
  }
  function load() {
    try {
      var c = JSON.parse(localStorage.getItem(KEY) || "null");
      if (c && Date.now() - c.at < 3600e3) return Promise.resolve(c.list);
    } catch (e) {}
    return getJSON(API + "/tags?per_page=100").then(function (tags) {
      var vs = tags.map(function (t) { return t.name; }).filter(function (n) { return /^v\d+\.\d+\.\d+$/.test(n); });
      vs.sort(function (a, b) { return newer(a, b) ? -1 : newer(b, a) ? 1 : 0; });
      var pick = vs.slice(0, SHOW);
      return Promise.all(pick.map(function (t, i) {
        var prev = vs[i + 1];
        var url = prev ? API + "/compare/" + prev + "..." + t : API + "/commits?sha=" + t + "&per_page=30";
        return getJSON(url).then(function (d) {
          var commits = prev ? d.commits : d;
          var last = commits.length ? (prev ? commits[commits.length - 1] : commits[0]) : null;
          return { tag: t, date: last ? last.commit.committer.date : null, notes: notes(commits) };
        });
      }));
    }).then(function (list) {
      try { localStorage.setItem(KEY, JSON.stringify({ at: Date.now(), list: list })); } catch (e) {}
      return list;
    });
  }
  function render(list) {
    box.innerHTML = list.map(function (v) {
      var d = v.date ? new Date(v.date).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" }) : "";
      var parts = [];
      if (v.notes.added.length) parts.push('<h4 class="new">New</h4><ul>' + v.notes.added.map(function (n) { return "<li>" + esc(n) + "</li>"; }).join("") + "</ul>");
      if (v.notes.fixed.length) parts.push('<h4 class="fix">Fixed</h4><ul>' + v.notes.fixed.map(function (n) { return "<li>" + esc(n) + "</li>"; }).join("") + "</ul>");
      if (!parts.length) parts.push('<p class="quiet">Small fixes and polish.</p>');
      return '<article class="ver"><header><b>' + esc(v.tag.slice(1)) + "</b><time>" + esc(d) + "</time></header>" + parts.join("") + "</article>";
    }).join("") + '<a class="all" href="https://github.com/MrNog/' + esc(repo) + '/tags" target="_blank" rel="noopener">Every version on GitHub ↗</a>';
  }
  load().then(render).catch(function () {
    box.innerHTML = '<p class="quiet">Couldn\'t reach GitHub right now. <a href="https://github.com/MrNog/' + esc(repo) + '/tags" target="_blank" rel="noopener">See the versions there ↗</a></p>';
  });
})();
