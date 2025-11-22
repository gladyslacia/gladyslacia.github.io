// niche/home.js
// Home page content: RESUMES (buttons only), PROJECTS, TRAININGS

(function () {
  function parseHTMLString(str) {
    try {
      return new DOMParser().parseFromString(str, 'text/html');
    } catch (err) {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = str || '';
      const d = document.implementation.createHTMLDocument('tmp');
      d.body.appendChild(wrapper);
      return d;
    }
  }

  function collectProjectsFromSources(sources) {
    const projects = [];
    sources.forEach(function (name) {
      const html = window[name];
      if (!html || typeof html !== 'string') return;
      const doc = parseHTMLString(html);
      const pprojects = Array.from(doc.querySelectorAll('p.projects'));
      pprojects.forEach(function (p) {
        // find next element sibling that's an OL
        let next = p.nextSibling;
        while (next && next.nodeType !== Node.ELEMENT_NODE) next = next.nextSibling;
        if (next && next.tagName && next.tagName.toLowerCase() === 'ol') {
          Array.from(next.querySelectorAll('li')).forEach(function (li) {
            projects.push(li.innerHTML.trim());
          });
        }
      });
    });
    return projects;
  }

  function collectTrainingsFromSources(sources) {
    const trainings = [];
    sources.forEach(function (name) {
      const html = window[name];
      if (!html || typeof html !== 'string') return;
      const doc = parseHTMLString(html);
      // find H2 elements that contain CERTIFICATIONS & TRAININGS (case-insensitive)
      const h2s = Array.from(doc.querySelectorAll('h2'))
        .filter(function (h) { return /certifications?\s*&\s*trainings?/i.test(h.textContent || ''); });
      h2s.forEach(function (h) {
        let next = h.nextSibling;
        while (next && next.nodeType !== Node.ELEMENT_NODE) next = next.nextSibling;
        if (next && next.tagName && next.tagName.toLowerCase() === 'ul') {
          Array.from(next.querySelectorAll('li')).forEach(function (li) {
            trainings.push(li.innerHTML.trim());
          });
        }
      });
    });
    return trainings;
  }

  function buildHomeHTML() {
    // var niches = ["SEO Content Writer", "General VA", "Data Analyst"];
    const niches = window.setniches;

    // RESUMES section: only the three buttons
    var resumes = niches.map(function (n) {
      return "<p><button class='niche-btn'>" + n + "</button></p>";
    }).join('');

    // PROJECTS section
    // var projectItems = collectProjectsFromSources(['seocontentwriter', 'virtualassistant', 'datascience']);
    var projectItems = collectProjectsFromSources(window.sourceniches);
    var projectsHTML = (projectItems && projectItems.length)
      ? ("<h2>PROJECTS</h2>" + "<ol>" + projectItems.map(function (p) { return '<li>' + p + '</li>'; }).join('') + "</ol>")
      : ("<h2>PROJECTS</h2>" + "<p>No projects found yet.</p>");

    // TRAININGS section
    // var trainingItems = collectTrainingsFromSources(['seocontentwriter', 'virtualassistant', 'datascience']);
    const trainingItems = collectTrainingsFromSources(window.sourceniches);
    var trainingsHTML = (trainingItems && trainingItems.length)
      ? ("<h2>TRAININGS</h2>" + "<ol>" + trainingItems.map(function (t) { return '<li>' + t + '</li>'; }).join('') + "</ol>")
      : ("<h2>TRAININGS</h2>" + "<p>No trainings listed yet.</p>");

    var homeHTML =
      "<h2>RESUMES</h2>" +
      "<div class='resumes-list'>" + resumes + "</div>" +
      projectsHTML +
      trainingsHTML;

    return homeHTML;
  }

  function ensureHomeContent() {
    if (!window.homeContent || typeof window.homeContent !== 'string') {
      try {
        window.homeContent = buildHomeHTML();
      } catch (err) {
        window.homeContent = "";
      }
    }
    return window.homeContent;
  }

//   function initHome() {
//     var details = document.getElementById('details');
//     if (!details) return;

//     ensureHomeContent();

//     try {
//       details.innerHTML = window.homeContent;
//     } catch (err) {
//       details.textContent = '';
//     }

//     // keep delegated listener so .niche-btn clicks still bubble to index.html's handler
//     details.addEventListener('click', function (e) {
//       // intentionally empty — index.html's main script handles these clicks
//     });
//   }
function removeHomeBlock(details) {
  var existing = details.querySelector('#home-block');
  if (existing) existing.remove();
}

function initHome() {
  var details = document.getElementById('details');
  if (!details) return;

  ensureHomeContent();

  try {
    // Remove any previous home block to avoid duplicates
    removeHomeBlock(details);

    // Create a wrapper for all Home sections so we don't overwrite the original contact info
    var wrapper = document.createElement('div');
    wrapper.id = 'home-block';
    wrapper.innerHTML = window.homeContent || '';

    // Append the home block AFTER the existing content in #details (preserves contact lines)
    details.appendChild(wrapper);
  } catch (err) {
    // If anything goes wrong, don't destroy the original details content
    // leave details as-is.
    console.error('initHome error', err);
  }

  // keep delegated listener so .niche-btn clicks still bubble to index.html's handler
  details.addEventListener('click', function (e) {
    // intentionally empty — index.html's main script handles these clicks
  });
}


  // expose helper so other scripts can force rebuild if needed
  window.ensureHomeContent = ensureHomeContent;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHome);
  } else {
    initHome();
  }

})();
