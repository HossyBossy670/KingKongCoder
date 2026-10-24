'use strict';

/* =========================================================
   BlueCode — local-first HTML / CSS / JS studio
   ========================================================= */

const STORAGE_KEY = 'bluecode.projects.v1';
const PREFS_KEY = 'bluecode.prefs.v1';
const MAX_UPLOAD_BYTES = 2.5 * 1024 * 1024;

const svgIcon = (body) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;

const ICONS = {
  plus: svgIcon('<path d="M12 5v14M5 12h14"/>'),
  upload: svgIcon('<path d="M12 16V4"/><path d="m7 9 5-5 5 5"/><path d="M5 16v3a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3"/>'),
  filePlus: svgIcon('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 12v6M9 15h6"/>'),
  folderPlus: svgIcon('<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M12 11v6M9 14h6"/>'),
  folder: svgIcon('<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>'),
  folderOpen: svgIcon('<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v1H3z"/><path d="M3 10h18l-2 9a2 2 0 0 1-2 1H5a2 2 0 0 1-2-2z"/>'),
  trash: svgIcon('<path d="M4 7h16"/><path d="M9 7V4h6v3"/><path d="m6 7 1 13h10l1-13"/><path d="M10 11v5M14 11v5"/>'),
  pencil: svgIcon('<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>'),
  chevronDown: svgIcon('<path d="m6 9 6 6 6-6"/>'),
  x: svgIcon('<path d="M18 6 6 18M6 6l12 12"/>'),
  play: svgIcon('<path d="m8 5 11 7-11 7z"/>'),
  refresh: svgIcon('<path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 4v7h-7"/>'),
  external: svgIcon('<path d="M15 3h6v6"/><path d="m10 14 11-11"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>'),
  terminal: svgIcon('<path d="m5 7 5 5-5 5"/><path d="M13 17h6"/>'),
  monitor: svgIcon('<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>'),
  tablet: svgIcon('<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M11 18h2"/>'),
  smartphone: svgIcon('<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>'),
  search: svgIcon('<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>'),
  more: svgIcon('<circle cx="12" cy="5" r="1.3" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none"/><circle cx="12" cy="19" r="1.3" fill="currentColor" stroke="none"/>'),
  arrowLeft: svgIcon('<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>'),
  check: svgIcon('<path d="m5 12 4 4L19 6"/>'),
  alert: svgIcon('<path d="M12 9v4M12 17h.01"/><path d="M10.3 3.7 2.4 17a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.7a2 2 0 0 0-3.4 0z"/>'),
  sparkles: svgIcon('<path d="m12 3 1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z"/><path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/><path d="m5 3 .7 1.8L7.5 5.5 5.7 6.2 5 8l-.7-1.8L2.5 5.5l1.8-.7z"/>'),
  database: svgIcon('<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>'),
  code: svgIcon('<path d="m8 9-4 3 4 3M16 9l4 3-4 3"/><path d="m13 5-2 14"/>'),
  eye: svgIcon('<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="2.5"/>'),
  download: svgIcon('<path d="M12 4v12"/><path d="m7 11 5 5 5-5"/><path d="M5 20h14"/>'),
  copy: svgIcon('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>'),
  image: svgIcon('<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/>'),
  file: svgIcon('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>'),
  wifi: svgIcon('<path d="M5 12.5a10 10 0 0 1 14 0"/><path d="M8.5 16a5.5 5.5 0 0 1 7 0"/><circle cx="12" cy="19" r=".8" fill="currentColor" stroke="none"/>')
};

const ico = (name) => `<span class="ic">${ICONS[name] || ''}</span>`;

const TEXT_EXTENSIONS = new Set([
  'html', 'htm', 'css', 'js', 'mjs', 'cjs', 'jsx', 'ts', 'tsx', 'json', 'txt',
  'md', 'markdown', 'svg', 'xml', 'csv', 'yml', 'yaml', 'toml', 'ini', 'env',
  'gitignore', 'map', 'webmanifest', 'manifest'
]);
const HTML_EXTENSIONS = new Set(['html', 'htm']);
const JS_EXTENSIONS = new Set(['js', 'mjs', 'cjs', 'jsx', 'ts', 'tsx']);
const IMAGE_EXTENSIONS = new Set(['png', 'jpg', 'jpeg', 'gif', 'webp', 'avif', 'ico', 'bmp']);
const KNOWN_EXTENSIONS = new Set([
  ...TEXT_EXTENSIONS, ...HTML_EXTENSIONS, ...JS_EXTENSIONS, ...IMAGE_EXTENSIONS,
  'woff', 'woff2', 'ttf', 'otf', 'eot', 'mp3', 'wav', 'ogg', 'mp4', 'webm', 'pdf'
]);

const state = {
  projects: [],
  currentId: null,
  search: '',
  saveTimer: null,
  previewTimer: null,
  previewWidth: 42,
  device: 'desktop',
  consoleOpen: false,
  consoleMessages: [],
  activeFile: null,
  highlightFrame: 0,
  storageWarningShown: false,
  modalReturnFocus: null,
  dragDepth: 0,
  previewLoadTimer: null
};

let storageAvailable = false;

/* ---------- generic helpers ---------- */

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[character]));
}

const escapeAttr = escapeHTML;

function normalizePath(value) {
  return String(value || '')
    .replace(/\\/g, '/')
    .split('/')
    .reduce((parts, part) => {
      if (!part || part === '.') return parts;
      if (part === '..') {
        parts.pop();
        return parts;
      }
      parts.push(part);
      return parts;
    }, [])
    .join('/');
}

function dirname(path) {
  const clean = normalizePath(path);
  const index = clean.lastIndexOf('/');
  return index === -1 ? '' : clean.slice(0, index);
}

function basename(path) {
  const clean = normalizePath(path);
  return clean.slice(clean.lastIndexOf('/') + 1);
}

function extensionOf(path) {
  const name = basename(path).toLowerCase();
  const dot = name.lastIndexOf('.');
  if (dot <= 0) return name.startsWith('.') ? name.slice(1) : '';
  return name.slice(dot + 1);
}

function kindFor(path) {
  const extension = extensionOf(path);
  if (HTML_EXTENSIONS.has(extension)) return 'html';
  if (extension === 'css') return 'css';
  if (JS_EXTENSIONS.has(extension)) return 'js';
  if (extension === 'json' || extension === 'webmanifest' || extension === 'manifest') return 'json';
  if (extension === 'md' || extension === 'markdown') return 'md';
  if (extension === 'svg' || IMAGE_EXTENSIONS.has(extension)) return 'image';
  return 'other';
}

function languageFor(path) {
  const extension = extensionOf(path);
  if (HTML_EXTENSIONS.has(extension) || extension === 'svg' || extension === 'xml') return 'html';
  if (extension === 'css') return 'css';
  if (JS_EXTENSIONS.has(extension) || extension === 'json' || extension === 'webmanifest' || extension === 'manifest') return 'js';
  return 'text';
}

function isTextPath(path) {
  return TEXT_EXTENSIONS.has(extensionOf(path));
}

function isHtmlPath(path) {
  return HTML_EXTENSIONS.has(extensionOf(path));
}

function isTextFile(file) {
  const extension = extensionOf(file.name);
  if (TEXT_EXTENSIONS.has(extension)) return true;
  if (file.type && (file.type.startsWith('text/') || file.type === 'application/json' || file.type.includes('javascript') || file.type.includes('xml'))) return true;
  return false;
}

function fileGlyph(path) {
  const kind = kindFor(path);
  const labels = { html: '&lt;&gt;', css: '#', js: 'JS', json: '{ }', md: 'M', image: 'IMG', other: '·' };
  return `<span class="file-glyph kind-${kind}" aria-hidden="true">${labels[kind] || '·'}</span>`;
}

function formatBytes(bytes) {
  const amount = Number(bytes) || 0;
  if (amount < 1024) return `${amount} B`;
  if (amount < 1024 * 1024) return `${(amount / 1024).toFixed(amount < 10240 ? 1 : 0)} KB`;
  return `${(amount / (1024 * 1024)).toFixed(1)} MB`;
}

function relativeTime(timestamp) {
  const then = Number(timestamp) || Date.now();
  const difference = Math.max(0, Date.now() - then);
  if (difference < 45000) return 'just now';
  if (difference < 3600000) return `${Math.floor(difference / 60000)}m ago`;
  if (difference < 86400000) return `${Math.floor(difference / 3600000)}h ago`;
  if (difference < 604800000) return `${Math.floor(difference / 86400000)}d ago`;
  return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' }).format(then);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function createId() {
  if (window.crypto && typeof window.crypto.randomUUID === 'function') {
    return window.crypto.randomUUID();
  }
  return `p-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

function hashString(value) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = ((hash << 5) - hash) + value.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash);
}

function pluralize(count, singular, plural = `${singular}s`) {
  return `${count} ${count === 1 ? singular : plural}`;
}

/* ---------- storage ---------- */

try {
  const probe = '__bluecode_storage_test__';
  window.localStorage.setItem(probe, '1');
  window.localStorage.removeItem(probe);
  storageAvailable = true;
} catch (error) {
  storageAvailable = false;
}

function normalizeProject(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const now = Date.now();
  const id = typeof raw.id === 'string' && raw.id ? raw.id : createId();
  const name = String(raw.name || 'Untitled project').slice(0, 80) || 'Untitled project';
  const seen = new Set();
  const files = [];

  if (Array.isArray(raw.files)) {
    raw.files.forEach((file) => {
      if (!file || typeof file !== 'object') return;
      const path = normalizePath(file.path);
      if (!path) return;
      const key = path.toLowerCase();
      if (seen.has(key)) return;
      seen.add(key);
      files.push({
        path,
        content: typeof file.content === 'string' ? file.content : '',
        binary: Boolean(file.binary),
        updatedAt: Number(file.updatedAt) || now
      });
    });
  }

  const folders = [];
  const folderSeen = new Set();
  if (Array.isArray(raw.folders)) {
    raw.folders.forEach((folder) => {
      const path = normalizePath(folder);
      if (!path) return;
      const key = path.toLowerCase();
      if (folderSeen.has(key)) return;
      folderSeen.add(key);
      folders.push(path);
    });
  }

  const openPaths = (Array.isArray(raw.openPaths) ? raw.openPaths : [])
    .map(normalizePath)
    .filter((path, index, list) => path && files.some((file) => file.path === path) && list.indexOf(path) === index);

  let activePath = normalizePath(raw.activePath);
  if (!files.some((file) => file.path === activePath)) {
    activePath = openPaths[0] || files[0]?.path || null;
  }
  if (activePath && !openPaths.includes(activePath)) openPaths.unshift(activePath);

  let entry = normalizePath(raw.entry);
  if (!files.some((file) => file.path === entry && isHtmlPath(file.path))) {
    entry = chooseEntryForFiles(files);
  }

  return {
    id,
    name,
    files,
    folders,
    openPaths,
    activePath,
    entry,
    collapsedFolders: Array.isArray(raw.collapsedFolders)
      ? raw.collapsedFolders.map(normalizePath).filter(Boolean)
      : [],
    createdAt: Number(raw.createdAt) || now,
    updatedAt: Number(raw.updatedAt) || now
  };
}

function chooseEntryForFiles(files) {
  const htmlFiles = files.filter((file) => isHtmlPath(file.path));
  if (!htmlFiles.length) return null;
  const index = htmlFiles.find((file) => /^index\.html?$/i.test(file.path));
  return (index || htmlFiles[0]).path;
}

function loadProjects() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map(normalizeProject).filter(Boolean);
  } catch (error) {
    return [];
  }
}

function loadPrefs() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(PREFS_KEY) || '{}');
    return {
      previewWidth: clamp(Number(parsed.previewWidth) || 42, 28, 62)
    };
  } catch (error) {
    return { previewWidth: 42 };
  }
}

function savePrefs() {
  if (!storageAvailable) return;
  try {
    window.localStorage.setItem(PREFS_KEY, JSON.stringify({ previewWidth: state.previewWidth }));
  } catch (error) {
    /* Preferences are non-critical. */
  }
}

function getProject(id = state.currentId) {
  return state.projects.find((project) => project.id === id) || null;
}

function getFile(project, path) {
  if (!project || !path) return null;
  return project.files.find((file) => file.path === path) || null;
}

function projectSize(project) {
  try {
    return new Blob([JSON.stringify(project)]).size;
  } catch (error) {
    return JSON.stringify(project).length;
  }
}

function allStorageSize() {
  try {
    return new Blob([JSON.stringify(state.projects)]).size;
  } catch (error) {
    return JSON.stringify(state.projects).length;
  }
}

function persistNow() {
  if (state.saveTimer) {
    window.clearTimeout(state.saveTimer);
    state.saveTimer = null;
  }

  if (!storageAvailable) {
    setSaveState('Not saved — storage blocked', 'error');
    if (!state.storageWarningShown) {
      state.storageWarningShown = true;
      showToast('Browser storage is unavailable. Run BlueCode from a local web server so your projects can be saved.', 'error', 9000);
    }
    return false;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.projects));
    setSaveState('Saved locally', 'saved');
    updateStorageUI();
    state.storageWarningShown = false;
    return true;
  } catch (error) {
    setSaveState('Storage full', 'error');
    if (!state.storageWarningShown) {
      state.storageWarningShown = true;
      const quota = error && (error.name === 'QuotaExceededError' || error.name === 'NS_ERROR_DOM_QUOTA_REACHED');
      showToast(
        quota
          ? 'Browser storage is full. Delete a project or some uploaded files, then try again.'
          : 'Could not save to browser storage.',
        'error',
        8000
      );
    }
    return false;
  }
}

function schedulePersist() {
  setSaveState('Saving…', 'saving');
  if (state.saveTimer) window.clearTimeout(state.saveTimer);
  state.saveTimer = window.setTimeout(persistNow, 520);
}

function setSaveState(label, mode) {
  const element = document.getElementById('save-state');
  if (!element) return;
  element.className = `save-state ${mode === 'saved' ? '' : mode}`.trim();
  element.innerHTML = `${ico(mode === 'saving' ? 'refresh' : mode === 'error' ? 'alert' : 'check')}<span>${escapeHTML(label)}</span>`;
}

function updateStorageUI() {
  const size = document.getElementById('storage-size');
  if (size) size.textContent = formatBytes(allStorageSize());
  const note = document.getElementById('storage-note');
  if (note) note.title = `${formatBytes(allStorageSize())} stored in this browser`;
}

function touchProject(project) {
  if (!project) return;
  project.updatedAt = Date.now();
}

/* ---------- dom shortcuts ---------- */

const dom = {
  view: document.getElementById('view'),
  center: document.getElementById('topbar-center'),
  actions: document.getElementById('topbar-actions'),
  modalRoot: document.getElementById('modal-root'),
  menuRoot: document.getElementById('menu-root'),
  toastRoot: document.getElementById('toast-root'),
  scrim: document.getElementById('mobile-scrim'),
  fileInput: document.getElementById('file-input'),
  folderInput: document.getElementById('folder-input')
};

/* ---------- routing + dashboard ---------- */

function routeFromHash() {
  const match = /^#\/project\/([^/]+)\/?$/.exec(window.location.hash);
  if (match) {
    const id = decodeURIComponent(match[1]);
    if (getProject(id)) {
      openProjectView(id);
      return;
    }
    try {
      window.history.replaceState(null, '', '#/');
    } catch (error) {
      /* ignore */
    }
  }
  renderDashboard();
}

function navigateToProject(id) {
  const target = getProject(id);
  if (!target) return;
  if (window.location.hash === `#/project/${encodeURIComponent(id)}`) {
    openProjectView(id);
  } else {
    window.location.hash = `#/project/${encodeURIComponent(id)}`;
  }
}

