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

If you prefer different filenames, change only the `photos` paths in `dist/script.js` and the `<source>` path near the end of `dist/index.html`.

The WhatsApp/link-sharing preview is `dist/assets/og-preview.png`. Its absolute production URL is set in `dist/index.html`.
