/* ============================================================
   Housebets Sportsbook Prototype — vanilla JS, zero dependencies
   Sample data only. No real bets, no real money.
   ============================================================ */
'use strict';

/* ---------------- Data ---------------- */
const FOOTBALL_LEAGUES = ['Premier League', 'Champions League', 'LaLiga', 'Serie A', 'Bundesliga'];
const SPORT_ICONS = { Football: '⚽', Basketball: '🏀', Tennis: '🎾', 'Ice Hockey': '🏒', Esports: '🎮' };

const MATCHES = [
  /* --- Premier League --- */
  { id: 'ars-bri', sport: 'Football', competition: 'Premier League', home: 'Arsenal', away: 'Brighton & Hove Albion',
    status: 'live', minute: 52, scoreH: 1, scoreA: 0, odds: { '1': 1.30, 'X': 4.60, '2': 11.00 }, marketsCount: 115, featured: true },
  { id: 'avl-ful', sport: 'Football', competition: 'Premier League', home: 'Aston Villa', away: 'Fulham',
    status: 'live', minute: 45, ht: true, scoreH: 0, scoreA: 0, odds: { '1': 2.25, 'X': 2.90, '2': 3.60 }, marketsCount: 7 },
  { id: 'new-eve', sport: 'Football', competition: 'Premier League', home: 'Newcastle United', away: 'Everton',
    status: 'live', minute: 58, scoreH: 2, scoreA: 1, odds: { '1': 1.55, 'X': 4.10, '2': 6.50 }, marketsCount: 6, startSuspended: true },
  { id: 'liv-mun', sport: 'Football', competition: 'Premier League', home: 'Liverpool', away: 'Manchester United',
    status: 'upcoming', startTime: '16:30', startDate: 'Today', odds: { '1': 1.65, 'X': 4.00, '2': 4.33 }, marketsCount: 10 },
  { id: 'mci-tot', sport: 'Football', competition: 'Premier League', home: 'Manchester City', away: 'Tottenham Hotspur',
    status: 'upcoming', startTime: '18:30', startDate: 'Today', odds: { '1': 1.50, 'X': 4.50, '2': 5.25 }, marketsCount: 9 },
  /* --- Champions League --- */
  { id: 'rma-bay', sport: 'Football', competition: 'Champions League', home: 'Real Madrid', away: 'Bayern Munich',
    status: 'upcoming', startTime: '20:00', startDate: 'Tue', odds: { '1': 2.20, 'X': 3.70, '2': 2.90 }, marketsCount: 9 },
  { id: 'bar-psg', sport: 'Football', competition: 'Champions League', home: 'Barcelona', away: 'Paris Saint-Germain',
    status: 'upcoming', startTime: '20:00', startDate: 'Wed', odds: { '1': 2.05, 'X': 3.80, '2': 3.30 }, marketsCount: 8 },
  { id: 'ars-int', sport: 'Football', competition: 'Champions League', home: 'Arsenal', away: 'Inter',
    status: 'upcoming', startTime: '20:00', startDate: 'Tue', odds: { '1': 1.95, 'X': 3.50, '2': 4.00 }, marketsCount: 8 },
  /* --- LaLiga --- */
  { id: 'atm-sev', sport: 'Football', competition: 'LaLiga', home: 'Atlético Madrid', away: 'Sevilla',
    status: 'live', minute: 37, scoreH: 1, scoreA: 0, odds: { '1': 1.85, 'X': 3.20, '2': 4.80 }, marketsCount: 8 },
  { id: 'bet-vil', sport: 'Football', competition: 'LaLiga', home: 'Real Betis', away: 'Villarreal',
    status: 'upcoming', startTime: '19:00', startDate: 'Today', odds: { '1': 2.60, 'X': 3.30, '2': 2.70 }, marketsCount: 7 },
  { id: 'val-ath', sport: 'Football', competition: 'LaLiga', home: 'Valencia', away: 'Athletic Club',
    status: 'upcoming', startTime: '21:00', startDate: 'Today', odds: { '1': 2.90, 'X': 3.10, '2': 2.60 }, marketsCount: 7 },
  /* --- Serie A --- */
  { id: 'juv-rom', sport: 'Football', competition: 'Serie A', home: 'Juventus', away: 'Roma',
    status: 'live', minute: 49, scoreH: 1, scoreA: 1, odds: { '1': 2.40, 'X': 3.10, '2': 3.20 }, marketsCount: 6 },
  { id: 'nap-mil', sport: 'Football', competition: 'Serie A', home: 'Napoli', away: 'AC Milan',
    status: 'upcoming', startTime: '17:00', startDate: 'Today', odds: { '1': 2.30, 'X': 3.25, '2': 3.10 }, marketsCount: 8 },
  /* --- Bundesliga --- */
  { id: 'b04-bvb', sport: 'Football', competition: 'Bundesliga', home: 'Bayer Leverkusen', away: 'Borussia Dortmund',
    status: 'live', minute: 63, scoreH: 2, scoreA: 2, odds: { '1': 2.55, 'X': 3.60, '2': 2.55 }, marketsCount: 6 },
  { id: 'rbl-sge', sport: 'Football', competition: 'Bundesliga', home: 'RB Leipzig', away: 'Eintracht Frankfurt',
    status: 'upcoming', startTime: '18:30', startDate: 'Today', odds: { '1': 1.95, 'X': 3.70, '2': 3.60 }, marketsCount: 7 },
  /* --- Basketball (live, moneyline) --- */
  { id: 'rmb-fen', sport: 'Basketball', competition: 'EuroLeague', home: 'Real Madrid BC', away: 'Fenerbahçe',
    status: 'live', period: 'Q3', clockSec: 245, scoreH: 58, scoreA: 54, odds: { '1': 1.75, '2': 2.05 }, marketsCount: 4 },
  { id: 'lal-bos', sport: 'Basketball', competition: 'NBA', home: 'LA Lakers', away: 'Boston Celtics',
    status: 'live', period: 'Q2', clockSec: 512, scoreH: 45, scoreA: 48, odds: { '1': 2.10, '2': 1.72 }, marketsCount: 4 },
  /* --- Tennis (live, match winner) --- */
  { id: 'ten-1', sport: 'Tennis', competition: 'ATP Masters', home: 'D. Mercer', away: 'L. Fontaine',
    status: 'live', scoreText: '6–4 · 3–2', odds: { '1': 1.62, '2': 2.25 }, marketsCount: 3 },
  { id: 'ten-2', sport: 'Tennis', competition: 'WTA 500', home: 'R. Ito', away: 'S. Bergström',
    status: 'live', scoreText: '7–5 · 1–1', odds: { '1': 2.40, '2': 1.55 }, marketsCount: 3 },
];
const SPORTS = ['Football', 'Basketball', 'Tennis', 'Ice Hockey', 'Esports'];
const matchById = id => MATCHES.find(m => m.id === id);

/* ---------------- Markets ----------------
   A market: { id, group, name, sels: [{ id, label, odds }], suspended }
   Selection key everywhere: matchId|marketId|selId            */
const marketsCache = {};
const selKey = (matchId, marketId, selId) => matchId + '|' + marketId + '|' + selId;

function dcOdds(o, a, b) { /* double-chance price from two 1X2 prices */
  const v = 1 / (1 / o[a] + 1 / o[b]);
  return Math.max(1.01, Math.round(v * 0.97 * 100) / 100);
}

