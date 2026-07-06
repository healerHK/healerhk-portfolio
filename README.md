# Thanh Y Nguyen / HealerHK Portfolio

A modern horizontal portfolio website for **Thanh Y Nguyen** (nickname **HealerHK**), inspired by product-tour storytelling patterns and knowledge-graph style interactions.

## Design direction

- Full-screen horizontal slide navigation instead of normal vertical scrolling.
- Mouse wheel, keyboard arrows, touch/trackpad horizontal scrolling and on-screen controls.
- Dark neon / glassmorphism visual style.
- Original pixel/Obsidian-inspired interactive linking graph on the Start slide.
- Compact project cards that fit inside the Projects slide.
- Toolbox cards with programming-language/tool logos and fallback badges.
- Contact form that posts to FormSubmit, plus clickable email, LinkedIn, GitHub and CV download links.

## Sections

1. Start / interactive graph hero
2. About / education, awards, hackathons, volunteer/community and interests
3. Projects
4. Toolbox
5. Connect / contact form and CV downloads

## Contact form

The form submits to:

```text
https://formsubmit.co/ynguyenhk@gmail.com
```

FormSubmit may require first-time email confirmation before forwarding messages.

## CV assets

- `public/cv/Thanh-Y-Nguyen-CV-2026.pdf`
- `public/cv/Thanh-Y-Nguyen-CV-2026.docx`

## Run locally

```bash
npm install
npm run dev
```

Open the URL printed by Vite, usually:

```text
http://localhost:5177
```

## Production build

```bash
npm run build
npm run preview
```

Preview URL:

```text
http://localhost:4177
```
