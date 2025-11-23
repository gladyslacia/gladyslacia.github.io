// niche/home.js
window.homeContent = 
  "<section id='home-resumes'>" +
    "<h2>RESUMES</h2>" +
    // "<p>Pick a niche above (or below) to view the full resume. Quick links:</p>" +
    // window.setniches
    // .map(name => "<p><button class='niche-btn'>" + name + "</button></p>")
    // .join("") +
    window.setniches
    .map(function(item){
    return "<p><button class='niche-btn'>" + item + "</button></p>";
        })
    .join("") +
  "</section>" +

  "<section id='home-projects' style='margin-top:18px;'>" +
    "<h2>PROJECTS</h2>" +
    // "<p>Projects and accomplishments go here:</p>" +
    "<div id='home-projects-list'></div>" +
  "</section>" +

  "<section id='home-trainings' style='margin-top:18px;'>" +
    "<h2>TRAININGS & CERTIFICATIONS</h2>" +
    // "<p>Skills and learning highlights go here:</p>" +
    "<div id='home-trainings-list'></div>" +
  "</section>";