function buildMarkets(m) {
  if (m.sport !== 'Football') {
    return [{
      id: 'result', group: 'Popular', name: m.sport === 'Tennis' ? 'Match winner' : 'Moneyline',
      sels: [
        { id: '1', label: m.home, odds: m.odds['1'] },
        { id: '2', label: m.away, odds: m.odds['2'] },
      ],
      suspended: !!m.startSuspended,
    }];
  }
  const o = m.odds;
  if (m.featured) {
    return [
      { id: 'result', group: 'Popular', name: 'Match result', sels: [
        { id: '1', label: m.home, odds: o['1'] }, { id: 'X', label: 'Draw', odds: o['X'] }, { id: '2', label: m.away, odds: o['2'] } ], suspended: false },
      { id: 'btts', group: 'Popular', name: 'Both teams to score', alsoGroups: ['Goals'], sels: [
        { id: 'yes', label: 'Yes', odds: 2.10 }, { id: 'no', label: 'No', odds: 1.70 } ], suspended: false },
      { id: 'dc', group: 'Popular', name: 'Double chance', sels: [
        { id: '1x', label: m.home + ' or draw', odds: 1.03 }, { id: '12', label: m.home + ' or ' + m.away, odds: 1.18 },
        { id: 'x2', label: 'Draw or ' + m.away, odds: 3.30 } ], suspended: false },
      { id: 'nextgoal', group: 'Popular', name: 'Next goal', sels: [
        { id: 'h', label: m.home, odds: 1.80 }, { id: 'none', label: 'No goal', odds: 9.00 }, { id: 'a', label: m.away, odds: 4.50 } ], suspended: false },
      { id: 'ou25', group: 'Goals', name: 'Total goals · Over/Under 2.5', sels: [
        { id: 'over', label: 'Over 2.5', odds: 2.73 }, { id: 'under', label: 'Under 2.5', odds: 1.44 } ], suspended: false },
      { id: 'ou35', group: 'Goals', name: 'Total goals · Over/Under 3.5', sels: [
        { id: 'over', label: 'Over 3.5', odds: 4.60 }, { id: 'under', label: 'Under 3.5', odds: 1.18 } ], suspended: false },
      { id: 'fh-result', group: 'Halves', name: '1st half result', sels: [
        { id: '1', label: m.home, odds: 1.55 }, { id: 'X', label: 'Draw', odds: 3.40 }, { id: '2', label: m.away, odds: 9.50 } ],
        suspended: true, lockNote: 'Suspended — half already played' },
      { id: 'sh-ou15', group: 'Halves', name: '2nd half goals · Over/Under 1.5', sels: [
        { id: 'over', label: 'Over 1.5', odds: 2.05 }, { id: 'under', label: 'Under 1.5', odds: 1.75 } ], suspended: false },
      { id: 'handicap', group: 'Handicaps', name: 'Handicap', sels: [
        { id: 'h-1', label: m.home + ' -1.0', odds: 2.60 }, { id: 'a+1', label: m.away + ' +1.0', odds: 1.50 },
        { id: 'h-2', label: m.home + ' -2.0', odds: 5.75 }, { id: 'a+2', label: m.away + ' +2.0', odds: 1.12 } ], suspended: false },
      { id: 'scorers', group: 'Goalscorers', name: 'Anytime goalscorer', sels: [
        { id: 'p1', label: 'J. Miller', odds: 2.40 }, { id: 'p2', label: 'T. Walker', odds: 2.90 },
        { id: 'p3', label: 'D. Osei', odds: 3.40 }, { id: 'p4', label: 'K. Brennan', odds: 4.20 } ], suspended: false },
      { id: 'corners', group: 'Corners & Cards', name: 'Corners · Over/Under 9.5', sels: [
        { id: 'over', label: 'Over 9.5', odds: 1.95 }, { id: 'under', label: 'Under 9.5', odds: 1.85 } ], suspended: false },
      { id: 'cards', group: 'Corners & Cards', name: 'Cards · Over/Under 3.5', sels: [
        { id: 'over', label: 'Over 3.5', odds: 2.20 }, { id: 'under', label: 'Under 3.5', odds: 1.65 } ], suspended: false },
    ];
  }
  return [
    { id: 'result', group: 'Popular', name: 'Match result', sels: [
      { id: '1', label: m.home, odds: o['1'] }, { id: 'X', label: 'Draw', odds: o['X'] }, { id: '2', label: m.away, odds: o['2'] } ],
      suspended: !!m.startSuspended },
    { id: 'btts', group: 'Popular', name: 'Both teams to score', alsoGroups: ['Goals'], sels: [
      { id: 'yes', label: 'Yes', odds: 1.95 }, { id: 'no', label: 'No', odds: 1.80 } ], suspended: false },
    { id: 'dc', group: 'Popular', name: 'Double chance', sels: [
      { id: '1x', label: m.home + ' or draw', odds: dcOdds(o, '1', 'X') },
      { id: '12', label: m.home + ' or ' + m.away, odds: dcOdds(o, '1', '2') },
      { id: 'x2', label: 'Draw or ' + m.away, odds: dcOdds(o, 'X', '2') } ], suspended: false },
    { id: 'nextgoal', group: 'Popular', name: 'Next goal', sels: [
      { id: 'h', label: m.home, odds: 2.05 }, { id: 'none', label: 'No goal', odds: 8.50 }, { id: 'a', label: m.away, odds: 3.10 } ], suspended: false },
    { id: 'ou25', group: 'Goals', name: 'Total goals · Over/Under 2.5', sels: [
      { id: 'over', label: 'Over 2.5', odds: 2.10 }, { id: 'under', label: 'Under 2.5', odds: 1.70 } ], suspended: false },
  ];
}
function getMarkets(m) {
  if (!marketsCache[m.id]) marketsCache[m.id] = buildMarkets(m);
  return marketsCache[m.id];
}
function findMarket(matchId, marketId) {
  const m = matchById(matchId);
  return m ? getMarkets(m).find(mk => mk.id === marketId) : null;
}
function findSel(matchId, marketId, selId) {
  const mk = findMarket(matchId, marketId);
  return mk ? mk.sels.find(s => s.id === selId) : null;
}
function currentOdds(sel) {
  const s = findSel(sel.matchId, sel.marketId, sel.selId);
  return s ? s.odds : sel.odds;
}
function selSuspended(sel) {
  const mk = findMarket(sel.matchId, sel.marketId);
  return !!(mk && mk.suspended);
}

/* ---------------- State ---------------- */
const state = {
  balance: 1250.00,
  view: 'home',            /* home | live | football | sport | match */
  sport: null,             /* for generic sport view */
  currentMatchId: null,
  footballComp: 'All',
  liveSport: 'All',
  liveComp: 'All',
  homeMode: 'live',        /* live | soon */
  homeSport: 'All',
  expandedGroups: new Set(), /* "live:Football" etc. — mobile show-all state per sport group */
  query: '',
  marketQuery: '',
  matchGroup: 'All',
  follows: new Set(['Premier League', 'Arsenal']),
  slip: new Map(),         /* key -> selection */
  railTab: 'slip',
  myBetsTab: 'open',
  slipBanner: null,        /* { type, html } */
  coFrac: {},              /* betId -> partial cash-out percent (25/50/75/100) */
  slipSettings: { order: 'added', oddsPolicy: 'manual' }, /* added|newest|kickoff · manual|higher|any */
  bets: [
    { id: 'seed-won', pick: 'Manchester City', matchLabel: 'Manchester City v Chelsea', marketName: 'Match result',
      odds: 1.80, stake: 20.00, potential: 36.00, status: 'settled', result: 'Won', returned: 36.00, cashFactor: 0 },
    { id: 'seed-lost', pick: 'Over 2.5 goals', matchLabel: 'Liverpool v Chelsea', marketName: 'Total goals · Over/Under 2.5',
      odds: 2.40, stake: 15.00, potential: 36.00, status: 'settled', result: 'Lost', returned: 0.00, cashFactor: 0 },
  ],
  betSeq: 100,
};

/* ---------------- Utils ---------------- */
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));
const fmt = n => (Math.round(n * 100) / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtOdds = n => n.toFixed(2);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
function initials(name) {
  const parts = name.replace(/[^A-Za-zÀ-ÿ ]/g, '').split(' ').filter(Boolean);
  return ((parts[0] || '?')[0] + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase();
}
function hue(name) { let h = 0; for (const c of name) h = (h * 31 + c.charCodeAt(0)) % 360; return h; }
function crest(name) { return `<span class="crest" style="--h:${hue(name)}">${esc(initials(name))}</span>`; }
let toastTimer = null;
function reducedMotion() {
  return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
}
function animateNum(el, to, format) { /* count-up/down tween for money readouts (~300 ms) */
  if (!el) return;
  const from = typeof el._animVal === 'number' ? el._animVal : to;
  el._animVal = to;
  if (reducedMotion() || from === to) { el.textContent = format(to); return; }
  const token = (el._animToken = (el._animToken || 0) + 1);
  const start = performance.now(), dur = 300;
  const stepFn = now => {
    if (el._animToken !== token) return;
    const p = Math.min(1, (now - start) / dur);
    const v = from + (to - from) * (1 - Math.pow(1 - p, 2));
    el.textContent = format(v);
    if (p < 1) requestAnimationFrame(stepFn); else el.textContent = format(to);
  };
  requestAnimationFrame(stepFn);
}
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2400);
}
function clockLabel(m) {
  if (m.status !== 'live') return '';
  if (m.sport === 'Football') return m.ht && m.minute === 45 ? 'HT' : m.minute + "'";
  if (m.sport === 'Basketball') {
    const mm = Math.floor(m.clockSec / 60), ss = String(m.clockSec % 60).padStart(2, '0');
    return m.period + ' ' + mm + ':' + ss;
  }
  return 'Set 2';
}
function scoreLabel(m) {
  if (m.scoreText) return m.scoreText;
  return m.scoreH + ' – ' + m.scoreA;
}
/* ---------------- Momentum (match page differentiator) ---------------- */
function momentumBase(m) { return 50 + Math.max(-20, Math.min(20, (m.scoreH - m.scoreA) * 8)); }
function momentumOf(m) {
  if (typeof m.momentum !== 'number') m.momentum = m.status === 'live' ? momentumBase(m) : 50;
  return m.momentum;
}
function momentumLabel(m) {
  const v = momentumOf(m);
  if (v >= 56) return m.home + ' menekan';
  if (v <= 44) return m.away + ' menekan';
  return 'Seimbang — end to end';
}
function momentumHTML(m) {
  if (m.sport !== 'Football') return '';
  if (m.status !== 'live') {
    return `<div class="momentum">
      <div class="mo-head"><span>📊 Momentum</span><span class="mo-label">Kick-off belum mulai — netral</span></div>
      <div class="mo-bar"><div class="mo-home" style="width:50%"></div><div class="mo-mid"></div></div>
      <div class="mo-teams"><span>${esc(m.home)} <b>50%</b></span><span><b>50%</b> ${esc(m.away)}</span></div>
    </div>`;
  }
  const v = Math.round(momentumOf(m));
  return `<div class="momentum">
    <div class="mo-head"><span>📊 Momentum</span><span class="mo-label" data-mo-label="${m.id}">${esc(momentumLabel(m))}</span></div>
    <div class="mo-bar"><div class="mo-home" data-mo-home="${m.id}" style="width:${v}%"></div><div class="mo-mid"></div></div>
    <div class="mo-teams"><span>${esc(m.home)} <b data-mo-hpct="${m.id}">${v}%</b></span><span><b data-mo-apct="${m.id}">${100 - v}%</b> ${esc(m.away)}</span></div>
  </div>`;
}
function liveInfo(m) { /* "1 – 0 · 52'" for slip rows */
  if (m.status !== 'live') return 'Starts ' + m.startTime + ' · ' + (m.startDate || '');
  return scoreLabel(m) + ' · ' + clockLabel(m);
}

