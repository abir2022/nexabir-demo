/*
 * Nexabir showcase demo.
 *
 * Everything here is fictional and browser-only: no Supabase, no network calls,
 * no production data. The "sign in" is a local gate with the credentials shown
 * on the page, so a GitHub visitor can explore the dashboard immediately.
 */

const DEMO_EMAIL = 'demo@nexabir.app';
const DEMO_PASSWORD = 'nexabir';
const SESSION_KEY = 'nexabir.demo.session';
const THEME_KEY = 'nexabir.demo.theme';

const ICONS = {
  home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/>',
  briefcase:
    '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5h6v2"/><path d="M3 12h18"/>',
  heart:
    '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"/>',
  store:
    '<path d="M4 10v10h16V10"/><path d="M3 10l2-6h14l2 6"/><path d="M3 10a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0"/>',
  wallet:
    '<path d="M4 6.5A2.5 2.5 0 0 1 6.5 4H20v16H6.5A2.5 2.5 0 0 1 4 17.5Z"/><path d="M4 7h16"/><path d="M15 13h.01"/>',
  phone: '<rect x="7" y="2.5" width="10" height="19" rx="2"/><path d="M11 18.5h2"/>',
  laptop: '<rect x="4" y="4" width="16" height="12" rx="2"/><path d="M2 20h20"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  sun:
    '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon: '<path d="M20.5 14.4A8.5 8.5 0 0 1 9.6 3.5 8.5 8.5 0 1 0 20.5 14.4Z"/>',
  logout: '<path d="M10 17l5-5-5-5M15 12H3"/><path d="M14 3h5a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5"/>',
  bell:
    '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  spark: '<path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7Z"/><path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7Z"/>',
  wifi: '<path d="M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M12 19.5h.01"/>',
  shield: '<path d="M12 3 20 6v6c0 5-3.4 8-8 9-4.6-1-8-4-8-9V6Z"/><path d="m9 12 2 2 4-4"/>',
  download: '<path d="M12 3v12M7 10l5 5 5-5"/><path d="M5 21h14"/>',
  card: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18"/>',
  target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="m15 9 5-5"/>',
  book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5Z"/><path d="M4 18h16"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
};

const icon = (name) =>
  `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ''}</svg>`;

const esc = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char],
  );

const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});
const money = (value) => usd.format(value);

const dateLabel = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
}).format(new Date());

const state = {
  user: {
    name: 'Avery Rahman',
    role: 'Founder & operator',
    email: DEMO_EMAIL,
  },
  tasks: [
    { id: 't1', title: 'Finalise the Q4 roadmap', area: 'Work', due: 'Today', priority: 'high', done: false },
    { id: 't2', title: 'Send the Northstar proposal', area: 'Business', due: 'Tue', priority: 'high', done: false },
    { id: 't3', title: 'Book the dentist', area: 'Personal', due: 'Thu', priority: 'low', done: true },
    { id: 't4', title: 'Review October cash flow', area: 'Money', due: 'Fri', priority: 'medium', done: false },
    { id: 't5', title: 'Ship the beta invite email', area: 'Work', due: 'Next week', priority: 'medium', done: false },
  ],
  projects: [
    { name: 'Northstar rebrand', client: 'Northstar Studio', progress: 72, due: '18 Nov', status: 'In progress' },
    { name: 'Personal finance reset', client: 'Personal', progress: 48, due: '30 Nov', status: 'In progress' },
    { name: 'Beta launch', client: 'Nexabir', progress: 86, due: '12 Nov', status: 'Review' },
  ],
  habits: [
    { name: 'Move daily', value: 72, note: '4 of 5 sessions', color: 'var(--accent-2)' },
    { name: 'Deep work', value: 84, note: '3h 20m this week', color: 'var(--accent)' },
    { name: 'Read before bed', value: 56, note: '4 of 7 nights', color: 'var(--warm)' },
  ],
  transactions: [
    { id: 'tx1', title: 'Northstar Studio', category: 'Client payment', amount: 2400, date: 'Today', positive: true, icon: 'download' },
    { id: 'tx2', title: 'Studio rent', category: 'Workspace', amount: 680, date: 'Yesterday', positive: false, icon: 'store' },
    { id: 'tx3', title: 'Figma', category: 'Software', amount: 45, date: '3 Nov', positive: false, icon: 'card' },
    { id: 'tx4', title: 'Savings transfer', category: 'Goals', amount: 500, date: '1 Nov', positive: false, icon: 'target' },
    { id: 'tx5', title: 'Consulting call', category: 'Client payment', amount: 320, date: '29 Oct', positive: true, icon: 'download' },
  ],
  accounts: [
    { name: 'Everyday', value: 8240 },
    { name: 'Savings', value: 48200 },
    { name: 'Business', value: 68420 },
  ],
  bridgeEvents: [
    { app: 'Messages', title: 'Message from Maya', text: 'The deck looks great — send it over?', time: '2m' },
    { app: 'Calendar', title: 'Focus block starts soon', text: 'Deep work · 10:30–12:00', time: '18m' },
    { app: 'Calls', title: 'Missed call', text: 'Northstar Studio · +1 415 555 0142', time: '1h' },
  ],
};

