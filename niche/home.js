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
