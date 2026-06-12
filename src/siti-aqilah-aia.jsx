import { useState, useCallback } from "react";

const WA = "https://wa.me/6738975927?text=Hi%20Siti%20Aqilah%2C%20I%27d%20like%20to%20find%20out%20more%20about%20AIA%20insurance.";
const FINANCE_URL = "https://bnd-tracker.netlify.app/";

const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    html{scroll-behavior:smooth;}
    body{background:#FFFDF9;color:#1A1A2E;font-family:'DM Sans',sans-serif;line-height:1.65;overflow-x:hidden;}
    :focus-visible{outline:2px solid #C8102E;outline-offset:3px;border-radius:4px;}
    .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;}
    @media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:0.01ms!important;transition-duration:0.01ms!important;}}
    .skip-link{position:absolute;top:-100px;left:1rem;background:#C8102E;color:#fff;padding:0.5rem 1rem;border-radius:0 0 8px 8px;font-weight:600;font-size:0.875rem;text-decoration:none;z-index:999;transition:top 0.2s;}
    .skip-link:focus{top:0;}

    /* NAV */
    .nav{position:fixed;top:0;left:0;right:0;z-index:100;background:rgba(255,253,249,0.96);backdrop-filter:blur(14px);border-bottom:1px solid rgba(200,16,46,0.08);display:flex;align-items:center;justify-content:space-between;padding:0 6%;height:70px;}
    .nav-logo{display:flex;align-items:center;gap:10px;text-decoration:none;}
    .nav-logo-aia{background:#C8102E;color:#fff;font-family:'DM Mono',monospace;font-size:0.8rem;font-weight:500;letter-spacing:0.1em;padding:4px 8px;border-radius:4px;}
    .nav-logo-name{font-family:'Playfair Display',serif;font-size:1.05rem;font-weight:600;color:#1A1A2E;}
    .nav-links{display:flex;gap:1.75rem;list-style:none;}
    .nav-links a{font-size:0.85rem;font-weight:500;color:#4A5568;text-decoration:none;transition:color 0.2s;min-height:44px;display:flex;align-items:center;}
    .nav-links a:hover{color:#C8102E;}
    .nav-right{display:flex;align-items:center;gap:0.75rem;flex-shrink:0;}
    .nav-tracker-link{font-size:0.78rem;font-weight:600;color:#C9973A;text-decoration:none;border:1px solid rgba(201,151,58,0.35);border-radius:7px;padding:0.4rem 0.85rem;transition:background 0.2s;white-space:nowrap;min-height:44px;display:flex;align-items:center;}
    .nav-tracker-link:hover{background:rgba(201,151,58,0.1);}
    .nav-cta{background:#C8102E;color:#fff;border:none;border-radius:8px;padding:0.6rem 1.25rem;font-size:0.875rem;font-weight:600;font-family:'DM Sans',sans-serif;cursor:pointer;transition:background 0.2s,transform 0.15s;min-height:44px;white-space:nowrap;}
    .nav-cta:hover{background:#a50d27;transform:translateY(-1px);}
    .nav-hamburger{display:none;flex-direction:column;gap:5px;cursor:pointer;border:none;background:none;padding:8px;min-width:44px;min-height:44px;align-items:center;justify-content:center;}
    .nav-hamburger span{width:22px;height:2px;background:#1A1A2E;border-radius:2px;display:block;}

    /* HERO */
    .hero{padding:110px 6% 80px;display:flex;flex-direction:column;justify-content:center;position:relative;overflow:hidden;background:#FFFDF9;}
    .hero-bg-shape{position:absolute;top:-100px;right:-150px;width:600px;height:600px;background:radial-gradient(ellipse,rgba(200,16,46,0.07) 0%,transparent 65%);border-radius:50%;pointer-events:none;}
    .hero-bg-shape2{position:absolute;bottom:-60px;left:-100px;width:450px;height:350px;background:radial-gradient(ellipse,rgba(201,151,58,0.06) 0%,transparent 65%);border-radius:50%;pointer-events:none;}
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
    .moments-strip{background:#1A1A2E;padding:2.5rem 0;overflow:hidden;}
    .moments-label{text-align:center;font-family:'DM Mono',monospace;font-size:0.72rem;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.4);margin-bottom:1.75rem;}
    .moments-track{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;padding:0 6%;gap:0;}
    .moment-item{display:flex;flex-direction:column;align-items:center;padding:0 2.25rem;text-align:center;position:relative;}
    .moment-item:not(:last-child)::after{content:'→';position:absolute;right:-8px;top:28px;color:rgba(200,16,46,0.5);font-size:1.1rem;}
    .moment-icon{width:56px;height:56px;border-radius:50%;background:rgba(200,16,46,0.15);border:1.5px solid rgba(200,16,46,0.3);display:flex;align-items:center;justify-content:center;font-size:1.4rem;margin-bottom:0.75rem;}
    .moment-stage{font-size:0.75rem;font-weight:600;color:rgba(255,255,255,0.85);}
    .moment-need{font-size:0.68rem;color:rgba(255,255,255,0.4);margin-top:2px;}

    /* PORTRAIT */
    .hero-portrait-wrap{position:relative;display:flex;justify-content:center;align-items:stretch;}
    .hero-portrait{width:100%;aspect-ratio:4/5;background:linear-gradient(160deg,#FFF0F0 0%,#FFF8E7 100%);border-radius:24px;overflow:hidden;border:1px solid rgba(200,16,46,0.12);display:flex;align-items:center;justify-content:center;flex-direction:column;gap:0.5rem;color:#4A5568;font-size:0.85rem;text-align:center;box-shadow:0 32px 80px rgba(200,16,46,0.1),0 8px 24px rgba(0,0,0,0.06);position:relative;min-height:420px;}
    .portrait-badge{position:absolute;bottom:1.25rem;left:1.25rem;right:1.25rem;background:rgba(255,253,249,0.97);backdrop-filter:blur(8px);border-radius:12px;padding:1rem 1.25rem;border:1px solid rgba(200,16,46,0.12);box-shadow:0 4px 16px rgba(0,0,0,0.08);}
    .badge-name{font-family:'Playfair Display',serif;font-size:0.95rem;font-weight:700;color:#1A1A2E;}
    .badge-title{font-size:0.75rem;color:#C8102E;font-weight:600;margin-top:2px;}
    .badge-aia{font-size:0.7rem;color:#4A5568;margin-top:2px;}
    .portrait-award{position:absolute;top:1.25rem;right:1.25rem;background:#C9973A;color:#fff;border-radius:8px;padding:0.4rem 0.75rem;font-size:0.7rem;font-weight:700;font-family:'DM Mono',monospace;letter-spacing:0.05em;}

    /* SECTIONS */
    .section{padding:6rem 6%;}
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
    .tracker-section{background:#1A1A2E;position:relative;overflow:hidden;}
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
    .red-divider{height:3px;background:linear-gradient(90deg,#C8102E,#C9973A,transparent);}

    /* FOOTER */
    .footer{padding:2.5rem 6%;border-top:1px solid rgba(200,16,46,0.1);background:#FFFDF9;}
    .footer-inner{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1.5rem;}
    .footer-brand{font-family:'Playfair Display',serif;font-size:0.95rem;color:#1A1A2E;}
    .footer-brand span{color:#C8102E;}
    .footer-links{display:flex;gap:2rem;flex-wrap:wrap;}
    .footer-links a{font-size:0.82rem;color:#4A5568;text-decoration:none;transition:color 0.2s;min-height:44px;display:inline-flex;align-items:center;}
    .footer-links a:hover{color:#C8102E;}
    .footer-note{font-size:0.72rem;color:#9AA5B4;text-align:center;margin-top:1.5rem;padding-top:1.25rem;border-top:1px solid rgba(26,26,46,0.06);}

    /* RESPONSIVE */
    @media(max-width:1100px){.nav-links{gap:1.25rem;}.nav-links a{font-size:0.82rem;}}
    @media(max-width:960px){
      .nav-links{display:none;}.nav-tracker-link{display:none;}.nav-hamburger{display:flex;}
      .nav-links.open{display:flex;flex-direction:column;position:fixed;top:70px;left:0;right:0;background:rgba(255,253,249,0.98);backdrop-filter:blur(14px);border-bottom:1px solid rgba(200,16,46,0.1);padding:1.5rem 6%;z-index:99;gap:0.25rem;}
      .nav-links.open a{min-height:52px;font-size:1rem;border-bottom:1px solid rgba(200,16,46,0.06);}
      .nav-links.open li:last-child a{border-bottom:none;}
      .hero{padding:90px 5% 60px;}
      .hero-inner{grid-template-columns:1fr;gap:2.5rem;}
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
      .hero{padding:84px 5% 52px;}
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
      .nav-logo-name{display:none;}
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
  {text:"Siti Aqilah made the whole process feel so easy. She explained every detail patiently and never rushed me into a decision. My family is now fully covered and I finally have peace of mind.",name:"Nur Hafizah",role:"Teacher, Brunei Muara",initials:"NH"},
  {text:"I came to her knowing nothing about insurance. She asked the right questions, identified exactly what I needed, and found a plan that fit my budget perfectly. Highly recommend her.",name:"Khairul Anwar",role:"SME Owner, Tutong",initials:"KA"},
  {text:"When I had to make a claim after my hospitalisation, Siti Aqilah was there guiding me through every step. That support when you actually need it — that's what separates a good agent from the rest.",name:"Salbiah Hj Ramli",role:"Government Officer, Belait",initials:"SR"},
  {text:"I've been her client for 4 years now. Every year she reviews my policy and adjusts it as my life changes. That ongoing care means more than the initial sale ever could.",name:"Faizal Pg Damit",role:"Engineer, Brunei Muara",initials:"FD"},
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
  const [navOpen, setNavOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [form, setForm] = useState({name:"",phone:"",age:"",need:"",message:""});
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const scroll = useCallback((id) => {
    setNavOpen(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({behavior:"smooth"}), 10);
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name";
    if (!form.phone.trim()) e.phone = "Please enter your phone number";
    else if (!/^[\d\s+\-(). ]{6,}$/.test(form.phone)) e.phone = "Please enter a valid phone number";
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) setSubmitted(true);
  };

  const navItems = [["Home","hero"],["About","about"],["Plans","plans"],["Why Me","why"],["Process","process"],["Finance Tracker","tracker"],["FAQ","faq"],["Contact","contact"]];

  return (
    <>
      <Styles />
      <a href="#main-content" className="skip-link">Skip to main content</a>

      {/* NAV */}
      <nav className="nav" role="navigation" aria-label="Main navigation">
        <a href="#hero" className="nav-logo" onClick={e=>{e.preventDefault();scroll("hero");}} aria-label="Siti Aqilah AIA — Home">
          <div className="nav-logo-aia" aria-hidden="true">AIA</div>
          <div className="nav-logo-name">Siti Aqilah</div>
        </a>
        <ul className={`nav-links${navOpen?" open":""}`} id="nav-menu" role="list">
          {navItems.map(([label,id])=>(
            <li key={id}><a href={`#${id}`} onClick={e=>{e.preventDefault();scroll(id);}}>{label}</a></li>
          ))}
        </ul>
        <div className="nav-right">
          <a href={FINANCE_URL} target="_blank" rel="noopener noreferrer" className="nav-tracker-link" aria-label="Open Finance Tracker (opens in new tab)">
            📊 Finance Tracker
          </a>
          <button className="nav-cta" onClick={()=>scroll("contact")}>Free Quote</button>
          <button className="nav-hamburger" onClick={()=>setNavOpen(o=>!o)} aria-expanded={navOpen} aria-controls="nav-menu" aria-label={navOpen?"Close menu":"Open menu"}>
            <span aria-hidden="true"/><span aria-hidden="true"/><span aria-hidden="true"/>
          </button>
        </div>
      </nav>

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
                <a href={FINANCE_URL} target="_blank" rel="noopener noreferrer" className="btn-outline" aria-label="Open Finance Tracker (opens in new tab)">📊 Finance Tracker</a>
              </div>
              <div className="hero-trust">
                {[["8+","Years with AIA"],["300+","Families protected"],["98%","Client retention"],["BND 2M+","Claims supported"]].map(([n,l])=>(
                  <div className="hero-trust-item" key={l}>
                    <span className="trust-num">{n}</span>
                    <span className="trust-label">{l}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="hero-portrait-wrap">
              <div className="hero-portrait" role="img" aria-label="Portrait of Siti Aqilah, AIA Life Planner">
                <div style={{fontSize:"5rem"}} aria-hidden="true">👩‍💼</div>
                <div style={{fontSize:"0.82rem",color:"#9AA5B4"}}>(Replace with professional photo)</div>
                <div className="portrait-award">★ MDRT Member</div>
                <div className="portrait-badge">
                  <div className="badge-name">Siti Aqilah binti Awg Rosneddin</div>
                  <div className="badge-title">AIA Life Planner</div>
                  <div className="badge-aia">AIA Brunei Darussalam · Since 2016</div>
                </div>
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
              <p><strong>Siti Aqilah binti Awg Rosneddin</strong> is a certified AIA Life Planner based in Brunei Darussalam. For over 8 years, she has helped hundreds of families, young professionals, and business owners build financial safety nets that hold up when life gets hard.</p>
              <p>Insurance isn't something people enjoy thinking about — she knows that. Her job is to make it simple, honest, and personal. She won't recommend what's most profitable; she'll recommend what genuinely makes sense for your situation.</p>
              <p>Whether you're a fresh graduate buying your first policy, a parent protecting your children's future, or a business owner securing your livelihood — she's here to guide you every step of the way.</p>
              <div className="creds">
                {["AIA Certified Life Planner","Million Dollar Round Table (MDRT) Member","AIA Vitality Certified Advisor","Brunei Financial Planning Association Member","Licensed by Monetary Authority of Brunei Darussalam"].map(c=>(
                  <div className="cred-item" key={c}><span className="cred-icon" aria-hidden="true">✓</span><span>{c}</span></div>
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
              <blockquote style={{marginTop:"1.5rem",padding:"1.5rem",background:"#FFF5F5",borderRadius:"14px",border:"1px solid rgba(200,16,46,0.1)"}}>
                <p style={{fontSize:"0.875rem",color:"#4A5568",lineHeight:1.75,fontStyle:"italic"}}>"The best time to buy insurance is when you don't need it. Because when you do need it, it's too late to buy it."</p>
                <footer style={{fontSize:"0.78rem",color:"#C8102E",fontWeight:600,marginTop:"0.5rem"}}>— A truth every client eventually understands</footer>
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
          <span className="eyebrow" style={{color:"rgba(200,16,46,0.8)"}}>Testimonials</span>
          <h2 className="section-title light" id="test-h2">What Clients Say<br/>After the <em style={{color:"#C8102E"}}>Claim</em></h2>
          <p className="section-sub light">The real test of insurance — and an agent — is what happens when something goes wrong.</p>
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
                <a href="mailto:sitiaqilah@aia.com.bn" className="channel" aria-label="Email sitiaqilah@aia.com.bn">
                  <div className="channel-icon" style={{background:"rgba(74,85,104,0.08)"}} aria-hidden="true">✉️</div>
                  <div><div className="channel-label">Email</div><div className="channel-detail">sitiaqilah@aia.com.bn</div></div>
                </a>
                <a href="https://facebook.com/sitiaqilah.aia" target="_blank" rel="noopener noreferrer" className="channel" aria-label="Visit Facebook page (opens in new tab)">
                  <div className="channel-icon" style={{background:"rgba(24,119,242,0.08)"}} aria-hidden="true">📘</div>
                  <div><div className="channel-label">Facebook</div><div className="channel-detail">fb.com/sitiaqilah.aia</div></div>
                </a>
              </div>
            </div>
            <div className="contact-form">
              {submitted ? (
                <div style={{textAlign:"center",padding:"3rem 1rem"}} role="alert" aria-live="polite">
                  <div style={{fontSize:"3rem",marginBottom:"1rem"}} aria-hidden="true">🛡️</div>
                  <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"1.3rem",marginBottom:"0.75rem",color:"#1A1A2E"}}>Message Received!</h3>
                  <p style={{color:"#4A5568",fontSize:"0.9rem",lineHeight:1.75}}>I'll be in touch within a few hours. For a faster response, send me a WhatsApp message and I'll reply as soon as I can.</p>
                  <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-green" style={{marginTop:"1.5rem",display:"inline-flex"}}>💬 WhatsApp Me Now</a>
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
                  <button type="submit" className="btn-red" style={{width:"100%",justifyContent:"center"}}>Send My Details →</button>
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
          <div className="footer-brand"><strong><span>AIA</span> · Siti Aqilah</strong> — Life Planner, Brunei Darussalam</div>
          <nav className="footer-links" aria-label="Footer links">
            {[["About","#about"],["Plans","#plans"],["Finance Tracker",FINANCE_URL],["Process","#process"],["FAQ","#faq"],["Contact","#contact"]].map(([l,h])=>(
              <a href={h} key={l} target={h.startsWith("http")?"_blank":undefined} rel={h.startsWith("http")?"noopener noreferrer":undefined}>{l}</a>
            ))}
          </nav>
        </div>
        <p className="footer-note">
          © {new Date().getFullYear()} Siti Aqilah binti Awg Rosneddin · Authorised AIA Life Planner · Licensed by the Monetary Authority of Brunei Darussalam · This website is for informational purposes only. Policy terms and conditions apply.
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
