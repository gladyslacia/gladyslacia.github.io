/** for test runs only */
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
function setEmailSubject() {
    const userEmail = document.getElementById('userEmail').value;
    const subjectField = document.createElement('input');
    subjectField.type = 'hidden';
    subjectField.name = '_subject';
    subjectField.value = 'Inquiry: From ' + userEmail;
    document.querySelector('form').appendChild(subjectField);
}