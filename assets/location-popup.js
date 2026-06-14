// =====================================================================
// Deluxe Duct Cleaners — Location selector popup (Ontario page only)
// =====================================================================

// ===== Location popup: show once per browser session =====
function closePopup() {
  sessionStorage.setItem('locationSelected', '1');
  document.documentElement.classList.remove('modal-open');
  document.body.classList.remove('modal-open');
  var bd = document.getElementById('loc-backdrop');
  if (!bd) return;
  bd.style.animation = 'fadeOutBackdrop .25s ease forwards';
  var modal = document.getElementById('loc-modal');
  if (modal) modal.style.animation = 'slideDownModal .25s cubic-bezier(.4,0,.2,1) forwards';
  setTimeout(function () { if (bd) bd.remove(); }, 260);
}

function handleBackdropClick(e) {
  if (e.target === document.getElementById('loc-backdrop')) closePopup();
}

// Only show the popup the first time a visitor lands this session
(function () {
  var bd = document.getElementById('loc-backdrop');
  if (!bd) return;
  if (sessionStorage.getItem('locationSelected')) {
    bd.remove();
  } else {
    bd.style.display = 'flex';
    document.documentElement.classList.add('modal-open');
    document.body.classList.add('modal-open');
  }
})();