function goHome() {
  flushPendingSave();
  if (window.location.hash === '#/' || window.location.hash === '') {
    renderDashboard();
  } else {
    window.location.hash = '#/';
  }
}

function flushPendingSave() {
  if (state.saveTimer) persistNow();
}

function dashboardHeroMarkup() {
  return `
    <section class="dashboard-hero">
      <div class="hero-copy">
        <p class="eyebrow">Local-first web studio</p>
        <h1>Make something worth <span>clicking.</span></h1>
        <p class="hero-sub">Write HTML, CSS and JavaScript in one calm workspace. Preview instantly, upload any assets, and know every project is saved right here in your browser.</p>
        <div class="hero-actions">
          <button class="btn btn-primary btn-lg" type="button" data-action="new-project">${ico('plus')} New project</button>
          <span class="storage-hint">${ico('database')} Private to this browser</span>
        </div>
      </div>
      <div class="hero-visual" aria-hidden="true">
        <div class="hero-window">
          <div class="hero-window-bar"><i></i><i></i><i></i><span>index.html</span></div>
          <pre class="hero-code"><span class="c-com">&lt;!-- your next idea --&gt;</span>
<span class="c-tag">&lt;main</span> <span class="c-attr">class</span>=<span class="c-str">"hello"</span><span class="c-tag">&gt;</span>
  <span class="c-tag">&lt;h1&gt;</span>Build for the <span class="c-kw">web</span>.<span class="c-tag">&lt;/h1&gt;</span>
  <span class="c-tag">&lt;button&gt;</span>Ship it<span class="c-tag">&lt;/button&gt;</span>
<span class="c-tag">&lt;/main&gt;</span>
<span class="c-kw">const</span> idea = <span class="c-str">'yours'</span>;</pre>
        </div>
        <div class="hero-floating"><span class="live-dot"></span> Preview updates live</div>
      </div>
    </section>`;
}

function dashboardMarkup() {
  const warning = !storageAvailable ? `
    <div class="storage-warning" role="alert">
      ${ico('alert')}
      <div><strong>Browser storage is blocked.</strong> Projects will not survive a refresh. Open the folder with a local server, for example <code>python3 -m http.server 8000</code>, then visit <code>localhost:8000</code>.</div>
    </div>` : '';

  return `
    <div class="dashboard">
      ${warning}
      ${dashboardHeroMarkup()}
      <section class="dashboard-section">
        <div class="section-head">
          <div class="section-title-row">
            <h2>Your projects</h2>
            <span class="count-pill" id="project-count">0</span>
          </div>
          <div class="section-tools">
            <label class="search-field">
              ${ico('search')}
              <input id="project-search" type="search" placeholder="Search projects…" autocomplete="off" aria-label="Search projects">
            </label>
            <span class="storage-note" id="storage-note">${ico('database')}<span id="storage-size">0 KB</span>&nbsp;stored locally</span>
          </div>
        </div>
        <div class="projects-grid" id="projects-grid"></div>
      </section>
    </div>`;
}

function emptyDashboardMarkup(forSearch = false) {
  if (forSearch) {
    return `
      <div style="grid-column:1/-1">
        <div class="empty-state">
          <div class="empty-art">
            <div class="empty-art-window">
              <div class="empty-art-bar"><i></i><i></i><i></i></div>
              <div class="empty-art-code"><i></i><i></i><i></i><i></i></div>
            </div>
          </div>
          <h2>No matches found</h2>
          <p>No project matches “${escapeHTML(state.search)}”. Try another search, or start something new.</p>
          <button class="btn btn-secondary" type="button" data-action="clear-search">Clear search</button>
        </div>
      </div>`;
  }

  return `
    <div style="grid-column:1/-1">
      <div class="empty-state">
        <div class="empty-art">
          <div class="empty-art-window">
            <div class="empty-art-bar"><i></i><i></i><i></i></div>
            <div class="empty-art-code"><i></i><i></i><i></i><i></i></div>
          </div>
          <div class="empty-art-float">${ico('code')}</div>
        </div>
        <h2>Your workspace is a blank canvas</h2>
        <p>Create your first project and start building with HTML, CSS and JavaScript. Everything is stored locally — no account needed.</p>
        <button class="btn btn-primary" type="button" data-action="new-project">${ico('plus')} Create a project</button>
      </div>
    </div>`;
}

function thumbBadges(project) {
  const kinds = [];
  project.files.forEach((file) => {
    const kind = kindFor(file.path);
    if (['html', 'css', 'js'].includes(kind) && !kinds.includes(kind)) kinds.push(kind);
  });
  return kinds.slice(0, 3).map((kind) => `<span class="thumb-file ${kind}">${kind === 'html' ? '<>' : kind === 'css' ? '#' : 'JS'}</span>`).join('');
}

function projectCardMarkup(project) {
  const tone = hashString(project.id) % 5;
  const fileCount = project.files.length;
  const name = escapeHTML(project.name);
  return `
    <article class="project-card" data-action="open-project" data-id="${escapeAttr(project.id)}" tabindex="0" role="button" aria-label="Open ${name}">
      <div class="project-open">
        <div class="project-thumb tone-${tone}">
          <div class="thumb-files">${thumbBadges(project)}</div>
          <div class="thumb-browser">
            <div class="thumb-browser-bar"><i></i><i></i><i></i><span></span></div>
            <div class="thumb-page">
              <span class="thumb-kicker"></span>
              <span class="thumb-heading"></span>
              <span class="thumb-heading short"></span>
              <span class="thumb-copy"></span>
              <span class="thumb-copy short"></span>
              <span class="thumb-button"></span>
            </div>
          </div>
        </div>
      </div>
      <div class="project-card-body">
        <div class="project-card-text">
          <h3>${name}</h3>
          <p><b>${pluralize(fileCount, 'file')}</b> · Updated ${relativeTime(project.updatedAt)}</p>
        </div>
        <button class="icon-btn project-menu-btn" type="button" data-action="project-menu" data-id="${escapeAttr(project.id)}" aria-label="Options for ${name}">${ico('more')}</button>
      </div>
    </article>`;
}

function renderProjectResults() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;
  const query = state.search.trim().toLowerCase();
  const projects = [...state.projects]
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .filter((project) => {
      if (!query) return true;
      if (project.name.toLowerCase().includes(query)) return true;
      return project.files.some((file) => file.path.toLowerCase().includes(query));
    });

  const count = document.getElementById('project-count');
  if (count) count.textContent = String(projects.length);

  if (!state.projects.length) {
    grid.innerHTML = emptyDashboardMarkup(false);
    return;
  }

  if (!projects.length) {
    grid.innerHTML = emptyDashboardMarkup(true);
    return;
  }

  grid.innerHTML = projects.map(projectCardMarkup).join('') + (query ? '' : `
    <button class="new-project-card" type="button" data-action="new-project">
      <span class="plus-circle">${ico('plus')}</span>
      <strong>New project</strong>
      <span>Start with a clean canvas</span>
    </button>`);

  updateStorageUI();
}

function renderDashboard() {
  flushPendingSave();
  state.currentId = null;
  state.activeFile = null;
  state.search = '';
  closeModal();
  closeMenu();
  closeMobilePanels();
  document.body.classList.remove('editing');
  document.title = 'BlueCode — HTML / CSS / JS studio';

  dom.center.innerHTML = '';
  dom.actions.innerHTML = `
    <button class="btn btn-primary" type="button" data-action="new-project">${ico('plus')}<span class="btn-label">New project</span></button>`;
  dom.view.innerHTML = dashboardMarkup();
  renderProjectResults();
  updateStorageUI();
}

/* ---------- toasts ---------- */

function showToast(message, type = 'info', duration = 3800) {
  if (!dom.toastRoot) return;
  while (dom.toastRoot.children.length >= 4) {
    dom.toastRoot.firstElementChild.remove();
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const iconName = type === 'success' ? 'check' : type === 'error' || type === 'warning' ? 'alert' : 'sparkles';
  toast.innerHTML = `<span class="toast-icon">${ico(iconName)}</span><div class="toast-message"></div>`;
  toast.querySelector('.toast-message').textContent = message;
  dom.toastRoot.appendChild(toast);

  const dismiss = () => {
    if (!toast.isConnected) return;
    toast.classList.add('leaving');
    window.setTimeout(() => toast.remove(), 180);
  };
  window.setTimeout(dismiss, duration);
  toast.addEventListener('click', dismiss);
}

/* ---------- menus + modal base ---------- */

let closeMenuHandler = null;

function closeMenu() {
  if (dom.menuRoot) dom.menuRoot.innerHTML = '';
  if (closeMenuHandler) {
    document.removeEventListener('pointerdown', closeMenuHandler, true);
    closeMenuHandler = null;
  }
}

function positionMenu(menu, anchor, align = 'end') {
  const rect = anchor.getBoundingClientRect();
  const width = menu.offsetWidth;
  const height = menu.offsetHeight;
  let left = align === 'end' ? rect.right - width : rect.left;
  let top = rect.bottom + 6;
  left = clamp(left, 10, window.innerWidth - width - 10);
  if (top + height > window.innerHeight - 10) top = rect.top - height - 6;
  menu.style.left = `${Math.round(left)}px`;
  menu.style.top = `${Math.round(Math.max(10, top))}px`;
}

function openMenu(anchor, markup) {
  closeMenu();
  dom.menuRoot.innerHTML = markup;
  const menu = dom.menuRoot.querySelector('.context-menu');
  if (!menu) return;
  positionMenu(menu, anchor);
  menu.querySelectorAll('button').forEach((button) => button.addEventListener('click', closeMenu));
  closeMenuHandler = (event) => {
    if (event.target.closest('#menu-root') || event.target.closest('[data-action="project-menu"]')) return;
    closeMenu();
  };
  window.setTimeout(() => document.addEventListener('pointerdown', closeMenuHandler, true), 0);
}

function showProjectMenu(anchor, id) {
  const project = getProject(id);
  if (!project) return;
  openMenu(anchor, `
    <div class="context-menu" role="menu">
      <button class="menu-item" type="button" data-menu-action="rename-project" data-id="${escapeAttr(id)}">${ico('pencil')} Rename project</button>
      <button class="menu-item" type="button" data-menu-action="duplicate-project" data-id="${escapeAttr(id)}">${ico('copy')} Duplicate</button>
      <div class="menu-sep"></div>
      <button class="menu-item danger" type="button" data-menu-action="delete-project" data-id="${escapeAttr(id)}">${ico('trash')} Delete project</button>
    </div>`);
}

function closeModal() {
  if (!dom.modalRoot || !dom.modalRoot.firstElementChild) return;
  dom.modalRoot.innerHTML = '';
  if (state.modalReturnFocus && typeof state.modalReturnFocus.focus === 'function') {
    try { state.modalReturnFocus.focus({ preventScroll: true }); } catch (error) { /* ignore */ }
  }
  state.modalReturnFocus = null;
}

function showModalError(message) {
  const error = dom.modalRoot.querySelector('[data-modal-error]');
  if (!error) return;
  error.textContent = message;
  error.classList.add('show');
}

function showModal(options) {
  const {
    title,
    subtitle = '',
    iconName = 'sparkles',
    iconDanger = false,
    wide = false,
    body = '',
    confirmText = 'Save',
    cancelText = 'Cancel',
    danger = false,
    hideCancel = false,
    onSubmit,
    onOpen
  } = options;

  closeMenu();
  if (!dom.modalRoot) return;
  if (!dom.modalRoot.firstElementChild) state.modalReturnFocus = document.activeElement;

  dom.modalRoot.innerHTML = `
    <div class="modal-overlay">
      <form class="modal-card ${wide ? 'wide' : ''}" novalidate>
        <div class="modal-head">
          <span class="modal-icon ${iconDanger ? 'danger' : ''}">${ico(iconName)}</span>
          <div class="modal-title-wrap">
            <h2>${escapeHTML(title)}</h2>
            ${subtitle ? `<p>${escapeHTML(subtitle)}</p>` : ''}
          </div>
          <button class="icon-btn modal-close" type="button" data-modal-close aria-label="Close dialog">${ico('x')}</button>
        </div>
        <div class="modal-body">
          ${body}
          <p class="form-error" data-modal-error></p>
        </div>
        <div class="modal-foot">
          ${hideCancel ? '' : `<button class="btn btn-secondary" type="button" data-modal-close>${escapeHTML(cancelText)}</button>`}
          <button class="btn ${danger ? 'btn-danger' : 'btn-primary'}" type="submit">${escapeHTML(confirmText)}</button>
        </div>
      </form>
    </div>`;

  const overlay = dom.modalRoot.querySelector('.modal-overlay');
  const form = dom.modalRoot.querySelector('form');

  dom.modalRoot.querySelectorAll('[data-modal-close]').forEach((button) => {
    button.addEventListener('click', closeModal);
  });

  overlay.addEventListener('mousedown', (event) => {
    if (event.target === overlay) closeModal();
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!onSubmit) {
      closeModal();
      return;
    }
    const result = onSubmit(form);
    if (result !== false) closeModal();
  });

  form.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab') return;
    const focusable = [...form.querySelectorAll('button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), a[href]')]
      .filter((element) => element.offsetParent !== null);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  onOpen?.(form);

  window.setTimeout(() => {
    const target = form.querySelector('[data-autofocus]') || form.querySelector('input, select, textarea, button');
    if (target) {
      target.focus();
      if (target.select && ['text', 'search', 'url'].includes(target.type)) target.select();
    }
  }, 30);
}