/* ---------------- Shared components ---------------- */
function oddsBtn(m, mk, s) {
  const key = selKey(m.id, mk.id, s.id);
  const selected = state.slip.has(key) ? ' selected' : '';
  const dis = mk.suspended ? ' disabled' : '';
  return `<button class="odds-btn${selected}" data-action="toggle-odds" data-key="${key}" data-odds-key="${key}"${dis}
      aria-pressed="${state.slip.has(key)}">
    <span class="ob-label">${esc(s.label)}</span><span class="ob-value" data-odds-val="${key}"><span class="ob-face ob-front">${fmtOdds(s.odds)}</span><span class="ob-face ob-back" aria-hidden="true"></span></span>
  </button>`;
}
function rowOdds(m) {
  const mk = getMarkets(m).find(x => x.id === 'result');
  const btns = mk.sels.map(s => oddsBtn(m, mk, s)).join('');
  const strip = `<div class="row-suspended${mk.suspended ? '' : ' hidden'}" data-row-susp="${m.id}">🔒 Suspended</div>`;
  return `<div class="row-odds${mk.suspended ? ' hidden' : ''}" data-row-odds="${m.id}">${btns}</div>${strip}`;
}
function matchRow(m, extraCls, showComp) {
  const status = m.status === 'live'
    ? `<span class="live-badge">LIVE</span><span class="clock" data-clock-for="${m.id}">${clockLabel(m)}</span>`
    : `<span class="start-time">${esc(m.startTime || '')}</span><span class="start-date">${esc(m.startDate || '')}</span>`;
  const score = m.status === 'live'
    ? `<span class="team-score" data-score-for="${m.id}">${m.scoreText ? esc(m.scoreText) : m.scoreH}</span>`
    : '';
  const score2 = m.status === 'live' && !m.scoreText ? `<span class="team-score">${m.scoreA}</span>` : '';
  return `<div class="match-row${extraCls ? ' ' + extraCls : ''}">
    ${showComp ? `<div class="row-comp">${esc(m.competition)}</div>` : ''}
    <div class="row-status">${status}</div>
    <div class="row-teams" data-action="open-match" data-id="${m.id}" role="button" title="Open match page">
      <div class="team-line">${crest(m.home)}<span class="team-name">${esc(m.home)}</span>${score}</div>
      <div class="team-line">${crest(m.away)}<span class="team-name">${esc(m.away)}</span>${score2}</div>
    </div>
    <div class="row-right">
      ${rowOdds(m)}
      <button class="more-markets" data-action="open-match" data-id="${m.id}">+${m.marketsCount || 5} ›</button>
    </div>
  </div>`;
}
function leagueSection(comp, list, opts) {
  opts = opts || {};
  const followed = state.follows.has(comp);
  return `<section class="section">
    <div class="league-head"><span>${opts.icon || '⚽'}</span> ${esc(comp)}
      <span class="count">${list.length} match${list.length === 1 ? '' : 'es'}</span>
      <button class="star-btn${followed ? ' on' : ''}" data-action="follow" data-name="${esc(comp)}"
        title="${followed ? 'Unfollow' : 'Follow'} ${esc(comp)}">${followed ? '★' : '☆'}</button>
      <span class="market-col">Match result</span>
    </div>
    <div class="match-list">${list.map(matchRow).join('')}</div>
  </section>`;
}
function emptyState(title, text, extra) {
  return `<div class="empty-state"><span class="sloth">🦥</span><h3>${esc(title)}</h3><p>${esc(text)}</p>${extra || ''}</div>`;
}
function followChips() {
  if (!state.follows.size) return '';
  const chips = Array.from(state.follows).map(name =>
    `<span class="fav-chip"><span class="star">★</span> ${esc(name)}
       <button data-action="follow" data-name="${esc(name)}" title="Unfollow">✕</button></span>`).join('');
  return `<section class="section"><div class="section-head">⭐ Favourites</div><div class="fav-chips">${chips}</div></section>`;
}

/* ---------------- Views ---------------- */
function viewHome() {
  const q = state.query.trim().toLowerCase();
  const matchesQuery = m => !q || m.home.toLowerCase().includes(q) || m.away.toLowerCase().includes(q) || m.competition.toLowerCase().includes(q);
  const live = MATCHES.filter(m => m.status === 'live' && matchesQuery(m));
  const soon = MATCHES.filter(m => m.status === 'upcoming' && matchesQuery(m));
  const pool = state.homeMode === 'live' ? live : soon;
  const feed = state.homeSport === 'All' ? pool : pool.filter(m => m.sport === state.homeSport);
  const modeBtns = `
    <div class="mode-toggle" role="tablist" aria-label="Live or upcoming">
      <button class="mode-btn live-btn${state.homeMode === 'live' ? ' active' : ''}" data-action="home-mode" data-mode="live">🔴 Live <span class="n">${live.length}</span></button>
      <button class="mode-btn${state.homeMode === 'soon' ? ' active' : ''}" data-action="home-mode" data-mode="soon">🕐 Upcoming <span class="n">${soon.length}</span></button>
    </div>`;
  const sportTabs = ['All'].concat(SPORTS).map(s => {
    const n = s === 'All' ? pool.length : pool.filter(m => m.sport === s).length;
    const label = s === 'All' ? '🎯 All' : SPORT_ICONS[s] + ' ' + (s === 'Football' ? 'Soccer' : s);
    return `<button class="chip${state.homeSport === s ? ' active' : ''}" data-action="home-sport" data-sport="${esc(s)}">${label} <span class="n">${n}</span></button>`;
  }).join('');
  const noResults = q && !live.length && !soon.length;
  let feedBody;
  if (noResults) {
    feedBody = emptyState('Nothing found for "' + state.query + '"', 'No teams, players or leagues match that search. Try "Arsenal", "LaLiga" or clear the search.', `<p style="margin-top:12px"><button class="btn primary" data-action="clear-search">Clear search</button></p>`);
  } else if (feed.length) {
    if (state.homeSport === 'All') {
      feedBody = SPORTS.filter(s => feed.some(m => m.sport === s)).map(s => {
        const list = feed.filter(m => m.sport === s);
        const label = s === 'Football' ? 'Soccer' : s;
        const gkey = state.homeMode + ':' + s;
        const expanded = state.expandedGroups.has(gkey);
        const rows = list.map((m, i) => matchRow(m, i >= 3 ? 'extra-row' : '', true)).join('');
        const toggle = list.length > 3
          ? `<button class="group-toggle" data-action="toggle-group" data-group="${gkey}">${expanded ? '<span class="gt-arrow">⌃</span><span>Hide</span>' : '<span>More</span><span class="gt-arrow">⌄</span>'}</button>` : '';
        return `<div class="feed-group${expanded ? ' expanded' : ''}"><div class="sport-divider"><span>${SPORT_ICONS[s]} ${esc(label)}</span><span class="sd-count">${list.length} match${list.length === 1 ? '' : 'es'}</span></div>${rows}${toggle}</div>`;
      }).join('');
    } else {
      feedBody = feed.map(m => matchRow(m, '', true)).join('');
    }
  } else if (state.homeMode === 'live') {
    feedBody = emptyState('No live matches for this filter', 'Nothing in play here right now. Switch to Upcoming to see what is next.');
  } else {
    feedBody = emptyState('Nothing starting soon here', 'No upcoming fixtures for this filter. The sloth is still filling the board.');
  }
  const compCards = FOOTBALL_LEAGUES.map((comp, i) => {
    const list = MATCHES.filter(m => m.competition === comp);
    const nl = list.filter(m => m.status === 'live').length;
    return `<button class="comp-card" data-action="comp-card" data-comp="${esc(comp)}">
      <span class="cc-ico">${['🏆', '⭐', '🇪🇸', '🇮🇹', '🇩🇪'][i]}</span>
      <span class="cc-name">${esc(comp)}</span>
      <span class="cc-sub">${list.length} matches${nl ? ' · ' + nl + ' live now' : ''}</span>
      <span class="cc-go">View fixtures ›</span></button>`;
  }).join('');
  const feedTitle = state.homeMode === 'live' ? '🔴 Live now' : '🕐 Upcoming';
  const sportSuffix = state.homeSport === 'All' ? '' : ' · ' + (state.homeSport === 'Football' ? 'Soccer' : state.homeSport);
  return `
  <div class="view-head"><h1>⚽ Sports Bet</h1><span class="sub">The sloth has picked today's finest fixtures.</span></div>
  ${followChips()}
  <div class="feed-controls">
    ${modeBtns}
    <div class="feed-tabs">${sportTabs}</div>
  </div>
  <section class="section">
    <div class="section-head">${feedTitle}${sportSuffix} <span class="count">${feed.length} match${feed.length === 1 ? '' : 'es'}</span></div>
    <div class="match-list">${feedBody}</div>
  </section>
  <section class="section">
    <div class="section-head">🏆 Top competitions</div>
    <div class="comp-grid">${compCards}</div>
  </section>`;
}

function viewLive() {
  const liveAll = MATCHES.filter(m => m.status === 'live');
  const sportsPresent = ['All'].concat(SPORTS); /* all sports listed, even 0 live — picking one shows the empty state + Upcoming fallback */
  const sportChips = sportsPresent.map(s => {
    const n = s === 'All' ? liveAll.length : liveAll.filter(m => m.sport === s).length;
    return `<button class="chip${state.liveSport === s ? ' active' : ''}" data-action="live-sport" data-sport="${esc(s)}">${s === 'All' ? '🎯 All' : SPORT_ICONS[s] + ' ' + s} <span class="n">${n}</span></button>`;
  }).join('');
  let pool = state.liveSport === 'All' ? liveAll : liveAll.filter(m => m.sport === state.liveSport);
  const compsPresent = ['All'].concat(Array.from(new Set(pool.map(m => m.competition))));
  if (!compsPresent.includes(state.liveComp)) state.liveComp = 'All';
  const compChips = compsPresent.map(c =>
    `<button class="chip${state.liveComp === c ? ' active' : ''}" data-action="live-comp" data-comp="${esc(c)}">${c === 'All' ? 'All competitions' : esc(c)}</button>`).join('');
  const filtered = state.liveComp === 'All' ? pool : pool.filter(m => m.competition === state.liveComp);
  let body;
  if (filtered.length) {
    const byComp = {};
    filtered.forEach(m => { (byComp[m.competition] = byComp[m.competition] || []).push(m); });
    body = Object.keys(byComp).map(comp => leagueSection(comp, byComp[comp], { icon: SPORT_ICONS[filtered.find(m => m.competition === comp).sport] })).join('');
  } else {
    const soon = MATCHES.filter(m => m.status === 'upcoming');
    body = `<section class="section">${emptyState('Nothing live here right now', 'That filter combo has no in-play matches. Here is what starts soon instead.')}</section>
      <section class="section"><div class="section-head">🕒 Upcoming <span class="count">${soon.length} matches</span></div>
      <div class="match-list">${soon.map(matchRow).join('')}</div></section>`;
  }
  return `
  <div class="view-head"><h1>🔴 Live</h1><span class="sub">${liveAll.length} matches in play — scores and clocks update live.</span></div>
  <div class="chips"><span class="chip-row-label">Sport</span>${sportChips}</div>
  <div class="chips"><span class="chip-row-label">League</span>${compChips}</div>
  ${body}`;
}

