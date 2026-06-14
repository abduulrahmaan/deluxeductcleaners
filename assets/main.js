// =====================================================================
// Deluxe Duct Cleaners — Shared site JS
// Used by both alberta.html and ontario.html
// =====================================================================

// ===== Smooth scroll to sections (CSS scroll-margin-top handles nav offset) =====
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  if (id === 'booking') {
    setTimeout(() => {
      const f = document.getElementById('fname');
      if (f) f.focus({ preventScroll: true });
    }, 600);
  }
}

// ===== Mobile side menu =====
function openSM() {
  document.getElementById('sidemenu').classList.add('open');
  document.getElementById('overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeSM() {
  document.getElementById('sidemenu').classList.remove('open');
  document.getElementById('overlay').classList.remove('open');
  document.body.style.overflow = '';
}
// Always closes the side menu first, THEN scrolls — guarantees the menu closes
// even if the scroll target lookup has an issue.
function navigateMobile(id) {
  closeSM();
  setTimeout(() => scrollToSection(id), 320);
}

// ===== Booking form -> WhatsApp handoff =====
function handleBook(buttonElement) {
  // Business WhatsApp number
  const whatsappNumber = "14378899124";

  // Grab all the field values
  const name = document.getElementById('fname').value.trim();
  const phone = document.getElementById('fphone').value.trim();
  const email = document.getElementById('femail').value.trim();
  const service = document.getElementById('fservice').value;
  const date = document.getElementById('fdate').value;
  const notes = document.getElementById('fnotes').value.trim() || "None provided";

  // Basic validation check
  if (!name || !phone || !email || !service || !date) {
    alert('Please fill out all required fields before submitting.');
    return;
  }

  // Construct a beautifully formatted message text
  // *Text inside asterisks* becomes bold dynamically in WhatsApp
  const message =
    `- *NEW APPOINTMENT REQUEST* 🚨\n\n` +
    `-  *Customer Name:* ${name}\n` +
    `-  *Phone Number:* ${phone}\n` +
    `-  *Email:* ${email}\n` +
    `-  *Service Needed:* ${service}\n` +
    `-  *Preferred Date:* ${date}\n\n` +
    `-  *Additional Notes:* \n${notes}`;

  // URL Encode the text string so it reads safely across browsers
  const encodedMessage = encodeURIComponent(message);

  // Generate the custom WhatsApp API endpoint link
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  // Open WhatsApp in a new browser tab or trigger native mobile app open
  window.open(whatsappUrl + `?text=${encodedMessage}`, '_blank');
}

// ===== Scroll animations — hero excluded intentionally =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vis'); observer.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.anim-fade, .anim-left, .anim-right, .anim-pop').forEach(el => observer.observe(el));

// ===== Reviews accordion =====
const accordionItems = document.querySelectorAll('.rev-accordion-item');
accordionItems.forEach(item => {
  item.addEventListener('click', () => {
    // Find the currently open card and remove its active class
    const currentActive = document.querySelector('.rev-accordion-item.active');
    if (currentActive && currentActive !== item) {
      currentActive.classList.remove('active');
    }
    // Add the active class to the newly clicked card
    item.classList.add('active');
  });
});