/* ---------- create project modal ---------- */

function openCreateProjectModal() {
  let selectedTemplate = 'starter';

  const templateCards = Object.entries(TEMPLATES).map(([key, template]) => `
    <button class="template-option ${key === selectedTemplate ? 'selected' : ''}" type="button" data-template="${key}" aria-pressed="${key === selectedTemplate}">
      <span class="template-ic">${escapeHTML(template.icon)}</span>
      <strong>${escapeHTML(template.name)}</strong>
      <span>${escapeHTML(template.description)}</span>
    </button>`).join('');

  showModal({
    title: 'Create a project',
    subtitle: 'Give it a name and pick a starting point. You can rename or delete it anytime.',
    iconName: 'sparkles',
    wide: true,
    confirmText: 'Create project',
    body: `
      <div class="form-field">
        <label for="project-name">Project name</label>
        <input class="text-input" id="project-name" type="text" maxlength="80" placeholder="e.g. My portfolio" data-autofocus autocomplete="off">
        <span class="hint">Stored only in this browser.</span>
      </div>
      <div class="form-field">
        <span class="field-label">Starting template</span>
        <div class="template-grid" id="template-grid">${templateCards}</div>
      </div>`,
    onOpen(form) {
      form.querySelectorAll('[data-template]').forEach((button) => {
        button.addEventListener('click', () => {
          selectedTemplate = button.dataset.template;
          form.querySelectorAll('[data-template]').forEach((option) => {
            const selected = option.dataset.template === selectedTemplate;
            option.classList.toggle('selected', selected);
            option.setAttribute('aria-pressed', String(selected));
          });
        });
      });
    },
    onSubmit(form) {
      const name = String(form.querySelector('#project-name').value || '').trim() || 'Untitled project';
      const project = createProject(name, selectedTemplate);
      showToast(`“${project.name}” created.`, 'success');
      navigateToProject(project.id);
    }
  });
}

function createProject(name, templateKey) {
  const template = TEMPLATES[templateKey] || TEMPLATES.starter;
  const now = Date.now();
  const files = Object.entries(template.files).map(([path, content]) => ({
    path,
    content: content.replace(/\{\{TITLE\}\}/g, escapeHTML(name)),
    binary: false,
    updatedAt: now
  }));
  const project = {
    id: createId(),
    name: String(name || 'Untitled project').slice(0, 80) || 'Untitled project',
    files,
    folders: [],
    openPaths: files.length ? [files[0].path] : [],
    activePath: files.length ? files[0].path : null,
    entry: chooseEntryForFiles(files),
    collapsedFolders: [],
    createdAt: now,
    updatedAt: now
  };
  state.projects.unshift(project);
  persistNow();
  return project;
}

/* ---------- project actions ---------- */

function openRenameProjectModal(id) {
  const project = getProject(id);
  if (!project) return;
  showModal({
    title: 'Rename project',
    subtitle: 'Choose a name that makes it easy to find.',
    iconName: 'pencil',
    confirmText: 'Save name',
    body: `
      <div class="form-field">
        <label for="rename-project-input">Project name</label>
        <input class="text-input" id="rename-project-input" type="text" maxlength="80" value="${escapeAttr(project.name)}" data-autofocus>
      </div>`,
    onSubmit(form) {
      const name = String(form.querySelector('#rename-project-input').value || '').trim();
      if (!name) {
        showModalError('Give your project a name.');
        return false;
      }
      project.name = name.slice(0, 80);
      touchProject(project);
      const titleInput = document.getElementById('project-name-input');
      if (titleInput) titleInput.value = project.name;
      if (state.currentId === project.id) document.title = `${project.name} — BlueCode`;
      persistNow();
      renderProjectResults();
      showToast('Project renamed.', 'success');
    }
  });
}

function duplicateProject(id) {
  const source = getProject(id);
  if (!source) return;
  const now = Date.now();
  let name = `${source.name} copy`;
  let counter = 2;
  while (state.projects.some((project) => project.name.toLowerCase() === name.toLowerCase())) {
    name = `${source.name} copy ${counter}`;
    counter += 1;
  }
  const copy = {
    id: createId(),
    name,
    files: source.files.map((file) => ({ ...file, updatedAt: now })),
    folders: [...source.folders],
    openPaths: [...source.openPaths],
    activePath: source.activePath,
    entry: source.entry,
    collapsedFolders: [...source.collapsedFolders],
    createdAt: now,
    updatedAt: now
  };
  state.projects.unshift(copy);
  persistNow();
  renderProjectResults();
  showToast(`Duplicated as “${copy.name}”.`, 'success');
}

function openDeleteProjectModal(id) {
  const project = getProject(id);
  if (!project) return;
  showModal({
    title: 'Delete project?',
    subtitle: 'This action cannot be undone.',
    iconName: 'trash',
    iconDanger: true,
    confirmText: 'Delete project',
    danger: true,
    body: `<p class="confirm-copy"><strong>${escapeHTML(project.name)}</strong> and ${pluralize(project.files.length, 'file')} will be permanently removed from this browser.</p>`,
    onSubmit() {
      state.projects = state.projects.filter((item) => item.id !== id);
      persistNow();
      showToast(`“${project.name}” deleted.`, 'success');
      if (state.currentId === id) {
        state.currentId = null;
        if (window.location.hash.startsWith('#/project/')) {
          window.location.hash = '#/';
        } else {
          renderDashboard();
        }
      } else {
        renderProjectResults();
      }
    }
  });
}

/* =========================================================
   Editor
   ========================================================= */

function openProjectView(id) {
  const project = getProject(id);
  if (!project) {
    renderDashboard();
    return;
  }

  flushPendingSave();
  state.currentId = id;
  state.search = '';
  state.consoleMessages = [];
  state.consoleOpen = false;
  state.activeFile = null;
  closeModal();
  closeMenu();
  closeMobilePanels();
  document.body.classList.add('editing');
  document.title = `${project.name} — BlueCode`;

  const openCandidate = project.openPaths.find((path) => getFile(project, path));
  const initialPath = getFile(project, project.activePath)
    ? project.activePath
    : openCandidate || project.files[0]?.path || null;
  project.activePath = initialPath;
  if (initialPath && !project.openPaths.includes(initialPath)) project.openPaths.push(initialPath);

  renderEditorTopbar();
  dom.view.innerHTML = editorTemplate();
  applyPreviewWidth();

  bindEditorEvents();
  renderFileTree();
  renderTabs();
  renderEntrySelect();
  renderConsole();
  loadActiveFile(initialPath, { focus: false });
  runPreview();
}

function renderEditorTopbar() {
  const project = getProject();
  if (!project) return;

  dom.center.innerHTML = `
    <div class="project-heading">
      <button class="icon-btn back-btn" type="button" data-action="back" aria-label="Back to projects" title="Back to projects">${ico('arrowLeft')}</button>
      <div class="project-title-box">
        <input class="project-name-input" id="project-name-input" type="text" value="${escapeAttr(project.name)}" maxlength="80" aria-label="Project name" autocomplete="off">
        <span class="save-state" id="save-state">${ico('check')}<span>Saved locally</span></span>
      </div>
    </div>`;

  dom.actions.innerHTML = `
    <button class="btn btn-ghost mobile-only" type="button" data-action="toggle-files">${ico('folder')}<span class="btn-label">Files</span></button>
    <button class="btn btn-ghost mobile-only" type="button" data-action="toggle-preview">${ico('eye')}<span class="btn-label">Preview</span></button>
    <button class="btn btn-primary" type="button" data-action="run" title="Run preview (Ctrl/Cmd + Enter)">${ico('play')}<span class="btn-label">Run</span></button>
    <button class="icon-btn" type="button" data-action="project-menu" aria-label="Project options" title="Project options">${ico('more')}</button>`;
}

function editorTemplate() {
  return `
    <div class="ide" id="ide">
      <aside class="file-panel" id="file-panel" aria-label="Project files">
        <div class="panel-head">
          <span class="panel-label">Explorer</span>
          <div class="panel-actions">
            <button class="icon-btn" type="button" data-action="new-file" title="New file" aria-label="New file">${ico('filePlus')}</button>
            <button class="icon-btn" type="button" data-action="new-folder" title="New folder" aria-label="New folder">${ico('folderPlus')}</button>
            <button class="icon-btn" type="button" data-action="upload-files" title="Upload files" aria-label="Upload files">${ico('upload')}</button>
          </div>
        </div>
        <div class="file-tree" id="file-tree" role="tree" aria-label="Project files"></div>
        <div class="panel-foot">
          <button class="upload-button" type="button" data-action="upload-files">${ico('upload')} Upload files <span>multi</span></button>
          <button class="upload-button" type="button" data-action="upload-folder">${ico('folderPlus')} Upload folder <span>tree</span></button>
        </div>
      </aside>

      <section class="code-panel">
        <div class="tab-strip" id="tab-strip" role="tablist" aria-label="Open files"></div>
        <div class="editor-bar" id="editor-bar">
          <span class="path" id="editor-path">No file selected</span>
          <span class="lang-chip" id="editor-lang">—</span>
        </div>
        <div class="editor-body" id="editor-body">
          <div class="line-numbers" id="line-numbers" aria-hidden="true"></div>
          <div class="editor-surface" id="editor-surface">
            <pre class="code-highlight" id="code-highlight" aria-hidden="true"></pre>
            <textarea class="code-editor" id="code-editor" wrap="off" spellcheck="false" autocomplete="off" autocapitalize="off" autocorrect="off" aria-label="Code editor" placeholder="Start coding…"></textarea>
          </div>
          <div id="editor-overlay"></div>
        </div>
        <div class="status-bar" id="status-bar">
          <span class="status-item" id="status-position">Ln 1, Col 1</span>
          <span class="status-item hide-mobile">Spaces: 2</span>
          <span class="status-spacer"></span>
          <span class="status-item hide-mobile">UTF-8</span>
          <span class="status-item" id="status-mode">—</span>
        </div>
      </section>

      <div class="splitter" id="splitter" role="separator" aria-orientation="vertical" aria-label="Resize preview"></div>

      <section class="preview-panel" id="preview-panel" aria-label="Live preview">
        <div class="preview-head">
          <span class="preview-title"><span class="live-dot"></span>Live preview</span>
          <div class="entry-select-wrap">
            <select class="entry-select" id="entry-select" aria-label="Preview entry file" title="Preview entry file"></select>
          </div>
          <div class="preview-controls">
            <div class="device-toggle" role="group" aria-label="Preview size">
              <button type="button" data-action="set-device" data-device="desktop" class="active" title="Desktop preview" aria-label="Desktop preview">${ico('monitor')}</button>
              <button type="button" data-action="set-device" data-device="tablet" title="Tablet preview" aria-label="Tablet preview">${ico('tablet')}</button>
              <button type="button" data-action="set-device" data-device="mobile" title="Mobile preview" aria-label="Mobile preview">${ico('smartphone')}</button>
            </div>
            <button class="icon-btn" type="button" data-action="refresh-preview" title="Refresh preview" aria-label="Refresh preview">${ico('refresh')}</button>
            <button class="icon-btn" type="button" data-action="open-preview" title="Open preview in a new tab" aria-label="Open preview in a new tab">${ico('external')}</button>
            <button class="icon-btn console-toggle" type="button" data-action="toggle-console" title="Toggle console" aria-label="Toggle console">${ico('terminal')}<span class="console-count" id="console-count"></span></button>
          </div>
        </div>
        <div class="preview-canvas" id="preview-canvas" data-device="desktop">
          <div class="device-frame" id="device-frame">
            <iframe class="preview-frame" id="preview-frame" title="Project preview" sandbox="allow-scripts allow-forms allow-modals allow-popups allow-downloads"></iframe>
            <div class="preview-loading-bar"></div>
            <div class="preview-empty-state" id="preview-empty" hidden>
              <div class="code-empty-art">${ico('code')}</div>
              <h3 id="preview-empty-title">Nothing to preview yet</h3>
              <p id="preview-empty-copy">Add an HTML file to see your project come to life.</p>
            </div>
          </div>
        </div>
        <div class="console-panel hidden" id="console-panel">
          <div class="console-head">
            <strong>Console</strong>
            <span class="console-status" id="console-status">no messages</span>
            <div class="console-head-actions">
              <button type="button" data-action="clear-console">Clear</button>
              <button type="button" data-action="toggle-console" aria-label="Close console">${ico('x')}</button>
            </div>
          </div>
          <div class="console-list" id="console-list"></div>
        </div>
      </section>
    </div>`;
}

