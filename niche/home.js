// ./niche/home.js
window.homeContent = 
  "<section id='home-resumes'>" +
    "<h2>RESUMES</h2>" +
    // "<p>Pick a niche above (or below) to view the full resume. Quick links:</p>" +
    window.getNicheButtonsHTML() +
  "</section>" +

  "<section id='home-projects' style='margin-top:18px;'>" +
    "<h2>PROJECTS</h2>" +
    // "<p>Projects and accomplishments go here:</p>" +
    "<div id='home-projects-list'></div>" +
  "</section>" +

  "<section id='home-trainings' style='margin-top:18px;'>" +
    "<h2>TRAININGS</h2>" +
    // "<p>Skills and learning highlights go here:</p>" +
    "<div id='home-trainings-list'></div>" +
  "</section>";
