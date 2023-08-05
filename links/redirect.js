(function () {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 404) {window.location.replace('https://www.google.com');}
    }
  };
  xhr.open('HEAD', '/economics', true);
  xhr.send();
})();