function footballChips() {
  const comps = ['All'].concat(FOOTBALL_LEAGUES);
  return comps.map(c => {
    const n = c === 'All' ? MATCHES.filter(m => m.sport === 'Football').length : MATCHES.filter(m => m.competition === c).length;
    return `<button class="chip${state.footballComp === c ? ' active' : ''}" data-action="football-comp" data-comp="${esc(c)}">${c === 'All' ? 'All leagues' : esc(c)} <span class="n">${n}</span></button>`;
  }).join('');
}
function viewFootball() {
  const comps = state.footballComp === 'All' ? FOOTBALL_LEAGUES : [state.footballComp];
  const sections = comps.map(comp => {
    const list = MATCHES.filter(m => m.competition === comp);
    return list.length ? leagueSection(comp, list) : '';
  }).join('');
  const liveN = MATCHES.filter(m => m.sport === 'Football' && m.status === 'live').length;
  return `
  <div class="view-head"><h1>⚽ Football</h1><span class="sub">5 competitions · ${liveN} live · tap a match for all its markets.</span></div>
  <div class="chips">${footballChips()}</div>
  ${sections || `<section class="section">${emptyState('No fixtures', 'No matches in this competition right now.')}</section>`}`;
}

function viewSport(sport) {
  const list = MATCHES.filter(m => m.sport === sport);
  let body;
  if (!list.length) {
    body = `<section class="section">${emptyState('No ' + sport + ' matches right now', 'The sloth checked twice — this board is empty. Football is buzzing though.', `<p style="margin-top:12px"><button class="btn primary" data-action="nav" data-view="football">Go to Football</button></p>`)}</section>`;
  } else {
    const byComp = {};
    list.forEach(m => { (byComp[m.competition] = byComp[m.competition] || []).push(m); });
    body = Object.keys(byComp).map(comp => leagueSection(comp, byComp[comp], { icon: SPORT_ICONS[sport] })).join('');
  }
  return `<div class="view-head"><h1>${SPORT_ICONS[sport]} ${esc(sport)}</h1><span class="sub">${list.length} match${list.length === 1 ? '' : 'es'} on the board.</span></div>${body}`;
}

const GROUP_ORDER = ['Popular', 'Goals', 'Halves', 'Handicaps', 'Goalscorers', 'Corners & Cards'];
function marketBlock(m, mk) {
  const sels = mk.sels.map(s => oddsBtn(m, mk, s)).join('');
  return `<div class="market-block${mk.suspended ? ' is-suspended' : ''}" data-market-block="${m.id}|${mk.id}">
    <div class="market-head">${esc(mk.name)}
      ${mk.suspended ? `<span class="lock-note">🔒 ${esc(mk.lockNote || 'Suspended')}</span>` : ''}</div>
    <div class="market-sels">${sels}</div>
    ${mk.suspended ? `<div class="suspended-strip">🔒 Suspended — this market is paused right now</div>` : ''}
  </div>`;
}
function viewMatch(m) {
  const markets = getMarkets(m);
  const groups = [];
  markets.forEach(mk => {
    const gs = [mk.group].concat(mk.alsoGroups || []);
    gs.forEach(g => { if (!groups.includes(g)) groups.push(g); });
  });
  const ordered = GROUP_ORDER.filter(g => groups.includes(g)).concat(groups.filter(g => !GROUP_ORDER.includes(g)));
  const tabs = ['All'].concat(ordered).map(g =>
    `<button class="chip${state.matchGroup === g ? ' active' : ''}" data-action="match-group" data-group="${esc(g)}">${esc(g)}</button>`).join('');
  const mq = state.marketQuery.trim().toLowerCase();
  let blocks = '';
  ordered.forEach(g => {
    if (state.matchGroup !== 'All' && state.matchGroup !== g) return;
    const inGroup = markets.filter(mk => mk.group === g || (mk.alsoGroups || []).includes(g));
    const shown = inGroup.filter(mk => !mq || mk.name.toLowerCase().includes(mq) || mk.sels.some(s => s.label.toLowerCase().includes(mq)));
    if (!shown.length) return;
    blocks += `<div class="group-title">${esc(g)}</div>` + shown.map(mk => marketBlock(m, mk)).join('');
  });
  if (!blocks) blocks = `<section class="section">${emptyState('No markets match', 'Try a different market search, or clear it to see everything.', `<p style="margin-top:12px"><button class="btn primary" data-action="clear-market-search">Clear market search</button></p>`)}</section>`;
  const followBtn = team => {
    const on = state.follows.has(team);
    return `<button class="follow-btn${on ? ' on' : ''}" data-action="follow" data-name="${esc(team)}">${on ? '★ Following' : '☆ Follow'}</button>`;
  };
  const meta = m.status === 'live'
    ? `<span class="live-badge">LIVE</span><span class="clock" data-clock-for="${m.id}">${clockLabel(m)}</span>`
    : `<span class="sb-start">Starts ${esc(m.startTime || '')} · ${esc(m.startDate || '')}</span>`;
  const score = m.status === 'live'
    ? `<div class="sb-score"><span data-score-for="${m.id}">${m.scoreText ? esc(m.scoreText) : m.scoreH}</span>${m.scoreText ? '' : `<span class="dash">–</span><span>${m.scoreA}</span>`}</div>`
    : `<div class="sb-score" style="color:var(--muted)">v</div>`;
  return `
  <div><button class="back-btn" data-action="back">‹ Back to fixtures</button></div>
  <div class="scoreboard">
    <div class="sb-comp">${esc(m.competition)} · ${esc(m.sport)}</div>
    <div class="sb-teams">
      <div class="sb-team">${crest(m.home)}<span class="sb-name">${esc(m.home)}</span>${m.sport === 'Football' ? followBtn(m.home) : ''}</div>
      <div>${score}</div>
      <div class="sb-team">${crest(m.away)}<span class="sb-name">${esc(m.away)}</span>${m.sport === 'Football' ? followBtn(m.away) : ''}</div>
    </div>
    <div class="sb-meta">${meta}</div>
  </div>
  ${momentumHTML(m)}
  <div class="market-search"><span class="search-ico">🔍</span>
    <input id="marketSearch" type="search" placeholder="Search markets or players" value="${esc(state.marketQuery)}" autocomplete="off"></div>
  <div class="chips">${tabs}</div>
  ${blocks}`;
}

/* ---------------- Render root ---------------- */
function renderMain() {
  const main = $('#main');
  let html = '';
  if (state.view === 'home') html = viewHome();
  else if (state.view === 'live') html = viewLive();
  else if (state.view === 'football') html = viewFootball();
  else if (state.view === 'sport') html = viewSport(state.sport);
  else if (state.view === 'match') { const m = matchById(state.currentMatchId); html = m ? viewMatch(m) : viewHome(); }
  main.innerHTML = html;
  const ms = $('#marketSearch');
  if (ms) ms.addEventListener('input', e => { state.marketQuery = e.target.value; renderMainKeepSearch(); });
  renderNav();
}
function renderMainKeepSearch() { /* re-render match view without losing search focus */
  const pos = $('#marketSearch') ? $('#marketSearch').selectionStart : null;
  renderMain();
  const ms = $('#marketSearch');
  if (ms && pos !== null) { ms.focus(); ms.setSelectionRange(pos, pos); }
}
function renderNav() {
  $$('.nav-item').forEach(b => b.classList.toggle('active',
    b.dataset.view === state.view || (state.view === 'match' && b.dataset.view === 'football' && (matchById(state.currentMatchId) || {}).sport === 'Football') ||
    (state.view === 'sport' && b.dataset.view === 'home' && false)));
  $$('.bottomnav button[data-view]').forEach(b => b.classList.toggle('active', b.dataset.view === state.view));
  const liveN = MATCHES.filter(m => m.status === 'live').length;
  $('#liveCount').textContent = liveN ? liveN : '';
  $('#sportList').innerHTML = SPORTS.map(s => {
    const n = MATCHES.filter(m => m.sport === s).length;
    const active = (s === 'Football' && (state.view === 'football' || (state.view === 'match' && (matchById(state.currentMatchId) || {}).sport === 'Football'))) ||
                   (s !== 'Football' && state.view === 'sport' && state.sport === s) ||
                   (s !== 'Football' && state.view === 'match' && (matchById(state.currentMatchId) || {}).sport === s);
    return `<button class="sport-item${active ? ' active' : ''}" data-action="sport" data-sport="${esc(s)}">${SPORT_ICONS[s]} <span>${esc(s)}</span><span class="sport-count">${n}</span></button>`;
  }).join('');
  renderDrawer();
}

/* ---------------- Menu drawer ---------------- */
const LEAGUE_BADGES = { 'Premier League': ['PL', '#4B2E83'], 'Champions League': ['UCL', '#274690'], 'LaLiga': ['LL', '#D64545'], 'Serie A': ['SA', '#2E7CC4'], 'Bundesliga': ['BL', '#C4373C'] };
function renderDrawer() {
  const el = $('#drawerBody');
  if (!el) return;
  const liveN = MATCHES.filter(m => m.status === 'live').length;
  const pageItem = (action, attrs, icon, label, badge, active) =>
    `<button class="nav-item${active ? ' active' : ''}" data-action="${action}" ${attrs}>${icon} <span>${label}</span>${badge || ''}</button>`;
  const pages = [
    pageItem('nav', 'data-view="home"', '⚽', 'Sports Bet', '', state.view === 'home'),
    pageItem('nav', 'data-view="live"', '🔴', 'Live', `<span class="sport-count">${liveN}</span>`, state.view === 'live'),
    pageItem('nav', 'data-view="football"', '⚽', 'Football', '', state.view === 'football'),
    pageItem('open-rail', '', '🧾', 'Bet slip and my bets', '', false),
    pageItem('avatar', '', '👤', 'Account', '', false),
  ].join('');
  const sports = SPORTS.map(s => {
    const n = MATCHES.filter(m => m.sport === s).length;
    const active = s !== 'Football' && state.view === 'sport' && state.sport === s;
    return `<button class="sport-item${active ? ' active' : ''}" data-action="sport" data-sport="${esc(s)}">${SPORT_ICONS[s]} <span>${esc(s)}</span><span class="sport-count">${n}</span></button>`;
  }).join('');
  const comps = FOOTBALL_LEAGUES.map(c => {
    const b = LEAGUE_BADGES[c] || [initials(c), '#33565F'];
    return `<button class="sport-item" data-action="comp-card" data-comp="${esc(c)}"><span class="lg-badge" style="background:${b[1]}">${b[0]}</span> <span>${esc(c)}</span></button>`;
  }).join('');
  const follows = Array.from(state.follows).map(name => FOOTBALL_LEAGUES.includes(name)
    ? `<button class="sport-item" data-action="comp-card" data-comp="${esc(name)}"><span class="star-ico">⭐</span> <span>${esc(name)}</span></button>`
    : `<button class="sport-item" data-action="drawer-team" data-name="${esc(name)}"><span class="star-ico">⭐</span> <span>${esc(name)}</span></button>`).join('');
  el.innerHTML = `
    <div class="side-section">${pages}</div>
    <div class="side-title">Sports</div>
    ${sports}
    <div class="side-title">Top competitions</div>
    ${comps}
    ${follows ? `<div class="side-title">Following</div>${follows}` : ''}`;
}
function openMenu() { renderDrawer(); $('#drawer').classList.add('open'); $('#drawerBackdrop').hidden = false; }
function closeMenu() {
  const d = $('#drawer'); if (d) d.classList.remove('open');
  const b = $('#drawerBackdrop'); if (b) b.hidden = true;
}

