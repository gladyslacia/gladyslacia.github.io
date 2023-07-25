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
    
    // Subject field for the email being sent
    const subjectField = document.createElement('input');
    subjectField.type = 'hidden';
    subjectField.name = '_subject';
    subjectField.value = 'Inquiry: From ' + userEmail;
    
    // Subject field for the auto-response email
    const autoresponseSubjectField = document.createElement('input');
    autoresponseSubjectField.type = 'hidden';
    autoresponseSubjectField.name = '_autoresponse_subject';
    autoresponseSubjectField.value = 'Response: From https://gladyslacia.github.io/';
    
    const form = document.querySelector('form');
    form.appendChild(subjectField);
    form.appendChild(autoresponseSubjectField);
}