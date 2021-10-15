$(document).ready(function() {
    const data=  localStorage.getItem('user-info')
       const output =   document.getElementById('username')
       const obj = JSON.parse(data);
       output.innerHTML= obj.username
    if (localStorage.getItem("access-token") === null) {
        document.getElementById("logout").innerHTML="Login";
        document.getElementById("logout").setAttribute("href", "/login");
    }
    $('#profile').on('click',function(event) {
        location.href="/profile"
    })
    $('#changePassword').on('click',function(event) {
        location.href="/ChangePassword"
    })

})