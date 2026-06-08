// ================================================
//  SYMATIKA – resources.js
//  Filter tab kategori untuk halaman Resources
// ================================================

const tabBtns    = document.querySelectorAll('.res-tab-btn');
const resSections = document.querySelectorAll('.res-section');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {

    // Set tombol aktif
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const selected = btn.getAttribute('data-cat');

    resSections.forEach(section => {
      if (selected === 'all' || section.getAttribute('data-section') === selected) {
        section.style.display = '';
      } else {
        section.style.display = 'none';
      }
    });
  });
});

// Tutup laci navbar otomatis ketika menu di-klik pada mode mobile
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => {
    navLinks.classList.remove('active');
    navToggle.classList.remove('active');
  });
});