$(document).ready(function() {
    $('#register').on('click',function(event) {
        var fullName = $('#fullName').val();
        var username = $("#username").val();
        var email = $("#email").val();
        var phone = $("#phone").val();
        var password = $("#password").val();
        var confirm_password = $("#confirm_password").val();
        const url = baseUrl + `/api/v1/users/register`;
        debugger;
        const registerForm = {
            username: username,
            password: password,
            fullName: fullName,
            email: email,
            phone: phone,
        };
        if (confirm_password != password){
            alert('Sai mật khẩu xác nhận ')
        }
        else {
            $.ajax({
                type: 'POST',
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
        }
    })

})