<p align="center">
  <a href="https://mrnog.github.io/Okanor-s-Forge/">
    <img src="images/art/forge-banner.webp" alt="Okanor's Forge — WotLK 3.3.5a addons" width="100%">
  </a>
</p>

<p align="center">
  <b>World of Warcraft 3.3.5a addons, forged by Okanor for the RATS guild.</b><br>
  Free to play. Screenshots, downloads and everything each addon does, on one site.
</p>

<p align="center">
  <a href="https://mrnog.github.io/Okanor-s-Forge/"><img src="https://img.shields.io/badge/⚒_Visit_the_Forge-c0943a?style=for-the-badge" alt="Visit the Forge"></a>
  &nbsp;
  <img src="https://img.shields.io/badge/Client-3.3.5a_WotLK-1b1d21?style=for-the-badge" alt="WoW 3.3.5a">
  &nbsp;
  <img src="https://img.shields.io/badge/Realm-Onyxia_·_Horde-8b0000?style=for-the-badge" alt="Warmane Onyxia, Horde">
  &nbsp;
  <a href="https://discord.gg/MpwbuGEp69"><img src="https://img.shields.io/badge/Discord-Join-5865F2?style=for-the-badge&logo=discord&logoColor=white" alt="Join the Discord"></a>
</p>

---

## ⚒️ On the anvil

<table>
<tr>
<td width="72" align="center"><img src="images/icons/okanvil.webp" width="56" alt=""></td>
<td>
  <b><a href="https://mrnog.github.io/Okanor-s-Forge/okanvil/">Okanvil</a></b> &nbsp;<code>/okanvil</code><br>
  The raid and guild toolkit: loot council, mini roll, snapshots, PuG builder, Raid Finder, raid notes and recruiting, in one window.<br>
  <a href="https://github.com/MrNog/Okanvil/releases/latest/download/Okanvil.zip">⬇ Download</a> · <a href="https://github.com/MrNog/Okanvil">Source</a>
</td>
</tr>
<tr>
<td width="72" align="center"><img src="images/icons/ratstash.webp" width="56" alt=""></td>
<td>
  <b><a href="https://mrnog.github.io/Okanor-s-Forge/ratstash/">RatStash</a></b> &nbsp;<code>/rst</code> &nbsp;<sub>in the forge</sub><br>
  Bags and bank in one window each. Sorted groups that stay put, gear sets together, raid loot kept apart.<br>
  <a href="https://github.com/MrNog/RatStash-/releases/latest/download/RatStash.zip">⬇ Download</a> · <a href="https://github.com/MrNog/RatStash-">Source</a>
</td>
</tr>
</table>

<p align="center">
  <img src="images/okanvil/home.webp" alt="Okanvil home page" width="58%">
  &nbsp;
  <img src="images/ratstash/groups-wide.webp" alt="RatStash bags in the Groups layout" width="30%">
</p>

## 🧰 Install

1. **Download** the addon's `.zip` from its page on the Forge.
2. **Extract** it into `World of Warcraft\Interface\AddOns\`.
3. **Restart** the game.

---

<details>
<summary><b>🔨 Working on the site</b></summary>

<br>

Static HTML and vanilla JS, no build step, served by GitHub Pages from `main` / root.

| Path | What it is |
|:--|:--|
| `index.html` · `forge.css` · `forge.js` | Front page: one banner per addon, from the `ADDONS` array in `forge.js`. `hidden: true` keeps one off the page. |
| `<addon>/index.html` | The addon's full page (`okanvil/`, `ratstash/`, …), sharing `assets/theme.css`, `page.css` and `page.js`. |
| `images/<addon>/` | Its screenshots, as webp. A missing file shows as a dashed box naming the path it expects. |
| `images/art/` · `images/icons/` | Banner, social preview card, site and addon icons. |
| `docs/ART_PROMPTS.md` | Prompts for the art that is still missing. |

**New addon:** copy `ratstash/`, change the text and screenshots, add an entry to `ADDONS`.
**Run locally:** `python -m http.server 8000`, then open http://localhost:8000.

</details>

<p align="center">
  <sub>© 2026 Okanor · All rights reserved. Download and play freely; no copying, changing or re-uploading without permission.<br>
  World of Warcraft is a trademark of Blizzard Entertainment. These are fan-made addons.<br>
  Part of the <a href="https://mrnog.github.io/RATS/">RATS</a> guild hub.</sub>
</p>