function applyPreviewWidth() {
  const panel = document.getElementById('preview-panel');
  if (panel) panel.style.setProperty('--preview-width', `${state.previewWidth}%`);
}

function bindEditorEvents() {
  const textarea = document.getElementById('code-editor');
  const filePanel = document.getElementById('file-panel');
  const splitter = document.getElementById('splitter');
  const tabStrip = document.getElementById('tab-strip');
  const entrySelect = document.getElementById('entry-select');
  const frame = document.getElementById('preview-frame');

  if (textarea) {
    textarea.addEventListener('input', handleEditorInput);
    textarea.addEventListener('keydown', handleEditorKeydown);
    textarea.addEventListener('scroll', syncEditorScroll);
    textarea.addEventListener('click', updateCaretStatus);
    textarea.addEventListener('keyup', updateCaretStatus);
    textarea.addEventListener('select', updateCaretStatus);
  }

  if (tabStrip) {
    tabStrip.addEventListener('auxclick', (event) => {
      if (event.button !== 1) return;
      const tab = event.target.closest('[data-tab-path]');
      if (tab) {
        event.preventDefault();
        closeTab(tab.dataset.tabPath);
      }
    });
  }

  if (entrySelect) {
    entrySelect.addEventListener('change', () => {
      const project = getProject();
      if (!project) return;
      const entry = entrySelect.value;
      if (!getFile(project, entry)) return;
      project.entry = entry;
      openFile(entry);
      renderEntrySelect();
      schedulePersist();
      runPreview();
    });
  }

  if (frame) {
    frame.addEventListener('load', () => {
      const canvas = document.getElementById('preview-canvas');
      const frameElement = document.getElementById('device-frame');
      canvas?.classList.remove('preview-loading');
      frameElement?.classList.remove('preview-loading');
      if (state.previewLoadTimer) {
        window.clearTimeout(state.previewLoadTimer);
        state.previewLoadTimer = null;
      }
    });
  }

  if (filePanel) {
    filePanel.addEventListener('dragenter', handleDragEnter);
    filePanel.addEventListener('dragover', handleDragOver);
    filePanel.addEventListener('dragleave', handleDragLeave);
    filePanel.addEventListener('drop', handlePanelDrop);
  }

  if (splitter) {
    splitter.addEventListener('pointerdown', startSplitDrag);
  }
}

function handleEditorInput() {
  const project = getProject();
  const file = getFile(project, project?.activePath);
  const textarea = document.getElementById('code-editor');
  if (!project || !file || file.binary || !textarea) return;

  file.content = textarea.value;
  file.updatedAt = Date.now();
  touchProject(project);
  updateGutter();
  updateCaretStatus();
  scheduleHighlight();
  schedulePersist();
  schedulePreview();
}

function handleEditorKeydown(event) {
  const textarea = event.currentTarget;
  if (!textarea || textarea.readOnly) return;

  if (event.key === 'Tab') {
    event.preventDefault();
    indentSelection(textarea, event.shiftKey);
    textarea.dispatchEvent(new Event('input', { bubbles: true }));
    return;
  }

  if (event.key === 'Enter' && !event.ctrlKey && !event.metaKey && !event.altKey) {
    event.preventDefault();
    autoIndentNewline(textarea);
    textarea.dispatchEvent(new Event('input', { bubbles: true }));
  }
}

function indentSelection(textarea, outdent) {
  const value = textarea.value;
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const firstLineStart = value.lastIndexOf('\n', start - 1) + 1;
  let lastLineEnd = value.indexOf('\n', end);
  if (lastLineEnd === -1) lastLineEnd = value.length;

  if (start === end && !outdent) {
    textarea.value = `${value.slice(0, start)}  ${value.slice(end)}`;
    textarea.selectionStart = textarea.selectionEnd = start + 2;
    return;
  }

  const before = value.slice(0, firstLineStart);
  const block = value.slice(firstLineStart, lastLineEnd);
  const after = value.slice(lastLineEnd);
  const lines = block.split('\n');
  let removedFromFirst = 0;
  let added = 0;

  const changed = lines.map((line, index) => {
    if (!outdent) {
      added += 2;
      return `  ${line}`;
    }
    const match = line.match(/^ {1,2}/);
    const removed = match ? match[0].length : 0;
    if (index === 0) removedFromFirst = removed;
    added -= removed;
    return line.slice(removed);
  });

  textarea.value = before + changed.join('\n') + after;
  const selectionStart = Math.max(firstLineStart, start + (outdent ? -removedFromFirst : 2));
  const selectionEnd = Math.max(selectionStart, end + added);
  textarea.selectionStart = selectionStart;
  textarea.selectionEnd = selectionEnd;
}

function autoIndentNewline(textarea) {
  const value = textarea.value;
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const beforeCursor = value.slice(0, start);
  const lineStart = beforeCursor.lastIndexOf('\n') + 1;
  const currentLine = beforeCursor.slice(lineStart);
  const indentMatch = currentLine.match(/^[ \t]*/);
  const indent = indentMatch ? indentMatch[0] : '';
  const previous = value[start - 1] || '';
  const next = value[start] || '';
  let insert = `\n${indent}`;
  let cursorOffset = insert.length;

  if ((previous === '{' && next === '}') || (previous === '[' && next === ']')) {
    insert = `\n${indent}  \n${indent}`;
    cursorOffset = indent.length + 3;
  } else if (previous === '{' || previous === '[' || previous === '>') {
    insert = `\n${indent}  `;
    cursorOffset = insert.length;
  }

  textarea.value = value.slice(0, start) + insert + value.slice(end);
  textarea.selectionStart = textarea.selectionEnd = start + cursorOffset;
}

function syncEditorScroll() {
  const textarea = document.getElementById('code-editor');
  const highlight = document.getElementById('code-highlight');
  const gutter = document.getElementById('line-numbers');
  if (!textarea) return;
  if (highlight) {
    highlight.scrollTop = textarea.scrollTop;
    highlight.scrollLeft = textarea.scrollLeft;
  }
  if (gutter) gutter.scrollTop = textarea.scrollTop;
}

function getActiveFile() {
  const project = getProject();
  if (!project || !project.activePath) return null;
  return getFile(project, project.activePath);
}

/* ---------- file tree ---------- */

function makeFolderNode(path) {
  return { path, folders: new Map(), files: [] };
}

function buildTree(project) {
  const root = makeFolderNode('');
  const folderFor = (path) => {
    if (!path) return root;
    let node = root;
    let current = '';
    normalizePath(path).split('/').filter(Boolean).forEach((segment) => {
      current = current ? `${current}/${segment}` : segment;
      if (!node.folders.has(current)) node.folders.set(current, makeFolderNode(current));
      node = node.folders.get(current);
    });
    return node;
  };

  project.folders.forEach((folder) => folderFor(folder));
  project.files.forEach((file) => {
    folderFor(dirname(file.path)).files.push(file);
  });
  return root;
}

function compareTreeFiles(a, b, depth) {
  if (depth === 0) {
    const aIndex = /^index\.html?$/i.test(a.path);
    const bIndex = /^index\.html?$/i.test(b.path);
    if (aIndex !== bIndex) return aIndex ? -1 : 1;
  }
  return basename(a.path).localeCompare(basename(b.path), undefined, { numeric: true, sensitivity: 'base' });
}

function renderTreeFolder(node, depth, collapsed, activePath) {
  let markup = '';
  const folders = [...node.folders.values()].sort((a, b) => basename(a.path).localeCompare(basename(b.path), undefined, { numeric: true, sensitivity: 'base' }));
  const files = [...node.files].sort((a, b) => compareTreeFiles(a, b, depth));

  folders.forEach((folder) => {
    const isCollapsed = collapsed.has(folder.path);
    const name = basename(folder.path);
    markup += `
      <div class="tree-row folder ${isCollapsed ? 'collapsed' : 'open'}" style="--depth:${depth}" data-action="toggle-folder" data-path="${escapeAttr(folder.path)}" role="treeitem" aria-expanded="${!isCollapsed}" tabindex="0" title="${escapeAttr(folder.path)}">
        <span class="chevron">${ICONS.chevronDown}</span>
        ${ico(isCollapsed ? 'folder' : 'folderOpen')}
        <span class="tree-label">${escapeHTML(name)}</span>
        <span class="tree-actions">
          <button type="button" data-action="rename-node" data-kind="folder" data-path="${escapeAttr(folder.path)}" title="Rename folder" aria-label="Rename ${escapeAttr(name)}">${ico('pencil')}</button>
          <button class="danger" type="button" data-action="delete-node" data-kind="folder" data-path="${escapeAttr(folder.path)}" title="Delete folder" aria-label="Delete ${escapeAttr(name)}">${ico('trash')}</button>
        </span>
      </div>`;
    if (!isCollapsed) markup += renderTreeFolder(folder, depth + 1, collapsed, activePath);
  });

  files.forEach((file) => {
    const name = basename(file.path);
    markup += `
      <div class="tree-row file ${file.path === activePath ? 'active' : ''}" style="--depth:${depth}" data-action="open-file" data-path="${escapeAttr(file.path)}" role="treeitem" tabindex="0" title="${escapeAttr(file.path)}">
        ${fileGlyph(file.path)}
        <span class="tree-label">${escapeHTML(name)}</span>
        <span class="tree-actions">
          <button type="button" data-action="rename-node" data-kind="file" data-path="${escapeAttr(file.path)}" title="Rename file" aria-label="Rename ${escapeAttr(name)}">${ico('pencil')}</button>
          <button class="danger" type="button" data-action="delete-node" data-kind="file" data-path="${escapeAttr(file.path)}" title="Delete file" aria-label="Delete ${escapeAttr(name)}">${ico('trash')}</button>
        </span>
      </div>`;
  });

  return markup;
}

function renderFileTree() {
  const treeElement = document.getElementById('file-tree');
  const project = getProject();
  if (!treeElement || !project) return;
  const collapsed = new Set(project.collapsedFolders || []);
  const root = buildTree(project);
  const markup = renderTreeFolder(root, 0, collapsed, project.activePath);
  treeElement.innerHTML = markup || '<div class="tree-empty">No files yet.<br>Create a file or upload a folder.</div>';
}

function toggleFolder(path) {
  const project = getProject();
  if (!project) return;
  const collapsed = new Set(project.collapsedFolders || []);
  if (collapsed.has(path)) collapsed.delete(path);
  else collapsed.add(path);
  project.collapsedFolders = [...collapsed];
  renderFileTree();
  schedulePersist();
}

function expandFolderPath(path) {
  const project = getProject();
  if (!project) return;
  const collapsed = new Set(project.collapsedFolders || []);
  let current = '';
  normalizePath(path).split('/').filter(Boolean).forEach((segment) => {
    current = current ? `${current}/${segment}` : segment;
    collapsed.delete(current);
  });
  project.collapsedFolders = [...collapsed];
}

/* ---------- tabs + editor loading ---------- */

function renderTabs() {
  const strip = document.getElementById('tab-strip');
  const project = getProject();
  if (!strip || !project) return;

  project.openPaths = project.openPaths.filter((path) => getFile(project, path));
  strip.innerHTML = project.openPaths.map((path) => {
    const file = getFile(project, path);
    if (!file) return '';
    const active = path === project.activePath;
    return `
      <div class="editor-tab ${active ? 'active' : ''}" data-tab-path="${escapeAttr(path)}" role="tab" aria-selected="${active}" tabindex="${active ? '0' : '-1'}">
        <button class="tab-open" type="button" data-action="open-tab" data-path="${escapeAttr(path)}" title="${escapeAttr(path)}" style="display:flex;align-items:center;gap:7px;min-width:0;padding:0;background:none;border:0;color:inherit;font:inherit;cursor:pointer;">
          ${fileGlyph(path)}
          <span class="tab-name">${escapeHTML(basename(path))}</span>
        </button>
        <button class="tab-close" type="button" data-action="close-tab" data-path="${escapeAttr(path)}" aria-label="Close ${escapeAttr(basename(path))}">${ico('x')}</button>
      </div>`;
  }).join('') + `<button class="tab-add" type="button" data-action="new-file" title="New file" aria-label="New file">${ico('plus')}</button>`;

  requestAnimationFrame(() => {
    const activeTab = strip.querySelector('.editor-tab.active');
    if (activeTab) activeTab.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  });
}

function openFile(path) {
  const project = getProject();
  const file = getFile(project, path);
  if (!project || !file) return;
  if (!project.openPaths.includes(path)) project.openPaths.push(path);
  const wasActive = project.activePath === path && state.activeFile === path;
  project.activePath = path;
  renderTabs();
  renderFileTree();
  schedulePersist();
  closeMobilePanels();
  if (!wasActive) loadActiveFile(path, { focus: true });
  else document.getElementById('code-editor')?.focus();
}

function closeTab(path) {
  const project = getProject();
  if (!project) return;
  const index = project.openPaths.indexOf(path);
  if (index === -1) return;
  project.openPaths.splice(index, 1);
  if (project.activePath === path) {
    project.activePath = project.openPaths[index] || project.openPaths[index - 1] || null;
    if (project.activePath) loadActiveFile(project.activePath, { focus: false });
    else loadActiveFile(null);
  }
  renderTabs();
  renderFileTree();
  schedulePersist();
}

