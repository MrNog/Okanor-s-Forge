# Okanor's Forge

Site for Okanor's WoW 3.3.5a addons. Static HTML, no build, served by GitHub Pages at
https://mrnog.github.io/Okanor-s-Forge/

- `index.html` + `forge.css` + `forge.js` = the front page: one banner per addon, listed in the `ADDONS`
  array in `forge.js`. Each banner opens that addon's own page.
- `<addon>/index.html` = the addon's full page (`okanvil/`, `ratstash/`, ...), all sharing
  `assets/theme.css`, `assets/page.css` and `assets/page.js`. New addon: copy `ratstash/`, add an `ADDONS` entry.
- `images/<addon>/` holds its screenshots (webp). A missing file shows as a dashed box naming the path it expects.
- `docs/ART_PROMPTS.md` holds the prompts for the art that is still missing (icons).
- Run locally with `python -m http.server 8000` (the GitHub version check needs http, not file://).

Publish: repo `MrNog/Okanor-s-Forge` on GitHub, push `main`, then Settings → Pages → Deploy from branch → `main` / root.
