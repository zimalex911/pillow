# Pillow story ring demo

Quick, vertical-friendly mini experience to showcase pillow use cases. Open `index.html` in any browser to run it.

## What you get
- 9:16 stage with the pillow in the center and up to 12 mini-scenes arranged like a clock.
- Tap/hover a scene to pull it into focus with copy and a soft spotlight.
- Optional auto-demo loop for hands-free recording of smooth transitions.

## Swap in your assets
- Replace `assets/pillow.svg` with your provided `{{путь_к_изображению_подушки}}`.
- In `script.js`, swap the `icon` fields or add `image` URLs in the `characters` array for `{{пути_к_изображениям_персонажей}}`.
- Keep visuals flat/pastel for consistency; square-ish 200–320 px assets fit best in the clock.

## Run
Double-click `index.html` or serve locally (`python -m http.server`) to avoid CORS warnings on some browsers.
