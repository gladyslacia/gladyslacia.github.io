// ./niche/skills.js
(function () {
  const SOURCES = () => (window.sourceniches || []);
  const TARGET_ID = 'technical-skills';
  const MENU_ID = 'topmenu';

  function safeParse(html) {
    try {
      return new DOMParser().parseFromString(html, 'text/html');
    } catch (err) {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = html || '';
      const doc = document.implementation.createHTMLDocument('tmp');
      doc.body.appendChild(wrapper);
      return doc;
    }
  }

  // Collect <li> items from the UL that follows an H3 containing "technical" (case-insensitive)
  function collectTechnicalSkills() {
    const items = [];
    const srcs = SOURCES();
    if (!Array.isArray(srcs) || srcs.length === 0) return items;

    srcs.forEach(function (varName) {
      const fromhtml = window[varName];
      if (!fromhtml || typeof fromhtml !== 'string') return;

      const doc = safeParse(fromhtml);
      if (!doc) return;

      // find H3 that contains the word 'technical' (case-insensitive)
      const h3s = Array.from(doc.querySelectorAll('h3'));
      let found = false;
      for (let i = 0; i < h3s.length; i++) {
        const h3 = h3s[i];
        if (h3.textContent && /technical/i.test(h3.textContent.trim())) {
          // find the next element sibling that's a UL
          let next = h3.nextSibling;
          while (next && next.nodeType !== Node.ELEMENT_NODE) {
            next = next.nextSibling;
          }
          if (next && next.tagName && next.tagName.toLowerCase() === 'ul') {
            const lis = Array.from(next.querySelectorAll('li'));
            lis.forEach(function (li) {
              // include niche label so we know the origin
              items.push({
                text: li.innerHTML.trim(),
                source: (varName || '').toString()
              });
            });
            found = true;
            break; // only use first matching UL after the H3
          } else {
            // no ul after H3
          }
        }
      }
      // If no H3 matched, try fallback: look for any UL with "technical" words nearby
      if (!found) {
        const uls = Array.from(doc.querySelectorAll('ul'));
        uls.forEach(function (ul) {
          // heuristics: if the preceding heading or a previous element includes 'technical'
          let prev = ul.previousElementSibling;
          if (prev && /technical/i.test(prev.textContent || '')) {
            const lis = Array.from(ul.querySelectorAll('li'));
            lis.forEach(function (li) {
              items.push({ text: li.innerHTML.trim(), source: (varName || '').toString() });
            });
          }
        });
      }
    });

    // Map source code names to friendly labels when possible
    const niceNames = {};
    try {
      // window.setniches and window.sourceniches are parallel arrays in your code
      if (Array.isArray(window.sourceniches) && Array.isArray(window.setniches)) {
        window.sourceniches.forEach(function (k, i) {
          niceNames[k] = window.setniches[i] || k;
        });
      }
    } catch (ex) { /* ignore */ }

    // convert into final array of strings, prefixing with source name
    return items.map(function (it) {
      const label = niceNames[it.source] || it.source || '';
      return label ? (it.text + ' &mdash; ' + label) : it.text;
    });
  }

  function buildNode(items) {
    const container = document.createElement('div');
    container.id = TARGET_ID;
    container.style.marginTop = '18px';

    const heading = document.createElement('h2');
    heading.textContent = 'TECHNICAL SKILLS';
    container.appendChild(heading);

    if (!items || items.length === 0) {
      const p = document.createElement('p');
      p.textContent = 'No technical skills found.';
      container.appendChild(p);
      return container;
    }

    const ol = document.createElement('ol');
    items.forEach(function (inner) {
      const li = document.createElement('li');
      li.innerHTML = inner;
      ol.appendChild(li);
    });

    container.appendChild(ol);
    return container;
  }

  function insertAfterProfile(newNode) {
    const profile = document.querySelector('.profile');
    if (!profile || !newNode) return;
    const parent = profile.parentNode;
    if (!parent) return;

    const existing = document.getElementById(TARGET_ID);
    if (existing) {
      parent.replaceChild(newNode, existing);
      return;
    }

    if (profile.nextSibling) parent.insertBefore(newNode, profile.nextSibling);
    else parent.appendChild(newNode);
  }

  function removeNode() {
    const existing = document.getElementById(TARGET_ID);
    if (existing) existing.remove();
  }

  function showTechnicalSkills() {
    const items = collectTechnicalSkills();
    const node = buildNode(items);
    insertAfterProfile(node);
    // scroll into view for convenience
    setTimeout(function () {
      const t = document.getElementById(TARGET_ID);
      if (t && typeof t.scrollIntoView === 'function') t.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }

  function attachMenuListener() {
    const menu = document.getElementById(MENU_ID);
    if (!menu) return;

    menu.addEventListener('click', function (e) {
      const btn = e.target.closest('.menu-btn[data-key]');
      if (!btn) return;
      const key = btn.dataset.key;

      if (key === 'can') {
        showTechnicalSkills();
      } else {
        removeNode();
      }
    });

    // also remove when Home button clicked
    document.addEventListener('click', function (e) {
      const homeBtn = e.target.closest('#home-btn');
      if (homeBtn) removeNode();
    });
  }

  function initWithRetries(maxAttempts = 10, delay = 200) {
    let attempts = 0;
    function tryInit() {
      attempts++;
      const srcs = SOURCES();
      const haveSources = Array.isArray(srcs) && srcs.length > 0;
      const haveSourceValues = haveSources && srcs.some(n => typeof window[n] === 'string');

      if (haveSources && haveSourceValues) {
        attachMenuListener();
      } else {
        if (attempts < maxAttempts) {
          setTimeout(tryInit, delay);
        } else {
          // still attach menu so click will attempt to collect later
          attachMenuListener();
          console.warn('skills.js: sources not ready after retries. Ensure skills.js is loaded after your niche scripts and that window.sourceniches/window.<source> variables are defined.');
        }
      }
    }
    tryInit();
  }

  // public helper for manual repopulation (consistent with your other helpers)
  window.populateTechnicalSkillsFromSources = function () {
    try {
      const items = collectTechnicalSkills();
      const node = buildNode(items);
      insertAfterProfile(node);
    } catch (err) {
      console.warn('populateTechnicalSkillsFromSources error', err);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { initWithRetries(12, 200); });
  } else {
    initWithRetries(12, 200);
  }
})();

