$(document).ready(function() {
    $('#register').on('click',function(event) {
        var fullName = $('#fullName').val();
        var username = $("#username").val();
        var email = $("#email").val();
        var phone = $("#phone").val();
        var password = $("#password").val();
        var confirm_password = $("#confirm_password").val();
        const registerForm = {
            username: username,
            password: password,
            fullName: fullName,
            email: email,
            phone: phone,
        };
            $.ajax({
                type: 'POST',
                url: baseUrl + "/api/v1/users/register?",
                url: url,
                contentType: "application/json",
                data:JSON.stringify(registerForm),
                dataType:"JSON",
                async:false,
                success: function (res) {
                    if(res ){
                        location.href="/login"
                    }
                },
                error(){
                    console.log("sai");
                },
            });
    })
    $("#register-form").validate({
        rules: {
            fullName: "required",
            username: {
                required: true,
                minlength: 4
            },
            password: {
                required: true,
                minlength: 8
            },
            phone:{
                required: true,
                minlength: 10,
                maxlength:12
            },
            confirm_password: {
                required: true,
                minlength: 8,
                equalTo: "#password"
            },
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            fullName: "Please enter your fullname",
            username: {
                required: "Please enter a username",
                minlength: "Your username must consist of at least 4 characters"
            },
            password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 8 characters long"
            },
            confirm_password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 8 characters long",
                equalTo: "Please enter the same password as above"
            },
            email: "Please enter a valid email address",
        },
        phone:{
            required: "Please provide a phone",
            minlength: "Your phone must be at least 10 characters long",
            maxlength:"Your phone must be at 12 characters less"
        }
    });


})