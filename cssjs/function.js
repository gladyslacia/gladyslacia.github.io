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

    // Select the first form with class name "inquirymail1"
    const form1 = document.querySelector('.inquirymail1 form');
    form1.appendChild(emailsubject4gl1);
}

function inquirymail2() {
    const emailaddress2 = document.getElementById('emailaddressid2').value;
    const emailsubject4gl2 = document.createElement('input');
    emailsubject4gl2.type = 'hidden';
    emailsubject4gl2.name = '_subject';
    emailsubject4gl2.value = 'Inquiry: From ' + emailaddress2;

    // Select the second form with class name "inquirymail2"
    const form2 = document.querySelector('.inquirymail2 form');
    form2.appendChild(emailsubject4gl2);
}

// Set the form submissions to directly call the respective functions
document.querySelector('.inquirymail1 form').onsubmit = inquirymail1;
document.querySelector('.inquirymail2 form').onsubmit = inquirymail2;

/** soon to update */