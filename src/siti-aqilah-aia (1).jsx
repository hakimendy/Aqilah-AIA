import { useState, useCallback, useEffect, useRef } from "react";

const WA = "https://wa.me/6738975927?text=Hi%20Aqilah%2C%20I%27d%20like%20to%20find%20out%20more%20about%20AIA%20insurance.";
const FINANCE_URL = "https://bnd-tracker.netlify.app/";

/* ── SEO / META HEAD ── injected into <head> via useEffect */
const SEOMeta = () => {
  useEffect(() => {
    document.title = "Aqilah Rosneddin — AIA Life Advisor Brunei | Insurance & Protection Plans";
    const setMeta = (name, content, prop) => {
      const sel = prop ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let el = document.querySelector(sel);
      if (!el) { el = document.createElement("meta"); prop ? el.setAttribute("property", name) : el.setAttribute("name", name); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    setMeta("description", "Aqilah Rosneddin is a licensed AIA Life Advisor based in Brunei. Helping individuals and families find the right life, medical, and protection insurance plans. Book a free consultation today.");
    setMeta("keywords", "AIA insurance Brunei, life insurance Brunei, medical insurance Brunei, AIA life advisor Brunei, insurance agent Brunei, protection plan Brunei, Aqilah Rosneddin");
    setMeta("robots", "index, follow");
    setMeta("author", "Aqilah Rosneddin");
    setMeta("og:title", "Aqilah Rosneddin — AIA Life Advisor Brunei", null, true);
    setMeta("og:description", "Licensed AIA Life Advisor in Brunei. Life, medical, critical illness & education plans. Book a free consultation.", null, true);
    setMeta("og:type", "website", null, true);
    setMeta("og:url", "https://aqilah-aia.vercel.app", null, true);
    setMeta("og:locale", "en_BN", null, true);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", "Aqilah Rosneddin — AIA Life Advisor Brunei");
    setMeta("twitter:description", "Licensed AIA Life Advisor in Brunei. Book your free insurance consultation today.");
    // Canonical
    let canonical = document.querySelector("link[rel='canonical']");
    if (!canonical) { canonical = document.createElement("link"); canonical.setAttribute("rel", "canonical"); document.head.appendChild(canonical); }
    canonical.setAttribute("href", "https://aqilah-aia.vercel.app");
    // Preconnect Google Fonts for performance
    ["https://fonts.googleapis.com","https://fonts.gstatic.com"].forEach(href => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const l = document.createElement("link"); l.rel = "preconnect"; l.href = href; if (href.includes("gstatic")) l.crossOrigin = "anonymous"; document.head.appendChild(l);
      }
    });
  }, []);
  return null;
};