const NAV = [
  { id: 'overview', label: 'Overview', icon: 'home' },
  { id: 'work', label: 'Work', icon: 'briefcase' },
  { id: 'personal', label: 'Personal', icon: 'heart' },
  { id: 'business', label: 'Business', icon: 'store' },
  { id: 'money', label: 'Money', icon: 'wallet' },
  { id: 'bridge', label: 'Bridge', icon: 'phone' },
];

const META = {
  overview: { title: 'Overview', sub: 'Your whole week at a glance.' },
  work: { title: 'Work', sub: 'Projects, tasks and the next useful move.' },
  personal: { title: 'Personal', sub: 'Habits and the life behind the work.' },
  business: { title: 'Business', sub: 'Clients, deals and the pipeline.' },
  money: { title: 'Money', sub: 'One honest view of the numbers.' },
  bridge: { title: 'Bridge', sub: 'The optional phone-to-PC bridge.' },
};

let authed = false;
let route = 'overview';
let theme = 'dark';
let offlineMode = false;

try {
  authed = sessionStorage.getItem(SESSION_KEY) === '1';
  theme = localStorage.getItem(THEME_KEY) === 'light' ? 'light' : 'dark';
} catch {
  // Private-mode browser storage can be unavailable; the demo still works.
}

const authEl = document.getElementById('auth');
const appEl = document.getElementById('app');
const viewEl = document.getElementById('view');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');

function showLoginError(message) {
  if (!loginError) return;
  loginError.textContent = message;
  loginError.classList.toggle('hidden', !message);
}

function applyTheme() {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Theme persistence is optional.
  }
  const button = document.getElementById('themeBtn');
  if (button) {
    button.innerHTML = icon(theme === 'dark' ? 'sun' : 'moon');
    button.title = theme === 'dark' ? 'Use light theme' : 'Use dark theme';
    button.setAttribute('aria-label', button.title);
  }
}

function navButton(item, mobile = false) {
  const active = route === item.id;
  return `<button
    class="nav__item${mobile ? ' nav__item--mobile' : ''}${active ? ' is-active' : ''}"
    type="button"
    data-route="${item.id}"
    title="${item.label}"
    aria-label="${item.label}"
    ${active ? 'aria-current="page"' : ''}
  >${icon(item.icon)}<span>${item.label}</span></button>`;
}

function renderNav() {
  const rail = document.getElementById('railNav');
  const mobile = document.getElementById('mobileNav');
  if (rail) rail.innerHTML = NAV.map((item) => navButton(item)).join('');
  if (mobile) mobile.innerHTML = NAV.map((item) => navButton(item, true)).join('');
}

function render() {
  authEl.classList.toggle('hidden', authed);
  appEl.classList.toggle('hidden', !authed);

  if (!authed) {
    document.getElementById('pageTitle').textContent = 'Overview';
    viewEl.innerHTML = '';
    return;
  }

  document.getElementById('pageTitle').textContent = META[route].title;
  renderNav();
  viewEl.innerHTML = pages[route]();
  applyTheme();
}

