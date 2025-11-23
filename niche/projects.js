// ./niche/projects.js
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

    const heading = document.createElement('h2');
    heading.textContent = 'PROJECTS';
    projectdiv.appendChild(heading);

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

  function populateHomeProjects(varprojects) {
    if (!Array.isArray(varprojects) || varprojects.length === 0) return;

    const homeListContainer = document.getElementById('home-projects-list');
    if (!homeListContainer) return;

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

      const varprojects = collectprojects();
      populateHomeProjects(varprojects);
    });
  } else {
    attachmenu();

    const varprojects = collectprojects();
    populateHomeProjects(varprojects);
  }

    window.populateHomeProjectsFromSources = function () {
      try {
        const varprojects = collectprojects();
        populateHomeProjects(varprojects);
      } catch (err) {
        console.warn('populateHomeProjectsFromSources error', err);
      }
    };

})();
