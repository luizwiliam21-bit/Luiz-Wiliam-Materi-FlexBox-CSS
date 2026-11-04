/**
 * quizzes.js
 * Bank soal interaktif beserta penjelasan untuk setiap modul pembelajaran.
 */
window.CSQuizzes = {
  variables: [
    {
      question: 'Jika variabel `skor = "95"` disimpan dengan tanda kutip, apa tipe datanya?',
      options: ['Number (Integer)', 'String (Teks)', 'Boolean', 'Float'],
      answer: 1,
      explanation: 'Segala nilai yang diapit tanda kutip (`"..."` atau `\'...\'`) diperlakukan sebagai teks atau `String`, meskipun berisi angka.'
    },
    {
      question: 'Apa yang terjadi saat kita mengeksekusi `aktif = false` pada variabel yang sebelumnya bernilai `true`?',
      options: [
        'Program mengalami error karena variabel terkunci',
        'Nilai lama di dalam loker variabel ditimpa menjadi `false`',
        'Variabel memiliki dua nilai sekaligus',
        'Tipe data berubah menjadi String'
      ],
      answer: 1,
      explanation: 'Variabel bersifat mutable (dapat diubah); pemberian nilai baru (`assignment`) akan menggantikan nilai lama di memori.'
    }
  ],
  conditionals: [
    {
      question: 'Pada struktur `if - elif - else`, jika kondisi `if` pertama sudah bernilai `True`, apa yang terjadi pada blok `elif` di bawahnya?',
      options: [
        'Tetap diperiksa satu per satu',
        'Dilewati seluruhnya (tidak dieksekusi)',
        'Menghasilkan error sintaks',
        'Menjalankan blok `else` secara otomatis'
      ],
      answer: 1,
      explanation: 'Dalam rangkaian `if - elif - else`, hanya cabang pertama yang bernilai `True` yang dijalankan; sisanya langsung dilewati.'
    },
    {
      question: 'Jika `nilai = 75` dan kondisi pertama adalah `if nilai >= 80:`, jalur mana yang dievaluasi berikutnya?',
      options: [
        'Blok di dalam `if nilai >= 80` tetap dijalankan',
        'Program berhenti seketika',
        'Lanjut mengevaluasi kondisi `elif` atau `else` di bawahnya',
        'Nilai otomatis dinaikkan menjadi 80'
      ],
      answer: 2,
      explanation: 'Karena `75 >= 80` bernilai `False`, program melewati blok `if` pertama dan lanjut memeriksa kondisi `elif` berikutnya.'
    }
  ],
  loops: [
    {
      question: 'Berapa kali perulangan `for i in range(0, 4):` akan mengeksekusi blok di dalamnya?',
      options: ['3 kali (i = 0, 1, 2)', '4 kali (i = 0, 1, 2, 3)', '5 kali (i = 0, 1, 2, 3, 4)', 'Tak terbatas (infinite loop)'],
      answer: 1,
      explanation: 'Mulai dari `i = 0` hingga sebelum batas `4`, yaitu `i = 0, 1, 2, 3` (total 4 kali iterasi).'
    },
    {
      question: 'Apa penyebab utama terjadinya *Infinite Loop* pada perulangan `while`?',
      options: [
        'Menggunakan variabel bernama `i`',
        'Kondisi perulangan selalu bernilai `True` dan tidak pernah diperbarui menuju `False`',
        'Jumlah baris kode di dalam loop terlalu pendek',
        'Nilai awal counter dimulai dari 0'
      ],
      answer: 1,
      explanation: 'Jika variabel penentu kondisi tidak pernah diubah di dalam badan loop, kondisi tetap `True` selamanya.'
    }
  ],
  functions: [
    {
      question: 'Apa fungsi utama dari kata kunci `return` di dalam sebuah fungsi?',
      options: [
        'Mengulang fungsi dari baris pertama',
        'Mengirimkan hasil pemrosesan keluar dari fungsi dan menghentikan eksekusi fungsi',
        'Menghapus parameter input dari memori',
        'Mencetak teks ke layar konsol saja tanpa mengembalikan nilai'
      ],
      answer: 1,
      explanation: '`return` menyerahkan nilai hasil olahan fungsi kembali ke pemanggilnya dan langsung mengakhiri eksekusi fungsi tersebut.'
    },
    {
      question: 'Jika fungsi `hitung_luas(p, l)` dipanggil dengan `hitung_luas(6, 4)`, disebut apakah angka `6` dan `4` tersebut?',
      options: ['Variabel Global', 'Argumen / Parameter Input', 'Return Value', 'Indeks Array'],
      answer: 1,
      explanation: 'Nilai yang dikirimkan ke dalam kurung saat memanggil fungsi disebut argumen (yang diterima oleh parameter `p` dan `l`).'
    }
  ],
  list: [
    {
      question: 'Pada list `buah = ["Apel", "Jeruk", "Mangga", "Pisang"]`, elemen apakah yang berada di `buah[2]`?',
      options: ['"Jeruk"', '"Mangga"', '"Pisang"', 'Error IndexOutOfBounds'],
      answer: 1,
      explanation: 'Indeks list dimulai dari 0: indeks 0 adalah "Apel", indeks 1 adalah "Jeruk", dan indeks 2 adalah "Mangga".'
    },
    {
      question: 'Mengapa operasi `insert` atau `delete` di awal/tengah List memiliki kompleksitas waktu O(n)?',
      options: [
        'Karena seluruh elemen setelah posisi tersebut harus digeser (shift) satu per satu di memori',
        'Karena List hanya bisa menyimpan angka',
        'Karena komputer harus mengurutkan ulang data secara alfabetis',
        'Karena List tidak memiliki indeks'
      ],
      answer: 0,
      explanation: 'Menyisipkan atau menghapus elemen di tengah mengharuskan elemen-elemen di sebelah kanannya bergeser indeksnya.'
    }
  ],
  tuple: [
    {
      question: 'Apa perbedaan paling mendasar antara `Tuple` dan `List` di Python?',
      options: [
        'Tuple tidak memiliki urutan indeks',
        'Tuple bersifat Immutable (isinya tidak dapat diubah setelah dibuat), sedangkan List bersifat Mutable',
        'Tuple hanya bisa menyimpan maksimal 2 elemen',
        'List lebih cepat dan selalu terkunci'
      ],
      answer: 1,
      explanation: 'Tuple bersifat *immutable* (tersegel). Mencoba mengubah `koordinat[0] = 99` akan memicu `TypeError`.'
    },
    {
      question: 'Manakah kasus penggunaan yang paling cocok untuk disimpan menggunakan `Tuple`?',
      options: [
        'Daftar belanjaan yang terus bertambah dan dihapus',
        'Antrean pelanggan di kasir',
        'Titik koordinat GPS `(latitude, longitude)` atau kode warna `RGB` yang tetap',
        'Skor pemain yang berubah setiap detik'
      ],
      answer: 2,
      explanation: 'Data yang sifatnya konstan dan berpasangan tetap seperti `(lat, lng)` atau `(R, G, B)` sangat aman disimpan dalam Tuple.'
    }
  ],
  dictionary: [
    {
      question: 'Berapa rata-rata kompleksitas waktu (Big-O) untuk mencari nilai berdasarkan `Key` pada Dictionary / Hash Map?',
      options: ['O(n) - harus dicek satu per satu dari awal', 'O(1) - instan melalui fungsi hash', 'O(n²)', 'O(log n)'],
      answer: 1,
      explanation: 'Dictionary menggunakan mekanisme *hashing* pada `Key` sehingga lokasi penyimpanan dapat langsung ditemukan dalam waktu konstan O(1).'
    },
    {
      question: 'Apa yang terjadi jika kita menyimpan nilai baru menggunakan `Key` yang sudah ada di dalam Dictionary?',
      options: [
        'Dictionary membuat dua Key kembar',
        'Nilai (Value) lama pada Key tersebut akan diperbarui (di-overwrite) dengan nilai baru',
        'Program berhenti karena Key duplikat dilarang saat assignment',
        'Data otomatis terhapus'
      ],
      answer: 1,
      explanation: 'Key di dalam Dictionary bersifat unik; mengisi ulang key yang sama akan memperbarui *value* yang terhubung ke key tersebut.'
    }
  ],
  set: [
    {
      question: 'Jika kita memiliki `angka = {10, 20, 30}` lalu menjalankan `angka.add(20)`, bagaimana isi Set tersebut?',
      options: [
        '`{10, 20, 20, 30}`',
        '`{10, 20, 30}` (tidak berubah karena elemen duplikat ditolak)',
        '`{20}`',
        'Menghasilkan ValueError'
      ],
      answer: 1,
      explanation: 'Himpunan (`Set`) menjamin setiap elemen di dalamnya unik dan otomatis mengabaikan nilai yang sudah ada.'
    },
    {
      question: 'Operasi himpunan manakah yang menghasilkan elemen-elemen yang ada di **kedua** Set sekaligus (`A ∩ B`)?',
      options: ['Union (`A | B`)', 'Intersection (`A & B`)', 'Difference (`A - B`)', 'Pop'],
      answer: 1,
      explanation: 'Intersection (irisan `A & B`) mengambil hanya anggota yang sama-sama dimiliki oleh himpunan A dan himpunan B.'
    }
  ],
  bfs: [
    {
      question: 'Struktur data bantu apakah yang digunakan oleh algoritma **Breadth-First Search (BFS)** untuk mengatur urutan kunjungan node?',
      options: ['Stack (LIFO - Tumpukan)', 'Queue (FIFO - Antrean)', 'Tuple', 'Binary Heap'],
      answer: 1,
      explanation: 'BFS menggunakan **Queue (First-In, First-Out)** agar node-node tetangga pada level terdekat dikunjungi lebih dulu secara melebar.'
    },
    {
      question: 'Keunggulan utama BFS dibandingkan DFS pada graf tidak berbobot (unweighted graph) adalah:',
      options: [
        'Menjamin ditemukannya jalur terpendek (jumlah langkah/edge paling sedikit) dari node awal',
        'Tidak membutuhkan memori sama sekali',
        'Selalu menelusuri cabang terdalam terlebih dahulu',
        'Hanya mengunjungi satu node saja'
      ],
      answer: 0,
      explanation: 'Karena BFS menjelajah lapis demi lapis (level-by-level), saat node tujuan ditemukan pertama kali, jalur tersebut pasti memiliki jumlah edge paling sedikit.'
    }
  ],
  dfs: [
    {
      question: 'Struktur data apakah yang menjadi dasar penelusuran **Depth-First Search (DFS)**?',
      options: ['Queue (Antrean FIFO)', 'Stack (Tumpukan LIFO / Call Stack Rekursi)', 'Array Statis', 'Hash Table'],
      answer: 1,
      explanation: 'DFS menggunakan **Stack (Last-In, First-Out)** sehingga node yang baru saja ditemukan langsung ditelusuri lebih dalam hingga mencapai ujung cabang.'
    },
    {
      question: 'Apa yang dilakukan algoritma DFS ketika mencapai node ujung (dead-end) yang semua tetangganya sudah dikunjungi?',
      options: [
        'Berhenti total meskipun masih ada cabang lain yang belum dikunjungi',
        'Melakukan Backtracking (mundur ke node sebelumnya di Stack untuk mengecek cabang lain)',
        'Menghapus seluruh graf',
        'Mengulang dari node awal'
      ],
      answer: 1,
      explanation: 'DFS melakukan *backtracking* dengan mengeluarkan (*pop*) node dari Stack dan kembali ke simpangan sebelumnya yang masih memiliki tetangga belum dikunjungi.'
    }
  ]
};
