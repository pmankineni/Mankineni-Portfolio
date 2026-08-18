# Mankineni Portfolio

Client-facing material for **Pavan Mankineni** - SAP BI / HANA Solution Architect.

Separate from the public portfolio at `../Portfolio` (live at `mankineni.github.io/portfolio`),
which is AI-first and written for AI-lead roles. Nothing in that repo is touched by anything here.

## The Brevet Book

`index.html` is the thing you present: eighteen years told as one long ride.

A *brevet* is a long-distance cycling event where the rider carries a card that gets **stamped at
control points along the route**. That is the whole page - seven controls, four relocation
flights branching off the road, and a kit card in the corner collecting every skill picked up
along the way. The road inks itself in just below your eye line as you scroll.

## Presenting it

Open `index.html`, `F11`, and **scroll at your own pace**. No slides, no snapping, no keyboard
stepping - you own the scroll wheel the whole time. Fonts and images are embedded, so it works
with no network on a locked-down laptop.

Narration notes are in [docs/talk-track.md](docs/talk-track.md).

## Files

| File | What it is |
|---|---|
| `index.html` | **Built. Present this.** Self-contained, no network needed. |
| `index.template.html` | The source. All content lives in the `CONTROLS` array at the top of the script. |
| `build.mjs` | Inlines fonts + images as data URIs -> `index.html` + `artifact.html` |
| `artifact.html` | Body-only build, for publishing as a Claude Artifact |
| `fonts/` | Caveat + Inter, latin woff2 (SIL Open Font License) |
| `docs/talk-track.md` | The 5-minute narration, timed per control |
| `docs/qa-prep.md` | Anticipated client questions with answers |
| `docs/check-before-monday.md` | **Read this first.** What is verified vs. what I inferred. |
| `docs/logos.md` | How to swap the monogram badges for real logo files, and why they are not there by default |
| `archive/` | The earlier case-study version, kept for reference |

## Editing content

Everything is data. In `index.template.html`, near the top of the `<script>`:

- `CONTROLS` - the seven stops and two blank stretches, in order
- `FLIGHTS`  - the four relocations
- `COVER` / `CLOSING` / `KIT` - the framing copy

A learning is `['Name', selfTaught]`. `selfTaught: true` renders it in **pencil, boxed**, instead
of blue - that is the "nobody asked me to learn this" device. Flip the boolean and the styling,
the kit-card colour and the legend all follow.

```bash
node build.mjs        # regenerates index.html and artifact.html
```

Edit the template, never `index.html` - the build overwrites it.

## Design

Creamy squared paper (`#faf6ec`) with a rust margin rule, brand blue `#2c5bd6` for the road and
all handwriting, and a third ink - stamp red `#b4442f` - used for control stamps only. Caveat
carries anything a person would actually scrawl in a margin; Inter carries everything factual.
Single-theme by choice: the brief asked for creamy paper and blue ink, so the page keeps its own light world instead of inverting in a dark-mode viewer.

The road runs down the middle and winds left and right, with one knot per stop leaning toward whichever side that stop sits on - so the curve is structural, not decorative. It is generated at runtime from measured DOM positions, so markers stay on the road through any reflow. No external libraries - the hand-drawn wobble is deterministic value noise
applied to the geometry, not a filter.
