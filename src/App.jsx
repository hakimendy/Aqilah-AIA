import { useState } from "react";

/*
  DESIGN PLAN
  -----------
  Subject: Siti Aqilah — personal AIA insurance agent. Audience: families, young professionals,
  SME owners in Brunei. Page's single job: earn trust and book a consultation.

  Palette (warm authority, not cold finance):
    Crimson   #C8102E  — AIA red, used with restraint as the accent
    Charcoal  #1A1A2E  — deep headings
    Slate     #4A5568  — body text
    Blush     #FFF5F5  — warm section backgrounds
    Ivory     #FFFDF9  — page base
    Gold      #C9973A  — premium highlight on stats/awards

  Type:
    Display  — Playfair Display (serif, warmth + authority; insurance = long-term trust)
    Body     — DM Sans (clean, readable, approachable)
    Utility  — DM Mono (for stats/numbers only)

  Signature element: A "Life Moments" timeline in the hero — a horizontal scroll of illustrated
  life stages (Graduate → Married → New Baby → Home → Retirement) each with a shield icon,
  showing exactly *when* insurance matters. This makes the value proposition visceral and personal
  rather than abstract.

  Layout: Light background (ivory), clean sections, generous whitespace, red used only for
  accents/CTAs — professional yet warm. NOT dark/techy.
*/

