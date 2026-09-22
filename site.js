// DevWright — shared site behavior used by all pages:
// - persists dark/light theme and UI language choice across pages (localStorage)
// - a clipboard-copy helper with a legacy execCommand fallback
(function (window) {
  const SITE_PREFS_KEY = 'formatly_site_prefs';

  function loadSitePrefs() {
    try {
      const raw = localStorage.getItem(SITE_PREFS_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function saveSitePrefs(partial) {
    try {
      const current = loadSitePrefs();
      localStorage.setItem(SITE_PREFS_KEY, JSON.stringify(Object.assign({}, current, partial)));
    } catch (e) {
      // localStorage unavailable (private browsing, quota, etc.) - fail silently
    }
  }

  // Wires a theme-toggle button to the shared dark/light preference and applies
  // it immediately. Call this once per page, right after grabbing the button.
  function setupThemeToggle(themeToggleEl, defaultTheme) {
    function applyTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      if (themeToggleEl) themeToggleEl.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
    let current = loadSitePrefs().theme || defaultTheme || 'light';
    applyTheme(current);
    if (themeToggleEl) {
      themeToggleEl.addEventListener('click', () => {
        current = current === 'dark' ? 'light' : 'dark';
        applyTheme(current);
        saveSitePrefs({ theme: current });
      });
    }
    return { getTheme: () => current };
  }

  // Returns the shared saved UI language, or defaultLang if none is saved yet.
  function getSharedLang(defaultLang) {
    return loadSitePrefs().lang || defaultLang || 'en';
  }

  // Saves the UI language choice so other pages open in the same language.
  function saveSharedLang(lang) {
    saveSitePrefs({ lang: lang });
  }

  // Copies text to the clipboard: prefers the modern Clipboard API, falling
  // back to the older execCommand('copy') for non-secure contexts (e.g. a
  // page opened directly from disk via file://).
  async function copyTextToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (e) {
        // fall through to the legacy fallback below
      }
    }
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.top = '-1000px';
      ta.style.left = '-1000px';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch (e) {
      return false;
    }
  }

  // Wires a sidebar toggle button to a persisted collapsed/expanded state,
  // applied immediately (no flash of the wrong state) and shared across pages.
  // The icon stays a hamburger ("☰") in both states; only the title/aria-label
  // change to reflect what the next click will do.
  function setupSidebar(toggleBtn, appLayoutEl) {
    let collapsed = loadSitePrefs().sidebarCollapsed;
    if (typeof collapsed !== 'boolean') collapsed = false;
    function apply(state) {
      collapsed = state;
      if (appLayoutEl) appLayoutEl.classList.toggle('sidebar-collapsed', collapsed);
      if (toggleBtn) {
        toggleBtn.textContent = '☰';
        const label = collapsed ? 'Expand sidebar' : 'Collapse sidebar';
        toggleBtn.setAttribute('aria-label', label);
        toggleBtn.setAttribute('title', label);
      }
    }
    apply(collapsed);
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        apply(!collapsed);
        saveSitePrefs({ sidebarCollapsed: collapsed });
      });
    }
    return { isCollapsed: () => collapsed };
  }

  window.DevWrightSite = {
    loadSitePrefs,
    saveSitePrefs,
    setupThemeToggle,
    setupSidebar,
    getSharedLang,
    saveSharedLang,
    copyTextToClipboard
  };
})(window);
