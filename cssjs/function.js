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
// Function to update the _subject field based on the user's email
function updateSubject() {
    const emailInput = document.getElementById("emailInput");
    const subjectInput = document.querySelector('input[name="_subject"]');
    
    // Replace the placeholder {user_email} with the user's email
    const user_email = emailInput.value;
    const newSubjectValue = subjectInput.value.replace("{user_email}", user_email);
    
    // Update the _subject field with the new value
    subjectInput.value = newSubjectValue;
  }

  // Event listener to trigger the updateSubject function when the email input changes
  document.getElementById("emailInput").addEventListener("change", updateSubject);