# Rosh & Jeni — Wedding Invitation Website

A responsive, single-page Kerala-inspired wedding invitation website for **Saturday, 2 January 2027**.

## Preview locally

Open `index.html` in a modern browser, or run `python -m http.server 8000` inside this folder and visit `http://localhost:8000`.

## Publish for free on GitHub Pages

1. Sign in to GitHub and create a **public** repository, e.g. `rosh-jeni-wedding`.
2. Upload `index.html`, `styles.css`, `script.js`, and the `assets` folder to the **root** of the repository. Commit the files to the `main` branch.
3. Open repository **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, branch **main**, folder **/(root)**, then click **Save**.
5. Wait for deployment. Your website will appear at `https://YOUR-USERNAME.github.io/rosh-jeni-wedding/`.
6. Open the link on a phone and share it on WhatsApp. GitHub Pages publishes your site publicly; don't add private data.

## Personalise before sharing

- **Photos:** Put photos in `assets/` and replace the placeholder blocks in `index.html` with `<img src="assets/couple.jpg" alt="Rosh and Jeni" />`. Style the images with `width:100%;height:100%;object-fit:cover;` as needed. Use compressed WebP/JPEG photos.
- **Church / reception:** Edit the `#events` cards in `index.html` with real venue names and ceremony times. Replace the two Google Maps `href` URLs with each venue's actual Maps share link.
- **Family:** Replace the placeholder text in `#family` with the correct names.
- **Countdown:** The countdown currently targets **midnight IST on 2 Jan 2027**, not the actual ceremony time. Change `WEDDING_ISO` in `script.js` when the time is confirmed (example: `2027-01-02T10:30:00+05:30`).
- **Calendar:** The calendar button currently adds an **all-day event** for 2 Jan 2027. Update the calendar URL logic if you want an exact time and location.
- **Guest wishes:** Currently saved using **localStorage on each visitor's own device only**. Wishes do NOT sync between guests and cannot be viewed by the couple across devices. For a real shared guestbook, connect a database/service (e.g. Firebase or Supabase) and add spam protection/moderation. Never expose secret service keys in frontend files.
- **Welcome:** The invitation opens with a welcome overlay and remembers the opening for the current tab session.
- **Music:** Not included by default; if added, make it optional and user-initiated.

## Files

- `index.html` — content and sections
- `styles.css` — responsive styling and animation
- `script.js` — countdown, navigation, local demo wishes, sharing, calendar
- `assets/` — your future photographs

No build tools or paid hosting required.
