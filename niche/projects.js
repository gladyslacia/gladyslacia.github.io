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

  // ???
  // window.collectedProjects = collectprojects;

  function buildprojectspage(varprojects) {
    const projectdiv = document.createElement('div');
    projectdiv.id = ADDPROJECTS;

    const heading = document.createElement('p');
    heading.className = 'projects';

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

  function showprojects() {
    if (document.getElementById(ADDPROJECTS)) return;
    const varprojects = collectprojects();
    if (!varprojects || varprojects.length === 0) return;

    const block = buildprojectspage(varprojects);
    const profile = document.querySelector('.profile');
    if (!profile) return;
    insert(block, profile);
  }

  function removeprojects() {
    const existing = document.getElementById(ADDPROJECTS);
    if (existing) existing.remove();
  }

  // // replace showprojects()
  // function showprojects() {
  //   // if we have an explicit projects block inserted (ADDPROJECTS) then don't duplicate
  //   if (document.getElementById(ADDPROJECTS)) return;

  //   const varprojects = collectprojects();
  //   if (!varprojects || varprojects.length === 0) return;

  //   const block = buildprojectspage(varprojects);

  //   // prefer putting projects inside #home if present
  //   const home = document.getElementById('home');
  //   if (home) {
  //     // ensure there is a container inside #home to hold the projects list
  //     let targetContainer = home.querySelector('#home-projects-list');

  //     // Build an <ol> of projects
  //     const ol = document.createElement('ol');
  //     varprojects.forEach(function (inner) {
  //       const li = document.createElement('li');
  //       li.innerHTML = inner;
  //       ol.appendChild(li);
  //     });

  //     if (!targetContainer) {
  //       // if the home HTML doesn't have a container, append the whole block
  //       home.appendChild(block);
  //     } else {
  //       // clear and add the ol
  //       targetContainer.innerHTML = '';
  //       targetContainer.appendChild(ol);
  //     }

  //     // Make sure home is visible (important — other script may have hidden it)
  //     home.style.display = 'block';

  //     return;
  //   }

  //   // fallback: original behavior (insert after .profile)
  //   const profile = document.querySelector('.profile');
  //   if (!profile) return;
  //   insert(block, profile);
  // }

  // // replace removeprojects()
  // function removeprojects() {
  //   // remove any explicitly inserted projects-page block
  //   const existing = document.getElementById(ADDPROJECTS);
  //   if (existing) existing.remove();

  //   // also clear projects injected into #home-projects-list (if present)
  //   const home = document.getElementById('home');
  //   if (home) {
  //     const targetContainer = home.querySelector('#home-projects-list');
  //     if (targetContainer) {
  //       targetContainer.innerHTML = ''; // clear the list
  //     }

  //     // optionally hide the home projects area but keep the rest of #home visible:
  //     // if you want to hide the whole home on remove, uncomment next line:
  //     // home.style.display = 'none';
  //   }
  // }

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

    // homepage
    // menu.addEventListener('click', function (e) {
    //   const btn = e.target.closest('.menu-btn[data-key]');
    //   if (!btn) return;
    //   const key = btn.dataset.key;

    //   if (key === 'done') {
    //     // defer insertion so other click handlers finish (keeps behavior stable)
    //     setTimeout(showprojects, 0);
    //   } else {
    //     // remove any projects that were injected into the page/home
    //     removeprojects();
    //   }
    // });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachmenu);
  } else {
    attachmenu();
  }

})();
