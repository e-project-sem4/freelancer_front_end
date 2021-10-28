$(document).ready(function() {
    $('#signout').on("click", function(event) {
        localStorage.removeItem('access-token-admin');
        location.href="/admin/login"
    }
    )
})