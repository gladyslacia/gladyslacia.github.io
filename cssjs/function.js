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
function inquirymail() {
    const emailaddress = document.getElementById('emailaddressid').value;
    const emailsubject4gl = document.createElement('input');
    emailsubject4gl.type = 'hidden';
    emailsubject4gl.name = '_subject';
    emailsubject4gl.value = 'Inquiry: From ' + emailaddress;
    document.querySelector('form').appendChild(emailsubject4gl);
}

/** soon to update */