function loadActiveFile(path, options = {}) {
  const project = getProject();
  if (!project) return;

  if (path && !getFile(project, path)) path = project.openPaths.find((item) => getFile(project, item)) || project.files[0]?.path || null;
  project.activePath = path;
  if (path && !project.openPaths.includes(path)) project.openPaths.push(path);

  const textarea = document.getElementById('code-editor');
  const highlight = document.getElementById('code-highlight');
  const lineNumbers = document.getElementById('line-numbers');
  const surface = document.getElementById('editor-surface');
  const overlay = document.getElementById('editor-overlay');

  if (!path) {
    state.activeFile = null;
    if (textarea) {
      textarea.value = '';
      textarea.readOnly = true;
    }
    if (highlight) highlight.innerHTML = '';
    if (lineNumbers) {
      lineNumbers.textContent = '';
      lineNumbers.hidden = true;
    }
    if (surface) surface.style.visibility = 'hidden';
    renderCodeEmpty();
    renderEditorBar(null);
    renderTabs();
    renderFileTree();
    updateCaretStatus();
    return;
  }

  const file = getFile(project, path);
  if (!file) return;
  state.activeFile = path;

  if (file.binary) {
    if (textarea) {
      textarea.value = '';
      textarea.readOnly = true;
    }
    if (highlight) highlight.innerHTML = '';
    if (lineNumbers) {
      lineNumbers.textContent = '';
      lineNumbers.hidden = true;
    }
    if (surface) surface.style.visibility = 'hidden';
    renderBinaryFile(file);
    renderEditorBar(file);
    renderTabs();
    renderFileTree();
    updateCaretStatus();
    return;
  }

  if (overlay) overlay.innerHTML = '';
  if (lineNumbers) lineNumbers.hidden = false;
  if (surface) surface.style.visibility = 'visible';
  if (textarea) {
    textarea.readOnly = false;
    textarea.value = file.content;
    textarea.scrollTop = 0;
    textarea.scrollLeft = 0;
    textarea.setAttribute('aria-label', `Editing ${file.path}`);
  }
  renderEditorBar(file);
  renderHighlightNow();
  updateGutter();
  updateCaretStatus();
  renderTabs();
  renderFileTree();

  if (options.focus) {
    requestAnimationFrame(() => textarea?.focus());
  }
}

function renderEditorBar(file) {
  const pathElement = document.getElementById('editor-path');
  const languageElement = document.getElementById('editor-lang');
  if (!pathElement || !languageElement) return;
  if (!file) {
    pathElement.textContent = 'No file selected';
    languageElement.textContent = '—';
    return;
  }
  const segments = file.path.split('/');
  pathElement.innerHTML = segments.map((segment, index) => index === segments.length - 1
    ? `<b>${escapeHTML(segment)}</b>`
    : `${escapeHTML(segment)}<span style="color:#b1cbd8"> / </span>`).join('');
  languageElement.textContent = (extensionOf(file.path) || 'text').toUpperCase();
}

function renderCodeEmpty() {
  const project = getProject();
  const overlay = document.getElementById('editor-overlay');
  if (!overlay) return;
  const hasFiles = project && project.files.length > 0;
  overlay.innerHTML = `
    <div class="code-empty">
      <div class="code-empty-art">${ico('code')}</div>
      <h3>${hasFiles ? 'No file open' : 'Your project is empty'}</h3>
      <p>${hasFiles ? 'Choose a file from the explorer or open a new one to start editing.' : 'Create an HTML, CSS or JavaScript file — or upload a folder to get started.'}</p>
      <div class="code-empty-actions">
        <button class="btn btn-primary btn-sm" type="button" data-action="new-file">${ico('plus')} New file</button>
        <button class="btn btn-secondary btn-sm" type="button" data-action="upload-files">${ico('upload')} Upload</button>
      </div>
    </div>`;
}

function renderBinaryFile(file) {
  const overlay = document.getElementById('editor-overlay');
  if (!overlay) return;
  const isImage = file.content.startsWith('data:image/');
  const imagePreview = isImage
    ? `<div class="binary-preview"><img src="${escapeAttr(file.content)}" alt="${escapeAttr(basename(file.path))}"></div>`
    : '';
  overlay.innerHTML = `
    <div class="binary-view">
      ${imagePreview || `<div class="code-empty-art">${ico('image')}</div>`}
      <h3>${escapeHTML(basename(file.path))}</h3>
      <p>A binary asset stored with this project. You can reference it from HTML or CSS, download a copy, or remove it from the explorer.</p>
      <a class="btn btn-secondary btn-sm" href="${escapeAttr(file.content)}" download="${escapeAttr(basename(file.path))}">${ico('download')} Download asset</a>
    </div>`;
}

function updateGutter() {
  const project = getProject();
  const file = getFile(project, project?.activePath);
  const gutter = document.getElementById('line-numbers');
  const textarea = document.getElementById('code-editor');
  if (!gutter || !file || file.binary || !textarea) return;
  const lines = textarea.value.split('\n').length;
  const numbers = [];
  for (let line = 1; line <= lines; line += 1) numbers.push(String(line));
  gutter.textContent = numbers.join('\n');
  const digits = String(lines).length;
  gutter.style.width = `${Math.max(42, 22 + digits * 7)}px`;
  syncEditorScroll();
}

function updateCaretStatus() {
  const positionElement = document.getElementById('status-position');
  const modeElement = document.getElementById('status-mode');
  const project = getProject();
  const file = getFile(project, project?.activePath);
  const textarea = document.getElementById('code-editor');
  if (!positionElement || !modeElement) return;
  if (!file) {
    positionElement.textContent = 'Ln —, Col —';
    modeElement.textContent = '—';
    return;
  }
  if (file.binary) {
    positionElement.textContent = formatBytes(Math.round(file.content.length * 0.75));
    modeElement.textContent = extensionOf(file.path).toUpperCase() || 'BINARY';
    return;
  }
  if (!textarea) return;
  const before = textarea.value.slice(0, textarea.selectionStart);
  const lines = before.split('\n');
  positionElement.textContent = `Ln ${lines.length}, Col ${lines[lines.length - 1].length + 1}`;
  modeElement.textContent = (languageFor(file.path) === 'js' ? 'JavaScript' : languageFor(file.path) === 'html' ? 'HTML' : languageFor(file.path) === 'css' ? 'CSS' : 'Text');
}

/* ---------- editor highlighting ---------- */

function scheduleHighlight() {
  if (state.highlightFrame) return;
  state.highlightFrame = requestAnimationFrame(() => {
    state.highlightFrame = 0;
    renderHighlightNow();
    syncEditorScroll();
  });
}

function renderHighlightNow() {
  const highlight = document.getElementById('code-highlight');
  const file = getActiveFile();
  if (!highlight || !file || file.binary) return;
  if (file.content.length > 180000) {
    highlight.textContent = `${file.content}\n`;
    return;
  }
  highlight.innerHTML = `${highlightCode(file.content, languageFor(file.path))}\n`;
}

/* =========================================================
   File management
   ========================================================= */

function fileExists(project, path, ignorePath = null) {
  const target = String(path).toLowerCase();
  if (ignorePath && ignorePath.toLowerCase() === target) return false;
  return project.files.some((file) => file.path.toLowerCase() === target);
}

function folderExists(project, path, ignorePath = null) {
  const target = String(path).toLowerCase();
  if (ignorePath && ignorePath.toLowerCase() === target) return false;
  return project.folders.some((folder) => folder.toLowerCase() === target);
}

function ancestorIsFile(project, path) {
  const parts = normalizePath(path).split('/');
  parts.pop();
  let current = '';
  for (const part of parts) {
    current = current ? `${current}/${part}` : part;
    if (fileExists(project, current)) return current;
  }
  return null;
}

function ensureParentFolders(project, path) {
  const parts = dirname(path).split('/').filter(Boolean);
  let current = '';
  parts.forEach((part) => {
    current = current ? `${current}/${part}` : part;
    if (!folderExists(project, current)) project.folders.push(current);
  });
}

function addFolderAndParents(project, path) {
  const clean = normalizePath(path);
  if (!clean) return;
  const parts = clean.split('/').filter(Boolean);
  let current = '';
  parts.forEach((part) => {
    current = current ? `${current}/${part}` : part;
    if (!folderExists(project, current)) project.folders.push(current);
  });
}

function uniquePath(project, desired) {
  const clean = normalizePath(desired);
  if (!clean) return clean;
  const pathTaken = (path) => fileExists(project, path) || folderExists(project, path);
  if (!pathTaken(clean)) return clean;

  const directory = dirname(clean);
  const name = basename(clean);
  const dot = name.lastIndexOf('.');
  const stem = dot > 0 ? name.slice(0, dot) : name;
  const extension = dot > 0 ? name.slice(dot) : '';
  let counter = 2;
  let candidate = clean;
  while (pathTaken(candidate)) {
    const fileName = `${stem} (${counter})${extension}`;
    candidate = directory ? `${directory}/${fileName}` : fileName;
    counter += 1;
  }
  return candidate;
}

function openFilePicker(folder = false) {
  const input = folder ? dom.folderInput : dom.fileInput;
  if (input) input.click();
}

function emptyFileContent(path) {
  const extension = extensionOf(path);
  const title = basename(path).replace(/\.[^.]+$/, '');
  if (HTML_EXTENSIONS.has(extension)) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHTML(title || 'New page')}</title>
</head>
<body>

</body>
</html>
`;
  }
  if (extension === 'css') return `/* ${basename(path)} */\n`;
  if (JS_EXTENSIONS.has(extension)) return `// ${basename(path)}\n`;
  return '';
}

function openNewFileModal() {
  let selectedType = 'html';
  const extensionByType = { html: '.html', css: '.css', js: '.js', txt: '.txt' };

  showModal({
    title: 'New file',
    subtitle: 'Add a file to this project. Use a slash to put it inside a folder.',
    iconName: 'filePlus',
    confirmText: 'Create file',
    body: `
      <div class="form-field">
        <label for="new-file-path">File path</label>
        <input class="text-input" id="new-file-path" type="text" value="untitled.html" maxlength="180" data-autofocus autocomplete="off">
        <span class="hint">Examples: about.html, css/theme.css, js/app.js</span>
      </div>
      <div class="form-field">
        <span class="field-label">File type</span>
        <div class="type-picker" id="file-type-picker">
          <button class="type-pill selected" type="button" data-file-type="html"><span class="dot html"></span>HTML</button>
          <button class="type-pill" type="button" data-file-type="css"><span class="dot css"></span>CSS</button>
          <button class="type-pill" type="button" data-file-type="js"><span class="dot js"></span>JavaScript</button>
          <button class="type-pill" type="button" data-file-type="txt"><span class="dot txt"></span>Text</button>
        </div>
      </div>`,
    onOpen(form) {
      const input = form.querySelector('#new-file-path');
      const pills = [...form.querySelectorAll('[data-file-type]')];

      const selectType = (type, updatePath) => {
        selectedType = type;
        pills.forEach((pill) => pill.classList.toggle('selected', pill.dataset.fileType === type));
        if (!updatePath) return;
        const extension = extensionByType[type];
        const value = input.value.trim() || 'untitled';
        const folder = dirname(value);
        let name = basename(value);
        if (KNOWN_EXTENSIONS.has(extensionOf(name)) || /\.[^.]+$/.test(name)) {
          name = name.replace(/\.[^.]+$/, extension);
        } else {
          name += extension;
        }
        input.value = folder ? `${folder}/${name}` : name;
      };

      pills.forEach((pill) => {
        pill.addEventListener('click', () => selectType(pill.dataset.fileType, true));
      });

      input.addEventListener('input', () => {
        const extension = extensionOf(input.value.trim());
        const map = { html: 'html', htm: 'html', css: 'css', js: 'js', mjs: 'js', cjs: 'js', txt: 'txt' };
        if (map[extension]) selectType(map[extension], false);
      });
    },
    onSubmit(form) {
      const project = getProject();
      if (!project) return false;
      const input = form.querySelector('#new-file-path');
      let raw = input.value.trim();
      if (!raw) {
        showModalError('Enter a file name.');
        return false;
      }
      if (!extensionOf(raw)) raw += extensionByType[selectedType] || '.txt';
      const path = normalizePath(raw);
      if (!path || path.endsWith('/')) {
        showModalError('That file path is not valid.');
        return false;
      }
      if (fileExists(project, path)) {
        showModalError('A file with that path already exists.');
        return false;
      }
      if (folderExists(project, path)) {
        showModalError('A folder with that name already exists.');
        return false;
      }
      const blockedAncestor = ancestorIsFile(project, path);
      if (blockedAncestor) {
        showModalError(`“${blockedAncestor}” is a file, so it cannot also be a folder.`);
        return false;
      }

      ensureParentFolders(project, path);
      const now = Date.now();
      project.files.push({
        path,
        content: emptyFileContent(path),
        binary: false,
        updatedAt: now
      });
      if (!project.entry && isHtmlPath(path)) project.entry = path;
      touchProject(project);
      expandFolderPath(dirname(path));
      persistNow();
      renderFileTree();
      openFile(path);
      renderEntrySelect();
      runPreview();
      showToast(`Created ${path}.`, 'success');
    }
  });
}

function openNewFolderModal() {
  showModal({
    title: 'New folder',
    subtitle: 'Organize your project with folders. Empty folders are saved too.',
    iconName: 'folderPlus',
    confirmText: 'Create folder',
    body: `
      <div class="form-field">
        <label for="new-folder-path">Folder path</label>
        <input class="text-input" id="new-folder-path" type="text" value="assets" maxlength="180" data-autofocus autocomplete="off">
        <span class="hint">Nested paths work too, for example assets/images.</span>
      </div>`,
    onSubmit(form) {
      const project = getProject();
      if (!project) return false;
      const path = normalizePath(form.querySelector('#new-folder-path').value);
      if (!path) {
        showModalError('Enter a folder name.');
        return false;
      }
      if (folderExists(project, path)) {
        showModalError('That folder already exists.');
        return false;
      }
      if (fileExists(project, path)) {
        showModalError('A file with that name already exists.');
        return false;
      }
      const blockedAncestor = ancestorIsFile(project, `${path}/placeholder`);
      if (blockedAncestor) {
        showModalError(`“${blockedAncestor}” is a file, so it cannot also be a folder.`);
        return false;
      }
      addFolderAndParents(project, path);
      project.collapsedFolders = (project.collapsedFolders || []).filter((folder) => folder !== path && !folder.startsWith(`${path}/`));
      touchProject(project);
      persistNow();
      renderFileTree();
      schedulePersist();
      showToast(`Created folder ${path}.`, 'success');
    }
  });
}

