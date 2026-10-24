# English copy, version 1

> Natural English, not word-for-word. Mirrors `projekti-nacrt.md` (v3) and `tekstovi-nacrt.md`.
> Proper names stay as they are (Autoservis Tole, FTN Čačak, Priboj). Serbian-only details are explained
> in place (e.g. 194 is the Serbian emergency number).

---

## Hero

- Eyebrow: VELJKO VASOJEVIĆ
- Headline: **I turn ideas into finished, polished [web apps / websites / AI tools].**
- Subline: From sketch and design, through code and database, to launch. Finished means it works on your phone too; polished means every detail shows.
- Buttons: **See the work →** · **Copy email**

## Charged sentence (between hero and showreel)

Every detail is a decision, not an accident.

## Marquee

WEBSITES ✦ WEB APPS ✦ AI TOOLS ✦

---

## Work

Section title: **Selected work**
Popup headings: **Why** · **My role** · **How it was built** · **Stack**

### 01 · Autoservis Tole
- One line: A repair-shop app the owner uses every day.
- Tags: Client · In daily use · 2026
- Header: Private app, shown on video

**Why**
A friend runs a small car repair shop with his father. Repairs, unpaid bills and parts went into a notebook. They needed something that works on a phone, in the workshop, often with greasy hands, and with as little typing as possible.

**My role**
The whole project: talking to the owner, a phased spec, a mockup in Claude Design, the build with Claude Code and the deploy on Vercel. Two days from the first phase to an app in daily use.

**How it was built**
- Made for the workshop: big buttons, frequent repairs in one tap with a preset price, and suggestions from earlier entries, so there is little to type.
- Installs on the phone like a real app (PWA), no app store needed.
- Deliberately no automation that would confuse: adding a part to a repair doesn't remove it from stock, and a courier parcel doesn't change inventory. The owner stays in control.
- Sensitive actions (deleting repairs, frequent repairs, categories) are protected by an admin PIN checked in the database itself, not just in the app. The PIN is hashed and locks for 5 minutes after 5 wrong tries.
- Exports: a PDF financial report for any period and an Excel file of the full repair history.

**Stack:** Next.js · TypeScript · Supabase · Tailwind CSS · PWA · Vercel

### 02 · Fanout AI
- One line: One idea, five finished pieces at once.
- Tags: Personal project · Live · 2026
- Links: Open site ↗ · GitHub ↗ · Case study ↗

**Why**
Anyone who writes for an audience writes the same idea five times: for a blog, LinkedIn, Instagram, a newsletter and X, and every format has its own rules. Fanout writes all five from one idea at once, in English or Serbian, then helps you edit, save and schedule them.

**My role**
Solo, with Claude Code: a ten-phase spec, the design, the architecture and every decision, recorded in a decision log. After each phase I checked the tests and the build before the next one started.

**How it was built**
- The demo works with no sign-up and no cost: "Sample mode" streams pre-written content through the same path as the real AI, clearly labelled. There are 30 such samples (3 topics × 2 languages × 5 formats).
- Quotas (how many generations each plan gets) are checked in the database in a single transaction, so two requests at the same moment can't exceed the limit.
- Five pieces stream in parallel; updates are batched and drawn once per frame so the interface stays smooth.
- Scheduled posts go to email and Discord through n8n, with signed requests in both directions.
- Runs for $0: Vercel Hobby, Supabase Free, Stripe in test mode, and GitHub Actions keeps the database awake every 5 minutes.
- Accessibility is checked automatically (axe) on every screen, in both languages.

**Stack:** Next.js · TypeScript · Supabase · Claude API · Stripe (test) · n8n · Tailwind CSS · Playwright

### 03 · Relay AI
- One line: A support chatbot that answers from your FAQ and calls a human when it gets stuck.
- Tags: Personal project · Live · 2026
- Links: Open site ↗ · Demo store ↗ · GitHub ↗

