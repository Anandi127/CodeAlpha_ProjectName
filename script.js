/**
 * ============================================================
 * CALCULATOR — JavaScript Logic
 * Features: arithmetic, keyboard support, history, dark mode,
 *           error handling, animations, sound feedback
 * ============================================================
 */

// ── DOM References ──────────────────────────────────────────
const expressionLine = document.getElementById('expressionLine');
const resultLine     = document.getElementById('resultLine');
const historyPanel   = document.getElementById('historyPanel');
const historyToggle  = document.getElementById('historyToggle');
const historyList    = document.getElementById('historyList');
const clearHistBtn   = document.getElementById('clearHistory');
const themeToggle    = document.getElementById('themeToggle');
const calculator     = document.getElementById('calculator');

// ── State ────────────────────────────────────────────────────
let state = {
  expression: '0',      // What the user is building
  result:     '',       // Live preview / final result
  justEvaled: false,    // Did we just press '='?
  activeOp:   null,     // Currently highlighted operator button
  history:    [],       // Array of { expr, result }
};

// ── Operator symbol → JS operator map ───────────────────────
const OPS = { '÷': '/', '×': '*', '−': '-', '+': '+' };

// ── Audio Context (subtle click tone) ───────────────────────
let audioCtx = null;
function getAudioCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}
function playClick(freq = 520, duration = 0.04) {
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch(_) { /* AudioContext unavailable — silent fallback */ }
}

// ── Render ───────────────────────────────────────────────────
function render() {
  // Shrink font for long expressions
  expressionLine.textContent = state.expression;
  expressionLine.classList.toggle('shrink', state.expression.length > 14);
  resultLine.textContent = state.result;
}

// ── Safe Evaluate ────────────────────────────────────────────
function safeEval(expr) {
  // Replace display symbols with JS operators
  let e = expr
    .replace(/÷/g, '/')
    .replace(/×/g, '*')
    .replace(/−/g, '-');

  // Guard: only allow digits, operators, dot, parens, spaces
  if (!/^[\d\s+\-*/.()%]+$/.test(e)) return 'Error';

  // Check for division by zero
  if (/\/\s*0(?!\.\d)/.test(e)) return 'Div/0 Error';

  try {
    // eslint-disable-next-line no-new-func
    const val = Function('"use strict"; return (' + e + ')')();
    if (!isFinite(val)) return 'Infinity';
    if (isNaN(val)) return 'Error';
    // Round floating point noise (up to 10 decimal places)
    return parseFloat(val.toFixed(10)).toString();
  } catch (_) {
    return 'Error';
  }
}

// ── Live Preview ─────────────────────────────────────────────
function updatePreview() {
  const expr = state.expression;
  // Only preview if the expression ends with a digit or ')'
  if (/[\d)]$/.test(expr) && expr !== '0') {
    const r = safeEval(expr);
    // Show preview only if different from expression
    state.result = (r !== expr && r !== 'Error' && r !== 'Div/0 Error') ? '= ' + r : '';
  } else {
    state.result = '';
  }
}

// ── Active Operator Highlight ─────────────────────────────────
function setActiveOp(symbol) {
  // Remove old highlight
  document.querySelectorAll('.btn-op.active-op')
          .forEach(b => b.classList.remove('active-op'));
  state.activeOp = symbol;
  if (symbol) {
    document.querySelectorAll('.btn-op')
            .forEach(b => { if (b.dataset.op === symbol) b.classList.add('active-op'); });
  }
}

