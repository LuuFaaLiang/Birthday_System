# 🎂 Happy Birthday Website

A single-page, interactive birthday surprise site — cake, gift, letter, gallery, wishes carousel, live countdown, music player, fireworks, and more. Pure HTML/CSS/JS, no build step, no backend.

## Run it

Just open `index.html` in a browser. That's it.

## Customize it

Everything personal lives at the top of **`script.js`**, in the `CONFIG` object:

```js
const CONFIG = {
  recipientName: "Sarah",       // the birthday person's name
  senderName: "Me",             // who it's from
  birthdayMonth: 6,             // for the live countdown
  birthdayDay: 21,
  subtitle: "...",              // hero subtitle
  letter: `...`,                // the letter text (typed out on the Letter section)
  wishes: [ "...", "..." ],     // wishes carousel + "Give Me Another Wish" button
  galleryCaptions: [ ... ],     // captions under each of the 6 photo slots
  galleryImages: [ "", "", "", "", "", "" ], // put image URLs or paths (assets/images/photo1.jpg) here
  musicSrc: "assets/music/happy-birthday.mp3"
};
```

Just edit these values — nothing else in the file needs to change.

## Add your own assets

- **Photos:** drop image files into `assets/images/` and set their paths/URLs in `galleryImages` in `CONFIG`. Leave an entry as `""` to keep the camera-emoji placeholder.
- **Music:** drop an MP3 into `assets/music/` and update `musicSrc` if you rename it. Autoplay is disabled by design — the visitor presses play.

## Change the colors

Color tokens are CSS variables at the top of `style.css`:

```css
:root{
  --pink: #ff7aa8;
  --purple: #7b4397;
  --gold: #ffd66b;
  --white: #fff9f5;
  --blue: #a7d8f0;
}
```

Change any of these and the whole site reskins.

## What's included

- Floating balloons, confetti, sparkles, hearts, twinkling stars, butterflies, flowers, bubbles, cursor sparkle trail
- Animated glowing name in the hero
- Cake with candles you can blow out (confetti + fireworks + smoke)
- Gift box that shakes open to reveal a message
- Envelope + letter with a typing animation
- 6-photo polaroid gallery with a click-to-enlarge lightbox
- Auto-advancing wishes carousel + "give me another wish" button
- Live countdown to the next birthday (auto-detects if it's already today)
- Music player with play/pause + volume, spinning icon while playing
- Canvas-based multi-color fireworks (on load, on "blow candles," and on demand)
- Light/dark celebration mode toggle
- Download the card as a PNG (loads `html2canvas` from a CDN on demand — needs internet)
- Copy-to-clipboard share button
- Fully responsive, keyboard-focus visible, and respects "reduce motion" settings

## Notes

- The download-as-image button pulls in `html2canvas` from cdnjs the first time it's used, so an internet connection is needed for that one feature. Everything else works fully offline.
- No photos or music are bundled (to keep the project lightweight and copyright-safe) — the gallery shows camera-emoji placeholders and the music button will simply do nothing audible until you add your own MP3.