function navigate(next) {
  if (!META[next] || next === route) return;
  route = next;
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toast(message, tone = 'info') {
  const region = document.getElementById('toastRegion');
  if (!region) return;
  const node = document.createElement('div');
  node.className = `toast toast--${tone}`;
  node.textContent = message;
  region.append(node);
  window.setTimeout(() => node.remove(), 3600);
}

async function copyText(value, label) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      toast(`${label} copied`, 'success');
      return;
    }
    throw new Error('No clipboard API');
  } catch {
    try {
      const area = document.createElement('textarea');
      area.value = value;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.append(area);
      area.select();
      const copied = document.execCommand('copy');
      area.remove();
      toast(copied ? `${label} copied` : 'Clipboard is blocked in this browser', copied ? 'success' : 'error');
    } catch {
      toast('Clipboard is blocked in this browser', 'error');
    }
  }
}

function taskRow(task) {
  return `<button
    class="task-row${task.done ? ' is-done' : ''}"
    type="button"
    data-action="toggle-task"
    data-id="${esc(task.id)}"
    aria-pressed="${task.done}"
  >
    <span class="task-check">${task.done ? icon('check') : ''}</span>
    <span class="task-main">
      <span class="task-title">${esc(task.title)}</span>
      <span class="task-meta"><span class="dot dot--${task.priority}"></span>${esc(task.area)} · ${esc(task.due)}</span>
    </span>
    <span class="task-priority priority--${task.priority}">${task.priority}</span>
  </button>`;
}

function statCard(label, value, hint, iconName) {
  return `<div class="card stat">
    <div class="stat__top">
      <span class="stat__label">${label}</span>
      <span class="stat__icon">${icon(iconName)}</span>
    </div>
    <div class="stat__value">${value}</div>
    <div class="stat__hint">${hint}</div>
  </div>`;
}

function areaCard({ route: target, title, note, progress, color, iconName }) {
  return `<button class="area-card" type="button" data-route="${target}" style="--area:${color}">
    <div class="area-card__top">
      <span class="area-card__icon">${icon(iconName)}</span>
      ${icon('arrow')}
    </div>
    <h3>${title}</h3>
    <p>${note}</p>
    <div class="area-card__meter"><span style="--w:${progress}%"></span></div>
  </button>`;
}

function projectCard(project) {
  return `<div class="project">
    <div class="project__top"><strong>${esc(project.name)}</strong><span>${esc(project.due)}</span></div>
    <p>${esc(project.client)} · ${esc(project.status)}</p>
    <div class="progress"><span style="--w:${project.progress}%"></span></div>
    <div class="progress-meta"><span>${project.progress}% complete</span><span>${esc(project.due)}</span></div>
  </div>`;
}

function transactionRow(transaction) {
  return `<div class="tx">
    <span class="tx__icon">${icon(transaction.icon)}</span>
    <span class="tx__main">
      <strong>${esc(transaction.title)}</strong>
      <span>${esc(transaction.category)} · ${esc(transaction.date)}</span>
    </span>
    <span class="tx__amount ${transaction.positive ? 'positive' : ''}">${transaction.positive ? '+' : '−'}${money(transaction.amount)}</span>
  </div>`;
}

function barChart(values, labels) {
  const max = Math.max(...values, 1);
  return `<div class="bar-chart" aria-label="Monthly spending chart">
    ${values
      .map(
        (value, index) => `<div class="bar-chart__item${index === values.length - 1 ? ' is-current' : ''}">
          <span class="bar-chart__bar" style="--h:${Math.max(8, Math.round((value / max) * 100))}%"></span>
          <small>${labels[index]}</small>
        </div>`,
      )
      .join('')}
  </div>`;
}

