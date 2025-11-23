{/* <script> */}
(function () {
  const menu = document.getElementById('topmenu');
  const vardetails = document.getElementById('details');
  const original = vardetails.innerHTML;
  const resumecontent = document.getElementById('resume');
  const homecontent = document.getElementById('home'); // <-- use home div

  const niche = window.setniches;

  const target = {
    who: window.getNicheButtonsHTML(),
    // who: 
      // niche
      //   .map(function(item){
      //     return "<p><button class='niche-btn'>" + item + "</button></p>";
      //   })
      //   .join(""),

    done: "<p>Projects and accomplishments go here.</p>",
    learned: "<p>Skills and learning highlights go here.</p>",
    can: "<p>What I can do: list of services or skills.</p>"
  };

  function menubuttons() {
    return Array.prototype.slice.call(menu.querySelectorAll('.menu-btn[data-key]'));
  }

  function activemenu(btn) {
    menubuttons().forEach(function(b){
      b.classList.toggle('active', b === btn);
    });
  }

  function hideResume() {
    resumecontent.style.display = 'none';
    resumecontent.innerHTML = "";
  }

  function hideHome() {
    if (!homecontent) return;
    homecontent.style.display = 'none';
    // keep HTML so it can be re-shown
  }

  function addhomebutton() {
    if (document.getElementById('home-btn')) return;

    const home = document.createElement('button');
    home.id = 'home-btn';
    home.className = 'menu-btn';
    home.textContent = 'Home';

    home.addEventListener('click', function () {
      // restore details
      vardetails.innerHTML = original;

      // hide resume
      hideResume();

      if (homecontent) {
        homecontent.innerHTML = window.homeContent || "";
        homecontent.style.display = 'block';

        // populate the home projects list if the helper exists
        if (typeof window.populateHomeProjectsFromSources === 'function') {
          // run immediately
          window.populateHomeProjectsFromSources();
        }

        // populate the home trainings list if the helper exists
        if (typeof window.populateTrainingsFromSources === 'function') {
          window.populateTrainingsFromSources();
        }
      }

      menubuttons().forEach(function(b){
        b.classList.remove('active');
      });

      const existingHome = document.getElementById('home-btn');
      if (existingHome) existingHome.remove();
    });

    menu.prepend(home);
  }

  function clickmenu(e) {
    const key = e.currentTarget.dataset.key;
    if (!key) return;

    activemenu(e.currentTarget);

    // hide home and resume when viewing a menu section
    hideHome();
    hideResume();

    vardetails.innerHTML = target[key] || original;

    addhomebutton();
  }

  function menuactions() {
    menubuttons().forEach(function(btn){
      btn.removeEventListener('click', clickmenu);
      btn.addEventListener('click', clickmenu);
    });
  }

// --- Shared niche selection handler ---
  function handleNicheSelection(name) {
    name = (name || "").trim();
    if (!name) return;

    // ensure Home button is present (so user can return later)
    if (typeof addhomebutton === 'function') addhomebutton();

    // mark the "Who am I?" menu button active so UI matches behavior
    var whoBtn = menu.querySelector('.menu-btn[data-key="who"]');
    if (whoBtn) activemenu(whoBtn);

    // show niche summary in details
    vardetails.innerHTML = (window.niches && window.niches[name]) || "<p>" + name + "</p>";

    // hide home when showing a niche resume
    hideHome();

    // show specific resume content if available
    if (name === "SEO Content Writer") {
      resumecontent.innerHTML = window.seocontentwriter || "";
      resumecontent.style.display = 'block';
    } else if (name === "General VA") {
      resumecontent.innerHTML = window.virtualassistant || "";
      resumecontent.style.display = 'block';
    } else if (name === "Data Analyst") {
      resumecontent.innerHTML = window.datascience || "";
      resumecontent.style.display = 'block';
    } else {
      hideResume();
    }

    // scroll to resume
    resumecontent.scrollIntoView({ behavior: 'smooth' });
  }
  
  // wire up clicks in the #details area (original behavior)
  vardetails.addEventListener('click', function(e){
    if (e.target.matches('.niche-btn')) {
      const name = e.target.textContent;
      handleNicheSelection(name);
    }
  });

  // ALSO wire up clicks inside the #home area so the same buttons behave identically
  if (homecontent) {
    homecontent.addEventListener('click', function(e){
      if (e.target.matches('.niche-btn')) {
        const name = e.target.textContent;
        handleNicheSelection(name);
      }
    });
  }

  menuactions();

  // If we have a home div, populate it and show it immediately.
  if (homecontent) {
    // populate from niche/home.js if available
    if (typeof window.homeContent === 'string' && window.homeContent.trim() !== '') {
      homecontent.innerHTML = window.homeContent;
    }
    // make sure it is visible
    homecontent.style.display = 'block';

    // populate home projects/trainings if helpers exist
    if (typeof window.populateHomeProjectsFromSources === 'function') {
      window.populateHomeProjectsFromSources();
    }
    if (typeof window.populateTrainingsFromSources === 'function') {
      window.populateTrainingsFromSources();
    }

    // ensure Home button exists so user can return to "home" view after clicking other menus
    // (optional) addhomebutton();
  }
})();
{/* </script> */}
