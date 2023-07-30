function join() {
    var classcode = document.getElementById('classcodeid').value;
    var source0 = document.getElementById('classcodelistid');
    var alertmsg = document.getElementById('alert');
    if (classcode == ''){
      alertmsg.innerHTML = 'Enter password!';
      source0.src="https://gladyslacia.github.io/cssjs/gl-favicon.jpg";
    } else if (classcode == 'googleplex'){
      alertmsg.innerHTML = 'Ok.';
      source0.src="/markdown/classcodelist";
    } else {
      alertmsg.innerHTML = 'The password is not correct!';
      source0.src="https://gladyslacia.github.io/cssjs/gl-favicon.jpg";
    } document.getElementById('classcodeid').value = '';
} function joinkey(event) {
    if (event.key === 'Enter') {join();}
} document.addEventListener('keyup', joinkey);

function enter() {
    var lecturenotes = document.getElementById('lecturenotesid').value;
    var source1 = document.getElementById('lecturenotefilesid');
    var alertmsg = document.getElementById('alert');
    if (lecturenotes == ''){
        alertmsg.innerHTML = 'Enter password!';
        source1.src="https://gladyslacia.github.io/cssjs/gl-favicon.jpg";
    } else if (lecturenotes == 'mathlectures'){
        alertmsg.innerHTML = 'Ok.';
        source1.src = "https://drive.google.com/embeddedfolderview?id=1PPgdrmta3Gokue1sv7SbOvJQeX2tk-7k#list";
    } else {
        alertmsg.innerHTML = 'The password is not correct!';
        source1.src="https://gladyslacia.github.io/cssjs/gl-favicon.jpg";
    } document.getElementById('lecturenotesid').value = '';
} function enterkey(event) {
    if (event.key === 'Enter') {enter();}
} document.addEventListener('keyup', enterkey);

function get() {
    var reviewers = document.getElementById('reviewersid').value;
    var source2 = document.getElementById('reviewerfilesid');
    var alertmsg = document.getElementById('alert');
    if (reviewers == ''){
        alertmsg.innerHTML = 'Enter password!';
        source2.src="https://gladyslacia.github.io/cssjs/gl-favicon.jpg";
    } else if (reviewers == 'mathreviews'){
        alertmsg.innerHTML = 'Ok.';
        source2.src = "https://drive.google.com/embeddedfolderview?id=1PPgdrmta3Gokue1sv7SbOvJQeX2tk-7k#list";
    } else {
        alertmsg.innerHTML = 'The password is not correct!';
        source2.src="https://gladyslacia.github.io/cssjs/gl-favicon.jpg";
    } document.getElementById('reviewersid').value = '';
} function getkey(event) {
    if (event.key === 'Enter') {get();}
} document.addEventListener('keyup', getkey);