function Overview() {
  const complete = state.tasks.filter((task) => task.done).length;
  const open = state.tasks.length - complete;
  const focus = state.tasks.filter((task) => !task.done).slice(0, 3);
  const percent = Math.round((complete / state.tasks.length) * 100);

  return `<div class="page-head">
    <div>
      <span class="eyebrow">${dateLabel}</span>
      <h1>Good morning, Avery.</h1>
      <p class="lede">A clear view of the things that deserve your attention today.</p>
    </div>
    <div class="page-actions">
      <button type="button" class="btn btn--primary" data-route="work">${icon('arrow')} Open today's plan</button>
    </div>
  </div>

  <div class="overview-grid">
    <section class="card focus-card">
      <div class="card__head">
        <div>
          <span class="eyebrow">Today's focus</span>
          <h2>Make the important things visible.</h2>
        </div>
        <span class="badge">${complete}/${state.tasks.length} done</span>
      </div>
      <div class="task-list">
        ${focus.length ? focus.map(taskRow).join('') : '<p class="muted tiny">All clear. Add something on the Work page.</p>'}
      </div>
      <div class="progress-meta"><span>${open} open task${open === 1 ? '' : 's'}</span><span>${percent}%</span></div>
      <div class="progress"><span style="--w:${percent}%"></span></div>
    </section>

    <section class="card pulse-card">
      <div class="card__head">
        <div>
          <span class="eyebrow">Weekly pulse</span>
          <h2>Quiet momentum.</h2>
        </div>
        <span class="badge badge--good">On track</span>
      </div>
      <div class="pulse-card__ring"><span>68</span></div>
      <p class="tiny muted">Focus, habits and open loops balanced this week.</p>
    </section>
  </div>

  <div class="stats">
    ${statCard('Net worth', '$124,860', '<strong>+4.2%</strong> this month', 'wallet')}
    ${statCard('Open tasks', String(open), `from ${state.tasks.length} today`, 'check')}
    ${statCard('Focus time', '3h 20m', '<strong>+38m</strong> vs last week', 'spark')}
    ${statCard('Bridge', offlineMode ? 'Queued' : 'Live', offlineMode ? 'offline option on' : 'phone + PC connected', 'phone')}
  </div>

  <div class="area-grid">
    ${areaCard({ route: 'work', title: 'Work', note: '4 active projects · 3 due this week', progress: 72, color: 'var(--accent)', iconName: 'briefcase' })}
    ${areaCard({ route: 'personal', title: 'Personal', note: '3 habits on track · 1 check-in', progress: 64, color: 'var(--accent-2)', iconName: 'heart' })}
    ${areaCard({ route: 'business', title: 'Business', note: '$18.4k pipeline · 4 live clients', progress: 58, color: 'var(--warm)', iconName: 'store' })}
    ${areaCard({ route: 'money', title: 'Money', note: 'Net worth $124,860 · 5 entries', progress: 82, color: 'var(--danger)', iconName: 'wallet' })}
  </div>

  <div class="split">
    <section class="card">
      <div class="card__head">
        <div><span class="eyebrow">Open loops</span><h3>Next up</h3></div>
        <button class="text-btn" type="button" data-route="work">View all</button>
      </div>
      <div class="task-list">${state.tasks.filter((task) => !task.done).slice(0, 4).map(taskRow).join('')}</div>
    </section>
    <section class="card">
      <div class="card__head">
        <div><span class="eyebrow">Money</span><h3>This month</h3></div>
        <span class="badge badge--good">+$1,320</span>
      </div>
      ${barChart([42, 55, 38, 70, 64, 82, 58], ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'])}
      <div class="progress-meta"><span>$3,480 spent</span><span>$4,800 budget</span></div>
      <div class="progress"><span style="--w:72%"></span></div>
    </section>
  </div>`;
}

function Work() {
  const open = state.tasks.filter((task) => !task.done).length;
  return `<div class="page-head">
    <div><span class="eyebrow">Work</span><h1>Keep the week moving.</h1><p class="lede">A small, honest list beats a crowded one.</p></div>
    <div class="page-actions"><span class="badge badge--accent">${open} open</span></div>
  </div>

  <div class="split">
    <section class="card">
      <div class="card__head">
        <div><span class="eyebrow">Today's list</span><h3>What matters now</h3></div>
        <span class="badge">${state.tasks.length} total</span>
      </div>
      <form id="task-form" class="inline-form" autocomplete="off">
        <input class="input" name="title" type="text" placeholder="Add a task for today…" aria-label="New task title" />
        <button class="btn btn--primary" type="submit">${icon('plus')} Add</button>
      </form>
      <div class="task-list">${state.tasks.map(taskRow).join('')}</div>
    </section>

    <div class="stack">
      <section class="card">
        <div class="card__head"><div><span class="eyebrow">Projects</span><h3>In flight</h3></div><span class="badge">3 active</span></div>
        <div class="stack">${state.projects.map(projectCard).join('')}</div>
      </section>
      <section class="card card--soft">
        <div class="card__head"><div><span class="eyebrow">A note to self</span><h3>Protect the deep work.</h3></div><span class="badge">Demo</span></div>
        <p class="muted tiny">The demo keeps the dashboard light. Your real workspace can hold the full picture.</p>
      </section>
    </div>
  </div>`;
}

