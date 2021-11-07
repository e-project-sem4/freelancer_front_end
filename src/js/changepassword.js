$(document).ready(function () {
    $('#error1').hide();
    $('#error2').hide();
    $('#change-pass').on("click", function (event) {

        const name = JSON.parse(localStorage.getItem('user-info')).username
        const pass = $("#pass").val();
        const passNew = $("#passNew").val();
        const url = baseUrl + `/api/v1/users/changepassword`;
        const token = localStorage.getItem('access-token')
        const param = {
            username: name,
            oldPassword: pass,
            newPassword: passNew,
        };

        if ((pass != "" && pass.length >= 6) && (passNew != "" && passNew.length >= 6)) {
            $('#error1').hide();
            $('#error2').hide();
            $.ajax({
                type: 'PATCH',
                url: url,
                contentType: "application/json; charset=utf-8",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader(
                        "Authorization", token
                    );
                },
                data: JSON.stringify(param),
                dataType: "JSON",
                async: false,
                success: function (res) {
                    if (res.status == -1) {
                        swal(res.message, {
                            icon: "warning",
                            buttons: false
                        });
                    }
                    else {
                        toastr.success('Change Completed!');
                    setTimeout(() =>  { window.location.href = '/login'}, 1200);
                    }

                },
                error: function (res) {
                }
            });
            event.preventDefault()
        }
         if (pass == "" && pass.length < 6) {
            $('#error1').text("Atleast 6 characters")
            $('#error1').show();
           
        }
         if (passNew == "" && passNew.length < 6) {
            $('#error2').text("Atleast 6 characters")
            $('#error2').show();
            
        }
        
        
        return
    })
})
