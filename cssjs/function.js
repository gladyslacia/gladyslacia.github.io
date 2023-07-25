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
var emailaddress = document.getElementById('emailaddressid').value;
var emailsubjec1 = document.getElementById('emailsubjectid').value;
var emailsubject2 = "Inquiry: From ";
emailsubject1.value = emailsubject2 + emailaddress;
