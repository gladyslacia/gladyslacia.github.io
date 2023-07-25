/** for navigation */
function home() {
    location.href="index.html";
}
function classes() {
    location.href="googleclassroom.html";
}
function lectures() {
    location.href="lecturenotes.html";
}
function reviews() {
    location.href="reviewers.html";
}

/** for buttons */
function messenger() {
    window.open("https://m.me/gl.gladyslacia/");
}

/** for email */
const emailInput = document.getElementById('emailaddressid');
const subjectInput = document.getElementById('emailsubjectid');
  emailInput.addEventListener('change', function() {
    const userEmail = this.value;
    const subjectValue = `Inquiry: From ${userEmail}`;
    subjectInput.value = subjectValue;
  });