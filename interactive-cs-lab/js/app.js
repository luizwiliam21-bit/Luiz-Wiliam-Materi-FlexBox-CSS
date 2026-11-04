/**
 * app.js
 * Entry point aplikasi: mengatur navigasi antar 11 modul materi,
 * progress belajar, pencarian cepat konsep, dan inisialisasi komponen.
 */
window.CSApp = (function () {
  const modulesCatalog = [
    // Kategori A: Dasar Pemrograman
    {
      id: 'variables',
      title: '1. Variabel & Tipe Data',
      category: 'Dasar Pemrograman',
      badge: 'O(1)',
      render: () => window.CSBasics.renderVariables(document.getElementById('module-content-area'))
    },
    {
      id: 'conditionals',
      title: '2. Percabangan (If-Else)',
      category: 'Dasar Pemrograman',
      badge: 'Flow',
      render: () => window.CSBasics.renderConditionals(document.getElementById('module-content-area'))
    },
    {
      id: 'loops',
      title: '3. Perulangan (For & While)',
      category: 'Dasar Pemrograman',
      badge: 'O(n)',
      render: () => window.CSBasics.renderLoops(document.getElementById('module-content-area'))
    },
    {
      id: 'functions',
      title: '4. Fungsi & Return Value',
      category: 'Dasar Pemrograman',
      badge: 'def()',
      render: () => window.CSBasics.renderFunctions(document.getElementById('module-content-area'))
    },
    // Kategori B: Struktur Data
    {
      id: 'list',
      title: '5. List / Dynamic Array',
      category: 'Struktur Data',
      badge: 'O(1)/O(n)',
      render: () => window.CSDataStructures.renderList(document.getElementById('module-content-area'))
    },
    {
      id: 'tuple',
      title: '6. Tuple vs List',
      category: 'Struktur Data',
      badge: 'Immutable',
      render: () => window.CSDataStructures.renderTuple(document.getElementById('module-content-area'))
    },
    {
      id: 'dictionary',
      title: '7. Dictionary (Key-Value)',
      category: 'Struktur Data',
      badge: 'O(1)',
      render: () => window.CSDataStructures.renderDictionary(document.getElementById('module-content-area'))
    },
    {
      id: 'set',
      title: '8. Set & Himpunan',
      category: 'Struktur Data',
      badge: 'Unique',
      render: () => window.CSDataStructures.renderSet(document.getElementById('module-content-area'))
    },
    // Kategori C: Algoritma Graf & Traversal
    {
      id: 'graph-intro',
      title: '9. Struktur Graf (Vertex/Edge)',
      category: 'Algoritma Graf',
      badge: 'G(V,E)',
      render: () => window.CSGraphs.renderGraphIntro(document.getElementById('module-content-area'))
    },
    {
      id: 'bfs',
      title: '10. Breadth-First Search (BFS)',
      category: 'Algoritma Graf',
      badge: 'Queue',
      render: () => window.CSGraphs.renderBFS(document.getElementById('module-content-area'))
    },
    {
      id: 'dfs',
      title: '11. Depth-First Search (DFS)',
      category: 'Algoritma Graf',
      badge: 'Stack',
      render: () => window.CSGraphs.renderDFS(document.getElementById('module-content-area'))
    }
  ];

  let activeModuleId = 'variables';
  const visitedModules = new Set(['variables']);

  function selectModule(modId) {
    const found = modulesCatalog.find((m) => m.id === modId);
    if (!found) return;

    activeModuleId = modId;
    visitedModules.add(modId);
    renderSidebarNav();
    updateProgressHeader();
    found.render();

    // Tutup sidebar mobile jika terbuka
    const sidebar = document.getElementById('app-sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');
    if (sidebar && backdrop && window.innerWidth < 1024) {
      sidebar.classList.add('-translate-x-full');
      backdrop.classList.add('hidden');
    }
  }

  function updateProgressHeader() {
    const countEl = document.getElementById('progress-count-text');
    const barEl = document.getElementById('progress-bar-fill');
    if (!countEl || !barEl) return;

    const total = modulesCatalog.length;
    const done = visitedModules.size;
    const pct = Math.round((done / total) * 100);
    countEl.textContent = `${done}/${total} Modul (${pct}%)`;
    barEl.style.width = `${pct}%`;
  }

  function renderSidebarNav() {
    const navContainer = document.getElementById('sidebar-nav-list');
    if (!navContainer) return;

    const categories = ['Dasar Pemrograman', 'Struktur Data', 'Algoritma Graf'];
    navContainer.innerHTML = categories
      .map((cat) => {
        const items = modulesCatalog.filter((m) => m.category === cat);
        return `
          <div class="mb-5">
            <div class="px-3 mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              ${cat}
            </div>
            <div class="space-y-1">
              ${items
                .map((m) => {
                  const isActive = m.id === activeModuleId;
                  const isDone = visitedModules.has(m.id);
                  return `
                    <button type="button" data-mod-id="${m.id}"
                      class="sidebar-mod-btn w-full text-left px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition flex items-center justify-between ${
                        isActive
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-950/50'
                          : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                      }">
                      <span class="truncate pr-2">${m.title}</span>
                      <span class="flex items-center gap-1.5 shrink-0">
                        <span class="text-[10px] font-mono px-1.5 py-0.5 rounded ${
                          isActive ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400'
                        }">${m.badge}</span>
                        ${isDone ? '<span class="text-emerald-400 text-xs">●</span>' : ''}
                      </span>
                    </button>
                  `;
                })
                .join('')}
            </div>
          </div>
        `;
      })
      .join('');

    navContainer.querySelectorAll('.sidebar-mod-btn').forEach((btn) => {
      btn.addEventListener('click', function () {
        selectModule(this.getAttribute('data-mod-id'));
      });
    });
  }

  function init() {
    renderSidebarNav();
    updateProgressHeader();

    // Tombol Navigasi Cepat Prev / Next Modul di Footer
    const btnPrevMod = document.getElementById('btn-prev-module');
    const btnNextMod = document.getElementById('btn-next-module');

    if (btnPrevMod) {
      btnPrevMod.addEventListener('click', () => {
        const idx = modulesCatalog.findIndex((m) => m.id === activeModuleId);
        const prevIdx = (idx - 1 + modulesCatalog.length) % modulesCatalog.length;
        selectModule(modulesCatalog[prevIdx].id);
      });
    }

    if (btnNextMod) {
      btnNextMod.addEventListener('click', () => {
        const idx = modulesCatalog.findIndex((m) => m.id === activeModuleId);
        const nextIdx = (idx + 1) % modulesCatalog.length;
        selectModule(modulesCatalog[nextIdx].id);
      });
    }

    // Toggle Sidebar Mobile
    const btnMenu = document.getElementById('btn-mobile-menu');
    const sidebar = document.getElementById('app-sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');

    if (btnMenu && sidebar && backdrop) {
      btnMenu.addEventListener('click', () => {
        sidebar.classList.toggle('-translate-x-full');
        backdrop.classList.toggle('hidden');
      });
      backdrop.addEventListener('click', () => {
        sidebar.classList.add('-translate-x-full');
        backdrop.classList.add('hidden');
      });
    }

    // Render modul pertama saat aplikasi dibuka
    selectModule('variables');
  }

  return {
    init,
    selectModule
  };
})();

window.addEventListener('DOMContentLoaded', () => {
  window.CSApp.init();
});
