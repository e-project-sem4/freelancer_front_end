$(document).ready(function() {
    $('#register').on('click',function(event) {
        var fullName = $('#fullName').val();
        var username = $("#username").val();
        var email = $("#email").val();
        var phone = $("#phone").val();
        var password = $("#password").val();
        var confirm_password = $("#confirm_password").val();
        debugger;
        const registerForm = {
            username: username,
            password: password,
            fullName: fullName,
            email: email,
            phone: phone,
        };
         if (username <= 4){
            alert('Username phải lớn hơn 4 kí tự')
        }
        else if (phone < 12){
            alert('Số điện thoại phải nhỏ hơn 12 kí tự')
        }
        else if (password <= 8){
            alert('Mật khẩu  phải lớn hơn 8 kí tự')
        }
        else if (confirm_password != password){
            alert('Sai mật khẩu xác nhận ')
        }
        else {
            $.ajax({
                type: 'POST',
                url: "http://localhost:8081/api/v1/users/register",
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
        event.preventDefault();
    })

})