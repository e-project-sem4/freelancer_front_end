$(document).ready(function() {

    if ( localStorage.getItem("user-info") === null)  {
        document.getElementById("logout").innerHTML="Login";
        document.getElementById("logout").setAttribute("href", "/login");
    }
})