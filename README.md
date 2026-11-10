# EasyRail

A mobile-first train ticket booking prototype built with React, Vite, and Tailwind CSS v4.

> **Design Note:** The visual design (Material 3 blue/emerald palette, *Atkinson Hyperlegible Next* typography, Material Symbols icons, and Indian Railways layout structure) was generated in Stitch and then implemented in React with accessibility fixes applied (390px single-column responsive layout, ≥ 48×48px tap targets, ≥ 18px base font size with nothing below 16px, WCAG AA+ contrast overrides, icon + text status badges, and inline error banners instead of browser alerts).

## Problem

Mobile ticket booking apps frequently interrupt users with full-screen, text-heavy pop-ups (for cancellation rules, fare notices, and terms) that hide the page behind dense legal text and offer only a tiny, low-contrast `x` icon to dismiss. Elderly and non-expert users get stuck, feel anxious about tapping the wrong thing, and abandon their booking.

## Target User

**Debopriya**, a retiree who wants to book train tickets independently on her phone. She needs large readable text, plain language without jargon, forgiving tap targets, and calm confirmation cues so she never feels trapped by a screen.

## Design Decisions

- **Large, labelled Close button (`≥ 48×48px`) + full-width "Got it" button**: Placing a high-contrast `Close` button with visible text at the top right removes the guesswork of hunting for a faint `x` icon. Adding a full-width `Got it` button at the bottom keeps dismissal comfortably within thumb reach.
- **Bottom sheet instead of a full-screen blocker**: Keeping the dimmed page visible behind a rounded bottom sheet shows Debopriya she has not lost her booking progress. Supporting tap-outside, swipe-down, and `Esc` dismissal—alongside a short 3-bullet summary and an optional `Read more` expander—gives immediate answers without overwhelming walls of text.
- **Global Before / After toggle in the header**: Switching between `Before` (full-screen wall of dense text and tiny low-contrast `x`) and `After` (accessible bottom sheet with focus trap, ARIA dialog attributes, and focus return) lets evaluators directly experience the contrast between the original barrier and the fix.
- **Base font `≥ 18px` with `A- / A+` header controls & WCAG AA+ contrast**: Enlarging the root font size cleanly (`18px`, `20px`, `22px`) while maintaining deep rail blue (`#0F4C81`) and dark slate typography keeps every label legible on a 390px phone screen.
- **Always-visible labelled Back button & Step progress (`Step X of 4`)**: Pinning a labelled `Back` button and clear step counter in the top bar prevents disorientation during the 4-step booking flow.
- **Inline banners instead of error pop-ups**: Form errors and helpful reminders appear inline in context rather than spawning extra interrupting dialogs.
- **Persistent 1-tap "Help / Raise a dispute" button & Financial aid tracker (`/aid`)**: Keeps human support, one-tap dispute reporting, and a 3-step visual financial aid tracker (`Applied → Verified → Paid`) reachable at any moment without nested menus.

## Running Locally

```bash
npm install
npm run dev
```

