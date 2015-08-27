// navigates the user running the setup to the CMS.
function gotoCMS() {
    location.href = 'cms';
}

document.getElementById('setup').addEventListener('click', function(e) {
    // checks if valid inputs
    if (this.form.checkValidity()) {
        e.preventDefault();
        var data = new FormData(document.getElementById('configForm'));
        // extracts the install location
        data.append('location',
            window.location.href.split(window.location.host)[1]);
        ajaxPost('inc/config/configure.php', data, gotoCMS);
    }
});