// ── Append a character to the expression ────────────────────
function appendChar(ch) {
  const expr = state.expression;
  const lastChar = expr.slice(-1);
  const opSymbols = Object.keys(OPS);

  // If we just got a result and user types a number → start fresh
  if (state.justEvaled && /\d/.test(ch)) {
    state.expression = ch;
    state.justEvaled = false;
    setActiveOp(null);
    updatePreview();
    render();
    return;
  }
  // If we just got a result and user types an operator → chain from result
  if (state.justEvaled && opSymbols.includes(ch)) {
    state.expression = state.result.replace('= ', '') + ch;
    state.justEvaled = false;
    setActiveOp(ch);
    updatePreview();
    render();
    return;
  }
  state.justEvaled = false;

  // Replace leading '0' for digits (not decimal)
  if (expr === '0' && /\d/.test(ch)) {
    state.expression = ch;
    updatePreview();
    render();
    return;
  }

  // Prevent two operators in a row (replace last operator)
  if (opSymbols.includes(ch) && opSymbols.includes(lastChar)) {
    state.expression = expr.slice(0, -1) + ch;
    setActiveOp(ch);
    updatePreview();
    render();
    return;
  }

  // Prevent multiple decimal points in the same number
  if (ch === '.') {
    // Find the current number segment (after last operator)
    const segments = expr.split(/[÷×−+]/);
    const current = segments[segments.length - 1];
    if (current.includes('.')) return; // already has a dot
    if (!current || opSymbols.includes(lastChar)) {
      state.expression += '0.'; // handle "5+." → "5+0."
      updatePreview();
      render();
      return;
    }
  }

  // Prevent starting with an operator (except minus for negation)
  if (opSymbols.includes(ch) && expr === '0' && ch !== '−') return;

  // Limit expression length
  if (expr.length >= 50) return;

  // Highlight active operator
  if (opSymbols.includes(ch)) setActiveOp(ch);
  else setActiveOp(null);

  state.expression += ch;
  updatePreview();
  render();
}

// ── Clear ────────────────────────────────────────────────────
function clear() {
  state.expression = '0';
  state.result     = '';
  state.justEvaled = false;
  setActiveOp(null);
  render();
}

// ── Delete last character ────────────────────────────────────
function deleteLast() {
  if (state.justEvaled) { clear(); return; }
  if (state.expression.length <= 1) {
    state.expression = '0';
  } else {
    state.expression = state.expression.slice(0, -1);
  }
  updatePreview();
  render();
}

// ── Toggle sign ──────────────────────────────────────────────
function toggleSign() {
  const expr = state.expression;
  if (expr === '0') return;
  if (expr.startsWith('−')) {
    state.expression = expr.slice(1); // remove leading minus
  } else if (expr.startsWith('-')) {
    state.expression = expr.slice(1);
  } else {
    state.expression = '−' + expr;   // prepend minus
  }
  updatePreview();
  render();
}

// ── Percent ──────────────────────────────────────────────────
function applyPercent() {
  const r = safeEval(state.expression);
  if (r === 'Error' || r === 'Div/0 Error') return;
  const pct = parseFloat(r) / 100;
  state.expression = parseFloat(pct.toFixed(10)).toString();
  state.result = '';
  render();
}

// ── Equals ───────────────────────────────────────────────────
function evaluate() {
  const expr = state.expression;
  if (expr === '0') return;

  const r = safeEval(expr);

  if (r === 'Error' || r === 'Div/0 Error' || r === 'Infinity') {
    // Show error on display with shake
    state.result     = r;
    state.justEvaled = false;
    render();
    calculator.classList.remove('shake');
    void calculator.offsetWidth; // reflow to restart animation
    calculator.classList.add('shake');
    calculator.addEventListener('animationend', () => calculator.classList.remove('shake'), { once: true });
    playClick(180, 0.12);
    return;
  }

  // Push to history
  addToHistory(expr, r);

  // Flash result
  state.expression = r;
  state.result     = '';
  state.justEvaled = true;
  setActiveOp(null);

  resultLine.classList.add('flash');
  setTimeout(() => resultLine.classList.remove('flash'), 300);

  // Pop animation on display
  expressionLine.classList.remove('pop');
  void expressionLine.offsetWidth;
  expressionLine.classList.add('pop');
  expressionLine.addEventListener('animationend', () => expressionLine.classList.remove('pop'), { once: true });

  playClick(880, 0.06);
  render();
}

// ── History ──────────────────────────────────────────────────
function addToHistory(expr, result) {
  state.history.unshift({ expr, result }); // newest first
  if (state.history.length > 50) state.history.pop();
  renderHistory();
}

