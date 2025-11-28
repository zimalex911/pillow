# Pillow story ring demo

Quick, vertical-friendly mini experience to showcase pillow use cases. Open `index.html` in any browser to run it.

**Where to view it**
- Local file: double-click `index.html`.
- Local server (avoids CORS warnings): `python -m http.server 8000` then visit <http://localhost:8000> in your browser.
- If you publish this repo to GitHub Pages or any static host, point the link straight to `index.html`.

## What you get
- 9:16 stage with the pillow in the center and up to 12 mini-scenes arranged like a clock.
- Tap/hover a scene to pull it into focus with copy and a soft spotlight.
- Optional auto-demo loop for hands-free recording of smooth transitions.

## Swap in your assets
- Click **Load pillow image** in the header to swap in your provided pillow photo instantly (no code edits needed).
- Click **Load 20 poses** and select your 20 pose files at once; they flow into the ring in filename order and auto-animate through the 30s loop.
- Prefer wiring files directly? Replace `assets/pillow-center.ext` and `assets/poses/pose-01.ext` … `pose-20.ext` with your supplied images, then reload the page.
- Keep visuals flat/pastel for consistency; square-ish 200–320 px assets fit best in the clock.

## Run
Double-click `index.html` or serve locally (`python -m http.server`) to avoid CORS warnings on some browsers.
