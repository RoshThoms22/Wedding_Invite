# Rosh & Jeni wedding invitation

The deployable site is in `dist/`. Wedding text, date, venue, link, and image paths are all at the top of `dist/script.js` inside the `INVITATION` object.

The family-page lines are editable through `groomFamily` and `brideFamily` in the same object. Replace them with parent names, residence, siblings, or other family details when supplied.

## Add the supplied media

Place optimized JPG or WebP files in `dist/assets/` using these names:

- `cover.jpg` — opening cover (portrait works best)
- `hero.jpg` — full-screen couple photo
- `portrait-1.jpg`, `portrait-2.jpg` — portrait story photos
- `gallery-1.jpg` through `gallery-9.jpg` — gallery
- `venue.jpg` — church or venue photo
- `beautiful-in-white.mp3` — licensed background music file

If you prefer different filenames, change the paths in `dist/script.js`. The premiere edition expects a legally obtained copy of “Beautiful in White” at `dist/assets/beautiful-in-white.mp3`; the recording is not included in the repository. Add the couple's WhatsApp number (country code plus digits, without `+`) to `whatsappNumber` in `dist/script.js` so RSVP messages go directly to them. Until then, visitors choose a WhatsApp recipient themselves.

The cinematic styling lives in `dist/cinema.css`; the base layout is in `dist/styles.css`. Photos that have not been added display decorative artwork. They are never represented as real couple photos.

Scroll transitions live in `dist/flow.css` and `dist/flow.js`: the opening scene holds as the invitation rises into view, section backgrounds blend, and reveals follow native scrolling in both directions. Reduced-motion settings disable the pinned scene and scroll effects. Short screens use a regular flowing layout so all content remains accessible.

The botanical stationery layer is in `dist/botanical.css` and `dist/botanical.js`. It adds the sealed-envelope cover, continuous emerald-and-champagne artwork, glass stationery cards, drifting petals, and swipeable gallery stack. The generated background is `dist/assets/botanical-emerald.jpg`; it is decorative artwork, not a couple photo.

Production: https://roshthoms22.github.io/Wedding_Invite/

Deployment uses the `gh-pages` branch, generated from `dist/` with `git subtree split --prefix dist --branch gh-pages`. Push both `main` and `gh-pages` after edits.

The WhatsApp/link-sharing preview is `dist/assets/og-preview.png`. Its absolute production URL is set in `dist/index.html`.
