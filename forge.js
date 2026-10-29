// Okanor's Forge front page: one banner per addon; the banner opens that addon's
// full page (okanvil/, ratstash/, ...), which explains everything.
// img paths are relative to images/. A missing image shows a labelled empty slot
// (the label says which file to drop in), so the page never shows a broken icon.
// New addon = a new entry here + a folder with its own index.html (copy ratstash/).
// `hidden: true` keeps an addon off the page; its page folder stays, just unlinked.
const GH = "https://github.com/MrNog/";

const ADDONS = [
  {
    id: "okanvil",
    name: "Okanvil",
    status: "released",
    version: "2.11.0",
    repo: "Okanvil",
    zip: "Okanvil.zip",
    slash: "/okanvil",
    icon: "icons/okanvil.webp",
    main: ["okanvil/card.webp", "Okanor the smith hammering a glowing blade on the anvil", "25% center"],
    tagline: "The raid and guild toolkit. Loot council and soft reserves, mini roll, upgrades, rankings, PuG builder, Raid Finder, notes and recruiting, in one window.",
  },
  {
    id: "ratstash",
    name: "RatStash",
    status: "released",
    version: "0.3.0",
    repo: "RatStash",
    zip: "RatStash.zip",
    slash: "/rst",
    icon: "icons/ratstash.webp",
    main: ["ratstash/card.webp", "A rogue rat hugging his stash and inspecting a purple gem", "15% center"],
    tagline: "Bags and bank in one window each. Sorted groups that stay put, raid loot kept apart.",
  },
  {
    id: "ratroll",
    name: "RatRoll",
    status: "released",
    version: "0.2.0",
    repo: "RatRoll",
    zip: "RatRoll.zip",
    slash: "/rr",
    icon: "icons/ratroll.webp",
    // og is wider than the 16:10 card: crop from 16% in, keeping the title and the rat
    main: ["ratroll/og.webp", "RatRoll: a scarred rat blowing on two dice for luck", "16% center"],
    tagline: "The lucky roll. A small roll window, master loot in a click and softres.it reserves: the loot part of Okanvil, on its own.",
  },
  {
    id: "ratbites",
    name: "RatBites",
    status: "released",
    version: "1.2.0",
    repo: "RatBites",
    zip: "RatBites.zip",
    slash: "/bites",
    icon: "icons/ratbites.webp",
    main: ["ratbites/card.webp", "RatBites: an armoured rat biting a training post, combat numbers flying off it", "40% center"],
    tagline: "Combat numbers with spell icons. Your hits and heals on each nameplate, what lands on you in its own box.",
  },
  {
    id: "ratree",
    name: "Ratree",
    status: "released",
    version: "1.1.1",
    repo: "Ratree",
    zip: "Ratree.zip",
    slash: "/ratree",
    icon: "icons/ratree.webp",
    main: ["ratree/card.webp", "Ratree: talents and glyphs, a rat paladin behind the trees", "center"],
    tagline: "Talents and glyphs. Plan every point first, then learn them all at once: no more misclicks during a respec.",
  },
  {
    id: "pallypower-skin",
    hidden: true, // not public yet: drop the flag to show it
    name: "PallyPower Skin",
    status: "forge",
    version: "0.1.0",
    repo: null,
    slash: null,
    icon: "icons/pallypower-skin.webp",
    main: ["pallypower-skin/bar.webp", "PallyPower buff bar with the skin"],
    tagline: "The Okanvil look for PallyPower. Who is missing a blessing shows as a coloured edge.",
  },
  {
    id: "redeemer",
    hidden: true,
    name: "Rats-Redeemer",
    status: "fork",
    version: "1.0",
    repo: "Rats-Redeemer",
    zip: "Rats-Redeemer.zip",
    slash: "/redeemer",
    icon: "icons/redeemer.webp",
    main: ["redeemer/chat.webp", "A res line in chat"],
    tagline: "Funny lines when you cast a resurrection. The RATS edition of Redeemer, credit to its original authors.",
  },
];

const STATUS = {
  released: ["Released", "is-live"],
  forge: ["In the forge", "is-forge"],
  fork: ["Guild fork", "is-fork"],
};

