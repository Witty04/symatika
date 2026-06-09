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
const typeSelect   = document.getElementById('typeSelect');
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
    // Hapus class 'active' dari semua tombol semester
    semBtns.forEach(b => b.classList.remove('active'));

    // Tambahkan class 'active' ke tombol yang diklik
    btn.classList.add('active');

    // Cek apakah yang diklik adalah tombol "All Semester" (tidak punya data-sem)
    const semAttr = btn.getAttribute('data-sem');
    
    if (!semAttr) {
      activeSemester = NaN; // Set status Tampilkan Semua Semester
      subjectsLabel.textContent = `All Subjects (All Semesters)`;
    } else {
      activeSemester = parseInt(semAttr);
      subjectsLabel.textContent = `All Subjects (Semester ${activeSemester})`;
    }

    // Reset kolom search setiap ganti tab semester
    searchInput.value = '';

    // Jalankan fungsi filter utama
    applyFilter();
  });
});

// Fungsi cadangan jika inline onclick di HTML masih memicu filter
function filterSemester(sem) {
  semBtns.forEach(b => b.classList.remove('active'));
  
  // Cari tombol manual "All Semester" jika ada di dalam nodeList dan aktifkan kodenya
  semBtns.forEach(b => {
    if(!b.getAttribute('data-sem')) b.classList.add('active');
  });

  if (sem === 'all') {
    activeSemester = NaN;
    subjectsLabel.textContent = `All Subjects (All Semesters)`;
  }
  
  searchInput.value = '';
  applyFilter();
}

// -----------------------------------------------
// 2. SEARCH REAL-TIME
// -----------------------------------------------
searchInput.addEventListener('input', () => {
  applyFilter();
});

// -----------------------------------------------
// 3. SORT A-Z / Z-A & FILTER TYPE
// -----------------------------------------------
sortSelect.addEventListener('change', () => {
  applyFilter();
});

typeSelect.addEventListener('change', () => {
  applyFilter();
});

// -----------------------------------------------
// 4. FUNGSI UTAMA: applyFilter()
// -----------------------------------------------
function applyFilter() {
  const query      = searchInput.value.trim().toLowerCase();
  const sortMode   = sortSelect.value;
  const typeFilter = typeSelect.value.trim().toLowerCase();

  // Kumpulkan card yang lolos filter
  let visibleCards = [];

  allCards.forEach(card => {
    const cardSem   = parseInt(card.getAttribute('data-sem'));
    const cardName  = card.getAttribute('data-name').toLowerCase();

    // Ambil text badge di dalam card (Wajib / Umum)
    const badgeText = card.querySelector('.mat-badge').textContent.trim().toLowerCase();

    // ── LOGIKA FILTER SEMESTER ──
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
    const nameA = a.getAttribute('data-name') || '';
    const nameB = b.getAttribute('data-name') || '';
    if (sortMode === 'az') return nameA.localeCompare(nameB);
    if (sortMode === 'za') return nameB.localeCompare(nameA);
    return 0;
  });

  // Pindahkan card ke urutan baru di dalam grid
  visibleCards.forEach(card => matGrid.appendChild(card));

  // ── KELOMPOK KEAHLIAN (Hanya muncul di Semester 6 tanpa search) ──
  if (kkSeparator && kkGrid) {
    if (activeSemester === 6 && query === '') {
      kkSeparator.classList.add('visible');
      kkGrid.classList.add('visible');
    } else {
      kkSeparator.classList.remove('visible');
      kkGrid.classList.remove('visible');
    }
  }

  // ── EMPTY STATE MANAJEMEN ──
  if (visibleCards.length === 0) {
    emptyState.classList.add('visible');
    emptyQuery.textContent = searchInput.value;
    matGrid.style.display = 'none';
  } else {
    emptyState.classList.remove('visible');
    matGrid.style.display = '';
  }
}

// -----------------------------------------------
// 5. DROPDOWN AKSES FILE
// -----------------------------------------------
function toggleDropdown(btn) {
  const dropdown = btn.nextElementSibling;
  const isOpen   = dropdown.classList.contains('open');

  closeAllDropdowns();

  if (!isOpen) {
    dropdown.classList.add('open');
    btn.classList.add('open');       
  }

  // Mencegah event menutup langsung
  if (window.event) window.event.stopPropagation();
}

function closeAllDropdowns() {
  document.querySelectorAll('.aksesfile-dropdown.open').forEach(d => {
    d.classList.remove('open');
  });
  document.querySelectorAll('.btn-aksesfile.open').forEach(b => {
    b.classList.remove('open');
  });
}

document.addEventListener('click', () => {
  closeAllDropdowns();
});

// -----------------------------------------------
// 6. ANCHOR LINK – AUTO SCROLL KE CARD
// -----------------------------------------------
window.addEventListener('DOMContentLoaded', () => {
  // Jalankan filter awal untuk Semester 1
  applyFilter();

  const hash = window.location.hash;
  if (hash) {
    const targetCard = document.querySelector(hash);

    if (targetCard) {
      const targetSem = parseInt(targetCard.getAttribute('data-sem'));

      semBtns.forEach(btn => {
        btn.classList.remove('active');
        if (parseInt(btn.getAttribute('data-sem')) === targetSem) {
          btn.classList.add('active');
        }
      });

      activeSemester = targetSem;
      subjectsLabel.textContent = `All Subjects (Semester ${activeSemester})`;
      applyFilter();

      setTimeout(() => {
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        targetCard.style.boxShadow = '0 0 0 2px var(--accent-purple), 0 0 30px rgba(124,58,237,0.35)';
        setTimeout(() => {
          targetCard.style.boxShadow = '';
        }, 2200);
      }, 300);
    }
  }
});