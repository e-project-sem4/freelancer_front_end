$(document).ready(function() {
    $('#logout').on("click", function(event) {
        localStorage.clear();
    })
    if ( localStorage.getItem("user-info") === null)   {
        document.getElementById("logout").innerHTML="Login";
        document.getElementById("logout").setAttribute("href", "/login");
    }
})