const IMG = "images/";
const SHOWN = ADDONS.filter((a) => !a.hidden);

function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
}

// An image or, if the file isn't there yet, a slot that names the file it wants.
// `pos` (optional): where the crop sits, as CSS object-position, for a picture
// whose subject is not in its top-left corner.
function slot(file, label, cls, pos) {
  return `<figure class="slot ${cls || ""}" data-file="${esc(file)}">
    <img src="${IMG + esc(file)}" alt="${esc(label)}"${pos ? ` style="object-position:${esc(pos)}"` : ""} loading="lazy" onerror="this.parentNode.classList.add('empty');this.remove()">
    <figcaption><span class="need">${esc(label)}</span><code>images/${esc(file)}</code></figcaption>
  </figure>`;
}

function badge(a) {
  const [txt, cls] = STATUS[a.status];
  return `<span class="status ${cls}">${txt}</span>`;
}

function stamp(a) {
  return `<dl class="stamp">
    <div><dt>Version</dt><dd data-ver="${esc(a.repo || "")}">${esc(a.version)}</dd></div>
    <div><dt>Interface</dt><dd>30300</dd></div>
    ${a.slash ? `<div><dt>Command</dt><dd>${esc(a.slash)}</dd></div>` : ""}
  </dl>`;
}

function actions(a) {
  const page = `<a class="btn primary" href="${a.id}/index.html">See ${esc(a.name)} →</a>`;
  if (!a.repo) return page + `<span class="btn is-off">Not released yet</span>`;
  return page + `<a class="btn" href="${GH + a.repo}/releases/latest/download/${a.zip}"><svg><use href="#i-dl"/></svg> Download</a>`;
}

function renderIndex() {
  return SHOWN.map((a) => `<a class="idx" href="${a.id}/index.html">
      ${slot(a.icon, a.name + " icon", "icon")}
      <span class="idx-txt"><b>${esc(a.name)}</b>${badge(a)}</span>
    </a>`).join("");
}

function renderAddon(a, i) {
  return `<article class="addon${i % 2 ? " flip" : ""}" id="${a.id}">
    <div class="copy">
      <a class="addon-hd" href="${a.id}/index.html">
        ${slot(a.icon, a.name + " icon", "icon")}
        <div><h3>${esc(a.name)}</h3>${badge(a)}</div>
      </a>
      <p class="tagline">${esc(a.tagline)}</p>
      ${stamp(a)}
      <div class="acts">${actions(a)}</div>
    </div>
    <a class="banner" href="${a.id}/index.html" aria-label="${esc(a.name)}: full page">${slot(a.main[0], a.main[1], "shot", a.main[2])}</a>
  </article>`;
}

// The newest vX.Y.Z tag on GitHub replaces the version written above, when GitHub answers.
// (Releases use a rolling "latest" tag, so the release name can't be used; the tags can.)
const verKey = (v) => v.slice(1).split(".").map(Number);
const newer = (a, b) => { const x = verKey(a), y = verKey(b); for (let i = 0; i < 3; i++) if (x[i] !== y[i]) return x[i] > y[i]; return false; };
async function liveVersions() {
  for (const el of document.querySelectorAll("dd[data-ver]")) {
    const repo = el.dataset.ver;
    if (!repo) continue;
    try {
      const r = await fetch("https://api.github.com/repos/MrNog/" + repo + "/tags?per_page=100");
      if (!r.ok) continue;
      const tags = (await r.json()).map((t) => t.name).filter((n) => /^v\d+\.\d+\.\d+$/.test(n));
      if (tags.length) el.textContent = tags.reduce((a, b) => (newer(b, a) ? b : a)).slice(1);
    } catch (e) { /* offline or rate-limited: keep the written version */ }
  }
}

document.getElementById("smithArt").innerHTML = slot("art/okanor.webp", "Okanor portrait", "portrait");
document.getElementById("index").innerHTML = renderIndex();
document.getElementById("addons").innerHTML = SHOWN.map(renderAddon).join("");
document.getElementById("year").textContent = new Date().getFullYear();
liveVersions();
