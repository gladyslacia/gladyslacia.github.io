// niche/home.js
window.homeContent = 
  "<section id='home-resumes'>" +
    "<h2>RESUMES</h2>" +
    // "<p>Pick a niche above (or below) to view the full resume. Quick links:</p>" +
    window.setniches
    .map(name => "<p><button class='niche-btn'>" + name + "</button></p>")
    .join("") +
  "</section>" +

  "<section id='home-projects' style='margin-top:18px;'>" +
    "<h2>PROJECTS</h2>" +
    // "<p>Projects and accomplishments go here:</p>" +
    "<div id='home-projects-list'></div>" +
  "</section>" +

  "<section id='home-trainings' style='margin-top:18px;'>" +
    "<h2>TRAININGS & CERTIFICATIONS</h2>" +
    "<ul>" +
      "<li>Certification 1 (you can edit these in assets/settings.js)</li>" +
      "<li>Certification 2</li>" +
      "<li>Certification 3</li>" +
    "</ul>" +
  "</section>";

// niche/home.js
// (function () {
//   // build the resumes list dynamically
//   const resumesList = window.setniches
//         .map(name => "<p><button class='niche-btn'>" + name + "</button></p>")
//         .join("");

//   // build the projects HTML using collectedProjects() if available
//   function buildProjectsHTML() {
//     try {
//       var projects = [];
//       if (typeof window.collectedProjects === 'function') {
//         projects = window.collectedProjects() || [];
//       }
//       if (!projects || projects.length === 0) {
//         return "<div id='home-projects-list'><p>No projects found yet.</p></div>";
//       }
//       var ol = "<div id='home-projects-list'><ol>";
//       projects.forEach(function(p){
//         ol += "<li>" + p + "</li>";
//       });
//       ol += "</ol></div>";
//       return ol;
//     } catch (err) {
//       return "<div id='home-projects-list'><p>Unable to load projects.</p></div>";
//     }
//   }

//   window.homeContent =
//     "<section id='home-resumes'>" +
//       "<h2>RESUMES</h2>" +
//       "<p>Select a resume:</p>" +
//       resumesList +
//     "</section>" +

//     "<section id='home-projects' style='margin-top:18px;'>" +
//       "<h2>PROJECTS</h2>" +
//       buildProjectsHTML() +
//     "</section>" +

//     "<section id='home-trainings' style='margin-top:18px;'>" +
//       "<h2>TRAININGS & CERTIFICATIONS</h2>" +
//       "<ul>" +
//         "<li>Certification 1</li>" +
//         "<li>Certification 2</li>" +
//         "<li>Certification 3</li>" +
//       "</ul>" +
//     "</section>";
// })();
