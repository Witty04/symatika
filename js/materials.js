// ================================================
//  SYMATIKA – materials.js
//  Logika interaktif untuk halaman Materials
// ================================================


// -----------------------------------------------
// VARIABEL GLOBAL
// -----------------------------------------------

// Semester yang sedang aktif (default: 1)
let activeSemester = 1;

// Ambil semua elemen yang dibutuhkan
const semBtns      = document.querySelectorAll('.sem-btn');
const allCards     = document.querySelectorAll('.mat-card');
const kkSeparator  = document.getElementById('kkSeparator');
const kkGrid       = document.getElementById('kkGrid');
const subjectsLabel= document.getElementById('subjectsLabel');
const searchInput  = document.getElementById('searchInput');
const sortSelect   = document.getElementById('sortSelect');
const matGrid      = document.getElementById('matGrid');
const emptyState   = document.getElementById('emptyState');
const emptyQuery   = document.getElementById('emptyQuery');


// -----------------------------------------------
// 1. FILTER SEMESTER
//    Klik tombol Semester → tampilkan hanya card
//    yang memiliki data-sem sesuai semester dipilih.
// -----------------------------------------------

semBtns.forEach(btn => {
  btn.addEventListener('click', () => {

    // Hapus class 'active' dari semua tombol
    semBtns.forEach(b => b.classList.remove('active'));

    // Tambahkan class 'active' ke tombol yang diklik
    btn.classList.add('active');

    // Simpan semester yang aktif
    activeSemester = parseInt(btn.getAttribute('data-sem'));

    // Update label di atas grid
    subjectsLabel.textContent = `All Subjects (Semester ${activeSemester})`;

    // Reset kolom search saat ganti semester
    searchInput.value = '';

    // Jalankan fungsi filter utama
    applyFilter();
  });
});


// -----------------------------------------------
// 2. SEARCH REAL-TIME
//    Setiap kali user mengetik di kolom search,
//    filter berjalan otomatis tanpa perlu klik.
// -----------------------------------------------

searchInput.addEventListener('input', () => {
  applyFilter();
});


// -----------------------------------------------
// 3. SORT A-Z / Z-A
//    Mengurutkan ulang card di dalam grid
//    berdasarkan nama mata kuliah.
// -----------------------------------------------

sortSelect.addEventListener('change', () => {
  applyFilter();
});


// -----------------------------------------------
// 4. FUNGSI UTAMA: applyFilter()
//    Mengatur visibilitas card berdasarkan:
//    - Semester aktif
//    - Teks di kolom search
//    - Urutan sort
// -----------------------------------------------

function applyFilter() {
  const query      = searchInput.value.trim().toLowerCase();
  const sortMode   = sortSelect.value;
  const typeFilter = document.getElementById('typeSelect').value;

  // Kumpulkan card yang lolos filter
  let visibleCards = [];

 allCards.forEach(card => {
    const cardSem   = parseInt(card.getAttribute('data-sem'));
    const cardName  = card.getAttribute('data-name').toLowerCase();

    // Ambil text badge di dalam card (wajib atau umum) untuk dicocokkan
    const badgeText = card.querySelector('.mat-badge').textContent.trim().toLowerCase();

    // ── LOGIKA FILTER SEMESTER (Jika activeSemester NaN / 'all', loloskan semua) ──
    const semMatch = isNaN(activeSemester) || cardSem === activeSemester;

    // ── LOGIKA FILTER SEARCH ──
    const searchMatch = cardName.includes(query);

    // ── LOGIKA FILTER TYPE (Wajib / Umum) ──
    const typeMatch = typeFilter === 'all' || badgeText === typeFilter;

    // Gabungkan ketiga filter
    if (semMatch && searchMatch && typeMatch) {
      card.style.display = ''; 
      visibleCards.push(card);
    } else {
      card.style.display = 'none';
    }
  });

  // ── Sort: urutkan card yang terlihat ──
  visibleCards.sort((a, b) => {
    const nameA = a.getAttribute('data-name');
    const nameB = b.getAttribute('data-name');
    if (sortMode === 'az') return nameA.localeCompare(nameB);
    if (sortMode === 'za') return nameB.localeCompare(nameA);
    return 0;
  });

  // Pindahkan card ke urutan baru di dalam grid
  visibleCards.forEach(card => matGrid.appendChild(card));

  // ── KELOMPOK KEAHLIAN (Hanya muncul di Semester 6 tanpa search) ──
  if (activeSemester === 6 && query === '') {
    kkSeparator.classList.add('visible');
    kkGrid.classList.add('visible');
  } else {
    kkSeparator.classList.remove('visible');
    kkGrid.classList.remove('visible');
  }

  /// ── EMPTY STATE MANAJEMEN ──
  if (visibleCards.length === 0) {
    emptyState.classList.add('visible');
    emptyQuery.textContent = searchInput.value;
    matGrid.style.display = 'none';
  } else {
    emptyState.classList.remove('visible');
    matGrid.style.display = '';
  }
}