/* ---------------- Live ticker ---------------- */
function tickerItemHTML(m) {
  const score = m.scoreText ? esc(m.scoreText) : (m.scoreH + '–' + m.scoreA);
  const clock = m.sport === 'Tennis' ? '' : ' · ' + clockLabel(m);
  return `<button class="tick-item" data-action="open-match" data-id="${m.id}">
    <span class="tick-teams">${esc(m.home)} <b data-tick-score="${m.id}">${score}</b> ${esc(m.away)}</span>
    <span class="tick-clock" data-tick-clock="${m.id}">${esc(clock)}</span>
  </button><span class="tick-dot">•</span>`;
}
function renderTicker() {
  const live = MATCHES.filter(m => m.status === 'live');
  const cnt = $('#tickerCount');
  if (cnt) cnt.textContent = live.length || '';
  const el = $('#tickerTrack');
  if (!el) return;
  if (!live.length) { el.innerHTML = ''; return; }
  const items = live.map(tickerItemHTML).join('');
  el.innerHTML = `<div class="ticker-inner"><div class="ticker-chunk">${items}</div><div class="ticker-chunk" aria-hidden="true">${items}</div></div>`;
}
function updateTicker() {
  MATCHES.filter(m => m.status === 'live').forEach(m => {
    const score = m.scoreText ? m.scoreText : (m.scoreH + '–' + m.scoreA);
    $$('[data-tick-score="' + m.id + '"]').forEach(el => { el.textContent = score; });
    const clock = m.sport === 'Tennis' ? '' : ' · ' + clockLabel(m);
    $$('[data-tick-clock="' + m.id + '"]').forEach(el => { el.textContent = clock; });
  });
}

/* ---------------- Bet slip ---------------- */
function slipTotals() {
  let stake = 0, ret = 0, comb = 1, any = false;
  state.slip.forEach(sel => {
    const s = parseFloat(sel.stake) || 0;
    stake += s; ret += s * sel.odds; comb *= sel.odds; any = true;
  });
  return { stake, ret, comb: any ? comb : 0, count: state.slip.size };
}
function slipBlockers() {
  let changed = false, suspended = false;
  state.slip.forEach(sel => { if (sel.changed) changed = true; if (selSuspended(sel)) suspended = true; });
  return { changed, suspended };
}
function syncStakeUI(key) { /* refresh returns + totals after a stake change, without re-rendering the slip */
  const sel = state.slip.get(key);
  if (!sel) return;
  const r = (parseFloat(sel.stake) || 0) * sel.odds;
  animateNum(document.querySelector(`[data-ret-for="${CSS.escape(key)}"]`), r, v => v >= 0.005 ? fmt(v) : '—');
  const t = slipTotals();
  const ts = $('#totStake'), co = $('#combOdds');
  if (ts) ts.textContent = fmt(t.stake) + ' USDT';
  if (co) co.textContent = fmtOdds(t.comb || 1);
  animateNum($('#totReturn'), t.ret, v => fmt(v) + ' USDT');
  const pb = $('#placeBtn');
  if (pb) {
    const blk = slipBlockers();
    pb.disabled = t.stake <= 0 || blk.changed || blk.suspended;
    pb.textContent = (blk.changed && !blk.suspended) ? '⚠️ Review odds changes' : 'Place bet';
  }
  updateSlipBar();
}
function renderRail() {
  const body = $('#railBody');
  $('#tabSlip').classList.toggle('active', state.railTab === 'slip');
  $('#tabMyBets').classList.toggle('active', state.railTab === 'mybets');
  const openN = state.bets.filter(b => b.status === 'open').length;
  const sc = $('#slipCount'), mc = $('#myBetsCount');
  sc.textContent = state.slip.size; sc.classList.toggle('zero', state.slip.size === 0);
  mc.textContent = openN; mc.classList.toggle('zero', openN === 0);
  $('#bnSlipCount').textContent = state.slip.size;
  $('#bnSlipCount').style.display = state.slip.size ? '' : 'none';
  updateSlipBar();
  body.innerHTML = state.railTab === 'slip' ? slipHTML() : myBetsHTML();
}
function updateSlipBar() {
  const bar = $('#slipBar');
  const t = slipTotals();
  bar.hidden = state.slip.size === 0;
  $('#slipBarCount').textContent = state.slip.size;
  $('#slipBarOdds').textContent = fmtOdds(t.comb || 1);
}
function sortedSlipSels() {
  const arr = Array.from(state.slip.values());
  const ord = state.slipSettings.order;
  if (ord === 'newest') return arr.reverse();
  if (ord === 'kickoff') {
    const keyOf = sel => {
      const m = matchById(sel.matchId);
      if (!m) return '9';
      if (m.status === 'live') return '0' + String(999 - (m.minute || 0)).padStart(3, '0');
      return '1' + (m.startTime || '99:99');
    };
    return arr.sort((a, b) => keyOf(a) < keyOf(b) ? -1 : keyOf(a) > keyOf(b) ? 1 : 0);
  }
  return arr;
}
function slipHTML() {
  const banner = state.slipBanner ? `<div class="slip-banner ${state.slipBanner.type}">${state.slipBanner.html}</div>` : '';
  if (!state.slip.size) {
    return banner + `<div class="slip-empty"><span class="sloth">🦥</span>
      Your slip is empty.<br>Tap any odds anywhere and your pick lands here —<br>nice and slow, no rush.</div>`;
  }
  const blk0 = slipBlockers();
  const suspN = [...state.slip.values()].filter(s => selSuspended(s)).length;
  const suspNotice = blk0.suspended ? `<div class="slip-notice">⚠️ ${suspN === 1 ? 'One of your bets is suspended' : suspN + ' of your bets are suspended'} — remove ${suspN === 1 ? 'it' : 'them'} to place the rest.</div>` : '';
  const rows = sortedSlipSels().map(sel => {
    const m = matchById(sel.matchId);
    const susp = selSuspended(sel);
    const cur = currentOdds(sel);
    const ret = (parseFloat(sel.stake) || 0) * sel.odds;
    let flag = '';
    if (!susp && sel.changed) flag = `<div class="row-flag warn">⚠️ Odds changed ${fmtOdds(sel.odds)} → ${fmtOdds(cur)}
      <button class="btn" data-action="accept-odds" data-key="${sel.key}">Accept new odds</button></div>`;
    return `<div class="slip-row${sel.changed && !susp ? ' changed' : ''}${susp ? ' is-suspended' : ''}" data-slip-row="${sel.key}">
      <div class="slip-row-top">
        <span class="slip-pick">${esc(sel.label)}</span>
        <span class="slip-odds" data-slip-odds="${sel.key}">${fmtOdds(sel.odds)}</span>
        <button class="slip-remove" data-action="remove-sel" data-key="${sel.key}" title="Remove selection">✕</button>
      </div>
      <div class="slip-sub">${esc(sel.marketName)} · ${esc(sel.matchLabel)}<br>
        <span class="live-info">${esc(m ? liveInfo(m) : '')}</span></div>
      ${flag}
      <div class="stake-line">
        <div class="stake-input-wrap"><span class="cur">USDT</span>
          <input class="stake-input" type="number" min="0" step="1" inputmode="decimal" placeholder="0.00"
            value="${sel.stake ? sel.stake : ''}" data-stake-for="${sel.key}" ${susp ? 'disabled' : ''}></div>
        <div class="stake-ret"><span class="lbl">Returns</span><span class="val" data-ret-for="${sel.key}">${ret ? fmt(ret) : '—'}</span></div>
      </div>
      <input type="range" class="stake-range" min="0" max="${Math.max(1, Math.floor(state.balance))}" step="1"
        value="${Math.min(parseFloat(sel.stake) || 0, state.balance)}" data-stake-range-for="${sel.key}" ${susp ? 'disabled' : ''} aria-label="Stake slider">
      <div class="quick-stakes">
        <button data-action="quick-stake" data-key="${sel.key}" data-amt="10">+10</button>
        <button data-action="quick-stake" data-key="${sel.key}" data-amt="25">+25</button>
        <button data-action="quick-stake" data-key="${sel.key}" data-amt="50">+50</button>
        <button data-action="quick-stake" data-key="${sel.key}" data-amt="max">Max</button>
      </div>
    </div>`;
  }).join('');
  const t = slipTotals();
  const blk = slipBlockers();
  const over = t.stake > state.balance;
  const disabled = t.stake <= 0 || blk.changed || blk.suspended;
  return banner + `
  <div class="slip-meta"><span class="singles">Singles <span>· ${t.count} selection${t.count === 1 ? '' : 's'}</span></span>
    <button class="clear-all" data-action="clear-slip">Clear all</button></div>
  ${suspNotice}
  ${rows}
  <div class="slip-footer">
    <div class="tot-row"><span>Total stake</span><b id="totStake">${fmt(t.stake)} USDT</b></div>
    <div class="tot-row"><span>Combined odds <span style="font-size:11px">(display only — singles pay individually)</span></span><b id="combOdds">${fmtOdds(t.comb || 1)}</b></div>
    <div class="tot-row ret"><span>Total potential return</span><b id="totReturn">${fmt(t.ret)} USDT</b></div>
    ${over ? `<div class="over-note">⚠️ Total stake exceeds your balance of ${fmt(state.balance)} USDT</div>` : ''}
    <button class="place-btn" id="placeBtn" data-action="place-bet" ${disabled ? 'disabled' : ''}>
      ${blk.changed && !blk.suspended ? '⚠️ Review odds changes' : 'Place bet'}</button>
    <div class="singles-note">Singles only in this book — no multiples, no funny business. 🦥</div>
    <div class="slip-settings-line">⚙️ Odds changes: <b>${{ manual: 'Always ask me', higher: 'Accept higher only', any: 'Accept any' }[state.slipSettings.oddsPolicy]}</b> · Order: <b>${{ added: 'First added first', newest: 'Newest first', kickoff: 'By kick-off' }[state.slipSettings.order]}</b>
      <button class="linklike" data-action="slip-settings">Change</button></div>
  </div>`;
}
function myBetsHTML() {
  const open = state.bets.filter(b => b.status === 'open');
  const settled = state.bets.filter(b => b.status === 'settled');
  const tabs = `<div class="mb-tabs">
    <button class="mb-tab${state.myBetsTab === 'open' ? ' active' : ''}" data-action="mb-tab" data-mtab="open">Open (${open.length})</button>
    <button class="mb-tab${state.myBetsTab === 'settled' ? ' active' : ''}" data-action="mb-tab" data-mtab="settled">Settled (${settled.length})</button></div>`;
  if (state.myBetsTab === 'open') {
    if (!open.length) return tabs + `<div class="slip-empty"><span class="sloth">🦥</span>No open bets.<br>Place one from the slip and it will chill here.</div>`;
    return tabs + open.map(b => {
      const cash = b.potential * b.cashFactor;
      const f = state.coFrac[b.id] || 100;
      const partAmt = Math.round(cash * f) / 100;
      const keepAmt = Math.round(b.potential * (100 - f)) / 100;
      const btnLabel = f >= 100 ? `💰 Cash out · ${fmt(cash)} USDT` : `💰 Cash out ${f}% · ${fmt(partAmt)} USDT`;
      const info = f >= 100
        ? `Full cash out — nothing stays riding.`
        : `Cashes <b>${fmt(partAmt)} USDT</b> now · <b>${fmt(keepAmt)} USDT</b> of potential stays riding.`;
      return `<div class="bet-card">
        <div class="bet-top"><span class="bet-pick">${esc(b.pick)}</span><span class="status-pill open">Open</span></div>
        <div class="bet-sub">${esc(b.marketName)} · ${esc(b.matchLabel)}</div>
        <div class="bet-nums"><span>Odds<b>${fmtOdds(b.odds)}</b></span><span>Stake<b>${fmt(b.stake)} USDT</b></span><span>Potential return<b>${fmt(b.potential)} USDT</b></span></div>
        ${b.partCashed ? `<div class="bet-sub">💰 Already cashed out: <b>${fmt(b.partCashed)} USDT</b></div>` : ''}
        <div class="co-zone">
          <div class="co-head"><span>Cash out amount</span><span class="co-pct" data-co-pct="${b.id}">${f >= 100 ? 'All' : f + '%'}</span></div>
          <input type="range" class="co-range" min="25" max="100" step="25" value="${f}" data-co-for="${b.id}" aria-label="Cash out percentage">
          <div class="co-scale"><span>25%</span><span>50%</span><span>75%</span><span>All</span></div>
          <div class="co-info" data-co-info="${b.id}">${info}</div>
        </div>
        <button class="cashout-btn" data-action="cash-out" data-id="${b.id}" title="Press and hold to confirm"><span class="co-label">${btnLabel}</span></button>
      </div>`;
    }).join('');
  }
  if (!settled.length) return tabs + `<div class="slip-empty"><span class="sloth">🦥</span>No settled bets yet.</div>`;
  return tabs + settled.map(b => {
    const cls = b.result === 'Won' ? 'won' : b.result === 'Lost' ? 'lost' : 'cashed';
    return `<div class="bet-card">
      <div class="bet-top"><span class="bet-pick">${esc(b.pick)}</span><span class="status-pill ${cls}">${esc(b.result)}</span></div>
      <div class="bet-sub">${esc(b.marketName)} · ${esc(b.matchLabel)}</div>
      <div class="bet-nums"><span>Odds<b>${fmtOdds(b.odds)}</b></span><span>Stake<b>${fmt(b.stake)} USDT</b></span><span>Returned<b>${fmt(b.returned)} USDT</b></span></div>
    </div>`;
  }).join('');
}

