// ================================================
//  SYMATIKA – script.js
//  Efek Interaktif Halaman Home
// ================================================


// -----------------------------------------------
// 1. SCROLL REVEAL ANIMATION
//    Menggunakan Intersection Observer API
//
//    Cara kerja:
//    - Semua elemen dengan class "scroll-reveal"
//      dimulai dalam kondisi tak terlihat (opacity:0,
//      translateY:32px) — sudah diatur di CSS.
//    - Observer memantau kapan elemen masuk ke
//      area yang terlihat di layar (viewport).
//    - Saat masuk, class "visible" ditambahkan
//      sehingga animasi fade-in + naik ke atas
//      berjalan otomatis via CSS transition.
//    - Atribut data-delay di HTML digunakan untuk
//      memberi jeda berbeda pada setiap elemen,
//      sehingga muncul secara bergantian (stagger).
// -----------------------------------------------

// Ambil semua elemen yang ingin diberi animasi
const revealElements = document.querySelectorAll('.scroll-reveal');

// Buat observer dengan konfigurasi:
// threshold 0.12 = animasi mulai saat 12% elemen terlihat
const revealObserver = new IntersectionObserver((entries) => {

  entries.forEach(entry => {

    // Cek: apakah elemen sedang masuk ke viewport?
    if (entry.isIntersecting) {

      const el = entry.target;

      // Ambil nilai delay dari atribut data-delay (default: 0ms)
      const delay = parseInt(el.getAttribute('data-delay') || '0', 10);

      // Terapkan delay sebelum class 'visible' ditambahkan
      setTimeout(() => {
        el.classList.add('visible');
      }, delay);

      // Setelah animasi selesai, berhenti memantau elemen ini
      // (animasi hanya perlu terjadi sekali)
      revealObserver.unobserve(el);
    }
  });

}, {
  threshold: 0.12,       // Mulai saat 12% elemen terlihat
  rootMargin: '0px 0px -40px 0px'  // Sedikit offset agar tidak terlalu awal
});

// Daftarkan semua elemen ke observer
revealElements.forEach(el => revealObserver.observe(el));


// -----------------------------------------------
// 2. CARD SPOTLIGHT EFFECT (Efek Cahaya Mengikuti Kursor)
//    Saat kursor bergerak di atas card, muncul
//    efek cahaya radial yang mengikuti posisi mouse.
//    Ini memberi kesan card "hidup" dan interaktif.
// -----------------------------------------------

const cards = document.querySelectorAll('.feature-card, .preview-card');

cards.forEach(card => {

  // Event: kursor bergerak di dalam card
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();

    // Hitung posisi kursor relatif terhadap pojok kiri atas card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Terapkan cahaya radial (gradient) di posisi kursor
    card.style.background = `
      radial-gradient(
        180px circle at ${x}px ${y}px,
        rgba(124, 58, 237, 0.10),
        transparent 70%
      ),
      var(--bg-card-hover)
    `;
  });

  // Event: kursor keluar dari card → reset background
  card.addEventListener('mouseleave', () => {
    card.style.background = '';
  });
});


// -----------------------------------------------
// 3. NAVBAR ACTIVE LINK
//    Menentukan link mana di navbar yang harus
//    ditandai sebagai "aktif" berdasarkan
//    nama file halaman yang sedang dibuka.
// -----------------------------------------------

const navLinks = document.querySelectorAll('.nav-links a');

// Ambil nama file dari URL saat ini (misal: "index.html")
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

navLinks.forEach(link => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});


// -----------------------------------------------
// 4. NAVBAR SCROLL SHADOW
//    Navbar mendapat shadow lebih tebal saat
//    halaman di-scroll ke bawah, memberi kesan
//    kedalaman / depth pada UI.
// -----------------------------------------------

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    // Sudah scroll ke bawah: tambah shadow
    navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
  } else {
    // Kembali ke atas: hilangkan shadow
    navbar.style.boxShadow = 'none';
  }
});
