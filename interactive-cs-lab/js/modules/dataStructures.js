/**
 * dataStructures.js
 * Modul Struktur Data Interaktif:
 * 1. List / Dynamic Array
 * 2. Tuple vs List (Immutability)
 * 3. Dictionary / Hash Map (Key-Value O(1))
 * 4. Set (Unique Elements & Himpunan Union/Intersection)
 */
window.CSDataStructures = (function () {
  const state = {
    list: ['Apel', 'Jeruk', 'Mangga', 'Pisang'],
    tuple: {
      tupleData: [-6.2088, 106.8456, 'Jakarta'],
      listData: ['Draf', 'Review', 'Final'],
      errorMsg: ''
    },
    dict: [
      { key: 'nim', value: '240192' },
      { key: 'nama', value: 'Nadia Putri' },
      { key: 'jurusan', value: 'Informatika' },
      { key: 'ipk', value: '3.88' }
    ],
    setA: [10, 20, 30, 40],
    setB: [30, 40, 50, 60],
    setOperation: 'union' // 'union' | 'intersection' | 'difference'
  };

  /* ==========================================
   * 1. LIST / DYNAMIC ARRAY
   * ========================================== */
  function renderList(root) {
    window.CSVisualizer.clearTimer();
    root.innerHTML = `
      <div class="space-y-6 animate-pop">
        <div class="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 p-4 sm:p-5 rounded-2xl">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">Data Structures</span>
              <span class="px-2.5 py-0.5 text-xs font-mono rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">Access: O(1)</span>
              <span class="px-2.5 py-0.5 text-xs font-mono rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">Insert/Delete Mid: O(n)</span>
            </div>
            <h2 class="text-lg sm:text-xl font-bold text-white">List / Array Dinamis</h2>
            <p class="text-xs sm:text-sm text-slate-400">Kumpulan elemen berurutan dengan indeks dimulai dari <code class="text-cyan-300">0</code>. Tambah, sisipkan, atau hapus elemen untuk melihat pergeseran indeks.</p>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div class="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-5">
            <!-- Visual Array Deret Loker -->
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-semibold uppercase tracking-wider text-slate-400">Memori Berurutan (Zero-Indexed)</span>
                <span id="list-len-badge" class="text-xs font-mono text-cyan-300">len(buah) = ${state.list.length}</span>
              </div>
              <div id="list-boxes-container" class="flex flex-wrap gap-3 p-4 rounded-xl bg-slate-950 border border-slate-800 min-h-[115px] items-center"></div>
            </div>

            <!-- Panel Operasi List -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-950 border border-slate-800 p-4 rounded-xl">
              <div>
                <label class="block text-xs text-slate-400 mb-1">Nilai Elemen Baru</label>
                <input id="input-list-val" type="text" value="Anggur" maxlength="14"
                  class="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs sm:text-sm font-mono text-white" />
              </div>
              <div>
                <label class="block text-xs text-slate-400 mb-1">Indeks Target (untuk Insert / Delete)</label>
                <input id="input-list-idx" type="number" min="0" max="10" value="1"
                  class="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs sm:text-sm font-mono text-white" />
              </div>
            </div>

            <div class="flex flex-wrap gap-2.5">
              <button type="button" id="btn-list-append" class="px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white transition">
                + Append (Akhir) O(1)
              </button>
              <button type="button" id="btn-list-pop" class="px-3.5 py-2 rounded-lg bg-rose-600/80 hover:bg-rose-600 text-xs font-semibold text-white transition">
                - Pop (Hapus Akhir) O(1)
              </button>
              <button type="button" id="btn-list-insert" class="px-3.5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs font-semibold text-white transition">
                Insert di Indeks O(n)
              </button>
              <button type="button" id="btn-list-del" class="px-3.5 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-xs font-semibold text-white transition">
                Delete Indeks O(n)
              </button>
            </div>
          </div>

          <div class="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-3">
                <span class="text-xs font-semibold uppercase tracking-wider text-slate-400">Operasi Python List</span>
                <span class="text-[11px] font-mono text-cyan-400">Mutable Sequence</span>
              </div>
              <div id="list-code-container" class="bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono space-y-1"></div>
            </div>
            <div id="list-op-log" class="mt-4 bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs font-mono text-emerald-300">
              > Klik salah satu operasi List untuk melihat efeknya pada indeks.
            </div>
          </div>
        </div>

        <div id="quiz-list"></div>
      </div>
    `;

    function updateListView(activeLine = 0, logText = '') {
      const container = document.getElementById('list-boxes-container');
      document.getElementById('list-len-badge').textContent = `len(buah) = ${state.list.length}`;

      if (state.list.length === 0) {
        container.innerHTML = `<span class="text-xs text-slate-500 italic">List kosong [] — tambahkan elemen dengan Append.</span>`;
      } else {
        container.innerHTML = state.list
          .map(
            (item, idx) => `
          <div class="animate-pop bg-slate-900 border-2 border-indigo-500/50 rounded-xl p-3 min-w-[84px] text-center shadow">
            <div class="text-[10px] font-mono text-slate-400 mb-1">Indeks [${idx}]</div>
            <div class="text-xs sm:text-sm font-mono font-bold text-white">"${item}"</div>
          </div>
        `
          )
          .join('');
      }

      const listLiteral = `[${state.list.map((x) => `"${x}"`).join(', ')}]`;
      const codeLines = [
        `buah = ${listLiteral}`,
        `buah.append("item")       # Tambah di ujung O(1)`,
        `buah.pop()                # Hapus ujung O(1)`,
        `buah.insert(idx, "item")  # Geser elemen kanan O(n)`,
        `del buah[idx]             # Hapus & geser kiri O(n)`
      ];

      window.CSVisualizer.renderCodeBlock('list-code-container', codeLines, activeLine);
      if (logText) {
        document.getElementById('list-op-log').textContent = `> ${logText}`;
      }
    }

    document.getElementById('btn-list-append').addEventListener('click', () => {
      if (state.list.length >= 8) {
        window.CSVisualizer.showToast('Maksimal 8 elemen untuk kenyamanan visualisasi.', 'warning');
        return;
      }
      const val = document.getElementById('input-list-val').value.trim() || 'Baru';
      state.list.push(val);
      updateListView(1, `buah.append("${val}") berhasil di indeks [${state.list.length - 1}]`);
    });

    document.getElementById('btn-list-pop').addEventListener('click', () => {
      if (state.list.length === 0) {
        window.CSVisualizer.showToast('List sudah kosong, tidak bisa pop()!', 'error');
        return;
      }
      const removed = state.list.pop();
      updateListView(2, `buah.pop() menghapus "${removed}" dari akhir list`);
    });

    document.getElementById('btn-list-insert').addEventListener('click', () => {
      if (state.list.length >= 8) {
        window.CSVisualizer.showToast('Maksimal 8 elemen di layar.', 'warning');
        return;
      }
      const val = document.getElementById('input-list-val').value.trim() || 'Item';
      let idx = parseInt(document.getElementById('input-list-idx').value, 10);
      if (isNaN(idx) || idx < 0) idx = 0;
      if (idx > state.list.length) idx = state.list.length;
      state.list.splice(idx, 0, val);
      updateListView(3, `buah.insert(${idx}, "${val}") — elemen setelah indeks ${idx} bergeser ke kanan`);
    });

    document.getElementById('btn-list-del').addEventListener('click', () => {
      if (state.list.length === 0) {
        window.CSVisualizer.showToast('List kosong!', 'error');
        return;
      }
      let idx = parseInt(document.getElementById('input-list-idx').value, 10);
      if (isNaN(idx) || idx < 0 || idx >= state.list.length) {
        window.CSVisualizer.showToast(`Indeks ${idx} di luar jangkauan (0 s/d ${state.list.length - 1})`, 'error');
        return;
      }
      const removed = state.list.splice(idx, 1)[0];
      updateListView(4, `del buah[${idx}] menghapus "${removed}" dan menggeser elemen di kanannya`);
    });

    updateListView(0);
    window.CSVisualizer.renderQuizCard('quiz-list', 'list');
  }

  /* ==========================================
   * 2. TUPLE VS LIST (IMMUTABILITY)
   * ========================================== */
  function renderTuple(root) {
    window.CSVisualizer.clearTimer();
    root.innerHTML = `
      <div class="space-y-6 animate-pop">
        <div class="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 p-4 sm:p-5 rounded-2xl">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">Immutability</span>
              <span class="px-2.5 py-0.5 text-xs font-mono rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">Read: O(1)</span>
            </div>
            <h2 class="text-lg sm:text-xl font-bold text-white">Tuple vs List (Sifat Immutable vs Mutable)</h2>
            <p class="text-xs sm:text-sm text-slate-400">Tuple bersifat <strong>Immutable</strong> (tersegel setelah dibuat), sedangkan List dapat dimodifikasi kapan saja.</p>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div class="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-5">
            <!-- Box Tuple Tergembok -->
            <div id="tuple-locked-card" class="bg-slate-950 border-2 border-amber-500/50 rounded-xl p-4 space-y-3 transition-all">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="px-2 py-0.5 text-xs font-mono rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">🔒 TUPLE (Immutable)</span>
                  <span class="text-xs font-mono text-slate-400">koordinat_gps = (-6.2088, 106.8456, "Jakarta")</span>
                </div>
              </div>
              <div class="grid grid-cols-3 gap-2">
                ${state.tuple.tupleData
                  .map(
                    (v, i) => `
                  <div class="bg-slate-900 border border-amber-500/30 rounded-lg p-2.5 text-center">
                    <div class="text-[10px] font-mono text-slate-500">koordinat[${i}]</div>
                    <div class="text-xs sm:text-sm font-mono font-bold text-amber-200 mt-0.5">${typeof v === 'string' ? `"${v}"` : v}</div>
                  </div>
                `
                  )
                  .join('')}
              </div>
              <div class="flex items-center justify-between pt-2">
                <span class="text-xs text-slate-400">Coba ubah nilai <code class="text-amber-300">koordinat[2] = "Bandung"</code>:</span>
                <button type="button" id="btn-tuple-mutate" class="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-xs font-semibold text-white transition">
                  Paksa Ubah Tuple!
                </button>
              </div>
              <div id="tuple-error-banner" class="hidden p-3 rounded-lg bg-rose-950/80 border border-rose-500 text-xs font-mono text-rose-200">
                TypeError: 'tuple' object does not support item assignment! (Data Tuple disegel di memori demi keamanan konstanta).
              </div>
            </div>

            <!-- Box List Fleksibel -->
            <div class="bg-slate-950 border-2 border-emerald-500/40 rounded-xl p-4 space-y-3">
              <div class="flex items-center justify-between">
                <span class="px-2 py-0.5 text-xs font-mono rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">🔓 LIST (Mutable)</span>
                <span class="text-xs font-mono text-slate-400">status_dokumen (Bisa diubah)</span>
              </div>
              <div id="tuple-list-compare" class="grid grid-cols-3 gap-2"></div>
              <div class="flex items-center justify-between pt-2">
                <span class="text-xs text-slate-400">Ubah <code class="text-emerald-300">status[0]</code> secara langsung:</span>
                <button type="button" id="btn-list-mutate-ok" class="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white transition">
                  Ubah List [0]
                </button>
              </div>
            </div>
          </div>

          <div class="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-3">
                <span class="text-xs font-semibold uppercase tracking-wider text-slate-400">Perbandingan Sintaks</span>
                <span class="text-[11px] font-mono text-amber-400">() vs []</span>
              </div>
              <div id="tuple-code-container" class="bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono space-y-1"></div>
            </div>
            <div class="mt-4 bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-300 space-y-1.5">
              <div class="font-semibold text-white">Kapan Menggunakan Tuple?</div>
              <p class="text-slate-400">Gunakan Tuple untuk data yang tidak boleh berubah secara tidak sengaja (seperti koordinat GPS, konfigurasi database, atau key pada Dictionary).</p>
            </div>
          </div>
        </div>

        <div id="quiz-tuple"></div>
      </div>
    `;

    function renderMutableListComparison(activeLine = 0, highlightCls = 'active-line') {
      const container = document.getElementById('tuple-list-compare');
      container.innerHTML = state.tuple.listData
        .map(
          (v, i) => `
        <div class="bg-slate-900 border border-emerald-500/30 rounded-lg p-2.5 text-center">
          <div class="text-[10px] font-mono text-slate-500">status[${i}]</div>
          <div class="text-xs sm:text-sm font-mono font-bold text-emerald-300 mt-0.5">"${v}"</div>
        </div>
      `
        )
        .join('');

      const codeLines = [
        `# Tuple menggunakan kurung biasa ()`,
        `koordinat = (-6.2088, 106.8456, "Jakarta")`,
        `koordinat[2] = "Bandung"  # ❌ TypeError!`,
        ``,
        `# List menggunakan kurung siku []`,
        `status = [${state.tuple.listData.map((x) => `"${x}"`).join(', ')}]`,
        `status[0] = "${state.tuple.listData[0]}"  # ✅ Berhasil diubah`
      ];

      window.CSVisualizer.renderCodeBlock('tuple-code-container', codeLines, activeLine, highlightCls);
    }

    document.getElementById('btn-tuple-mutate').addEventListener('click', () => {
      const card = document.getElementById('tuple-locked-card');
      const errBanner = document.getElementById('tuple-error-banner');
      card.classList.remove('animate-shake');
      void card.offsetWidth;
      card.classList.add('animate-shake');
      errBanner.classList.remove('hidden');
      renderMutableListComparison(2, 'active-false');
      window.CSVisualizer.showToast("TypeError: Tuple bersifat Immutable (tidak bisa diubah)!", 'error');
    });

    document.getElementById('btn-list-mutate-ok').addEventListener('click', () => {
      state.tuple.listData[0] = state.tuple.listData[0] === 'Draf' ? 'Revisi v2' : 'Draf';
      document.getElementById('tuple-error-banner').classList.add('hidden');
      renderMutableListComparison(6, 'active-true');
      window.CSVisualizer.showToast('List berhasil dimodifikasi secara langsung!', 'success');
    });

    renderMutableListComparison(1);
    window.CSVisualizer.renderQuizCard('quiz-tuple', 'tuple');
  }

  /* ==========================================
   * 3. DICTIONARY / HASH MAP (KEY-VALUE)
   * ========================================== */
  function renderDictionary(root) {
    window.CSVisualizer.clearTimer();
    root.innerHTML = `
      <div class="space-y-6 animate-pop">
        <div class="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 p-4 sm:p-5 rounded-2xl">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">Key-Value Store</span>
              <span class="px-2.5 py-0.5 text-xs font-mono rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">Lookup & Update: O(1) Avg</span>
            </div>
            <h2 class="text-lg sm:text-xl font-bold text-white">Dictionary / Hash Map (Pasangan Key : Value)</h2>
            <p class="text-xs sm:text-sm text-slate-400">Data diakses secara instan menggunakan <strong>Key unik</strong> melalui fungsi hash, tanpa perlu memeriksa elemen satu per satu.</p>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div class="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-5">
            <!-- Grid Kartu Key-Value -->
            <div>
              <div class="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">Hash Table Buckets (Key → Value)</div>
              <div id="dict-cards-grid" class="grid grid-cols-1 sm:grid-cols-2 gap-3"></div>
            </div>

            <!-- Form Tambah / Update & Lookup -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-950 border border-slate-800 p-4 rounded-xl items-end">
              <div>
                <label class="block text-xs text-slate-400 mb-1">Key (Kunci Unik)</label>
                <input id="input-dict-key" type="text" value="semester" maxlength="14"
                  class="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs sm:text-sm font-mono text-white" />
              </div>
              <div>
                <label class="block text-xs text-slate-400 mb-1">Value (Nilai)</label>
                <input id="input-dict-val" type="text" value="5" maxlength="18"
                  class="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs sm:text-sm font-mono text-white" />
              </div>
              <div class="flex gap-2">
                <button type="button" id="btn-dict-set" class="flex-1 py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white transition">
                  Set / Update
                </button>
                <button type="button" id="btn-dict-lookup" class="py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white transition">
                  Cari Key
                </button>
              </div>
            </div>
          </div>

          <div class="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-3">
                <span class="text-xs font-semibold uppercase tracking-wider text-slate-400">Kode Python Dictionary</span>
                <span class="text-[11px] font-mono text-emerald-400">O(1) Hash Lookup</span>
              </div>
              <div id="dict-code-container" class="bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono space-y-1"></div>
            </div>
            <div id="dict-status-box" class="mt-4 bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs font-mono text-cyan-300">
              > Masukkan Key untuk mencari atau memperbarui data dalam waktu konstan O(1).
            </div>
          </div>
        </div>

        <div id="quiz-dictionary"></div>
      </div>
    `;

    function computeHashSlot(keyStr) {
      let h = 0;
      for (let i = 0; i < keyStr.length; i++) {
        h = (h * 31 + keyStr.charCodeAt(i)) % 997;
      }
      return `0x${h.toString(16).toUpperCase().padStart(3, '0')}`;
    }

    function renderDictView(highlightedKey = null, activeLine = 0) {
      const grid = document.getElementById('dict-cards-grid');
      grid.innerHTML = state.dict
        .map((entry) => {
          const isTarget = entry.key === highlightedKey;
          const hashHex = computeHashSlot(entry.key);
          return `
            <div class="p-3.5 rounded-xl border transition-all duration-300 flex items-center justify-between ${
              isTarget
                ? 'border-2 border-emerald-400 bg-emerald-500/20 scale-105 shadow-lg'
                : 'border-slate-800 bg-slate-950'
            }">
              <div>
                <div class="flex items-center gap-1.5">
                  <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">hash: ${hashHex}</span>
                  <span class="text-xs font-mono font-bold text-indigo-300">"${entry.key}"</span>
                </div>
                <div class="text-xs sm:text-sm font-mono text-white mt-1">→ "${entry.value}"</div>
              </div>
              <button type="button" data-del-key="${entry.key}" class="dict-del-btn text-xs text-slate-500 hover:text-rose-400 px-2 py-1">
                ✕
              </button>
            </div>
          `;
        })
        .join('');

      grid.querySelectorAll('.dict-del-btn').forEach((btn) => {
        btn.addEventListener('click', function () {
          const k = this.getAttribute('data-del-key');
          state.dict = state.dict.filter((item) => item.key !== k);
          renderDictView(null, 5);
          document.getElementById('dict-status-box').textContent = `> del mahasiswa["${k}"] berhasil dihapus.`;
        });
      });

      const dictLines = [
        `mahasiswa = {`,
        ...state.dict.map((e) => `    "${e.key}": "${e.value}",`),
        `}`,
        `# Akses nilai O(1) via Key:`,
        `val = mahasiswa.get("${highlightedKey || 'nama'}")`,
        `# Tambah / Update Key-Value:`,
        `mahasiswa[key] = value`
      ];

      window.CSVisualizer.renderCodeBlock('dict-code-container', dictLines, activeLine);
    }

    document.getElementById('btn-dict-set').addEventListener('click', () => {
      const k = document.getElementById('input-dict-key').value.trim();
      const v = document.getElementById('input-dict-val').value.trim();
      if (!k) {
        window.CSVisualizer.showToast('Key tidak boleh kosong!', 'warning');
        return;
      }
      const existing = state.dict.find((item) => item.key === k);
      if (existing) {
        existing.value = v;
        renderDictView(k, state.dict.length + 5);
        document.getElementById('dict-status-box').textContent = `> Key "${k}" sudah ada: Value diperbarui menjadi "${v}" (Overwrite O(1)).`;
      } else {
        if (state.dict.length >= 6) {
          window.CSVisualizer.showToast('Maksimal 6 pasangan Key-Value untuk tampilan ini.', 'warning');
          return;
        }
        state.dict.push({ key: k, value: v });
        renderDictView(k, state.dict.length + 5);
        document.getElementById('dict-status-box').textContent = `> Key baru "${k}": "${v}" ditambahkan ke Hash Table.`;
      }
    });

    document.getElementById('btn-dict-lookup').addEventListener('click', () => {
      const k = document.getElementById('input-dict-key').value.trim();
      const found = state.dict.find((item) => item.key === k);
      if (found) {
        renderDictView(k, state.dict.length + 3);
        document.getElementById('dict-status-box').textContent = `> O(1) Hash ditemukan! mahasiswa["${k}"] mengembalikan "${found.value}"`;
      } else {
        renderDictView(null, state.dict.length + 3);
        document.getElementById('dict-status-box').textContent = `> KeyError: Key "${k}" tidak ditemukan di dalam Dictionary.`;
        window.CSVisualizer.showToast(`Key "${k}" tidak ditemukan!`, 'error');
      }
    });

    renderDictView();
    window.CSVisualizer.renderQuizCard('quiz-dictionary', 'dictionary');
  }

  /* ==========================================
   * 4. SET (ELEMEN UNIK & OPERASI HIMPUNAN)
   * ========================================== */
  function renderSet(root) {
    window.CSVisualizer.clearTimer();
    root.innerHTML = `
      <div class="space-y-6 animate-pop">
        <div class="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 p-4 sm:p-5 rounded-2xl">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">Unique Collection</span>
              <span class="px-2.5 py-0.5 text-xs font-mono rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">Membership Test: O(1)</span>
            </div>
            <h2 class="text-lg sm:text-xl font-bold text-white">Set (Himpunan Elemen Unik)</h2>
            <p class="text-xs sm:text-sm text-slate-400">Set otomatis menolak nilai duplikat dan mendukung operasi himpunan matematika seperti <strong>Union</strong>, <strong>Intersection</strong>, dan <strong>Difference</strong>.</p>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div class="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-5">
            <!-- Dua Himpunan A dan B -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div id="set-a-card" class="bg-slate-950 border border-indigo-500/40 rounded-xl p-4">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-xs font-mono font-bold text-indigo-300">Set A</span>
                  <span class="text-[11px] font-mono text-slate-400">Unik</span>
                </div>
                <div id="set-a-items" class="flex flex-wrap gap-2 min-h-[42px]"></div>
                <div class="mt-3 flex gap-2">
                  <input id="input-set-a" type="number" value="20" class="w-20 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-white" />
                  <button type="button" id="btn-set-a-add" class="flex-1 py-1.5 px-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white transition">
                    + A.add()
                  </button>
                </div>
              </div>

              <div id="set-b-card" class="bg-slate-950 border border-cyan-500/40 rounded-xl p-4">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-xs font-mono font-bold text-cyan-300">Set B</span>
                  <span class="text-[11px] font-mono text-slate-400">Unik</span>
                </div>
                <div id="set-b-items" class="flex flex-wrap gap-2 min-h-[42px]"></div>
                <div class="mt-3 flex gap-2">
                  <input id="input-set-b" type="number" value="70" class="w-20 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-white" />
                  <button type="button" id="btn-set-b-add" class="flex-1 py-1.5 px-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs font-semibold text-white transition">
                    + B.add()
                  </button>
                </div>
              </div>
            </div>

            <!-- Kontrol Operasi Himpunan -->
            <div class="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <span class="text-xs font-semibold text-slate-300">Operasi Himpunan (Venn Visualizer):</span>
                <div class="flex flex-wrap gap-2">
                  <button type="button" data-set-op="union" class="set-op-btn px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white">
                    Union (A | B)
                  </button>
                  <button type="button" data-set-op="intersection" class="set-op-btn px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700">
                    Intersection (A &amp; B)
                  </button>
                  <button type="button" data-set-op="difference" class="set-op-btn px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700">
                    Difference (A - B)
                  </button>
                </div>
              </div>

              <div class="p-4 rounded-xl bg-slate-900 border border-emerald-500/40">
                <div id="set-result-title" class="text-xs font-mono text-emerald-300 mb-2">Hasil Union (Gabungan A | B):</div>
                <div id="set-result-items" class="flex flex-wrap gap-2 min-h-[38px]"></div>
              </div>
            </div>
          </div>

          <div class="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-3">
                <span class="text-xs font-semibold uppercase tracking-wider text-slate-400">Kode Python Set</span>
                <span class="text-[11px] font-mono text-cyan-400">No Duplicates</span>
              </div>
              <div id="set-code-container" class="bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono space-y-1"></div>
            </div>
            <div id="set-log-box" class="mt-4 bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs font-mono text-amber-300">
              > Coba tambahkan angka 20 ke Set A untuk melihat penolakan elemen duplikat!
            </div>
          </div>
        </div>

        <div id="quiz-set"></div>
      </div>
    `;

    function updateSetView() {
      const renderBadges = (arr, colorCls) =>
        arr
          .map(
            (n) => `
          <span class="px-2.5 py-1 rounded-lg font-mono text-xs font-bold ${colorCls} animate-pop">
            ${n}
          </span>
        `
          )
          .join('');

      document.getElementById('set-a-items').innerHTML = renderBadges(
        state.setA,
        'bg-indigo-500/20 text-indigo-200 border border-indigo-500/40'
      );
      document.getElementById('set-b-items').innerHTML = renderBadges(
        state.setB,
        'bg-cyan-500/20 text-cyan-200 border border-cyan-500/40'
      );

      let result = [];
      let title = '';
      let activeLine = 4;

      if (state.setOperation === 'union') {
        result = Array.from(new Set([...state.setA, ...state.setB]));
        title = 'Hasil Union (A | B) — Semua anggota unik dari A maupun B:';
        activeLine = 4;
      } else if (state.setOperation === 'intersection') {
        result = state.setA.filter((x) => state.setB.includes(x));
        title = 'Hasil Intersection (A & B) — Anggota yang ada di A SEKALIGUS di B:';
        activeLine = 5;
      } else {
        result = state.setA.filter((x) => !state.setB.includes(x));
        title = 'Hasil Difference (A - B) — Anggota A yang TIDAK ada di B:';
        activeLine = 6;
      }

      document.getElementById('set-result-title').textContent = title;
      document.getElementById('set-result-items').innerHTML =
        result.length > 0
          ? renderBadges(result, 'bg-emerald-500/20 text-emerald-200 border border-emerald-500/50')
          : `<span class="text-xs font-mono text-slate-500">set() — Himpunan Kosong</span>`;

      const codeLines = [
        `A = {${state.setA.join(', ')}}`,
        `B = {${state.setB.join(', ')}}`,
        ``,
        `# Operasi Himpunan Matematika:`,
        `gabungan = A | B      # Union`,
        `irisan   = A & B      # Intersection`,
        `selisih  = A - B      # Difference`
      ];

      window.CSVisualizer.renderCodeBlock('set-code-container', codeLines, activeLine);
    }

    document.getElementById('btn-set-a-add').addEventListener('click', () => {
      const val = parseInt(document.getElementById('input-set-a').value, 10);
      if (isNaN(val)) return;
      if (state.setA.includes(val)) {
        const card = document.getElementById('set-a-card');
        card.classList.remove('animate-shake');
        void card.offsetWidth;
        card.classList.add('animate-shake');
        document.getElementById('set-log-box').textContent = `> Nilai ${val} sudah ada di Set A! Set menolak elemen duplikat.`;
        window.CSVisualizer.showToast(`Nilai ${val} sudah ada di Set A (Duplikat ditolak)!`, 'warning');
      } else {
        state.setA.push(val);
        document.getElementById('set-log-box').textContent = `> A.add(${val}) berhasil ditambahkan karena belum ada di Set A.`;
        updateSetView();
      }
    });

    document.getElementById('btn-set-b-add').addEventListener('click', () => {
      const val = parseInt(document.getElementById('input-set-b').value, 10);
      if (isNaN(val)) return;
      if (state.setB.includes(val)) {
        const card = document.getElementById('set-b-card');
        card.classList.remove('animate-shake');
        void card.offsetWidth;
        card.classList.add('animate-shake');
        document.getElementById('set-log-box').textContent = `> Nilai ${val} sudah ada di Set B! Set menolak elemen duplikat.`;
        window.CSVisualizer.showToast(`Nilai ${val} sudah ada di Set B (Duplikat ditolak)!`, 'warning');
      } else {
        state.setB.push(val);
        document.getElementById('set-log-box').textContent = `> B.add(${val}) berhasil ditambahkan ke Set B.`;
        updateSetView();
      }
    });

    root.querySelectorAll('.set-op-btn').forEach((btn) => {
      btn.addEventListener('click', function () {
        state.setOperation = this.getAttribute('data-set-op');
        root.querySelectorAll('.set-op-btn').forEach((b) => {
          b.className = 'set-op-btn px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700';
        });
        this.className = 'set-op-btn px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white';
        updateSetView();
      });
    });

    updateSetView();
    window.CSVisualizer.renderQuizCard('quiz-set', 'set');
  }

  return {
    renderList,
    renderTuple,
    renderDictionary,
    renderSet
  };
})();