/* Targeted slip updates after sim changes (avoids clobbering stake inputs) */
function syncSlipAfterSim(force) {
  let needsRender = !!force;
  if (!needsRender) {
    state.slip.forEach(sel => {
      if (selSuspended(sel)) needsRender = true;
      if (sel.changed) needsRender = true;
    });
  }
  const active = document.activeElement;
  const typing = active && active.classList && active.classList.contains('stake-input');
  if (needsRender && !typing) { renderRail(); return; }
  if (needsRender && typing) { /* flag the place button area without a full re-render */
    const pb = $('#placeBtn');
    if (pb) { pb.disabled = true; pb.textContent = '⚠️ Slip needs review — tap the slip to check'; }
  }
}

/* ---------------- Actions ---------------- */
function toggleOdds(key) {
  const parts = key.split('|');
  const matchId = parts[0], marketId = parts[1], selId = parts[2];
  if (state.slip.has(key)) { state.slip.delete(key); }
  else {
    /* same market = replace selection */
    Array.from(state.slip.keys()).forEach(k => {
      const p = k.split('|');
      if (p[0] === matchId && p[1] === marketId) state.slip.delete(k);
    });
    const m = matchById(matchId), mk = findMarket(matchId, marketId), s = findSel(matchId, marketId, selId);
    if (!m || !mk || !s) return;
    state.slip.set(key, {
      key, matchId, marketId, selId,
      matchLabel: m.home + ' v ' + m.away,
      marketName: mk.name, label: s.label,
      odds: s.odds, stake: '', changed: false,
    });
    state.slipBanner = null;
    if (window.innerWidth <= 1023) openRail('slip', false); /* show feedback on mobile without forcing */
  }
  refreshOddsButtons();
  renderRail();
  updateSlipBar();
}
function refreshOddsButtons() {
  $$('[data-odds-key]').forEach(btn => {
    const key = btn.dataset.oddsKey;
    btn.classList.toggle('selected', state.slip.has(key));
    btn.setAttribute('aria-pressed', state.slip.has(key));
  });
}
function placeBet() {
  const t = slipTotals();
  const blk = slipBlockers();
  if (!state.slip.size || t.stake <= 0 || blk.changed || blk.suspended) return;
  if (t.stake > state.balance) {
    state.slipBanner = { type: 'error', html: `❌ <b>Bet failed — insufficient balance.</b><br>Your stakes total ${fmt(t.stake)} USDT but your balance is ${fmt(state.balance)} USDT. Lower a stake or remove a pick and try again.` };
    renderRail();
    return;
  }
  const placed = Array.from(state.slip.values());
  state.balance = Math.round((state.balance - t.stake) * 100) / 100;
  placed.forEach(sel => {
    state.bets.unshift({
      id: 'bet-' + (state.betSeq++), pick: sel.label, matchLabel: sel.matchLabel, marketName: sel.marketName,
      odds: sel.odds, stake: parseFloat(sel.stake) || 0, potential: (parseFloat(sel.stake) || 0) * sel.odds,
      status: 'open', result: null, returned: 0, cashFactor: 0.82,
    });
  });
  state.slip.clear();
  state.slipBanner = { type: 'success', html: `🎉 <b>Bet placed!</b> ${placed.length} single${placed.length === 1 ? '' : 's'} on for a total of ${fmt(t.stake)} USDT.<br><button class="btn primary" data-action="rail-tab" data-tab="mybets">View My Bets ›</button>` };
  updateBalance(true);
  refreshOddsButtons();
  renderRail();
  updateSlipBar();
  toast('Bet placed 🎉 Good luck, sloth-style.');
}
function cashOut(id) {
  const b = state.bets.find(x => x.id === id);
  if (!b || b.status !== 'open') return;
  const f = state.coFrac[id] || 100;
  const amount = Math.round(b.potential * b.cashFactor * f) / 100;
  if (f < 100) {
    const keep = (100 - f) / 100;
    const newPotential = Math.round(b.potential * keep * 100) / 100;
    if (newPotential >= 0.01) {
      b.partCashed = Math.round(((b.partCashed || 0) + amount) * 100) / 100;
      b.stake = Math.round(b.stake * keep * 100) / 100;
      b.potential = newPotential;
      state.balance = Math.round((state.balance + amount) * 100) / 100;
      updateBalance(true);
      renderRail();
      toast('Cashed out ' + f + '% · ' + fmt(amount) + ' USDT — the rest rides on 💰');
      return;
    }
  }
  b.status = 'settled'; b.result = 'Cashed out'; b.returned = Math.round(((b.partCashed || 0) + amount) * 100) / 100;
  state.balance = Math.round((state.balance + amount) * 100) / 100;
  updateBalance(true);
  renderRail();
  toast('Cashed out ' + fmt(amount) + ' USDT 💰');
}
function updateBalance(bump) {
  const el = $('#balanceValue');
  el.textContent = fmt(state.balance);
  if (bump) { const p = el.closest('.balance-pill'); p.classList.remove('bump'); void p.offsetWidth; p.classList.add('bump'); }
}
/* ---------------- Bet slip settings ---------------- */
function openSettings() {
  const s = state.slipSettings;
  const radio = (name, val, cur, title, desc) => `
    <label class="set-row">
      <input type="radio" name="${name}" value="${val}"${cur === val ? ' checked' : ''}>
      <span class="set-text"><b>${title}</b><small>${desc}</small></span>
    </label>`;
  $('#settingsModal').innerHTML = `
    <div class="modal-head"><span>⚙️ Bet Slip Settings</span>
      <button class="modal-x" data-action="settings-close-btn" aria-label="Close">✕</button></div>
    <div class="set-group">Slip order</div>
    ${radio('ss-order', 'added', s.order, 'First added first', 'Picks stay in the order you tapped them.')}
    ${radio('ss-order', 'newest', s.order, 'Newest first', 'Your latest pick sits on top of the slip.')}
    ${radio('ss-order', 'kickoff', s.order, 'By kick-off time', 'Live matches first, then by start time.')}
    <div class="set-group">Odds settings</div>
    ${radio('ss-odds', 'manual', s.oddsPolicy, 'Always ask me', 'A changed price waits for your tap before you can bet.')}
    ${radio('ss-odds', 'higher', s.oddsPolicy, 'Accept higher odds only', 'Better prices apply themselves; a drop still waits for you.')}
    ${radio('ss-odds', 'any', s.oddsPolicy, 'Accept any odds', 'Prices update automatically, up or down. Full sloth trust.')}
    <button class="btn primary apply-btn" data-action="settings-apply">Apply</button>`;
  $('#settingsBackdrop').hidden = false;
}
function closeSettings() { $('#settingsBackdrop').hidden = true; }
function applySettings() {
  const o = document.querySelector('input[name="ss-order"]:checked');
  const p = document.querySelector('input[name="ss-odds"]:checked');
  if (o) state.slipSettings.order = o.value;
  if (p) state.slipSettings.oddsPolicy = p.value;
  /* an auto-accept policy also settles change flags that are already pending */
  if (state.slipSettings.oddsPolicy !== 'manual') {
    state.slip.forEach(sel => {
      const cur = currentOdds(sel);
      if (sel.changed && (state.slipSettings.oddsPolicy === 'any' || cur > sel.odds)) { sel.odds = cur; sel.changed = false; }
    });
  }
  closeSettings();
  refreshOddsButtons();
  renderRail();
  toast('⚙️ Slip settings applied');
}

