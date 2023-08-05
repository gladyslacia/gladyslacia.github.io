(function () {
  var img = new Image();
  img.onerror = function () {
    // Redirect if the 'economics' file is not found
    window.location.replace('https://www.google.com');
  };
  img.src = '/economics';
})();
