// ./assets/settings.js
window.globalSettings = window.globalSettings || {};

window.globalSettings.educationHTML =
  "<ul>" +
    "<li>??? (2023)</li>" +
    "<li>Bachelor of Science in Mathematics <br> <em>College of Science and Mathematics,</em> Mindanao State University &mdash; Iligan Institute of Technology (2014-2018) </li>" +
    "<li>??? (2023)</li>" +
  "</ul>";

window.globalSettings.languagesHTML =
  "<ul>" +
    "<li>English &mdash; Conversational</li>" +
    "<li>Tagalog &mdash; Fluent</li>" +
    "<li>Maguindanao &mdash; Native</li>" +
  "</ul>";

window.globalSettings.businessphoneHTML =
    "<p>&#128241; WhatsApp: <a href='https://wa.me/639124619473' target='_blank'>+63-912-461-9473</a></p>"

window.globalSettings.businessemailHTML =
    "<p>&#128231; Email: <a href='mailto:onbizgladyslacia@gmail.com' target='_blank'>onbizgladyslacia@gmail.com</a></p>"

window.globalSettings.linkedinHTML =
    "<p>&#128100; LinkedIn: <a href='https://www.linkedin.com/in/freelancergladyslacia' target='_blank'>freelancergladyslacia</a></p>"

window.globalSettings.facebookHTML =
    "<p>&#128172; FB: <a href='https://www.facebook.com/onbizgladyslacia' target='_blank'>onbizgladyslacia</a></p>"

window.globalSettings.UpworkHTML =
    "<p>&#128187; Upwork: <a href='https://www.upwork.com/freelancers/~01496f55ce7a5e12b1' target='_blank'>01496f55ce7a5e12b1</a></p>"

window.globalSettings.oljHTML =
    "<p>&#128187; OnlineJobs.ph: <a href='https://www.onlinejobs.ph/jobseekers/info/3977015' target='_blank'>3977015</a></p>"

window.globalSettings.addressHTML =
    "<p>&#128236; Calamba, Misamis Occidental, Philippines</p>"

window.setniches = [
  "SEO Content Writer",
  "General VA",
  "Data Analyst"
];

window.sourceniches = [
  "seocontentwriter",
  "virtualassistant",
  "datascience"
];

// window.getNicheButtonsHTML = function () {
//   if (!Array.isArray(window.setniches)) return "";
//   return window.setniches
//     .map(function (item) {
//       return "<p><button class='niche-btn'>" + String(item).trim() + "</button></p>";
//     })
//     .join("");
// };

window.getNicheButtonsHTML = function () {
  if (!Array.isArray(window.setniches)) return "";

  const textBefore = "<p>Select a niche:</p>";

  const buttonsHTML = window.setniches
    .map(function (item) {
      return "<p><button class='niche-btn'>" + String(item).trim() + "</button></p>";
    })
    .join("");

  return textBefore + buttonsHTML;
};