function openRail(tab, openIt) {
  if (tab) state.railTab = tab;
  renderRail();
  if (openIt !== false && window.innerWidth <= 1023) {
    $('#rail').classList.add('open');
    $('#sheetBackdrop').classList.add('show');
  }
}
function closeRail() {
  $('#rail').classList.remove('open');
  $('#sheetBackdrop').classList.remove('show');
}
function go(view, extra) {
  state.view = view;
  Object.assign(state, extra || {});
  closeRail();
  renderMain();
  $('#main').scrollTop = 0;
  window.scrollTo({ top: 0 });
}

document.addEventListener('click', e => {
  const el = e.target.closest('[data-action]');
  if (!el) return;
  const a = el.dataset.action;
  if (a === 'toggle-odds') { toggleOdds(el.dataset.key); return; }
  if (a === 'open-match') {
    state.currentMatchId = el.dataset.id; state.marketQuery = ''; state.matchGroup = 'All';
    go('match'); return;
  }
  if (a === 'nav') {
    const v = el.dataset.view;
    if (v === 'home') { state.query = ''; const gs = $('#globalSearch'); if (gs) gs.value = ''; }
    closeMenu(); go(v); return;
  }
  if (a === 'sport') {
    const s = el.dataset.sport;
    closeMenu();
    if (s === 'Football') go('football');
    else go('sport', { sport: s });
    return;
  }
  if (a === 'comp-card') { closeMenu(); go('football', { footballComp: el.dataset.comp }); return; }
  if (a === 'football-comp') { state.footballComp = el.dataset.comp; renderMain(); return; }
  if (a === 'live-sport') { state.liveSport = el.dataset.sport; state.liveComp = 'All'; renderMain(); return; }
  if (a === 'live-comp') { state.liveComp = el.dataset.comp; renderMain(); return; }
  if (a === 'home-mode') { state.homeMode = el.dataset.mode; renderMain(); return; }
  if (a === 'home-sport') { state.homeSport = el.dataset.sport; renderMain(); return; }
  if (a === 'toggle-group') {
    const k = el.dataset.group;
    if (state.expandedGroups.has(k)) state.expandedGroups.delete(k); else state.expandedGroups.add(k);
    renderMain(); return;
  }
  if (a === 'match-group') { state.matchGroup = el.dataset.group; renderMain(); return; }
  if (a === 'back') { go(state.currentMatchId && (matchById(state.currentMatchId) || {}).sport === 'Football' ? 'football' : 'home'); return; }
  if (a === 'follow') {
    const name = el.dataset.name;
    if (state.follows.has(name)) { state.follows.delete(name); toast('Removed ' + name + ' from favourites'); }
    else { state.follows.add(name); toast('⭐ Following ' + name); }
    renderMain(); return;
  }
  if (a === 'clear-search') { state.query = ''; const gs = $('#globalSearch'); if (gs) gs.value = ''; renderMain(); return; }
  if (a === 'clear-market-search') { state.marketQuery = ''; renderMain(); return; }
  if (a === 'rail-tab') { state.railTab = el.dataset.tab; renderRail(); openRail(null, true); return; }
  if (a === 'open-rail') { closeMenu(); openRail('slip', true); return; }
  if (a === 'open-mybets') { closeMenu(); openRail('mybets', true); return; }
  if (a === 'close-rail') { closeRail(); return; }
  if (a === 'open-menu') { openMenu(); return; }
  if (a === 'close-menu') { closeMenu(); return; }
  if (a === 'drawer-team') {
    state.query = el.dataset.name; const gs = $('#globalSearch'); if (gs) gs.value = state.query;
    closeMenu(); go('home'); return;
  }
  if (a === 'mb-tab') { state.myBetsTab = el.dataset.mtab; renderRail(); return; }
  if (a === 'remove-sel') {
    state.slip.delete(el.dataset.key); state.slipBanner = null;
    refreshOddsButtons(); renderRail(); updateSlipBar(); return;
  }
  if (a === 'clear-slip') {
    state.slip.clear(); state.slipBanner = null;
    refreshOddsButtons(); renderRail(); updateSlipBar(); return;
  }
  if (a === 'accept-odds') {
    const sel = state.slip.get(el.dataset.key);
    if (sel) { sel.odds = currentOdds(sel); sel.changed = false; }
    refreshOddsButtons(); renderRail(); return;
  }
  if (a === 'quick-stake') {
    const sel = state.slip.get(el.dataset.key);
    if (sel && !selSuspended(sel)) {
      const cur = parseFloat(sel.stake) || 0;
      sel.stake = el.dataset.amt === 'max' ? state.balance : Math.round((cur + parseFloat(el.dataset.amt)) * 100) / 100;
      renderRail();
    }
    return;
  }
  if (a === 'place-bet') { placeBet(); return; }
  if (a === 'cash-out') { return; } /* press-and-hold confirms — see pointer handlers below */
  if (a === 'slip-settings') { openSettings(); return; }
  if (a === 'settings-apply') { applySettings(); return; }
  if (a === 'settings-close-btn') { closeSettings(); return; }
  if (a === 'settings-close') { if (e.target.id === 'settingsBackdrop') closeSettings(); return; }
  if (a === 'avatar') { closeMenu(); toast('🦥 Signed in as a guest sloth · Balance ' + fmt(state.balance) + ' USDT'); return; }
});

/* ---------------- Cash out: press & hold to confirm ---------------- */
const HOLD_MS = 900;
function coLabel(el) { return el.querySelector('.co-label') || el; }
function startHold(el) {
  if (el.disabled || el._holdTimer) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) { cashOut(el.dataset.id); return; }
  el._origText = coLabel(el).textContent;
  el.classList.add('holding');
  coLabel(el).textContent = '💰 Keep holding…';
  el._holdTimer = setTimeout(() => {
    el._holdTimer = null;
    coLabel(el).textContent = '💰 Cashing out…';
    cashOut(el.dataset.id);
  }, HOLD_MS);
}
function cancelHold(el) {
  if (!el._holdTimer) return;
  clearTimeout(el._holdTimer);
  el._holdTimer = null;
  el.classList.remove('holding');
  if (el._origText) coLabel(el).textContent = el._origText;
}
document.addEventListener('pointerdown', e => {
  const el = e.target.closest('[data-action="cash-out"]');
  if (!el) return;
  if (e.pointerType === 'mouse' && e.button !== 0) return;
  startHold(el);
});
['pointerup', 'pointerleave', 'pointercancel'].forEach(evt =>
  document.addEventListener(evt, e => {
    const el = e.target.closest && e.target.closest('[data-action="cash-out"]');
    if (el) cancelHold(el);
  })
);
document.addEventListener('keydown', e => {
  if (e.repeat || (e.key !== 'Enter' && e.key !== ' ')) return;
  const el = e.target.closest && e.target.closest('[data-action="cash-out"]');
  if (el) { e.preventDefault(); startHold(el); }
});
document.addEventListener('keyup', e => {
  if (e.key !== 'Enter' && e.key !== ' ') return;
  const el = e.target.closest && e.target.closest('[data-action="cash-out"]');
  if (el) cancelHold(el);
});

document.addEventListener('input', e => {
  if (e.target.classList && e.target.classList.contains('co-range')) {
    const id = e.target.dataset.coFor;
    const b = state.bets.find(x => x.id === id);
    if (!b || b.status !== 'open') return;
    const f = parseInt(e.target.value, 10) || 100;
    state.coFrac[id] = f;
    const cash = b.potential * b.cashFactor;
    const partAmt = Math.round(cash * f) / 100;
    const keepAmt = Math.round(b.potential * (100 - f)) / 100;
    const card = e.target.closest('.bet-card');
    const pctEl = card ? card.querySelector(`[data-co-pct="${CSS.escape(id)}"]`) : null;
    if (pctEl) pctEl.textContent = f >= 100 ? 'All' : f + '%';
    const infoEl = card ? card.querySelector(`[data-co-info="${CSS.escape(id)}"]`) : null;
    if (infoEl) infoEl.innerHTML = f >= 100
      ? `Full cash out — nothing stays riding.`
      : `Cashes <b>${fmt(partAmt)} USDT</b> now · <b>${fmt(keepAmt)} USDT</b> of potential stays riding.`;
    const btn = card ? card.querySelector('[data-action="cash-out"]') : null;
    if (btn) {
      const lbl = f >= 100 ? `💰 Cash out · ${fmt(cash)} USDT` : `💰 Cash out ${f}% · ${fmt(partAmt)} USDT`;
      coLabel(btn).textContent = lbl;
      btn._origText = lbl;
    }
    return;
  }
  if (e.target.id === 'globalSearch') {
    state.query = e.target.value;
    if (state.view !== 'home') { state.view = 'home'; }
    renderMain();
    return;
  }
  if (e.target.classList && e.target.classList.contains('stake-range')) {
    const key = e.target.dataset.stakeRangeFor;
    const sel = state.slip.get(key);
    if (!sel) return;
    sel.stake = e.target.value;
    const num = document.querySelector(`[data-stake-for="${CSS.escape(key)}"]`);
    if (num) num.value = e.target.value;
    syncStakeUI(key);
    return;
  }
  if (e.target.classList && e.target.classList.contains('stake-input')) {
    const key = e.target.dataset.stakeFor;
    const sel = state.slip.get(key);
    if (!sel) return;
    sel.stake = e.target.value;
    const range = document.querySelector(`[data-stake-range-for="${CSS.escape(key)}"]`);
    if (range) range.value = Math.min(parseFloat(sel.stake) || 0, parseFloat(range.max) || 0);
    syncStakeUI(key);
  }
});

