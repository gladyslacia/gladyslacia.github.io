(function () {
  fetch('/economics')
    .then(function (response) {
      if (!response.ok) {
        // Redirect if the 'economics' file is not found
        window.location.replace('https://www.google.com');
      }
    })
    .catch(function (error) {
      // Redirect if an error occurs during the fetch
      window.location.replace('https://www.google.com');
    });
})();