const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }

    body {
      background: #FFFDF9;
      color: #1A1A2E;
      font-family: 'DM Sans', sans-serif;
      line-height: 1.65;
      overflow-x: hidden;
    }

    /* ── NAV ── */
    .nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      background: rgba(255,253,249,0.94);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(200,16,46,0.08);
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 6%; height: 70px;
    }
    .nav-logo {
      display: flex; align-items: center; gap: 10px;
    }
    .nav-logo-aia {
      background: #C8102E; color: #fff;
      font-family: 'DM Mono', monospace; font-size: 0.8rem; font-weight: 500;
      letter-spacing: 0.1em; padding: 4px 8px; border-radius: 4px;
    }
    .nav-logo-name {
      font-family: 'Playfair Display', serif;
      font-size: 1.05rem; font-weight: 600; color: #1A1A2E;
    }
    .nav-links { display: flex; gap: 2.25rem; list-style: none; }
    .nav-links a {
      font-size: 0.875rem; font-weight: 500; color: #4A5568;
      text-decoration: none; transition: color 0.2s;
    }
    .nav-links a:hover { color: #C8102E; }
    .nav-cta {
      background: #C8102E; color: #fff; border: none; border-radius: 8px;
      padding: 0.55rem 1.35rem; font-size: 0.875rem; font-weight: 600;
      font-family: 'DM Sans', sans-serif; cursor: pointer; transition: background 0.2s, transform 0.15s;
    }
    .nav-cta:hover { background: #a50d27; transform: translateY(-1px); }
    .nav-hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; border: none; background: none; padding: 4px; }
    .nav-hamburger span { width: 22px; height: 2px; background: #1A1A2E; border-radius: 2px; display: block; }

    /* ── HERO ── */
    .hero {
      min-height: 100vh;
      padding: 100px 6% 60px;
      display: flex; flex-direction: column; justify-content: center;
      position: relative; overflow: hidden;
    }
    .hero-bg-shape {
      position: absolute; top: -120px; right: -200px;
      width: 700px; height: 700px;
      background: radial-gradient(ellipse, rgba(200,16,46,0.06) 0%, transparent 65%);
      border-radius: 50%; pointer-events: none;
    }
    .hero-bg-shape2 {
      position: absolute; bottom: -80px; left: -150px;
      width: 500px; height: 400px;
      background: radial-gradient(ellipse, rgba(201,151,58,0.06) 0%, transparent 65%);
      border-radius: 50%; pointer-events: none;
    }
    .hero-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; position: relative; z-index: 1; }
    
    .hero-eyebrow {
      display: inline-flex; align-items: center; gap: 8px;
      font-size: 0.78rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
      color: #C8102E; margin-bottom: 1.25rem;
      font-family: 'DM Mono', monospace;
    }
    .hero-eyebrow::before { content:''; width: 24px; height: 2px; background: #C8102E; border-radius: 2px; }
    
    .hero h1 {
      font-family: 'Playfair Display', serif;
      font-size: clamp(2.4rem, 4.5vw, 3.6rem);
      font-weight: 700; line-height: 1.15; letter-spacing: -0.01em;
      color: #1A1A2E; margin-bottom: 1.25rem;
    }
    .hero h1 em { font-style: italic; color: #C8102E; }
    .hero-sub {
      font-size: 1.05rem; color: #4A5568; line-height: 1.75;
      max-width: 480px; margin-bottom: 2.5rem;
    }
    .hero-actions { display: flex; flex-wrap: wrap; gap: 1rem; margin-bottom: 3rem; }
    
    .btn-red {
      background: #C8102E; color: #fff; border: none; border-radius: 9px;
      padding: 0.9rem 1.85rem; font-size: 0.95rem; font-weight: 600;
      font-family: 'DM Sans', sans-serif; cursor: pointer;
      transition: background 0.2s, transform 0.15s, box-shadow 0.15s;
      box-shadow: 0 4px 18px rgba(200,16,46,0.28);
      text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem;
    }
    .btn-red:hover { background: #a50d27; transform: translateY(-2px); box-shadow: 0 8px 28px rgba(200,16,46,0.35); }
    
    .btn-outline {
      background: transparent; color: #1A1A2E;
      border: 1.5px solid rgba(26,26,46,0.2); border-radius: 9px;
      padding: 0.9rem 1.85rem; font-size: 0.95rem; font-weight: 600;
      font-family: 'DM Sans', sans-serif; cursor: pointer;
      transition: border-color 0.2s, background 0.2s, transform 0.15s;
      text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem;
    }
    .btn-outline:hover { border-color: #C8102E; color: #C8102E; background: rgba(200,16,46,0.04); transform: translateY(-2px); }
    
    .btn-green {
      background: #25D366; color: #fff; border: none; border-radius: 9px;
      padding: 0.9rem 1.85rem; font-size: 0.95rem; font-weight: 600;
      font-family: 'DM Sans', sans-serif; cursor: pointer;
      box-shadow: 0 4px 18px rgba(37,211,102,0.25);
      transition: background 0.2s, transform 0.15s;
      text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem;
    }
    .btn-green:hover { background: #1db954; transform: translateY(-2px); }

    .hero-trust { display: flex; flex-wrap: wrap; gap: 1.5rem; }
    .hero-trust-item { display: flex; flex-direction: column; }
    .trust-num { font-family: 'DM Mono', monospace; font-size: 1.6rem; font-weight: 500; color: #C8102E; line-height: 1; }
    .trust-label { font-size: 0.78rem; color: #4A5568; margin-top: 2px; }

    /* ── LIFE MOMENTS (Signature) ── */
    .moments-strip {
      background: #1A1A2E; padding: 2.5rem 0; overflow: hidden;
    }
    .moments-label {
      text-align: center; font-family: 'DM Mono', monospace;
      font-size: 0.72rem; letter-spacing: 0.15em; text-transform: uppercase;
      color: rgba(255,255,255,0.4); margin-bottom: 1.75rem;
    }
    .moments-track {
      display: flex; align-items: center; justify-content: center;
      gap: 0; flex-wrap: wrap; padding: 0 6%;
    }
    .moment-item {
      display: flex; flex-direction: column; align-items: center;
      padding: 0 2.5rem; text-align: center; position: relative;
    }
    .moment-item:not(:last-child)::after {
      content: '→';
      position: absolute; right: -8px; top: 28px;
      color: rgba(200,16,46,0.5); font-size: 1.1rem;
    }
    .moment-icon {
      width: 56px; height: 56px; border-radius: 50%;
      background: rgba(200,16,46,0.15); border: 1.5px solid rgba(200,16,46,0.3);
      display: flex; align-items: center; justify-content: center;
      font-size: 1.4rem; margin-bottom: 0.75rem;
    }
    .moment-stage { font-size: 0.75rem; font-weight: 600; color: rgba(255,255,255,0.85); }
    .moment-need { font-size: 0.68rem; color: rgba(255,255,255,0.4); margin-top: 2px; }

    /* Hero portrait */
    .hero-portrait-wrap { position: relative; display: flex; justify-content: center; }
    .hero-portrait {
      width: 100%; max-width: 420px; aspect-ratio: 3/4;
      background: linear-gradient(160deg, #FFF0F0 0%, #FFF8E7 100%);
      border-radius: 24px; overflow: hidden;
      border: 1px solid rgba(200,16,46,0.1);
      display: flex; align-items: center; justify-content: center; flex-direction: column;
      gap: 0.5rem; color: #4A5568; font-size: 0.85rem; text-align: center;
      box-shadow: 0 24px 64px rgba(200,16,46,0.08), 0 4px 16px rgba(0,0,0,0.06);
      position: relative;
    }
    .portrait-badge {
      position: absolute; bottom: 1.5rem; left: 1.5rem; right: 1.5rem;
      background: rgba(255,253,249,0.95); backdrop-filter: blur(8px);
      border-radius: 12px; padding: 1rem 1.25rem;
      border: 1px solid rgba(200,16,46,0.12);
      box-shadow: 0 4px 16px rgba(0,0,0,0.08);
    }
    .badge-name { font-family: 'Playfair Display', serif; font-size: 1rem; font-weight: 700; }
    .badge-title { font-size: 0.75rem; color: #C8102E; font-weight: 600; margin-top: 2px; }
    .badge-aia { font-size: 0.7rem; color: #4A5568; margin-top: 2px; }
    .portrait-award {
      position: absolute; top: 1.5rem; right: 1.5rem;
      background: #C9973A; color: #fff; border-radius: 8px;
      padding: 0.4rem 0.75rem; font-size: 0.7rem; font-weight: 700;
      font-family: 'DM Mono', monospace; letter-spacing: 0.05em;
    }

    /* ── SECTIONS ── */
    .section { padding: 6rem 6%; }
    .section-blush { background: #FFF5F5; }
    .section-ivory { background: #FFFDF9; }
    .section-dark { background: #1A1A2E; }
    
    .eyebrow {
      font-family: 'DM Mono', monospace;
      font-size: 0.72rem; font-weight: 500; letter-spacing: 0.12em;
      text-transform: uppercase; color: #C8102E; margin-bottom: 0.75rem;
    }
    .section-title {
      font-family: 'Playfair Display', serif;
      font-size: clamp(1.8rem, 3.5vw, 2.6rem);
      font-weight: 700; line-height: 1.2; color: #1A1A2E;
      margin-bottom: 1rem;
    }
    .section-title em { font-style: italic; color: #C8102E; }
    .section-title.light { color: #fff; }
    .section-sub { font-size: 1rem; color: #4A5568; max-width: 560px; line-height: 1.75; }
    .section-sub.light { color: rgba(255,255,255,0.65); }

    /* ── ABOUT ── */
    .about-grid { display: grid; grid-template-columns: 1.1fr 1fr; gap: 5rem; align-items: start; margin-top: 4rem; }
    .about-body p { color: #4A5568; line-height: 1.8; margin-bottom: 1.25rem; }
    .about-body p strong { color: #1A1A2E; }
    .creds { display: flex; flex-direction: column; gap: 0.75rem; margin-top: 2rem; }
    .cred-item {
      display: flex; align-items: center; gap: 0.75rem;
      font-size: 0.875rem; color: #4A5568;
    }
    .cred-icon { font-size: 1.1rem; flex-shrink: 0; }
    .about-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: rgba(200,16,46,0.08); border-radius: 16px; overflow: hidden; border: 1px solid rgba(200,16,46,0.1); }
    .about-stat { background: #FFFDF9; padding: 1.75rem; }
    .about-stat:first-child { border-radius: 15px 0 0 0; }
    .about-stat:nth-child(2) { border-radius: 0 15px 0 0; }
    .about-stat:nth-child(3) { border-radius: 0 0 0 15px; }
    .about-stat:last-child { border-radius: 0 0 15px 0; }
    .stat-num { font-family: 'DM Mono', monospace; font-size: 2.2rem; font-weight: 500; color: #C8102E; line-height: 1; }
    .stat-label { font-size: 0.82rem; color: #4A5568; margin-top: 6px; }

    /* ── PRODUCTS ── */
    .products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; margin-top: 3.5rem; }
    .product-card {
      background: #fff; border: 1px solid rgba(200,16,46,0.1); border-radius: 16px;
      padding: 2rem; transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
      cursor: default;
    }
    .product-card:hover { border-color: rgba(200,16,46,0.35); transform: translateY(-4px); box-shadow: 0 16px 40px rgba(200,16,46,0.08); }
    .product-icon { font-size: 2rem; margin-bottom: 1.25rem; }
    .product-card h3 { font-family: 'Playfair Display', serif; font-size: 1.15rem; font-weight: 700; margin-bottom: 0.6rem; color: #1A1A2E; }
    .product-card p { font-size: 0.875rem; color: #4A5568; line-height: 1.7; margin-bottom: 1.25rem; }
    .product-features { display: flex; flex-direction: column; gap: 0.5rem; }
    .product-feature { display: flex; align-items: center; gap: 0.5rem; font-size: 0.82rem; color: #4A5568; }
    .pf-dot { width: 6px; height: 6px; border-radius: 50%; background: #C8102E; flex-shrink: 0; }

    /* ── WHY ME ── */
    .why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin-top: 3.5rem; }
    .why-card { text-align: center; padding: 2rem; }
    .why-num { font-family: 'DM Mono', monospace; font-size: 3rem; font-weight: 500; color: rgba(200,16,46,0.15); line-height: 1; margin-bottom: 0.75rem; }
    .why-card h3 { font-family: 'Playfair Display', serif; font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem; color: #1A1A2E; }
    .why-card p { font-size: 0.875rem; color: #4A5568; line-height: 1.7; }

    /* ── PROCESS ── */
    .process-list { display: flex; flex-direction: column; gap: 0; margin-top: 3.5rem; max-width: 700px; }
    .process-item { display: flex; gap: 2rem; padding-bottom: 2.5rem; position: relative; }
    .process-item:not(:last-child)::before {
      content: ''; position: absolute; left: 19px; top: 44px; bottom: 0;
      width: 2px; background: linear-gradient(to bottom, rgba(200,16,46,0.2), rgba(200,16,46,0.05));
    }
    .process-bullet {
      width: 40px; height: 40px; border-radius: 50%; flex-shrink: 0;
      background: #fff; border: 2px solid rgba(200,16,46,0.25);
      display: flex; align-items: center; justify-content: center;
      font-family: 'DM Mono', monospace; font-size: 0.78rem; font-weight: 500; color: #C8102E;
      position: relative; z-index: 1;
    }
    .process-body h3 { font-family: 'Playfair Display', serif; font-size: 1rem; font-weight: 700; color: #1A1A2E; margin-bottom: 0.35rem; }
    .process-body p { font-size: 0.875rem; color: #4A5568; line-height: 1.7; }

    /* ── TESTIMONIALS ── */
    .testimonials-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); gap: 1.5rem; margin-top: 3.5rem; }
    .testimonial-card {
      background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1);
      border-radius: 16px; padding: 2rem;
    }
    .t-stars { color: #C9973A; font-size: 0.85rem; letter-spacing: 1px; margin-bottom: 1rem; }
    .t-text { font-size: 0.875rem; color: rgba(255,255,255,0.75); line-height: 1.75; margin-bottom: 1.5rem; }
    .t-author { display: flex; align-items: center; gap: 0.75rem; }
    .t-avatar { width: 38px; height: 38px; border-radius: 50%; background: linear-gradient(135deg, #C8102E, #C9973A); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.85rem; color: #fff; flex-shrink: 0; }
    .t-name { font-weight: 600; font-size: 0.875rem; color: #fff; }
    .t-role { font-size: 0.75rem; color: rgba(255,255,255,0.45); }

    /* ── FAQ ── */
    .faq-wrap { max-width: 740px; margin: 3.5rem auto 0; display: flex; flex-direction: column; gap: 0.65rem; }
    .faq-item { border: 1px solid rgba(200,16,46,0.12); border-radius: 12px; overflow: hidden; background: #fff; }
    .faq-q { display: flex; justify-content: space-between; align-items: center; padding: 1.2rem 1.5rem; cursor: pointer; font-weight: 600; font-size: 0.925rem; font-family: 'DM Sans', sans-serif; transition: color 0.2s; }
    .faq-q:hover { color: #C8102E; }
    .faq-chevron { font-size: 0.75rem; transition: transform 0.3s; color: #C8102E; }
    .faq-chevron.open { transform: rotate(180deg); }
    .faq-a { padding: 0 1.5rem 1.2rem; font-size: 0.875rem; color: #4A5568; line-height: 1.75; }

    /* ── CONTACT ── */
    .contact-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 5rem; align-items: start; }
    .contact-left h2 { font-family: 'Playfair Display', serif; font-size: clamp(1.8rem,3vw,2.4rem); font-weight: 700; color: #1A1A2E; margin-bottom: 1rem; }
    .contact-left p { font-size: 0.95rem; color: #4A5568; line-height: 1.75; margin-bottom: 2rem; }
    .contact-channels { display: flex; flex-direction: column; gap: 1rem; }
    .channel { display: flex; align-items: center; gap: 0.875rem; padding: 1rem 1.25rem; background: #fff; border: 1px solid rgba(200,16,46,0.1); border-radius: 12px; text-decoration: none; transition: border-color 0.2s, transform 0.15s; }
    .channel:hover { border-color: rgba(200,16,46,0.35); transform: translateX(4px); }
    .channel-icon { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; flex-shrink: 0; }
    .channel-label { font-weight: 600; font-size: 0.875rem; color: #1A1A2E; }
    .channel-detail { font-size: 0.775rem; color: #4A5568; }

    .contact-form { background: #fff; border: 1px solid rgba(200,16,46,0.1); border-radius: 20px; padding: 2.5rem; box-shadow: 0 8px 32px rgba(200,16,46,0.06); }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    .form-group { display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 1rem; }
    .form-group label { font-size: 0.78rem; font-weight: 600; color: #1A1A2E; letter-spacing: 0.02em; }
    .form-group input, .form-group select, .form-group textarea {
      background: #FAFAFA; border: 1.5px solid rgba(26,26,46,0.12);
      border-radius: 8px; padding: 0.7rem 1rem; font-size: 0.875rem;
      font-family: 'DM Sans', sans-serif; color: #1A1A2E; outline: none;
      transition: border-color 0.2s; width: 100%;
    }
    .form-group input:focus, .form-group select:focus, .form-group textarea:focus { border-color: #C8102E; background: #fff; }
    .form-group textarea { resize: vertical; min-height: 90px; }
    .form-group select option { background: #fff; }

    /* ── FLOATING WA ── */
    .wa-float {
      position: fixed; bottom: 2rem; right: 2rem; z-index: 200;
      width: 58px; height: 58px; border-radius: 50%;
      background: #25D366; display: flex; align-items: center; justify-content: center;
      font-size: 1.5rem; text-decoration: none;
      box-shadow: 0 4px 24px rgba(37,211,102,0.4);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .wa-float:hover { transform: scale(1.1); box-shadow: 0 8px 32px rgba(37,211,102,0.5); }
    .wa-pulse {
      position: absolute; inset: -3px; border-radius: 50%;
      background: rgba(37,211,102,0.25);
      animation: waPulse 2.5s ease-out infinite;
    }
    @keyframes waPulse { 0%{transform:scale(1);opacity:1} 100%{transform:scale(1.7);opacity:0} }

    /* ── FOOTER ── */
    .footer { padding: 2.5rem 6%; border-top: 1px solid rgba(200,16,46,0.1); background: #FFFDF9; }
    .footer-inner { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1.5rem; }
    .footer-brand { font-family: 'Playfair Display', serif; font-size: 0.95rem; color: #1A1A2E; }
    .footer-brand span { color: #C8102E; }
    .footer-links { display: flex; gap: 2rem; flex-wrap: wrap; }
    .footer-links a { font-size: 0.82rem; color: #4A5568; text-decoration: none; transition: color 0.2s; }
    .footer-links a:hover { color: #C8102E; }
    .footer-note { font-size: 0.72rem; color: #9AA5B4; text-align: center; margin-top: 1.5rem; padding-top: 1.25rem; border-top: 1px solid rgba(26,26,46,0.06); }

    /* ── DIVIDER ── */
    .red-divider { height: 3px; background: linear-gradient(90deg, #C8102E, #C9973A, transparent); }

    /* ── FINANCE TRACKER ── */
    .tracker-section { background: #1A1A2E; position: relative; overflow: hidden; }
    .tracker-glow {
      position: absolute; top: -150px; right: -150px; width: 500px; height: 500px;
      background: radial-gradient(circle, rgba(201,151,58,0.1), transparent 65%);
      border-radius: 50%; pointer-events: none;
    }
    .tracker-glow2 {
      position: absolute; bottom: -100px; left: -100px; width: 400px; height: 400px;
      background: radial-gradient(circle, rgba(200,16,46,0.08), transparent 65%);
      border-radius: 50%; pointer-events: none;
    }
    .tracker-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; position: relative; z-index: 1; }
    .tracker-badge {
      display: inline-flex; align-items: center; gap: 8px;
      background: rgba(201,151,58,0.12); border: 1px solid rgba(201,151,58,0.3);
      border-radius: 100px; padding: 0.35rem 1rem; margin-bottom: 1.5rem;
      font-size: 0.75rem; font-weight: 600; color: #C9973A;
      font-family: 'DM Mono', monospace; letter-spacing: 0.06em; text-transform: uppercase;
    }
    .tracker-title {
      font-family: 'Playfair Display', serif;
      font-size: clamp(1.8rem, 3vw, 2.5rem); font-weight: 700; line-height: 1.2;
      color: #fff; margin-bottom: 1rem;
    }
    .tracker-title em { font-style: italic; color: #C9973A; }
    .tracker-desc { font-size: 0.975rem; color: rgba(255,255,255,0.6); line-height: 1.8; margin-bottom: 2rem; }
    .tracker-features { display: flex; flex-direction: column; gap: 0.65rem; margin-bottom: 2.25rem; }
    .tracker-feature { display: flex; align-items: center; gap: 0.75rem; font-size: 0.875rem; color: rgba(255,255,255,0.8); }
    .tf-check {
      width: 20px; height: 20px; border-radius: 50%; flex-shrink: 0;
      background: rgba(201,151,58,0.15); border: 1px solid rgba(201,151,58,0.4);
      display: flex; align-items: center; justify-content: center;
      font-size: 0.6rem; color: #C9973A;
    }
    .tracker-actions { display: flex; flex-wrap: wrap; gap: 1rem; }
    .btn-gold {
      background: linear-gradient(135deg, #C9973A, #a87a28);
      color: #fff; border: none; border-radius: 9px;
      padding: 0.9rem 1.85rem; font-size: 0.95rem; font-weight: 600;
      font-family: 'DM Sans', sans-serif; cursor: pointer;
      box-shadow: 0 4px 20px rgba(201,151,58,0.3);
      transition: transform 0.15s, box-shadow 0.15s;
      text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem;
    }
    .btn-gold:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(201,151,58,0.4); }
    .btn-ghost {
      background: transparent; color: rgba(255,255,255,0.7);
      border: 1.5px solid rgba(255,255,255,0.15); border-radius: 9px;
      padding: 0.9rem 1.85rem; font-size: 0.95rem; font-weight: 600;
      font-family: 'DM Sans', sans-serif; cursor: pointer;
      transition: border-color 0.2s, color 0.2s, transform 0.15s;
      text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem;
    }
    .btn-ghost:hover { border-color: rgba(201,151,58,0.5); color: #C9973A; transform: translateY(-2px); }

    /* Tracker mockup */
    .tracker-mockup {
      background: rgba(255,253,249,0.04); border: 1px solid rgba(255,255,255,0.08);
      border-radius: 20px; padding: 1.5rem; backdrop-filter: blur(4px);
    }
    .mockup-bar { display: flex; align-items: center; gap: 6px; margin-bottom: 1.25rem; }
    .mockup-dot { width: 10px; height: 10px; border-radius: 50%; }
    .mockup-url { font-family: 'DM Mono', monospace; font-size: 0.7rem; color: rgba(255,255,255,0.3); margin-left: 8px; }
    .mockup-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 0.75rem; }
    .mockup-stat { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06); border-radius: 10px; padding: 1rem; }
    .ms-label { font-size: 0.68rem; color: rgba(255,255,255,0.35); font-family: 'DM Mono', monospace; margin-bottom: 4px; }
    .ms-value { font-family: 'DM Mono', monospace; font-size: 1.35rem; font-weight: 500; }
    .mockup-chart { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 10px; padding: 1rem; }
    .chart-label { font-size: 0.68rem; color: rgba(255,255,255,0.35); font-family: 'DM Mono', monospace; margin-bottom: 0.75rem; }
    .chart-bars { display: flex; align-items: flex-end; gap: 5px; height: 72px; }
    .c-bar { flex: 1; border-radius: 3px 3px 0 0; transition: opacity 0.2s; }
    .mockup-tip {
      margin-top: 0.75rem; padding: 0.75rem 1rem;
      background: rgba(201,151,58,0.08); border: 1px solid rgba(201,151,58,0.2); border-radius: 8px;
      font-size: 0.75rem; color: rgba(255,255,255,0.55); line-height: 1.5;
    }
    .mockup-tip strong { color: #C9973A; }

    @media (max-width: 900px) {
      .tracker-grid { grid-template-columns: 1fr; gap: 3rem; }
    }

    /* ── MOBILE ── */
    @media (max-width: 900px) {
      .nav-links { display: none; }
      .nav-hamburger { display: flex; }
      .nav-links.open {
        display: flex; flex-direction: column; position: fixed;
        top: 70px; left: 0; right: 0;
        background: rgba(255,253,249,0.98); backdrop-filter: blur(12px);
        border-bottom: 1px solid rgba(200,16,46,0.1);
        padding: 1.5rem 6%; z-index: 99; gap: 1.25rem;
      }
      .hero-inner { grid-template-columns: 1fr; gap: 3rem; }
      .hero-portrait { max-width: 320px; margin: 0 auto; }
      .about-grid { grid-template-columns: 1fr; gap: 3rem; }
      .why-grid { grid-template-columns: 1fr 1fr; }
      .contact-grid { grid-template-columns: 1fr; gap: 3rem; }
      .form-row { grid-template-columns: 1fr; }
      .moments-track { gap: 0; }
      .moment-item { padding: 0 1.25rem; }
      .moment-item:not(:last-child)::after { display: none; }
    }
    @media (max-width: 600px) {
      .why-grid { grid-template-columns: 1fr; }
      .hero-trust { gap: 1.5rem; }
      .section { padding: 4rem 5%; }
    }
  `}</style>
);

// ─── Data ─────────────────────────────────────────────────────────────────────
const products = [
  {
    icon: "🛡️", title: "Life Insurance",
    desc: "Protect the people who depend on you. If the unexpected happens, your family's financial future stays secure.",
    features: ["Death benefit protection", "Critical illness rider option", "Affordable premiums", "AIA Vitality rewards"]
  },
  {
    icon: "❤️", title: "Medical & Health",
    desc: "Quality healthcare without the financial stress. Cover hospitalisation, specialist visits, and major surgeries.",
    features: ["Hospitalisation & surgical", "Outpatient coverage", "Cancer treatment cover", "Cashless admission"]
  },
  {
    icon: "🌱", title: "Investment-Linked Plans",
    desc: "Grow your wealth while staying protected. Build a nest egg for retirement, education, or your next milestone.",
    features: ["Market-linked returns", "Flexible premium top-ups", "Life protection included", "Long-term wealth building"]
  },
  {
    icon: "🏥", title: "Critical Illness",
    desc: "A lump sum payout when you need it most. Cover 36 critical illnesses including cancer, heart attack, and stroke.",
    features: ["36 critical conditions covered", "Early and advanced stage", "Lump sum cash benefit", "No restrictions on usage"]
  },
  {
    icon: "👶", title: "Education Planning",
    desc: "Start saving for your child's future today. Guaranteed funds when university fees arrive — no matter what.",
    features: ["Guaranteed maturity value", "Premium waiver if parent passes", "Flexible payout timing", "Covers local & overseas study"]
  },
  {
    icon: "🌟", title: "Retirement Planning",
    desc: "Build the retirement income you deserve. Regular payouts to maintain your lifestyle long after you stop working.",
    features: ["Guaranteed monthly income", "Longevity protection", "Flexible retirement age", "Legacy benefit option"]
  },
];

const whyReasons = [
  { num: "01", title: "AIA's Regional Strength", desc: "Backed by AIA Group — Asia's largest independent publicly listed pan-Asian life insurance group, with over 100 years of experience." },
  { num: "02", title: "Advice, Not Sales", desc: "I take time to understand your life before recommending anything. The right plan depends on your stage of life, not my quota." },
  { num: "03", title: "Brunei-Based & Available", desc: "A local agent who responds quickly, speaks your language, and walks you through every claim or question — not a call center." },
  { num: "04", title: "Ongoing Relationship", desc: "Your needs change over time. I conduct annual policy reviews to make sure your coverage keeps pace with your life." },
  { num: "05", title: "AIA Vitality Programme", desc: "Earn rewards for healthy living. Discounts, cashback, and premium reductions when you stay active and do health screenings." },
  { num: "06", title: "Paperwork Handled", desc: "From application to claims, I guide you through the process so nothing falls through the cracks at the worst possible time." },
];

const processSteps = [
  { n: "1", title: "Free Consultation", desc: "We meet over coffee, a call, or WhatsApp. I ask about your family, income, existing coverage, and what keeps you up at night." },
  { n: "2", title: "Needs Analysis", desc: "I map out your financial protection gaps using AIA's planning tools — no jargon, just a clear picture of where you stand." },
  { n: "3", title: "Personalised Recommendation", desc: "You receive a tailored proposal with 2–3 options at different price points. No pressure to decide on the spot." },
  { n: "4", title: "Application & Approval", desc: "Once you're ready, I handle the paperwork and guide you through underwriting. Most applications are approved within days." },
  { n: "5", title: "Policy Delivery & Review", desc: "I walk you through your policy document so you know exactly what you're covered for — and what to do if you ever need to claim." },
  { n: "6", title: "Annual Policy Review", desc: "Life changes. I check in every year to make sure your cover still fits — whether you've had a baby, bought a home, or changed jobs." },
];

const testimonials = [
  { text: "Siti Aqilah made the whole process feel so easy. She explained every detail patiently and never rushed me into a decision. My family is now fully covered and I finally have peace of mind.", name: "Nur Hafizah", role: "Teacher, Brunei Muara", initials: "NH" },
  { text: "I came to her knowing nothing about insurance. She asked the right questions, identified exactly what I needed, and found a plan that fit my budget perfectly. Highly recommend her.", name: "Khairul Anwar", role: "SME Owner, Tutong", initials: "KA" },
  { text: "When I had to make a claim after my hospitalisation, Siti Aqilah was there guiding me through every step. That support when you actually need it — that's what separates a good agent from the rest.", name: "Salbiah Hj Ramli", role: "Government Officer, Belait", initials: "SR" },
  { text: "I've been her client for 4 years now. Every year she reviews my policy and adjusts it as my life changes. That ongoing care means more than the initial sale ever could.", name: "Faizal Pg Damit", role: "Engineer, Brunei Muara", initials: "FD" },
];

const faqs = [
  { q: "Do I really need insurance if I'm young and healthy?", a: "That's actually the best time to get insured. Premiums are lower when you're younger and healthier, and critical illness or life events don't wait until you feel ready. Many people wish they had started earlier." },
  { q: "How much coverage do I actually need?", a: "A common starting point is 10x your annual income for life coverage, plus enough medical coverage to handle major hospitalisation. During our consultation, I'll run a proper needs analysis specific to your situation." },
  { q: "Is AIA available for non-Brunei citizens?", a: "Yes. AIA Brunei serves both citizens and permanent residents. Foreign nationals working in Brunei may also be eligible depending on visa status — reach out and we'll check your eligibility." },
  { q: "Can I change or upgrade my plan later?", a: "Yes. Most plans allow you to add riders, increase coverage, or switch to a different product as your needs evolve. I review your policy annually to flag any gaps." },
  { q: "What happens if I miss a premium payment?", a: "AIA provides a grace period (typically 30 days). If you're facing financial difficulty, there are options like premium holidays or policy loans on some plans. Always contact me before a policy lapses." },
  { q: "How long does a claim take?", a: "Straightforward claims are typically processed within 14 working days once all documents are submitted. I assist you with the paperwork to make sure there are no unnecessary delays." },
];

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [form, setForm] = useState({ name:"", phone:"", age:"", need:"", message:"" });
  const [submitted, setSubmitted] = useState(false);

  const WA = "https://wa.me/6738975927?text=Hi%20Siti%20Aqilah%2C%20I%27d%20like%20to%20find%20out%20more%20about%20AIA%20insurance.";

  const scroll = (id) => {
    setNavOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });
  };

  const handleSubmit = () => {
    if (!form.name || !form.phone) return;
    setSubmitted(true);
  };

  const moments = [
    { icon:"🎓", stage:"Graduate", need:"Income protection" },
    { icon:"💍", stage:"Married", need:"Life cover" },
    { icon:"👶", stage:"New Baby", need:"Family protection" },
    { icon:"🏠", stage:"Homeowner", need:"Mortgage protection" },
    { icon:"📈", stage:"Business Owner", need:"Business continuity" },
    { icon:"🌅", stage:"Retirement", need:"Retirement income" },
  ];

  return (
    <>
      <Styles />

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo">
          <div className="nav-logo-aia">AIA</div>
          <div className="nav-logo-name">Siti Aqilah</div>
        </div>
        <ul className={`nav-links${navOpen ? " open" : ""}`}>
          {[["Home","hero"],["About","about"],["Plans","plans"],["Why Me","why"],["Process","process"],["Finance Tracker","tracker"],["FAQ","faq"],["Contact","contact"]].map(([l,id])=>(
            <li key={id}><a href={`#${id}`} onClick={e=>{e.preventDefault();scroll(id)}}>{l}</a></li>
          ))}
        </ul>
        <button className="nav-cta" onClick={()=>scroll("contact")}>Get a Free Quote</button>
        <button className="nav-hamburger" onClick={()=>setNavOpen(o=>!o)} aria-label="Menu">
          <span/><span/><span/>
        </button>
      </nav>

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hero-bg-shape"/>
        <div className="hero-bg-shape2"/>
        <div className="hero-inner">
          <div>
            <div className="hero-eyebrow">AIA Certified Agent · Brunei</div>
            <h1>
              Protect What<br/>
              <em>Matters Most</em><br/>
              to You
            </h1>
            <p className="hero-sub">
              Life changes fast. The right insurance means your family, health, and future stay secure — no matter what happens. Let's find the plan that actually fits your life.
            </p>
            <div className="hero-actions">
              <button className="btn-red" onClick={()=>scroll("contact")}>🛡️ Get a Free Consultation</button>
              <a href={WA} target="_blank" rel="noreferrer" className="btn-green">💬 WhatsApp Me</a>
              <button className="btn-outline" onClick={()=>scroll("plans")}>View Plans</button>
            </div>
            <div className="hero-trust">
              <div className="hero-trust-item">
                <span className="trust-num">8+</span>
                <span className="trust-label">Years with AIA</span>
              </div>
              <div className="hero-trust-item">
                <span className="trust-num">300+</span>
                <span className="trust-label">Families Protected</span>
              </div>
              <div className="hero-trust-item">
                <span className="trust-num">98%</span>
                <span className="trust-label">Client Retention</span>
              </div>
              <div className="hero-trust-item">
                <span className="trust-num">BND 2M+</span>
                <span className="trust-label">Claims Supported</span>
              </div>
            </div>
          </div>
          <div className="hero-portrait-wrap">
            <div className="hero-portrait">
              <div style={{fontSize:"5rem"}}>👩‍💼</div>
              <div style={{fontSize:"0.82rem",color:"#9AA5B4"}}>(Replace with professional photo)</div>
              <div className="portrait-award">★ Million Dollar Round Table</div>
              <div className="portrait-badge">
                <div className="badge-name">Siti Aqilah binti Awg Rosneddin</div>
                <div className="badge-title">AIA Life Planner</div>
                <div className="badge-aia">AIA Brunei Darussalam · Since 2016</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIFE MOMENTS STRIP */}
      <div className="moments-strip">
        <div className="moments-label">Insurance matters at every stage of life</div>
        <div className="moments-track">
          {moments.map((m,i)=>(
            <div className="moment-item" key={i}>
              <div className="moment-icon">{m.icon}</div>
              <div className="moment-stage">{m.stage}</div>
              <div className="moment-need">{m.need}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="red-divider"/>

      {/* ABOUT */}
      <section className="section section-ivory" id="about">
        <div className="eyebrow">About Me</div>
        <h2 className="section-title">A Trusted Advisor,<br/>Not Just an <em>Agent</em></h2>
        <div className="about-grid">
          <div className="about-body">
            <p>
              I'm <strong>Siti Aqilah binti Awg Rosneddin</strong>, a certified AIA Life Planner based in Brunei Darussalam. For over 8 years, I've helped hundreds of families, young professionals, and business owners build financial safety nets that hold up when life gets hard.
            </p>
            <p>
              Insurance isn't something people enjoy thinking about — I know that. My job is to make it simple, honest, and personal. I won't recommend what's most profitable for me; I'll recommend what genuinely makes sense for your situation.
            </p>
            <p>
              Whether you're a fresh graduate buying your first policy, a parent protecting your children's future, or a business owner securing your livelihood — I'm here to guide you through every decision.
            </p>
            <div className="creds">
              {["AIA Certified Life Planner","Million Dollar Round Table (MDRT) Member","AIA Vitality Certified Advisor","Brunei Financial Planning Association Member","Licensed by Monetary Authority of Brunei Darussalam"].map(c=>(
                <div className="cred-item" key={c}><span className="cred-icon">✓</span> {c}</div>
              ))}
            </div>
          </div>
          <div>
            <div className="about-stats">
              {[["8+","Years experience"],["300+","Families protected"],["BND 2M+","Claims supported"],["98%","Client retention rate"]].map(([n,l])=>(
                <div className="about-stat" key={l}>
                  <div className="stat-num">{n}</div>
                  <div className="stat-label">{l}</div>
                </div>
              ))}
            </div>
            <div style={{marginTop:"1.5rem",padding:"1.5rem",background:"#FFF5F5",borderRadius:"14px",border:"1px solid rgba(200,16,46,0.1)"}}>
              <p style={{fontSize:"0.875rem",color:"#4A5568",lineHeight:1.75,fontStyle:"italic"}}>
                "The best time to buy insurance is when you don't need it. Because when you do need it, it's too late to buy it."
              </p>
              <p style={{fontSize:"0.78rem",color:"#C8102E",fontWeight:600,marginTop:"0.5rem"}}>— A truth every client eventually understands</p>
            </div>
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section className="section section-blush" id="plans">
        <div className="eyebrow">Insurance Plans</div>
        <h2 className="section-title">Coverage for Every<br/><em>Stage of Life</em></h2>
        <p className="section-sub">AIA offers Brunei's most comprehensive range of life, health, and savings products. I'll help you find the right combination.</p>
        <div className="products-grid">
          {products.map(p=>(
            <div className="product-card" key={p.title}>
              <div className="product-icon">{p.icon}</div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <div className="product-features">
                {p.features.map(f=>(
                  <div className="product-feature" key={f}><div className="pf-dot"/>{f}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{textAlign:"center",marginTop:"3rem"}}>
          <p style={{fontSize:"0.875rem",color:"#4A5568",marginBottom:"1.25rem"}}>Not sure which plan is right for you? Let's figure it out together — no obligation.</p>
          <button className="btn-red" onClick={()=>scroll("contact")}>Book a Free Needs Analysis</button>
        </div>
      </section>

      {/* WHY ME */}
      <section className="section section-ivory" id="why">
        <div className="eyebrow">Why Work With Me</div>
        <h2 className="section-title">What Makes the<br/><em>Difference</em></h2>
        <p className="section-sub">Anyone can sell you a policy. My job is to make sure it actually protects you when the time comes.</p>
        <div className="why-grid">
          {whyReasons.map(w=>(
            <div className="why-card" key={w.num}>
              <div className="why-num">{w.num}</div>
              <h3>{w.title}</h3>
              <p>{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="section section-blush" id="process">
        <div className="eyebrow">How It Works</div>
        <h2 className="section-title">From First Chat to<br/><em>Full Protection</em></h2>
        <p className="section-sub">A straightforward six-step process designed to make you feel informed and confident at every stage.</p>
        <div className="process-list">
          {processSteps.map(s=>(
            <div className="process-item" key={s.n}>
              <div className="process-bullet">{s.n}</div>
              <div className="process-body">
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section section-dark" id="testimonials">
        <div className="eyebrow" style={{color:"rgba(200,16,46,0.8)"}}>Testimonials</div>
        <h2 className="section-title light">What Clients Say<br/>After the <em style={{color:"#C8102E"}}>Claim</em></h2>
        <p className="section-sub light">The real test of insurance — and an agent — is what happens when something goes wrong.</p>
        <div className="testimonials-grid">
          {testimonials.map(t=>(
            <div className="testimonial-card" key={t.name}>
              <div className="t-stars">★★★★★</div>
              <p className="t-text">{t.text}</p>
              <div className="t-author">
                <div className="t-avatar">{t.initials}</div>
                <div>
                  <div className="t-name">{t.name}</div>
                  <div className="t-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FINANCE TRACKER */}
      <section className="section tracker-section" id="tracker">
        <div className="tracker-glow"/>
        <div className="tracker-glow2"/>
        <div className="tracker-grid">
          <div>
            <div className="tracker-badge">★ Free Tool</div>
            <h2 className="tracker-title">
              Track Your Finances,<br/>
              Plan for What <em>Matters</em>
            </h2>
            <p className="tracker-desc">
              Good insurance starts with knowing your numbers. This free personal finance tracker helps you understand your income, spending, and savings — so we can recommend coverage that actually fits your budget.
            </p>
            <div className="tracker-features">
              {[
                "Track income & expenses in one place",
                "Monitor savings goals month by month",
                "Visualise your budget with clear charts",
                "Identify how much you can set aside for premiums",
                "Mobile-friendly — use it anywhere",
                "Free to use, no sign-up required",
              ].map(f => (
                <div className="tracker-feature" key={f}>
                  <div className="tf-check">✓</div>
                  <span>{f}</span>
                </div>
              ))}
            </div>
            <div className="tracker-actions">
              <a href="https://bnd-tracker.netlify.app/" target="_blank" rel="noreferrer" className="btn-gold">
                📊 Open Finance Tracker
              </a>
              <button className="btn-ghost" onClick={() => scroll("contact")}>
                Get Insurance Advice →
              </button>
            </div>
          </div>
          <div className="tracker-mockup">
            <div className="mockup-bar">
              <div className="mockup-dot" style={{background:"#FF5F57"}}/>
              <div className="mockup-dot" style={{background:"#FFBD2E"}}/>
              <div className="mockup-dot" style={{background:"#28CA41"}}/>
              <span className="mockup-url">bnd-tracker.netlify.app</span>
            </div>
            <div className="mockup-stats">
              <div className="mockup-stat">
                <div className="ms-label">Monthly Income</div>
                <div className="ms-value" style={{color:"#C9973A"}}>$3,800</div>
              </div>
              <div className="mockup-stat">
                <div className="ms-label">Total Expenses</div>
                <div className="ms-value" style={{color:"#C8102E"}}>$2,250</div>
              </div>
              <div className="mockup-stat">
                <div className="ms-label">Savings This Month</div>
                <div className="ms-value" style={{color:"#28CA41"}}>$1,550</div>
              </div>
              <div className="mockup-stat">
                <div className="ms-label">Savings Rate</div>
                <div className="ms-value" style={{color:"rgba(255,255,255,0.85)"}}>40%</div>
              </div>
            </div>
            <div className="mockup-chart">
              <div className="chart-label">6-Month Spending Overview</div>
              <div className="chart-bars">
                {[55, 70, 60, 85, 75, 65].map((h, i) => (
                  <div key={i} className="c-bar" style={{
                    height: `${h}%`,
                    background: i === 3 ? "#C9973A" : "rgba(200,16,46,0.45)"
                  }}/>
                ))}
              </div>
            </div>
            <div className="mockup-tip">
              <strong>💡 Insurance tip:</strong> If your savings rate is above 20%, you likely have room for a solid life + medical plan without straining your budget. Let's find out together.
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section-ivory" id="faq">
        <div style={{textAlign:"center"}}>
          <div className="eyebrow" style={{display:"inline-block"}}>FAQ</div>
          <h2 className="section-title">Questions People<br/>Always <em>Ask Me</em></h2>
          <p className="section-sub" style={{margin:"0 auto"}}>Honest answers to the questions most people are afraid to ask.</p>
        </div>
        <div className="faq-wrap">
          {faqs.map((f,i)=>(
            <div className="faq-item" key={i}>
              <div className="faq-q" onClick={()=>setOpenFaq(openFaq===i?null:i)}>
                {f.q}
                <span className={`faq-chevron${openFaq===i?" open":""}`}>▼</span>
              </div>
              {openFaq===i && <div className="faq-a">{f.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="section section-blush" id="contact">
        <div className="contact-grid">
          <div className="contact-left">
            <div className="eyebrow">Get In Touch</div>
            <h2>Let's Find the Right Cover for Your Life</h2>
            <p>A 30-minute conversation is all it takes to understand your needs and point you in the right direction. No pressure, no jargon — just honest advice.</p>
            <div className="contact-channels">
              <a href={WA} target="_blank" rel="noreferrer" className="channel">
                <div className="channel-icon" style={{background:"rgba(37,211,102,0.1)"}}>💬</div>
                <div>
                  <div className="channel-label">WhatsApp</div>
                  <div className="channel-detail">+673 897 5927 · Fastest response</div>
                </div>
              </a>
              <a href="tel:+6738975927" className="channel">
                <div className="channel-icon" style={{background:"rgba(200,16,46,0.08)"}}>📞</div>
                <div>
                  <div className="channel-label">Call Me</div>
                  <div className="channel-detail">+673 897 5927 · Mon–Sat, 9am–6pm</div>
                </div>
              </a>
              <a href="mailto:sitiaqilah@aia.com.bn" className="channel">
                <div className="channel-icon" style={{background:"rgba(74,85,104,0.08)"}}>✉️</div>
                <div>
                  <div className="channel-label">Email</div>
                  <div className="channel-detail">sitiaqilah@aia.com.bn</div>
                </div>
              </a>
              <a href="#" className="channel">
                <div className="channel-icon" style={{background:"rgba(24,119,242,0.08)"}}>📘</div>
                <div>
                  <div className="channel-label">Facebook</div>
                  <div className="channel-detail">fb.com/sitiaqilah.aia</div>
                </div>
              </a>
            </div>
          </div>
          <div className="contact-form">
            {submitted ? (
              <div style={{textAlign:"center",padding:"3rem 1rem"}}>
                <div style={{fontSize:"3rem",marginBottom:"1rem"}}>🛡️</div>
                <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"1.3rem",marginBottom:"0.75rem",color:"#1A1A2E"}}>Message Received!</h3>
                <p style={{color:"#4A5568",fontSize:"0.9rem",lineHeight:1.75}}>I'll be in touch within a few hours. For a faster response, send me a WhatsApp message and I'll reply as soon as I can.</p>
                <a href={WA} target="_blank" rel="noreferrer" className="btn-green" style={{marginTop:"1.5rem",display:"inline-flex"}}>💬 WhatsApp Me Now</a>
              </div>
            ) : (
              <>
                <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"1.2rem",color:"#1A1A2E",marginBottom:"0.25rem"}}>Request a Free Consultation</h3>
                <p style={{fontSize:"0.82rem",color:"#4A5568",marginBottom:"1.75rem"}}>Tell me a little about yourself and I'll prepare before we speak.</p>
                <div className="form-row">
                  <div className="form-group">
                    <label>Your Name *</label>
                    <input placeholder="Full name" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} />
                  </div>
                  <div className="form-group">
                    <label>Phone / WhatsApp *</label>
                    <input placeholder="+673 XXX XXXX" value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Age Range</label>
                    <select value={form.age} onChange={e=>setForm(f=>({...f,age:e.target.value}))}>
                      <option value="">Select age</option>
                      {["18–24","25–34","35–44","45–54","55–64","65+"].map(a=><option key={a}>{a}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>I'm Interested In</label>
                    <select value={form.need} onChange={e=>setForm(f=>({...f,need:e.target.value}))}>
                      <option value="">Select plan type</option>
                      {["Life Insurance","Medical & Health","Investment-Linked","Critical Illness","Education Planning","Retirement Planning","Not Sure Yet"].map(n=><option key={n}>{n}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Anything else I should know?</label>
                  <textarea placeholder="E.g. I have a young child, I'm self-employed, I already have some coverage but want to review it..." value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))} />
                </div>
                <button className="btn-red" style={{width:"100%",justifyContent:"center"}} onClick={handleSubmit}>
                  Send My Details →
                </button>
                <p style={{fontSize:"0.7rem",color:"#9AA5B4",textAlign:"center",marginTop:"0.75rem"}}>Your details are kept private and used only to prepare for our consultation.</p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <strong><span>AIA</span> · Siti Aqilah</strong> — Life Planner, Brunei Darussalam
          </div>
          <div className="footer-links">
            {[["About","#about"],["Plans","#plans"],["Finance Tracker","https://bnd-tracker.netlify.app/"],["Process","#process"],["FAQ","#faq"],["Contact","#contact"]].map(([l,h])=>(
              <a href={h} key={l} target={h.startsWith("http")?"_blank":undefined} rel={h.startsWith("http")?"noreferrer":undefined}>{l}</a>
            ))}
          </div>
        </div>
        <div className="footer-note">
          © 2025 Siti Aqilah binti Awg Rosneddin · Authorised AIA Life Planner · Licensed by the Monetary Authority of Brunei Darussalam · This website is for informational purposes only. Policy terms and conditions apply.
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a href={WA} target="_blank" rel="noreferrer" className="wa-float" title="Chat on WhatsApp">
        <div className="wa-pulse"/>
        <span style={{position:"relative",zIndex:1}}>💬</span>
      </a>
    </>
  );
}