/* ---------------- Live simulation ---------------- */
function flipValue(valEl, newText, up) { /* 3D flip: old price rotates away, new price rotates in */
  const front = valEl.querySelector('.ob-front');
  const back = valEl.querySelector('.ob-back');
  if (!front || !back) { valEl.textContent = newText; return; }
  if (front.textContent === newText) return;
  if (reducedMotion()) { front.textContent = newText; return; }
  back.textContent = newText;
  back.classList.toggle('up', !!up);
  back.classList.toggle('down', !up);
  valEl.classList.remove('flipping');
  void valEl.offsetWidth;
  valEl.classList.add('flipping');
  clearTimeout(valEl._flipT);
  valEl._flipT = setTimeout(() => { front.textContent = newText; valEl.classList.remove('flipping'); }, 480);
}
function publishOddsChange(m, mk, s) { /* push one selection's new price to its buttons + slip flags */
  const key = selKey(m.id, mk.id, s.id);
  $$('[data-odds-key="' + CSS.escape(key) + '"]').forEach(btn => {
    const val = btn.querySelector('[data-odds-val]');
    if (reducedMotion()) { /* no flip for reduced motion — keep the colour flash instead */
      if (val) { const fr = val.querySelector('.ob-front'); if (fr) fr.textContent = fmtOdds(s.odds); else val.textContent = fmtOdds(s.odds); }
      btn.classList.remove('flash-up', 'flash-down');
      void btn.offsetWidth;
      btn.classList.add(s.wasUp ? 'flash-up' : 'flash-down');
    } else if (val) {
      flipValue(val, fmtOdds(s.odds), s.wasUp);
    }
  });
  const slipSel = state.slip.get(key);
  if (slipSel && slipSel.odds !== s.odds) {
    const pol = state.slipSettings.oddsPolicy;
    if (pol === 'any' || (pol === 'higher' && s.odds > slipSel.odds)) {
      slipSel.odds = s.odds; slipSel.changed = false; return 'auto';
    }
    slipSel.changed = true;
  }
  return null;
}
function repriceAfterGoal(m, homeScored) { /* a goal re-prices the result market from score + minute */
  const mk = findMarket(m.id, 'result');
  if (!mk) return;
  const s1 = mk.sels.find(s => s.id === '1'), sX = mk.sels.find(s => s.id === 'X'), s2 = mk.sels.find(s => s.id === '2');
  if (!s1 || !sX || !s2) return;
  let p1 = 1 / s1.odds, pX = 1 / sX.odds, p2 = 1 / s2.odds;
  const tot = p1 + pX + p2; p1 /= tot; pX /= tot; p2 /= tot;
  const diff = m.scoreH - m.scoreA;
  let shift = 0.10 + (m.minute / 90) * 0.32;      /* later goals move prices much more */
  if (Math.abs(diff) >= 2) shift *= 0.55;          /* already comfortable — a goal changes less */
  if (homeScored) { p1 += shift; pX -= shift * 0.7; p2 -= shift * 0.3; }
  else { p2 += shift; pX -= shift * 0.7; p1 -= shift * 0.3; }
  const cl = v => Math.max(0.004, Math.min(0.97, v));
  p1 = cl(p1); pX = cl(pX); p2 = cl(p2);
  const t2 = p1 + pX + p2; p1 /= t2; pX /= t2; p2 /= t2;
  const set = (s, p) => {
    const nv = Math.max(1.01, Math.min(300, Math.round((0.95 / p) * 100) / 100));
    s.wasUp = nv > s.odds; s.odds = nv;
    publishOddsChange(m, mk, s);
  };
  set(s1, p1); set(sX, pX); set(s2, p2);
}
function driftOddsOnce() {
  const all = [];
  MATCHES.forEach(m => getMarkets(m).forEach(mk => {
    if (mk.suspended) return;
    mk.sels.forEach(s => all.push({ m, mk, s }));
  }));
  if (!all.length) return;
  const picks = [];
  let slipAutoAccepted = false;
  for (let i = 0; i < 5; i++) picks.push(all[Math.floor(Math.random() * all.length)]);
  const changedKeys = new Set();
  picks.forEach(({ s }) => {
    const delta = (0.05 + Math.random() * 0.25) * (Math.random() < 0.5 ? -1 : 1);
    const nv = Math.max(1.02, Math.round((s.odds + delta) * 100) / 100);
    if (nv !== s.odds) { s.wasUp = nv > s.odds; s.odds = nv; }
  });
  /* update every visible button for the drifted selections + slip flags */
  picks.forEach(({ m, mk, s }) => {
    changedKeys.add(selKey(m.id, mk.id, s.id));
    if (publishOddsChange(m, mk, s) === 'auto') slipAutoAccepted = true;
  });
  if (slipAutoAccepted) syncSlipAfterSim(true);
  else if (Array.from(state.slip.values()).some(s => s.changed)) syncSlipAfterSim();
}
function maybeGoal() {
  if (Math.random() > 0.12) return;
  const liveFootball = MATCHES.filter(m => m.status === 'live' && m.sport === 'Football' && m.minute < 88);
  if (!liveFootball.length) return;
  const m = liveFootball[Math.floor(Math.random() * liveFootball.length)];
  const homeScored = Math.random() < 0.5;
  if (homeScored) m.scoreH++; else m.scoreA++;
  m.momentum = Math.max(15, Math.min(85, momentumOf(m) + (homeScored ? 14 : -14)));
  repriceAfterGoal(m, homeScored); /* the score moved — the price must move with it */
  renderMain(); /* refreshes scoreboards and rows with the new score */
  syncSlipAfterSim(true);
  toast('⚽ Goal! ' + m.home + ' ' + m.scoreH + ' – ' + m.scoreA + ' ' + m.away);
}
function maybeToggleSuspended() {
  if (Math.random() > 0.30) return;
  const all = [];
  MATCHES.forEach(m => getMarkets(m).forEach(mk => all.push({ m, mk })));
  let target = null;
  const slipMarkets = all.filter(({ m, mk }) => Array.from(state.slip.keys()).some(k => k.startsWith(m.id + '|' + mk.id + '|')));
  if (slipMarkets.length && Math.random() < 0.5) target = slipMarkets[Math.floor(Math.random() * slipMarkets.length)];
  else target = all[Math.floor(Math.random() * all.length)];
  if (!target) return;
  target.mk.suspended = !target.mk.suspended;
  /* sync row strips for result markets */
  if (target.mk.id === 'result') {
    const oddsEl = document.querySelector(`[data-row-odds="${target.m.id}"]`);
    const suspEl = document.querySelector(`[data-row-susp="${target.m.id}"]`);
    if (oddsEl) oddsEl.classList.toggle('hidden', target.mk.suspended);
    if (suspEl) suspEl.classList.toggle('hidden', !target.mk.suspended);
    $$(`[data-market-block="${target.m.id}|result"]`).forEach(b => {
      b.classList.toggle('is-suspended', target.mk.suspended);
    });
    refreshOddsButtons();
    if (state.view === 'match' && state.currentMatchId === target.m.id) renderMain();
  } else if (state.view === 'match' && state.currentMatchId === target.m.id) {
    renderMain();
  }
  const hitsSlip = Array.from(state.slip.keys()).some(k => k.startsWith(target.m.id + '|' + target.mk.id + '|'));
  syncSlipAfterSim(hitsSlip);
}
function tick() {
  MATCHES.forEach(m => {
    if (m.status !== 'live') return;
    if (m.sport === 'Football' && !m.ht) m.minute = Math.min(90, m.minute + 1);
    else if (m.sport === 'Football' && m.ht) { m.ht = false; m.minute = 46; }
    if (m.sport === 'Basketball') {
      m.clockSec -= 60;
      if (m.clockSec <= 0) {
        const q = parseInt(m.period.slice(1), 10);
        if (q < 4) { m.period = 'Q' + (q + 1); m.clockSec = 600; } else m.clockSec = 0;
      }
    }
  });
  $$('[data-clock-for]').forEach(el => {
    const m = matchById(el.dataset.clockFor);
    if (m) el.textContent = clockLabel(m);
  });
  MATCHES.forEach(m => { /* momentum drift: random walk pulled toward the score-based baseline */
    if (m.status !== 'live' || m.sport !== 'Football') return;
    const base = momentumBase(m);
    m.momentum = Math.max(15, Math.min(85, momentumOf(m) + (Math.random() - 0.5) * 3 + (base - momentumOf(m)) * 0.05));
    const v = Math.round(m.momentum);
    const fill = document.querySelector(`[data-mo-home="${m.id}"]`);
    if (fill) fill.style.width = v + '%';
    const lbl = document.querySelector(`[data-mo-label="${m.id}"]`);
    if (lbl) lbl.textContent = momentumLabel(m);
    const hp = document.querySelector(`[data-mo-hpct="${m.id}"]`);
    if (hp) hp.textContent = v + '%';
    const ap = document.querySelector(`[data-mo-apct="${m.id}"]`);
    if (ap) ap.textContent = (100 - v) + '%';
  });
  driftOddsOnce();
  maybeGoal();
  maybeToggleSuspended();
  state.bets.forEach(b => {
    if (b.status === 'open') b.cashFactor = Math.min(0.95, Math.max(0.60, b.cashFactor + (Math.random() - 0.5) * 0.04));
  });
  if (state.railTab === 'mybets' && state.bets.some(b => b.status === 'open')) {
    const ae = document.activeElement;
    const busy = (ae && ae.classList && (ae.classList.contains('co-range') || ae.classList.contains('stake-range'))) ||
      !!document.querySelector('.cashout-btn.holding');
    if (!busy) renderRail();
  }
  updateTicker();
  updateSlipBar();
}
setInterval(tick, 7000);

/* ---------------- Init ---------------- */
updateBalance(false);
renderTicker();
renderMain();
renderRail();
