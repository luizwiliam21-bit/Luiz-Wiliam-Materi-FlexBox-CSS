/**
 * visualizer.js
 * Helper untuk animasi step-by-step, sinkronisasi highlight baris kode,
 * manajemen timer simulasi, dan toast notifikasi non-blocking.
 */
window.CSVisualizer = (function () {
  let activeTimer = null;

  function clearTimer() {
    if (activeTimer) {
      clearInterval(activeTimer);
      clearTimeout(activeTimer);
      activeTimer = null;
    }
  }

  /**
   * Render blok kode dengan nomor baris sehingga dapat di-highlight per baris
   */
  function renderCodeBlock(containerId, linesArray, activeLineIndex = -1, highlightClass = 'active-line') {
    const container = document.getElementById(containerId);
    if (!container) return;

    const html = linesArray
      .map((lineText, idx) => {
        const isCurrent = idx === activeLineIndex;
        const activeCls = isCurrent ? highlightClass : '';
        const escaped = lineText
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
        return `<div class="code-line ${activeCls}" data-line="${idx}">
          <span class="line-num">${idx + 1}</span>
          <span class="whitespace-pre text-xs sm:text-sm">${escaped}</span>
        </div>`;
      })
      .join('');

    container.innerHTML = html;
  }

  /**
   * Highlight baris tertentu pada container kode yang sudah di-render
   */
  function highlightLine(containerId, lineIndex, highlightClass = 'active-line') {
    const container = document.getElementById(containerId);
    if (!container) return;
    const lines = container.querySelectorAll('.code-line');
    lines.forEach((el, idx) => {
      el.classList.remove('active-line', 'active-true', 'active-false');
      if (idx === lineIndex) {
        el.classList.add(highlightClass);
      }
    });
  }

  /**
   * Menampilkan pesan status atau toast di dalam UI (tanpa alert browser)
   */
  function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('global-toast');
    if (!toastContainer) return;

    const colorMap = {
      info: 'border-indigo-500 bg-slate-900/95 text-indigo-200',
      success: 'border-emerald-500 bg-slate-900/95 text-emerald-200',
      warning: 'border-amber-500 bg-slate-900/95 text-amber-200',
      error: 'border-rose-500 bg-slate-900/95 text-rose-200'
    };

    toastContainer.className = `fixed bottom-5 right-5 z-50 max-w-sm px-4 py-3 rounded-xl border shadow-2xl transition-all duration-300 text-xs sm:text-sm font-medium flex items-center gap-2.5 ${colorMap[type] || colorMap.info}`;
    toastContainer.innerHTML = `
      <span class="w-2 h-2 rounded-full ${
        type === 'error' ? 'bg-rose-400' : type === 'success' ? 'bg-emerald-400' : type === 'warning' ? 'bg-amber-400' : 'bg-indigo-400'
      }"></span>
      <span>${message}</span>
    `;
    toastContainer.style.opacity = '1';
    toastContainer.style.transform = 'translateY(0)';

    if (window._toastTimeout) clearTimeout(window._toastTimeout);
    window._toastTimeout = setTimeout(() => {
      toastContainer.style.opacity = '0';
      toastContainer.style.transform = 'translateY(12px)';
    }, 3200);
  }

  /**
   * Render komponen Mini Quiz di bagian bawah modul
   */
  function renderQuizCard(containerId, moduleKey) {
    const container = document.getElementById(containerId);
    if (!container || !window.CSQuizzes || !window.CSQuizzes[moduleKey]) return;

    const quizzes = window.CSQuizzes[moduleKey];
    container.innerHTML = `
      <div class="mt-6 bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 text-xs font-semibold rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">Mini Quiz</span>
            <h3 class="text-sm sm:text-base font-semibold text-slate-100">Uji Pemahaman Konsep</h3>
          </div>
          <span class="text-xs text-slate-400">${quizzes.length} Pertanyaan</span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${quizzes
            .map(
              (q, qIdx) => `
            <div class="bg-slate-800/60 border border-slate-700/70 rounded-xl p-4 flex flex-col justify-between" id="quiz-box-${moduleKey}-${qIdx}">
              <div>
                <p class="text-xs sm:text-sm font-medium text-slate-200 mb-3">${qIdx + 1}. ${q.question}</p>
                <div class="space-y-2">
                  ${q.options
                    .map(
                      (opt, oIdx) => `
                    <button type="button"
                      data-quiz-mod="${moduleKey}"
                      data-quiz-idx="${qIdx}"
                      data-opt-idx="${oIdx}"
                      class="quiz-opt-btn w-full text-left px-3 py-2 rounded-lg text-xs sm:text-sm bg-slate-900/70 hover:bg-slate-700/80 border border-slate-700 text-slate-300 transition flex items-center justify-between">
                      <span>${opt}</span>
                    </button>
                  `
                    )
                    .join('')}
                </div>
              </div>
              <div id="quiz-feedback-${moduleKey}-${qIdx}" class="hidden mt-3 p-3 rounded-lg text-xs leading-relaxed"></div>
            </div>
          `
            )
            .join('')}
        </div>
      </div>
    `;

    container.querySelectorAll('.quiz-opt-btn').forEach((btn) => {
      btn.addEventListener('click', function () {
        const mod = this.getAttribute('data-quiz-mod');
        const qIdx = parseInt(this.getAttribute('data-quiz-idx'), 10);
        const oIdx = parseInt(this.getAttribute('data-opt-idx'), 10);
        const quizObj = window.CSQuizzes[mod][qIdx];
        const feedbackEl = document.getElementById(`quiz-feedback-${mod}-${qIdx}`);
        const parentBox = document.getElementById(`quiz-box-${mod}-${qIdx}`);

        parentBox.querySelectorAll('.quiz-opt-btn').forEach((b, idx) => {
          b.classList.remove(
            'border-emerald-500',
            'bg-emerald-500/20',
            'text-emerald-200',
            'border-rose-500',
            'bg-rose-500/20',
            'text-rose-200'
          );
          if (idx === oIdx) {
            if (oIdx === quizObj.answer) {
              b.classList.add('border-emerald-500', 'bg-emerald-500/20', 'text-emerald-200');
            } else {
              b.classList.add('border-rose-500', 'bg-rose-500/20', 'text-rose-200');
            }
          }
        });

        feedbackEl.classList.remove('hidden', 'bg-emerald-950/60', 'text-emerald-300', 'border-emerald-700/50', 'bg-rose-950/60', 'text-rose-300', 'border-rose-700/50');
        if (oIdx === quizObj.answer) {
          feedbackEl.classList.add('bg-emerald-950/60', 'text-emerald-300', 'border', 'border-emerald-700/50');
          feedbackEl.innerHTML = `<strong class="font-semibold">Tepat sekali!</strong> ${quizObj.explanation}`;
        } else {
          feedbackEl.classList.add('bg-rose-950/60', 'text-rose-300', 'border', 'border-rose-700/50');
          feedbackEl.innerHTML = `<strong class="font-semibold">Kurang tepat.</strong> ${quizObj.explanation}`;
        }
      });
    });
  }

  return {
    clearTimer,
    setTimer: function (id) {
      clearTimer();
      activeTimer = id;
    },
    renderCodeBlock,
    highlightLine,
    showToast,
    renderQuizCard
  };
})();
