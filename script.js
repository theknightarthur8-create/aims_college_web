
// Mobile menu toggle
const menuBtn = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if (menuBtn && navLinks){
  menuBtn.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });
}

// Hero slider (homepage)
const slides = document.querySelectorAll('.hero-slide');
let currentSlide = 0;
function showSlide(i){
  slides.forEach((s, idx)=> s.classList.toggle('active', idx === i));
}
if (slides.length){
  setInterval(()=>{
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, 5000);
}

// Smooth scrolling for on-page anchors
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id.length > 1){
      const el = document.querySelector(id);
      if (el){
        e.preventDefault();
        el.scrollIntoView({behavior:'smooth', block:'start'});
      }
    }
  });
});

// Year in footer
const yearEl = document.getElementById('year');
if (yearEl){ yearEl.textContent = new Date().getFullYear(); }

// Simple validators
const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/;
const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.0-9]{6,}$/;

function setError(el, msg){
  const wrap = el.closest('.form-control');
  if(!wrap) return;
  const err = wrap.querySelector('.error');
  if (err){ err.textContent = msg || ''; }
  el.setAttribute('aria-invalid', msg ? 'true' : 'false');
}

function validateRequired(el, label){
  if (!el.value.trim()){
    setError(el, `${label} is required`);
    return false;
  }
  setError(el, '');
  return true;
}

function validateEmail(el){
  if (!validateRequired(el, 'Email')) return false;
  if (!emailRegex.test(el.value.trim())){
    setError(el, 'Enter a valid email');
    return false;
  }
  setError(el, '');
  return true;
}

function validatePhone(el){
  if (!validateRequired(el, 'Phone')) return false;
  if (!phoneRegex.test(el.value.trim())){
    setError(el, 'Enter a valid phone number');
    return false;
  }
  setError(el, '');
  return true;
}

// Admissions enquiry form
const enquiryForm = document.getElementById('enquiryForm');
if (enquiryForm){
  enquiryForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = enquiryForm.querySelector('#enqName');
    const email = enquiryForm.querySelector('#enqEmail');
    const phone = enquiryForm.querySelector('#enqPhone');
    const course = enquiryForm.querySelector('#enqCourse');
    const msg = enquiryForm.querySelector('#enqMsg');
    let ok = true;
    ok &= validateRequired(name, 'Full Name');
    ok &= validateEmail(email);
    ok &= validatePhone(phone);
    ok &= validateRequired(course, 'Course');
    // message optional
    if (ok){
      enquiryForm.reset();
      const success = document.getElementById('enquirySuccess');
      if (success){ success.hidden = false; success.focus?.(); }
    }
  });
}

// Contact form
const contactForm = document.getElementById('contactForm');
if (contactForm){
  contactForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = contactForm.querySelector('#ctName');
    const email = contactForm.querySelector('#ctEmail');
    const message = contactForm.querySelector('#ctMsg');
    let ok = true;
    ok &= validateRequired(name, 'Full Name');
    ok &= validateEmail(email);
    ok &= validateRequired(message, 'Message');
    if (ok){
      contactForm.reset();
      const success = document.getElementById('contactSuccess');
      if (success){ success.hidden = false; success.focus?.(); }
    }
  });
}
