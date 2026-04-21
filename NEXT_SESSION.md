# Plopbox Website — Next AI Session Instructions

## What Has Been Built So Far
A professional portfolio website live at **https://plopbox.io** hosted on GitHub Pages.
Repo: **https://github.com/Plopbox/Plopbox**
Files: `index.html`, `style.css`, `script.js`, `CNAME`

---

## Design Style — DO NOT CHANGE
- Dark background: `#06060f`
- Primary accent: `#00d4ff` (cyan)
- Secondary accent: `#a855f7` (purple)
- Font: Inter + JetBrains Mono
- Glassmorphism cards with `rgba(255,255,255,.035)` background
- Custom cursor (glowing cyan ring + dot)
- Particle canvas on hero (neural network / constellation effect)
- AOS scroll animations (`https://unpkg.com/aos@2.3.1`)
- The owner LOVES the current style — keep it

---

## Owner Profile — Fadi Helal
- **Title:** System Validation Engineer / SDET
- **Location:** Espoo, Finland
- **Email:** Fadi.helal@pm.me
- **Phone:** +358 45 803 4097
- **LinkedIn:** https://www.linkedin.com/in/fadi-helal
- **GitHub:** https://github.com/Plopbox
- **Domain:** https://plopbox.io

### Skills
- Languages: C++, Python, C#, Matlab, JavaScript
- System Validation, Hardware-in-the-Loop, Pytest, CI/CD
- Robotics (Visual Components), Kinematics, Simulation
- ML: PyTorch, TensorFlow, Scikit-Learn, Pandas
- IoT: MQTT, Arduino, Raspberry Pi, Node-RED, Docker
- Cloud: Azure, AWS

### Experience
1. **Visual Components** — Test Developer (Apr 2023–Present) + Testing Engineer Robotics & Connectivity (May 2022–Apr 2023) — Espoo, Finland
2. **Upwork Freelance** — ML Engineer (Feb–May 2022) + IoT Developer (Aug 2020–Feb 2022) — Remote

### Education
- MEng Robotics & Automation — JAMK (2022–2024)
- BASc Information Technology — JAMK (2022–2024)
- Bachelor Mechatronics & Cybernetics — PFUR Moscow (2008–2013)

### Certifications (all clickable with links)
- Software Engineer — https://www.hackerrank.com/certificates/iframe/e40cfc2ec65c
- C# Masterclass — https://www.udemy.com/certificate/UC-cb70b05c-41e3-40a0-a99c-3310fed3f3bf/
- C++ 20 Masterclass — https://www.udemy.com/certificate/UC-cd9a662e-6d72-4f9a-aa08-c20ecafaa59a/
- Modern Python 3 Bootcamp — https://www.udemy.com/certificate/UC-7OIXIBMW/
- Programming with JavaScript — https://www.coursera.org/account/accomplishments/verify/AQWMTC4TBDVC

---

## What Needs To Be Built Next — PRIORITY TASK

### 1. SVG Logo — "Plopbox"
- Isometric 3D cube shape (the "box" in Plopbox)
- Gradient stroke: cyan `#00d4ff` → purple `#a855f7`
- Subtle fill on each face (very low opacity)
- Animated glow pulse on the logo
- Used inline in the `<nav>` replacing the plain "FH." text
- Also used in footer
- Should work at 32px (nav) and 48px (footer) sizes

### 2. Services Section (`#services`)
Add BEFORE the About section. 8 service cards with **vanilla-tilt 3D hover effect**
CDN: `https://unpkg.com/vanilla-tilt@1.8.1/dist/vanilla-tilt.min.js`
Each card has: icon, title, description, feature bullets, CTA button "Get Quote" → mailto

Services to include:
| # | Title | Icon |
|---|-------|------|
| 1 | Custom Test Automation Frameworks | `fa-vial` |
| 2 | CI/CD Pipeline Automation | `fa-code-branch` |
| 3 | IoT Solutions & Integration | `fa-microchip` |
| 4 | Automation Tools & Scripts | `fa-terminal` |
| 5 | Robot Programming & Validation | `fa-robot` |
| 6 | 3D Design & Modeling | `fa-cube` |
| 7 | Plugin & Extension Development | `fa-puzzle-piece` |
| 8 | Technical Consulting | `fa-comments` |

### 3. Store Section (`#store`)
Add AFTER Services. 4 digital product cards.
Use "Inquire" → mailto for now (Gumroad integration later)
Products:
1. Web Testing Framework Starter (Playwright + pytest)
2. CI/CD Pipeline Blueprints (GitHub Actions templates)
3. IoT Automation Toolkit (MQTT + sensor scripts)
4. Mobile Testing Suite (Appium + pytest)

