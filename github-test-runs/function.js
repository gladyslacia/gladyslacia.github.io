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

/** for test runs only */
function setEmailSubject() { /** inquirymail() */
    const userEmail = document.getElementById('userEmail').value; /** emailaddress, emailaddressid */
    const subjectField = document.createElement('input'); /** emailsubject4gl */
    subjectField.type = 'hidden'; /** emailsubject4gl.type */
    subjectField.name = '_subject';
    subjectField.value = 'Inquiry: From ' + userEmail;
    document.querySelector('form').appendChild(subjectField); /** emailsubject4gl */
}