$(document).ready(function() {
    $('#logout').on("click", function(event) {
        localStorage.clear();
    })
})