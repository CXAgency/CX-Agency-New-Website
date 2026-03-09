// ─────────────────────────────────────────────────────────────
// GUMROAD PAYMENT LINKS
// ─────────────────────────────────────────────────────────────
var STRIPE = {
  CHURN_CRUSHER:  'https://cxagency.gumroad.com/l/churn-crusher',
  AI_IN_CX:       'https://cxagency.gumroad.com/l/AI-in-CX',
  COMPLETE_CX_OS: 'https://cxagency.gumroad.com/l/Complete-CX-OS',
  REDUCE_TICKETS: 'https://cxagency.gumroad.com/l/Reduce_Support_Tickets'
};

// Wire all purchase CTAs to Stripe
document.addEventListener('DOMContentLoaded', function() {
  // Map data-stripe attributes to their payment links
  var stripeMap = {
    'churn-crusher':  STRIPE.CHURN_CRUSHER,
    'ai-in-cx':       STRIPE.AI_IN_CX,
    'complete-cx-os': STRIPE.COMPLETE_CX_OS,
    'reduce-tickets': STRIPE.REDUCE_TICKETS
  };
  document.querySelectorAll('[data-stripe]').forEach(function(el) {
    var key = el.getAttribute('data-stripe');
    if (stripeMap[key]) { el.href = stripeMap[key]; }
  });
  // Also wire class-based CTAs on product pages
  // CTAs wired per-page via data-stripe attributes or direct href in HTML
  var bpbCtas = document.querySelectorAll('.bpb-cta');
  bpbCtas.forEach(function(el) { el.href = STRIPE.COMPLETE_CX_OS; });
  var aiCtas = document.querySelectorAll('.ai-cta');
  aiCtas.forEach(function(el) { el.href = STRIPE.AI_IN_CX; });
  var ticketCtas = document.querySelectorAll('.tickets-cta');
  ticketCtas.forEach(function(el) { el.href = STRIPE.REDUCE_TICKETS; });
});

// Nav scroll effect
const nav = document.querySelector('.nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// Mobile nav
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('nav-open');
    navLinks.style.cssText = navLinks.classList.contains('nav-open')
      ? 'display:flex;flex-direction:column;position:fixed;top:68px;left:0;right:0;background:rgba(11,24,41,0.98);padding:24px 32px;gap:20px;z-index:99;backdrop-filter:blur(12px);border-bottom:1px solid rgba(201,168,76,0.1);'
      : '';
  });
}

// FAQ toggles
document.querySelectorAll('.faq-question').forEach(q => {
  q.addEventListener('click', () => {
    const answer = q.nextElementSibling;
    const isOpen = answer.classList.contains('open');
    // Close all
    document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('open'));
    document.querySelectorAll('.faq-question').forEach(q2 => q2.classList.remove('open'));
    if (!isOpen) {
      answer.classList.add('open');
      q.classList.add('open');
    }
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Stagger reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.animationDelay = (i * 0.08) + 's';
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
