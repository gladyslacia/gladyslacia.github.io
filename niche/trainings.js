// ./niche/trainings.js
(function () {
  const SOURCES = () => (window.sourceniches || []);
  const TARGET_ID = 'trainings-page';
  const HOME_LIST_ID = 'home-trainings-list';
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

  function collectTrainings() {
    const items = [];
    const srcs = SOURCES();
    if (!Array.isArray(srcs) || srcs.length === 0) {
      console.debug('trainings: no window.sourceniches defined or empty');
      return items;
    }

    srcs.forEach(function (varName) {
      const fromhtml = window[varName];
      if (!fromhtml || typeof fromhtml !== 'string') {
        console.debug('trainings: source missing or not string for', varName);
        return;
      }

      const doc = safeParse(fromhtml);
      if (!doc) return;

      const h2s = Array.from(doc.querySelectorAll('h2'));
      for (let i = 0; i < h2s.length; i++) {
        const h2 = h2s[i];
        if (h2.textContent && /cert/i.test(h2.textContent.trim())) {
          let next = h2.nextSibling;
          while (next && next.nodeType !== Node.ELEMENT_NODE) {
            next = next.nextSibling;
          }
          if (next && next.tagName && next.tagName.toLowerCase() === 'ul') {
            const lis = Array.from(next.querySelectorAll('li'));
            lis.forEach(function (li) {
              const text = li.innerHTML.trim();
              if (text) items.push(text);
            });
            break; 
          } else {
            console.debug('trainings: found H2 but no UL after it for', varName, h2.textContent.trim());
          }
        }
      }
    });

    console.debug('trainings: collected items count =', items.length);
    return items;
  }

  function buildTrainingsNode(items) {
    const container = document.createElement('div');
    container.id = TARGET_ID;
    container.style.marginTop = '18px';

    const heading = document.createElement('h2');
    heading.textContent = 'TRAININGS';
    container.appendChild(heading);

    if (!items || items.length === 0) {
      const p = document.createElement('p');
      p.textContent = 'No certificates or trainings found.';
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

  function populateHomeTrainings(items) {
    const container = document.getElementById(HOME_LIST_ID);
    if (!container) {
      console.debug('trainings: #home-trainings-list not found; skipping home population');
      return;
    }

    container.innerHTML = '';

    if (!items || items.length === 0) {
      container.innerHTML = '<p>No trainings found.</p>';
      return;
    }

    const ol = document.createElement('ol');
    items.forEach(inner => {
      const li = document.createElement('li');
      li.innerHTML = inner;
      ol.appendChild(li);
    });

    container.appendChild(ol);
    console.debug('trainings: populated #home-trainings-list with', items.length, 'items');
  }

  function insertAfterProfile(newNode) {
    const profile = document.querySelector('.profile');
    if (!profile || !newNode) {
      console.debug('trainings: cannot insertAfterProfile - .profile or newNode missing');
      return;
    }
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

  function removeTrainingsNode() {
    const existing = document.getElementById(TARGET_ID);
    if (existing) existing.remove();
  }

  function showTrainings() {
    const items = collectTrainings();
    const node = buildTrainingsNode(items);
    insertAfterProfile(node);
    populateHomeTrainings(items);
    setTimeout(function () {
      const t = document.getElementById(TARGET_ID);
      if (t && typeof t.scrollIntoView === 'function') t.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }

  function attachMenuListener() {
    const menu = document.getElementById(MENU_ID);
    if (!menu) {
      console.debug('trainings: topmenu not found');
      return;
    }

    menu.addEventListener('click', function (e) {
      const btn = e.target.closest('.menu-btn[data-key]');
      if (!btn) return;
      const key = btn.dataset.key;

      if (key === 'learned') {
        showTrainings();
      } else {
        removeTrainingsNode();
      }
    });

    document.addEventListener('click', function (e) {
      const homeBtn = e.target.closest('#home-btn');
      if (homeBtn) removeTrainingsNode();
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
        console.debug('trainings: sources ready; attaching listeners and populating home');
        attachMenuListener();
        const initial = collectTrainings();
        populateHomeTrainings(initial);
      } else {
        if (attempts < maxAttempts) {
          console.debug('trainings: sources not ready yet (attempt', attempts, '), retrying in', delay, 'ms');
          setTimeout(tryInit, delay);
        } else {
          console.warn('trainings: sources not available after retries. make sure trainings.js is loaded after your niche scripts and window.sourceniches/window.<source> variables are defined.');
          attachMenuListener();
        }
      }
    }
    tryInit();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initWithRetries(12, 200); // ~2.4s total retry window
    });
  } else {
    initWithRetries(12, 200);
  }

    window.populateTrainingsFromSources = function () {
    try {
        const items = collectTrainings();
        populateHomeTrainings(items);

        const existing = document.getElementById(TARGET_ID);
        if (existing) {
        const node = buildTrainingsNode(items);
        existing.parentNode.replaceChild(node, existing);
        }
    } catch (err) {
        console.warn('populateTrainingsFromSources error', err);
    }
    };

})();