function replacePathPrefix(path, oldPrefix, newPrefix) {
  if (!path) return path;
  if (path === oldPrefix) return newPrefix;
  if (path.startsWith(`${oldPrefix}/`)) return `${newPrefix}${path.slice(oldPrefix.length)}`;
  return path;
}

function renameFileInProject(project, oldPath, newPath) {
  const file = getFile(project, oldPath);
  if (!file) return 'That file no longer exists.';
  if (oldPath === newPath) return null;
  if (fileExists(project, newPath, oldPath)) return 'A file with that path already exists.';
  if (folderExists(project, newPath)) return 'A folder with that name already exists.';
  const blockedAncestor = ancestorIsFile(project, newPath);
  if (blockedAncestor) return `“${blockedAncestor}” is a file, so it cannot also be a folder.`;

  ensureParentFolders(project, newPath);
  file.path = newPath;
  file.updatedAt = Date.now();
  project.openPaths = project.openPaths.map((path) => path === oldPath ? newPath : path);
  if (project.activePath === oldPath) project.activePath = newPath;
  if (project.entry === oldPath) project.entry = newPath;
  project.collapsedFolders = (project.collapsedFolders || []).map((path) => replacePathPrefix(path, oldPath, newPath));
  project.folders = project.folders.filter((folder) => folder !== newPath);
  if (!project.entry) project.entry = chooseEntryForFiles(project.files);
  return null;
}

function renameFolderInProject(project, oldPath, newPath) {
  if (oldPath === newPath) return null;
  if (newPath.startsWith(`${oldPath}/`)) return 'A folder cannot be moved inside itself.';
  if (folderExists(project, newPath)) return 'A folder with that path already exists.';
  if (fileExists(project, newPath)) return 'A file with that name already exists.';
  const blockedAncestor = ancestorIsFile(project, `${newPath}/placeholder`);
  if (blockedAncestor) return `“${blockedAncestor}” is a file, so it cannot also be a folder.`;

  const affectedFiles = project.files.filter((file) => file.path === oldPath || file.path.startsWith(`${oldPath}/`));
  const affectedFolders = project.folders.filter((folder) => folder === oldPath || folder.startsWith(`${oldPath}/`));

  for (const file of affectedFiles) {
    const target = replacePathPrefix(file.path, oldPath, newPath);
    if (fileExists(project, target, file.path)) return `A file already exists at ${target}.`;
    if (folderExists(project, target)) return `A folder already exists at ${target}.`;
  }
  for (const folder of affectedFolders) {
    const target = replacePathPrefix(folder, oldPath, newPath);
    if (folderExists(project, target, folder)) return `A folder already exists at ${target}.`;
    if (fileExists(project, target)) return `A file already exists at ${target}.`;
  }

  ensureParentFolders(project, `${newPath}/placeholder`);
  project.files.forEach((file) => {
    file.path = replacePathPrefix(file.path, oldPath, newPath);
  });
  project.folders = project.folders.map((folder) => replacePathPrefix(folder, oldPath, newPath));
  project.openPaths = project.openPaths.map((path) => replacePathPrefix(path, oldPath, newPath));
  project.activePath = replacePathPrefix(project.activePath, oldPath, newPath);
  project.entry = replacePathPrefix(project.entry, oldPath, newPath);
  project.collapsedFolders = (project.collapsedFolders || []).map((path) => replacePathPrefix(path, oldPath, newPath));
  return null;
}

function openRenameNodeModal(kind, path) {
  const project = getProject();
  if (!project) return;
  const nodeExists = kind === 'folder' ? folderExists(project, path) : fileExists(project, path);
  if (!nodeExists) {
    showToast('That item no longer exists.', 'error');
    return;
  }

  showModal({
    title: kind === 'folder' ? 'Rename folder' : 'Rename file',
    subtitle: kind === 'folder' ? 'All files inside keep their relative paths.' : 'The file keeps its contents.',
    iconName: 'pencil',
    confirmText: 'Rename',
    body: `
      <div class="form-field">
        <label for="rename-node-path">${kind === 'folder' ? 'Folder path' : 'File path'}</label>
        <input class="text-input" id="rename-node-path" type="text" value="${escapeAttr(path)}" maxlength="180" data-autofocus autocomplete="off">
        <span class="hint">${kind === 'folder' ? 'Move it by changing the path.' : 'Links to this file are not updated automatically.'}</span>
      </div>`,
    onSubmit(form) {
      const newPath = normalizePath(form.querySelector('#rename-node-path').value);
      if (!newPath) {
        showModalError('Enter a name.');
        return false;
      }
      if (kind === 'folder' && fileExists(project, newPath)) {
        showModalError('A file with that name already exists.');
        return false;
      }
      const error = kind === 'folder'
        ? renameFolderInProject(project, path, newPath)
        : renameFileInProject(project, path, newPath);
      if (error) {
        showModalError(error);
        return false;
      }
      touchProject(project);
      persistNow();
      expandFolderPath(dirname(newPath));
      renderFileTree();
      renderTabs();
      renderEditorBar(getActiveFile());
      renderEntrySelect();
      if (project.activePath) loadActiveFile(project.activePath, { focus: false });
      runPreview();
      showToast(kind === 'folder' ? 'Folder renamed.' : 'File renamed.', 'success');
    }
  });
}

function repairProject(project, openFirst = true) {
  if (!project) return;
  const hasFile = (path) => Boolean(getFile(project, path));
  project.openPaths = project.openPaths.filter(hasFile);
  if (!hasFile(project.activePath)) {
    project.activePath = project.openPaths[0] || (openFirst ? project.files[0]?.path : null) || null;
    if (project.activePath && !project.openPaths.includes(project.activePath)) project.openPaths.push(project.activePath);
  }
  if (!project.entry || !hasFile(project.entry) || !isHtmlPath(project.entry)) {
    project.entry = chooseEntryForFiles(project.files);
  }
  project.folders = project.folders.filter((folder) => !fileExists(project, folder));
  project.collapsedFolders = (project.collapsedFolders || []).filter((folder) => folderExists(project, folder));
}

function openDeleteNodeModal(kind, path) {
  const project = getProject();
  if (!project) return;
  let files;
  let label;

  if (kind === 'folder') {
    files = project.files.filter((file) => file.path === path || file.path.startsWith(`${path}/`));
    label = `folder “${basename(path)}” and ${pluralize(files.length, 'file')} inside`;
  } else {
    files = project.files.filter((file) => file.path === path);
    label = `“${basename(path)}”`;
  }

  if (kind === 'folder' && !folderExists(project, path)) return;
  if (kind === 'file' && !files.length) return;

  showModal({
    title: kind === 'folder' ? 'Delete folder?' : 'Delete file?',
    subtitle: 'This action cannot be undone.',
    iconName: 'trash',
    iconDanger: true,
    confirmText: kind === 'folder' ? 'Delete folder' : 'Delete file',
    danger: true,
    body: `<p class="confirm-copy">${escapeHTML(label)} will be permanently removed from this project.</p>`,
    onSubmit() {
      if (kind === 'folder') {
        project.files = project.files.filter((file) => file.path !== path && !file.path.startsWith(`${path}/`));
        project.folders = project.folders.filter((folder) => folder !== path && !folder.startsWith(`${path}/`));
        project.openPaths = project.openPaths.filter((filePath) => filePath !== path && !filePath.startsWith(`${path}/`));
        project.collapsedFolders = (project.collapsedFolders || []).filter((folder) => folder !== path && !folder.startsWith(`${path}/`));
      } else {
        project.files = project.files.filter((file) => file.path !== path);
        project.openPaths = project.openPaths.filter((filePath) => filePath !== path);
      }
      repairProject(project, true);
      touchProject(project);
      persistNow();
      renderFileTree();
      renderTabs();
      renderEntrySelect();
      loadActiveFile(project.activePath, { focus: false });
      runPreview();
      showToast(kind === 'folder' ? 'Folder deleted.' : 'File deleted.', 'success');
    }
  });
}

function renderEntrySelect() {
  const select = document.getElementById('entry-select');
  const project = getProject();
  if (!select || !project) return;
  const htmlFiles = project.files
    .filter((file) => isHtmlPath(file.path))
    .sort((a, b) => {
      const aIndex = /^index\.html?$/i.test(a.path);
      const bIndex = /^index\.html?$/i.test(b.path);
      if (aIndex !== bIndex) return aIndex ? -1 : 1;
      return a.path.localeCompare(b.path);
    });
  if (!htmlFiles.some((file) => file.path === project.entry)) {
    project.entry = chooseEntryForFiles(project.files);
  }
  if (!htmlFiles.length) {
    select.innerHTML = '<option value="">No HTML file</option>';
    select.disabled = true;
    return;
  }
  select.disabled = false;
  select.innerHTML = htmlFiles.map((file) => `<option value="${escapeAttr(file.path)}" ${file.path === project.entry ? 'selected' : ''}>${escapeHTML(file.path)}</option>`).join('');
}

function readAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(reader.error || new Error('Could not read file'));
    reader.readAsDataURL(file);
  });
}

async function readStoredFile(file) {
  if (isTextFile(file)) {
    try {
      const text = await file.text();
      return { content: text, binary: false };
    } catch (error) {
      /* Fall through to a data URL if text decoding fails. */
    }
  }
  return { content: await readAsDataURL(file), binary: true };
}

function uploadProgressToast(count) {
  if (count < 4) return;
  showToast(`Adding ${pluralize(count, 'file')}…`, 'info', 2200);
}

async function handleUploadItems(items) {
  const project = getProject();
  if (!project || !items.length) return;

  const accepted = items.filter((item) => item && item.file);
  if (!accepted.length) return;
  uploadProgressToast(accepted.length);

  const added = [];
  const skipped = [];

  for (const item of accepted) {
    const file = item.file;
    if (file.size > MAX_UPLOAD_BYTES) {
      skipped.push({ name: file.name, reason: 'too large' });
      continue;
    }
    const desired = normalizePath(item.path || file.webkitRelativePath || file.name);
    if (!desired) continue;
    let stored;
    try {
      stored = await readStoredFile(file);
    } catch (error) {
      skipped.push({ name: file.name, reason: 'could not read' });
      continue;
    }
    const path = uniquePath(project, desired);
    ensureParentFolders(project, path);
    project.files.push({
      path,
      content: stored.content,
      binary: stored.binary,
      updatedAt: Date.now()
    });
    added.push(path);
  }

  if (!added.length) {
    showToast(
      skipped.length
        ? `Nothing uploaded. Files must be under ${formatBytes(MAX_UPLOAD_BYTES)} and readable.`
        : 'No files were selected.',
      'warning',
      5000
    );
    return;
  }

  project.files.sort((a, b) => a.path.localeCompare(b.path, undefined, { numeric: true, sensitivity: 'base' }));
  if (!project.entry) project.entry = chooseEntryForFiles(project.files);
  if (!getFile(project, project.activePath)) {
    const firstHtml = added.find((path) => isHtmlPath(path));
    project.activePath = firstHtml || added[0];
    if (project.activePath && !project.openPaths.includes(project.activePath)) project.openPaths.push(project.activePath);
  }
  added.forEach((path) => expandFolderPath(dirname(path)));
  touchProject(project);
  persistNow();

  renderFileTree();
  renderTabs();
  renderEntrySelect();
  loadActiveFile(project.activePath, { focus: false });
  runPreview();

  const skippedNote = skipped.length ? ` ${skipped.length} skipped (over ${formatBytes(MAX_UPLOAD_BYTES)} or unreadable).` : '';
  showToast(`Added ${pluralize(added.length, 'file')}.${skippedNote}`, skipped.length ? 'warning' : 'success', 4800);
}

function fileEntryToFile(entry) {
  return new Promise((resolve, reject) => {
    entry.file(resolve, reject);
  });
}

function readAllDirectoryEntries(directoryReader) {
  return new Promise((resolve, reject) => {
    const entries = [];
    const readBatch = () => {
      directoryReader.readEntries((batch) => {
        if (!batch.length) {
          resolve(entries);
          return;
        }
        entries.push(...batch);
        readBatch();
      }, reject);
    };
    readBatch();
  });
}

async function walkDroppedEntry(entry, prefix, output) {
  if (!entry) return;
  if (entry.isFile) {
    try {
      const file = await fileEntryToFile(entry);
      output.push({ file, path: `${prefix}${entry.name}` });
    } catch (error) {
      /* Skip unreadable entries. */
    }
    return;
  }
  if (entry.isDirectory) {
    const children = await readAllDirectoryEntries(entry.createReader());
    const nextPrefix = `${prefix}${entry.name}/`;
    for (const child of children) {
      await walkDroppedEntry(child, nextPrefix, output);
    }
  }
}

async function collectDroppedItems(dataTransfer) {
  const output = [];
  const entries = [];
  const items = dataTransfer.items ? [...dataTransfer.items] : [];
  items.forEach((item) => {
    if (item.kind !== 'file') return;
    if (typeof item.webkitGetAsEntry === 'function') {
      const entry = item.webkitGetAsEntry();
      if (entry) entries.push(entry);
    }
  });

  if (entries.length) {
    for (const entry of entries) {
      try {
        await walkDroppedEntry(entry, '', output);
      } catch (error) {
        /* Fall back to the flat file list below. */
      }
    }
    if (output.length) return output;
  }

  return [...dataTransfer.files].map((file) => ({ file, path: file.webkitRelativePath || file.name }));
}

function hasDraggedFiles(event) {
  return Boolean(event.dataTransfer && [...event.dataTransfer.types].includes('Files'));
}

function handleDragEnter(event) {
  if (!hasDraggedFiles(event)) return;
  event.preventDefault();
  state.dragDepth += 1;
  document.getElementById('file-panel')?.classList.add('dragging');
}

function handleDragOver(event) {
  if (!hasDraggedFiles(event)) return;
  event.preventDefault();
  if (event.dataTransfer) event.dataTransfer.dropEffect = 'copy';
}