const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    html{scroll-behavior:smooth;overflow-x:hidden;}
    body{background:#FFFDF9;color:#1A1A2E;font-family:'DM Sans',sans-serif;line-height:1.65;overflow-x:hidden;max-width:100vw;}
    :focus-visible{outline:2px solid #C8102E;outline-offset:3px;border-radius:4px;}
    .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;}
    @media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:0.01ms!important;transition-duration:0.01ms!important;}}
    .skip-link{position:absolute;top:-100px;left:1rem;background:#C8102E;color:#fff;padding:0.5rem 1rem;border-radius:0 0 8px 8px;font-weight:600;font-size:0.875rem;text-decoration:none;z-index:999;transition:top 0.2s;}
    .skip-link:focus{top:0;}

    /* ── NAV ── */
    .nav{position:fixed;top:0;left:0;right:0;z-index:500;background:rgba(255,253,249,0.97);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-bottom:1px solid rgba(200,16,46,0.08);display:flex;align-items:center;justify-content:space-between;padding:0 5%;height:72px;transition:box-shadow 0.3s;}
    .nav.scrolled{box-shadow:0 4px 24px rgba(26,26,46,0.07);}
    .nav-logo{display:flex;align-items:center;gap:10px;text-decoration:none;flex-shrink:0;}
    .nav-logo-aia{background:#C8102E;color:#fff;font-family:'DM Mono',monospace;font-size:0.78rem;font-weight:500;letter-spacing:0.1em;padding:4px 9px;border-radius:5px;}
    .nav-logo-name{font-family:'Playfair Display',serif;font-size:1rem;font-weight:600;color:#1A1A2E;}

    /* Center links */
    .nav-center{display:flex;align-items:center;gap:0.25rem;list-style:none;position:absolute;left:50%;transform:translateX(-50%);}
    .nav-center > li{position:relative;}
    .nav-center > li > a,.nav-center > li > button{font-size:0.875rem;font-weight:500;color:#4A5568;text-decoration:none;background:none;border:none;cursor:pointer;font-family:'DM Sans',sans-serif;padding:0.5rem 0.85rem;border-radius:7px;transition:color 0.18s,background 0.18s;display:flex;align-items:center;gap:5px;min-height:40px;white-space:nowrap;}
    .nav-center > li > a:hover,.nav-center > li > button:hover{color:#C8102E;background:rgba(200,16,46,0.05);}
    .nav-chevron{font-size:0.6rem;opacity:0.5;transition:transform 0.2s;}
    .nav-center > li.open > button .nav-chevron{transform:rotate(180deg);opacity:1;}
    .nav-center > li.open > button{color:#C8102E;background:rgba(200,16,46,0.05);}

    /* Dropdown */
    .nav-dropdown{position:absolute;top:calc(100% + 10px);left:50%;transform:translateX(-50%);background:#fff;border:1px solid rgba(200,16,46,0.1);border-radius:14px;box-shadow:0 16px 48px rgba(26,26,46,0.12),0 4px 12px rgba(26,26,46,0.06);min-width:220px;padding:0.5rem;opacity:0;visibility:hidden;transform:translateX(-50%) translateY(-8px);transition:opacity 0.18s,transform 0.18s,visibility 0.18s;z-index:499;}
    .nav-center > li.open .nav-dropdown{opacity:1;visibility:visible;transform:translateX(-50%) translateY(0);}
    .nav-dropdown-item{display:flex;align-items:flex-start;gap:0.75rem;padding:0.75rem 1rem;border-radius:9px;text-decoration:none;transition:background 0.15s;cursor:pointer;border:none;background:none;width:100%;font-family:'DM Sans',sans-serif;text-align:left;}
    .nav-dropdown-item:hover{background:rgba(200,16,46,0.05);}
    .nav-dropdown-icon{width:32px;height:32px;border-radius:8px;background:rgba(200,16,46,0.08);display:flex;align-items:center;justify-content:center;font-size:0.9rem;flex-shrink:0;margin-top:1px;}
    .nav-dropdown-label{font-size:0.875rem;font-weight:600;color:#1A1A2E;line-height:1.2;}
    .nav-dropdown-desc{font-size:0.75rem;color:#6B7280;margin-top:2px;line-height:1.4;}
    .nav-dropdown-divider{height:1px;background:rgba(200,16,46,0.06);margin:0.3rem 0.5rem;}

    /* Right CTAs */
    .nav-right{display:flex;align-items:center;gap:0.5rem;flex-shrink:0;}
    .nav-btn-tracker{font-size:0.825rem;font-weight:600;color:#C9973A;text-decoration:none;border:1.5px solid rgba(201,151,58,0.4);border-radius:8px;padding:0.45rem 1rem;transition:background 0.18s,border-color 0.18s;white-space:nowrap;display:flex;align-items:center;gap:5px;min-height:40px;}
    .nav-btn-tracker:hover{background:rgba(201,151,58,0.08);border-color:rgba(201,151,58,0.6);}
    .nav-btn-consult{background:#C8102E;color:#fff;border:none;border-radius:8px;padding:0.5rem 1.1rem;font-size:0.825rem;font-weight:600;font-family:'DM Sans',sans-serif;cursor:pointer;transition:background 0.18s,transform 0.15s,box-shadow 0.15s;white-space:nowrap;min-height:40px;box-shadow:0 2px 12px rgba(200,16,46,0.25);}
    .nav-btn-consult:hover{background:#a50d27;transform:translateY(-1px);box-shadow:0 4px 18px rgba(200,16,46,0.35);}
    /* Shrink buttons on mobile */
    @media(max-width:1023px){
      .nav-btn-tracker{font-size:0.72rem;padding:0.3rem 0.6rem;min-height:34px;border-radius:20px;gap:3px;}
      .nav-btn-consult{font-size:0.72rem;padding:0.3rem 0.7rem;min-height:34px;border-radius:20px;box-shadow:0 2px 8px rgba(200,16,46,0.25);}
      .tracker-text-full{display:none;}
      .tracker-text-short{display:inline;}
      .consult-text-full{display:none;}
      .consult-text-short{display:inline;}
    }
    @media(min-width:1024px){
      .tracker-text-short{display:none;}
      .consult-text-short{display:none;}
    }

    /* Hamburger */
    .nav-hamburger{display:none;flex-direction:column;gap:5px;cursor:pointer;border:none;background:none;padding:8px;min-width:44px;min-height:44px;align-items:center;justify-content:center;border-radius:8px;transition:background 0.15s;}
    .nav-hamburger:hover{background:rgba(200,16,46,0.06);}
    .nav-hamburger span{width:22px;height:2px;background:#1A1A2E;border-radius:2px;display:block;transition:all 0.25s;}
    .nav-hamburger.open span:nth-child(1){transform:translateY(7px) rotate(45deg);}
    .nav-hamburger.open span:nth-child(2){opacity:0;transform:scaleX(0);}
    .nav-hamburger.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg);}

    /* Mobile drawer */
    .nav-drawer{position:fixed;top:72px;left:0;right:0;bottom:0;z-index:490;background:rgba(255,253,249,0.99);backdrop-filter:blur(16px);overflow-y:auto;transform:translateX(100%);transition:transform 0.3s cubic-bezier(0.4,0,0.2,1);padding:1.5rem 5% 3rem;}
    .nav-drawer.open{transform:translateX(0);}
    .drawer-section{margin-bottom:0.5rem;}
    .drawer-section-label{font-family:'DM Mono',monospace;font-size:0.68rem;letter-spacing:0.12em;text-transform:uppercase;color:#9AA5B4;padding:0.75rem 0.5rem 0.4rem;display:block;}
    .drawer-link{display:flex;align-items:center;gap:0.75rem;padding:0.875rem 0.75rem;border-radius:10px;text-decoration:none;font-size:0.95rem;font-weight:500;color:#1A1A2E;transition:background 0.15s,color 0.15s;cursor:pointer;border:none;background:none;width:100%;font-family:'DM Sans',sans-serif;text-align:left;}
    .drawer-link:hover{background:rgba(200,16,46,0.05);color:#C8102E;}
    .drawer-link-icon{width:34px;height:34px;border-radius:8px;background:rgba(200,16,46,0.07);display:flex;align-items:center;justify-content:center;font-size:0.9rem;flex-shrink:0;}
    .drawer-link-icon.gold{background:rgba(201,151,58,0.1);}
    .drawer-divider{height:1px;background:rgba(200,16,46,0.07);margin:0.75rem 0;}
    .drawer-ctas{display:flex;flex-direction:column;gap:0.75rem;margin-top:1.5rem;padding-top:1.5rem;border-top:1px solid rgba(200,16,46,0.08);}
    .drawer-ctas .btn-red,.drawer-ctas .nav-btn-tracker{width:100%;justify-content:center;min-height:52px;font-size:1rem;border-radius:12px;}

    /* HERO */
    .hero{padding:88px 6% 64px;display:flex;flex-direction:column;justify-content:center;position:relative;overflow:hidden;background:#FFFDF9;}
    .hero-bg-shape{position:absolute;top:-100px;right:-150px;width:500px;height:500px;background:radial-gradient(ellipse,rgba(200,16,46,0.07) 0%,transparent 65%);border-radius:50%;pointer-events:none;}
    .hero-bg-shape2{position:absolute;bottom:-60px;left:-100px;width:400px;height:300px;background:radial-gradient(ellipse,rgba(201,151,58,0.06) 0%,transparent 65%);border-radius:50%;pointer-events:none;}
    .hero-inner{display:grid;grid-template-columns:55% 45%;gap:4rem;align-items:center;position:relative;z-index:1;}
    .hero-eyebrow{display:inline-flex;align-items:center;gap:8px;font-size:0.75rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#C8102E;margin-bottom:1rem;font-family:'DM Mono',monospace;}
    .hero-eyebrow::before{content:'';width:20px;height:2px;background:#C8102E;border-radius:2px;}
    .hero h1{font-family:'Playfair Display',serif;font-size:clamp(2.4rem,4vw,3.8rem);font-weight:700;line-height:1.12;letter-spacing:-0.02em;color:#1A1A2E;margin-bottom:1.1rem;}
    .hero h1 em{font-style:italic;color:#C8102E;}
    .hero-sub{font-size:1rem;color:#4A5568;line-height:1.75;max-width:460px;margin-bottom:2rem;}
    .hero-actions{display:flex;flex-wrap:nowrap;gap:0.75rem;margin-bottom:2.5rem;}
    .hero-trust{display:grid;grid-template-columns:repeat(4,auto);width:fit-content;border:1px solid rgba(200,16,46,0.1);border-radius:12px;overflow:hidden;}
    .hero-trust-item{display:flex;flex-direction:column;padding:0.875rem 1.25rem;border-right:1px solid rgba(200,16,46,0.08);background:#fff;}
    .hero-trust-item:last-child{border-right:none;}
    .trust-num{font-family:'DM Mono',monospace;font-size:1.35rem;font-weight:500;color:#C8102E;line-height:1;}
    .trust-label{font-size:0.72rem;color:#4A5568;margin-top:3px;white-space:nowrap;}

    /* BUTTONS */
    .btn-red{background:#C8102E;color:#fff;border:none;border-radius:9px;padding:0.8rem 1.5rem;font-size:0.9rem;font-weight:600;font-family:'DM Sans',sans-serif;cursor:pointer;transition:background 0.2s,transform 0.15s,box-shadow 0.15s;box-shadow:0 4px 18px rgba(200,16,46,0.28);text-decoration:none;display:inline-flex;align-items:center;gap:0.45rem;min-height:46px;white-space:nowrap;}
    .btn-red:hover{background:#a50d27;transform:translateY(-2px);box-shadow:0 8px 28px rgba(200,16,46,0.35);}
    .btn-outline{background:transparent;color:#1A1A2E;border:1.5px solid rgba(26,26,46,0.22);border-radius:9px;padding:0.8rem 1.5rem;font-size:0.9rem;font-weight:600;font-family:'DM Sans',sans-serif;cursor:pointer;transition:border-color 0.2s,background 0.2s,transform 0.15s;text-decoration:none;display:inline-flex;align-items:center;gap:0.45rem;min-height:46px;white-space:nowrap;}
    .btn-outline:hover{border-color:#C8102E;color:#C8102E;background:rgba(200,16,46,0.04);transform:translateY(-2px);}
    .btn-green{background:#25D366;color:#fff;border:none;border-radius:9px;padding:0.8rem 1.5rem;font-size:0.9rem;font-weight:600;font-family:'DM Sans',sans-serif;cursor:pointer;box-shadow:0 4px 18px rgba(37,211,102,0.25);transition:background 0.2s,transform 0.15s;text-decoration:none;display:inline-flex;align-items:center;gap:0.45rem;min-height:46px;white-space:nowrap;}
    .btn-green:hover{background:#1db954;transform:translateY(-2px);}
    .btn-gold{background:linear-gradient(135deg,#C9973A,#a87a28);color:#fff;border:none;border-radius:9px;padding:0.875rem 1.75rem;font-size:0.95rem;font-weight:600;font-family:'DM Sans',sans-serif;cursor:pointer;box-shadow:0 4px 20px rgba(201,151,58,0.3);transition:transform 0.15s,box-shadow 0.15s;text-decoration:none;display:inline-flex;align-items:center;gap:0.5rem;min-height:48px;}
    .btn-gold:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(201,151,58,0.4);}
    .btn-ghost{background:transparent;color:rgba(255,255,255,0.75);border:1.5px solid rgba(255,255,255,0.18);border-radius:9px;padding:0.875rem 1.75rem;font-size:0.95rem;font-weight:600;font-family:'DM Sans',sans-serif;cursor:pointer;transition:border-color 0.2s,color 0.2s,transform 0.15s;text-decoration:none;display:inline-flex;align-items:center;gap:0.5rem;min-height:48px;}
    .btn-ghost:hover{border-color:rgba(201,151,58,0.5);color:#C9973A;transform:translateY(-2px);}

    /* LIFE MOMENTS */
    .moments-strip{background:#1A1A2E;padding:2.5rem 0;overflow:hidden;width:100%;}
    .moments-label{text-align:center;font-family:'DM Mono',monospace;font-size:0.72rem;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.4);margin-bottom:1.75rem;}
    .moments-track{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;padding:0 5%;gap:0;width:100%;}
    .moment-item{display:flex;flex-direction:column;align-items:center;padding:0 2.25rem;text-align:center;position:relative;}
    .moment-item:not(:last-child)::after{content:'→';position:absolute;right:-8px;top:28px;color:rgba(200,16,46,0.5);font-size:1.1rem;}
    .moment-icon{width:56px;height:56px;border-radius:50%;background:rgba(200,16,46,0.15);border:1.5px solid rgba(200,16,46,0.3);display:flex;align-items:center;justify-content:center;font-size:1.4rem;margin-bottom:0.75rem;}
    .moment-stage{font-size:0.75rem;font-weight:600;color:rgba(255,255,255,0.85);}
    .moment-need{font-size:0.68rem;color:rgba(255,255,255,0.4);margin-top:2px;}

    /* PORTRAIT */
    .hero-portrait-wrap{position:relative;display:flex;justify-content:center;align-items:stretch;z-index:1;overflow:hidden;}
    .hero-portrait{width:100%;aspect-ratio:4/5;background:linear-gradient(160deg,#FFF0F0 0%,#FFF8E7 100%);border-radius:24px;overflow:hidden;border:1px solid rgba(200,16,46,0.12);display:flex;align-items:center;justify-content:center;flex-direction:column;gap:0.5rem;color:#4A5568;font-size:0.85rem;text-align:center;box-shadow:0 24px 64px rgba(200,16,46,0.08),0 4px 16px rgba(0,0,0,0.06);position:relative;min-height:380px;z-index:1;}
    .portrait-badge{position:absolute;bottom:1.25rem;left:1.25rem;right:1.25rem;background:rgba(255,253,249,0.97);backdrop-filter:blur(8px);border-radius:12px;padding:1rem 1.25rem;border:1px solid rgba(200,16,46,0.12);box-shadow:0 4px 16px rgba(0,0,0,0.08);}
    .badge-name{font-family:'Playfair Display',serif;font-size:0.95rem;font-weight:700;color:#1A1A2E;}
    .badge-title{font-size:0.75rem;color:#C8102E;font-weight:600;margin-top:2px;}
    .badge-aia{font-size:0.7rem;color:#4A5568;margin-top:2px;}
    .portrait-award{position:absolute;top:1.25rem;right:1.25rem;background:#C9973A;color:#fff;border-radius:8px;padding:0.4rem 0.75rem;font-size:0.7rem;font-weight:700;font-family:'DM Mono',monospace;letter-spacing:0.05em;}

    /* SECTIONS */
    .section{padding:6rem 6%;width:100%;overflow:hidden;}
    .section-blush{background:#FFF5F5;}
    .section-ivory{background:#FFFDF9;}
    .section-dark{background:#1A1A2E;}
    .eyebrow{font-family:'DM Mono',monospace;font-size:0.72rem;font-weight:500;letter-spacing:0.12em;text-transform:uppercase;color:#C8102E;margin-bottom:0.75rem;display:block;}
    .section-title{font-family:'Playfair Display',serif;font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:700;line-height:1.2;color:#1A1A2E;margin-bottom:1rem;}
    .section-title em{font-style:italic;color:#C8102E;}
    .section-title.light{color:#fff;}
    .section-sub{font-size:1rem;color:#4A5568;max-width:560px;line-height:1.75;}
    .section-sub.light{color:rgba(255,255,255,0.65);}

    /* ABOUT */
    .about-grid{display:grid;grid-template-columns:1.1fr 1fr;gap:5rem;align-items:start;margin-top:4rem;}
    .about-body p{color:#4A5568;line-height:1.8;margin-bottom:1.25rem;}
    .about-body p strong{color:#1A1A2E;}
    .creds{display:flex;flex-direction:column;gap:0.75rem;margin-top:2rem;}
    .cred-item{display:flex;align-items:center;gap:0.75rem;font-size:0.875rem;color:#4A5568;}
    .cred-icon{font-size:1.1rem;flex-shrink:0;}
    .about-stats{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:rgba(200,16,46,0.08);border-radius:16px;overflow:hidden;border:1px solid rgba(200,16,46,0.1);}
    .about-stat{background:#FFFDF9;padding:1.75rem;}
    .stat-num{font-family:'DM Mono',monospace;font-size:2.2rem;font-weight:500;color:#C8102E;line-height:1;}
    .stat-label{font-size:0.82rem;color:#4A5568;margin-top:6px;}

    /* PLANS */
    .products-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1.5rem;margin-top:3.5rem;}
    .product-card{background:#fff;border:1px solid rgba(200,16,46,0.1);border-radius:16px;padding:2rem;transition:border-color 0.2s,transform 0.2s,box-shadow 0.2s;}
    .product-card:hover{border-color:rgba(200,16,46,0.35);transform:translateY(-4px);box-shadow:0 16px 40px rgba(200,16,46,0.08);}
    .product-icon{font-size:2rem;margin-bottom:1.25rem;line-height:1;}
    .product-card h3{font-family:'Playfair Display',serif;font-size:1.15rem;font-weight:700;margin-bottom:0.6rem;color:#1A1A2E;}
    .product-card p{font-size:0.875rem;color:#4A5568;line-height:1.7;margin-bottom:1.25rem;}
    .product-features{display:flex;flex-direction:column;gap:0.5rem;list-style:none;}
    .product-feature{display:flex;align-items:center;gap:0.5rem;font-size:0.82rem;color:#4A5568;}
    .pf-dot{width:6px;height:6px;border-radius:50%;background:#C8102E;flex-shrink:0;}

    /* WHY */
    .why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem;margin-top:3.5rem;}
    .why-card{text-align:center;padding:2rem;}
    .why-num{font-family:'DM Mono',monospace;font-size:3rem;font-weight:500;color:rgba(200,16,46,0.15);line-height:1;margin-bottom:0.75rem;}
    .why-card h3{font-family:'Playfair Display',serif;font-size:1.1rem;font-weight:700;margin-bottom:0.5rem;color:#1A1A2E;}
    .why-card p{font-size:0.875rem;color:#4A5568;line-height:1.7;}

    /* PROCESS */
    .process-list{display:flex;flex-direction:column;gap:0;margin-top:3.5rem;max-width:700px;list-style:none;}
    .process-item{display:flex;gap:2rem;padding-bottom:2.5rem;position:relative;}
    .process-item:not(:last-child)::before{content:'';position:absolute;left:19px;top:44px;bottom:0;width:2px;background:linear-gradient(to bottom,rgba(200,16,46,0.2),rgba(200,16,46,0.05));}
    .process-bullet{width:40px;height:40px;border-radius:50%;flex-shrink:0;background:#fff;border:2px solid rgba(200,16,46,0.25);display:flex;align-items:center;justify-content:center;font-family:'DM Mono',monospace;font-size:0.78rem;font-weight:500;color:#C8102E;position:relative;z-index:1;}
    .process-body h3{font-family:'Playfair Display',serif;font-size:1rem;font-weight:700;color:#1A1A2E;margin-bottom:0.35rem;}
    .process-body p{font-size:0.875rem;color:#4A5568;line-height:1.7;}

    /* TESTIMONIALS */
    .testimonials-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:1.5rem;margin-top:3.5rem;}
    .testimonial-card{background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:2rem;}
    .t-stars{color:#C9973A;font-size:0.85rem;letter-spacing:1px;margin-bottom:1rem;}
    .t-text{font-size:0.875rem;color:rgba(255,255,255,0.8);line-height:1.75;margin-bottom:1.5rem;}
    .t-author{display:flex;align-items:center;gap:0.75rem;}
    .t-avatar{width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,#C8102E,#C9973A);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.85rem;color:#fff;flex-shrink:0;}
    .t-name{font-weight:600;font-size:0.875rem;color:#fff;}
    .t-role{font-size:0.75rem;color:rgba(255,255,255,0.5);}

    /* FAQ */
    .faq-wrap{max-width:740px;margin:3.5rem auto 0;display:flex;flex-direction:column;gap:0.65rem;}
    .faq-item{border:1px solid rgba(200,16,46,0.12);border-radius:12px;overflow:hidden;background:#fff;}
    .faq-q{display:flex;justify-content:space-between;align-items:center;padding:1.2rem 1.5rem;cursor:pointer;font-weight:600;font-size:0.925rem;font-family:'DM Sans',sans-serif;transition:color 0.2s;min-height:56px;gap:1rem;width:100%;background:none;border:none;text-align:left;color:#1A1A2E;}
    .faq-q:hover{color:#C8102E;}
    .faq-chevron{font-size:0.75rem;transition:transform 0.3s;color:#C8102E;flex-shrink:0;}
    .faq-chevron.open{transform:rotate(180deg);}
    .faq-a{padding:0 1.5rem 1.2rem;font-size:0.875rem;color:#4A5568;line-height:1.75;}

    /* CONTACT */
    .contact-grid{display:grid;grid-template-columns:1fr 1.2fr;gap:5rem;align-items:start;}
    .contact-left h2{font-family:'Playfair Display',serif;font-size:clamp(1.8rem,3vw,2.4rem);font-weight:700;color:#1A1A2E;margin-bottom:1rem;}
    .contact-left p{font-size:0.95rem;color:#4A5568;line-height:1.75;margin-bottom:2rem;}
    .contact-channels{display:flex;flex-direction:column;gap:1rem;}
    .channel{display:flex;align-items:center;gap:0.875rem;padding:1rem 1.25rem;background:#fff;border:1px solid rgba(200,16,46,0.1);border-radius:12px;text-decoration:none;transition:border-color 0.2s,transform 0.15s;min-height:64px;}
    .channel:hover{border-color:rgba(200,16,46,0.35);transform:translateX(4px);}
    .channel-icon{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0;}
    .channel-label{font-weight:600;font-size:0.875rem;color:#1A1A2E;}
    .channel-detail{font-size:0.775rem;color:#4A5568;}
    .contact-form{background:#fff;border:1px solid rgba(200,16,46,0.1);border-radius:20px;padding:2.5rem;box-shadow:0 8px 32px rgba(200,16,46,0.06);}
    .form-row{display:grid;grid-template-columns:1fr 1fr;gap:1rem;}
    .form-group{display:flex;flex-direction:column;gap:0.4rem;margin-bottom:1rem;}
    .form-group label{font-size:0.8rem;font-weight:600;color:#1A1A2E;letter-spacing:0.02em;}
    .form-group input,.form-group select,.form-group textarea{background:#FAFAFA;border:1.5px solid rgba(26,26,46,0.14);border-radius:8px;padding:0.75rem 1rem;font-size:0.875rem;font-family:'DM Sans',sans-serif;color:#1A1A2E;outline:none;transition:border-color 0.2s,box-shadow 0.2s;width:100%;min-height:48px;}
    .form-group textarea{min-height:96px;resize:vertical;}
    .form-group input:focus,.form-group select:focus,.form-group textarea:focus{border-color:#C8102E;background:#fff;box-shadow:0 0 0 3px rgba(200,16,46,0.08);}
    .form-group select option{background:#fff;color:#1A1A2E;}
    .form-error{font-size:0.75rem;color:#C8102E;margin-top:2px;}

    /* TRACKER */
    .tracker-section{background:#1A1A2E;position:relative;overflow:hidden;width:100%;}
    .tracker-glow{position:absolute;top:-150px;right:-150px;width:500px;height:500px;background:radial-gradient(circle,rgba(201,151,58,0.1),transparent 65%);border-radius:50%;pointer-events:none;}
    .tracker-glow2{position:absolute;bottom:-100px;left:-100px;width:400px;height:400px;background:radial-gradient(circle,rgba(200,16,46,0.08),transparent 65%);border-radius:50%;pointer-events:none;}
    .tracker-grid{display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:center;position:relative;z-index:1;}
    .tracker-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(201,151,58,0.12);border:1px solid rgba(201,151,58,0.3);border-radius:100px;padding:0.35rem 1rem;margin-bottom:1.5rem;font-size:0.75rem;font-weight:600;color:#C9973A;font-family:'DM Mono',monospace;letter-spacing:0.06em;text-transform:uppercase;}
    .tracker-title{font-family:'Playfair Display',serif;font-size:clamp(1.8rem,3vw,2.5rem);font-weight:700;line-height:1.2;color:#fff;margin-bottom:1rem;}
    .tracker-title em{font-style:italic;color:#C9973A;}
    .tracker-desc{font-size:0.975rem;color:rgba(255,255,255,0.65);line-height:1.8;margin-bottom:2rem;}
    .tracker-features{display:flex;flex-direction:column;gap:0.65rem;margin-bottom:2.25rem;list-style:none;}
    .tracker-feature{display:flex;align-items:center;gap:0.75rem;font-size:0.875rem;color:rgba(255,255,255,0.82);}
    .tf-check{width:20px;height:20px;border-radius:50%;flex-shrink:0;background:rgba(201,151,58,0.15);border:1px solid rgba(201,151,58,0.4);display:flex;align-items:center;justify-content:center;font-size:0.6rem;color:#C9973A;}
    .tracker-actions{display:flex;flex-wrap:wrap;gap:1rem;}
    .tracker-mockup{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:1.5rem;}
    .mockup-bar{display:flex;align-items:center;gap:6px;margin-bottom:1.25rem;}
    .mockup-dot{width:10px;height:10px;border-radius:50%;}
    .mockup-url{font-family:'DM Mono',monospace;font-size:0.7rem;color:rgba(255,255,255,0.3);margin-left:8px;}
    .mockup-stats{display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;margin-bottom:0.75rem;}
    .mockup-stat{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);border-radius:10px;padding:1rem;}
    .ms-label{font-size:0.68rem;color:rgba(255,255,255,0.4);font-family:'DM Mono',monospace;margin-bottom:4px;}
    .ms-value{font-family:'DM Mono',monospace;font-size:1.3rem;font-weight:500;}
    .mockup-chart{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:10px;padding:1rem;}
    .chart-label{font-size:0.68rem;color:rgba(255,255,255,0.35);font-family:'DM Mono',monospace;margin-bottom:0.75rem;}
    .chart-bars{display:flex;align-items:flex-end;gap:5px;height:72px;}
    .c-bar{flex:1;border-radius:3px 3px 0 0;}
    .mockup-tip{margin-top:0.75rem;padding:0.75rem 1rem;background:rgba(201,151,58,0.08);border:1px solid rgba(201,151,58,0.2);border-radius:8px;font-size:0.75rem;color:rgba(255,255,255,0.6);line-height:1.5;}
    .mockup-tip strong{color:#C9973A;}

    /* FLOATING WA */
    .wa-float{position:fixed;bottom:2rem;right:2rem;z-index:200;width:58px;height:58px;border-radius:50%;background:#25D366;display:flex;align-items:center;justify-content:center;font-size:1.5rem;text-decoration:none;box-shadow:0 4px 24px rgba(37,211,102,0.4);transition:transform 0.2s,box-shadow 0.2s;}
    .wa-float:hover{transform:scale(1.1);box-shadow:0 8px 32px rgba(37,211,102,0.5);}
    .wa-pulse{position:absolute;inset:-3px;border-radius:50%;background:rgba(37,211,102,0.25);animation:waPulse 2.5s ease-out infinite;}
    @keyframes waPulse{0%{transform:scale(1);opacity:1}100%{transform:scale(1.7);opacity:0}}

    /* DIVIDER */
    .red-divider{height:3px;background:linear-gradient(90deg,#C8102E,#C9973A,transparent);width:100%;}

    /* FOOTER */
    .footer{padding:2.5rem 6%;border-top:1px solid rgba(200,16,46,0.1);background:#FFFDF9;width:100%;overflow:hidden;}
    .footer-inner{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1.5rem;}
    .footer-brand{font-family:'Playfair Display',serif;font-size:0.95rem;color:#1A1A2E;}
    .footer-brand span{color:#C8102E;}
    .footer-links{display:flex;gap:2rem;flex-wrap:wrap;}
    .footer-links a{font-size:0.82rem;color:#4A5568;text-decoration:none;transition:color 0.2s;min-height:44px;display:inline-flex;align-items:center;}
    .footer-links a:hover{color:#C8102E;}
    .footer-note{font-size:0.72rem;color:#9AA5B4;text-align:center;margin-top:1.5rem;padding-top:1.25rem;border-top:1px solid rgba(26,26,46,0.06);}

    /* RESPONSIVE */
    @media(max-width:1023px){
      .nav-center{display:none;}
      .nav-hamburger{display:flex;}
    }
    @media(max-width:960px){
      .hero{padding:82px 5% 52px;}
      .hero-inner{grid-template-columns:1fr;gap:2rem;}
      .hero-portrait-wrap{order:-1;}
      .hero-portrait{max-width:340px;margin:0 auto;min-height:280px;aspect-ratio:3/2;}
      .hero-actions{flex-wrap:wrap;}
      .hero-trust{grid-template-columns:repeat(2,auto);}
      .hero-trust-item{border-bottom:1px solid rgba(200,16,46,0.08);}
      .hero-trust-item:nth-child(2){border-right:none;}
      .hero-trust-item:nth-child(3),.hero-trust-item:nth-child(4){border-bottom:none;}
      .about-grid{grid-template-columns:1fr;gap:3rem;}
      .tracker-grid{grid-template-columns:1fr;gap:3rem;}
      .why-grid{grid-template-columns:1fr 1fr;}
      .contact-grid{grid-template-columns:1fr;gap:3rem;}
      .form-row{grid-template-columns:1fr;}
      .moment-item{padding:0 1.25rem;}
      .moment-item:not(:last-child)::after{display:none;}
    }
    @media(max-width:600px){
      .section{padding:4rem 5%;}
      .hero{padding:80px 5% 44px;}
      .hero-portrait{max-width:260px;min-height:220px;}
      .hero h1{font-size:2.2rem;}
      .why-grid{grid-template-columns:1fr;}
      .hero-actions{flex-direction:column;}
      .hero-actions a,.hero-actions button{width:100%;justify-content:center;}
      .hero-trust{grid-template-columns:repeat(2,1fr);width:100%;}
      .hero-trust-item{border-bottom:1px solid rgba(200,16,46,0.08);}
      .tracker-actions{flex-direction:column;}
      .tracker-actions a,.tracker-actions button{width:100%;justify-content:center;}
      .moments-track{gap:0.5rem;}
      .moment-item{padding:0 0.75rem;}
      .contact-form{padding:1.5rem;}
      .footer-inner{flex-direction:column;align-items:flex-start;}
      .footer-links{gap:1rem;}
      .nav{padding:0 5%;}
    }
    @media(max-width:380px){
      .hero h1{font-size:1.95rem;}
      .trust-num{font-size:1.15rem;}
      .section-title{font-size:1.6rem;}
      .hero-trust{grid-template-columns:1fr 1fr;}
    }
  `}</style>
);

const products = [
  {icon:"🛡️",title:"Life Insurance",desc:"Protect the people who depend on you. If the unexpected happens, your family's financial future stays secure.",features:["Death benefit protection","Critical illness rider option","Affordable premiums","AIA Vitality rewards"]},
  {icon:"❤️",title:"Medical & Health",desc:"Quality healthcare without the financial stress. Cover hospitalisation, specialist visits, and major surgeries.",features:["Hospitalisation & surgical","Outpatient coverage","Cancer treatment cover","Cashless admission"]},
  {icon:"🌱",title:"Investment-Linked Plans",desc:"Grow your wealth while staying protected. Build a nest egg for retirement, education, or your next milestone.",features:["Market-linked returns","Flexible premium top-ups","Life protection included","Long-term wealth building"]},
  {icon:"🏥",title:"Critical Illness",desc:"A lump sum payout when you need it most. Covers 36 critical illnesses including cancer, heart attack, and stroke.",features:["36 critical conditions covered","Early and advanced stage","Lump sum cash benefit","No restrictions on usage"]},
  {icon:"👶",title:"Education Planning",desc:"Start saving for your child's future today. Guaranteed funds when university fees arrive — no matter what.",features:["Guaranteed maturity value","Premium waiver if parent passes","Flexible payout timing","Covers local & overseas study"]},
  {icon:"🌟",title:"Retirement Planning",desc:"Build the retirement income you deserve. Regular payouts to maintain your lifestyle long after you stop working.",features:["Guaranteed monthly income","Longevity protection","Flexible retirement age","Legacy benefit option"]},
];
const whyReasons = [
  {num:"01",title:"AIA's Regional Strength",desc:"Backed by AIA Group — Asia's largest independent publicly listed pan-Asian life insurance group, with over 100 years of experience."},
  {num:"02",title:"Advice, Not Sales",desc:"I take time to understand your life before recommending anything. The right plan depends on your stage of life, not my quota."},
  {num:"03",title:"Brunei-Based & Available",desc:"A local agent who responds quickly, speaks your language, and walks you through every claim or question — not a call centre."},
  {num:"04",title:"Ongoing Relationship",desc:"Your needs change over time. I conduct annual policy reviews to make sure your coverage keeps pace with your life."},
  {num:"05",title:"AIA Vitality Programme",desc:"Earn rewards for healthy living. Discounts, cashback, and premium reductions when you stay active and do health screenings."},
  {num:"06",title:"Paperwork Handled",desc:"From application to claims, I guide you through the process so nothing falls through the cracks at the worst possible time."},
];
const processSteps = [
  {n:"1",title:"Free Consultation",desc:"We meet over coffee, a call, or WhatsApp. I ask about your family, income, existing coverage, and what keeps you up at night."},
  {n:"2",title:"Needs Analysis",desc:"I map out your financial protection gaps using AIA's planning tools — no jargon, just a clear picture of where you stand."},
  {n:"3",title:"Personalised Recommendation",desc:"You receive a tailored proposal with 2–3 options at different price points. No pressure to decide on the spot."},
  {n:"4",title:"Application & Approval",desc:"Once you're ready, I handle the paperwork and guide you through underwriting. Most applications are approved within days."},
  {n:"5",title:"Policy Delivery & Review",desc:"I walk you through your policy document so you know exactly what you're covered for — and what to do if you ever need to claim."},
  {n:"6",title:"Annual Policy Review",desc:"Life changes. I check in every year to make sure your cover still fits — whether you've had a baby, bought a home, or changed jobs."},
];
const testimonials = [
  {
    text:"I reached out to Aqilah when I wanted to get my brother properly covered. He's young and healthy, so I wasn't sure if the timing was right — but Aqilah walked me through exactly why starting early makes a real difference in premiums and coverage. She made the whole process easy, explained every option without any pressure, and had everything sorted quickly. My brother is now protected and I have full peace of mind. Couldn't have asked for a better experience.",
    name:"Hakim Endy",
    role:"Purchased brother's protection plan · Brunei",
    initials:"HE"
  },
];
const faqs = [
  {q:"Do I really need insurance if I'm young and healthy?",a:"That's actually the best time to get insured. Premiums are lower when you're younger and healthier, and critical illness or life events don't wait until you feel ready. Many people wish they had started earlier."},
  {q:"How much coverage do I actually need?",a:"A common starting point is 10× your annual income for life coverage, plus enough medical coverage to handle major hospitalisation. During our consultation, I'll run a proper needs analysis specific to your situation."},
  {q:"Is AIA available for non-Brunei citizens?",a:"Yes. AIA Brunei serves both citizens and permanent residents. Foreign nationals working in Brunei may also be eligible depending on visa status — reach out and we'll check your eligibility."},
  {q:"Can I change or upgrade my plan later?",a:"Yes. Most plans allow you to add riders, increase coverage, or switch to a different product as your needs evolve. I review your policy annually to flag any gaps."},
  {q:"What happens if I miss a premium payment?",a:"AIA provides a grace period (typically 30 days). If you're facing financial difficulty, there are options like premium holidays or policy loans on some plans. Always contact me before a policy lapses."},
  {q:"How long does a claim take?",a:"Straightforward claims are typically processed within 14 working days once all documents are submitted. I assist you with the paperwork to make sure there are no unnecessary delays."},
];
const moments = [
  {icon:"🎓",stage:"Graduate",need:"Income protection"},
  {icon:"💍",stage:"Married",need:"Life cover"},
  {icon:"👶",stage:"New Baby",need:"Family protection"},
  {icon:"🏠",stage:"Homeowner",need:"Mortgage protection"},
  {icon:"📈",stage:"Business Owner",need:"Business continuity"},
  {icon:"🌅",stage:"Retirement",need:"Retirement income"},
];

export default function App() {
  const [openFaq, setOpenFaq] = useState(null);
  const [form, setForm] = useState({name:"",phone:"",age:"",need:"",message:""});
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const scroll = useCallback((id) => {
    setTimeout(() => document.getElementById(id)?.scrollIntoView({behavior:"smooth"}), 10);
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name";
    if (!form.phone.trim()) e.phone = "Please enter your phone number";
    else if (!/^[+\d][\d\s\-(). ]{5,}$/.test(form.phone.trim())) e.phone = "Please enter a valid phone number";
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      setLoading(true);
      const msg = [
        `Hi Aqilah! I'd like to request a free consultation.`,
        ``,
        `👤 *Name:* ${form.name}`,
        `📞 *Phone:* ${form.phone}`,
        form.age     ? `🎂 *Age Range:* ${form.age}`           : null,
        form.need    ? `🛡️ *Interested In:* ${form.need}`      : null,
        form.message ? `💬 *Additional Info:* ${form.message}` : null,
      ].filter(Boolean).join("\n");
      const waUrl = `https://wa.me/6738975927?text=${encodeURIComponent(msg)}`;
      setTimeout(() => {
        setLoading(false);
        setSubmitted(true);
        window.open(waUrl, "_blank", "noopener,noreferrer");
      }, 600);
    }
  };

  const [openDropdown, setOpenDropdown] = useState(null); // 'solutions' | 'resources' | null
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerSolutions, setDrawerSolutions] = useState(false);
  const [drawerResources, setDrawerResources] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpenDropdown(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggleDropdown = (name) => setOpenDropdown(o => o === name ? null : name);
  const closeAll = () => { setOpenDropdown(null); setDrawerOpen(false); };

  const solutionsItems = [
    { icon:"🛡️", label:"Insurance Plans", desc:"Life, health, critical illness & more", id:"plans" },
    { icon:"⭐", label:"Why Choose Me", desc:"What makes my approach different", id:"why" },
    { icon:"🗂️", label:"Client Process", desc:"From first chat to full protection", id:"process" },
    { icon:"📊", label:"Finance Tracker", desc:"Free budgeting tool", href: FINANCE_URL },
  ];
  const resourcesItems = [
    { icon:"❓", label:"FAQ", desc:"Common questions answered", id:"faq" },
    { icon:"📞", label:"Contact", desc:"Get in touch today", id:"contact" },
  ];

  return (
    <>
      <SEOMeta />
      <Styles />
      <a href="#main-content" className="skip-link">Skip to main content</a>

      {/* ── NAV ── */}
      <nav className={`nav${scrolled?" scrolled":""}`} role="navigation" aria-label="Main navigation" ref={navRef}>
        <a href="#hero" className="nav-logo" onClick={e=>{e.preventDefault();scroll("hero");closeAll();}} aria-label="Siti Aqilah AIA — Home">
          <div className="nav-logo-aia" aria-hidden="true">AIA</div>
          <div className="nav-logo-name">Aqilah</div>
        </a>

        <ul className="nav-center" id="nav-menu">
          <li><a href="#hero" onClick={e=>{e.preventDefault();scroll("hero");closeAll();}}>Home</a></li>
          <li><a href="#about" onClick={e=>{e.preventDefault();scroll("about");closeAll();}}>About</a></li>
          <li className={openDropdown==="solutions"?"open":""}>
            <button onClick={()=>toggleDropdown("solutions")} aria-expanded={openDropdown==="solutions"} aria-haspopup="true">
              Solutions <span className="nav-chevron" aria-hidden="true">▼</span>
            </button>
            <div className="nav-dropdown" role="menu">
              {solutionsItems.map(item=>(
                item.href
                  ? <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className="nav-dropdown-item" role="menuitem" onClick={closeAll}>
                      <div className="nav-dropdown-icon">{item.icon}</div>
                      <div><div className="nav-dropdown-label">{item.label}</div><div className="nav-dropdown-desc">{item.desc}</div></div>
                    </a>
                  : <button key={item.label} className="nav-dropdown-item" role="menuitem" onClick={()=>{scroll(item.id);closeAll();}}>
                      <div className="nav-dropdown-icon">{item.icon}</div>
                      <div><div className="nav-dropdown-label">{item.label}</div><div className="nav-dropdown-desc">{item.desc}</div></div>
                    </button>
              ))}
            </div>
          </li>
          <li className={openDropdown==="resources"?"open":""}>
            <button onClick={()=>toggleDropdown("resources")} aria-expanded={openDropdown==="resources"} aria-haspopup="true">
              Resources <span className="nav-chevron" aria-hidden="true">▼</span>
            </button>
            <div className="nav-dropdown" role="menu">
              {resourcesItems.map(item=>(
                <button key={item.label} className="nav-dropdown-item" role="menuitem" onClick={()=>{scroll(item.id);closeAll();}}>
                  <div className="nav-dropdown-icon">{item.icon}</div>
                  <div><div className="nav-dropdown-label">{item.label}</div><div className="nav-dropdown-desc">{item.desc}</div></div>
                </button>
              ))}
            </div>
          </li>
        </ul>

        <div className="nav-right">
          <a href={FINANCE_URL} target="_blank" rel="noopener noreferrer" className="nav-btn-tracker" aria-label="Open Finance Tracker">
            📊 <span className="tracker-text-full">Finance Tracker</span><span className="tracker-text-short">Tracker</span>
          </a>
          <button className="nav-btn-consult" onClick={()=>{scroll("contact");closeAll();}}>
            <span className="consult-text-full">Free Consultation</span><span className="consult-text-short">Consult</span>
          </button>
          <button className={`nav-hamburger${drawerOpen?" open":""}`} onClick={()=>setDrawerOpen(o=>!o)} aria-expanded={drawerOpen} aria-label={drawerOpen?"Close menu":"Open menu"}>
            <span aria-hidden="true"/><span aria-hidden="true"/><span aria-hidden="true"/>
          </button>
        </div>
      </nav>

      {/* ── MOBILE DRAWER ── */}
      <div className={`nav-drawer${drawerOpen?" open":""}`} role="dialog" aria-modal="true" aria-label="Navigation menu">
        <div className="drawer-section">
          <button className="drawer-link" onClick={()=>{scroll("hero");closeAll();}}><div className="drawer-link-icon">🏠</div>Home</button>
          <button className="drawer-link" onClick={()=>{scroll("about");closeAll();}}><div className="drawer-link-icon">👤</div>About</button>
        </div>
        <div className="drawer-divider"/>
        <div className="drawer-section">
          <button className="drawer-link" style={{fontWeight:600,color:"#C8102E",fontSize:"0.75rem",letterSpacing:"0.1em",textTransform:"uppercase",minHeight:"auto",padding:"0.5rem 0.75rem"}} onClick={()=>setDrawerSolutions(o=>!o)}>
            Solutions {drawerSolutions?"▲":"▼"}
          </button>
          {drawerSolutions && solutionsItems.map(item=>(
            item.href
              ? <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className="drawer-link" onClick={closeAll}>
                  <div className="drawer-link-icon gold">{item.icon}</div>
                  <div><div style={{fontWeight:600}}>{item.label}</div><div style={{fontSize:"0.75rem",color:"#6B7280",marginTop:2}}>{item.desc}</div></div>
                </a>
              : <button key={item.label} className="drawer-link" onClick={()=>{scroll(item.id);closeAll();}}>
                  <div className="drawer-link-icon">{item.icon}</div>
                  <div><div style={{fontWeight:600}}>{item.label}</div><div style={{fontSize:"0.75rem",color:"#6B7280",marginTop:2}}>{item.desc}</div></div>
                </button>
          ))}
        </div>
        <div className="drawer-divider"/>
        <div className="drawer-section">
          <button className="drawer-link" style={{fontWeight:600,color:"#C8102E",fontSize:"0.75rem",letterSpacing:"0.1em",textTransform:"uppercase",minHeight:"auto",padding:"0.5rem 0.75rem"}} onClick={()=>setDrawerResources(o=>!o)}>
            Resources {drawerResources?"▲":"▼"}
          </button>
          {drawerResources && resourcesItems.map(item=>(
            <button key={item.label} className="drawer-link" onClick={()=>{scroll(item.id);closeAll();}}>
              <div className="drawer-link-icon">{item.icon}</div>
              <div><div style={{fontWeight:600}}>{item.label}</div><div style={{fontSize:"0.75rem",color:"#6B7280",marginTop:2}}>{item.desc}</div></div>
            </button>
          ))}
        </div>
        <div className="drawer-ctas">
          <a href={FINANCE_URL} target="_blank" rel="noopener noreferrer" className="nav-btn-tracker" style={{justifyContent:"center",minHeight:"52px",borderRadius:"12px",fontSize:"1rem"}} onClick={closeAll}>
            📊 Finance Tracker
          </a>
          <button className="btn-red" style={{width:"100%",justifyContent:"center",minHeight:"52px",borderRadius:"12px",fontSize:"1rem"}} onClick={()=>{scroll("contact");closeAll();}}>
            🛡️ Free Consultation
          </button>
        </div>
      </div>

      <main id="main-content">
        {/* HERO */}
        <section className="hero" id="hero" aria-labelledby="hero-h1">
          <div className="hero-bg-shape" aria-hidden="true"/>
          <div className="hero-bg-shape2" aria-hidden="true"/>
          <div className="hero-inner">
            <div>
              <div className="hero-eyebrow" aria-hidden="true">AIA Certified Agent · Brunei</div>
              <h1 id="hero-h1">Protect What<br/><em>Matters Most</em><br/>to You</h1>
              <p className="hero-sub">Life changes fast. The right insurance means your family, health, and future stay secure — no matter what happens. Let's find the plan that fits your life.</p>
              <div className="hero-actions">
                <button className="btn-red" onClick={()=>scroll("contact")}>🛡️ Book Free Consultation</button>
                <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-green" aria-label="Chat on WhatsApp (opens in new tab)">💬 WhatsApp Me</a>
              </div>
              <div className="hero-trust">
                {[["BSc","Chem Sciences"],["UBD","Graduate"],["AIA","Life Advisor"],["Brunei","Based"]].map(([n,l])=>(
                  <div className="hero-trust-item" key={l}>
                    <span className="trust-num">{n}</span>
                    <span className="trust-label">{l}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="hero-portrait-wrap">
              <div className="hero-portrait" role="img" aria-label="Illustration of Aqilah Rosneddin, AIA Life Advisor">
                <svg viewBox="0 0 300 370" fill="none" xmlns="http://www.w3.org/2000/svg"
                  style={{width:"80%",maxWidth:"240px",marginBottom:"0.25rem"}}>
                  <defs>
                    {/* Skin */}
                    <linearGradient id="sk" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F9E4D0"/>
                      <stop offset="100%" stopColor="#F0C9A8"/>
                    </linearGradient>
                    {/* Hijab outer — mint green */}
                    <linearGradient id="hj" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#A8D5C2"/>
                      <stop offset="100%" stopColor="#7BBFAA"/>
                    </linearGradient>
                    {/* Hijab inner frame */}
                    <linearGradient id="hjIn" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#B8DDD0"/>
                      <stop offset="100%" stopColor="#8ECAB8"/>
                    </linearGradient>
                    {/* Dress */}
                    <linearGradient id="dr" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#A8D5C2"/>
                      <stop offset="100%" stopColor="#7BBFAA"/>
                    </linearGradient>
                    {/* Background */}
                    <radialGradient id="bg" cx="50%" cy="40%" r="55%">
                      <stop offset="0%" stopColor="#E8F5F0"/>
                      <stop offset="100%" stopColor="#F0FAF6"/>
                    </radialGradient>
                    <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="8" result="blur"/>
                      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                    <filter id="soft">
                      <feGaussianBlur stdDeviation="1.2"/>
                    </filter>
                    <style>{`
                      @keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
                      @keyframes blink{0%,88%,100%{scaleY:1}93%{transform:scaleY(0.05)}}
                      @keyframes blinkAnim{0%,88%,100%{transform:scaleY(1)}93%{transform:scaleY(0.05)}}
                      @keyframes glow2{0%,100%{opacity:0.18}50%{opacity:0.32}}
                      @keyframes shimHj{0%,100%{opacity:0.25}50%{opacity:0.5}}
                      @keyframes pulse2{0%{r:54;opacity:0.12}100%{r:72;opacity:0}}
                      .fig{animation:floatY 4.5s ease-in-out infinite;}
                      .leye{animation:blinkAnim 5.5s ease-in-out infinite;transform-origin:112px 194px;}
                      .reye{animation:blinkAnim 5.5s ease-in-out infinite 0.06s;transform-origin:162px 194px;}
                      .hjshine{animation:shimHj 4s ease-in-out infinite;}
                      .glowing{animation:glow2 3s ease-in-out infinite;}
                      .pr{animation:pulse2 2.8s ease-out infinite;}
                    `}</style>
                  </defs>

                  {/* BG */}
                  <rect width="300" height="370" fill="url(#bg)"/>

                  {/* Soft glow behind figure */}
                  <ellipse className="glowing" cx="150" cy="175" rx="100" ry="115" fill="#A8D5C2" opacity="0.18"/>
                  <circle className="pr" cx="150" cy="170" r="54" fill="none" stroke="#7BBFAA" strokeWidth="2"/>

                  {/* ── FLOATING GROUP ── */}
                  <g className="fig">

                    {/* ── DRESS / BODY ── */}
                    {/* Shoulders + torso */}
                    <path d="M42 370 Q42 295 65 272 Q90 255 150 250 Q210 255 235 272 Q258 295 258 370Z" fill="url(#dr)"/>
                    {/* Lace texture overlay on dress */}
                    {[0,1,2,3,4,5,6].map(i=>(
                      <ellipse key={i} cx={90+i*18} cy={295} rx="7" ry="10" fill="none" stroke="#fff" strokeWidth="0.8" opacity="0.35"/>
                    ))}
                    {[0,1,2,3,4,5].map(i=>(
                      <ellipse key={i} cx={99+i*18} cy={312} rx="7" ry="9" fill="none" stroke="#fff" strokeWidth="0.8" opacity="0.25"/>
                    ))}
                    {[0,1,2,3,4,5,6].map(i=>(
                      <ellipse key={i} cx={90+i*18} cy={328} rx="6" ry="8" fill="none" stroke="#fff" strokeWidth="0.7" opacity="0.2"/>
                    ))}
                    {/* Dress neckline */}
                    <path d="M120 254 Q150 268 180 254" fill="none" stroke="#8ECAB8" strokeWidth="1.5" strokeLinecap="round"/>

                    {/* ── BROOCH ── */}
                    <circle cx="150" cy="278" r="9" fill="#D4AF6A"/>
                    <circle cx="150" cy="278" r="6" fill="#C9973A"/>
                    <circle cx="150" cy="278" r="3" fill="#E8C060"/>
                    {/* Brooch sparkle rays */}
                    {[0,45,90,135,180,225,270,315].map((a,i)=>(
                      <line key={i}
                        x1={150+Math.cos(a*Math.PI/180)*7}
                        y1={278+Math.sin(a*Math.PI/180)*7}
                        x2={150+Math.cos(a*Math.PI/180)*11}
                        y2={278+Math.sin(a*Math.PI/180)*11}
                        stroke="#D4AF6A" strokeWidth="1" opacity="0.7"/>
                    ))}

                    {/* ── NECK ── */}
                    <rect x="133" y="225" width="34" height="30" rx="10" fill="url(#sk)"/>
                    {/* Neck shadow */}
                    <ellipse cx="150" cy="252" rx="14" ry="4" fill="#E0B090" opacity="0.3"/>

                    {/* ── HIJAB OUTER (back & drape) ── */}
                    {/* Back volume */}
                    <ellipse cx="150" cy="148" rx="85" ry="100" fill="url(#hj)"/>
                    {/* Left side drape flowing down */}
                    <path d="M68 175 Q48 220 55 285 Q68 305 90 295 Q82 245 85 200 Q80 188 72 178Z" fill="#7BBFAA"/>
                    {/* Right side drape */}
                    <path d="M232 175 Q252 220 245 285 Q232 305 210 295 Q218 245 215 200 Q220 188 228 178Z" fill="#7BBFAA"/>
                    {/* Front hijab frame around face */}
                    <path d="M80 148 Q78 95 150 75 Q222 95 220 148 Q218 200 195 225 Q172 245 150 248 Q128 245 105 225 Q82 200 80 148Z" fill="url(#hjIn)"/>
                    {/* Chin wrap */}
                    <path d="M95 195 Q95 245 105 252 Q128 265 150 266 Q172 265 195 252 Q205 245 205 195 Q180 210 150 212 Q120 210 95 195Z" fill="#7BBFAA"/>
                    {/* Hijab fold line under chin */}
                    <path d="M108 218 Q150 228 192 218" stroke="#8ECAB8" strokeWidth="1.2" fill="none" opacity="0.6" strokeLinecap="round"/>
                    {/* Hijab highlight shimmer */}
                    <ellipse className="hjshine" cx="138" cy="102" rx="28" ry="14" fill="#fff" opacity="0.28"/>
                    <ellipse className="hjshine" cx="165" cy="92" rx="14" ry="8" fill="#fff" opacity="0.18"/>
                    {/* Subtle hijab texture folds */}
                    <path d="M82 155 Q86 175 90 195" stroke="#6BAAA0" strokeWidth="1" fill="none" opacity="0.4" strokeLinecap="round"/>
                    <path d="M218 155 Q214 175 210 195" stroke="#6BAAA0" strokeWidth="1" fill="none" opacity="0.4" strokeLinecap="round"/>
                    <path d="M88 200 Q92 225 95 248" stroke="#6BAAA0" strokeWidth="0.8" fill="none" opacity="0.3" strokeLinecap="round"/>
                    <path d="M212 200 Q208 225 205 248" stroke="#6BAAA0" strokeWidth="0.8" fill="none" opacity="0.3" strokeLinecap="round"/>

                    {/* ── FACE ── */}
                    <ellipse cx="150" cy="172" rx="55" ry="60" fill="url(#sk)"/>
                    {/* Soft jaw shadow */}
                    <ellipse cx="150" cy="220" rx="40" ry="10" fill="#E0B090" opacity="0.2"/>
                    {/* Temple shadows */}
                    <ellipse cx="100" cy="172" rx="12" ry="30" fill="#E8C0A0" opacity="0.22"/>
                    <ellipse cx="200" cy="172" rx="12" ry="30" fill="#E8C0A0" opacity="0.22"/>

                    {/* ── EYEBROWS — natural arched ── */}
                    <path d="M107 152 Q116 146 130 149" stroke="#5C3B20" strokeWidth="2.8" strokeLinecap="round" fill="none"/>
                    <path d="M170 149 Q184 146 193 152" stroke="#5C3B20" strokeWidth="2.8" strokeLinecap="round" fill="none"/>

                    {/* ── EYES ── */}
                    {/* Left eye */}
                    <g className="leye">
                      <ellipse cx="119" cy="168" rx="14" ry="9" fill="#fff"/>
                      <ellipse cx="120" cy="168" rx="8" ry="8" fill="#3A2010"/>
                      <ellipse cx="121" cy="168" rx="4.5" ry="4.5" fill="#1A0800"/>
                      <ellipse cx="124" cy="164" rx="2" ry="2" fill="#fff"/>
                      <ellipse cx="122" cy="169" rx="0.8" ry="0.8" fill="#fff" opacity="0.6"/>
                      {/* Upper lid */}
                      <path d="M105 164 Q119 158 133 164" stroke="#3A2010" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                      {/* Lash line */}
                      <path d="M105 164 Q119 162 133 164" stroke="#1A0800" strokeWidth="1.2" fill="none" opacity="0.5"/>
                      {/* Lower lid */}
                      <path d="M106 170 Q119 175 132 170" stroke="#C89090" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.5"/>
                    </g>
                    {/* Right eye */}
                    <g className="reye">
                      <ellipse cx="181" cy="168" rx="14" ry="9" fill="#fff"/>
                      <ellipse cx="180" cy="168" rx="8" ry="8" fill="#3A2010"/>
                      <ellipse cx="181" cy="168" rx="4.5" ry="4.5" fill="#1A0800"/>
                      <ellipse cx="184" cy="164" rx="2" ry="2" fill="#fff"/>
                      <ellipse cx="182" cy="169" rx="0.8" ry="0.8" fill="#fff" opacity="0.6"/>
                      {/* Upper lid */}
                      <path d="M167 164 Q181 158 195 164" stroke="#3A2010" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                      <path d="M167 164 Q181 162 195 164" stroke="#1A0800" strokeWidth="1.2" fill="none" opacity="0.5"/>
                      <path d="M168 170 Q181 175 194 170" stroke="#C89090" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.5"/>
                    </g>

                    {/* ── NOSE ── */}
                    <path d="M146 178 Q150 190 154 178" stroke="#D4A080" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                    <path d="M138 192 Q142 197 150 198 Q158 197 162 192" stroke="#D4A080" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
                    <circle cx="141" cy="196" r="2.5" fill="#D4A080" opacity="0.4"/>
                    <circle cx="159" cy="196" r="2.5" fill="#D4A080" opacity="0.4"/>

                    {/* ── LIPS ── natural pink */}
                    {/* Upper lip */}
                    <path d="M130 207 Q138 202 150 205 Q162 202 170 207 Q162 210 150 208 Q138 210 130 207Z" fill="#E8908A"/>
                    {/* Lower lip */}
                    <path d="M130 207 Q140 220 150 221 Q160 220 170 207 Q162 210 150 208 Q138 210 130 207Z" fill="#F0A0A0"/>
                    {/* Lip line */}
                    <path d="M130 207 Q138 202 150 205 Q162 202 170 207" stroke="#C87878" strokeWidth="0.8" fill="none"/>
                    {/* Lip shine */}
                    <ellipse cx="147" cy="213" rx="8" ry="3.5" fill="#fff" opacity="0.22"/>

                    {/* ── BLUSH ── */}
                    <ellipse cx="100" cy="190" rx="16" ry="10" fill="#F4A0A0" opacity="0.28"/>
                    <ellipse cx="200" cy="190" rx="16" ry="10" fill="#F4A0A0" opacity="0.28"/>

                    {/* ── EYELINER / SUBTLE MAKEUP ── */}
                    <path d="M105 164 Q103 166 104 169" stroke="#3A2010" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6"/>
                    <path d="M133 164 Q135 162 136 160" stroke="#3A2010" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6"/>
                    <path d="M167 164 Q165 162 164 160" stroke="#3A2010" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6"/>
                    <path d="M195 164 Q197 166 196 169" stroke="#3A2010" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6"/>

                  </g>{/* end float-group */}

                  {/* Ground shadow */}
                  <ellipse cx="150" cy="365" rx="70" ry="5" fill="#7BBFAA" opacity="0.12"/>
                </svg>

                <div className="portrait-badge">
                  <div className="badge-name">Aqilah Rosneddin</div>
                  <div className="badge-title">AIA Life Advisor</div>
                  <div className="badge-aia">AIA · Brunei Darussalam</div>
                </div>
              </div>
          </div>
        </section>

        {/* LIFE MOMENTS */}
        <div className="moments-strip" aria-label="Insurance needs at every life stage">
          <p className="moments-label" aria-hidden="true">Insurance matters at every stage of life</p>
          <div className="moments-track">
            {moments.map((m,i)=>(
              <div className="moment-item" key={i}>
                <div className="moment-icon" aria-hidden="true">{m.icon}</div>
                <div className="moment-stage">{m.stage}</div>
                <div className="moment-need">{m.need}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="red-divider" aria-hidden="true"/>

        {/* ABOUT */}
        <section className="section section-ivory" id="about" aria-labelledby="about-h2">
          <span className="eyebrow">About Me</span>
          <h2 className="section-title" id="about-h2">A Trusted Advisor,<br/>Not Just an <em>Agent</em></h2>
          <div className="about-grid">
            <div className="about-body">
              <p><strong>Aqilah Rosneddin</strong> is an AIA Life Advisor based in Brunei. A BSc Chemical Sciences graduate from Universiti Brunei Darussalam, she brings a analytical mindset and a genuine passion for helping people make smart financial decisions.</p>
              <p>She believes insurance is one of the most important decisions a person can make — yet most people put it off because nobody has taken the time to explain it clearly. Her approach is simple: listen first, understand your situation, then recommend what genuinely fits your life and budget.</p>
              <p>Whether you're just starting out, growing your family, or planning for the future — Aqilah is here to guide you through every step with honesty and care.</p>
              <div className="creds">
                {[
                  "AIA Life Advisor · Brunei",
                  "BSc Chemical Sciences · Universiti Brunei Darussalam",
                  "Licensed by Monetary Authority of Brunei Darussalam",
                ].map(c=>(
                  <div className="cred-item" key={c}><span className="cred-icon" aria-hidden="true">✓</span><span>{c}</span></div>
                ))}
              </div>
            </div>
            <div>
              <div className="about-stats">
                {[["BSc","Chemical Sciences"],["UBD","2020–2024"],["AIA","Life Advisor"],["Brunei","Based & Licensed"]].map(([n,l])=>(
                  <div className="about-stat" key={l}>
                    <div className="stat-num">{n}</div>
                    <div className="stat-label">{l}</div>
                  </div>
                ))}
              </div>
              <blockquote style={{marginTop:"1.5rem",padding:"1.5rem",background:"#FFF5F5",borderRadius:"14px",border:"1px solid rgba(200,16,46,0.1)"}}>
                <p style={{fontSize:"0.875rem",color:"#4A5568",lineHeight:1.75,fontStyle:"italic"}}>"The best time to get insured is when you don't need it yet. Because when you do need it, it's too late to apply."</p>
                <footer style={{fontSize:"0.78rem",color:"#C8102E",fontWeight:600,marginTop:"0.5rem"}}>— A truth Aqilah shares with every new client</footer>
              </blockquote>
            </div>
          </div>
        </section>

        {/* PLANS */}
        <section className="section section-blush" id="plans" aria-labelledby="plans-h2">
          <span className="eyebrow">Insurance Plans</span>
          <h2 className="section-title" id="plans-h2">Coverage for Every<br/><em>Stage of Life</em></h2>
          <p className="section-sub">AIA offers Brunei's most comprehensive range of life, health, and savings products. Together we'll find the right combination for you.</p>
          <div className="products-grid">
            {products.map(p=>(
              <article className="product-card" key={p.title}>
                <div className="product-icon" aria-hidden="true">{p.icon}</div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <ul className="product-features">
                  {p.features.map(f=>(
                    <li className="product-feature" key={f}><div className="pf-dot" aria-hidden="true"/><span>{f}</span></li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div style={{textAlign:"center",marginTop:"3rem"}}>
            <p style={{fontSize:"0.875rem",color:"#4A5568",marginBottom:"1.25rem"}}>Not sure which plan is right for you? Let's figure it out together — no obligation.</p>
            <button className="btn-red" onClick={()=>scroll("contact")}>Book a Free Needs Analysis</button>
          </div>
        </section>

        {/* WHY ME */}
        <section className="section section-ivory" id="why" aria-labelledby="why-h2">
          <span className="eyebrow">Why Work With Me</span>
          <h2 className="section-title" id="why-h2">What Makes the<br/><em>Difference</em></h2>
          <p className="section-sub">Anyone can sell you a policy. The job is making sure it actually protects you when the time comes.</p>
          <div className="why-grid">
            {whyReasons.map(w=>(
              <div className="why-card" key={w.num}>
                <div className="why-num" aria-hidden="true">{w.num}</div>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PROCESS */}
        <section className="section section-blush" id="process" aria-labelledby="process-h2">
          <span className="eyebrow">How It Works</span>
          <h2 className="section-title" id="process-h2">From First Chat to<br/><em>Full Protection</em></h2>
          <p className="section-sub">A straightforward six-step process designed to make you feel informed and confident at every stage.</p>
          <ol className="process-list">
            {processSteps.map(s=>(
              <li className="process-item" key={s.n}>
                <div className="process-bullet" aria-hidden="true">{s.n}</div>
                <div className="process-body">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* TESTIMONIALS */}
        <section className="section section-dark" id="testimonials" aria-labelledby="test-h2">
          <span className="eyebrow" style={{color:"rgba(200,16,46,0.8)"}}>Client Feedback</span>
          <h2 className="section-title light" id="test-h2">A Word From<br/>a <em style={{color:"#C8102E"}}>Real Client</em></h2>
          <p className="section-sub light">Genuine feedback from someone who trusted Aqilah with what matters most.</p>
          <div className="testimonials-grid">
            {testimonials.map(t=>(
              <article className="testimonial-card" key={t.name}>
                <div className="t-stars" aria-label="5 out of 5 stars">★★★★★</div>
                <p className="t-text">"{t.text}"</p>
                <footer className="t-author">
                  <div className="t-avatar" aria-hidden="true">{t.initials}</div>
                  <div><div className="t-name">{t.name}</div><div className="t-role">{t.role}</div></div>
                </footer>
              </article>
            ))}
          </div>
        </section>

        {/* FINANCE TRACKER */}
        <section className="section tracker-section" id="tracker" aria-labelledby="tracker-h2">
          <div className="tracker-glow" aria-hidden="true"/>
          <div className="tracker-glow2" aria-hidden="true"/>
          <div className="tracker-grid">
            <div>
              <div className="tracker-badge">★ Free Tool</div>
              <h2 className="tracker-title" id="tracker-h2">Track Your Finances,<br/>Plan for What <em>Matters</em></h2>
              <p className="tracker-desc">Good insurance starts with knowing your numbers. This free personal finance tracker helps you understand your income, spending, and savings — so we can recommend coverage that fits your budget.</p>
              <ul className="tracker-features">
                {["Track income & expenses in one place","Monitor savings goals month by month","Visualise your budget with clear charts","Identify how much you can set aside for premiums","Mobile-friendly — use it anywhere","Free to use, no sign-up required"].map(f=>(
                  <li className="tracker-feature" key={f}><div className="tf-check" aria-hidden="true">✓</div><span>{f}</span></li>
                ))}
              </ul>
              <div className="tracker-actions">
                <a href={FINANCE_URL} target="_blank" rel="noopener noreferrer" className="btn-gold" aria-label="Open Finance Tracker app (opens in new tab)">
                  📊 Open Finance Tracker
                </a>
                <button className="btn-ghost" onClick={()=>scroll("contact")}>Get Insurance Advice →</button>
              </div>
            </div>
            <div className="tracker-mockup" aria-hidden="true" role="presentation">
              <div className="mockup-bar">
                <div className="mockup-dot" style={{background:"#FF5F57"}}/><div className="mockup-dot" style={{background:"#FFBD2E"}}/><div className="mockup-dot" style={{background:"#28CA41"}}/>
                <span className="mockup-url">bnd-tracker.netlify.app</span>
              </div>
              <div className="mockup-stats">
                {[["Monthly Income","$3,800","#C9973A"],["Total Expenses","$2,250","#C8102E"],["Savings This Month","$1,550","#28CA41"],["Savings Rate","40%","rgba(255,255,255,0.85)"]].map(([l,v,c])=>(
                  <div className="mockup-stat" key={l}><div className="ms-label">{l}</div><div className="ms-value" style={{color:c}}>{v}</div></div>
                ))}
              </div>
              <div className="mockup-chart">
                <div className="chart-label">6-Month Spending Overview</div>
                <div className="chart-bars">
                  {[55,70,60,85,75,65].map((h,i)=>(
                    <div key={i} className="c-bar" style={{height:`${h}%`,background:i===3?"#C9973A":"rgba(200,16,46,0.45)"}}/>
                  ))}
                </div>
              </div>
              <div className="mockup-tip"><strong>💡 Insurance tip:</strong> If your savings rate is above 20%, you likely have room for a solid life + medical plan without straining your budget.</div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section section-ivory" id="faq" aria-labelledby="faq-h2">
          <div style={{textAlign:"center"}}>
            <span className="eyebrow" style={{display:"inline-block"}}>FAQ</span>
            <h2 className="section-title" id="faq-h2">Questions People<br/>Always <em>Ask Me</em></h2>
            <p className="section-sub" style={{margin:"0 auto"}}>Honest answers to the questions most people are afraid to ask.</p>
          </div>
          <div className="faq-wrap">
            {faqs.map((f,i)=>(
              <div className="faq-item" key={i}>
                <button className="faq-q" onClick={()=>setOpenFaq(openFaq===i?null:i)} aria-expanded={openFaq===i} aria-controls={`faq-a-${i}`}>
                  <span>{f.q}</span>
                  <span className={`faq-chevron${openFaq===i?" open":""}`} aria-hidden="true">▼</span>
                </button>
                <div id={`faq-a-${i}`} hidden={openFaq!==i}>
                  {openFaq===i && <div className="faq-a">{f.a}</div>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section className="section section-blush" id="contact" aria-labelledby="contact-h2">
          <div className="contact-grid">
            <div className="contact-left">
              <span className="eyebrow">Get In Touch</span>
              <h2 id="contact-h2">Let's Find the Right Cover for Your Life</h2>
              <p>A 30-minute conversation is all it takes to understand your needs and point you in the right direction. No pressure, no jargon — just honest advice.</p>
              <div className="contact-channels">
                <a href={WA} target="_blank" rel="noopener noreferrer" className="channel" aria-label="Chat on WhatsApp, +673 897 5927 (opens in new tab)">
                  <div className="channel-icon" style={{background:"rgba(37,211,102,0.1)"}} aria-hidden="true">💬</div>
                  <div><div className="channel-label">WhatsApp</div><div className="channel-detail">+673 897 5927 · Fastest response</div></div>
                </a>
                <a href="tel:+6738975927" className="channel" aria-label="Call +673 897 5927">
                  <div className="channel-icon" style={{background:"rgba(200,16,46,0.08)"}} aria-hidden="true">📞</div>
                  <div><div className="channel-label">Call Me</div><div className="channel-detail">+673 897 5927 · Mon–Sat, 9am–6pm</div></div>
                </a>
                <a href="https://www.linkedin.com/in/aqilah-rosneddin" target="_blank" rel="noopener noreferrer" className="channel" aria-label="Visit LinkedIn profile (opens in new tab)">
                  <div className="channel-icon" style={{background:"rgba(0,119,181,0.08)"}} aria-hidden="true">💼</div>
                  <div><div className="channel-label">LinkedIn</div><div className="channel-detail">linkedin.com/in/aqilah-rosneddin</div></div>
                </a>
              </div>
            </div>
            <div className="contact-form">
              {submitted ? (
                <div style={{textAlign:"center",padding:"3rem 1rem"}} role="alert" aria-live="polite">
                  <div style={{fontSize:"3rem",marginBottom:"1rem"}} aria-hidden="true">💬</div>
                  <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"1.3rem",marginBottom:"0.75rem",color:"#1A1A2E"}}>Opening WhatsApp...</h3>
                  <p style={{color:"#4A5568",fontSize:"0.9rem",lineHeight:1.75,marginBottom:"1.5rem"}}>Your details are being sent to Siti Aqilah via WhatsApp. If it didn't open automatically, tap the button below.</p>
                  <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-green" style={{display:"inline-flex"}}>💬 Open WhatsApp</a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate aria-label="Request a free consultation">
                  <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"1.2rem",color:"#1A1A2E",marginBottom:"0.25rem"}}>Request a Free Consultation</h3>
                  <p style={{fontSize:"0.82rem",color:"#4A5568",marginBottom:"1.75rem"}}>Tell me a little about yourself and I'll prepare before we speak.</p>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="f-name">Your Name *</label>
                      <input id="f-name" type="text" placeholder="Full name" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} aria-required="true" aria-invalid={!!errors.name} aria-describedby={errors.name?"f-name-err":undefined} autoComplete="name"/>
                      {errors.name && <span id="f-name-err" className="form-error" role="alert">{errors.name}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="f-phone">Phone / WhatsApp *</label>
                      <input id="f-phone" type="tel" placeholder="+673 XXX XXXX" value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} aria-required="true" aria-invalid={!!errors.phone} aria-describedby={errors.phone?"f-phone-err":undefined} autoComplete="tel"/>
                      {errors.phone && <span id="f-phone-err" className="form-error" role="alert">{errors.phone}</span>}
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="f-age">Age Range</label>
                      <select id="f-age" value={form.age} onChange={e=>setForm(f=>({...f,age:e.target.value}))}>
                        <option value="">Select age</option>
                        {["18–24","25–34","35–44","45–54","55–64","65+"].map(a=><option key={a} value={a}>{a}</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="f-need">I'm Interested In</label>
                      <select id="f-need" value={form.need} onChange={e=>setForm(f=>({...f,need:e.target.value}))}>
                        <option value="">Select plan type</option>
                        {["Life Insurance","Medical & Health","Investment-Linked","Critical Illness","Education Planning","Retirement Planning","Not Sure Yet"].map(n=><option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="f-msg">Anything else I should know?</label>
                    <textarea id="f-msg" placeholder="E.g. I have a young child, I'm self-employed, I already have some coverage but want to review it..." value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))}/>
                  </div>
                  <button type="submit" className="btn-red" style={{width:"100%",justifyContent:"center",opacity:loading?0.75:1,cursor:loading?"not-allowed":"pointer"}} disabled={loading}>
                    {loading ? "Opening WhatsApp..." : "Send My Details →"}
                  </button>
                  <p style={{fontSize:"0.7rem",color:"#9AA5B4",textAlign:"center",marginTop:"0.75rem"}}>Your details are kept private and used only to prepare for our consultation.</p>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer" role="contentinfo">
        <div className="footer-inner">
          <div className="footer-brand"><strong><span>AIA</span> · Aqilah Rosneddin</strong> — Life Advisor, Brunei Darussalam</div>
          <nav className="footer-links" aria-label="Footer links">
            {[["About","#about"],["Plans","#plans"],["Finance Tracker",FINANCE_URL],["Process","#process"],["FAQ","#faq"],["Contact","#contact"]].map(([l,h])=>(
              <a href={h} key={l} target={h.startsWith("http")?"_blank":undefined} rel={h.startsWith("http")?"noopener noreferrer":undefined}>{l}</a>
            ))}
          </nav>
        </div>
        <p className="footer-note">
          © {new Date().getFullYear()} Aqilah Rosneddin · AIA Life Advisor · Licensed by the Monetary Authority of Brunei Darussalam · This website is for informational purposes only. Policy terms and conditions apply.
        </p>
      </footer>

      {/* Floating WhatsApp */}
      <a href={WA} target="_blank" rel="noopener noreferrer" className="wa-float" aria-label="Chat on WhatsApp with Siti Aqilah (opens in new tab)">
        <div className="wa-pulse" aria-hidden="true"/>
        <span style={{position:"relative",zIndex:1}} aria-hidden="true">💬</span>
      </a>
    </>
  );
}