function Personal() {
  return `<div class="page-head">
    <div><span class="eyebrow">Personal</span><h1>Life outside the inbox.</h1><p class="lede">The quiet systems that make the busy days possible.</p></div>
    <div class="page-actions"><span class="badge badge--good">3 on track</span></div>
  </div>

  <div class="habit-grid">
    ${state.habits
      .map(
        (habit) => `<div class="card habit">
          <div class="ring" style="--value:${habit.value}%;--ring-color:${habit.color}"><span>${habit.value}%</span></div>
          <div><h3>${esc(habit.name)}</h3><p>${esc(habit.note)}</p></div>
        </div>`,
      )
      .join('')}
  </div>

  <div class="split">
    <section class="card">
      <div class="card__head"><div><span class="eyebrow">This week</span><h3>A gentle rhythm</h3></div><span class="badge">Week 45</span></div>
      ${barChart([48, 65, 42, 78, 58, 84, 68], ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])}
      <div class="progress-meta"><span>Energy · 71%</span><span>5 day streak</span></div>
      <div class="progress"><span style="--w:71%"></span></div>
    </section>

    <section class="card">
      <div class="card__head"><div><span class="eyebrow">Journal</span><h3>Sunday, 6:42 pm</h3></div><span class="badge badge--accent">Private</span></div>
      <div class="journal">
        <p>“The best days were not the fullest ones. They were the days with one clear thing to finish and enough room to notice the rest.”</p>
        <div class="tag-row"><span class="tag">reflection</span><span class="tag">slow Sunday</span><span class="tag">clarity</span></div>
      </div>
    </section>
  </div>`;
}

function Business() {
  return `<div class="page-head">
    <div><span class="eyebrow">Business</span><h1>Build the pipeline.</h1><p class="lede">A tidy view of the people and work that move the business forward.</p></div>
    <div class="page-actions"><span class="badge badge--accent">$18.4k pipeline</span></div>
  </div>

  <div class="stats">
    ${statCard('Pipeline', '$18.4k', '<strong>2</strong> proposals out', 'spark')}
    ${statCard('Active clients', '4', '<strong>1</strong> new this month', 'briefcase')}
    ${statCard('Win rate', '62%', '<strong>+8%</strong> this quarter', 'target')}
    ${statCard('Next follow-up', 'Tue', 'Northstar Studio', 'clock')}
  </div>

  <div class="split">
    <section class="card">
      <div class="card__head"><div><span class="eyebrow">Pipeline</span><h3>Live opportunities</h3></div><span class="badge">3 open</span></div>
      <div class="list">
        <div class="list__row"><div class="list__main"><div class="list__title">Northstar rebrand</div><div class="list__meta">Northstar Studio · proposal sent</div></div><span class="badge badge--warm">Proposal</span><strong class="list__amount">$8,400</strong></div>
        <div class="list__row"><div class="list__main"><div class="list__title">Operations sprint</div><div class="list__meta">Fieldnote Labs · discovery</div></div><span class="badge">Discovery</span><strong class="list__amount">$6,200</strong></div>
        <div class="list__row"><div class="list__main"><div class="list__title">Launch retainer</div><div class="list__meta">Marrow &amp; Co · verbal yes</div></div><span class="badge badge--good">Won</span><strong class="list__amount">$3,800</strong></div>
      </div>
    </section>

    <section class="card">
      <div class="card__head"><div><span class="eyebrow">Clients</span><h3>People to call</h3></div><span class="badge">4 active</span></div>
      <div class="list">
        <div class="list__row"><span class="avatar">NS</span><div class="list__main"><div class="list__title">Northstar Studio</div><div class="list__meta">Maya Chen · follow up Tuesday</div></div><span class="badge badge--good">Live</span></div>
        <div class="list__row"><span class="avatar">FL</span><div class="list__main"><div class="list__title">Fieldnote Labs</div><div class="list__meta">Samir Patel · discovery call</div></div><span class="badge">Warm</span></div>
        <div class="list__row"><span class="avatar">MC</span><div class="list__main"><div class="list__title">Marrow &amp; Co</div><div class="list__meta">Jo Ellis · onboarding</div></div><span class="badge badge--good">Live</span></div>
      </div>
    </section>
  </div>`;
}

