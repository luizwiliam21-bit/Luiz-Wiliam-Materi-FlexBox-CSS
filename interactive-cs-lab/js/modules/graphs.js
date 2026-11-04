/**
 * graphs.js
 * Modul Algoritma Graf & Traversal:
 * 1. Representasi Graf Interaktif (Nodes, Edges & Adjacency List)
 * 2. Breadth-First Search (BFS) dengan Visualisasi Queue (FIFO)
 * 3. Depth-First Search (DFS) dengan Visualisasi Stack (LIFO) & Backtracking
 */
window.CSGraphs = (function () {
  // Struktur Graf: 7 Node (A - G) dengan posisi koordinat SVG yang simetris
  const graphData = {
    nodes: [
      { id: 'A', x: 260, y: 45, level: 0 },
      { id: 'B', x: 130, y: 130, level: 1 },
      { id: 'C', x: 390, y: 130, level: 1 },
      { id: 'D', x: 65, y: 235, level: 2 },
      { id: 'E', x: 205, y: 235, level: 2 },
      { id: 'F', x: 325, y: 235, level: 2 },
      { id: 'G', x: 455, y: 235, level: 2 }
    ],
    edges: [
      ['A', 'B'],
      ['A', 'C'],
      ['B', 'D'],
      ['B', 'E'],
      ['C', 'F'],
      ['C', 'G'],
      ['E', 'F'] // Edge lintas cabang agar traversal graf lebih menarik dibanding pohon biasa
    ],
    adj: {
      A: ['B', 'C'],
      B: ['A', 'D', 'E'],
      C: ['A', 'F', 'G'],
      D: ['B'],
      E: ['B', 'F'],
      F: ['C', 'E'],
      G: ['C']
    }
  };

  /**
   * Menghasilkan daftar langkah (snapshots) untuk simulasi BFS atau DFS
   * sehingga pengguna dapat menekan Step Next atau Auto Play dengan mulus.
   */
  function generateSteps(algo, startNode) {
    const steps = [];
    const visited = new Set();
    const visitOrder = [];

    if (algo === 'bfs') {
      const queue = [startNode];
      visited.add(startNode);

      steps.push({
        current: null,
        frontier: [...queue],
        visited: [...visitOrder],
        discovered: Array.from(visited),
        activeEdge: null,
        codeLine: 2,
        log: `Inisialisasi Queue dengan node awal "${startNode}" dan tandai sudah ditemukan.`
      });

      while (queue.length > 0) {
        const curr = queue.shift();
        visitOrder.push(curr);

        steps.push({
          current: curr,
          frontier: [...queue],
          visited: [...visitOrder],
          discovered: Array.from(visited),
          activeEdge: null,
          codeLine: 4,
          log: `Dequeue node "${curr}" dari depan antrean dan kunjungi.`
        });

        const neighbors = graphData.adj[curr] || [];
        for (const nb of neighbors) {
          if (!visited.has(nb)) {
            visited.add(nb);
            queue.push(nb);
            steps.push({
              current: curr,
              frontier: [...queue],
              visited: [...visitOrder],
              discovered: Array.from(visited),
              activeEdge: [curr, nb],
              codeLine: 7,
              log: `Tetangga "${nb}" belum dikunjungi → Enqueue "${nb}" ke belakang antrean.`
            });
          } else {
            steps.push({
              current: curr,
              frontier: [...queue],
              visited: [...visitOrder],
              discovered: Array.from(visited),
              activeEdge: [curr, nb],
              codeLine: 5,
              log: `Cek tetangga "${nb}" — sudah pernah masuk antrean (dilewati).`
            });
          }
        }
      }

      steps.push({
        current: null,
        frontier: [],
        visited: [...visitOrder],
        discovered: Array.from(visited),
        activeEdge: null,
        codeLine: 8,
        log: `Queue kosong! Traversal BFS selesai. Urutan: ${visitOrder.join(' → ')}`
      });
    } else {
      // DFS menggunakan Stack eksplisit
      const stack = [startNode];

      steps.push({
        current: null,
        frontier: [...stack],
        visited: [],
        discovered: [startNode],
        activeEdge: null,
        codeLine: 2,
        log: `Push node awal "${startNode}" ke dalam Stack.`
      });

      while (stack.length > 0) {
        const curr = stack.pop();
        if (visited.has(curr)) {
          steps.push({
            current: curr,
            frontier: [...stack],
            visited: [...visitOrder],
            discovered: [...visitOrder, ...stack],
            activeEdge: null,
            codeLine: 4,
            log: `Pop "${curr}" dari Stack — sudah dikunjungi sebelumnya (Backtrack).`
          });
          continue;
        }

        visited.add(curr);
        visitOrder.push(curr);

        steps.push({
          current: curr,
          frontier: [...stack],
          visited: [...visitOrder],
          discovered: [...visitOrder, ...stack],
          activeEdge: null,
          codeLine: 5,
          log: `Pop "${curr}" dari puncak Stack dan tandai sebagai Visited.`
        });

        // Push tetangga secara terbalik agar urutan kiri-ke-kanan tetap natural saat di-pop
        const neighbors = [...(graphData.adj[curr] || [])].reverse();
        let pushedCount = 0;
        for (const nb of neighbors) {
          if (!visited.has(nb)) {
            stack.push(nb);
            pushedCount++;
            steps.push({
              current: curr,
              frontier: [...stack],
              visited: [...visitOrder],
              discovered: Array.from(new Set([...visitOrder, ...stack])),
              activeEdge: [curr, nb],
              codeLine: 8,
              log: `Tetangga "${nb}" belum dikunjungi → Push "${nb}" ke puncak Stack.`
            });
          }
        }

        if (pushedCount === 0 && stack.length > 0) {
          steps.push({
            current: curr,
            frontier: [...stack],
            visited: [...visitOrder],
            discovered: Array.from(new Set([...visitOrder, ...stack])),
            activeEdge: null,
            codeLine: 3,
            log: `Ujung cabang di "${curr}" (semua tetangga sudah dikunjungi) → Backtrack ke Stack!`
          });
        }
      }

      steps.push({
        current: null,
        frontier: [],
        visited: [...visitOrder],
        discovered: [...visitOrder],
        activeEdge: null,
        codeLine: 9,
        log: `Stack kosong! Traversal DFS selesai. Urutan: ${visitOrder.join(' → ')}`
      });
    }

    return steps;
  }

  /**
   * Render SVG Graf dengan pewarnaan status node & edge
   */
  function buildGraphSVG(snapshot, selectedNode = null) {
    const visited = snapshot ? snapshot.visited : [];
    const frontier = snapshot ? snapshot.frontier : [];
    const current = snapshot ? snapshot.current : selectedNode;
    const activeEdge = snapshot ? snapshot.activeEdge : null;

    const edgesSvg = graphData.edges
      .map(([u, v]) => {
        const n1 = graphData.nodes.find((n) => n.id === u);
        const n2 = graphData.nodes.find((n) => n.id === v);
        const isEdgeActive =
          (activeEdge && ((activeEdge[0] === u && activeEdge[1] === v) || (activeEdge[0] === v && activeEdge[1] === u))) ||
          (selectedNode && (u === selectedNode || v === selectedNode));

        const strokeColor = isEdgeActive ? '#38bdf8' : '#334155';
        const strokeW = isEdgeActive ? '4' : '2.5';

        return `<line x1="${n1.x}" y1="${n1.y}" x2="${n2.x}" y2="${n2.y}"
          stroke="${strokeColor}" stroke-width="${strokeW}" class="graph-edge-line" />`;
      })
      .join('');

    const nodesSvg = graphData.nodes
      .map((n) => {
        let fill = '#1e293b';
        let stroke = '#64748b';
        let radius = 22;

        if (n.id === current) {
          fill = '#4f46e5';
          stroke = '#a5b4fc';
          radius = 25;
        } else if (visited.includes(n.id)) {
          fill = '#059669';
          stroke = '#6ee7b7';
        } else if (frontier.includes(n.id)) {
          fill = '#d97706';
          stroke = '#fcd34d';
        } else if (selectedNode && (graphData.adj[selectedNode] || []).includes(n.id)) {
          fill = '#0284c7';
          stroke = '#7dd3fc';
        }

        return `
          <g class="cursor-pointer graph-node-group" data-node-id="${n.id}">
            <circle cx="${n.x}" cy="${n.y}" r="${radius}" fill="${fill}" stroke="${stroke}" stroke-width="3" class="graph-node-circle" />
            <text x="${n.x}" y="${n.y + 5}" text-anchor="middle" fill="#ffffff" class="font-mono text-sm font-bold select-none">${n.id}</text>
          </g>
        `;
      })
      .join('');

    return `
      <svg viewBox="0 0 520 285" class="w-full h-auto max-h-[290px] bg-slate-950 rounded-xl border border-slate-800">
        ${edgesSvg}
        ${nodesSvg}
      </svg>
    `;
  }

  /* ==========================================
   * 1. VISUALISASI STRUKTUR GRAF (NODES & EDGES)
   * ========================================== */
  function renderGraphIntro(root) {
    window.CSVisualizer.clearTimer();
    let activeNode = 'A';

    root.innerHTML = `
      <div class="space-y-6 animate-pop">
        <div class="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 p-4 sm:p-5 rounded-2xl">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Graph Fundamentals</span>
              <span class="px-2.5 py-0.5 text-xs font-mono rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">Space: O(V + E)</span>
            </div>
            <h2 class="text-lg sm:text-xl font-bold text-white">Representasi Graf (Vertex / Node & Edge)</h2>
            <p class="text-xs sm:text-sm text-slate-400">Klik pada lingkaran <strong>Node (A–G)</strong> di kanvas untuk menyorot tetangga yang terhubung langsung dan melihat struktur <em>Adjacency List</em>-nya.</p>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div class="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold uppercase tracking-wider text-slate-400">Kanvas Graf Interaktif (7 Vertex, 7 Edge)</span>
              <div class="flex items-center gap-3 text-xs">
                <span class="flex items-center gap-1"><span class="w-3 h-3 rounded-full bg-indigo-600 inline-block"></span> Node Aktif</span>
                <span class="flex items-center gap-1"><span class="w-3 h-3 rounded-full bg-sky-600 inline-block"></span> Tetangga (Neighbor)</span>
              </div>
            </div>

            <div id="graph-intro-svg-box"></div>

            <div id="graph-intro-info" class="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs sm:text-sm text-slate-200"></div>
          </div>

          <div class="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-3">
                <span class="text-xs font-semibold uppercase tracking-wider text-slate-400">Adjacency List (Python Dict)</span>
                <span class="text-[11px] font-mono text-emerald-400">Graph Representation</span>
              </div>
              <div id="graph-intro-code" class="bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono space-y-1"></div>
            </div>
            <div class="mt-4 bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-400 leading-relaxed">
              <strong class="text-white">Konsep Graf:</strong> Graf terdiri dari himpunan simpul (<code class="text-indigo-300">Vertex/Node</code>) dan garis penghubung (<code class="text-cyan-300">Edge</code>). Sangat cocok memodelkan peta jalan, jejaring sosial, dan topologi jaringan.
            </div>
          </div>
        </div>
      </div>
    `;

    function updateGraphIntro() {
      const svgContainer = document.getElementById('graph-intro-svg-box');
      svgContainer.innerHTML = buildGraphSVG(null, activeNode);

      svgContainer.querySelectorAll('.graph-node-group').forEach((g) => {
        g.addEventListener('click', function () {
          activeNode = this.getAttribute('data-node-id');
          updateGraphIntro();
        });
      });

      const neighbors = graphData.adj[activeNode] || [];
      document.getElementById('graph-intro-info').innerHTML = `
        <div class="flex flex-wrap items-center justify-between gap-2">
          <div>Node Terpilih: <strong class="font-mono text-indigo-300 text-base">${activeNode}</strong> (Derajat/Degree = ${neighbors.length})</div>
          <div class="font-mono text-xs text-sky-300">Tetangga Langsung: [${neighbors.map((x) => `"${x}"`).join(', ')}]</div>
        </div>
      `;

      const nodeKeys = Object.keys(graphData.adj);
      const lineIdx = nodeKeys.indexOf(activeNode) + 1;
      const codeLines = [
        `graf = {`,
        ...nodeKeys.map((k) => `    "${k}": [${graphData.adj[k].map((x) => `"${x}"`).join(', ')}],`),
        `}`,
        `tetangga = graf["${activeNode}"]`
      ];

      window.CSVisualizer.renderCodeBlock('graph-intro-code', codeLines, lineIdx);
    }

    updateGraphIntro();
  }

  /* ==========================================
   * 2 & 3. TRAVERSAL GRAF: BFS & DFS
   * ========================================== */
  function renderTraversalModule(root, algo) {
    window.CSVisualizer.clearTimer();
    const isBFS = algo === 'bfs';

    let startNode = 'A';
    let steps = generateSteps(algo, startNode);
    let stepIdx = 0;
    let isPlaying = false;

    root.innerHTML = `
      <div class="space-y-6 animate-pop">
        <!-- Header -->
        <div class="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 p-4 sm:p-5 rounded-2xl">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Graph Traversal</span>
              <span class="px-2.5 py-0.5 text-xs font-mono rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">Time: O(V + E)</span>
              <span class="px-2.5 py-0.5 text-xs font-mono rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">Space: O(V) ${isBFS ? 'Queue' : 'Stack'}</span>
            </div>
            <h2 class="text-lg sm:text-xl font-bold text-white">
              ${isBFS ? 'Breadth-First Search (BFS — Penelusuran Melebar)' : 'Depth-First Search (DFS — Penelusuran Mendalam)'}
            </h2>
            <p class="text-xs sm:text-sm text-slate-400">
              ${
                isBFS
                  ? 'Menjelajahi graf lapis demi lapis (level-by-level) menggunakan antrean <strong>Queue (FIFO: First-In, First-Out)</strong>.'
                  : 'Menjelajahi cabang graf sedalam mungkin sebelum melakukan <em>backtracking</em> menggunakan <strong>Stack (LIFO: Last-In, First-Out)</strong>.'
              }
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <!-- Kanvas SVG + Queue/Stack Panel (7 cols) -->
          <div class="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
            <!-- Kontrol Traversal -->
            <div class="flex flex-wrap items-center justify-between gap-3 bg-slate-950 border border-slate-800 p-3.5 rounded-xl">
              <div class="flex items-center gap-2">
                <label class="text-xs text-slate-400">Start Node:</label>
                <select id="trav-start-select" class="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-white">
                  ${graphData.nodes.map((n) => `<option value="${n.id}">${n.id}</option>`).join('')}
                </select>
              </div>

              <div class="flex items-center gap-2">
                <button type="button" id="btn-trav-prev" class="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 border border-slate-700">
                  ◀ Prev
                </button>
                <button type="button" id="btn-trav-step" class="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white">
                  Step Next ▶
                </button>
                <button type="button" id="btn-trav-play" class="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white">
                  Auto Play
                </button>
                <button type="button" id="btn-trav-reset" class="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 border border-slate-700">
                  Reset
                </button>
              </div>
            </div>

            <!-- Legenda Warna Node -->
            <div class="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 px-1">
              <div class="flex flex-wrap gap-3">
                <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-slate-800 border border-slate-500 inline-block"></span> Unvisited</span>
                <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-amber-600 inline-block"></span> Di ${isBFS ? 'Queue' : 'Stack'}</span>
                <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-indigo-600 inline-block"></span> Sedang Diproses</span>
                <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-emerald-600 inline-block"></span> Visited</span>
              </div>
              <span id="trav-step-counter" class="font-mono text-slate-400">Langkah 1 / ${steps.length}</span>
            </div>

            <!-- Kanvas SVG -->
            <div id="trav-svg-container"></div>

            <!-- Panel Queue / Stack & Urutan Visited -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div class="bg-slate-950 border border-amber-500/40 rounded-xl p-3.5">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-xs font-mono font-bold text-amber-300">
                    ${isBFS ? 'Queue (FIFO: Depan → Belakang)' : 'Stack (LIFO: Bawah → Puncak)'}
                  </span>
                </div>
                <div id="trav-frontier-box" class="flex flex-wrap gap-1.5 min-h-[34px] items-center"></div>
              </div>

              <div class="bg-slate-950 border border-emerald-500/40 rounded-xl p-3.5">
                <div class="text-xs font-mono font-bold text-emerald-300 mb-2">Urutan Kunjungan (Visited Order):</div>
                <div id="trav-visited-box" class="flex flex-wrap gap-1.5 min-h-[34px] items-center"></div>
              </div>
            </div>

            <!-- Penjelasan Langkah Saat Ini -->
            <div id="trav-step-log" class="bg-indigo-950/40 border border-indigo-500/40 rounded-xl p-3.5 text-xs sm:text-sm font-medium text-indigo-200"></div>
          </div>

          <!-- Kode Algoritma (5 cols) -->
          <div class="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-3">
                <span class="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Algoritma Python ${isBFS ? 'BFS (Queue)' : 'DFS (Stack)'}
                </span>
                <span class="text-[11px] font-mono text-indigo-400">Step Sync</span>
              </div>
              <div id="trav-code-container" class="bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono space-y-1"></div>
            </div>

            <div class="mt-4 bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-300 space-y-1">
              <div class="font-semibold text-white"> Karakteristik ${isBFS ? 'BFS' : 'DFS'}:</div>
              <p class="text-slate-400">
                ${
                  isBFS
                    ? 'BFS selalu mengunjungi semua node pada jarak 1 langkah terlebih dahulu sebelum lanjut ke jarak 2 langkah. Sangat ideal untuk mencari rute terpendek (Shortest Path).'
                    : 'DFS menelusuri satu jalur lurus sampai mentok (leaf/dead-end), lalu mundur (backtrack) ke simpangan terakhir. Cocok untuk penyelesaian labirin (maze) dan deteksi siklus.'
                }
              </p>
            </div>
          </div>
        </div>

        <div id="quiz-traversal"></div>
      </div>
    `;

    const codeLines = isBFS
      ? [
          `from collections import deque`,
          `def bfs(graf, start):`,
          `    queue = deque([start]); visited = {start}`,
          `    while queue:`,
          `        node = queue.popleft()  # Dequeue depan`,
          `        for tetangga in graf[node]:`,
          `            if tetangga not in visited:`,
          `                visited.add(tetangga); queue.append(tetangga)`,
          `    return visited`
        ]
      : [
          `def dfs_iteratif(graf, start):`,
          `    visited = set()`,
          `    stack = [start]             # Inisialisasi Stack`,
          `    while stack:`,
          `        node = stack.pop()      # Pop puncak Stack`,
          `        if node not in visited:`,
          `            visited.add(node)`,
          `            for tetangga in reversed(graf[node]):`,
          `                if tetangga not in visited: stack.append(tetangga)`,
          `    return visited`
        ];

    function updateTraversalUI() {
      const snap = steps[stepIdx];
      document.getElementById('trav-step-counter').textContent = `Langkah ${stepIdx + 1} / ${steps.length}`;
      document.getElementById('trav-svg-container').innerHTML = buildGraphSVG(snap);

      // Izinkan klik node pada graf untuk mengganti start node
      document.getElementById('trav-svg-container').querySelectorAll('.graph-node-group').forEach((g) => {
        g.addEventListener('click', function () {
          const clickedId = this.getAttribute('data-node-id');
          document.getElementById('trav-start-select').value = clickedId;
          changeStartNode(clickedId);
        });
      });

      // Render Queue / Stack
      const frontierEl = document.getElementById('trav-frontier-box');
      if (snap.frontier.length === 0) {
        frontierEl.innerHTML = `<span class="text-xs font-mono text-slate-500">Kosong []</span>`;
      } else {
        frontierEl.innerHTML = snap.frontier
          .map(
            (item, idx) => `
          <span class="px-2.5 py-1 rounded-md font-mono text-xs font-bold bg-amber-500/20 text-amber-200 border border-amber-500/40 animate-pop">
            ${item}${isBFS && idx === 0 ? ' (Depan)' : !isBFS && idx === snap.frontier.length - 1 ? ' (Top)' : ''}
          </span>
        `
          )
          .join('');
      }

      // Render Visited Order
      const visitedEl = document.getElementById('trav-visited-box');
      if (snap.visited.length === 0) {
        visitedEl.innerHTML = `<span class="text-xs font-mono text-slate-500">Belum ada</span>`;
      } else {
        visitedEl.innerHTML = snap.visited
          .map(
            (v) => `
          <span class="px-2.5 py-1 rounded-md font-mono text-xs font-bold bg-emerald-500/20 text-emerald-200 border border-emerald-500/40 animate-pop">
            ${v}
          </span>
        `
          )
          .join('<span class="text-slate-500 text-xs">→</span>');
      }

      document.getElementById('trav-step-log').textContent = snap.log;
      window.CSVisualizer.renderCodeBlock('trav-code-container', codeLines, snap.codeLine);
    }

    function stopAutoPlay() {
      window.CSVisualizer.clearTimer();
      isPlaying = false;
      const playBtn = document.getElementById('btn-trav-play');
      if (playBtn) playBtn.textContent = 'Auto Play';
    }

    function changeStartNode(newStart) {
      stopAutoPlay();
      startNode = newStart;
      steps = generateSteps(algo, startNode);
      stepIdx = 0;
      updateTraversalUI();
    }

    document.getElementById('trav-start-select').addEventListener('change', (e) => {
      changeStartNode(e.target.value);
    });

    document.getElementById('btn-trav-prev').addEventListener('click', () => {
      stopAutoPlay();
      if (stepIdx > 0) {
        stepIdx--;
        updateTraversalUI();
      }
    });

    document.getElementById('btn-trav-step').addEventListener('click', () => {
      stopAutoPlay();
      if (stepIdx < steps.length - 1) {
        stepIdx++;
        updateTraversalUI();
      } else {
        window.CSVisualizer.showToast('Traversal sudah mencapai langkah terakhir!', 'info');
      }
    });

    document.getElementById('btn-trav-play').addEventListener('click', () => {
      if (isPlaying) {
        stopAutoPlay();
        return;
      }
      if (stepIdx >= steps.length - 1) {
        stepIdx = 0;
      }
      isPlaying = true;
      document.getElementById('btn-trav-play').textContent = 'Pause';
      const timerId = setInterval(() => {
        if (stepIdx < steps.length - 1) {
          stepIdx++;
          updateTraversalUI();
        } else {
          stopAutoPlay();
        }
      }, 850);
      window.CSVisualizer.setTimer(timerId);
    });

    document.getElementById('btn-trav-reset').addEventListener('click', () => {
      stopAutoPlay();
      stepIdx = 0;
      updateTraversalUI();
    });

    updateTraversalUI();
    window.CSVisualizer.renderQuizCard('quiz-traversal', isBFS ? 'bfs' : 'dfs');
  }

  return {
    renderGraphIntro,
    renderBFS: function (root) {
      renderTraversalModule(root, 'bfs');
    },
    renderDFS: function (root) {
      renderTraversalModule(root, 'dfs');
    }
  };
})();
