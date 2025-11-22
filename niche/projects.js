(function () {

  const PROJECTSOURCES = window.sourceniches;
  const ADDPROJECTS = 'projects-page';

  function displayprojects(fromhtml) {
    try {
      return new DOMParser().parseFromString(fromhtml, 'text/html');
    } catch (err) {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = fromhtml || '';
      const documentdisplay = document.implementation.createHTMLDocument('tmp');
      documentdisplay.body.appendChild(wrapper);
      return documentdisplay;
    }
  }

  function collectprojects() {
    const varprojects = [];

    if (!Array.isArray(PROJECTSOURCES)) return varprojects;

    PROJECTSOURCES.forEach(function (varName) {
      const fromhtml = window[varName];
      if (!fromhtml || typeof fromhtml !== 'string') return;

      const documentdisplay = displayprojects(fromhtml);
      if (!documentdisplay) return;

      const pprojects = Array.from(documentdisplay.querySelectorAll('p.projects'));

      pprojects.forEach(function (p) {
        let next = p.nextSibling;
        // skip non-element nodes (text, comments)
        while (next && next.nodeType !== Node.ELEMENT_NODE) {
          next = next.nextSibling;
        }
        if (next && next.tagName && next.tagName.toLowerCase() === 'ol') {
          const liprojects = Array.from(next.querySelectorAll('li'));
          liprojects.forEach(function (li) {
            varprojects.push(li.innerHTML.trim());
          });
        }
      });
    });

    return varprojects;
  }

  function buildprojectspage(varprojects) {
    const projectdiv = document.createElement('div');
    projectdiv.id = ADDPROJECTS;

    const heading = document.createElement('p');
    heading.className = 'projects';
    heading.textContent = 'PROJECTS'; // optional visible heading

    const ol = document.createElement('ol');
    varprojects.forEach(function (inner) {
      const li = document.createElement('li');
      li.innerHTML = inner;
      ol.appendChild(li);
    });

    projectdiv.appendChild(heading);
    projectdiv.appendChild(ol);
    return projectdiv;
  }

  function insert(newNode, referenceNode) {
    const parent = referenceNode.parentNode;
    if (!parent) return;
    if (referenceNode.nextSibling) parent.insertBefore(newNode, referenceNode.nextSibling);
    else parent.appendChild(newNode);
  }

  // New: populate the #home-projects-list element (if present) with the collected projects
  function populateHomeProjects(varprojects) {
    if (!Array.isArray(varprojects) || varprojects.length === 0) return;

    const homeListContainer = document.getElementById('home-projects-list');
    if (!homeListContainer) return;

    // Clear any existing content
    homeListContainer.innerHTML = '';

    const ol = document.createElement('ol');
    varprojects.forEach(function (inner) {
      const li = document.createElement('li');
      li.innerHTML = inner;
      ol.appendChild(li);
    });

    homeListContainer.appendChild(ol);
  }

  function showprojects() {
    if (document.getElementById(ADDPROJECTS)) return;
    const varprojects = collectprojects();
    if (!varprojects || varprojects.length === 0) return;

    const block = buildprojectspage(varprojects);
    const profile = document.querySelector('.profile');
    if (!profile) return;
    insert(block, profile);

    // Also populate home projects list if it exists
    populateHomeProjects(varprojects);
  }

  function removeprojects() {
    const existing = document.getElementById(ADDPROJECTS);
    if (existing) existing.remove();
  }

  function attachmenu() {
    const menu = document.getElementById('topmenu');
    if (!menu) return;

    menu.addEventListener('click', function (e) {
      const btn = e.target.closest('.menu-btn[data-key]');
      if (!btn) return;
      const key = btn.dataset.key;

      if (key === 'done') {
        setTimeout(showprojects, 0);
      } else {
        removeprojects();
      }
    });

    document.addEventListener('click', function (e) {
      const home = e.target.closest('#home-btn');
      if (home) removeprojects();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      attachmenu();

      // Populate home projects list on load (if home exists)
      const varprojects = collectprojects();
      populateHomeProjects(varprojects);
    });
  } else {
    attachmenu();

    // Populate home projects list immediately if DOM is ready
    const varprojects = collectprojects();
    populateHomeProjects(varprojects);
  }

})();
