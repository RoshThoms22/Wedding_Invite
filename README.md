# Rosh & Jeni wedding invitation

The deployable site is in `dist/`. Wedding text, date, venue, link, and image paths are all at the top of `dist/script.js` inside the `INVITATION` object.

The family-page parent names and addresses are editable through `groomParents`, `brideParents`, `groomAddress`, and `brideAddress` in the same object.

## Add the supplied media

Place optimized JPG or WebP files in `dist/assets/` using these names:

- `cover.jpg` — opening cover (portrait works best)
- `hero.jpg` — full-screen couple photo
- `portrait-1.jpg`, `portrait-2.jpg` — portrait story photos
- `gallery-1.jpg` and `gallery-2.jpg` — swipe gallery
- `venue.jpg` — church or venue photo
- `alex-morgan-wedding-instrumental-vow-exchange-578502.mp3` — current background music file

If you prefer different filenames, change the paths in `dist/script.js`. Add the couple's WhatsApp number (country code plus digits, without `+`) to `whatsappNumber` in `dist/script.js` so RSVP messages go directly to them. Until then, visitors choose a WhatsApp recipient themselves.

The cinematic styling lives in `dist/cinema.css`; the base layout is in `dist/styles.css`. Photos that have not been added display decorative artwork. They are never represented as real couple photos.

Scroll transitions live in `dist/flow.css` and `dist/flow.js`: the opening scene holds as the invitation rises into view, section backgrounds blend, and reveals follow native scrolling in both directions. Reduced-motion settings disable the pinned scene and scroll effects. Short screens use a regular flowing layout so all content remains accessible.

The botanical stationery layer is in `dist/botanical.css` and `dist/botanical.js`. It adds the sealed-envelope cover, continuous emerald-and-champagne artwork, glass stationery cards, drifting petals, and swipeable gallery stack. The generated background is `dist/assets/botanical-emerald.jpg`; it is decorative artwork, not a couple photo.

The final warm color and alignment overrides are in `dist/warm.css`: all primary chapters share one centered content rail, using oxblood, mahogany, champagne gold, and warm ivory.

The wishes wall currently uses browser-local storage because GitHub Pages has no database. Wishes remain visible on the device that submitted them. Connect a shared backend before describing them as public across all visitors.

Production: https://roshthoms22.github.io/Wedding_Invite/

Deployment uses the `gh-pages` branch, generated from `dist/` with `git subtree split --prefix dist --branch gh-pages`. Push both `main` and `gh-pages` after edits.

The WhatsApp/link-sharing preview is `dist/assets/og-preview.png`. Its absolute production URL is set in `dist/index.html`.
