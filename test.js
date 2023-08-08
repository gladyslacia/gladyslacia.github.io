function inquirymail1() {
  const emailaddress1 = document.getElementById('emailaddressid1').value;
  const emailsubject4gl1 = document.createElement('input');
  emailsubject4gl1.type = 'hidden'; emailsubject4gl1.name = '_subject';
  emailsubject4gl1.value = 'Inquiry: From ' + emailaddress1;

  // Select the first form with class name "inquirymail1"
  const form1 = document.querySelector('.inquirymail1 form'); form1.appendChild(emailsubject4gl1);
}