**Why**
Small online shops get the same questions over and over (delivery, returns, where's my order) and nobody to answer them around the clock. With Relay, the owner writes an FAQ and pastes one line of code on the site. Visitors get an instant answer with its source, and when the bot doesn't know, the chat moves to the owner, live.

**My role**
Solo, with Claude Code: spec, design (deliberately light and warm, unlike Fanout), architecture and decisions. I built the n8n workflows by hand, step by step, following a workbook I wrote.

**How it was built**
- A 13 KB widget in a Shadow DOM: one `<script>` line that doesn't break the look of the site it sits on.
- The bot doesn't make things up: it returns the exact text of the matching FAQ answer and shows its source. Search understands what a question means, not just matching words.
- Live handoff to a human over Supabase Realtime, with a fallback when the network blocks sockets.
- n8n actions (order status, opening a ticket, emails) only run after the visitor confirms, and every request is signed, so n8n only accepts messages that really come from the app.
- Honest about limits: Serbian search is weaker because the model is English, so it is stricter and offers suggestions instead of guessing.
- A real AI conversation (Live mode) was left out on purpose: the project has to cost nothing, and everything else works without it.

**Stack:** Next.js · TypeScript · Supabase (pgvector, Realtime) · n8n · Stripe (test) · Tailwind CSS

### 04 · CineSpire
- One line: A social network for films and series, in the spirit of Letterboxd.
- Tags: Team project · University · 2026
- Links: GitHub ↗ (runs locally, shown on video)

**Why**
A team project for the Web Programming course: a place where film and series fans rate and review, build their own lists, keep a watchlist and follow what others are watching.

**My role**
A team of three, split by MVC layer. I built the **Controller layer**, the whole application logic: from reviews and lists to the admin panel and importing data from TMDB.

**How it was built**
- The admin types a film or series title and the details (overview, year, poster…) fill in from TMDB; the admin can adjust them before saving.
- Reviews with ratings and likes; the average rating is recalculated after every new, edited or deleted review.
- Following other users, a watchlist, recently viewed and personal lists of films and series.
- Search and genre filters, with pagination.
- An admin panel behind its own middleware: films, series, genres, users and review moderation.

**Stack:** Laravel · PHP · MySQL · Blade · Tailwind CSS · Alpine.js

### 05 · SeniorGuard
- One line: A wearable and an app that alert the family when an older relative needs help.
- Tags: Bachelor's thesis · IoT + Android · 2026
- Links: Watch the system video · GitHub ↗

**Why**
More than a fifth of Serbia's population is over 65 (2022 census), and many live alone. The problem isn't only the fall, it's that nobody finds out right away. Commercial solutions are closed, expensive or can't be adapted. SeniorGuard was my own idea for my thesis: a prototype that shows the whole path of information, from the sensor to a family member's phone.

**My role**
The whole system, on my own: the idea, choosing the platform and components, the wiring diagram, a 3D-printed case, firmware, database, Android app and design (interactive prototype and logo).

**How it was built**
- Worn on the upper arm: an ESP32 with sensors for pulse and blood oxygen (MAX30102), temperature (DS18B20), movement and falls (MPU-6050) and GPS, plus an SOS button you can find without looking and a vibration motor for feedback.
- Choosing the platform: an Arduino Nano has no network and not enough memory for an encrypted connection to Firebase, and a BLE sensor (CC2650) needs a phone in the middle. The ESP32 has built-in Wi-Fi, so the device sends data on its own.
- Falls are detected on the device itself (total acceleration above 2.5 g), because that decision is time-critical; the cloud only carries data to the app.
- The firmware recovers by itself: it reconnects when Wi-Fi drops and restarts on a schedule.
- An Android app in Kotlin with five tabs (status, map, vitals, alarms, family and settings). Data updates live, and a background service shows every new alarm full screen, with "I've seen it, going to check" and "Call emergency services (194)".
- Four alarm types: SOS, fall, missed morning check-in and long inactivity. The map uses OpenStreetMap, and the status can be exported as a PDF report.

**Stack:** ESP32 · Arduino (C++) · Firebase Realtime Database · Kotlin · Android · OpenStreetMap · 3D printing

---

## Websites for businesses

**Title:** Need a website?
**Text:** I built a few websites on my own initiative, as demos, to show what they could look like. Nobody ordered them, but they were made as if someone had.
- Đak Food Store, Čačak · self-initiated demo · Open site ↗
- Portfolio, Borivoje Vasojević · personal portfolio · Open site ↗
- Webflow work · 5 earlier sites built in Webflow · Open ↗

---

## About

> I'm Veljko. I graduated in Computer and Software Engineering at the Faculty of Technical Sciences in Čačak and I'm now doing a master's in the same field.
>
> I build three kinds of things. **Custom web apps:** from internal tools for a single business to complete SaaS products with accounts, payments and a database. **Websites** for businesses that want to make an impression, not just exist online. And **AI tools** that take over repetitive work, from writing content to answering customers.
>
> I do it all end to end: design, code, database and launch. Away from the screen I follow tennis and football, and I split my free time between online courses and friends. Friends usually win.

**Card, back side**
- VV mark
- Veljko Vasojević
- Graduate Engineer in Electrical and Computer Engineering
- FTN Čačak · master's in progress
- Priboj, Serbia
- ● Open to collaboration
- Ring: OPEN TO WORK •

## How I work

**Title:** AI is my tool, not my replacement.

1. **First, I define.** Every project starts with a conversation and a written, phased spec: what we're building, for whom, and what's out of scope.
2. **Then I build, phase by phase.** I write code with an AI assistant (Claude Code). I own the architecture, the decisions and what matters to the user; after each phase I check and test before moving on.
3. **And I ship.** Deploy, testing on a real phone, fixes. A project is done when someone uses it, not when the build passes.

**Skills, honestly split**
- **On my own:** HTML, CSS, JavaScript · GSAP · Webflow · Git and GitHub · SQL / MySQL · Laravel / PHP · Java · Kotlin and Android · ESP32 / Arduino
- **With an AI assistant:** React · Next.js · TypeScript · Node.js · Supabase · Stripe · n8n

---

## Contact and footer

- **Call to action:** Got an idea or a job for me? Let's talk.
- **Email:** veljkovasojevic03@gmail.com + "Copy"
- **Columns:** Contact (Email, LinkedIn ↗) · Work (GitHub ↗, Webflow work ↗)
- (Language column and "Source code of this site ↗" removed on 2026-10-24; language is in the menu.)
- **Giant name:** VASOJEVIĆ
- **Bottom row:** © 2026 Veljko Vasojević · Back to top ↑

## Navigation

Work · About · Contact · SR/EN · button "Get in touch"
