/* ========================================================
   LOGIKA INTERAKTIF HAMBURGER MENU MOBILE (FOR SYMATIKA)
   ======================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    // 1. Ketika tombol garis tiga diklik
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navToggle.classList.toggle('active'); // Mengubah garis 3 jadi (X)
      navMenu.classList.toggle('active');   // Memunculkan/menggeser menu navbar
    });

    // 2. Otomatis menutup navbar jika pengguna mengklik area di luar menu
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  }
});