document.getElementById('typeSelect').addEventListener('change', () => {
  applyFilter();
});

// Fungsi untuk tombol All Semester yang baru kamu pasang!
function filterSemester(sem) {
  // Matikan semua class active di tombol biasa
  semBtns.forEach(b => b.classList.remove('active'));
  
  if (sem === 'all') {
    activeSemester = NaN; // Set status semacam 'Tampilkan Semua'
    subjectsLabel.textContent = `All Subjects (All Semesters)`;
  }
  
  searchInput.value = '';
  applyFilter();
}
// -----------------------------------------------
// 5. DROPDOWN AKSES FILE
//    Fungsi toggleDropdown() dipanggil dari onclick
//    di HTML pada setiap tombol "Akses File".
//
//    Cara kerja:
//    - Ambil dropdown yang berada di sebelah tombol
//    - Toggle class 'open' untuk menampilkan/
//      menyembunyikan dropdown
//    - Tutup semua dropdown LAIN yang mungkin terbuka
// -----------------------------------------------

function toggleDropdown(btn) {
  // Ambil dropdown yang "bersaudara" dengan tombol ini
  const dropdown = btn.nextElementSibling;
  const isOpen   = dropdown.classList.contains('open');

  // Tutup SEMUA dropdown yang sedang terbuka dulu
  closeAllDropdowns();

  // Jika dropdown ini belum terbuka, buka sekarang
  if (!isOpen) {
    dropdown.classList.add('open');
    btn.classList.add('open');       // Untuk animasi rotasi panah ▾
  }

  // Hentikan event bubbling agar tidak memicu listener document
  event.stopPropagation();
}

// Tutup semua dropdown (dipanggil saat klik di luar)
function closeAllDropdowns() {
  document.querySelectorAll('.aksesfile-dropdown.open').forEach(d => {
    d.classList.remove('open');
  });
  document.querySelectorAll('.btn-aksesfile.open').forEach(b => {
    b.classList.remove('open');
  });
}

// Klik di luar area dropdown → tutup semua dropdown
document.addEventListener('click', () => {
  closeAllDropdowns();
});

// Klik di dalam dropdown → jangan ditutup
document.querySelectorAll('.aksesfile-dropdown').forEach(drop => {
  drop.addEventListener('click', (e) => {
    e.stopPropagation();
  });
});


// -----------------------------------------------
// 6. ANCHOR LINK – AUTO SCROLL KE CARD
//    Jika URL mengandung #id (misal: materials.html#iot),
//    halaman akan scroll ke card yang dimaksud,
//    lalu semester yang sesuai otomatis diaktifkan.
// -----------------------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Jalankan filter awal untuk Semester 1
  applyFilter();

  // Cek apakah ada anchor (#id) di URL
  const hash = window.location.hash; // contoh: "#iot"

  if (hash) {
    const targetCard = document.querySelector(hash);

    if (targetCard) {
      // Ambil semester card yang dituju
      const targetSem = parseInt(targetCard.getAttribute('data-sem'));

      // Aktifkan tombol semester yang sesuai
      semBtns.forEach(btn => {
        btn.classList.remove('active');
        if (parseInt(btn.getAttribute('data-sem')) === targetSem) {
          btn.classList.add('active');
        }
      });

      // Update semester aktif & jalankan filter
      activeSemester = targetSem;
      subjectsLabel.textContent = `All Subjects (Semester ${activeSemester})`;
      applyFilter();

      // Scroll ke card setelah sedikit delay (beri waktu DOM update)
      setTimeout(() => {
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Efek highlight sementara pada card yang dituju
        targetCard.style.boxShadow = '0 0 0 2px var(--accent-purple), 0 0 30px rgba(124,58,237,0.35)';
        setTimeout(() => {
          targetCard.style.boxShadow = '';
        }, 2200);
      }, 300);
    }
  }
});