function handleDragLeave(event) {
  if (!hasDraggedFiles(event)) return;
  state.dragDepth = Math.max(0, state.dragDepth - 1);
  if (!state.dragDepth) document.getElementById('file-panel')?.classList.remove('dragging');
}

async function handlePanelDrop(event) {
  if (!hasDraggedFiles(event) && !event.dataTransfer?.files?.length) return;
  event.preventDefault();
  state.dragDepth = 0;
  document.getElementById('file-panel')?.classList.remove('dragging');
  if (!getProject()) return;
  const items = await collectDroppedItems(event.dataTransfer);
  await handleUploadItems(items);
}

function startSplitDrag(event) {
  if (window.innerWidth <= 960) return;
  event.preventDefault();
  const splitter = event.currentTarget;
  const panel = document.getElementById('preview-panel');
  const ide = document.getElementById('ide');
  if (!panel || !ide) return;
  splitter.classList.add('dragging');
  document.body.style.cursor = 'col-resize';
  document.body.style.userSelect = 'none';

  const onMove = (moveEvent) => {
    const rect = ide.getBoundingClientRect();
    const percent = clamp(((rect.right - moveEvent.clientX) / rect.width) * 100, 28, 62);
    state.previewWidth = percent;
    panel.style.setProperty('--preview-width', `${percent}%`);
  };

  const onUp = () => {
    splitter.classList.remove('dragging');
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
    savePrefs();
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onUp);
    window.removeEventListener('pointercancel', onUp);
  };

  window.addEventListener('pointermove', onMove);
  window.addEventListener('pointerup', onUp);
  window.addEventListener('pointercancel', onUp);
}

function resolveLocalPath(reference, basePath) {
  if (!reference) return null;
  let raw = String(reference).trim();
  if (!raw) return null;
  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(raw)) return null;
  raw = raw.split('#')[0].split('?')[0];
  try {
    raw = decodeURIComponent(raw);
  } catch (error) {
    /* Keep the original reference when it is not valid URL encoding. */
  }
  if (!raw) return null;
  if (raw.startsWith('/')) return normalizePath(raw.slice(1));
  const baseDirectory = dirname(basePath);
  return normalizePath(baseDirectory ? `${baseDirectory}/${raw}` : raw);
}

function dataUrlForFile(file) {
  if (!file) return null;
  if (file.binary) return file.content.startsWith('data:') ? file.content : null;
  if (extensionOf(file.path) === 'svg') {
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(file.content)}`;
  }
  if (kindFor(file.path) === 'image') {
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(file.content)}`;
  }
  return null;
}

