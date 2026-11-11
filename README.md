# Rosh & Jeni wedding invitation

The deployable site is in `dist/`. Wedding text, date, venue, link, and image paths are all at the top of `dist/script.js` inside the `INVITATION` object.

## Add the supplied media

Place optimized JPG or WebP files in `dist/assets/` using these names:

- `cover.jpg` — opening cover (portrait works best)
- `hero.jpg` — full-screen couple photo
- `portrait-1.jpg`, `portrait-2.jpg` — portrait story photos
- `gallery-1.jpg` through `gallery-4.jpg` — gallery
- `venue.jpg` — church or venue photo
- `music.mp3` — background music

If you prefer different filenames, change the `photos` paths in `dist/script.js`. To enable background music after adding the file, set `music: "assets/music.mp3"` in the same configuration. Until then, the music control stays hidden.

The cinematic styling lives in `dist/cinema.css`; the base layout is in `dist/styles.css`. Photos that have not been added display decorative artwork. They are never represented as real couple photos.

Scroll transitions live in `dist/flow.css` and `dist/flow.js`: the opening scene holds as the invitation rises into view, section backgrounds blend, and reveals follow native scrolling in both directions. Reduced-motion settings disable the pinned scene and scroll effects. Short screens use a regular flowing layout so all content remains accessible.

Production: https://roshthoms22.github.io/Wedding_Invite/

Deployment uses the `gh-pages` branch, generated from `dist/` with `git subtree split --prefix dist --branch gh-pages`. Push both `main` and `gh-pages` after edits.

The WhatsApp/link-sharing preview is `dist/assets/og-preview.png`. Its absolute production URL is set in `dist/index.html`.