function Money() {
  return `<div class="page-head">
    <div><span class="eyebrow">Money</span><h1>Numbers without noise.</h1><p class="lede">A simple ledger view: what came in, what went out and what is still yours.</p></div>
    <div class="page-actions"><span class="badge badge--good">+4.2% this month</span></div>
  </div>

  <section class="card money-hero">
    <div>
      <span class="eyebrow">Net worth</span>
      <h2>$124,860</h2>
      <div class="money-hero__meta"><span class="positive">+$5,040</span><span>this month</span><span>·</span><span>3 accounts</span></div>
    </div>
    <div class="account-pills">
      ${state.accounts.map((account) => `<div class="account-pill"><span>${esc(account.name)}</span><strong>${money(account.value)}</strong></div>`).join('')}
    </div>
  </section>

  <div class="split">
    <section class="card">
      <div class="card__head"><div><span class="eyebrow">Spending</span><h3>Last seven months</h3></div><span class="badge">Under budget</span></div>
      ${barChart([42, 55, 38, 70, 64, 82, 58], ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'])}
      <div class="progress-meta"><span>$3,480 spent</span><span>$4,800 budget</span></div>
      <div class="progress"><span style="--w:72%"></span></div>
    </section>

    <section class="card">
      <div class="card__head"><div><span class="eyebrow">Ledger</span><h3>Recent activity</h3></div><span class="badge">5 entries</span></div>
      ${state.transactions.map(transactionRow).join('')}
    </section>
  </div>`;
}

function Bridge() {
  const status = offlineMode ? 'Offline queue' : 'Connected';
  return `<div class="page-head">
    <div><span class="eyebrow">Bridge</span><h1>The optional bridge.</h1><p class="lede">A phone-to-PC connection for notifications, calls and shared files.</p></div>
    <div class="page-actions"><span class="badge">${offlineMode ? 'Offline option on' : 'Demo bridge · simulated'}</span></div>
  </div>

  <div class="bridge-grid">
    <section class="card bridge-card">
      <div class="bridge-visual">
        <div class="device"><div class="device__box">${icon('laptop')}</div><span>This PC</span></div>
        <div class="bridge-line"></div>
        <div class="device"><div class="device__box">${icon('phone')}</div><span>Your phone</span></div>
      </div>
      <div>
        <span class="badge ${offlineMode ? 'badge--warn' : 'badge--good'}">${icon('wifi')} ${status}</span>
        <h2>One private bridge between your devices.</h2>
        <p>In the full app this stays on your own Wi-Fi. Here it is a simulated demo — no connection is made.</p>
        <div class="bridge-code"><span>482 106</span><button type="button" data-action="copy-code">Copy code</button></div>
        <div class="button-row">
          <button class="btn btn--primary" type="button" data-action="test-bridge">${icon('bell')} Send test notification</button>
          <button class="btn" type="button" data-action="clear-events">Clear events</button>
        </div>
      </div>
    </section>

    <section class="card">
      <div class="card__head"><div><span class="eyebrow">Choice</span><h3>Offline option</h3></div><span class="badge">Optional</span></div>
      <div class="switch-row">
        <div><strong>Use offline queue</strong><span>Keep working when the computer is away.</span></div>
        <button class="switch${offlineMode ? ' is-on' : ''}" type="button" data-action="toggle-offline" aria-pressed="${offlineMode}" aria-label="Toggle offline queue"></button>
      </div>
      <div class="switch-row">
        <div><strong>Bridge notifications</strong><span>Mirror alerts and calls on the phone.</span></div>
        <span class="badge badge--good">On</span>
      </div>
      <div class="switch-row">
        <div><strong>Shared files</strong><span>Send a file from either device.</span></div>
        <span class="badge badge--good">On</span>
      </div>
      <p class="tiny muted" style="margin-top: 12px">This is a showcase control: nothing leaves the page.</p>
    </section>
  </div>

  <div class="split">
    <section class="card">
      <div class="card__head"><div><span class="eyebrow">Devices</span><h3>On the bridge</h3></div><span class="badge">2 known</span></div>
      <div class="list">
        <div class="list__row"><span class="avatar">PC</span><div class="list__main"><div class="list__title">This desktop</div><div class="list__meta">Nexabir · local host</div></div><span class="badge badge--good">Online</span></div>
        <div class="list__row"><span class="avatar">AR</span><div class="list__main"><div class="list__title">Avery's phone</div><div class="list__meta">Android · on your Wi-Fi</div></div><span class="badge ${offlineMode ? 'badge--warn' : 'badge--good'}">${offlineMode ? 'Queued' : 'Connected'}</span></div>
      </div>
    </section>

    <section class="card">
      <div class="card__head"><div><span class="eyebrow">Activity</span><h3>Recent events</h3></div><span class="badge">${state.bridgeEvents.length}</span></div>
      <div class="list">
        ${
          state.bridgeEvents.length
            ? state.bridgeEvents
                .map(
                  (event) => `<div class="event">
                    <span class="event__icon">${icon(event.app === 'Calls' ? 'phone' : event.app === 'Calendar' ? 'clock' : 'bell')}</span>
                    <span class="event__body"><strong>${esc(event.title)}</strong><span>${esc(event.text)}</span></span>
                    <time>${esc(event.time)}</time>
                  </div>`,
                )
                .join('')
            : '<p class="muted tiny">No recent events. Send a test notification to see one here.</p>'
        }
      </div>
    </section>
  </div>`;
}

