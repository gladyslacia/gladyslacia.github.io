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
function inquirymail1() {
    const emailaddress1 = document.getElementById('emailaddressid1').value;
    const emailsubject4gl1 = document.createElement('input');
    emailsubject4gl1.type = 'hidden';
    emailsubject4gl1.name = '_subject';
    emailsubject4gl1.value = 'Inquiry: From ' + emailaddress1;
    document.querySelector('form').appendChild(emailsubject4gl1);
}
function inquirymail2() {
    const emailaddress2 = document.getElementById('emailaddressid2').value;
    const emailsubject4gl2 = document.createElement('input');
    emailsubject4gl2.type = 'hidden';
    emailsubject4gl2.name = '_subject';
    emailsubject4gl2.value = 'Inquiry: From ' + emailaddress2;
    document.querySelector('form').appendChild(emailsubject4gl2);
}

/** soon to update */