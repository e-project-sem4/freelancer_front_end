$(document).ready(function() {
    registerAccount();
    // $("#register-form").validate({
    //     rules: {
    //         fullName: "required",
    //         username: {
    //             required: true,
    //             minlength: 4
    //         },
    //         password: {
    //             required: true,
    //             minlength: 8
    //         },
    //         phone:{
    //             required: true,
    //             minlength: 10,
    //             maxlength:12
    //         },
    //         confirm_password: {
    //             required: true,
    //             minlength: 8,
    //             equalTo: "#password"
    //         },
    //         email: {
    //             required: true,
    //             email: true
    //         }
    //     },
    //     messages: {
    //         fullName: "Please enter your fullname",
    //         username: {
    //             required: "Please enter a username",
    //             minlength: "Your username must consist of at least 4 characters"
    //         },
    //         password: {
    //             required: "Please provide a password",
    //             minlength: "Your password must be at least 8 characters long"
    //         },
    //         confirm_password: {
    //             required: "Please provide a password",
    //             minlength: "Your password must be at least 8 characters long",
    //             equalTo: "Please enter the same password as above"
    //         },
    //         email: "Please enter a valid email address",
    //     },
    //     phone:{
    //         required: "Please provide a phone",
    //         minlength: "Your phone must be at least 10 characters long",
    //         maxlength:"Your phone must be at 12 characters less"
    //     }
    // });


})
function registerAccount(){
    $('#register').on('click',function(event) {
        event.preventDefault();
        var fullName = $('#fullName').val();
        var username = $("#username").val();
        var email = $("#email").val();
        var phone = $("#phone").val();
        var password = $("#password").val();
        var confirm_password = $("#confirm_password").val();

        if (username.length < 4) {
            swal("Error!", "Your username must be at least 4 characters long!", "warning");
            return;
        }
        if (!fullName) {
            swal("Error!", "Your fullname must not be null!", "warning");
            return;
        }
        if (!email) {
            swal("Error!", "Your fullname must not be null!", "warning");
            return;
        }
        if (phone.length < 10) {
            swal("Error!", "Your phone must be at least 10 characters long!", "warning");
            return;
        }
        if (password.length < 8) {
            swal("Error!", "Your password must be at least 8 characters long!", "warning");
            return;
        }
        if ( password != confirm_password ) {
            swal("Error!", "Your confirm password is wrong!", "warning");
            return;
        }
        if(!$('#customCheck1').is(":checked")){
            swal("Error!", "You're not accept terms and condition!", "warning");
            return;
        }
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
            contentType: "application/json",
            data:JSON.stringify(registerForm),
            dataType:"JSON",
            async:false,
            success: function (res) {
                if(res) {
                    location.href = "/login"
                }
            },
            error(){
                console.log("sai");
            },
        });
    })
}