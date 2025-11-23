// ./niche/trainings.js
(function () {
  const SOURCES = window.sourceniches || []; // e.g. ["seocontentwriter","virtualassistant","datascience"]
  const TARGET_ID = 'trainings-page';
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

  // Collect all training/certification <li> texts from sources
  function collectTrainings() {
    const items = [];

    if (!Array.isArray(SOURCES)) return items;

    SOURCES.forEach(function (varName) {
      const fromhtml = window[varName];
      if (!fromhtml || typeof fromhtml !== 'string') return;

      const doc = safeParse(fromhtml);
      if (!doc) return;

      // find H2 that contains the word 'cert' (case-insensitive)
      const h2s = Array.from(doc.querySelectorAll('h2'));
      for (let i = 0; i < h2s.length; i++) {
        const h2 = h2s[i];
        if (h2.textContent && /cert/i.test(h2.textContent.trim())) {
          // find the next element sibling that's a UL
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
            break; // only use first matching UL after the H2
          }
        }
      }
    });

    return items;
  }

  // Build the trainings page DOM node
  function buildTrainingsNode(items) {
    const container = document.createElement('div');
    container.id = TARGET_ID;
    container.style.marginTop = '18px';

    const heading = document.createElement('h2');
    heading.textContent = 'CERTIFICATES & TRAININGS';
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
      // preserve HTML inside each li (like links, emphasis) by setting innerHTML
      li.innerHTML = inner;
      ol.appendChild(li);
    });

    container.appendChild(ol);
    return container;
  }

  function populateHomeTrainings(items) {
    const container = document.getElementById('home-trainings-list');
    if (!container) return;

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
    }


  // Insert the trainings node immediately after the .profile element
  function insertAfterProfile(newNode) {
    const profile = document.querySelector('.profile');
    if (!profile || !newNode) return;
    const parent = profile.parentNode;
    if (!parent) return;

    // if there's already a trainings node, replace it
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

  // Populate and show trainings block (used when 'learned' is clicked)
  function showTrainings() {
    try {
      const items = collectTrainings();
      const node = buildTrainingsNode(items);
      insertAfterProfile(node);
        //   insertpopulate
        populateHomeTrainings(items);
      // scroll into view a tick later so layout settles
      setTimeout(function () {
        const t = document.getElementById(TARGET_ID);
        if (t && typeof t.scrollIntoView === 'function') t.scrollIntoView({ behavior: 'smooth' });
      }, 0);
    } catch (err) {
      console.warn('showTrainings error', err);
    }
  }

  // Attach listener to the top menu so trainings only appear on the 'learned' page
  function attachMenuListener() {
    const menu = document.getElementById(MENU_ID);
    if (!menu) return;

    menu.addEventListener('click', function (e) {
      const btn = e.target.closest('.menu-btn[data-key]');
      if (!btn) return;
      const key = btn.dataset.key;

      if (key === 'learned') {
        // show trainings
        showTrainings();
        // ensure other content that's normally shown for 'learned' is left intact
      } else {
        // remove trainings whenever another menu is shown
        removeTrainingsNode();
      }
    });

    // Also hide trainings when Home button is clicked (home button has id 'home-btn')
    document.addEventListener('click', function (e) {
      const homeBtn = e.target.closest('#home-btn');
      if (homeBtn) {
        removeTrainingsNode();
      }
    });
  }

  // init on DOM ready: do NOT show trainings by default
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      attachMenuListener();
    });
  } else {
    attachMenuListener();
    // Populate home trainings on load
    const initial = collectTrainings();
    populateHomeTrainings(initial);

  }

  // Expose helper if you ever want to programmatically re-populate
  window.populateTrainingsFromSources = function () {
    // showTrainings will replace existing node
    showTrainings();
  };

})();
