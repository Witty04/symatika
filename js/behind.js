// ================================================
//  SYMATIKA – behind.js
//  Efek terminal typing untuk halaman Sysinfo
// ================================================

// Efek placeholder foto profil sudah ditangani
// langsung oleh atribut onerror di tag <img>.

// Tambahkan efek kursor berkedip pada terminal
// sudah ditangani sepenuhnya oleh CSS animation.

// Animasi scroll reveal sudah ditangani oleh script.js global.

console.log('%c SYMATIKA SYSINFO ', 'background:#7c3aed;color:#fff;font-family:monospace;padding:4px 12px;border-radius:4px;');
console.log('%c > ALL SYSTEMS NOMINAL', 'color:#4ade80;font-family:monospace;font-size:11px;');

// Tutup laci navbar otomatis ketika menu di-klik pada mode mobile
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => {
    navLinks.classList.remove('active');
    navToggle.classList.remove('active');
  });
});
