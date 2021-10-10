$(document).ready(function() {

    if (localStorage.getItem("access-token") === null) {
        document.getElementById("logout").innerHTML="Login";
        document.getElementById("logout").setAttribute("href", "/login");
    }
})