function renderHistory() {
  if (state.history.length === 0) {
    historyList.innerHTML = '<p class="history-empty">No calculations yet.</p>';
    return;
  }
  historyList.innerHTML = state.history.map((item, i) => `
    <div class="history-item" data-index="${i}">
      <span class="history-expr">${item.expr}</span>
      <span class="history-result">${item.result}</span>
    </div>
  `).join('');

  // Click a history item to recall it
  historyList.querySelectorAll('.history-item').forEach(el => {
    el.addEventListener('click', () => {
      const idx = parseInt(el.dataset.index, 10);
      state.expression = state.history[idx].result;
      state.result     = '';
      state.justEvaled = true;
      updatePreview();
      render();
    });
  });
}

// ── Button Click Dispatcher ──────────────────────────────────
function handleButtonClick(btn) {
  // Visual feedback
  btn.classList.remove('kb-active');
  void btn.offsetWidth;

  // Sound: different tones for different button types
  if (btn.classList.contains('btn-eq'))  playClick(660, 0.05);
  else if (btn.classList.contains('btn-op')) playClick(440, 0.04);
  else if (btn.classList.contains('btn-fn')) playClick(380, 0.04);
  else playClick(520, 0.03);

  const { action, num, op } = btn.dataset;

  if (num !== undefined) { appendChar(num); return; }
  if (op  !== undefined) { appendChar(op);  return; }

  switch (action) {
    case 'clear':      clear();        break;
    case 'delete':     deleteLast();   break;
    case 'equals':     evaluate();     break;
    case 'toggleSign': toggleSign();   break;
    case 'percent':    applyPercent(); break;
  }
}

// ── Attach button listeners ──────────────────────────────────
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', () => handleButtonClick(btn));
});

// ── Keyboard Support ─────────────────────────────────────────
const KEY_MAP = {
  '0':'0','1':'1','2':'2','3':'3','4':'4',
  '5':'5','6':'6','7':'7','8':'8','9':'9',
  '.':'.',
  '+':'+', '-':'−', '*':'×', '/':'÷',
  'Enter':'=', '=':'=',
  'Backspace':'⌫', 'Escape':'C',
  '%':'%',
};

document.addEventListener('keydown', e => {
  if (e.ctrlKey || e.altKey || e.metaKey) return;
  const mapped = KEY_MAP[e.key];
  if (!mapped) return;
  e.preventDefault();

  // Find matching button and visually activate it
  const opSymbols = Object.keys(OPS);
  let btn = null;

  if (mapped === 'C') {
    btn = document.querySelector('[data-action="clear"]');
    highlightBtn(btn);
    clear();
  } else if (mapped === '⌫') {
    btn = document.querySelector('[data-action="delete"]');
    highlightBtn(btn);
    deleteLast();
    playClick(380, 0.04);
  } else if (mapped === '=') {
    btn = document.querySelector('[data-action="equals"]');
    highlightBtn(btn);
    evaluate();
  } else if (mapped === '%') {
    applyPercent();
  } else if (['+','−','×','÷'].includes(mapped)) {
    btn = document.querySelector(`[data-op="${mapped}"]`);
    highlightBtn(btn);
    appendChar(mapped);
    playClick(440, 0.04);
  } else {
    btn = document.querySelector(`[data-num="${mapped}"]`);
    highlightBtn(btn);
    appendChar(mapped);
    playClick(520, 0.03);
  }
});

function highlightBtn(btn) {
  if (!btn) return;
  btn.classList.add('kb-active');
  setTimeout(() => btn.classList.remove('kb-active'), 120);
}

// ── History Toggle ───────────────────────────────────────────
historyToggle.addEventListener('click', () => {
  const open = historyPanel.classList.toggle('open');
  historyToggle.querySelector('span').textContent = open ? '▴ History' : '▾ History';
});

clearHistBtn.addEventListener('click', () => {
  state.history = [];
  renderHistory();
});

// ── Theme Toggle ─────────────────────────────────────────────
let darkMode = false;
// Default to system preference
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  darkMode = true;
  document.documentElement.setAttribute('data-theme', 'dark');
  themeToggle.querySelector('.theme-icon').textContent = '🌙';
}

themeToggle.addEventListener('click', () => {
  darkMode = !darkMode;
  document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : '');
  themeToggle.querySelector('.theme-icon').textContent = darkMode ? '🌙' : '☀️';
  playClick(darkMode ? 300 : 600, 0.06);
});

// ── Init ─────────────────────────────────────────────────────
render();
renderHistory();