const pages = { overview: Overview, work: Work, personal: Personal, business: Business, money: Money, bridge: Bridge };

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.getElementById('demoEmail').value.trim().toLowerCase();
  const password = document.getElementById('demoPassword').value;

  if (email !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
    showLoginError('Use the demo credentials shown above.');
    return;
  }

  authed = true;
  route = 'overview';
  try {
    sessionStorage.setItem(SESSION_KEY, '1');
  } catch {
    // The demo can run without persistence.
  }
  showLoginError('');
  render();
  toast('Welcome to the demo workspace', 'success');
});

document.addEventListener('submit', (event) => {
  if (event.target.id !== 'task-form') return;
  event.preventDefault();
  const input = event.target.querySelector('input[name="title"]');
  const title = input?.value.trim();
  if (!title) return;
  state.tasks.unshift({
    id: `task-${Date.now()}`,
    title,
    area: 'Work',
    due: 'Today',
    priority: 'medium',
    done: false,
  });
  render();
  toast('Task added to the demo list', 'success');
});

document.addEventListener('click', async (event) => {
  const routeButton = event.target.closest('[data-route]');
  if (routeButton) {
    event.preventDefault();
    navigate(routeButton.dataset.route);
    return;
  }

  const actionButton = event.target.closest('[data-action]');
  if (!actionButton) return;
  const action = actionButton.dataset.action;

  if (action === 'fill-demo') {
    document.getElementById('demoEmail').value = DEMO_EMAIL;
    document.getElementById('demoPassword').value = DEMO_PASSWORD;
    showLoginError('');
    document.getElementById('demoEmail').focus();
    return;
  }

  if (action === 'theme') {
    theme = theme === 'dark' ? 'light' : 'dark';
    applyTheme();
    toast(theme === 'dark' ? 'Dark theme' : 'Light theme');
    return;
  }

  if (action === 'signout') {
    authed = false;
    route = 'overview';
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      // Nothing to clear.
    }
    render();
    toast('Signed out of the demo');
    return;
  }

  if (action === 'toggle-task') {
    const task = state.tasks.find((item) => item.id === actionButton.dataset.id);
    if (!task) return;
    task.done = !task.done;
    render();
    toast(task.done ? 'Marked complete' : 'Back on the list', task.done ? 'success' : 'info');
    return;
  }

  if (action === 'copy-code') {
    await copyText('482106', 'Bridge code');
    return;
  }

  if (action === 'test-bridge') {
    state.bridgeEvents.unshift({
      app: 'Messages',
      title: offlineMode ? 'Test event queued' : 'Demo notification delivered',
      text: offlineMode
        ? 'The bridge will replay this when the desktop is reachable.'
        : 'This is a simulated event. No network request was made.',
      time: 'now',
    });
    render();
    toast(offlineMode ? 'Test event queued for offline mode' : 'Test notification added', 'success');
    return;
  }

  if (action === 'clear-events') {
    state.bridgeEvents = [];
    render();
    toast('Bridge events cleared');
    return;
  }

  if (action === 'toggle-offline') {
    offlineMode = !offlineMode;
    render();
    toast(offlineMode ? 'Offline mode on — events will queue' : 'Offline mode off — bridge connected', 'success');
  }
});

applyTheme();
render();