function rewriteCssUrls(css, basePath) {
  return String(css).replace(/url\(\s*(?:(["'])(.*?)\1|([^)]*?))\s*\)/gi, (match, quote, quoted, bare) => {
    const reference = String(quoted ?? bare ?? '').trim();
    if (!reference) return match;
    const target = resolveLocalPath(reference, basePath);
    if (!target) return match;
    const file = getFile(getProject(), target);
    const dataUrl = dataUrlForFile(file);
    return dataUrl ? `url("${dataUrl}")` : match;
  });
}

function rewriteSrcset(value, basePath) {
  return String(value).split(',').map((part) => {
    const trimmed = part.trim();
    if (!trimmed) return '';
    const pieces = trimmed.split(/\s+/);
    const target = resolveLocalPath(pieces[0], basePath);
    const file = target ? getFile(getProject(), target) : null;
    const dataUrl = dataUrlForFile(file);
    if (!dataUrl) return trimmed;
    return [dataUrl, ...pieces.slice(1)].join(' ');
  }).filter(Boolean).join(', ');
}

function buildBridgeScript(entryPath) {
  const entry = JSON.stringify(entryPath || '');
  return `(function () {
  'use strict';
  var entry = ${entry};
  function post(type, payload) {
    try {
      parent.postMessage({ __bluecode: true, type: type, payload: payload }, '*');
    } catch (error) {}
  }
  function format(value) {
    if (value instanceof Error) return value.stack || (value.name + ': ' + value.message);
    if (typeof value === 'string') return value;
    if (value === undefined) return 'undefined';
    if (value === null) return 'null';
    if (typeof value === 'function') return 'ƒ ' + (value.name || 'anonymous') + '()';
    if (typeof value === 'object') {
      try { return JSON.stringify(value, null, 2); }
      catch (error) { return Object.prototype.toString.call(value); }
    }
    return String(value);
  }
  function send(level, args) {
    post('console', {
      level: level,
      args: Array.prototype.map.call(args, format)
    });
  }
  ['log', 'info', 'warn', 'error'].forEach(function (level) {
    var original = console[level];
    console[level] = function () {
      send(level, arguments);
      if (original) original.apply(console, arguments);
    };
  });
  var originalClear = console.clear;
  console.clear = function () {
    post('console-clear', null);
    if (originalClear) originalClear.call(console);
  };
  window.addEventListener('error', function (event) {
    var message = event.message || 'Script error';
    if (event.filename) message += ' (' + event.filename + ':' + event.lineno + ':' + event.colno + ')';
    post('console', { level: 'error', args: [message] });
  });
  window.addEventListener('unhandledrejection', function (event) {
    post('console', { level: 'error', args: ['Unhandled promise rejection: ' + format(event.reason)] });
  });
  document.addEventListener('click', function (event) {
    var anchor = event.target && event.target.closest ? event.target.closest('a[href]') : null;
    if (!anchor) return;
    var href = anchor.getAttribute('href');
    if (!href || href.charAt(0) === '#') return;
    if (/^(?:[a-z][a-z0-9+.-]*:|\\/\\/)/i.test(href)) return;
    if (anchor.target && anchor.target !== '_self') return;
    if (anchor.hasAttribute('download')) return;
    event.preventDefault();
    post('navigate', { href: href, base: entry });
  });
})();`;
}

function buildPreviewDocument(project, entryPath) {
  const entryFile = getFile(project, entryPath);
  if (!entryFile) throw new Error('Entry file not found.');
  const parser = new DOMParser();
  const doc = parser.parseFromString(entryFile.content || '', 'text/html');

  doc.querySelectorAll('link[href]').forEach((link) => {
    const href = link.getAttribute('href');
    const target = resolveLocalPath(href, entryPath);
    const file = target ? getFile(project, target) : null;
    if (!file) return;
    const rel = (link.getAttribute('rel') || '').toLowerCase().split(/\s+/);
    if (rel.includes('stylesheet') && kindFor(target) === 'css') {
      const style = doc.createElement('style');
      if (link.getAttribute('media')) style.setAttribute('media', link.getAttribute('media'));
      style.setAttribute('data-bluecode-file', target);
      style.textContent = file.content;
      link.replaceWith(style);
      return;
    }
    if (rel.includes('icon') || rel.includes('apple-touch-icon') || rel.includes('shortcut')) {
      const dataUrl = dataUrlForFile(file);
      if (dataUrl) link.setAttribute('href', dataUrl);
    }
  });

  doc.querySelectorAll('script[src]').forEach((script) => {
    const target = resolveLocalPath(script.getAttribute('src'), entryPath);
    const file = target ? getFile(project, target) : null;
    if (!file || !JS_EXTENSIONS.has(extensionOf(target))) return;
    const type = (script.getAttribute('type') || '').trim().toLowerCase();
    const isModule = type === 'module';
    const wantsDefer = script.hasAttribute('defer');

    let code = file.content.replace(/<\/script/gi, '<\\/script');
    if (wantsDefer && !isModule) {
      code = `document.addEventListener('DOMContentLoaded', function () {\n${code}\n});`;
    }
    script.removeAttribute('src');
    script.removeAttribute('integrity');
    script.removeAttribute('crossorigin');
    script.removeAttribute('defer');
    script.removeAttribute('async');
    script.setAttribute('data-bluecode-file', target);
    script.textContent = code;
  });

  doc.querySelectorAll('style').forEach((style) => {
    const base = style.getAttribute('data-bluecode-file') || entryPath;
    style.textContent = rewriteCssUrls(style.textContent, base);
    style.removeAttribute('data-bluecode-file');
  });

  doc.querySelectorAll('[style]').forEach((element) => {
    element.setAttribute('style', rewriteCssUrls(element.getAttribute('style'), entryPath));
  });

  doc.querySelectorAll('img[src], source[src], audio[src], video[src], track[src], embed[src], input[type="image"][src], object[data]').forEach((element) => {
    const attribute = element.hasAttribute('data') && element.tagName.toLowerCase() === 'object' ? 'data' : 'src';
    const target = resolveLocalPath(element.getAttribute(attribute), entryPath);
    const file = target ? getFile(project, target) : null;
    const dataUrl = dataUrlForFile(file);
    if (dataUrl) element.setAttribute(attribute, dataUrl);
  });

  doc.querySelectorAll('video[poster]').forEach((element) => {
    const target = resolveLocalPath(element.getAttribute('poster'), entryPath);
    const dataUrl = dataUrlForFile(target ? getFile(project, target) : null);
    if (dataUrl) element.setAttribute('poster', dataUrl);
  });

  doc.querySelectorAll('img[srcset], source[srcset]').forEach((element) => {
    const value = element.getAttribute('srcset');
    if (value) element.setAttribute('srcset', rewriteSrcset(value, entryPath));
  });

  const head = doc.head || doc.documentElement;
  const bridge = doc.createElement('script');
  bridge.textContent = buildBridgeScript(entryPath);
  head.insertBefore(bridge, head.firstChild);

  return `<!DOCTYPE html>\n${doc.documentElement.outerHTML}`;
}

function setPreviewEmpty(title, copy) {
  const overlay = document.getElementById('preview-empty');
  const titleElement = document.getElementById('preview-empty-title');
  const copyElement = document.getElementById('preview-empty-copy');
  if (!overlay) return;
  overlay.hidden = false;
  if (titleElement) titleElement.textContent = title;
  if (copyElement) copyElement.textContent = copy;
}

function clearPreviewEmpty() {
  const overlay = document.getElementById('preview-empty');
  if (overlay) overlay.hidden = true;
}

function setPreviewLoading(loading) {
  const canvas = document.getElementById('preview-canvas');
  if (!canvas) return;
  canvas.classList.toggle('preview-loading', loading);
}

function runPreview() {
  const project = getProject();
  const frame = document.getElementById('preview-frame');
  if (!project || !frame) return;

  if (!project.entry || !getFile(project, project.entry) || !isHtmlPath(project.entry)) {
    project.entry = chooseEntryForFiles(project.files);
  }
  renderEntrySelect();

  if (!project.entry) {
    frame.srcdoc = '<!DOCTYPE html><html><head><meta charset="utf-8"></head><body></body></html>';
    setPreviewLoading(false);
    setPreviewEmpty('Add an HTML file', 'Create an index.html file — or upload a folder with one — to see a live preview here.');
    state.consoleMessages = [];
    renderConsole();
    return;
  }

  try {
    const html = buildPreviewDocument(project, project.entry);
    clearPreviewEmpty();
    state.consoleMessages = [];
    renderConsole();
    setPreviewLoading(true);
    frame.srcdoc = html;
    if (state.previewLoadTimer) window.clearTimeout(state.previewLoadTimer);
    state.previewLoadTimer = window.setTimeout(() => setPreviewLoading(false), 1800);
  } catch (error) {
    const message = error && error.message ? error.message : 'Unable to build the preview.';
    setPreviewLoading(false);
    setPreviewEmpty('Preview could not be built', message);
    state.consoleMessages = [];
    pushConsole('error', [message]);
  }
}

function schedulePreview() {
  if (state.previewTimer) window.clearTimeout(state.previewTimer);
  state.previewTimer = window.setTimeout(() => {
    state.previewTimer = null;
    runPreview();
  }, 700);
}

function openPreviewInNewTab() {
  const project = getProject();
  if (!project || !project.entry) {
    showToast('Add an HTML file before opening the preview.', 'warning');
    return;
  }
  try {
    const html = buildPreviewDocument(project, project.entry);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 60000);
  } catch (error) {
    showToast('Could not open the preview.', 'error');
  }
}

function setPreviewDevice(device) {
  if (!['desktop', 'tablet', 'mobile'].includes(device)) return;
  state.device = device;
  const canvas = document.getElementById('preview-canvas');
  if (canvas) canvas.dataset.device = device;
  document.querySelectorAll('[data-action="set-device"]').forEach((button) => {
    const active = button.dataset.device === device;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
}

function setConsoleOpen(open) {
  state.consoleOpen = Boolean(open);
  const panel = document.getElementById('console-panel');
  const toggle = document.querySelector('[data-action="toggle-console"]');
  if (panel) panel.classList.toggle('hidden', !state.consoleOpen);
  if (toggle) toggle.setAttribute('aria-pressed', String(state.consoleOpen));
}

function clearConsole() {
  state.consoleMessages = [];
  renderConsole();
}

function pushConsole(level, args) {
  if (!['log', 'info', 'warn', 'error'].includes(level)) level = 'log';
  const messages = Array.isArray(args) ? args.map(String) : [String(args)];
  state.consoleMessages.push({ level, args: messages });
  if (state.consoleMessages.length > 200) state.consoleMessages.shift();
  renderConsole();
  if (level === 'error' && !state.consoleOpen) setConsoleOpen(true);
}

function renderConsole() {
  const list = document.getElementById('console-list');
  const count = document.getElementById('console-count');
  const status = document.getElementById('console-status');
  if (!list) return;

  const errors = state.consoleMessages.filter((message) => message.level === 'error').length;
  if (count) count.textContent = errors ? String(errors) : '';
  if (status) {
    const total = state.consoleMessages.length;
    status.textContent = total ? `${pluralize(total, 'message')}` : 'no messages';
  }

  if (!state.consoleMessages.length) {
    list.innerHTML = `<div class="console-empty">${ico('terminal')} Console is clear. Logs from the preview appear here.</div>`;
    return;
  }

  list.innerHTML = state.consoleMessages.map((message) => {
    const label = message.level === 'log' ? 'log' : message.level;
    return `<div class="console-row ${message.level}">
      <span class="console-type">${escapeHTML(label)}</span>
      <span class="console-message">${escapeHTML(message.args.join(' '))}</span>
    </div>`;
  }).join('');
  list.scrollTop = list.scrollHeight;
}

function handlePreviewMessage(event) {
  const frame = document.getElementById('preview-frame');
  if (!frame || event.source !== frame.contentWindow) return;
  const message = event.data;
  if (!message || message.__bluecode !== true) return;

  if (message.type === 'console') {
    const payload = message.payload || {};
    pushConsole(payload.level || 'log', Array.isArray(payload.args) ? payload.args : [payload.args ?? '']);
    return;
  }
  if (message.type === 'console-clear') {
    clearConsole();
    return;
  }
  if (message.type === 'navigate') {
    navigatePreview(message.payload?.href);
  }
}

function navigatePreview(href) {
  const project = getProject();
  if (!project || !href) return;
  const target = resolveLocalPath(href, project.entry || 'index.html');
  if (!target) return;
  const file = getFile(project, target);
  if (!file) {
    pushConsole('error', [`Page not found: ${target}`]);
    return;
  }
  if (isHtmlPath(target)) {
    project.entry = target;
    openFile(target);
    renderEntrySelect();
    schedulePersist();
    runPreview();
  } else {
    openFile(target);
    showToast(`Opened ${target}.`, 'info');
  }
}

function tokenSpan(className, value) {
  return `<span class="${className}">${escapeHTML(value)}</span>`;
}

function highlightTag(tag) {
  const match = /^<(\/?)([A-Za-z][\w:-]*)([\s\S]*?)(\/?)>$/.exec(tag);
  if (!match) return tokenSpan('tok-punc', tag);
  const [, slash, name, attributeText, selfClosing] = match;
  let output = `<span class="tok-punc">&lt;${slash}</span><span class="tok-tag">${escapeHTML(name)}</span>`;
  const attributePattern = /(\s+)([^\s=<>/]+)(?:(\s*=\s*)("[^"]*"|'[^']*'|[^\s"'=<>`]+))?/g;
  let lastIndex = 0;
  let attribute;
  while ((attribute = attributePattern.exec(attributeText))) {
    output += escapeHTML(attributeText.slice(lastIndex, attribute.index));
    output += escapeHTML(attribute[1]);
    output += `<span class="tok-attr">${escapeHTML(attribute[2])}</span>`;
    if (attribute[3]) {
      output += `<span class="tok-punc">${escapeHTML(attribute[3])}</span>`;
      output += tokenSpan('tok-string', attribute[4] || '');
    }
    lastIndex = attributePattern.lastIndex;
  }
  output += escapeHTML(attributeText.slice(lastIndex));
  output += `<span class="tok-punc">${selfClosing ? '/' : ''}&gt;</span>`;
  return output;
}

function highlightHTML(code) {
  const pattern = /<!--[\s\S]*?-->|<!DOCTYPE[^>]*>|<\/?[A-Za-z](?:[^>"']|"[^"]*"|'[^']*')*>/gi;
  let output = '';
  let lastIndex = 0;
  let match;
  while ((match = pattern.exec(code))) {
    output += escapeHTML(code.slice(lastIndex, match.index));
    const token = match[0];
    if (token.startsWith('<!--')) {
      output += tokenSpan('tok-comment', token);
    } else if (/^<!doctype/i.test(token)) {
      output += tokenSpan('tok-keyword', token);
    } else {
      output += highlightTag(token);
    }
    lastIndex = pattern.lastIndex;
  }
  output += escapeHTML(code.slice(lastIndex));
  return output;
}

function highlightCSS(code) {
  const pattern = /(\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(@[\w-]+)|(#[0-9a-fA-F]{3,8}\b)|(\b(?:0[xX][0-9a-fA-F]+|\d+(?:\.\d+)?)(?:[a-z%]+)?\b)|([\w-]+)(?=\s*:)|((?:[.#]?[\w-]+)(?:[^{};\n]*?))(?=\s*\{)|([{}();:,])/g;
  let output = '';
  let lastIndex = 0;
  let match;
  while ((match = pattern.exec(code))) {
    output += escapeHTML(code.slice(lastIndex, match.index));
    if (match[1]) output += tokenSpan('tok-comment', match[1]);
    else if (match[2]) output += tokenSpan('tok-string', match[2]);
    else if (match[3]) output += tokenSpan('tok-atrule', match[3]);
    else if (match[4]) output += tokenSpan('tok-number', match[4]);
    else if (match[5]) output += tokenSpan('tok-number', match[5]);
    else if (match[6]) output += tokenSpan('tok-property', match[6]);
    else if (match[7]) output += tokenSpan('tok-selector', match[7]);
    else if (match[8]) output += tokenSpan('tok-punc', match[8]);
    else output += escapeHTML(match[0]);
    lastIndex = pattern.lastIndex;
  }
  output += escapeHTML(code.slice(lastIndex));
  return output;
}

function highlightJS(code) {
  const pattern = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|(\b(?:const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|new|class|extends|super|import|export|from|as|async|await|try|catch|finally|throw|typeof|instanceof|in|of|delete|void|yield|static|get|set|this)\b)|(\b(?:true|false|null|undefined|NaN|Infinity)\b)|(\b(?:0[xX][\da-fA-F]+|\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\b)|([A-Za-z_$][\w$]*)(?=\s*\()|([{}()[\];,.:?=+\-*\/%<>!&|]+)/g;
  let output = '';
  let lastIndex = 0;
  let match;
  while ((match = pattern.exec(code))) {
    output += escapeHTML(code.slice(lastIndex, match.index));
    if (match[1]) output += tokenSpan('tok-comment', match[1]);
    else if (match[2]) output += tokenSpan('tok-string', match[2]);
    else if (match[3]) output += tokenSpan('tok-keyword', match[3]);
    else if (match[4]) output += tokenSpan('tok-bool', match[4]);
    else if (match[5]) output += tokenSpan('tok-number', match[5]);
    else if (match[6]) output += tokenSpan('tok-function', match[6]);
    else if (match[7]) output += tokenSpan('tok-punc', match[7]);
    else output += escapeHTML(match[0]);
    lastIndex = pattern.lastIndex;
    if (match[0].length === 0) pattern.lastIndex += 1;
  }
  output += escapeHTML(code.slice(lastIndex));
  return output;
}

function highlightCode(code, language) {
  if (language === 'html') return highlightHTML(code);
  if (language === 'css') return highlightCSS(code);
  if (language === 'js') return highlightJS(code);
  return escapeHTML(code);
}

function closeMobilePanels() {
  document.body.classList.remove('show-files', 'show-preview');
  if (dom.scrim) dom.scrim.hidden = true;
}

function toggleMobilePanel(name) {
  const className = `show-${name}`;
  const isOpen = document.body.classList.contains(className);
  document.body.classList.remove('show-files', 'show-preview');
  if (!isOpen) document.body.classList.add(className);
  if (dom.scrim) dom.scrim.hidden = !document.body.classList.contains('show-files') && !document.body.classList.contains('show-preview');
}

function handleGlobalClick(event) {
  const menuButton = event.target.closest('[data-menu-action]');
  if (menuButton) {
    event.preventDefault();
    const action = menuButton.dataset.menuAction;
    const id = menuButton.dataset.id;
    closeMenu();
    if (action === 'rename-project') openRenameProjectModal(id);
    else if (action === 'duplicate-project') duplicateProject(id);
    else if (action === 'delete-project') openDeleteProjectModal(id);
    return;
  }

  if (event.target.closest('#modal-root')) return;

  const actionElement = event.target.closest('[data-action]');
  if (!actionElement) return;
  const action = actionElement.dataset.action;

  if (action === 'new-project') {
    openCreateProjectModal();
    return;
  }
  if (action === 'clear-search') {
    state.search = '';
    const input = document.getElementById('project-search');
    if (input) input.value = '';
    renderProjectResults();
    return;
  }
  if (action === 'open-project') {
    navigateToProject(actionElement.dataset.id);
    return;
  }
  if (action === 'project-menu') {
    showProjectMenu(actionElement, actionElement.dataset.id || state.currentId);
    return;
  }
  if (action === 'back') {
    goHome();
    return;
  }
  if (action === 'toggle-files') {
    toggleMobilePanel('files');
    return;
  }
  if (action === 'toggle-preview') {
    toggleMobilePanel('preview');
    return;
  }
  if (action === 'run') {
    runPreview();
    return;
  }
  if (action === 'new-file') {
    openNewFileModal();
    return;
  }
  if (action === 'new-folder') {
    openNewFolderModal();
    return;
  }
  if (action === 'upload-files') {
    openFilePicker(false);
    return;
  }
  if (action === 'upload-folder') {
    openFilePicker(true);
    return;
  }
  if (action === 'open-file' || action === 'open-tab') {
    openFile(actionElement.dataset.path);
    return;
  }
  if (action === 'close-tab') {
    event.stopPropagation();
    closeTab(actionElement.dataset.path);
    return;
  }
  if (action === 'toggle-folder') {
    toggleFolder(actionElement.dataset.path);
    return;
  }
  if (action === 'rename-node') {
    openRenameNodeModal(actionElement.dataset.kind, actionElement.dataset.path);
    return;
  }
  if (action === 'delete-node') {
    openDeleteNodeModal(actionElement.dataset.kind, actionElement.dataset.path);
    return;
  }
  if (action === 'refresh-preview') {
    runPreview();
    return;
  }
  if (action === 'open-preview') {
    openPreviewInNewTab();
    return;
  }
  if (action === 'toggle-console') {
    setConsoleOpen(!state.consoleOpen);
    return;
  }
  if (action === 'clear-console') {
    clearConsole();
    return;
  }
  if (action === 'set-device') {
    setPreviewDevice(actionElement.dataset.device);
  }
}

function handleGlobalInput(event) {
  if (event.target.id === 'project-search') {
    state.search = event.target.value;
    renderProjectResults();
    return;
  }
  if (event.target.id === 'project-name-input') {
    const project = getProject();
    if (!project) return;
    project.name = event.target.value.slice(0, 80);
    document.title = project.name ? `${project.name} — BlueCode` : 'BlueCode';
    schedulePersist();
  }
}

function commitProjectName() {
  const project = getProject();
  const input = document.getElementById('project-name-input');
  if (!project || !input) return;
  const name = input.value.trim().slice(0, 80) || 'Untitled project';
  project.name = name;
  input.value = name;
  touchProject(project);
  document.title = `${name} — BlueCode`;
  persistNow();
}

function handleGlobalKeydown(event) {
  if (event.key === 'Escape') {
    if (dom.modalRoot && dom.modalRoot.firstElementChild) {
      closeModal();
      return;
    }
    if (dom.menuRoot && dom.menuRoot.firstElementChild) {
      closeMenu();
      return;
    }
    if (document.body.classList.contains('show-files') || document.body.classList.contains('show-preview')) {
      closeMobilePanels();
      return;
    }
    const search = document.getElementById('project-search');
    if (search && document.activeElement === search && search.value) {
      search.value = '';
      state.search = '';
      renderProjectResults();
      return;
    }
  }

  if ((event.ctrlKey || event.metaKey) && !event.altKey && event.key.toLowerCase() === 's') {
    if (!getProject()) return;
    event.preventDefault();
    commitProjectName();
    if (persistNow()) showToast('Project saved locally.', 'success', 1600);
    return;
  }

  if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
    if (!getProject()) return;
    event.preventDefault();
    runPreview();
    return;
  }

  if (event.key === 'Enter' || event.key === ' ') {
    const target = event.target;
    if (target.closest('button, input, textarea, select, a')) return;
    const card = target.closest('.project-card');
    const row = target.closest('.tree-row');
    if (card || row) {
      event.preventDefault();
      (card || row).click();
    }
  }
}

function bindGlobalEvents() {
  document.addEventListener('click', handleGlobalClick);
  document.addEventListener('input', handleGlobalInput);
  document.addEventListener('keydown', handleGlobalKeydown);
  document.addEventListener('focusout', (event) => {
    if (event.target.id === 'project-name-input') commitProjectName();
  });

  window.addEventListener('hashchange', routeFromHash);
  window.addEventListener('message', handlePreviewMessage);
  window.addEventListener('resize', () => {
    closeMenu();
    if (window.innerWidth > 960) closeMobilePanels();
  });
  window.addEventListener('beforeunload', flushPendingSave);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') flushPendingSave();
  });

  dom.scrim?.addEventListener('click', closeMobilePanels);

  dom.fileInput?.addEventListener('change', async () => {
    const items = [...(dom.fileInput.files || [])].map((file) => ({ file, path: file.webkitRelativePath || file.name }));
    dom.fileInput.value = '';
    await handleUploadItems(items);
  });

  dom.folderInput?.addEventListener('change', async () => {
    const items = [...(dom.folderInput.files || [])].map((file) => ({ file, path: file.webkitRelativePath || file.name }));
    dom.folderInput.value = '';
    await handleUploadItems(items);
  });

  window.addEventListener('dragover', (event) => {
    if (hasDraggedFiles(event)) event.preventDefault();
  });
  window.addEventListener('drop', (event) => {
    if (!hasDraggedFiles(event)) return;
    if (event.target.closest && event.target.closest('#file-panel')) return;
    event.preventDefault();
    if (getProject()) showToast('Drop files or folders onto the Explorer panel to upload them.', 'info');
  });

  window.addEventListener('blur', flushPendingSave);
}

function init() {
  state.projects = loadProjects();
  state.previewWidth = loadPrefs().previewWidth;
  bindGlobalEvents();
  routeFromHash();

  if (!storageAvailable) {
    window.setTimeout(() => {
      showToast('Browser storage is blocked, so projects cannot be saved. Run BlueCode from a local server.', 'error', 9000);
    }, 700);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