Each card: badge (e.g. "Digital Product"), title, description, price tag "From €49" or "Custom Quote", CTA button

### 4. Gaming Section (`#gaming`)
Add AFTER Education section. 
- Section heading: "Also a Creator" / "PlopBox Gaming"
- Description: gaming channel — chaos moments, funny clips, random encounters
- 4 platform cards (each links to channel):
  - YouTube: https://www.youtube.com/@PlopBoxx
  - TikTok: https://www.tiktok.com/@plopbox
  - Twitch: https://www.twitch.tv/plopbox
  - Instagram: https://www.instagram.com/plopboxx/
- YouTube subscribe button
- Slightly warmer/more energetic feel — can use orange accent `#f97316` for gaming section only
- Keep dark background but add more glow/energy

### 5. Scroll Progress Bar
- Thin (~3px) glowing line at the very top of the page
- Fills left to right as user scrolls
- Gradient: cyan → purple
- CSS: `position:fixed; top:0; left:0; z-index:9999`
- JS: update `width` on scroll event

### 6. Nav Updates
New nav order: `Services | Store | About | Gaming | Contact`
Replace plain "FH." logo text with the SVG logo + "Plopbox." text

### 7. Footer Updates
Add all 6 social links:
- LinkedIn: https://www.linkedin.com/in/fadi-helal
- GitHub: https://github.com/Plopbox
- YouTube: https://www.youtube.com/@PlopBoxx
- TikTok: https://www.tiktok.com/@plopbox
- Twitch: https://www.twitch.tv/plopbox
- Instagram: https://www.instagram.com/plopboxx/
- Email: Fadi.helal@pm.me

---

## Current Page Sections (in order)
1. Hero
2. About
3. Experience
4. Skills
5. Soft Skills
6. Education + Certifications
7. Contact
8. Footer

## Target Page Sections (in order)
1. Hero (keep, update typed phrases)
2. **Services** ← NEW
3. **Store** ← NEW
4. About (keep)
5. Experience (keep)
6. Skills (keep)
7. Soft Skills (keep)
8. Education + Certifications (keep)
9. **Gaming** ← NEW
10. Contact (keep)
11. Footer (update socials)

---

## Tech Stack Constraints
- **Static site only** — GitHub Pages, no backend, no Node.js
- All features must work with vanilla HTML/CSS/JS + CDN libraries
- CDNs already in use: Google Fonts, Font Awesome 6.5, AOS 2.3.1
- CDN to ADD: vanilla-tilt 1.8.1
- Contact form: Formspree (action URL has placeholder `YOUR_FORM_ID` — not yet replaced)
- No build tools, no npm, no frameworks

## Fancy Effects Allowed on GitHub Pages
- CSS animations & keyframes (unlimited)
- Canvas API (particle network already built)
- Intersection Observer (skill bars, counters already built)
- vanilla-tilt.js (3D card tilt) — ADD THIS
- AOS scroll animations (already in use)
- CSS custom properties & gradients
- Glassmorphism (backdrop-filter: blur)
- CSS clip-path animations
- Web Animations API
- CSS scroll-driven animations (modern browsers)

---

## Git Workflow
```bash
cd C:\dev\Plopbox
git add index.html style.css script.js
git commit -m "your message"
git push origin main
```
Site updates at https://plopbox.io within ~60 seconds after push.
DO NOT commit: Profile.pdf (in .gitignore)

---

## DNS — plopbox.io (Freename)
Fully configured and working. DO NOT touch DNS.
- 4x GitHub Pages A records (185.199.108-111.153)
- www CNAME → plopbox.github.io
- ProtonMail MX + TXT records (email working)
- HTTPS enforced via GitHub Pages

---

## Personality / Brand Duality
Fadi has TWO identities on this site:
1. **Professional:** System Validation Engineer, robotics, ML, IoT, serious tech
2. **Creator:** PlopBox gaming channel, funny content, chaos moments, personality

The website should reflect BOTH — professional sections use cyan/purple cool palette,
gaming section can use warmer orange energy. Same dark base throughout.

---

## Previous Session Summary
This session accomplished:
- Built complete portfolio from LinkedIn PDF (Profile.pdf)
- Dark theme, particle canvas, custom cursor, typed effect, AOS animations
- All sections: Hero, About, Experience, Skills, Soft Skills, Education, Certifications, Contact
- Connected custom domain plopbox.io with GitHub Pages HTTPS
- Resolved DNS conflicts (removed AWS parking IP 3.72.57.92)
- Added security headers (CSP, X-Frame-Options, HSTS, Referrer-Policy)
- Added Open Graph tags for LinkedIn/social previews
- Resolved git merge conflicts and pushed cleanly
- Added PDF to .gitignore
