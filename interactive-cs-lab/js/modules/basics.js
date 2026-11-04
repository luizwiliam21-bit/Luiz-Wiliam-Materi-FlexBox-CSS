/**
 * basics.js
 * Modul Dasar Pemrograman:
 * 1. Variabel & Tipe Data
 * 2. Percabangan (If / Elif / Else)
 * 3. Perulangan (For & While Loops)
 * 4. Fungsi & Return Value
 */
window.CSBasics = (function () {
  // State untuk masing-masing sub-modul dasar
  const state = {
    variable: {
      name: 'skor_pemain',
      type: 'Number',
      value: '1250',
      address: '0x7F4A'
    },
    conditional: {
      nilai: 82
    },
    loop: {
      mode: 'for', // 'for' | 'while'
      limit: 5,
      currentI: 0,
      running: false,
      finished: false,
      speed: 750,
      history: []
    },
    func: {
      harga: 150000,
      diskon: 20,
      step: 0 // 0: idle, 1: input, 2: process, 3: return
    }
  };

  /* ==========================================
   * 1. VARIABEL & TIPE DATA
   * ========================================== */
  function renderVariables(root) {
    window.CSVisualizer.clearTimer();
    root.innerHTML = `
      <div class="space-y-6 animate-pop">
        <!-- Header Modul -->
        <div class="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 p-4 sm:p-5 rounded-2xl">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">Core Basics</span>
              <span class="px-2.5 py-0.5 text-xs font-mono rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">Time: O(1) Assignment</span>
            </div>
            <h2 class="text-lg sm:text-xl font-bold text-white">Variabel & Tipe Data</h2>
            <p class="text-xs sm:text-sm text-slate-400">Analogi loker penyimpanan memori berlabel nama variabel, nilai, dan tipe datanya.</p>
          </div>
        </div>

        <!-- Grid Visual + Code -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <!-- Panel Kontrol & Visualisasi Loker (7 cols) -->
          <div class="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-6">
            <div>
              <h3 class="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Simulasi Loker Memori (RAM)</h3>

              <!-- Visual Loker -->
              <div class="relative bg-slate-950 border-2 border-indigo-500/50 rounded-2xl p-6 flex flex-col items-center justify-center shadow-inner min-h-[210px]">
                <div class="absolute top-3 left-4 text-[11px] font-mono text-slate-500">Alamat RAM: <span id="var-addr-badge" class="text-slate-400">${state.variable.address}</span></div>
                <div id="var-type-badge" class="absolute top-3 right-4 px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                  ${state.variable.type}
                </div>

                <!-- Label Nama Variabel -->
                <div class="mt-4 px-3 py-1 rounded-t-lg bg-slate-800 border border-b-0 border-slate-700 text-xs font-mono text-cyan-300">
                  Label: <strong id="var-name-display">${state.variable.name}</strong>
                </div>

                <!-- Kotak Nilai -->
                <div id="var-box-container" class="w-full max-w-xs bg-gradient-to-b from-slate-900 to-slate-800 border-2 border-indigo-500 rounded-xl p-6 text-center shadow-lg transition-all duration-300">
                  <div id="var-value-display" class="text-2xl sm:text-3xl font-mono font-bold text-white break-all">
                    ${formatVariableValue(state.variable.value, state.variable.type)}
                  </div>
                  <p id="var-desc-display" class="text-xs text-slate-400 mt-2">
                    Disimpan sebagai angka numerik untuk operasi matematika.
                  </p>
                </div>
              </div>
            </div>

            <!-- Form Kontrol Interaktif -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-800/80">
              <div>
                <label class="block text-xs text-slate-400 mb-1">Nama Variabel (Identifier)</label>
                <input id="input-var-name" type="text" value="${state.variable.name}" maxlength="20"
                  class="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs sm:text-sm font-mono text-white focus:outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label class="block text-xs text-slate-400 mb-1">Tipe Data</label>
                <select id="select-var-type"
                  class="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-indigo-500">
                  <option value="Number" ${state.variable.type === 'Number' ? 'selected' : ''}>Number (int/float)</option>
                  <option value="String" ${state.variable.type === 'String' ? 'selected' : ''}>String (teks)</option>
                  <option value="Boolean" ${state.variable.type === 'Boolean' ? 'selected' : ''}>Boolean (True/False)</option>
                </select>
              </div>
              <div>
                <label class="block text-xs text-slate-400 mb-1">Isi Nilai (Value)</label>
                <input id="input-var-val" type="text" value="${state.variable.value}" maxlength="24"
                  class="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs sm:text-sm font-mono text-white focus:outline-none focus:border-indigo-500" />
              </div>
            </div>

            <div class="flex flex-wrap gap-2">
              <button type="button" id="btn-var-preset-str" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 border border-slate-700 transition">
                Contoh String ("Andi")
              </button>
              <button type="button" id="btn-var-preset-num" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 border border-slate-700 transition">
                Contoh Number (3.14)
              </button>
              <button type="button" id="btn-var-preset-bool" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 border border-slate-700 transition">
                Contoh Boolean (True)
              </button>
            </div>
          </div>

          <!-- Panel Sinkronisasi Kode (5 cols) -->
          <div class="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-3">
                <span class="text-xs font-semibold uppercase tracking-wider text-slate-400">Live Python Code</span>
                <span class="text-[11px] font-mono text-indigo-400">Execution Sync</span>
              </div>
              <div id="var-code-container" class="bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono space-y-1"></div>
            </div>

            <div class="mt-4 bg-slate-950/90 border border-slate-800 rounded-xl p-4">
              <div class="text-xs font-semibold text-slate-400 mb-2">Output Konsol Terminal:</div>
              <pre id="var-console-out" class="text-xs font-mono text-emerald-400 whitespace-pre-wrap"></pre>
            </div>
          </div>
        </div>

        <div id="quiz-variables"></div>
      </div>
    `;

    function updateVariableView(highlightIdx = 1) {
      const rawName = document.getElementById('input-var-name').value.trim() || 'data';
      const safeName = rawName.replace(/[^a-zA-Z0-9_]/g, '_') || 'variabel';
      const type = document.getElementById('select-var-type').value;
      let val = document.getElementById('input-var-val').value;

      if (type === 'Number') {
        const parsed = parseFloat(val);
        val = isNaN(parsed) ? '0' : String(parsed);
      } else if (type === 'Boolean') {
        const lower = val.trim().toLowerCase();
        val = lower === 'false' || lower === '0' ? 'False' : 'True';
      }

      state.variable.name = safeName;
      state.variable.type = type;
      state.variable.value = val;

      const formatted = formatVariableValue(val, type);
      const pyType = type === 'Number' ? (val.includes('.') ? 'float' : 'int') : type === 'Boolean' ? 'bool' : 'str';

      document.getElementById('var-name-display').textContent = safeName;
      document.getElementById('var-value-display').textContent = formatted;
      document.getElementById('var-type-badge').textContent = `${type} (${pyType})`;

      const descEl = document.getElementById('var-desc-display');
      if (type === 'String') {
        descEl.textContent = 'Disimpan sebagai urutan karakter teks (diapit tanda kutip).';
      } else if (type === 'Boolean') {
        descEl.textContent = 'Nilai logika biner: hanya memiliki keadaan True atau False.';
      } else {
        descEl.textContent = 'Nilai numerik yang dapat dihitung dengan operator aritmatika.';
      }

      const box = document.getElementById('var-box-container');
      box.classList.remove('scale-105');
      void box.offsetWidth;
      box.classList.add('scale-105');
      setTimeout(() => box.classList.remove('scale-105'), 200);

      const codeLines = [
        `# 1. Deklarasi & Assignment Variabel`,
        `${safeName} = ${formatted}`,
        ``,
        `# 2. Cek nilai dan tipe data di memori`,
        `print("Isi loker:", ${safeName})`,
        `print("Tipe data:", type(${safeName}))`
      ];

      window.CSVisualizer.renderCodeBlock('var-code-container', codeLines, highlightIdx);
      document.getElementById('var-console-out').textContent = `> Isi loker: ${val}\n> Tipe data: <class '${pyType}'>`;
    }

    document.getElementById('input-var-name').addEventListener('input', () => updateVariableView(1));
    document.getElementById('input-var-val').addEventListener('input', () => updateVariableView(1));
    document.getElementById('select-var-type').addEventListener('change', (e) => {
      const t = e.target.value;
      const valInput = document.getElementById('input-var-val');
      if (t === 'Boolean') valInput.value = 'True';
      else if (t === 'Number' && isNaN(parseFloat(valInput.value))) valInput.value = '100';
      else if (t === 'String' && (valInput.value === 'True' || valInput.value === '100')) valInput.value = 'Halo Python';
      updateVariableView(1);
    });

    document.getElementById('btn-var-preset-str').addEventListener('click', () => {
      document.getElementById('input-var-name').value = 'nama_siswa';
      document.getElementById('select-var-type').value = 'String';
      document.getElementById('input-var-val').value = 'Andi Pratama';
      updateVariableView(1);
    });

    document.getElementById('btn-var-preset-num').addEventListener('click', () => {
      document.getElementById('input-var-name').value = 'pi_konstanta';
      document.getElementById('select-var-type').value = 'Number';
      document.getElementById('input-var-val').value = '3.14';
      updateVariableView(1);
    });

    document.getElementById('btn-var-preset-bool').addEventListener('click', () => {
      document.getElementById('input-var-name').value = 'lulus_ujian';
      document.getElementById('select-var-type').value = 'Boolean';
      document.getElementById('input-var-val').value = 'True';
      updateVariableView(1);
    });

    updateVariableView(1);
    window.CSVisualizer.renderQuizCard('quiz-variables', 'variables');
  }

  function formatVariableValue(val, type) {
    if (type === 'String') return `"${val.replace(/^"|"$/g, '')}"`;
    if (type === 'Boolean') {
      const lower = String(val).toLowerCase();
      return lower === 'false' || lower === '0' ? 'False' : 'True';
    }
    const num = parseFloat(val);
    return isNaN(num) ? '0' : String(num);
  }

  /* ==========================================
   * 2. PERCABANGAN (IF / ELIF / ELSE)
   * ========================================== */
  function renderConditionals(root) {
    window.CSVisualizer.clearTimer();
    root.innerHTML = `
      <div class="space-y-6 animate-pop">
        <div class="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 p-4 sm:p-5 rounded-2xl">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">Control Flow</span>
              <span class="px-2.5 py-0.5 text-xs font-mono rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">Time: O(1) Evaluation</span>
            </div>
            <h2 class="text-lg sm:text-xl font-bold text-white">Percabangan (If / Elif / Else)</h2>
            <p class="text-xs sm:text-sm text-slate-400">Geser slider nilai ujian dan amati bagaimana komputer mengevaluasi gerbang logika dari atas ke bawah.</p>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <!-- Flowchart Visual (7 cols) -->
          <div class="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-5">
            <!-- Slider Input -->
            <div class="bg-slate-950 border border-slate-800 rounded-xl p-4">
              <div class="flex items-center justify-between mb-2">
                <label for="slider-nilai" class="text-xs sm:text-sm font-medium text-slate-300">Input Nilai Ujian (` + '`nilai`' + `):</label>
                <span id="cond-score-badge" class="px-3 py-1 rounded-lg bg-indigo-500/20 border border-indigo-500/40 font-mono text-base font-bold text-indigo-300">
                  ${state.conditional.nilai}
                </span>
              </div>
              <input id="slider-nilai" type="range" min="0" max="100" value="${state.conditional.nilai}"
                class="w-full accent-indigo-500 cursor-pointer" />
              <div class="flex justify-between text-[11px] font-mono text-slate-500 mt-1">
                <span>0</span>
                <span>Batas C (60)</span>
                <span>Batas B (75)</span>
                <span>Batas A (85)</span>
                <span>100</span>
              </div>
            </div>

            <!-- Diagram Alur Keputusan -->
            <div class="space-y-3" id="cond-flowchart">
              <!-- Cabang 1: IF >= 85 -->
              <div id="branch-a" class="p-3.5 rounded-xl border transition-all duration-300 flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <span id="lamp-a" class="w-3.5 h-3.5 rounded-full"></span>
                  <div>
                    <div class="text-xs font-mono font-semibold">1. if nilai >= 85:</div>
                    <div class="text-xs text-slate-400">Predikat <strong class="text-white">Grade A (Sangat Baik)</strong></div>
                  </div>
                </div>
                <span id="status-a" class="text-xs font-mono px-2.5 py-1 rounded-md"></span>
              </div>

              <!-- Cabang 2: ELIF >= 75 -->
              <div id="branch-b" class="p-3.5 rounded-xl border transition-all duration-300 flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <span id="lamp-b" class="w-3.5 h-3.5 rounded-full"></span>
                  <div>
                    <div class="text-xs font-mono font-semibold">2. elif nilai >= 75:</div>
                    <div class="text-xs text-slate-400">Predikat <strong class="text-white">Grade B (Baik)</strong></div>
                  </div>
                </div>
                <span id="status-b" class="text-xs font-mono px-2.5 py-1 rounded-md"></span>
              </div>

              <!-- Cabang 3: ELIF >= 60 -->
              <div id="branch-c" class="p-3.5 rounded-xl border transition-all duration-300 flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <span id="lamp-c" class="w-3.5 h-3.5 rounded-full"></span>
                  <div>
                    <div class="text-xs font-mono font-semibold">3. elif nilai >= 60:</div>
                    <div class="text-xs text-slate-400">Predikat <strong class="text-white">Grade C (Cukup)</strong></div>
                  </div>
                </div>
                <span id="status-c" class="text-xs font-mono px-2.5 py-1 rounded-md"></span>
              </div>

              <!-- Cabang 4: ELSE -->
              <div id="branch-d" class="p-3.5 rounded-xl border transition-all duration-300 flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <span id="lamp-d" class="w-3.5 h-3.5 rounded-full"></span>
                  <div>
                    <div class="text-xs font-mono font-semibold">4. else:</div>
                    <div class="text-xs text-slate-400">Predikat <strong class="text-white">Grade D (Remedial)</strong></div>
                  </div>
                </div>
                <span id="status-d" class="text-xs font-mono px-2.5 py-1 rounded-md"></span>
              </div>
            </div>
          </div>

          <!-- Kode & Hasil Keputusan (5 cols) -->
          <div class="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-3">
                <span class="text-xs font-semibold uppercase tracking-wider text-slate-400">Jalur Eksekusi Kode</span>
                <span class="text-[11px] font-mono text-emerald-400">Branch Highlight</span>
              </div>
              <div id="cond-code-container" class="bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono space-y-0.5"></div>
            </div>

            <div class="mt-4 bg-slate-950 border border-slate-800 rounded-xl p-4">
              <div class="text-xs text-slate-400 mb-1">Keputusan Akhir Program:</div>
              <div id="cond-final-output" class="text-sm sm:text-base font-mono font-bold text-emerald-400"></div>
            </div>
          </div>
        </div>

        <div id="quiz-conditionals"></div>
      </div>
    `;

    function updateConditionals() {
      const n = parseInt(document.getElementById('slider-nilai').value, 10);
      state.conditional.nilai = n;
      document.getElementById('cond-score-badge').textContent = n;

      let activeLine = 2;
      let grade = '';
      let activeBranch = '';

      if (n >= 85) {
        activeLine = 2;
        grade = 'Grade A (Sangat Baik)';
        activeBranch = 'a';
      } else if (n >= 75) {
        activeLine = 4;
        grade = 'Grade B (Baik)';
        activeBranch = 'b';
      } else if (n >= 60) {
        activeLine = 6;
        grade = 'Grade C (Cukup)';
        activeBranch = 'c';
      } else {
        activeLine = 8;
        grade = 'Grade D (Remedial)';
        activeBranch = 'd';
      }

      const branches = [
        { id: 'a', cond: n >= 85, evaluated: true },
        { id: 'b', cond: n >= 75, evaluated: n < 85 },
        { id: 'c', cond: n >= 60, evaluated: n < 75 },
        { id: 'd', cond: n < 60, evaluated: n < 60 }
      ];

      branches.forEach((b) => {
        const box = document.getElementById(`branch-${b.id}`);
        const lamp = document.getElementById(`lamp-${b.id}`);
        const st = document.getElementById(`status-${b.id}`);

        if (b.id === activeBranch) {
          box.className = 'p-3.5 rounded-xl border-2 border-emerald-500 bg-emerald-500/15 transition-all duration-300 flex items-center justify-between';
          lamp.className = 'w-3.5 h-3.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]';
          st.className = 'text-xs font-mono px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 font-semibold';
          st.textContent = 'TRUE (Dieksekusi)';
        } else if (b.evaluated) {
          box.className = 'p-3.5 rounded-xl border border-rose-500/40 bg-rose-950/20 transition-all duration-300 flex items-center justify-between';
          lamp.className = 'w-3.5 h-3.5 rounded-full bg-rose-400';
          st.className = 'text-xs font-mono px-2.5 py-1 rounded-md bg-rose-500/15 text-rose-300';
          st.textContent = 'FALSE (Lanjut)';
        } else {
          box.className = 'p-3.5 rounded-xl border border-slate-800 bg-slate-950/50 opacity-55 transition-all duration-300 flex items-center justify-between';
          lamp.className = 'w-3.5 h-3.5 rounded-full bg-slate-600';
          st.className = 'text-xs font-mono px-2.5 py-1 rounded-md bg-slate-800 text-slate-400';
          st.textContent = 'Dilewati (Skipped)';
        }
      });

      const codeLines = [
        `nilai = ${n}`,
        `if nilai >= 85:`,
        `    hasil = "Grade A (Sangat Baik)"`,
        `elif nilai >= 75:`,
        `    hasil = "Grade B (Baik)"`,
        `elif nilai >= 60:`,
        `    hasil = "Grade C (Cukup)"`,
        `else:`,
        `    hasil = "Grade D (Remedial)"`,
        `print(hasil)`
      ];

      window.CSVisualizer.renderCodeBlock('cond-code-container', codeLines, activeLine, 'active-true');
      document.getElementById('cond-final-output').textContent = `Output: "${grade}"`;
    }

    document.getElementById('slider-nilai').addEventListener('input', updateConditionals);
    updateConditionals();
    window.CSVisualizer.renderQuizCard('quiz-conditionals', 'conditionals');
  }

  /* ==========================================
   * 3. PERULANGAN (FOR & WHILE LOOPS)
   * ========================================== */
  function renderLoops(root) {
    window.CSVisualizer.clearTimer();
    state.loop.currentI = 0;
    state.loop.running = false;
    state.loop.finished = false;
    state.loop.history = [];

    root.innerHTML = `
      <div class="space-y-6 animate-pop">
        <div class="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 p-4 sm:p-5 rounded-2xl">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">Iteration</span>
              <span class="px-2.5 py-0.5 text-xs font-mono rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">Time: O(n) Iterations</span>
            </div>
            <h2 class="text-lg sm:text-xl font-bold text-white">Perulangan (For & While Loops)</h2>
            <p class="text-xs sm:text-sm text-slate-400">Jalankan putaran iterasi selangkah demi selangkah dan pantau perubahan nilai variabel counter <code class="text-indigo-300">i</code>.</p>
          </div>
          <div class="flex gap-2">
            <button type="button" id="btn-loop-mode-for" class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white">For Loop</button>
            <button type="button" id="btn-loop-mode-while" class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700">While Loop</button>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <!-- Visual Track & Controls (7 cols) -->
          <div class="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-5">
            <!-- Kontrol Utama -->
            <div class="flex flex-wrap items-center justify-between gap-3 bg-slate-950 border border-slate-800 p-4 rounded-xl">
              <div class="flex items-center gap-2">
                <button type="button" id="btn-loop-step" class="px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white transition">
                  Step Next
                </button>
                <button type="button" id="btn-loop-play" class="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white transition">
                  Auto Play
                </button>
                <button type="button" id="btn-loop-reset" class="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 border border-slate-700 transition">
                  Reset
                </button>
              </div>
              <div class="flex items-center gap-3">
                <label class="text-xs text-slate-400">Batas (<code class="text-indigo-300">N</code>): <strong id="loop-limit-label" class="text-white">${state.loop.limit}</strong></label>
                <input id="slider-loop-limit" type="range" min="3" max="8" value="${state.loop.limit}" class="w-24 accent-indigo-500" />
              </div>
            </div>

            <!-- Status Monitor -->
            <div class="grid grid-cols-3 gap-3 text-center">
              <div class="bg-slate-950 border border-slate-800 p-3 rounded-xl">
                <div class="text-[11px] text-slate-400">Counter (<code class="text-indigo-300">i</code>)</div>
                <div id="loop-stat-i" class="text-xl font-mono font-bold text-white mt-0.5">0</div>
              </div>
              <div class="bg-slate-950 border border-slate-800 p-3 rounded-xl">
                <div class="text-[11px] text-slate-400">Uji Kondisi (<code class="text-indigo-300">i &lt; N</code>)</div>
                <div id="loop-stat-cond" class="text-sm font-mono font-semibold text-emerald-400 mt-1">0 &lt; 5 (True)</div>
              </div>
              <div class="bg-slate-950 border border-slate-800 p-3 rounded-xl">
                <div class="text-[11px] text-slate-400">Status Loop</div>
                <div id="loop-stat-state" class="text-xs font-semibold text-indigo-300 mt-1.5">Siap Jalan</div>
              </div>
            </div>

            <!-- Jalur Visual Langkah Loop -->
            <div>
              <div class="text-xs font-semibold text-slate-400 mb-2">Lintasan Iterasi (0 s/d N-1):</div>
              <div id="loop-stones-track" class="grid grid-cols-4 sm:grid-cols-8 gap-2"></div>
            </div>

            <!-- Log Output Iterasi -->
            <div class="bg-slate-950 border border-slate-800 rounded-xl p-3.5">
              <div class="text-xs font-semibold text-slate-400 mb-2">Log Eksekusi Badan Loop:</div>
              <div id="loop-log-items" class="flex flex-wrap gap-2 min-h-[36px] items-center text-xs font-mono text-slate-300"></div>
            </div>
          </div>

          <!-- Code Panel (5 cols) -->
          <div class="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-3">
                <span class="text-xs font-semibold uppercase tracking-wider text-slate-400">Sinkronisasi Kode Loop</span>
                <span id="loop-mode-badge" class="text-[11px] font-mono text-indigo-400">Python For-Loop</span>
              </div>
              <div id="loop-code-container" class="bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono space-y-1"></div>
            </div>

            <div class="mt-4 bg-indigo-950/30 border border-indigo-500/30 rounded-xl p-3.5 text-xs text-indigo-200 leading-relaxed">
              <strong>Catatan Penting:</strong> Perulangan berhenti tepat ketika nilai <code class="font-mono">i</code> mencapai <code class="font-mono">N</code> karena kondisi <code class="font-mono">i &lt; N</code> bernilai <span class="text-rose-300 font-semibold">False</span>.
            </div>
          </div>
        </div>

        <div id="quiz-loops"></div>
      </div>
    `;

    function renderLoopUI(activeLine = 0) {
      const { mode, limit, currentI, finished, history } = state.loop;
      document.getElementById('loop-limit-label').textContent = limit;
      document.getElementById('loop-stat-i').textContent = currentI;

      const condTrue = currentI < limit;
      const condEl = document.getElementById('loop-stat-cond');
      condEl.textContent = `${currentI} < ${limit} (${condTrue ? 'True' : 'False'})`;
      condEl.className = `text-sm font-mono font-semibold mt-1 ${condTrue ? 'text-emerald-400' : 'text-rose-400'}`;

      const stateEl = document.getElementById('loop-stat-state');
      if (finished) {
        stateEl.textContent = 'Selesai (Terminated)';
        stateEl.className = 'text-xs font-semibold text-emerald-400 mt-1.5';
      } else if (state.loop.running) {
        stateEl.textContent = 'Sedang Berputar...';
        stateEl.className = 'text-xs font-semibold text-amber-300 mt-1.5';
      } else {
        stateEl.textContent = 'Mode Manual / Pause';
        stateEl.className = 'text-xs font-semibold text-indigo-300 mt-1.5';
      }

      // Render lintasan batu loncatan
      const trackEl = document.getElementById('loop-stones-track');
      let stonesHtml = '';
      for (let idx = 0; idx < limit; idx++) {
        const isDone = history.includes(idx);
        const isCurrent = !finished && idx === currentI;
        stonesHtml += `
          <div class="p-2.5 rounded-xl border text-center transition-all ${
            isCurrent
              ? 'border-indigo-400 bg-indigo-500/30 text-white scale-105 shadow-md'
              : isDone
              ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-300'
              : 'border-slate-800 bg-slate-950 text-slate-500'
          }">
            <div class="text-[10px] font-mono">i = ${idx}</div>
            <div class="text-xs font-bold mt-0.5">${isDone ? '✓' : isCurrent ? '●' : '○'}</div>
          </div>
        `;
      }
      trackEl.innerHTML = stonesHtml;

      // Render log
      const logEl = document.getElementById('loop-log-items');
      if (history.length === 0) {
        logEl.innerHTML = `<span class="text-slate-500 italic">Belum ada iterasi yang dijalankan. Klik "Step Next" atau "Auto Play".</span>`;
      } else {
        logEl.innerHTML = history
          .map(
            (val) =>
              `<span class="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-emerald-300 animate-pop">Putaran ke-${val + 1} (i=${val})</span>`
          )
          .join('');
      }

      // Render kode
      const codeLines =
        mode === 'for'
          ? [
              `N = ${limit}`,
              `for i in range(0, N):`,
              `    print("Iterasi i =", i)`,
              `# Loop selesai saat i == ${limit}`
            ]
          : [
              `i = 0`,
              `N = ${limit}`,
              `while i < N:`,
              `    print("Iterasi i =", i)`,
              `    i = i + 1`,
              `# Loop berhenti saat i == ${limit}`
            ];

      const highlightCls = finished ? 'active-false' : 'active-line';
      window.CSVisualizer.renderCodeBlock('loop-code-container', codeLines, activeLine, highlightCls);
    }

    function stepLoop() {
      if (state.loop.finished) {
        window.CSVisualizer.showToast('Loop sudah selesai! Klik Reset untuk mengulang.', 'info');
        return;
      }

      const { currentI, limit, mode } = state.loop;
      if (currentI < limit) {
        state.loop.history.push(currentI);
        state.loop.currentI = currentI + 1;
        if (state.loop.currentI >= limit) {
          state.loop.finished = true;
          stopAutoLoop();
          renderLoopUI(mode === 'for' ? 3 : 5);
        } else {
          renderLoopUI(mode === 'for' ? 2 : 3);
        }
      }
    }

    function stopAutoLoop() {
      window.CSVisualizer.clearTimer();
      state.loop.running = false;
      const playBtn = document.getElementById('btn-loop-play');
      if (playBtn) playBtn.textContent = 'Auto Play';
    }

    function resetLoop() {
      stopAutoLoop();
      state.loop.currentI = 0;
      state.loop.finished = false;
      state.loop.history = [];
      renderLoopUI(state.loop.mode === 'for' ? 1 : 2);
    }

    document.getElementById('btn-loop-step').addEventListener('click', () => {
      stopAutoLoop();
      stepLoop();
    });

    document.getElementById('btn-loop-play').addEventListener('click', () => {
      if (state.loop.running) {
        stopAutoLoop();
        renderLoopUI(state.loop.mode === 'for' ? 1 : 2);
        return;
      }
      if (state.loop.finished) {
        resetLoop();
      }
      state.loop.running = true;
      document.getElementById('btn-loop-play').textContent = 'Pause';
      renderLoopUI(state.loop.mode === 'for' ? 2 : 3);
      const timerId = setInterval(() => {
        if (!state.loop.finished) {
          stepLoop();
        } else {
          stopAutoLoop();
        }
      }, state.loop.speed);
      window.CSVisualizer.setTimer(timerId);
    });

    document.getElementById('btn-loop-reset').addEventListener('click', resetLoop);

    document.getElementById('slider-loop-limit').addEventListener('input', (e) => {
      state.loop.limit = parseInt(e.target.value, 10);
      resetLoop();
    });

    document.getElementById('btn-loop-mode-for').addEventListener('click', function () {
      state.loop.mode = 'for';
      this.className = 'px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white';
      document.getElementById('btn-loop-mode-while').className = 'px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700';
      document.getElementById('loop-mode-badge').textContent = 'Python For-Loop';
      resetLoop();
    });

    document.getElementById('btn-loop-mode-while').addEventListener('click', function () {
      state.loop.mode = 'while';
      this.className = 'px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white';
      document.getElementById('btn-loop-mode-for').className = 'px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700';
      document.getElementById('loop-mode-badge').textContent = 'Python While-Loop';
      resetLoop();
    });

    renderLoopUI(1);
    window.CSVisualizer.renderQuizCard('quiz-loops', 'loops');
  }

  /* ==========================================
   * 4. FUNGSI & RETURN VALUE
   * ========================================== */
  function renderFunctions(root) {
    window.CSVisualizer.clearTimer();
    root.innerHTML = `
      <div class="space-y-6 animate-pop">
        <div class="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 p-4 sm:p-5 rounded-2xl">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">Modular Code</span>
              <span class="px-2.5 py-0.5 text-xs font-mono rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">Reusable Block</span>
            </div>
            <h2 class="text-lg sm:text-xl font-bold text-white">Fungsi (Parameters & Return Value)</h2>
            <p class="text-xs sm:text-sm text-slate-400">Analogi mesin pemroses: menerima input argumen, mengolah di dalam fungsi, dan mengembalikan nilai via <code class="text-indigo-300">return</code>.</p>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <!-- Mesin Fungsi Visual (7 cols) -->
          <div class="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-5">
            <!-- Form Argumen -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-950 border border-slate-800 p-4 rounded-xl items-end">
              <div>
                <label class="block text-xs text-slate-400 mb-1">Parameter <code class="text-cyan-300">harga</code> (Rp)</label>
                <input id="input-fn-harga" type="number" step="10000" min="10000" value="${state.func.harga}"
                  class="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs sm:text-sm font-mono text-white" />
              </div>
              <div>
                <label class="block text-xs text-slate-400 mb-1">Parameter <code class="text-cyan-300">diskon_persen</code> (%)</label>
                <input id="input-fn-diskon" type="number" step="5" min="0" max="90" value="${state.func.diskon}"
                  class="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs sm:text-sm font-mono text-white" />
              </div>
              <button type="button" id="btn-fn-call"
                class="w-full py-2 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs sm:text-sm font-semibold text-white transition shadow-lg">
                Panggil Fungsi ()
              </button>
            </div>

            <!-- Pipeline 3 Tahap: Input -> Mesin -> Return -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 items-stretch">
              <div id="fn-stage-1" class="p-4 rounded-xl border border-slate-800 bg-slate-950 flex flex-col justify-between transition-all">
                <div class="text-xs font-semibold text-cyan-400 uppercase">1. Argumen Masuk</div>
                <div id="fn-arg-view" class="my-3 font-mono text-xs sm:text-sm text-slate-200"></div>
                <div class="text-[11px] text-slate-500">Dikirim saat pemanggilan fungsi</div>
              </div>

              <div id="fn-stage-2" class="p-4 rounded-xl border border-slate-800 bg-slate-950 flex flex-col justify-between transition-all">
                <div class="text-xs font-semibold text-indigo-400 uppercase">2. Proses Internal</div>
                <div id="fn-proc-view" class="my-3 font-mono text-xs text-slate-200 space-y-1"></div>
                <div class="text-[11px] text-slate-500">Variabel lokal dihitung</div>
              </div>

              <div id="fn-stage-3" class="p-4 rounded-xl border border-slate-800 bg-slate-950 flex flex-col justify-between transition-all">
                <div class="text-xs font-semibold text-emerald-400 uppercase">3. Return Value</div>
                <div id="fn-ret-view" class="my-3 font-mono text-lg font-bold text-emerald-400"></div>
                <div class="text-[11px] text-slate-500">Disimpan ke variabel pemanggil</div>
              </div>
            </div>
          </div>

          <!-- Kode Fungsi (5 cols) -->
          <div class="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-3">
                <span class="text-xs font-semibold uppercase tracking-wider text-slate-400">Definisi & Pemanggilan</span>
                <span class="text-[11px] font-mono text-indigo-400">Function Scope</span>
              </div>
              <div id="fn-code-container" class="bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono space-y-1"></div>
            </div>
            <div class="mt-4 bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs font-mono text-emerald-300" id="fn-console-box"></div>
          </div>
        </div>

        <div id="quiz-functions"></div>
      </div>
    `;

    function updateFunctionVisual(activeLine = 5) {
      const harga = Math.max(0, parseInt(document.getElementById('input-fn-harga').value, 10) || 0);
      const diskon = Math.min(100, Math.max(0, parseInt(document.getElementById('input-fn-diskon').value, 10) || 0));
      state.func.harga = harga;
      state.func.diskon = diskon;

      const potongan = Math.round((harga * diskon) / 100);
      const bayar = harga - potongan;

      document.getElementById('fn-arg-view').innerHTML = `harga = ${harga}<br/>diskon = ${diskon}%`;
      document.getElementById('fn-proc-view').innerHTML = `potongan = ${potongan}<br/>total = ${harga} - ${potongan}`;
      document.getElementById('fn-ret-view').textContent = `Rp ${bayar.toLocaleString('id-ID')}`;

      const codeLines = [
        `def hitung_bayar(harga, diskon):`,
        `    potongan = harga * (diskon / 100)`,
        `    total_akhir = harga - potongan`,
        `    return total_akhir`,
        ``,
        `hasil = hitung_bayar(${harga}, ${diskon})`,
        `print("Total Bayar:", hasil)`
      ];

      window.CSVisualizer.renderCodeBlock('fn-code-container', codeLines, activeLine);
      document.getElementById('fn-console-box').textContent = `> Total Bayar: ${bayar}`;
    }

    document.getElementById('btn-fn-call').addEventListener('click', () => {
      window.CSVisualizer.clearTimer();
      const s1 = document.getElementById('fn-stage-1');
      const s2 = document.getElementById('fn-stage-2');
      const s3 = document.getElementById('fn-stage-3');

      [s1, s2, s3].forEach((el) => (el.className = 'p-4 rounded-xl border border-slate-800 bg-slate-950 flex flex-col justify-between transition-all'));

      updateFunctionVisual(5);
      s1.classList.add('border-cyan-400', 'bg-cyan-950/30', 'scale-105');

      const t1 = setTimeout(() => {
        s1.classList.remove('scale-105');
        s2.classList.add('border-indigo-400', 'bg-indigo-950/30', 'scale-105');
        updateFunctionVisual(2);
      }, 450);

      const t2 = setTimeout(() => {
        s2.classList.remove('scale-105');
        s3.classList.add('border-emerald-400', 'bg-emerald-950/30', 'scale-105');
        updateFunctionVisual(3);
        setTimeout(() => s3.classList.remove('scale-105'), 350);
      }, 950);

      window.CSVisualizer.setTimer(t2);
    });

    document.getElementById('input-fn-harga').addEventListener('input', () => updateFunctionVisual(5));
    document.getElementById('input-fn-diskon').addEventListener('input', () => updateFunctionVisual(5));

    updateFunctionVisual(5);
    window.CSVisualizer.renderQuizCard('quiz-functions', 'functions');
  }

  return {
    renderVariables,
    renderConditionals,
    renderLoops,
    renderFunctions
  };
})();
