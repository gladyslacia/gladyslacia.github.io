function join() {
    var classcode = document.getElementById('classcodeid').value;
    if (classcode == ''){
        document.getElementById('alert').innerHTML = 'Enter password!';
        document.getElementById('joinalert1').innerHTML = 'You can see the code only if you enter the correct password.';
        document.getElementById('joinalert2').innerHTML = 'You can see the code only if you enter the correct password.';
        document.getElementById('joinalert3').innerHTML = 'You can see the code only if you enter the correct password.';
        document.getElementById('joinalert4').innerHTML = 'You can see the code only if you enter the correct password.';
        document.getElementById('joinalert5').innerHTML = 'You can see the code only if you enter the correct password.';
    } else if (classcode == 'googleplex'){
        document.getElementById('alert').innerHTML = 'Ok.';
        document.getElementById('joinalert1').innerHTML = '09813590568';
        document.getElementById('joinalert2').innerHTML = '09364325246';
        document.getElementById('joinalert3').innerHTML = '09813590568';
        document.getElementById('joinalert4').innerHTML = '09364325246';
        document.getElementById('joinalert5').innerHTML = '09813590568';
        document.getElementById('classcodeid').value = '';
    } else {
        document.getElementById('alert').innerHTML = 'The password is not correct!';
        document.getElementById('joinalert1').innerHTML = 'You can see the code only if you enter the correct password.';
        document.getElementById('joinalert2').innerHTML = 'You can see the code only if you enter the correct password.';
        document.getElementById('joinalert3').innerHTML = 'You can see the code only if you enter the correct password.';
        document.getElementById('joinalert4').innerHTML = 'You can see the code only if you enter the correct password.';
        document.getElementById('joinalert5').innerHTML = 'You can see the code only if you enter the correct password.';
        document.getElementById('classcodeid').value = '';
    }
}

function enter() {
    var lecturenotes = document.getElementById('lecturenotesid').value;
    var source1 = document.getElementById('lecturenotefilesid');
    if (lecturenotes == ''){
        document.getElementById('alert').innerHTML = 'Enter password!';
        source1.src="https://gladyslacia.github.io/cssjs/gl-favicon.jpg";
    } else if (lecturenotes == 'mathlectures'){
        document.getElementById('alert').innerHTML = 'Ok.';
        document.getElementById('lecturenotesid').value = '';
        source1.src = "https://drive.google.com/embeddedfolderview?id=1PPgdrmta3Gokue1sv7SbOvJQeX2tk-7k#list";
    } else {
        document.getElementById('alert').innerHTML = 'The password is not correct!';
        document.getElementById('lecturenotesid').value = '';
        source1.src="https://gladyslacia.github.io/cssjs/gl-favicon.jpg";
    }
}

function get() {
    var reviewers = document.getElementById('reviewersid').value;
    var source2 = document.getElementById('reviewerfilesid');
    if (reviewers == ''){
        document.getElementById('alert').innerHTML = 'Enter password!';
        source2.src="https://gladyslacia.github.io/cssjs/gl-favicon.jpg";
    } else if (reviewers == 'mathreviews'){
        document.getElementById('alert').innerHTML = 'Ok.';
        document.getElementById('reviewersid').value = '';
        source2.src = "https://drive.google.com/embeddedfolderview?id=1PPgdrmta3Gokue1sv7SbOvJQeX2tk-7k#list";
    } else {
        document.getElementById('alert').innerHTML = 'The password is not correct!';
        document.getElementById('reviewersid').value = '';
        source2.src="https://gladyslacia.github.io/cssjs/gl-favicon.jpg";
    }
}