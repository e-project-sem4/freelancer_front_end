$(document).ready(function() {
    $('#login').on("click",function() {
        const name = $("#username").val();
        const pass = $("#pass").val();
        const sendInfo = {
            username: name,
            password: pass,
        };
        $.ajax({
            type: 'POST',
            url: "http://localhost:8081/api/v1/users/login",
            contentType: "application/json; charset=utf-8",
            data:JSON.stringify(sendInfo) ,
            traditional: true,
            success: function (data) {
                console.log(data);
            },
            error(){
                console.log("Login sai");
            },
        });
    })

})