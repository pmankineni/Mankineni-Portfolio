# Mankineni Portfolio

Client-facing material for **Pavan Mankineni** — SAP BI / HANA Solution Architect.

Separate from the public portfolio at [`Agents/Portfolio`](../Portfolio) (live at
`mankineni.github.io/portfolio`), which is **AI-first** and written for AI-lead roles. This
repo is **SAP-first** and written for client meetings, where the SAP track record is the
product and the AI work is the closer.

Nothing in the public portfolio repo is modified by anything here.

---

## What's in here

| File | What it's for |
|---|---|
| `index.html` | **The thing you present.** Self-contained — open it and go. Built, don't edit. |
| `index.template.html` | The source. Edit this, then rebuild. |
| `build.mjs` | Inlines `assets/*.webp` as data URIs → `index.html` + `artifact.html` |
| `artifact.html` | Body-only build, for publishing as a Claude Artifact |
| `docs/talk-track.md` | The 5-minute script, timed per section |
| `docs/qa-prep.md` | Anticipated client questions with answers |
| `docs/check-before-monday.md` | What's verified vs. what I framed — read before presenting |

## Presenting it

Open `index.html` in a browser, `F11` for full screen, **arrow keys** to step between the six
sections. No server, no network — every image is embedded, so it works on a plane or a locked-
down client laptop.

## Editing

```bash
node build.mjs        # regenerates index.html and artifact.html
```

Edit `index.template.html`, never `index.html` — the build overwrites it. Images live in
`assets/` and are referenced by `{{IMG_*}}` tokens declared at the top of `build.mjs`.

## Structure of the page

Six sections, each one talk beat, in the order you say them:

1. **Who I am** — 18 years, SAP only, certified on Datasphere + BDC
2. **Three generations** — BW → BW/4HANA → Datasphere, with the pull quote that carries the meeting
3. **Basler** — current BW → Datasphere migration
4. **Mankiewicz** — BW-on-HANA, end to end
5. **Fresenius** — global BW/4HANA + SAC, replacing a 25-year-old solution
6. **Migration tooling** — the AI work, framed as migration acceleration

The order is deliberate: SAP credibility is established over four minutes before AI is
mentioned once.

## Design

Segoe UI Variable for display and body (native on the Windows machine this is presented from,
so no font fallback surprises mid-meeting); mono for every year, metric and label. Brand blue
`#2c5bd6` carried over from the public site; teal `#0e8c7f` marks current engagements. Light
and dark both supported via tokens.
